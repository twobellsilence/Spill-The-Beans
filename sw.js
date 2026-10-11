// Build replaces this version with a source fingerprint for reliable updates.
const CACHE='spill-the-beans-__VERSION__';
const scope=new URL('./',self.location.href);
const urls=['./','index.html','src/styles.css','src/app.js','src/core.js','src/questions.js','src/expansion.js','public/manifest.webmanifest','public/icon.svg','public/icon-192.png','public/icon-512.png','public/icon-maskable.png'].map(path=>new URL(path,scope).href);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(urls)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('spill-the-beans-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(response=>response.ok?response:caches.match(new URL('index.html',scope))).catch(()=>caches.match(new URL('index.html',scope))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});

