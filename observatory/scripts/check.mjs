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
const html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css|svg))"/g))assert.ok(fs.existsSync(path.join(dist,match[1])),'Missing entry asset '+match[1]);
console.log(`Verified: 10 chips, ${db.sources.length} sources, 40 model layers, shared-KV topology, matrix results, and local figure assets.`);
