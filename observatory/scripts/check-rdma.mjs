import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const project=fileURLToPath(new URL('../',import.meta.url));
const root=fs.existsSync(path.join(project,'dist/index.html'))?path.join(project,'dist'):project;
const sandbox={window:{},document:{querySelector:()=>null,dispatchEvent(){},addEventListener(){}},clearTimeout(){},cancelAnimationFrame(){},requestAnimationFrame(){return 1;},CustomEvent:class {}};
vm.createContext(sandbox);
for(const f of ['data','research-data','operator-data','operator-provenance','operator-context','operator','rdma-data','rdma-evidence','rdma-library-data','rdma-visuals','rdma-library','rdma-story','moe-topology-data','moe-topology','review-ledger','rdma'])vm.runInContext(fs.readFileSync(path.join(root,f+'.js'),'utf8'),sandbox,{filename:f+'.js'});
const D=sandbox.window.OBS_RDMA_DATA,O=sandbox.window.OBS_RDMA,all=sandbox.window.OBS_DATA.sources;
assert.equal(D.papers.length,D.catalog.expectedTotal);assert.ok(D.papers.length>=80);assert.equal(new Set(D.papers.map(v=>v.id)).size,D.papers.length);
assert.equal(new Set(all.map(s=>s.id)).size,all.length);
for(const m of Object.values(D.modules))for(const id of m.refs)assert.ok(all.some(s=>s.id===id),id);
for(const step of D.steps)for(const id of step.refs)assert.ok(all.some(s=>s.id===id),id);
for(const p of D.papers){assert.ok(p.authors.length>0,p.id+' authors');assert.ok(/^https:\/\//.test(p.pdf_url),p.id+' PDF');assert.ok(all.some(s=>s.id===p.sourceId),p.id+' source');if(p.guo_coauthor)assert.ok(p.authors.includes('Chuanxiong Guo'),p.id+' attribution');}
for(const id of ['irn','timely','erpc','hpcc','farm','herd','dcp2025'])assert.equal(D.papers.find(p=>p.id===id).guo_coauthor,false,id);
assert.equal(D.papers.find(p=>p.id==='collie').year,2022);
assert.ok(D.papers.find(p=>p.id==='byteexpress').pdf_url.includes('v2'));
assert.ok(D.papers.find(p=>p.id==='srnic').not_for.includes('400GE'));
assert.equal(D.prototype.ethernetGbps,100);assert.equal(D.prototype.qps,10000);
const toPlain=v=>JSON.parse(JSON.stringify(v));
assert.deepEqual(toPlain(D.lossTrace('selective',8).received),[true,true,false,true,true,true,true,true]);
assert.deepEqual(toPlain(D.lossTrace('gbn',8).received),[true,true,false,false,false,false,false,false]);
assert.equal(D.lossTrace('selective',10).wirePackets,9);assert.equal(D.lossTrace('gbn',10).wirePackets,14);
assert.equal(D.lossTrace('selective',10,'reorder').wirePackets,8);assert.equal(D.lossTrace('gbn',10,'reorder').wirePackets,13);
assert.equal(D.lossTrace('selective',9).complete,false,'payload arrival alone is not app consumption');assert.equal(D.lossTrace('selective',10).complete,true);
const base={size:1048576,gbps:400,eff:1,pcie:1000,host:1000,endpoint:0,hops:0,hop:0,queue:0,reg:0,reuse:1,path:'direct'};
assert.ok(Math.abs(D.calculate(base).network-20.97152)<1e-8,'Gbit/s to byte/us');assert.equal(D.calculate(base).lineGBs,50);
const r=D.calculate({...base,reg:40,reuse:1000});assert.equal(r.registrationShare,.04);assert.ok(Math.abs(r.first-r.pipeline-40)<1e-8);
const pcie=D.calculate({...base,gbps:800,pcie:32});assert.equal(pcie.label,'GPU–NIC路径上限');
assert.equal(D.calculate({...base,path:'host',host:10}).label,'host staging内存流量');
assert.ok(D.calculate({...base,queue:50}).pipeline-D.calculate(base).pipeline===50);
assert.equal(D.calculate({...base,eff:0}),null);assert.equal(D.calculate({...base,size:-1}),null);
for(const fractional of [{size:1.5},{hops:.5},{reuse:1.5}])assert.equal(D.calculate({...base,...fractional}),null,'discrete byte/count inputs');
O.restore(new URLSearchParams('rdTab=loss&rdPacket=8&rdAlgo=gbn&rdScenario=reorder&rdAt=.6&rdPaper=collie'));
let s=O.location();assert.equal(s.packetStep,8);assert.equal(s.scenario,'reorder');assert.equal(s.progress,.6);assert.equal(s.playing,false);
O.restore(new URLSearchParams('rdTab=bad&rdStep=999&rdPacket=-3&rdPaper=wrong&rdC_eff=9&rdC_size=-7'));
s=O.location();assert.equal(s.tab,'start');assert.equal(s.step,11);assert.equal(s.packetStep,0);assert.equal(s.paper,'srnic');assert.equal(s.eff,1);assert.equal(s.size,1);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');for(const [,asset]of html.matchAll(/(?:src|href)="([^"?#:]+\.(?:js|css))(?:\?[^"#]*)?"/g))assert.ok(fs.existsSync(path.join(root,asset)),asset);
assert.ok(html.includes('data-view="rdma"'));assert.ok(html.includes('rdma.js?v='+JSON.parse(fs.readFileSync(path.join(project,'package.json'),'utf8')).version));assert.ok(html.indexOf('rdma-evidence.js')<html.indexOf('src="app.js'));
for(const file of fs.readdirSync(root).filter(f=>/\.(js|html)$/.test(f))){const text=fs.readFileSync(path.join(root,file),'utf8').replaceAll('前字节大牛做AI网络芯片，融资数亿元','').replaceAll('字节跳动','');assert.ok(!text.includes('字节'),file+' live unit label');}
assert.ok(!fs.readFileSync(path.join(root,'rdma-evidence.js'),'utf8').includes('work/rdma-research/'));
console.log(`RDMA checks: ${D.papers.length} reading records / attribution; ${all.length} unique sources; WRITE dependencies; loss/reorder counts; GB/s units, bottlenecks, setup amortization and share-state bounds.`);

assert.ok(D.modules.srnic_qpc.body.includes('整份保存在片上'));
assert.ok(!fs.readFileSync(path.join(root,'rdma-data.js'),'utf8').includes('QPC和MTT cache'));
for(const f of sandbox.window.OBS_RDMA_VISUALS.figureMetadata)assert.ok(fs.existsSync(path.join(root,'assets/figures/rdma',f.file)),f.file);
for(const file of ['rdma.js','rdma-data.js','rdma-evidence.js'])assert.ok(!fs.readFileSync(path.join(root,file),'utf8').includes('郭传雄'),file+' gcx display');
for(const mode of ['up','out','ethernet']){const model=sandbox.window.OBS_RDMA_VISUALS.scale(mode);assert.ok(!model.includes('<svg'));if(mode==='out')assert.ok(model.includes('RNIC A')&&model.includes('RNIC B'));}
assert.ok(sandbox.window.OBS_RDMA_VISUALS.srnic().includes('MTT cache'));
console.log('Visual models: separate endpoint/fabric layers; four original figures; gcx display; QPC residency correction.');

const Library=sandbox.window.OBS_RDMA_LIBRARY;
assert.equal(Library.query().length,D.papers.length);
assert.equal(Library.query({kind:'paper'}).length,D.catalog.counts.paper);
assert.ok(Library.query({kind:'paper'}).every(p=>p.kind==='paper'));
assert.ok(Library.query({kind:'report',query:'rfc8257'}).some(p=>p.id==='rfc8257'));
assert.ok(!Library.query({kind:'standard'}).some(p=>p.id==='rfc8257'));
assert.ok(Library.query({topic:'moe'}).some(p=>p.id==='deepep25_code'));
assert.equal(Library.query({fresh:true}).length,D.catalog.addedCount);
assert.ok(Library.query({year:'undated'}).every(p=>!Number.isInteger(p.year)));
assert.ok(Library.query({year:'recent'}).every(p=>p.year>=2024&&p.year<=2026));
assert.equal(Library.query({query:'不存在的目录关键词x9x9'}).length,0);
assert.ok(Library.query({query:'NCCL 2.19.1'}).length>0);
for(const t of D.catalog.tracks){assert.ok(t.ids.length>=3);assert.equal(Library.query({track:t.id})[0].id,t.ids[0]);}
for(const p of D.papers){assert.ok(p.topics.length>0,p.id);assert.ok(p.why_read,p.id+' purpose');assert.ok(p.reading_guide.length>0,p.id+' reading guide');for(const topic of p.topics)assert.ok(D.catalog.topicNames[topic],p.id+' topic');}
O.restore(new URLSearchParams('rdTab=papers&rdL_topic=gpu&rdL_kind=docs&rdL_sort=newest&rdL_year=recent&rdL_fresh=1'));
s=O.location();assert.equal(s.topic,'gpu');assert.equal(s.kind,'docs');assert.equal(s.fresh,true);
O.restore(new URLSearchParams('rdL_topic=bad&rdL_kind=bad&rdL_track=bad'));
s=O.location();assert.equal(s.topic,'all');assert.equal(s.kind,'all');assert.equal(s.track,'all');
console.log('Directory: topics, types, tracks, years, combined search, evidence boundaries and shared filters checked.');
