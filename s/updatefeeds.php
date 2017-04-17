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

function minimalize($str){
    $str = trim($str)
    //remove all html tags except <br><p><a>
    strip_tags($str, '<br><p><a>');
    //remove images
    $str = preg_replace("/<img[^>]+\>/i", "(", $str); 
    //remove attributes from html-tags
    $str = preg_replace("/<([a-z][a-z0-9]*)[^>]*?(\/?)>/i",'<$1$2>', $str);
    
    return $str;
}

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
        
        if(strlen($item_title)<3){$item_title = "TL;DR";}
        if(strlen($item_desc)<5){$item_desc = "no description found";}
        
        $entrys[] = [
            "url"       => $item_link,
            "title"     => minimalize($item_title),
            "preview"   => minimalize($item_desc)
        ];
    }
    return $entrys;
}

update_feeds();
?>