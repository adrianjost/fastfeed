<?php
/*
SCRIPT ISN'T WORKING AND NEED TO BE CODED
function: read all feeds from FEEDS-Table and save all new articles in FEEDDATA-Table
Main-function: update_feeds()
*/
/*
DATA TABLES -> info.txt
*/
require("db.php");
function update_feeds(){
    $feeds = get_feed_list();
    foreach ($feeds as $feed) {
        $lastknownitemurl = get_last_feeditem_url($feed["feedid"]);
        if(!$lastknownitemurl){$lastknownitemurl = "";}
        $items = get_feed_and_parse($feed["feedurl"]);
        foreach($items as $item){
            $item["feedid"] = $feed["feedid"];
            save_feed_item($item);
}}}

function get_feed_and_parse($url){
    //this should work as it is but is untested
    $xml=($url);
    $xmlDoc = new DOMDocument();
    $xmlDoc->load($xml);

    //get elements from "<channel>"
    // main channel info
    //$channel=$xmlDoc->getElementsByTagName('channel')->item(0);
    //$channel_link   = $channel->getElementsByTagName('link')->item(0)->childNodes->item(0)->nodeValue;
    //$channel_title  = $channel->getElementsByTagName('title')->item(0)->childNodes->item(0)->nodeValue;
    //$channel_desc   = $channel->getElementsByTagName('description')->item(0)->childNodes->item(0)->nodeValue;

    //get and output "<item>" elements
    $entrys = [];
    $items=$xmlDoc->getElementsByTagName('item');
    //for ($i=0; $i<=2; $i++) {
    foreach ($items as $item) {
        $item_link  = $item->getElementsByTagName('link')->item(0)->childNodes->item(0)->nodeValue;
        $item_title = $item->getElementsByTagName('title')->item(0)->childNodes->item(0)->nodeValue;
        $item_desc  = $item->getElementsByTagName('description')->item(0)->childNodes->item(0)->nodeValue;
        // may this isn't the best data strucure for handling data between functions -> you can change it
        $entrys[] = [
            "url"       => $item_link,
            "title"     => $item_title,
            "preview"   => $item_desc
        ];
    }
    return $entrys;
}

update_feeds();
?>