<?php
if(isset($_GET['url'])){
    $url = $_GET['url'];
    $parsedUrl = parse_url($url);
    // HTTPS DOESN'T NEED THIS METHOD -> REDIRECT
    if ((!empty($parsedUrl['scheme']))&&($parsedUrl['scheme'] === "https")){
        header('Location: '.$url);
        exit();
    }
    // BLOCK REQUESTS TO HOST SERVER
    if(strpos($parsedUrl['host'], 'hackedit.de') !== false){
        header('HTTP/1.1 403 Forbidden');
        exit();
    }
    
    // CHECK IF EXTENSION IS VALID
    $ext = strtolower(pathinfo($url, PATHINFO_EXTENSION));
    switch ($ext) {
        case "gif":
            header('Content-Type: image/gif');
            break;
        case "webp":
            header('Content-Type: image/webp');
            break;
        case "png":
            header('Content-Type: image/png');
            break;
        case "jpg":
        case "jpeg":
            header('Content-Type: image/jpeg');
            break;
        default:
            // UNKNOWN/UNSUPPORTED EXTENSION
            header('HTTP/1.1 501 Not Implemented');
            header('Content-Type: image/png');
            echo 'data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
            exit();
    }
    // SEND FILE
    readfile($url);
    exit();
}
?>