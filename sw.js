const CACHE_NAME="krish-app-v20";
const ASSETS=["/sarkari-app/","/sarkari-app/index.html","/sarkari-app/manifest.webmanifest","/sarkari-app/icon-192.png","/sarkari-app/icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(r&&r.status===200&&r.type!=="opaque"){const cp=r.clone();caches.open(CACHE_NAME).then(x=>x.put(e.request,cp));}return r;}).catch(()=>caches.match("/sarkari-app/index.html"))))});
