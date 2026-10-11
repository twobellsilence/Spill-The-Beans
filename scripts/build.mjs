import { cp, mkdir, rm, readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { questions, modes } from '../src/questions.js';
if(questions.length<360||new Set(questions.map(q=>q.text)).size!==questions.length)throw new Error('Question count or uniqueness failed');
for(const [mode,info] of Object.entries(modes)){
  if(questions.filter(q=>q.mode===mode).length<120)throw new Error(`Insufficient ${mode} questions`);
  for(const [category] of info.categories)if(questions.filter(q=>q.mode===mode&&q.category===category).length<20)throw new Error(`Insufficient ${mode}/${category} questions`);
}
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
for(const path of ['index.html','src','public'])await cp(path,`dist/${path}`,{recursive:true});
const hash=createHash('sha256');
for(const path of ['index.html','src/app.js','src/core.js','src/questions.js','src/styles.css',... (await readdir('public')).sort().map(f=>`public/${f}`)])hash.update(await readFile(path));
const sw=await readFile('sw.js','utf8');
await writeFile('dist/sw.js',sw.replace('__VERSION__',hash.digest('hex').slice(0,12)));
await writeFile('dist/.nojekyll','');
console.log(`Built dist/: ${questions.length} distinct questions, 3 modes, 18 categories. Relative URLs support /Spill-The-Beans/.`);
