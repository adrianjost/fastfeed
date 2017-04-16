<!DOCTYPE html><html>
<head>
    <meta name="theme-color" content="#00d9a3">
    <title>FastFeed</title>
    <meta name="description" content="A beautiful and fast RSS-Reader">
    <meta name="author" content="Adrian Jost">
    
    <link rel="icon" type="image/png" href="inc/img/favicon/96.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="manifest" href="inc/manifest.json">
    <meta name="robots" content="noindex" />
    
    <!-- Twitter Card data -->
    <meta name="twitter:card" value="summary">
    <!-- Open Graph data -->
    <meta property="og:title" content="FastFeed" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://fastfeed.hackedit.de" />
    <meta property="og:image" content="https://fastfeed.hackedit.de/inc/img/favicon/192.png" />
    <meta property="og:description" content="A beautiful and fast RSS-Reader" />
	<!--Import Google Icon Font-->
	<?php /* <link type="text/css" rel="stylesheet" href="inc/css/normalize.css"  media="screen,projection"/>
    <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    */ ?>
    <script async src="inc/js/script.js"></script>
    <script type="text/javascript"> 
var cv = <?php echo filemtime("inc/css/styles.css"); ?>;
var cu = "inc/css/styles.css"+"?v="+cv;
//var jv = <?php echo filemtime("inc/js/script.js"); ?>;
//var ju = "inc/js/script.js"+"?v="+jv;
/*========== AJAX-REQUEST ==========*/
function EXT(u,c){var n=new XMLHttpRequest;n.open("GET",u,!0),n.onreadystatechange=function(){4==n.readyState&&"200"==n.status?c(n.responseText):4==n.readyState&&c(!1)},n.send(null)}
function fCSS(){
    if (typeof(Storage) !== "undefined") {
        if(localStorage.getItem("CSSVersion")==cv&&(localStorage.getItem("MainCSS")!=null)){
            // console.log("CSS STYLE FROM CACHE");
            document.querySelector('head').innerHTML += "<style>"+localStorage.getItem("MainCSS")+"</style>"; 
        }else{
            EXT(cu,function(r){
                if(r!=false){
                    // console.log("NEW CSS STYLE");
                    localStorage.setItem("MainCSS",r);
                    document.querySelector('head').innerHTML += "<style>"+r+"</style>"; 
                    localStorage.setItem("CSSVersion",cv);
                }else{ct();}
            });
        }
    }else {ct();}
}
function ct(){
    console.log("CSS LINK");
    var ss = document.createElement("link");
    ss.type = "text/css";
    ss.rel = "stylesheet";
    ss.href = cu;
    document.getElementsByTagName("head")[0].appendChild(ss);
}
fCSS();
/*
function fJS(){
    if (typeof(Storage) !== "undefined") {
        if(localStorage.getItem("JSVersion")==jv&&(localStorage.getItem("MainJS")!=null)){
            jt(1,localStorage.getItem("MainJS"));
        }else{
            EXT(ju,function(r){
                if(r!=false){
                    localStorage.setItem("MainJS",r);
                    jt(1,r);
                    localStorage.setItem("JSVersion",jv);
                }else{
                    if(localStorage.getItem("MainJS")!=null){
                        jt(1,localStorage.getItem("MainJS"));                        
                    }else{
                        jt(0,ju);
                    }
                }
            });
        }
    }else {jt(0,ju);}
}
function jt(a,t){
    var ss = document.createElement("script");
    ss.type = "text/javascript"; 
    if(a){ss.innerHTML = t}
    else{ss.src = t;}
    document.getElementsByTagName("head")[0].appendChild(ss);
}
fJS();*/
</script>

	<!--Let browser know website is optimized for mobile-->
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>