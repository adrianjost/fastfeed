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

require("db.php");

if(!isset($_GET["last"])){exit();}

echo json_encode(get_new_feeds(intval($_GET["last"])));

exit();
?>