import { questions, questionById, modes } from './questions.js';
export const STORAGE_KEY = 'spill-the-beans-v1';
export const defaults = () => ({version:1, favourites:[], history:[], seen:[], preferences:{family:{category:'all',filter:'all'}, friends:{category:'all',filter:'both'}, work:{category:'all',filter:'all'}}});
export function eligible({mode='surprise',category='all',filter}={}) {
  return questions.filter(q => {
    if (mode === 'surprise') return q.broad && q.category !== 'faith';
    if (q.mode !== mode || (category !== 'all' && q.category !== category)) return false;
    if (q.category === 'faith' && category !== 'faith') return false;
    if (mode === 'family') return q.ages.includes(filter || 'all');
    if (mode === 'friends') return filter === 'both' || !filter || q.depth === filter;
    return !filter || filter === 'all' || q.contexts.includes('all') || q.contexts.includes(filter);
  });
}
export function unseen(pool, state) { const seen = new Set(state.seen); return pool.filter(q => !seen.has(q.id)); }
export function pick(pool, state, random=Math.random) { const available = unseen(pool,state); return available.length ? available[Math.min(available.length-1,Math.floor(Math.max(0,random())*available.length))] : null; }
export function record(state, q, now=Date.now()) {
  if (!state.seen.includes(q.id)) state.seen.push(q.id);
  state.history = [{id:q.id,at:now}, ...state.history.filter(h => h.id !== q.id)].slice(0,questions.length);
  return state;
}
export function toggleFavourite(state,id) { if(!questionById.has(id)) return; state.favourites = state.favourites.includes(id) ? state.favourites.filter(i=>i!==id) : [id,...state.favourites]; }
export function resetPool(state,pool) { const ids = new Set(pool.map(q=>q.id)); state.seen = state.seen.filter(id=>!ids.has(id)); }
export function sanitize(value) {
  const state = defaults();
  if (!value || typeof value !== 'object' || value.version !== 1) return state;
  for(const key of ['favourites','seen']) if(Array.isArray(value[key])) state[key] = [...new Set(value[key].filter(id=>typeof id === 'string' && questionById.has(id)))];
  if(Array.isArray(value.history)) {
    const unique = new Set();
    state.history = value.history.filter(h=>h && questionById.has(h.id) && Number.isFinite(h.at) && !unique.has(h.id) && unique.add(h.id)).slice(0,questions.length).map(h=>({id:h.id,at:h.at}));
  }
  for(const [mode,info] of Object.entries(modes)) {
    const pref = value.preferences?.[mode];
    if(pref && typeof pref === 'object') {
      if(['all',...info.categories.map(c=>c[0])].includes(pref.category)) state.preferences[mode].category = pref.category;
      if(info.filters.some(f=>f[0]===pref.filter)) state.preferences[mode].filter = pref.filter;
    }
  }
  return state;
}
export function loadState(storage) {
  let raw;
  try { raw=storage.getItem(STORAGE_KEY); } catch { return {state:defaults(),unavailable:true}; }
  try { return {state:sanitize(raw ? JSON.parse(raw) : null),unavailable:false}; }
  catch { return {state:defaults(),unavailable:false,reset:true}; }
}
export function saveState(storage,state) { try { storage.setItem(STORAGE_KEY,JSON.stringify(state)); return true; } catch { return false; } }
export function shareUrl(q, url) { const target = new URL(url); target.search=''; target.hash=`question/${q.id}`; return target.href; }
export async function shareQuestion(q,env) {
  const text=`${q.text}\n\nSpill the Beans 🫘 — Good conversations start here.`;
  const url=shareUrl(q,env.url);
  if(env.share) { try { await env.share({title:'Spill the Beans 🫘',text,url}); return 'shared'; } catch(error) { if(error.name==='AbortError') return 'cancelled'; } }
  if(env.copy) { try { await env.copy(`${text}\n${url}`); return 'copied'; } catch { /* Manual selectable fallback. */ } }
  return {text:`${text}\n${url}`};
}
