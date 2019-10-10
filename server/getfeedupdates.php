<?php
/*
SCRIPT ISN'T WORKING AND NEED TO BE CODED
GET: USERID as $_GET["uid"], UPDATEID as $_GET["last"]( = HIGHEST ID of already send articles)
function: send all articles with higher articleid than UPDATEID that are selected by the user (max 100)
output: json_encode(
    array(
        "id"        => "=FEEDDATA.articleid",
        "cdate"     => "=FEEDDATA.cdate",
        "content"   => array(
            "url"       => "=FEEDDATA.articleurl",
            "iconurl"   => "=FEEDS.iconurl",
            "title"     => "=FEEDDATA.title",
            "preview"   => "=FEEDDATA.preview"
    )));
Main-function: get_feed()
*/
/*
DATA TABLES -> info.txt
*/
header("Content-Type: application/json");
header("Expires: 0");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

require("db.php");

if(!isset($_GET["last"])){exit();}

$json = json_encode(get_new_feeds(intval($_GET["last"])));
if ($json)
    echo $json;
else
    echo json_last_error_msg();

exit();
?>