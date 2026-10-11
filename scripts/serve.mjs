import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
const root=resolve(process.argv[2]||'.'), port=Number(process.env.PORT||4173);
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webmanifest':'application/manifest+json'};
createServer(async(req,res)=>{
  try{
    let path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    // Mirror the exact GitHub Pages subpath as well as local root.
    path=path.replace(/^\/Spill-The-Beans(?=\/|$)/,'');
    const file=resolve(root,`.${path||'/'}`);
    if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
    const info=await stat(file);const target=info.isDirectory()?resolve(file,'index.html'):file;
    res.writeHead(200,{'Content-Type':types[extname(target)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(await readFile(target));
  }catch{res.writeHead(404);res.end('Not found');}
}).listen(port,'0.0.0.0',()=>console.log(`Local: http://localhost:${port}/Spill-The-Beans/`));
