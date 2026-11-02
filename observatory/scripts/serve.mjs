import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {existsSync} from 'node:fs';
const project=fileURLToPath(new URL('../',import.meta.url));
const repoRoot=resolve(project,'..');
const root=existsSync(resolve(repoRoot,'index.html'))?repoRoot:(existsSync(resolve(project,'dist/index.html'))?resolve(project,'dist'):project);
const port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8','.md':'text/markdown; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2'};
http.createServer(async(req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(pathname==='/observatory'||pathname==='/observatory/archive/v01'){res.writeHead(302,{Location:pathname+'/'});res.end();return;}
    const rel=pathname.endsWith('/')?pathname+'index.html':pathname;
    let target=resolve(root,'.'+rel);
    if(!target.startsWith(resolve(root)+sep)){res.writeHead(403);res.end('Forbidden');return;}
    if(!existsSync(target)&&root===repoRoot){
      const fallback=resolve(project,'.'+rel);
      if(fallback.startsWith(resolve(project)+sep)&&existsSync(fallback))target=fallback;
    }
    const st=await stat(target);
    if(st.isDirectory()){res.writeHead(302,{Location:pathname+'/'});res.end();return;}
    const body=await readFile(target);res.writeHead(200,{'Content-Type':mime[extname(target).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(body);
  }catch{res.writeHead(404);res.end('Not found');}
}).listen(port,'127.0.0.1',()=>process.stdout.write(`Local Page 01: http://127.0.0.1:${port}/\nLocal Page 02: http://127.0.0.1:${port}/observatory/\n`));

