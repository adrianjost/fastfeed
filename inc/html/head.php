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
    <!-- Open Graph data -->
    <link href="inc/css/styles.css" rel="stylesheet">

	<!--Let browser know website is optimized for mobile-->
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>