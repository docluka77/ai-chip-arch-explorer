import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const project=fileURLToPath(new URL('../',import.meta.url)),root=fs.existsSync(path.join(project,'dist/index.html'))?path.join(project,'dist'):project;
const sandbox={window:{},document:{querySelector:()=>null,dispatchEvent(){}},cancelAnimationFrame(){},requestAnimationFrame(){return 1;},CustomEvent:class {}};
vm.createContext(sandbox);
for(const f of ['moe-topology-data','moe-topology'])vm.runInContext(fs.readFileSync(path.join(root,f+'.js'),'utf8'),sandbox,{filename:f});
const D=sandbox.window.OBS_MOE_DATA,M=sandbox.window.OBS_MOE;
assert.equal(D.steps.length,12);
assert.ok(D.steps[0].code.includes('weights, topk_idx = gate(x)'));
assert.ok(M.apiCode('fp8').includes('use_fp8_dispatch=True'));
assert.ok(M.apiCode('fp8').includes('(fp8_data, scales)'));
assert.ok(M.apiCode('bf16').includes('use_fp8_dispatch=False'));
assert.deepEqual(JSON.parse(JSON.stringify(D.model('mixed').rows.find(r=>r.expert===8).value)),JSON.parse(JSON.stringify(D.model('local').rows.find(r=>r.expert===8).value)),'one expert keeps the same synthetic function across routes');
for(const name of Object.keys(D.presets))for(const dtype of ['fp8','bf16']){
  const m=D.model(name,dtype);assert.equal(m.rows.length,8);assert.equal(new Set(m.rows.map(r=>r.expert)).size,8);
  assert.ok(new Set(m.rows.map(r=>Math.floor(r.expert/32))).size<=4,'node-limited routing');assert.ok(Math.abs(m.weightSum-2.5)<1e-12);
  for(const r of m.rows){assert.equal(r.rank,Math.floor(r.expert/4));assert.ok(r.expert>=0&&r.expert<256);}
  for(let k=0;k<2;k++){assert.ok(Math.abs(m.localSum[k]+m.remoteSum[k]-m.routed[k])<1e-12,'hierarchical combine must conserve weighted outputs');assert.equal(m.total[k],m.routed[k]+m.shared[k]);}
  assert.equal(m.dispatchBytes,dtype==='fp8'?7168:14336);assert.equal(m.combineBytes,14336);
  for(let step=0;step<12;step++){
    M.restore(new URLSearchParams({mtScenario:name,mtStep:String(step)}));const a=M.active(m),svg=M.graph(m);
    assert.ok(!svg.includes('undefined'));assert.equal((svg.match(/data-mt-module="gpu-/g)||[]).length,16);
    if(!m.remote.length)assert.ok(!a.edges.some(id=>id.startsWith('rdma')||id.startsWith('dma')),'local-only path must not invent network traffic');
    if(step===3&&m.remote.length)assert.ok(a.nodes.includes('gpu-b-0'),'B0 must forward even when its experts are unselected');
    if(step===9)assert.equal(a.reverse,true,'combine must return toward the origin');
  }
}
const local=D.model('local');assert.equal(local.rdmaCopies,0);assert.equal(local.nvCopies,7);
const mixed=D.model('mixed');assert.equal(mixed.rdmaCopies,1);assert.equal(mixed.naiveExpertCopies,4);assert.equal(mixed.nvCopies,7);assert.ok(!mixed.remoteRanks.includes(0));
const packed=D.model('packed');assert.equal(packed.remote.length,4);assert.equal(packed.remoteRanks.length,1);assert.equal(packed.nvCopies,2);assert.equal(packed.rdmaCopies,1);
for(const s of D.steps)for(const key of s.refs)assert.ok(D.sources[key]?.url.startsWith('https://'),key);
M.restore(new URLSearchParams('mtStep=999&mtScenario=bad&mtAt=99&mtDtype=bad&mtFocus=<script>'));let s=M.location();assert.equal(s.step,11);assert.equal(s.scenario,'mixed');assert.equal(s.progress,1);assert.equal(s.focus,'router');assert.equal(s.playing,false);
M.restore(new URLSearchParams('mtStep=4&mtScenario=packed&mtAt=.37&mtDtype=bf16&mtFocus=gpu-b-3&mtFit=1'));s=M.location();assert.equal(s.step,4);assert.equal(s.scenario,'packed');assert.equal(s.dtype,'bf16');assert.equal(s.progress,.37);assert.equal(s.fit,true);assert.equal(s.focus,'gpu-b-3');
M.restore(new URLSearchParams('mtStep=2&mtScenario=mixed'));let svg=M.graph(mixed);assert.match(svg,/data-mt-edge="a-2" data-reverse="true"/,'NVLink fanout points from fabric to target');assert.match(svg,/data-mt-edge="a-0" data-reverse="false"/,'source enters fabric');
M.restore(new URLSearchParams('mtStep=8'));svg=M.graph(mixed);assert.match(svg,/data-mt-edge="b-1" data-reverse="false"/,'expert returns toward fabric');assert.match(svg,/data-mt-edge="b-0" data-reverse="true"/,'fabric returns to relay');
console.log('MoE checks: 4 distributions × 2 dtypes × 12 steps; EP mapping, routing limit, weighted-sum conservation, payload counts, reverse arrows and shared-state bounds.');
