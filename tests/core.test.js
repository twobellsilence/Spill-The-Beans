import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {questions,modes,questionById} from '../src/questions.js';
import {eligible,unseen,pick,record,toggleFavourite,resetPool,defaults,sanitize,loadState,saveState,shareQuestion,shareUrl,STORAGE_KEY} from '../src/core.js';
test('840 distinct cards, all categories doubled plus preschool coverage',()=>{
  assert.equal(questions.length,840);assert.equal(new Set(questions.map(q=>q.text.toLowerCase())).size,840);assert.equal(questionById.size,840);
  for(const [mode,m] of Object.entries(modes)){assert.equal(questions.filter(q=>q.mode===mode).length,mode==='family'?360:240);for(const [c] of m.categories)assert.equal(questions.filter(q=>q.mode===mode&&q.category===c).length,mode==='family'?60:40);}
});
test('Every audience/category combination has eligible questions with correct metadata',()=>{
  for(const [mode,m] of Object.entries(modes))for(const [filter] of m.filters)for(const category of ['all',...m.categories.map(c=>c[0])]){
    const pool=eligible({mode,category,filter});assert.ok(pool.length>0,`${mode}/${category}/${filter}`);
    for(const q of pool){assert.equal(q.mode,mode);if(category!=='all')assert.equal(q.category,category);if(mode==='family')assert.ok(q.ages.includes(filter));if(mode==='friends'&&filter!=='both')assert.equal(q.depth,filter);if(mode==='work'&&filter!=='all')assert.ok(q.contexts.includes('all')||q.contexts.includes(filter));}
  }
});
test('Faith is explicit opt-in; home Surprise Me is broad',()=>{
  assert.ok(eligible({mode:'family',category:'faith',filter:'all'}).length);
  for(const mode of ['family','friends','work','surprise'])assert.ok(eligible({mode}).every(q=>q.category!=='faith'));
  assert.ok(eligible({mode:'surprise'}).every(q=>q.broad));assert.deepEqual(new Set(eligible({mode:'surprise'}).map(q=>q.mode)),new Set(['family','friends','work']));
});
test('Every family category includes younger-child and older-specific material',()=>{
  for(const [category] of modes.family.categories){const all=eligible({mode:'family',category,filter:'all'});const kids=eligible({mode:'family',category,filter:'kids'});const adults=eligible({mode:'family',category,filter:'adults'});assert.equal(all.length,24);assert.equal(kids.length,28);assert.equal(adults.length,40);}
});
test('Random rotation exhausts without repeats, remembers overlap and supports pool reset',()=>{
  const state=defaults();const pool=eligible({mode:'family',filter:'kids'});let prior=null;
  for(let i=0;i<pool.length;i++){const q=pick(pool,state,()=>.63);assert.ok(q);assert.ok(!state.seen.includes(q.id));record(state,q);prior=q;}
  assert.equal(pick(pool,state),null);assert.equal(unseen(pool,state).length,0);
  assert.ok(unseen(eligible({mode:'family',category:'laugh',filter:'kids'}),state).length===0);
  const other=questions.find(q=>q.mode==='work');record(state,other);resetPool(state,pool);assert.deepEqual(state.seen,[other.id]);assert.equal(unseen(pool,state).length,pool.length);assert.ok(state.history.some(h=>h.id===prior.id));
});
test('Favourites toggle independently from history and survive persisted reload',()=>{
  const state=defaults(),q=questions[0];toggleFavourite(state,q.id);record(state,q,123);const data=new Map();const storage={getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v)};
  assert.equal(saveState(storage,state),true);assert.deepEqual(loadState(storage).state,state);toggleFavourite(state,q.id);assert.equal(state.favourites.length,0);assert.equal(state.history.length,1);
  record(state,q,456);assert.equal(state.history.length,1);assert.equal(state.history[0].at,456);
});
test('Corrupted, denied, old and structurally invalid storage fail safely',()=>{
  assert.deepEqual(loadState({getItem:()=>'{broken'}),{state:defaults(),unavailable:false,reset:true});assert.equal(saveState(null,defaults()),false);assert.equal(loadState(null).unavailable,true);
  const throwing={getItem:()=>{throw Error('denied')},setItem:()=>{throw Error('quota')}};assert.equal(loadState(throwing).unavailable,true);assert.equal(saveState(throwing,defaults()),false);
  assert.deepEqual(sanitize({version:2}),defaults());const s=sanitize({version:1,favourites:['bad',questions[0].id,questions[0].id],seen:[null,questions[0].id],history:[null,{id:questions[0].id,at:123},{id:questions[0].id,at:456}],preferences:{family:{category:'bad',filter:'bad'},friends:{category:'rather',filter:'deep'}}});assert.equal(s.favourites.length,1);assert.equal(s.history.length,1);assert.equal(s.preferences.family.category,'all');assert.equal(s.preferences.friends.filter,'deep');
  assert.equal(STORAGE_KEY,'spill-the-beans-v1');
});
test('Preferences persist and one filter never leaks into another mode',()=>{
  const s=defaults();s.preferences.family={category:'faith',filter:'teens'};s.preferences.work={category:'grow',filter:'new'};const restored=sanitize(JSON.parse(JSON.stringify(s)));assert.deepEqual(restored,s);assert.equal(restored.preferences.friends.filter,'both');
});
test('Sharing supports native, cancellation, clipboard, and manual fallback with Pages deep links',async()=>{
  const q=questions[0],url='https://twobellsilence.github.io/Spill-The-Beans/?x=1#home';assert.equal(shareUrl(q,url),`https://twobellsilence.github.io/Spill-The-Beans/#question/${q.id}`);
  let received;assert.equal(await shareQuestion(q,{url,share:async v=>received=v}),'shared');assert.equal(received.url,shareUrl(q,url));
  assert.equal(await shareQuestion(q,{url,share:async()=>{const e=Error();e.name='AbortError';throw e;},copy:async()=>assert.fail('Cancelled native share must not copy')}),'cancelled');
  assert.equal(await shareQuestion(q,{url,share:async()=>{throw Error('unsupported')},copy:async v=>received=v}),'copied');assert.ok(received.includes(q.text));
  const manual=await shareQuestion(q,{url,copy:async()=>{throw Error('denied')}});assert.ok(manual.text.includes(q.id));
});
test('Local flavour, interests and participation stay a minority; no quiz mechanics',()=>{
  const count=re=>questions.filter(q=>re.test(q.text)).length;
  assert.ok(count(/singapore|hawker|MRT/i)>=5);assert.ok(count(/singapore|hawker|MRT/i)<30);
  assert.ok(count(/pokémon|star wars|football|world cup/i)>=5);assert.ok(count(/pokémon|star wars|football|world cup/i)<30);
  assert.ok(count(/everyone|person beside|person next|each remember/i)>=10);assert.ok(count(/everyone|person beside|person next|each remember/i)<60);
  assert.equal(count(/correct answer|highest score|leaderboard/i),0);
});
test('Manifest and service worker use relative URLs; deployment builds and tests PRs before publishing main',async()=>{
  const manifest=JSON.parse(await readFile('public/manifest.webmanifest','utf8'));assert.equal(manifest.scope,'../');assert.equal(manifest.start_url,'../');assert.equal(manifest.icons.length,3);
  const html=await readFile('index.html','utf8');assert.ok(html.includes('viewport-fit=cover'));assert.ok(html.includes('apple-touch-icon'));assert.ok(!/(?:src|href)="\//.test(html));
  const workflow=await readFile('.github/workflows/deploy.yml','utf8');assert.ok(workflow.includes('npm test'));assert.ok(workflow.includes('npm run build'));assert.ok(workflow.includes("if: github.event_name != 'pull_request'"));
  const sw=await readFile('sw.js','utf8');for(const p of ['src/app.js','src/core.js','src/questions.js','src/styles.css'])assert.ok(sw.includes(p));assert.ok(sw.includes('startsWith(scope.pathname)'));
});

test('Local PNG icons include correct dimensions and maskable artwork',async()=>{
  for(const [name,size] of [['icon-192.png',192],['icon-512.png',512],['icon-maskable.png',512]]) { const png=await readFile(`public/${name}`);assert.equal(png.subarray(1,4).toString(),'PNG');assert.equal(png.readUInt32BE(16),size);assert.equal(png.readUInt32BE(20),size); }
});

