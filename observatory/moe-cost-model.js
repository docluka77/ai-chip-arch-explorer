/* Explicit workload and resource-constrained DAG estimate. No device measurements. */
'use strict';
(() => {
  const D=window.OBS_MOE_DATA;
  const defaults={batch:64,chunk:16,skew:0,nv:150,rdma:25,nvLat:2,rdLat:4,tf:80,launch:3,reserve:15,overlap:true};
  const bounds={batch:[1,2048,true],chunk:[1,256,true],skew:[0,100,false],nv:[.1,2000,false],rdma:[.1,1000,false],nvLat:[0,1000,false],rdLat:[0,1000,false],tf:[.1,5000,false],launch:[0,1000,false],reserve:[0,60,false]};
  function valid(p){for(const [k,[lo,hi,integer]]of Object.entries(bounds)){const n=p[k];if(!Number.isFinite(n)||n<lo||n>hi||(integer&&!Number.isInteger(n)))return k;}return null;}
  function generate(p,ctx){const profile=D.profiles[ctx.profile]||D.profiles.v4,base=D.model(ctx.scenario,ctx.dtype,profile.id),routes=[],rankLoads=Array(16).fill(0),expertLoads=Array(profile.experts).fill(0);let hotTokens=0;
    for(let t=0;t<p.batch;t++){
      // Deterministic quota: the first token remains inspectable in the topology.
      const hot=Math.floor((t+1)*p.skew/100)>Math.floor(t*p.skew/100);if(hot)hotTokens++;
      const used=new Set(),ids=[];
      for(const r of base.rows){const nodeBase=r.node==='a'?0:8;let rank,offset;
        if(hot){const nodeIndex=ids.filter(e=>Math.floor(e/profile.perGPU/8)===(nodeBase/8)).length;rank=nodeBase+3+Math.floor(nodeIndex/profile.perGPU);offset=nodeIndex%profile.perGPU;}
        else{rank=nodeBase+(r.localRank+t)%8;offset=(r.expert%profile.perGPU+Math.floor(t/8))%profile.perGPU;}
        let id=rank*profile.perGPU+offset;while(used.has(id)){offset=(offset+1)%profile.perGPU;id=rank*profile.perGPU+offset;}used.add(id);ids.push(id);rankLoads[rank]++;expertLoads[id]++;
      }routes.push(ids);
    }
    const chunks=[];const dispatchBytes=profile.hidden*(ctx.dtype==='bf16'?2:1),combineBytes=profile.hidden*2;
    for(let start=0;start<routes.length;start+=p.chunk){const group=routes.slice(start,start+p.chunk),loads=Array(16).fill(0);let remoteTokens=0,nvA=0,nvB=0;
      for(const ids of group){const ranks=[...new Set(ids.map(e=>Math.floor(e/profile.perGPU)))];if(ranks.some(r=>r>=8))remoteTokens++;nvA+=ranks.filter(r=>r>0&&r<8).length;nvB+=ranks.filter(r=>r>8).length;for(const e of ids)loads[Math.floor(e/profile.perGPU)]++;}
      chunks.push({index:chunks.length,start,count:group.length,loads,remoteTokens,nvA,nvB,bytes:{aD:nvA*dispatchBytes,rD:remoteTokens*dispatchBytes,bD:nvB*dispatchBytes,bC:nvB*combineBytes,rC:remoteTokens*combineBytes,aC:nvA*combineBytes}});
    }
    const maxLoad=Math.max(...rankLoads),mean=routes.length*profile.topK/16;
    return {profile,routes,rankLoads,expertLoads,chunks,dispatchBytes,combineBytes,hotTokens,maxLoad,mean,imbalance:maxLoad/mean,hottest:rankLoads.indexOf(maxLoad),assignments:routes.length*profile.topK,flopPerAssignment:6*profile.hidden*profile.intermediate};
  }
  function createJobs(work,p,mode){const jobs=[],finishes=[];const rate=p.tf*(mode==='overlap'?1-p.reserve/100:1),byId=new Map();
    function add(resource,kind,chunk,bytes,rows,deps,phase){if(bytes===0&&rows===0)return null;const compute=kind==='compute',lat=compute?p.launch:resource.startsWith('nv')?p.nvLat:p.rdLat,service=compute?rows*work.flopPerAssignment/(rate*1e6):bytes/((resource.startsWith('nv')?p.nv:p.rdma)*1000),id=jobs.length;
      const j={id,resource,kind,chunk,bytes,rows,phase,deps:[...new Set(deps.filter(x=>x!==null))],duration:lat+service,latency:lat,service};jobs.push(j);byId.set(id,j);return id;}
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
      // No communication/compute overlap: all GPUs still compute in parallel.
      const groups=work.chunks.map(()=>[]);for(const j of jobs)groups[j.chunk].push(j);
      let time=0;for(const c of work.chunks){const list=groups[c.index],apply=j=>{if(j){j.start=time;j.end=time+j.duration;time=j.end;}};
        apply(list.find(j=>j.phase==='aD'));apply(list.find(j=>j.phase==='rD'));apply(list.find(j=>j.phase==='bD'));
        const gpu=list.filter(j=>j.kind==='compute');for(const j of gpu){j.start=time;j.end=time+j.duration;}time=Math.max(time,...gpu.map(j=>j.end));
        apply(list.find(j=>j.phase==='bC'));apply(list.find(j=>j.phase==='rC'));apply(list.find(j=>j.phase==='aC'));
      }
    }else{
      let done=0;while(done<jobs.length){let best=null,bestStart=Infinity;for(const a of ready.values()){if(!a.length)continue;const j=jobs[a[0]],start=Math.max(releases[j.id],resourceEnds[j.resource]||0);if(start<bestStart||(start===bestStart&&j.id<(best?.id??Infinity))){best=j;bestStart=start;}}
        if(!best)throw Error('Invalid cyclic dependency');ready.get(best.resource).shift();const resourceWait=resourceEnds[best.resource]||0;best.blocker=resourceWait>releases[best.id]?resourceLast[best.resource]:dependencyLast[best.id];best.start=bestStart;best.end=bestStart+best.duration;resourceEnds[best.resource]=best.end;resourceLast[best.resource]=best.id;done++;
        for(const id of children[best.id]){if(best.end>releases[id]){releases[id]=best.end;dependencyLast[id]=best.id;}if(--missing[id]===0)insert(jobs[id]);}
      }
    }
    const total=Math.max(0,...jobs.map(j=>j.end)),busy={},critical={nvlink:0,rdma:0,compute:0},criticalIds=[];
    for(const j of jobs)busy[j.resource]=(busy[j.resource]||0)+j.duration;
    if(mode==='overlap'){let j=jobs.reduce((a,b)=>!a||b.end>a.end?b:a,null);const seen=new Set();while(j&&!seen.has(j.id)){seen.add(j.id);critical[j.kind]+=j.duration;criticalIds.push(j.id);j=j.blocker===null||j.blocker===undefined?null:jobs[j.blocker];}}
    return {mode,total,jobs,busy,critical,criticalIds,effectiveTF:made.rate};
  }
  function run(inputs={},context={},sensitivity=true){const p={...defaults,...inputs},ctx={profile:'v4',scenario:'mixed',dtype:'fp8',...context};const error=valid(p);if(error)return {error};const work=generate(p,ctx),serial=schedule(work,p,'serial'),pipeline=schedule(work,p,'overlap'),chosen=p.overlap?pipeline:serial;
    const result={p,ctx,work,serial,pipeline,chosen,speedup:serial.total/pipeline.total,bytes:work.chunks.reduce((a,c)=>{for(const [k,v]of Object.entries(c.bytes))a[k]=(a[k]||0)+v;return a;},{}),sensitivity:[]};
    if(sensitivity){for(const [key,field]of [['nvlink','nv'],['rdma','rdma'],['compute','tf']]){const next={...p,[field]:p[field]*2},faster=schedule(work,next,p.overlap?'overlap':'serial');result.sensitivity.push({key,time:faster.total,gain:chosen.total>0?(chosen.total-faster.total)/chosen.total:0});}result.sensitivity.sort((a,b)=>b.gain-a.gain);result.bottleneck=result.sensitivity[0].gain>=.01?result.sensitivity[0].key:'limited';}
    return result;
  }
  window.OBS_MOE_COST_MODEL={defaults,bounds,valid,generate,schedule,run};
})();
