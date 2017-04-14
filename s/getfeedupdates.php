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


//+++ DEMOOUTPUT - JUST FOR TESTING FRONTEND +++
$i=0;
$out = [];
while($i<1){
    array_push($out, array(
        "id"        => time(),
        "content"   => array(
            "url"       => "http://t3n.de/news/besten-news-apps-807908/",
            "iconurl"   => "http://d1quwwdmdfumn6.cloudfront.net/t3n-rebrush/images/core/icon/AppIcon152.png",
            "title"     => "10 außergewöhnliche News-Apps, um informiert zu bleiben",
            "preview"   => "In Zeiten von Fake-News und Debatten um die vermeintliche „Lügenpresse” ist es nicht immer einfach, den Überblick zu behalten und sich selbst ein Bild zu machen. Wir zeigen zehn News-Apps, die dabei helfen sollen."
        )
    ));
    $i+=1;
}
echo json_encode($out);

?>