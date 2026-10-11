import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { questions, modes, questionById } from '../src/questions.js';
import { eligible, defaults, sanitize, pick, record, resetPool } from '../src/core.js';

const normalize = text => text.toLowerCase().normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
test('Question IDs, normalized text and audience markers are valid and unique', () => {
  assert.equal(new Set(questions.map(q=>q.id)).size,840);
  assert.equal(new Set(questions.map(q=>normalize(q.text))).size,840);
  for(const q of questions) {
    assert.ok(q.text.trim());
    assert.ok(modes[q.mode].categories.some(c=>c[0]===q.category));
    if(q.mode==='family') assert.ok(q.ages.length && q.ages.every(a=>modes.family.filters.some(f=>f[0]===a)));
    if(q.mode==='friends') assert.ok(['laughs','both','deep'].includes(q.depth));
    if(q.mode==='work') assert.ok(q.contexts.length && q.contexts.every(c=>modes.work.filters.some(f=>f[0]===c)));
  }
});
test('All 360 original IDs survive saved favourites, history and seen state', () => {
  const ids=Object.entries(modes).flatMap(([mode,m])=>m.categories.flatMap(([category])=>Array.from({length:20},(_,i)=>`${mode}-${category}-${String(i+1).padStart(2,'0')}`)));
  assert.ok(ids.every(id=>questionById.has(id)));
  const original=ids.map(id=>questionById.get(id));
  assert.equal(createHash('sha256').update(JSON.stringify(original)).digest('hex'),'c6a1bc2a65f8f977eadf5aa3d042aab6160098240bbeea8c4463fb697892cb6c');
  const state=defaults();state.favourites=[...ids];state.seen=[...ids];state.history=ids.map((id,i)=>({id,at:i}));
  assert.deepEqual(sanitize(JSON.parse(JSON.stringify(state))),state);
});
test('Little Ones has 20 short, dedicated cards per category and persists independently', () => {
  assert.deepEqual(modes.family.filters.map(f=>f[0]),['little','kids','tweens','teens','adults','all']);
  for(const [category] of modes.family.categories) {
    const pool=eligible({mode:'family',category,filter:'little'});
    assert.equal(pool.length,20);
    for(const q of pool) {
      assert.deepEqual(q.ages,['little']);assert.equal(q.broad,false);
      assert.ok(q.text.split(/\s+/).length<=20,q.id);
      assert.ok(!eligible({mode:'family',category,filter:'all'}).includes(q));
    }
    const state=defaults();
    for(let i=0;i<20;i++) {const q=pick(pool,state,()=>0.5);assert.ok(q);record(state,q);}
    const restored=sanitize(state);assert.equal(pick(pool,restored),null);
    resetPool(restored,pool);assert.equal(restored.seen.length,0);assert.equal(restored.history.length,20);
  }
  const state=defaults();state.preferences.family={category:'faith',filter:'little'};
  assert.deepEqual(sanitize(state),state);
  assert.equal(eligible({mode:'family',filter:'little'}).length,100);
  assert.ok(eligible({mode:'family',filter:'little'}).every(q=>q.category!=='faith'));
});
test('Year prompts are distributed across all categories and remain a small minority', () => {
  const seasonal=q=>/this year|next year|coming year/.test(q.text);
  for(const [mode,m] of Object.entries(modes))for(const [category] of m.categories)assert.ok(questions.some(q=>q.mode===mode&&q.category===category&&seasonal(q)),`${mode}/${category}`);
  assert.ok(questions.filter(seasonal).length<questions.length/10);
});
test('Every added runtime module is cached and included in the cache fingerprint',async()=>{
  const sw=await readFile('sw.js','utf8'),build=await readFile('scripts/build.mjs','utf8');
  assert.ok(sw.includes('src/expansion.js'));assert.ok(build.includes('src/expansion.js'));
});
