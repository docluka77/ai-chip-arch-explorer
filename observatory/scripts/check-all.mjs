import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const cwd=fileURLToPath(new URL('../',import.meta.url));
const prefix=fs.existsSync(path.join(cwd,'dist/index.html'))?'dist/':'';
const syntax=['data','research-data','layers','case-study','operator-data','operator-provenance','operator-context','operator','rdma-data','rdma-evidence','rdma-library-data','rdma-visuals','rdma-library','rdma-story','moe-topology-data','moe-cost-model','moe-cost','moe-topology','review-ledger','rdma','app','experience'];
for(const args of [...syntax.map(f=>['--check',`${prefix}${f}.js`]),['scripts/check.mjs'],['scripts/check-operator.mjs'],['scripts/check-rdma.mjs'],['scripts/check-experience.mjs'],['scripts/check-moe.mjs'],['scripts/check-moe-cost.mjs']]){
  const r=spawnSync(process.execPath,args,{cwd,stdio:'inherit'});
  if(r.error)throw r.error;
  if(r.status!==0)process.exit(r.status||1);
}
