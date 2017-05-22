<!DOCTYPE html><html>
<head>
    <meta name="theme-color" content="#00d49f">
    <title>FastFeed</title>
    
    <script defer src="inc/js/script.js"></script>
    <script type="text/javascript">/* ========== SERVICE-WORKER ========== */
     "serviceWorker"in navigator?(console.log("SW (C) - registration in progress."),navigator.serviceWorker.register("/sw.js",{scope:'./'}).then(function(){console.log("SW (C) - registration complete.")},function(){console.log("SW (C) - registration failure.")})):console.log("SW (C) - not supported.");</script>

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
    <style>
:root {
  --primarycolor: #00d49f;
  --accentcolor: #fac532;
  --lightaccentcolor: #ff9800;
  --errorcolor: #ff0040;
}

html,body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Arial, sans-serif;
    font-weight: normal;
    color: #333;
    margin:0;
    padding:0;
    position:relative;
    width:100%;
}
main{min-height:calc(100vh - 104px)}
a{
    color: var(--accentcolor);
    text-decoration:none;
}
.hidden{
    display:none;
}
/* HEADER */

header{
    position:fixed;
    z-index:999;
    top:0;left:0;right:0;
    display:block;
    background-color: var(--primarycolor);
    font-size: 1.5rem;
    color:#fff;
    box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
}
header .nav-wrapper{
    max-width:850px;
    margin:0 auto;
}
header a{
    color:inherit;
}

header .brand-logo{
    display:inline-block;
    padding: 1rem; 
}
header ul{
    display:inline-block;
    float:right;
    margin:0;
    padding:0;
}
header li{
    display:inline-block;
    padding: 1rem; 
    background-color: var(--primarycolor);
    transition: background-color .3s ease-in-out;
}
header li:hover,
:target{
    background-color: var(--accentcolor);
}

/* FOOTER */
footer {
    color: #000;
    text-align: center;
    padding: 20px 20px;
}
footer .copyright {
    color: #999;
}
footer .infos a {
    color: #999;
    text-decoration: underline;
    font-size: .7rem;
}
@media only screen and (max-device-width: 740px)  {
	header{
        font-size: 1.2rem;
    }
    header .brand-logo, header li{
        padding:.75rem;
    }
}
    </style>
	<!--Let browser know website is optimized for mobile-->
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>