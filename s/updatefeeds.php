<?php
/*
SCRIPT ISN'T WORKING AND NEED TO BE CODED
function: read all feeds from FEEDS-Table and save all new articles in FEEDDATA-Table
Main-function: update_feeds()
*/
/*
DATA TABLES -> info.txt
*/
function update_feeds(){
    /*
    $feeds = SELECT feedid, feedurl FROM FEEDS;
    FOR EACH $feeds{
        $lastknownitemurl = get_last_feed_item_url($feeds[feedid]);
        $items = get_feed_and_parse($url, $lastknownitemurl);
        foreach($items as $item) {
            save_feed_item($url, $item);
        }
    }
    */
}
function get_last_feed_item_url($feedid){
    // get url from newest stored article from this feed (highest id)
    //lasturl = SELECT URL FROM FEEDDATA WHERE FEEDID = $feedid AND MAX(ID) = ID;
}
function save_feed_item($url,$data){
    /* Artikel aus Feed Speichern */
    $feed_id = get_feed_id($url); // TODO:  SELECT id from FEEDS where url = url;
    //sql befehl hier
    //INSERT INTO FEEDDATA ($feed_id, $data);
    
}
function get_feed_and_parse($url,$lastknownitemurl){
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
        if($lastknownitemurl == $item_link){
            //no more new items
            break;
        }
        $item_title = $item->getElementsByTagName('title')->item(0)->childNodes->item(0)->nodeValue;
        $item_desc  = $item->getElementsByTagName('description')->item(0)->childNodes->item(0)->nodeValue;
        // may this isn't the best data strucure for handling data between functions -> you can change it
        $entrys[] = [
            "content"   => [
                "url"       => $item_link,
                "title"     => $item_title,
                "preview"   => $item_desc
            ]
        ]);
    }
    return $entrys;
}
?>