/* Explicit workload and resource-constrained DAG estimate. No device measurements. */
'use strict';
(() => {
  const D=window.OBS_MOE_DATA;
  const defaults={batch:64,chunk:16,skew:0,nv:150,rdma:25,nvLat:2,rdLat:4,tf:80,launch:3,reserve:15,overlap:true};
  const bounds={batch:[1,2048,true],chunk:[1,256,true],skew:[0,100,false],nv:[.1,2000,false],rdma:[.1,1000,false],nvLat:[0,1000,false],rdLat:[0,1000,false],tf:[.1,5000,false],launch:[0,1000,false],reserve:[0,60,false]};
  function valid(p){for(const [k,[lo,hi,integer]]of Object.entries(bounds)){const n=p[k];if(!Number.isFinite(n)||n<lo||n>hi||(integer&&!Number.isInteger(n)))return k;}return null;}
  function pickHottest(rankLoads,lo,hi,preferNonEntry){
    let best=lo,bestLoad=-1;
    for(let r=lo;r<=hi;r++){
      const load=rankLoads[r];
      if(load>bestLoad||(load===bestLoad&&preferNonEntry&&best===lo&&r>lo)){best=r;bestLoad=load;}
    }
    return best;
  }
  function generate(p,ctx){const profile=D.profiles[ctx.profile]||D.profiles.v4,base=D.model(ctx.scenario,ctx.dtype,profile.id),routes=[],rankLoads=Array(16).fill(0),expertLoads=Array(profile.experts).fill(0);let hotTokens=0;
    for(let t=0;t<p.batch;t++){
      // Deterministic quota: the first token remains inspectable in the topology when skew < 100.
      const hot=Math.floor((t+1)*p.skew/100)>Math.floor(t*p.skew/100);if(hot)hotTokens++;
      const used=new Set(),ids=[];
      for(const r of base.rows){const nodeBase=r.node==='a'?0:8;let rank,offset;
        if(hot){const nodeIndex=ids.filter(e=>Math.floor(e/profile.perGPU/8)===(nodeBase/8)).length;rank=nodeBase+3+Math.floor(nodeIndex/profile.perGPU);offset=nodeIndex%profile.perGPU;}
        else{rank=nodeBase+(r.localRank+t)%8;offset=(r.expert%profile.perGPU+Math.floor(t/8))%profile.perGPU;}
        let id=rank*profile.perGPU+offset;while(used.has(id)){offset=(offset+1)%profile.perGPU;id=rank*profile.perGPU+offset;}used.add(id);ids.push(id);rankLoads[rank]++;expertLoads[id]++;
      }routes.push(ids);
    }
    const chunks=[];const dispatchBytes=profile.hidden*(ctx.dtype==='bf16'?2:1),combineBytes=profile.hidden*2;
    let remoteTokens=0,nvACopies=0,nvBCopies=0;
    for(let start=0;start<routes.length;start+=p.chunk){const group=routes.slice(start,start+p.chunk),loads=Array(16).fill(0);let cRemote=0,nvA=0,nvB=0;
      for(const ids of group){const ranks=[...new Set(ids.map(e=>Math.floor(e/profile.perGPU)))];if(ranks.some(r=>r>=8))cRemote++;nvA+=ranks.filter(r=>r>0&&r<8).length;nvB+=ranks.filter(r=>r>8).length;for(const e of ids)loads[Math.floor(e/profile.perGPU)]++;}
      remoteTokens+=cRemote;nvACopies+=nvA;nvBCopies+=nvB;
      chunks.push({index:chunks.length,start,count:group.length,loads,remoteTokens:cRemote,nvA,nvB,bytes:{aD:nvA*dispatchBytes,rD:cRemote*dispatchBytes,bD:nvB*dispatchBytes,bC:nvB*combineBytes,rC:cRemote*combineBytes,aC:nvA*combineBytes}});
    }
    const maxLoad=Math.max(...rankLoads),mean=routes.length*profile.topK/16,assignments=routes.length*profile.topK,flopPerAssignment=6*profile.hidden*profile.intermediate,paramsPerExpert=3*profile.hidden*profile.intermediate;
    const rankActiveExperts=Array.from({length:16},(_,r)=>expertLoads.slice(r*profile.perGPU,(r+1)*profile.perGPU).filter(x=>x>0).length);
    const activeExperts=expertLoads.filter(x=>x>0).length,maxExpertLoad=Math.max(...expertLoads),meanTokensPerActiveExpert=activeExperts>0?assignments/activeExperts:0;
    const localAssignments=rankLoads.slice(0,8).reduce((a,b)=>a+b,0),remoteAssignments=rankLoads.slice(8).reduce((a,b)=>a+b,0);
    const naiveNvACopies=rankLoads.slice(1,8).reduce((a,b)=>a+b,0),naiveNvBCopies=rankLoads.slice(9,16).reduce((a,b)=>a+b,0);
    const scaleBytesPerCopy=ctx.dtype==='bf16'?0:profile.hidden/32;
    const hottestA=pickHottest(rankLoads,0,7,true),hottestB=pickHottest(rankLoads,8,15,true);
    const hottest=rankLoads[hottestB]>=rankLoads[hottestA]&&rankLoads[hottestB]>0?hottestB:hottestA;
    return {profile,routes,rankLoads,rankActiveExperts,expertLoads,activeExperts,maxExpertLoad,meanTokensPerActiveExpert,paramsPerExpert,chunks,dispatchBytes,combineBytes,scaleBytesPerCopy,hotTokens,remoteTokens,nvACopies,nvBCopies,nvCopies:nvACopies+nvBCopies,naiveNvACopies,naiveNvBCopies,localAssignments,remoteAssignments,maxLoad,mean,imbalance:maxLoad/mean,hottest,hottestA,hottestB,assignments,flopPerAssignment,totalFlops:assignments*flopPerAssignment};
  }
  function createJobs(work,p,mode){const jobs=[],finishes=[];const rate=p.tf*(mode==='overlap'?1-p.reserve/100:1),byId=new Map();
    function add(resource,kind,chunk,bytes,rows,deps,phase){if(bytes===0&&rows===0)return null;const compute=kind==='compute',lat=compute?p.launch:resource.startsWith('nv')?p.nvLat:p.rdLat,service=compute?rows*work.flopPerAssignment/(rate*1e6):bytes/((resource.startsWith('nv')?p.nv:p.rdma)*1000),id=jobs.length;
      const j={id,resource,kind,chunk,bytes,rows,phase,deps:[...new Set(deps.filter(x=>x!==null))],duration:lat+service,latency:lat,service,critical:false};jobs.push(j);byId.set(id,j);return id;}
    for(const c of work.chunks){const q=c.index,ad=add('nv-a','nvlink',q,c.bytes.aD,0,[],'aD'),rd=add('rd-tx','rdma',q,c.bytes.rD,0,[],'rD'),bd=add('nv-b','nvlink',q,c.bytes.bD,0,[rd],'bD'),g=[];
      for(let r=0;r<16;r++)g[r]=add('gpu-'+r,'compute',q,0,c.loads[r],r===0?[]:r<8?[ad]:r===8?[rd]:[bd,rd],'compute');
      const bc=add('nv-b','nvlink',q,c.bytes.bC,0,g.slice(8),'bC'),rc=add('rd-rx','rdma',q,c.bytes.rC,0,[bc,...g.slice(8)],'rC'),ac=add('nv-a','nvlink',q,c.bytes.aC,0,g.slice(0,8),'aC');finishes.push([rc,ac,...g].filter(x=>x!==null));
    }return {jobs,finishes,byId,rate};
  }
  function schedule(work,p,mode='overlap'){
    const made=createJobs(work,p,mode),jobs=made.jobs,resourceEnds={},resourceLast={},ready=new Map(),children=jobs.map(()=>[]),missing=jobs.map(j=>j.deps.length),releases=jobs.map(()=>0),dependencyLast=jobs.map(()=>null);
    const insert=j=>{const a=ready.get(j.resource)||[];let lo=0,hi=a.length;while(lo<hi){const mid=(lo+hi)>>1,b=jobs[a[mid]];if(releases[b.id]<releases[j.id]||(releases[b.id]===releases[j.id]&&b.id<j.id))lo=mid+1;else hi=mid;}a.splice(lo,0,j.id);ready.set(j.resource,a);};
    for(const j of jobs){for(const dep of j.deps)children[dep].push(j.id);if(!missing[j.id])insert(j);}
    if(mode==='serial'){
      // No communication/compute overlap: all GPUs still compute in parallel within each chunk.
      const groups=work.chunks.map(()=>[]);for(const j of jobs)groups[j.chunk].push(j);
      let time=0,prev=null;
      const depInfo=j=>{let r=0,d=null;for(const id of j.deps)if(jobs[id].end>=r){r=jobs[id].end;d=id;}return [r,d];};
      const apply=j=>{if(!j)return;const [r,d]=depInfo(j);j.ready=r;j.depBlocker=d;j.resBlocker=time>r?prev:null;j.blocker=prev;j.start=time;j.end=time+j.duration;j.wait=Math.max(0,time-r);time=j.end;prev=j.id;};
      for(const c of work.chunks){const list=groups[c.index];
        apply(list.find(j=>j.phase==='aD'));apply(list.find(j=>j.phase==='rD'));apply(list.find(j=>j.phase==='bD'));
        const gpu=list.filter(j=>j.kind==='compute'),rankScore=j=>{const g=Number(j.resource.slice(4));return (g===work.hottest?1e6:0)+(g===work.hottestA||g===work.hottestB?1e5:0)+work.rankLoads[g]*10+g;};
        if(gpu.length){const entered=time,stagePrev=prev;let slowest=gpu[0];for(const j of gpu){const [r,d]=depInfo(j);j.ready=r;j.depBlocker=d;j.resBlocker=entered>r?stagePrev:null;j.blocker=stagePrev;j.start=entered;j.end=entered+j.duration;j.wait=Math.max(0,entered-r);if(j.end>slowest.end+1e-9||(Math.abs(j.end-slowest.end)<=1e-9&&rankScore(j)>rankScore(slowest)))slowest=j;}time=slowest.end;prev=slowest.id;}
        apply(list.find(j=>j.phase==='bC'));apply(list.find(j=>j.phase==='rC'));apply(list.find(j=>j.phase==='aC'));
      }
    }else{
      let done=0;while(done<jobs.length){let best=null,bestStart=Infinity;for(const a of ready.values()){if(!a.length)continue;const j=jobs[a[0]],start=Math.max(releases[j.id],resourceEnds[j.resource]||0);if(start<bestStart||(start===bestStart&&j.id<(best?.id??Infinity))){best=j;bestStart=start;}}
        if(!best)throw Error('Invalid cyclic dependency');ready.get(best.resource).shift();const resourceWait=resourceEnds[best.resource]||0,rel=releases[best.id];best.ready=rel;best.depBlocker=dependencyLast[best.id];best.resBlocker=resourceWait>rel?resourceLast[best.resource]:null;best.blocker=resourceWait>rel?resourceLast[best.resource]:dependencyLast[best.id];best.start=bestStart;best.end=bestStart+best.duration;best.wait=Math.max(0,bestStart-rel);resourceEnds[best.resource]=best.end;resourceLast[best.resource]=best.id;done++;
        for(const id of children[best.id]){if(best.end>releases[id]){releases[id]=best.end;dependencyLast[id]=best.id;}if(--missing[id]===0)insert(jobs[id]);}
      }
    }
    const total=Math.max(0,...jobs.map(j=>j.end)),busy={},busyService={},busyLatency={},utilization={},critical={nvlink:0,rdma:0,compute:0},criticalService={nvlink:0,rdma:0,compute:0},criticalLatency={nvlink:0,rdma:0,compute:0},criticalIds=[];
    for(const j of jobs){busy[j.resource]=(busy[j.resource]||0)+j.duration;busyService[j.resource]=(busyService[j.resource]||0)+j.service;busyLatency[j.resource]=(busyLatency[j.resource]||0)+j.latency;}
    for(const [k,v]of Object.entries(busy))utilization[k]=total>0?v/total:0;
    let maxGpuBusy=0;for(let r=0;r<16;r++)if((busy['gpu-'+r]||0)>maxGpuBusy)maxGpuBusy=busy['gpu-'+r];
    let cur=jobs.reduce((a,b)=>!a||b.end>a.end?b:a,null);const seen=new Set();
    while(cur&&!seen.has(cur.id)){seen.add(cur.id);cur.critical=true;critical[cur.kind]+=cur.duration;criticalService[cur.kind]+=cur.service;criticalLatency[cur.kind]+=cur.latency;criticalIds.push(cur.id);cur=cur.blocker===null||cur.blocker===undefined?null:jobs[cur.blocker];}
    criticalIds.reverse();
    const startupTotal=criticalLatency.nvlink+criticalLatency.rdma+criticalLatency.compute,serviceTotal=criticalService.nvlink+criticalService.rdma+criticalService.compute,startupShare=total>0?startupTotal/total:0;
    return {mode,total,jobs,busy,busyService,busyLatency,utilization,maxGpuBusy,critical,criticalService,criticalLatency,startupTotal,serviceTotal,startupShare,criticalIds,effectiveTF:made.rate};
  }
  function run(inputs={},context={},sensitivity=true){const p={...defaults,...inputs},ctx={profile:'v4',scenario:'mixed',dtype:'fp8',...context};const error=valid(p);if(error)return {error};const work=generate(p,ctx),serial=schedule(work,p,'serial'),pipeline=schedule(work,p,'overlap'),chosen=p.overlap?pipeline:serial;
    const result={p,ctx,work,serial,pipeline,chosen,speedup:serial.total/pipeline.total,bytes:work.chunks.reduce((a,c)=>{for(const [k,v]of Object.entries(c.bytes))a[k]=(a[k]||0)+v;return a;},{}),sensitivity:[],startupGain:0,startupDominated:false};
    if(sensitivity){
      const mode=p.overlap?'overlap':'serial';
      for(const [key,field]of [['nvlink','nv'],['rdma','rdma'],['compute','tf']]){const next={...p,[field]:p[field]*2},faster=schedule(work,next,mode);result.sensitivity.push({key,time:faster.total,gain:chosen.total>0?(chosen.total-faster.total)/chosen.total:0});}
      result.sensitivity.sort((a,b)=>b.gain-a.gain);
      const halfLat=schedule(work,{...p,nvLat:p.nvLat/2,rdLat:p.rdLat/2,launch:p.launch/2},mode);
      result.startupGain=chosen.total>0?(chosen.total-halfLat.total)/chosen.total:0;
      result.startupDominated=chosen.startupShare>.5&&chosen.startupTotal>0;
      result.bottleneck=(result.sensitivity[0].gain>=.01&&!result.startupDominated)?result.sensitivity[0].key:'limited';
    }
    return result;
  }
  window.OBS_MOE_COST_MODEL={defaults,bounds,valid,generate,schedule,run};
})();
