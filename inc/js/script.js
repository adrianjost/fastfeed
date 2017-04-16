/* --------------------------------------------------------
	OPTIONS
---------------------------------------------------------*/
var max_cards = 100; //100


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
function lazyimg(){var imgDefer=document.getElementsByTagName('img');for(var i=0;i<imgDefer.length;i++){if(imgDefer[i].getAttribute('data-src')){imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));}}}
/* --------------------------------------------------------
	INITIALIZE
---------------------------------------------------------*/
if(existData("news")){var news = JSON.parse(getData("news"));}else{var news = [];}
if(existData("userid")){var userid = parseInt(getData("news"));}else{var userid = Date.now();}
var userid = 12345;

/* --------------------------------------------------------
	CARDS
---------------------------------------------------------*/
function get_card(id,content){return '<a class="card-panel hoverable" id="'+id+'" rel="nofollow" href="#'+id+'" url="'+content["url"]+'"><div class="headline"><img class="favicon" src="'+content["iconurl"]+'"></img><h2 class="title">'+content["title"]+" #"+id+'</h2></div><div class="content"><p>'+content["preview"]+'</p></div></a>'}

function load_main(){
    document.getElementById("cards").classList.remove("hidden");
    document.getElementById("aboutcard").classList.add("hidden");
    document.getElementById("settingscard").classList.add("hidden");
    window.location.hash = "#"+document.getElementsByClassName("fullarticle")[0].getAttribute("id")
    //history.pushState({}, '', document.getElementsByClassName("fullarticle")[0].getAttribute("id"));
    //document.getElementById(window.location.hash.substr(1)).scrollIntoView({  behavior:'smooth'});
}

function cleanup_cards(){
    var n = news;
    //delete old articles
    var min_time = Math.round(new Date().getTime()/1000) - (7 * 86400);
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
    render_cards(0,max_cards);
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
    var n = news;
    n.sort(function(a,b){return b-a});
    for (i=min; i<max; i++){
        var a = JSON.parse(getData("content-"+n[i]))
        out += get_card(a["id"],a["content"]);
    }document.getElementById("cards").innerHTML = out;
    
    var cards = document.getElementById("cards").getElementsByClassName("card-panel");
	for (var i=0; i<cards.length; i++) {
		cards[i].addEventListener("click",togglecard);
	}
    
    // open the article with id from hash (if it exist)
    if(window.location.hash.substr(1)&&window.location.hash!="#about"&&window.location.hash!="#settings"){
        if(news.indexOf(parseInt(window.location.hash.substr(1))) != -1){
            loadarticle(document.getElementById(window.location.hash.substr(1)));
        }else{
            history.pushState('', document.title, window.location.pathname+window.location.search);
        }
    }else if(window.location.hash=="#about"){
        load_about();
    }else if(window.location.hash=="#settings"){
        load_settings();
    }
}
function togglecard(e,t = this){
    e.preventDefault();
    if(t.classList.contains('fullarticle')){
        document.getElementById("cards").classList.remove('onecard');
        t.classList.remove('fullarticle');
        var s = JSON.parse(getData("content-"+t.getAttribute("id")));
        t.getElementsByClassName("content")[0].innerHTML = s["content"]["preview"];
        document.getElementById(window.location.hash.substr(1)).scrollIntoView({  behavior:'smooth'});
        window.scrollBy(0,-70);
        history.pushState('', document.title, window.location.pathname+window.location.search);
    }else{
        loadarticle(t);
    }
}
function loadarticle(t){
    t.classList.add('loading');
    t.classList.remove('error');
    var c = JSON.parse(getData("content-"+t.getAttribute("id")))
    if(c["fullcontent"]){
        document.getElementById(c["id"]).getElementsByClassName("content")[0].innerHTML = c["fullcontent"];
        document.getElementById(c["id"]).classList.add('fullarticle');
        document.getElementById("cards").classList.add('onecard');
        t.classList.remove('loading');
        lazyimg();
        window.location.hash = c["id"];
        window.scrollBy(0,-70);
    }else{
        ajax("s/getarticle.php?id="+t.getAttribute("id")+"&url="+encodeURIComponent(t.getAttribute("url")),function(r){
            if(!r){
                t.classList.remove('loading');
                t.classList.add('error');
            }else{
                var r = JSON.parse(r);
                t.classList.remove('loading');
                document.getElementById(r["id"]).classList.add('fullarticle');
                document.getElementById("cards").classList.add('onecard');
                if(r["status"]){
                    document.getElementById(r["id"]).getElementsByClassName("content")[0].innerHTML = r["body"];
                    lazyimg();   
                }else{  // iFrame Fallback
                    t.classList.remove('loading');
                    var ifrm = document.createElement("iframe");
                    ifrm.src = document.getElementById(r["id"]).getAttribute("url");
                    document.getElementById(r["id"]).getElementsByClassName("content")[0].innerHTML = "";
                    document.getElementById(r["id"]).getElementsByClassName("content")[0].appendChild(ifrm);
                }
                //add hash without specific scrolling
                window.location.hash = c["id"];
                window.scrollBy(0,-70);
                
                if(r["status"]){    //store response if valid
                    var s = JSON.parse(getData("content-"+r["id"]));
                    s["fullcontent"] = r["body"];
                    saveData("content-"+r["id"], JSON.stringify(s));
                }
            }
        })
    }
}
/* --------------------------------------------------------
	SETTINGS
---------------------------------------------------------*/
function load_settings(e){
    if(e){e.preventDefault();}
    document.getElementById("cards").classList.add("hidden");
    document.getElementById("aboutcard").classList.add("hidden");
    document.getElementById("settingscard").classList.remove("hidden");
    window.location.hash = "settings";
    window.scrollBy(0,-70);
}
/* --------------------------------------------------------
	ABOUT
---------------------------------------------------------*/
function load_about(e){
    if(e){e.preventDefault();}
    document.getElementById("cards").classList.add("hidden");
    document.getElementById("settingscard").classList.add("hidden");
    document.getElementById("aboutcard").classList.remove("hidden");
    window.location.hash = "about";
    window.scrollBy(0,-70);
}


/* --------------------------------------------------------
	MAIN
---------------------------------------------------------*/
window.onload = function(){
    document.getElementById("maintoggle").addEventListener("click",load_main);
    document.getElementById("about").addEventListener("click",load_about);
    document.getElementById("settings").addEventListener("click",load_settings);
    render_cards(0);
    var last = Math.max(...news)
    if(last==Infinity){last=0;}
    ajax("s/getfeedupdates.php?last="+last+"&uid="+userid,function(resp){
        resp = JSON.parse(resp);
        for (i=0; i<resp.length; i++){
            add_card(resp[i]);
        }
        cleanup_cards();
        render_cards(0);
    });
}