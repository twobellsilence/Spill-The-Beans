import {modes, questions, questionById, categoryInfo} from './questions.js';
import {eligible,unseen,pick,record,toggleFavourite,resetPool,loadState,saveState,shareQuestion} from './core.js';
const main=document.querySelector('main');
const dialog=document.querySelector('#dialog');
let storage;
try { storage=window.localStorage; } catch { storage=null; }
const loaded=loadState(storage);
let state=loaded.state, storageWarning=loaded.unavailable, current=null, pool=[], session=null, view='home', listFilter='all', toastTimer;
const esc=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const heart=(id)=>state.favourites.includes(id);
const icon=(name)=>({heart:'♡',saved:'♥',share:'<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>',next:'→',back:'←',shuffle:'<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h3c5 0 7 12 12 12h3M3 18h3c2 0 3-2 4-4m4-4c1-2 2-4 4-4h3m-3-3 3 3-3 3m0 6 3 3-3 3"/></svg>'}[name]);
function notify(text) { const toast=document.querySelector('#toast'); toast.textContent=text; toast.classList.add('visible'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove('visible'),3600); }
function persist() { if(!saveState(storage,state) && !storageWarning) { storageWarning=true; notify('Your browser cannot save right now. This visit still works.'); } updateNav(); }
function updateNav() {
  document.querySelectorAll('[data-nav]').forEach(a=>{const active=a.dataset.nav===view || (a.dataset.nav==='home' && ['mode','talk','question'].includes(view)); a.classList.toggle('active',active); active?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current');});
  const count=document.querySelector('#favourite-count'); count.textContent=state.favourites.length; count.hidden=!state.favourites.length;
}
function navigate(hash) { if(location.hash===`#${hash}`) route(); else location.hash=hash; }
function finish({focus=true}={}) { updateNav(); if(focus) { window.scrollTo({top:0,behavior:'instant'}); main.focus({preventScroll:true}); } }
function doodle() { return `<svg class="hero-doodle" viewBox="0 0 300 260" role="img" aria-label="Two friendly beans sharing a conversation"><path d="M54 190Q36 211 22 217M241 197q19 9 27 23" fill="none" stroke="#49362a" stroke-width="3" stroke-linecap="round"/><path d="M88 123c-49-13-66 70-25 92 25 14 41-2 42-25 2-23 36-52-17-67Z" fill="#bdcfb2" stroke="#49362a" stroke-width="3"/><path d="M213 104c-45-27-88 42-64 81 20 32 66 20 70-7 3-23 31-47-6-74Z" fill="#eaa28a" stroke="#49362a" stroke-width="3"/><path d="M78 147q-20 34 2 50M186 128q-17 26 1 53" fill="none" stroke="#49362a" stroke-width="2.5"/><circle cx="57" cy="160" r="3" fill="#49362a"/><circle cx="88" cy="165" r="3" fill="#49362a"/><path d="M60 176q10 13 20 0" fill="none" stroke="#49362a" stroke-width="2.5" stroke-linecap="round"/><circle cx="167" cy="145" r="3" fill="#49362a"/><circle cx="201" cy="151" r="3" fill="#49362a"/><path d="M169 164q10 13 20 0" fill="none" stroke="#49362a" stroke-width="2.5" stroke-linecap="round"/><path d="m100 205 8 23m-47-19-9 19m114-29-7 29m47-27 7 27" stroke="#49362a" stroke-width="3" stroke-linecap="round"/><path d="M47 49q-8-23 18-30h52q30 6 22 33-4 17-33 17l-18 17 1-18H68Q50 67 47 49Z" fill="#fffdf8" stroke="#49362a" stroke-width="2"/><text x="65" y="50" fill="#49362a" font-size="15" font-family="Georgia,serif">what if…</text><path d="M180 45q-4-15 17-21h37q26 3 23 22-2 17-24 18l-7 16-9-16h-17q-20-1-20-19Z" fill="#f4d579" stroke="#49362a" stroke-width="2"/><text x="200" y="51" font-size="19" fill="#49362a">♡</text><path d="m143 96 2-10m-22 8-8-5m37 13 8-5" stroke="#49362a" stroke-width="2" stroke-linecap="round"/></svg>`; }
function home() {
  view='home'; current=null; session=null;
  main.innerHTML=`<section class="hero"><div class="hero-copy"><p class="eyebrow"><span class="tiny-star">✳</span> GOOD CONVERSATIONS START HERE</p><h1>A little question.<br>A whole lot of <em>connection.</em></h1><p class="hero-description">Put the phones down. Pull a little closer.<br>There’s a good conversation waiting to happen.</p><button class="primary surprise-home" data-action="surprise">${icon('shuffle')} Surprise Me <span>${icon('share')}</span></button><p class="small-note">No planning. No right answers. Just you, together.</p></div>${doodle()}</section><section class="mode-section" aria-labelledby="mode-title"><div class="section-heading"><h2 id="mode-title">Who’s at the table?</h2><span>Find your kind of conversation</span></div><div class="mode-grid">${Object.entries(modes).map(([id,m],i)=>`<a class="mode-card ${m.color}" href="#mode/${id}"><div class="mode-card-top"><span class="mode-emoji" aria-hidden="true">${m.icon}</span><span class="card-index">0${i+1}</span></div><h3>${m.name}</h3><p>${m.description}</p><span class="card-cta">${m.invitation}<span class="round-arrow">${icon('share')}</span></span></a>`).join('')}</div></section><div class="home-footnote"><span class="mini-beans" aria-hidden="true">✦</span><p>From belly laughs to “I never knew that about you.”<br><strong>360 little ways to get closer.</strong></p></div>${storageWarning?'<p class="storage-note">Browser storage is unavailable. Your choices will last for this visit only.</p>':''}`;
  finish();
}
function selection(mode,{focus=true}={}) {
  const m=modes[mode]; if(!m) return navigate('home');
  view='mode'; session=null; current=null; const pref=state.preferences[mode];
  const amount=eligible({mode,...pref}).length;
  main.innerHTML=`<section class="selection ${m.color}"><a class="back-link" href="#home">← Back to the table</a><div class="page-title"><span class="title-emoji" aria-hidden="true">${m.icon}</span><p class="eyebrow">MAKE ROOM FOR A GOOD CONVERSATION</p><h1>${m.name}</h1><p>${m.description}</p></div><fieldset class="filter-field"><legend>${m.filterLabel}</legend><div class="filter-options">${m.filters.map(([id,label])=>`<button class="chip ${pref.filter===id?'selected':''}" data-action="filter" data-mode="${mode}" data-value="${id}" aria-pressed="${pref.filter===id}">${label}</button>`).join('')}</div></fieldset><div class="section-heading category-heading"><h2>What are you in the mood for?</h2><span>Choose one, or mix it up</span></div><div class="category-grid"><button class="category-card all-category ${pref.category==='all'?'selected':''}" data-action="category" data-mode="${mode}" data-value="all" aria-pressed="${pref.category==='all'}"><span aria-hidden="true">✳</span><strong>All Categories</strong><small>A little bit of everything${mode==='family'?' · excludes Faith & Values':''}</small><span class="selection-check" aria-hidden="true">${pref.category==='all'?'✓':'+'}</span></button>${m.categories.map(([id,emoji,name,desc])=>`<button class="category-card ${pref.category===id?'selected':''}" data-action="category" data-mode="${mode}" data-value="${id}" aria-pressed="${pref.category===id}"><span aria-hidden="true">${emoji}</span><strong>${name}</strong><small>${desc}</small><span class="selection-check" aria-hidden="true">${pref.category===id?'✓':'+'}</span>${id==='faith'?'<span class="opt-in">OPTIONAL · CHRISTIAN</span>':''}</button>`).join('')}</div><div class="start-row"><p><strong>${amount} questions</strong> for your kind of company<br><span>Everyone can pass on any question. No explanation needed.</span></p><div class="start-actions"><button class="secondary" data-action="start" data-mode="${mode}">${icon('shuffle')} Surprise Me</button><button class="primary" data-action="start" data-mode="${mode}">Let’s talk <span>→</span></button></div></div></section>`;
  finish({focus});
}
function start(mode) { session=mode==='surprise'?{mode:'surprise'}:{mode,...state.preferences[mode]}; pool=eligible(session); view='talk'; current=pick(pool,state); if(current){record(state,current);persist();} navigate(`talk/${mode}`); }
function showTalk() {
  view='talk'; if(!session) return navigate('home');
  const m=current?modes[current.mode]:session.mode==='surprise'?null:modes[session.mode];
  const remaining=unseen(pool,state).length;
  main.innerHTML=`<section class="conversation ${m?.color||'sage'}"><div class="conversation-toolbar"><a class="back-link" href="${session.mode==='surprise'?'#home':`#mode/${session.mode}`}">← ${session.mode==='surprise'?'Back to the table':modes[session.mode].name}</a>${session.mode!=='surprise'?`<a class="text-link" href="#mode/${session.mode}">Change filters ${icon('shuffle')}</a>`:'<span class="small-note">A little bit of everything</span>'}</div>${current?questionCard(current):`<div class="question-card exhausted"><span class="card-spark" aria-hidden="true">✳</span><p class="eyebrow">LOOK AT ALL THOSE CONVERSATIONS</p><h1>You’ve spilled<br>every bean.</h1><p>You’ve explored all ${pool.length} questions in this selection.<br>Mix them up again, or try a different mood.</p><button class="primary" data-action="reshuffle">${icon('shuffle')} Reshuffle this selection</button><a class="text-link" href="${session.mode==='surprise'?'#home':`#mode/${session.mode}`}">Explore something else →</a></div>`}<div class="question-bottom">${current?`<p><span class="progress-dot"></span> ${remaining} of ${pool.length} questions left<br><small>${remaining?'Fresh questions, every time.':'That was the last fresh question in this selection.'}</small></p><button class="primary next-button" data-action="next">${remaining?'Next Question':'Finish this selection'} <span>→</span></button>`:''}</div><p class="gentle-note">Take your time. Follow the tangents. You can always pass.</p></section>`;
  finish();
}
function questionCard(q,{revisit=false}={}) { const m=modes[q.mode], cat=categoryInfo(q); return `<article class="question-card ${m.color}" aria-labelledby="question-text"><div class="question-card-label"><span>${m.icon} ${m.name}</span><span class="category-pill">${cat[1]} ${cat[2]}</span></div><div class="question-body"><span class="card-spark" aria-hidden="true">✳</span><h1 id="question-text">${esc(q.text)}</h1><span class="card-line" aria-hidden="true"></span></div><div class="question-card-actions"><span class="card-kicker">${revisit?'A QUESTION WORTH COMING BACK TO':'ONE QUESTION. SO MANY POSSIBILITIES.'}</span><div><button class="card-action favourite ${heart(q.id)?'is-saved':''}" data-action="favourite" data-id="${q.id}" aria-label="${heart(q.id)?'Remove from favourites':'Save to favourites'}" aria-pressed="${heart(q.id)}">${icon(heart(q.id)?'saved':'heart')}</button><button class="card-action" data-action="share" data-id="${q.id}" aria-label="Share question">${icon('share')}</button></div></div></article>`; }
function next() { current=pick(pool,state); if(current){record(state,current);persist();} showTalk(); }
function revisit(id) {
  const q=questionById.get(id); if(!q) { notify('That question could not be found.'); return navigate('home'); }
  view='question'; current=q; record(state,q); persist();
  main.innerHTML=`<section class="conversation ${modes[q.mode].color}"><div class="conversation-toolbar"><button class="text-button back-link" data-action="return">← Back</button><a class="text-link" href="#mode/${q.mode}">Explore ${modes[q.mode].name} →</a></div>${questionCard(q,{revisit:true})}<p class="gentle-note">Good questions are always worth another conversation.</p></section>`;
  finish();
}
function list(kind,{focus=true}={}) {
  view=kind; current=null;
  const items=(kind==='favourites'?state.favourites:state.history.map(h=>h.id)).map(id=>questionById.get(id)).filter(q=>q && (listFilter==='all'||q.mode===listFilter));
  const total=kind==='favourites'?state.favourites.length:state.history.length;
  main.innerHTML=`<section class="library"><div class="library-heading"><div><p class="eyebrow">YOUR LITTLE COLLECTION</p><h1>${kind==='favourites'?'Keep the good ones.':'Where the conversation went.'}</h1><p>${kind==='favourites'?'Questions you loved. Ready for another moment together.':'A familiar question can lead somewhere entirely new.'}</p></div>${kind==='history'&&total?'<button class="secondary" data-action="clear-history">Clear history</button>':''}</div><div class="library-filters" role="group" aria-label="Filter by mode">${[['all','All Modes'],...Object.entries(modes).map(([id,m])=>[id,m.name])].map(([id,label])=>`<button class="chip ${listFilter===id?'selected':''}" data-action="list-filter" data-value="${id}" aria-pressed="${listFilter===id}">${label}</button>`).join('')}<span class="library-count">${items.length} ${items.length===1?'question':'questions'}</span></div>${items.length?`<div class="saved-grid">${items.map(q=>`<article class="saved-card ${modes[q.mode].color}"><p class="saved-category">${categoryInfo(q)[1]} ${categoryInfo(q)[2]} <span>· ${modes[q.mode].name}</span></p><a class="saved-question" href="#question/${q.id}">${esc(q.text)}</a><div class="saved-actions"><a href="#question/${q.id}">Revisit →</a><div><button class="card-action favourite ${heart(q.id)?'is-saved':''}" data-action="favourite" data-id="${q.id}" aria-pressed="${heart(q.id)}" aria-label="${heart(q.id)?'Remove from favourites':'Save to favourites'}">${icon(heart(q.id)?'saved':'heart')}</button><button class="card-action" data-action="share" data-id="${q.id}" aria-label="Share question">${icon('share')}</button></div></div></article>`).join('')}</div>`:`<div class="empty-state"><span aria-hidden="true">${kind==='favourites'?'♡':'↺'}</span><h2>${total?'No questions in this mode yet.':kind==='favourites'?'Your favourites are waiting to happen.':'Every good conversation starts somewhere.'}</h2><p>${kind==='favourites'?'Tap the heart on a question to keep it here.':'Your visited questions will find a home here.'}</p><a class="primary" href="#home">Find a conversation →</a></div>`}</section>`;
  finish({focus});
}
let returnRoute='home';
function route() {
  const [type,arg]=location.hash.slice(1).split('/');
  if(type!=='question') returnRoute=location.hash.slice(1)||'home';
  if(type==='mode') selection(arg);
  else if(type==='talk') { if(!session || session.mode!==arg) { if(arg==='surprise'||modes[arg]) start(arg);else navigate('home'); } else showTalk(); }
  else if(type==='question') revisit(arg);
  else if(['favourites','history'].includes(type)) { listFilter='all';list(type); }
  else home();
}
function modal(title,body) { dialog.innerHTML=`<div class="dialog-header"><h2 id="dialog-title">${title}</h2><button class="icon-button" data-action="close-dialog" aria-label="Close dialog">×</button></div>${body}`;dialog.showModal(); }
function help() { modal('Good conversations start here.',`<p>Spill the Beans brings 360 conversation starters to families, friends and teams. There are no right answers, and everyone is welcome to pass.</p><h3>Make it feel like an app</h3><ol><li>Open the published website in <strong>Safari on your iPhone</strong>.</li><li>Tap Safari’s <strong>Share</strong> button.</li><li>Choose <strong>Add to Home Screen</strong>, then <strong>Add</strong>.</li></ol><p>After your first online visit, questions work offline. Favourites and history stay in this browser on this device. Clearing website data removes them.</p><p>Faith & Values is optional and only appears when you select it. No accounts, tracking or external AI.</p>`); }
async function share(id) {
  const q=questionById.get(id); if(!q)return;
  const result=await shareQuestion(q,{url:location.href,share:navigator.share?.bind(navigator),copy:navigator.clipboard?.writeText.bind(navigator.clipboard)});
  if(result==='copied') notify('Question and link copied. Share a little connection.');
  else if(typeof result==='object') { modal('Share a little connection',`<p>Copy this question and link to share them:</p><textarea class="share-copy" readonly aria-label="Question and link to copy">${esc(result.text)}</textarea><button class="primary" data-action="select-copy">Select text</button>`); }
}
document.addEventListener('click',event=>{
  if(event.target.closest('.skip')) { event.preventDefault();main.focus();return; }
  const button=event.target.closest('[data-action]'); if(!button) return;
  const {action,mode,value,id}=button.dataset;
  if(action==='help')help();
  if(action==='surprise')start('surprise');
  if(action==='start')start(mode);
  if(action==='filter'||action==='category') {state.preferences[mode][action==='filter'?'filter':'category']=value;persist();selection(mode,{focus:false}); main.querySelector(`[data-action="${action}"][data-value="${value}"]`)?.focus({preventScroll:true});}
  if(action==='next')next();
  if(action==='reshuffle'){resetPool(state,pool);persist();next();}
  if(action==='favourite') { toggleFavourite(state,id);persist();const saved=heart(id);notify(saved?'Saved for another good conversation.':'Removed from favourites.');if(['favourites','history'].includes(view)){list(view,{focus:false});(main.querySelector(`[data-action="favourite"][data-id="${id}"]`)||main.querySelector('.saved-question, .empty-state .primary'))?.focus({preventScroll:true});}else{button.innerHTML=icon(saved?'saved':'heart');button.classList.toggle('is-saved',saved);button.setAttribute('aria-pressed',saved);button.setAttribute('aria-label',saved?'Remove from favourites':'Save to favourites');} }
  if(action==='share')void share(id);
  if(action==='return')navigate(returnRoute);
  if(action==='list-filter'){listFilter=value;list(view,{focus:false});main.querySelector(`[data-action="list-filter"][data-value="${value}"]`)?.focus({preventScroll:true});}
  if(action==='clear-history')modal('Start a fresh chapter?',`<p>Clear your history and restart question rotation. Your favourites will stay safe.</p><div class="dialog-actions"><button class="secondary" data-action="close-dialog">Keep history</button><button class="primary" data-action="confirm-clear">Clear history</button></div>`);
  if(action==='confirm-clear'){state.history=[];state.seen=[];persist();dialog.close();list('history');notify('History cleared. Fresh conversations ahead.');}
  if(action==='close-dialog')dialog.close();
  if(action==='select-copy'){dialog.querySelector('textarea').focus();dialog.querySelector('textarea').select();}
});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
window.addEventListener('hashchange',route);
window.addEventListener('storage',event=>{if(event.key==='spill-the-beans-v1'){state=loadState(storage).state;updateNav();if(['favourites','history'].includes(view))list(view,{focus:false});else if(current){const button=main.querySelector('[data-action="favourite"]');if(button){button.innerHTML=icon(heart(current.id)?'saved':'heart');button.classList.toggle('is-saved',heart(current.id));button.setAttribute('aria-pressed',heart(current.id));button.setAttribute('aria-label',heart(current.id)?'Remove from favourites':'Save to favourites');}}}});
route();
if(loaded.reset)notify('Saved data could not be read. A fresh collection is ready.');
if('serviceWorker' in navigator) navigator.serviceWorker.register(new URL('../sw.js',import.meta.url)).catch(()=>{});
