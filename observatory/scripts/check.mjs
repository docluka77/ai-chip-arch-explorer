import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const dist=fs.existsSync(path.join(root,'dist/index.html'))?path.join(root,'dist'):root;
const sandbox={window:{},document:{querySelector(){return null;}}};
vm.createContext(sandbox);
for(const f of ['data.js','research-data.js','layers.js'])vm.runInContext(fs.readFileSync(path.join(dist,f),'utf8'),sandbox,{filename:f});
const {OBS_DATA:db,OBS_CASE_DATA:study,OBS_FIGURES:figs,OBS_DETAIL:detail}=sandbox.window;
assert.equal(db.chips.length,10);
assert.equal(new Set(db.sources.map(s=>s.id)).size,db.sources.length,'Duplicate source ID');
for(const c of db.chips)for(const id of c.sources)assert.ok(db.sources.some(s=>s.id===id),'Missing source '+id);
assert.equal(study.layers.length,40);
assert.deepEqual(Array.from(study.layers.filter(l=>l.mode==='Full').map(l=>l.index)),[2,8,14,20]);
assert.deepEqual(Array.from(study.layers.filter(l=>l.mode==='Reindex').map(l=>l.index)),[24,28,32,36]);
assert.equal(study.config.routedTopK,6);assert.equal(study.config.attentionTopK,512);
for(const l of study.layers){if(l.attention!=='SWA'){assert.ok(l.kvSourceIndex<=l.index);assert.ok(l.indexSourceIndex<=l.index);assert.equal(study.layers[l.kvSourceIndex].mode,'Full');}}
const matrix=JSON.parse(JSON.stringify(detail.matrixResult(4)));
assert.deepEqual(matrix,[[2,4,5,5],[4,3,1,4],[5,3,5,3],[4,4,4,4]]);
assert.ok(detail.matrixResult(0).flat().every(v=>v===0));
assert.equal(detail.levels(db.chips.find(c=>c.id==='rtx5090')).length,6);
assert.equal(figs.bytedance.figures.length,0,'Do not invent a vendor diagram');
for(const group of Object.values(figs))for(const f of group.figures){if(f.image?.startsWith('assets/'))assert.ok(fs.existsSync(path.join(dist,f.image)),f.image+' is missing');}
for(const f of study.figures)if(f.image?.startsWith('assets/'))assert.ok(fs.existsSync(path.join(dist,f.image)),f.image+' is missing');
const mockEl=()=>({innerHTML:'',textContent:'',hidden:false,classList:{toggle(){},add(){},remove(){}},setAttribute(){},querySelectorAll(){return [];}});
const domMap=new Map();
sandbox.document.querySelector=sel=>{if(!domMap.has(sel))domMap.set(sel,mockEl());return domMap.get(sel);};
assert.deepEqual(Array.from(detail.levels(db.chips.find(c=>c.id==='groq')).map(l=>l[0])),['core','matrix']);
for(const c of db.chips){
  for(const [layer] of detail.levels(c)){
    if(layer==='overview')continue;
    for(const phase of ['decode','prefill']){
      const svg=mockEl();
      const rendered=detail.render(svg,c,{layer,stage:0,node:detail.stageNode(c,layer,0),phase,playing:false});
      assert.equal(rendered,true,`Failed to render ${c.id}/${layer}/${phase}`);
      assert.ok(!svg.innerHTML.includes('undefined')&&!svg.innerHTML.includes('NaN'),`Invalid SVG output in ${c.id}/${layer}/${phase}`);
      for(let step=0;step<5;step++){
        const nid=detail.stageNode(c,layer,step);
        const info=detail.info(nid,phase);
        assert.ok(info&&info.title&&info.body&&info.insight,`Missing infoMap entry for ${c.id}/${layer}/${phase} step ${step} (${nid})`);
      }
    }
  }
}
const rtx=db.chips.find(c=>c.id==='rtx5090');
detail.render(mockEl(),rtx,{layer:'matrix',stage:0,node:'register',phase:'decode',playing:false});
assert.equal(detail.figureClick({dataset:{},hasAttribute:a=>a==='data-matrix-reset'},rtx,{layer:'matrix'}),true);
assert.equal(detail.info('accumulator','decode').tag,'累加进度：0 / 4');
assert.equal(detail.info('register','decode').tag,'第 K 步操作数提取');
for(let i=0;i<4;i++)assert.equal(detail.figureClick({dataset:{},hasAttribute:a=>a==='data-matrix-step'},rtx,{layer:'matrix'}),true);
assert.equal(detail.info('accumulator','decode').tag,'累加进度：4 / 4');
assert.equal(detail.info('register','decode').tag,'已完成 4 步提取');
const matrixSvg=mockEl();
detail.render(matrixSvg,rtx,{layer:'matrix',stage:0,node:'register',phase:'decode',playing:false});
assert.ok(matrixSvg.innerHTML.includes('已完成 k=0..3 全部提取'));
const html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css|svg))"/g))assert.ok(fs.existsSync(path.join(dist,match[1])),'Missing entry asset '+match[1]);
console.log(`Verified: 10 chips, ${db.sources.length} sources, all chip detail layers & stageNodes, 40 model layers, shared-KV topology, matrix results, and local figure assets.`);

