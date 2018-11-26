<?php
if(isset($_GET['u'])){
    $url = $_GET['u'];
    $parsedUrl = parse_url($url);
    // HTTPS DOESN'T NEED THIS METHOD -> REDIRECT
    if ((!empty($parsedUrl['scheme']))&&(!($parsedUrl['scheme'] === "http"))){
        header('Location: '.$url);
        exit();
    }
    // BLOCK REQUESTS TO HOST SERVER
    if(strpos($parsedUrl['host'], 'hackedit.de') !== false){
        header('HTTP/1.1 403 Forbidden');
        exit();
    }

    // SEND FILE
    $c = curl_init();
    curl_setopt($c, CURLOPT_URL, $url);
    curl_setopt($c, CURLOPT_USERAGENT,$_SERVER['HTTP_USER_AGENT']);
    curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 15);
    curl_setopt($c, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($c, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($c, CURLOPT_VERBOSE, true);
    curl_setopt($c, CURLOPT_ENCODING , "gzip");
    $content = curl_exec($c);
    $contentType = curl_getinfo($c, CURLINFO_CONTENT_TYPE);
    curl_close($c);
    
    if($content && preg_match('@(png|gif|jpg|jpeg|webp)@', $contentType)){
        header('Content-Type: '.$contentType);
        echo $content;
    }else{
        header('HTTP/1.1 500 Internal server error');
        header('Content-Type: image/png');
        echo 'data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
    }

    exit();
}
?>