/* --------------------------------------------------------
	OPTIONS
---------------------------------------------------------*/
var max_cards = 50; //50

/* --------------------------------------------------------
	BASIC FUNCTIONS
---------------------------------------------------------*/
function ajax(a,b){var c=new XMLHttpRequest;c.overrideMimeType("application/json"),c.open("GET",a,!0),c.onreadystatechange=function(){4==c.readyState&&"200"==c.status?b(c.responseText):4==c.readyState&&b(false)},c.send(null)}
//storage
function saveData(a,b){if("undefined"!=typeof Storage)localStorage.setItem(a,b);else{var c=new Date;c.setTime(c.getTime()+31536e6);var d="expires="+c.toUTCString();document.cookie=a+"="+b+"; "+d+"; domain=.websnooze.com; Path=/;"}}
function getData(a){if("undefined"!=typeof Storage)return localStorage.getItem(a);for(var b=b+"=",c=document.cookie.split(";"),d=0;d<c.length;d++){for(var e=c[d];" "==e.charAt(0);)e=e.substring(1);if(0==e.indexOf(b))return e.substring(b.length,e.length)}return""}
function delData(a){"undefined"!=typeof Storage?localStorage.removeItem(a):document.cookie=n+"=false; domain=.websnooze.com; Path=/;"}
function existData(a){return"undefined"!=typeof Storage?!(null===localStorage.getItem(a)):""!=getData(a)}

//lazyloading images from articles
function lazyimg(){var imgDefer=document.getElementsByTagName('img');for(var i=0;i<imgDefer.length;i++){if(imgDefer[i].getAttribute('data-src')){imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));/*imgDefer[i].setAttribute('onerror','this.src=this.src.replace("https://","http://")');*/}}}

//scroll positions
function get_scroll_position(){return(window.pageYOffset||window.scrollTop||0)-(window.clientTop||0)}
function save_scroll_position(o){const t=get_scroll_position();if(o){let s=JSON.parse(getData("content-"+o));s.scroll_position=t,saveData("content-"+o,JSON.stringify(s))}else saveData("scroll_position",t)}
function set_last_scroll_position(o){if(o){const s=JSON.parse(getData("content-"+o));window.scrollTo(0,parseInt((s||{}).scroll_position||0))}else window.scrollTo(0,parseInt(getData("scroll_position")))}
/* --------------------------------------------------------
	INITIALIZE
---------------------------------------------------------*/
if(existData("news")){var news = JSON.parse(getData("news"));}else{var news = [];}
if(existData("userid")){var userid = parseInt(getData("news"));}else{var userid = Date.now();}
var userid = 12345;
var lastid = "";
/* --------------------------------------------------------
	CARDS
---------------------------------------------------------*/
function get_card(id,content){return '<a class="card-panel" id="'+id+'" rel="nofollow" href="#'+id+'" url="'+content["url"]+'"><div class="headline"><img class="favicon" src="'+content["iconurl"]+'"></img><h2 class="title">'+content["title"]+'</h2></div><div class="content"><p>'+content["preview"]+'</p></div></a>'}
function get_fullcard(content,a){return '<div class="card-panel"><div id="singleheadline" class="headline"><img class="favicon" src="'+content["iconurl"]+'"></img><h2 class="title">'+content["title"]+'</h2></div><div class="content">'+a+'</div>'+get_share_links(content["url"])+'</div>'}

function get_share_links(url){
    prefixes=[
        ["fb","https://www.facebook.com/sharer/sharer.php?u=",'<svg xmlns="http://www.w3.org/2000/svg" width="430.113" height="430.114" viewBox="0 0 430.113 430.114"><path fill="#fff" d="M158.08 83.3v59.218h-43.384v72.412h43.385v215.183h89.124V214.936h59.805s5.6-34.72 8.315-72.685H247.54V92.74c0-7.4 9.717-17.354 19.32-17.354h48.558V0h-66.02c-93.52-.004-91.317 72.48-91.317 83.3z"/></svg>'],
        ["wa","whatsapp://send?text=Check this out: ",'<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90"><path fill="#fff" d="M90 43.84c0 24.214-19.78 43.842-44.182 43.842-7.747 0-15.025-1.98-21.357-5.455L0 90l7.975-23.522c-4.023-6.606-6.34-14.354-6.34-22.637C1.635 19.63 21.415 0 45.818 0 70.223 0 90 19.628 90 43.84zM45.818 6.983c-20.484 0-37.146 16.535-37.146 36.86 0 8.064 2.63 15.533 7.076 21.61l-4.64 13.688 14.274-4.53c5.865 3.85 12.89 6.1 20.437 6.1 20.48 0 37.14-16.53 37.14-36.854S66.3 6.986 45.82 6.986zm22.31 46.956c-.272-.45-.993-.72-2.075-1.26-1.084-.54-6.41-3.14-7.4-3.5-.993-.36-1.717-.54-2.438.534-.72 1.076-2.797 3.495-3.43 4.212-.632.72-1.263.81-2.347.27-1.082-.537-4.57-1.673-8.708-5.333-3.22-2.846-5.393-6.362-6.025-7.44-.63-1.074-.066-1.655.475-2.19.488-.48 1.084-1.254 1.625-1.88.543-.63.723-1.075 1.082-1.793.363-.72.182-1.345-.09-1.884-.27-.537-2.438-5.825-3.34-7.977-.902-2.15-1.803-1.795-2.436-1.795-.63 0-1.35-.09-2.07-.09s-1.89.27-2.89 1.346c-.99 1.077-3.79 3.677-3.79 8.964 0 5.286 3.88 10.395 4.42 11.11.54.72 7.49 11.92 18.5 16.224 11.01 4.3 11.01 2.864 13 2.684 1.99-.18 6.41-2.6 7.31-5.107.9-2.513.9-4.664.63-5.112z"/></svg>'],
        ["rd","http://www.reddit.com/submit?url=",'<svg xmlns="http://www.w3.org/2000/svg" width="430.117" height="430.117" viewBox="0 0 430.117 430.117"><path fill="#fff" d="M307.523 231.062c1.11 2.838 1.614 5.77 1.614 8.68 0 5.863-2.025 11.557-5.423 16.205-3.36 4.593-8.12 8.158-13.722 9.727h.01c-.047.02-.094.02-.117.037-.023 0-.06.02-.08.02-2.622.9-5.31 1.32-7.98 1.32-6.253 0-12.395-2.25-17.305-6.09-4.872-3.82-8.56-9.32-9.717-15.84h-.01c0-.02 0-.04-.01-.07 0-.02 0-.03-.018-.06h.02c-.365-1.68-.552-3.36-.552-5.02 0-5.64 1.923-11.07 5.097-15.55 3.164-4.45 7.626-7.99 12.848-9.81.02 0 .038-.01.038-.01.027 0 .027-.02.05-.02 2.955-1.09 6.073-1.64 9.158-1.64 5.62 0 11.154 1.71 15.82 4.82 4.612 3.07 8.355 7.56 10.23 13.15.02.04.02.07.038.11 0 .04.02.06.037.09h-.03zM290.33 300.35c-2.203-1.43-4.752-2.292-7.45-2.292-2.174 0-4.433.62-6.444 1.955-19.004 11.342-41.355 17.558-63.547 17.558-16.65 0-33.2-3.51-48.2-10.87l-.08-.03-.08-.03c-2.26-.92-4.84-2.89-7.65-4.76-1.43-.92-2.92-1.84-4.58-2.52-1.64-.69-3.45-1.18-5.39-1.18-1.61 0-3.29.36-4.96 1.12l-.25.1h.01c-2.62 1-4.66 2.83-5.98 5-1.37 2.23-2.05 4.83-2.05 7.41 0 2.34.55 4.67 1.69 6.79 1.08 2.01 2.75 3.76 4.94 4.94 21.42 14.46 46.66 21 71.99 20.98 22.84 0 45.81-5.29 66.27-14.91l.1-.06.1-.05c2.7-1.6 6.28-3.03 9.66-5.11 1.67-1.062 3.31-2.3 4.71-3.9 1.4-1.59 2.52-3.55 3.16-5.87v-.01c.26-1.03.39-2.03.39-3.03 0-1.9-.47-3.7-1.24-5.32-1.14-2.43-2.99-4.43-5.17-5.86zm-150.455-34.76c.037 0 .086.013.128.036 2.735 1 5.554 1.493 8.345 1.493 6.963 0 13.73-2.86 18.853-7.5 5.12-4.67 8.62-11.26 8.62-18.78 0-.2 0-.39-.01-.63.02-.34.03-.71.03-1.09 0-7.46-3.45-14.08-8.52-18.76-5.08-4.69-11.83-7.55-18.82-7.55-1.86 0-3.77.22-5.62.65-.03 0-.05.01-.07.01h-.03c-9.25 1.93-17.37 8.8-20.37 18.25v.01c0 .02-.01.03-.01.03-.86 2.58-1.26 5.25-1.26 7.89 0 5.78 1.92 11.42 5.21 16.06 3.27 4.56 7.9 8.14 13.45 9.82.04 0 .06.01.1.03zm290.158-67.496v.038c.066.94.084 1.878.084 2.81 0 10.447-3.35 20.493-8.94 29.016-5.22 7.976-12.415 14.65-20.704 19.177.532 4.158.84 8.35.84 12.526-.01 22.5-7.766 44.61-21.272 62.33v.01h-.02c-24.97 33.22-63.31 52.81-102.03 62.69h-.01l-.03.03c-20.64 5.02-41.94 7.58-63.22 7.58-31.73 0-63.43-5.72-93.02-17.58l-.01-.03h-.02c-30.67-12.65-59.9-32.74-77.82-62.19-9.64-15.71-14.93-34.14-14.93-52.66 0-4.19.29-8.38.85-12.53-8.08-4.54-15.07-10.99-20.26-18.68-5.54-8.27-9.05-17.95-9.5-28.19v-.16c.01-14.34 6.24-27.92 15.92-37.93 9.67-10.01 22.89-16.56 37.07-16.56h.59c1.49-.1 2.99-.16 4.49-.16 7.12 0 14.26 1.16 21.04 3.75l.04.03.04.02c5.79 2.44 11.54 5.38 16.67 9.45 1.66-.87 3.48-1.85 5.51-2.62 31.07-18.39 67.17-25.49 102.36-27.53.31-17.43 2.45-35.68 10.95-51.65 7.08-13.27 19.37-23.6 34-27.18l.06-.03.08-.01c5.57-1.07 11.19-1.57 16.777-1.57 14.87 0 29.56 3.52 43.31 9.02 6.086-9.18 14.776-16.35 24.97-20.37l.1-.054.1-.035c5.98-1.866 12.3-2.956 18.643-2.956 6.69 0 13.436 1.223 19.755 4.046v-.02c.01.023.02.023.02.023.047.01.08.04.116.04 9.06 3.49 16.726 9.936 22.16 17.95 5.446 8.05 8.648 17.69 8.648 27.6 0 1.825-.1 3.655-.316 5.49l-.02.035c0 .026 0 .066-.01.094-1.067 12.81-7.55 24.05-16.74 32.06-9.24 8.047-21.21 12.91-33.49 12.91-1.97 0-3.96-.11-5.94-.376-12.184-.93-23.54-6.83-31.89-15.6-8.37-8.754-13.765-20.45-13.765-33.08 0-.61.055-1.236.073-1.84-11.435-5.09-23.58-9.316-35.646-9.306-1.74 0-3.49.093-5.23.27h-.02c-9.03.87-17.43 6.57-21.5 14.76v.04c-6.18 12.03-7.41 26.1-7.6 40.06 34.64 2.26 69.484 10.57 100.044 28.134h.05l.44.26c.58.34 1.657.93 2.63 1.447 2.1-1.703 4.32-3.455 6.856-4.965 9.266-6.17 20.24-9.24 31.225-9.24 4.87 0 9.75.62 14.48 1.836h.02l.2.06c.07.01.12.035.18.035v.01c11.18 2.84 21.3 9.266 28.92 17.926 7.61 8.67 12.73 19.645 13.73 31.56v.02h-.017zm-102.03-113.36c0 .468.01.95.056 1.44v.084c.22 6.018 3.06 11.62 7.38 15.756 4.34 4.14 10.1 6.702 15.94 6.725h.16c.42.03.85.03 1.26.03 5.9.01 11.75-2.53 16.14-6.66 4.4-4.15 7.31-9.78 7.54-15.85l.01-.03v-.04c.03-.47.05-.91.05-1.38 0-6.25-2.93-12.21-7.5-16.62-4.56-4.41-10.69-7.14-16.74-7.12-1.95 0-3.89.27-5.78.85h-.07l-.06.02c-4.99 1.29-9.66 4.36-13.02 8.45-3.37 4.06-5.42 9.08-5.42 14.3zm-255.69 92.844c-4.63-2.156-9.42-3.696-14.15-3.676-.795 0-1.598.047-2.39.133h-.11l-.11.014c-6.796.18-13.654 3.15-18.802 7.89-5.15 4.73-8.55 11.12-8.82 18.16v.06l-.01.05c-.04.57-.06 1.13-.06 1.68 0 4.34 1.34 8.54 3.6 12.37 1.68 2.84 3.87 5.44 6.35 7.7 7.94-17.39 20.35-32.15 34.52-44.42zm301.753 85.057c0-15.5-5.592-31.07-14.646-43.604-18.053-25.11-46.055-41.5-75.187-50.63l-.205-.07c-5.592-1.71-11.238-3.23-16.933-4.53-17.025-3.87-34.48-5.8-51.917-5.8-23.414 0-46.827 3.47-69.245 10.38-29.125 9.24-57.22 25.51-75.233 50.71v.02c-9.13 12.59-14.475 28.21-14.475 43.77 0 5.73.716 11.46 2.23 17.03l.02.01c3.277 12.51 9.688 23.67 17.988 33.4 8.295 9.75 18.472 18.06 29.176 24.84 2.37 1.47 4.75 2.87 7.18 4.24 31.09 17.36 66.9 24.97 102.44 24.97 6.01 0 12.06-.21 18.03-.64 35.79-2.96 71.74-13.52 100.8-35.11l.01-.02c9.25-6.83 17.82-15.11 24.59-24.52 6.8-9.42 11.78-19.95 14-31.38v-.03l.01-.01c.9-4.27 1.34-8.604 1.34-12.954zm28.254-61.685c-.01-3.762-.868-7.507-2.753-11l-.047-.044-.02-.056c-2.52-5.19-6.478-9.11-11.247-11.782-4.77-2.69-10.352-4.056-15.952-4.056-5.06 0-10.1 1.132-14.57 3.38 14.22 12.343 26.69 27.178 34.75 44.635 2.6-2.26 4.81-5.018 6.47-8.084 2.16-4.023 3.38-8.538 3.38-12.993z"/></svg>'],
        ["tw","http://twitter.com/share?hashtags=fastfeed&url=",'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430.117 430.117"><path fill="#fff" d="M381.384 198.64c24.157-1.994 40.543-12.976 46.85-27.877-8.715 5.353-35.765 11.19-50.704 5.63-.732-3.51-1.55-6.843-2.353-9.853-11.383-41.798-50.357-75.472-91.194-71.404 3.304-1.334 6.655-2.576 9.996-3.69 4.49-1.61 30.863-5.902 26.71-15.21-3.5-8.19-35.72 6.187-41.79 8.066 8.01-3.012 21.255-8.193 22.674-17.396-12.27 1.683-24.315 7.484-33.622 15.92 3.36-3.618 5.91-8.026 6.45-12.77C241.68 90.963 222.562 133.113 207.09 174c-12.147-11.773-22.914-21.044-32.573-26.192-27.097-14.53-59.496-29.692-110.355-48.572-1.56 16.827 8.322 39.2 36.8 54.08-6.17-.826-17.453 1.017-26.477 3.178 3.675 19.277 15.677 35.16 48.17 42.84-14.85.98-22.524 4.358-29.48 11.64 6.764 13.408 23.267 29.187 52.954 25.948-33.008 14.226-13.46 40.57 13.4 36.642C113.71 320.887 41.48 317.41 0 277.828c108.3 147.572 343.716 87.274 378.8-54.866 26.284.224 41.736-9.105 51.317-19.39-15.144 2.57-37.094-.086-48.733-4.933z"/></svg>'],
        ["gp","https://plus.google.com/share?url=",'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 491.858 491.858"><path fill="#fff" d="M377.472 224.957H201.32v58.718h107.47c-16.032 51.048-63.714 88.077-120.055 88.077-69.492 0-125.823-56.335-125.823-125.824 0-69.492 56.333-125.823 125.823-125.823 34.994 0 66.645 14.29 89.452 37.346l42.622-46.322c-34.04-33.355-80.65-53.93-132.08-53.93C84.5 57.198 0 141.698 0 245.93s84.5 188.737 188.736 188.737c91.307 0 171.248-64.844 188.737-150.99V224.96zm114.386-.1h-36.03v-36.03H424.94v36.03h-36.03v30.883h36.03v36.032h30.887V255.74h36.03"/></svg>'],
        ["tg","https://telegram.me/share/url?url=",'<svg xmlns="http://www.w3.org/2000/svg" id="svg2" fill-rule="evenodd" viewBox="0 0 350 300" clip-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><defs id="defs4"><style id="style6"><![CDATA[.fil3 {fill:none}.fil1 {fill:#A9C9DD}.fil0 {fill:#C8DAEA}.fil2 {fill:url(#id0)}]]></style><linearGradient id="id0" x1="79.206" x2="220.795" y1="36.26" y2="263.74" gradientUnits="userSpaceOnUse"><stop id="stop9" offset="0" stop-color="#EFF7FC"/><stop id="stop11" offset="1" stop-color="#fff"/></linearGradient></defs><g id="Layer_x0020_1"><g id="_1083636068480"><g id="g16"><path id="path18" fill="#c8daea" d="M113 261c-9 0-8-4-11-12l-26-87L278 42 113 261zm0 0z" class="fil0"/></g><g id="g20"><path id="path22" fill="#a9c9dd" d="M113 261c7 0 10-4 14-7l36-36-45-28-5 71zm0 0z" class="fil1"/></g><path id="path24" fill="url(#id0)" d="M118 190l111 82c12 7 22 4 25-11l45-214c5-18-7-27-19-21L14 128c-18 8-18 18-3 22l68 22L237 72c7-5 14-2 8 3M118 190z" class="fil2"/></g><path id="rect26" fill="none" d="M0 0h300v300H0z" class="fil3"/></g></svg>'],
        ["pt","http://pinterest.com/pin/create/button/?url=",'<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><path fill="#fff" d="M62.85 0C29.71 0 13 23.478 13 43.06c0 11.855 4.542 22.4 14.28 26.327 1.6.65 3.03.025 3.494-1.723.322-1.205 1.086-4.257 1.425-5.532.463-1.728.283-2.33-1.007-3.842-2.808-3.27-4.605-7.51-4.605-13.516 0-17.418 13.187-33.01 34.34-33.01 18.73 0 29.02 11.31 29.02 26.41 0 19.877-8.9 36.65-22.11 36.65-7.3 0-12.757-5.96-11.01-13.275 2.094-8.735 6.156-18.156 6.156-24.464 0-5.64-3.066-10.345-9.406-10.345-7.46 0-13.452 7.627-13.452 17.84 0 6.506 2.225 10.908 2.225 10.908l-8.97 37.558c-2.664 11.15-.4 24.81-.21 26.19.114.82 1.178 1.017 1.66.4.686-.89 9.575-11.727 12.59-22.56.858-3.063 4.907-18.943 4.907-18.943 2.423 4.57 9.507 8.586 17.04 8.586C91.787 86.72 107 66.524 107 39.49 107.002 19.04 89.48 0 62.85 0z"/></svg>'],
        ["ma","mailto:?subject=Article from FastFeed&body=Check this out: ",'<svg xmlns="http://www.w3.org/2000/svg" width="774" height="774" viewBox="-0.101 -0.266 774 774" overflow="visible"><g fill="none" stroke="#fff" stroke-width="40" stroke-miterlimit="10"><path d="M671.562 524.537c0 29.222-23.688 52.91-52.908 52.91H153.146c-29.22 0-52.91-23.69-52.91-52.91V248.93c0-29.22 23.69-52.908 52.91-52.908h465.507c29.22 0 52.908 23.688 52.908 52.91v275.605z" transform="matrix(1.2661 0 0 1.26595 -101.69 -102.85)"/><path d="M112.73 214.79L385.9 386.735 659.07 214.79" stroke-linecap="round" stroke-linejoin="round" transform="matrix(1.2661 0 0 1.26595 -101.69 -102.85)"/></g></svg>']
    ];
    share='<div id="share"><div class="social">';
    prefixes.forEach(function(i){
        share += '<a rel="nofollow" target="_blank" id="'+i[0]+'" href="'+i[1]+url+'"class="btn">'+i[2]+'</a>';
    });
    return (share+'</div><div class="web"><a href="'+url+'"class="btn">WEB <svg fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path></svg></a></div></div>');
}

function cleanup_cards(){
    let n = news;
    //delete old articles
    const min_time = Math.round(new Date().getTime()/1000) - (7 * 86400);
    for (var i=0; i<n.length; i++) {
        var a = JSON.parse(getData("content-"+n[i]))
        if (parseInt(a["cdate"])<min_time){
            delData("content-"+n[i])
            n.splice(i, 1);
        }
    }
    //delete articles to prevent store more than max_cards 
    n.sort(function(a,b){return a-b}); //delete oldest first
    while(max_cards < n.length){
        delData("content-"+n[0])
        n.splice(0, 1);
    }
    //save new newslist
    news = n;
    saveData("news",JSON.stringify(news));
}

function add_card(article){
    if(existData("content-"+article.id)){return;}
    saveData("content-"+article.id,JSON.stringify(article));
    news.push(parseInt(article.id));
    saveData("news",JSON.stringify(news));
}

function render_cards(min=0,max = max_cards){
    max = (max < news.length)?max:news.length;
    min = (min < news.length)?min:(((max-max_cards)>0)?(max-max_cards):0);
    out = "";
    let n = news;
    n.sort(function(a,b){return b-a});
    for (i=min; i<max; i++){
        var a = JSON.parse(getData("content-"+n[i]))
        out += get_card(a["id"],a["content"]);
    }document.getElementById("cards").innerHTML = out;
    
    if(getData("closeByClick") === "true"){
        document.getElementById("fullcard").addEventListener("click",closecard);
    }
    
    let cards = document.getElementById("cards").getElementsByClassName("card-panel");
	for (var i=0; i<cards.length; i++) {
		cards[i].addEventListener("click",opencard);
	}
    
    // open the article with id from hash (if it exist)
    if(window.location.hash.substr(1)){
        if(window.location.hash=="#about"){load_about();return;}
        if(window.location.hash=="#settings"){load_settings();return;}
        
        if(news.indexOf(parseInt(window.location.hash.substr(1))) != -1){
            loadarticle(document.getElementById(window.location.hash.substr(1)));
        }else{
            history.pushState('', document.title, window.location.pathname+window.location.search);
        }
    }else{
        document.getElementById("aboutcard").classList.add("hidden");
        document.getElementById("settingscard").classList.add("hidden");
        document.getElementById("fullcard").classList.add('hidden');
        document.getElementById("contentwrapper").classList.remove("hidden");
        document.getElementById("cards").classList.remove('hidden');
        set_last_scroll_position();
    }
}
function closecard(e){
    if(e){
        if(e["target"].hasAttribute('href')||(e["target"]instanceof SVGElement && e["target"].parentNode.hasAttribute('href'))){return;}
        else{e.preventDefault();}
    }
    lastid = "";
    save_scroll_position(window.location.hash.substr(1));
    document.getElementById("cards").classList.remove('hidden');
    document.getElementById("fullcard").classList.add('hidden');
    set_last_scroll_position();
    //document.getElementById(window.location.hash.substr(1)).scrollIntoView({  behavior:'smooth'});
    history.pushState('', document.title, window.location.pathname+window.location.search);
}
function opencard(e,t = this){
    if(e){e.preventDefault();}
    loadarticle(t);
}
function loadarticle(t){
    t.classList.add('loading');
    t.classList.remove('error');
    save_scroll_position();
    let c = JSON.parse(getData("content-"+t.getAttribute("id")))
    if(c["fullcontent"]){
        document.getElementById("fullcard").innerHTML = get_fullcard(c["content"],c["fullcontent"]);
        lastid = c["id"];
        //history.pushState('', document.title, window.location.pathname+window.location.search+"#"+c["id"]);
        window.location.hash = lastid;
        document.getElementById("cards").classList.add('hidden');
        document.getElementById("fullcard").classList.remove('hidden');
        set_last_scroll_position(c["id"]);
        t.classList.remove('loading');
        lazyimg();
    }else{
        ajax("https://fastfeed.hackedit.de/server/getarticle.php?id="+t.getAttribute("id")+"&url="+encodeURIComponent(t.getAttribute("url")),function(rr){
            if(!rr){
                t.classList.remove('loading');
                t.classList.add('error');
            }else{
                r = JSON.parse(rr);
                let s = JSON.parse(getData("content-"+r["id"]));
                //history.pushState('', document.title, window.location.pathname+window.location.search+"#"+r["id"]);
                window.location.hash = r["id"];
                if(r["status"]){
                    document.getElementById("fullcard").innerHTML = get_fullcard(s["content"],r["body"]);
                    lazyimg(); 

                    s["fullcontent"] = r["body"];
                    saveData("content-"+r["id"], JSON.stringify(s));
                }else{  // iFrame Fallback
                    let ifrm = document.createElement("iframe");
                        ifrm.src = document.getElementById(r["id"]).getAttribute("url");
                    let ifrmwrap = document.createElement("div");
                        ifrmwrap.appendChild(ifrm);
                    document.getElementById("fullcard").innerHTML = get_fullcard(s["content"],(ifrmwrap.innerHTML));
                }
                document.getElementById("cards").classList.add('hidden');
                document.getElementById("fullcard").classList.remove('hidden');
                t.classList.remove('loading');
                lastid = r["id"];
            }
        })
    }
}
/* --------------------------------------------------------
	SETTINGS
---------------------------------------------------------*/
function load_settings(e){
    if(e){e.preventDefault();}
    document.getElementById("contentwrapper").classList.add("hidden");
    document.getElementById("aboutcard").classList.add("hidden");
    document.getElementById("settingscard").classList.remove("hidden");
    set_last_scroll_position(window.location.hash);
    window.location.hash = "settings";
    window.scrollTo(0,0);
}

function setColor(name){
    return (event) => {
        const color = event.target.value;
        document.documentElement.style.setProperty('--'+name, color);
        document.getElementById(name).innerHTML = color;
        saveData(name, color);
    }
}

function loadColor(name){
    const color = getData(name);
    if(color){
        document.documentElement.style.setProperty('--'+name, color);
        document.getElementById(name).innerHTML = color;
        document.getElementById(name+'-picker').value = color;

    }
}

function setCloseByClickStatus(event) {
    saveData("closeByClick", event.target.checked.toString());
}

document.addEventListener("DOMContentLoaded", () => {
    loadColor('primarycolor');
    loadColor('accentcolor');
    document.getElementById("primarycolor-picker").addEventListener("input", setColor("primarycolor"));
    document.getElementById("accentcolor-picker").addEventListener("input", setColor("accentcolor"));
    document.getElementById("close_by_click-picker").checked = getData("closeByClick");
    document.getElementById("close_by_click-picker").addEventListener("input", setCloseByClickStatus);
});


/* --------------------------------------------------------
	ABOUT
---------------------------------------------------------*/
function load_about(e){
    if(e){e.preventDefault();}
    document.getElementById("contentwrapper").classList.add("hidden");
    document.getElementById("settingscard").classList.add("hidden");
    document.getElementById("aboutcard").classList.remove("hidden");
    set_last_scroll_position(window.location.hash);
    window.location.hash = "about";
    window.scrollTo(0,0);
}

/* --------------------------------------------------------
	MAIN
---------------------------------------------------------*/
window.onhashchange = function(e){
    render_cards();//window.location.hash
}

function load_main(e){
    if(e){e.preventDefault();}
    document.getElementById("aboutcard").classList.add("hidden");
    document.getElementById("contentwrapper").classList.remove("hidden");
    document.getElementById("settingscard").classList.add("hidden");
     if(window.location.hash.substr(1)&&window.location.hash!="#about"&&window.location.hash!="#settings"){
        closecard(e);
    }else{
        window.location.hash = "#"+lastid;
        set_last_scroll_position(lastid);
    }
    //history.pushState({}, '', document.getElementsByClassName("fullarticle")[0].getAttribute("id"));
    //document.getElementById(window.location.hash.substr(1)).scrollIntoView({  behavior:'smooth'});
}

window.addEventListener("load", () => {
    //initialize
    document.getElementById("maintoggle").addEventListener("click",load_main);
    document.getElementById("about").addEventListener("click",load_about);
    document.getElementById("settings").addEventListener("click",load_settings);
    render_cards(0);
    const last = Math.max(...news)
    ajax("https://fastfeed.hackedit.de/server/getfeedupdates.php?last="+((last==-Infinity)?0:last)+"&uid="+userid,function(resp){
        resp = JSON.parse(resp);
        if(resp.length > 0){
            for (i=0; i<resp.length; i++){
                add_card(resp[i]);
            }
            cleanup_cards();
            render_cards(0);
        }
    });
});