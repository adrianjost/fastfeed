"use strict";
console.log("SW - executing.");
var prefix = "sw-";
var version = "v004";
var offlineFundamentals = [
	"https://fastfeed.adrianjost.dev/",
	"/inc/css/styles.css",
	"/inc/js/script.js",
	"manifest.json"
];

self.addEventListener("install",event => {
    //console.log("SW - install event in progress."),
    event.waitUntil(caches.open(prefix+version).then(function(a) {
		return a.addAll(offlineFundamentals)
    }).then(function() {
		console.log("SW - install completed")
    }))
});

self.addEventListener('fetch', event => {
  event.respondWith(async function() {
    // Respond from the cache if we can
    const cachedResponse = await caches.match(event.request,{'ignoreSearch': true});
    if (cachedResponse){
		//console.log("SW - FromCache: ",event.request.url);
		return cachedResponse;
	}
    // Else try the network.
	//console.log("SW - FromWeb: ",event.request.url);
    return fetch(event.request);
  }());
});

self.addEventListener("activate",  event => {
    event.waitUntil(async function() {
		caches.keys().then(function(c) {return Promise.all(
			c.filter(function(c){return ((c.startsWith(prefix))&&(!c.startsWith(prefix+version)));}
			).map(function(c){return caches.delete(c);})
		)}).then();
	}());
});