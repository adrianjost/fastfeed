<?php
/*
SCRIPT ISN'T WORKING AND NEED TO BE CODED
function: read all feeds from FEEDS-Table and save all new articles in FEEDDATA-Table
Main-function: update_feeds()
*/
/*
DATA TABLES -> info.txt
*/
ignore_user_abort(true);
//set_time_limit(0);

require("db.php");
function update_feeds(){
    $feeds = get_feed_list();
    $newfeeddata=[];
    foreach ($feeds as $feed) {
        $lastknownitemurl = get_last_feeditem_url($feed["feedid"]);
        if(!$lastknownitemurl){$lastknownitemurl = "";}
        $items = get_feed_and_parse($feed["feedurl"]);
        foreach($items as $item){
            $item["feedid"] = $feed["feedid"];
            $newfeeddata[] = $item;
        }
    }
    function datesort($a, $b){
        $a = intval($a["pubDate"]);
        $b = intval($b["pubDate"]);
        if ($a == $b) {return 0;}
        return ($a < $b) ? -1 : 1;
    }
    usort($newfeeddata, "datesort");

    foreach ($newfeeddata as $item) {
        unset($item["pubDate"]);
        save_feed_item($item);
    }
    cleanup_db();
}

function minimize($str){
    //remove all html tags except <br><p><a>
        $str = strip_tags($str);
    //remove spaces at start & end
        $str = str_replace("&nbsp;", ' ', $str);
        $str = trim($str);
    //remove images
        //$str = preg_replace("/<img[^>]+\>/i", "(", $str); 
    //remove attributes from html-tags
        //$str = preg_replace("/<([a-z][a-z0-9]*)[^>]*?(\/?)>/i",'<$1$2>', $str);
    //encode html chars
        $str = htmlentities($str);
    return $str;
}

function truncate($str, $len){
    if(strlen($str)>$len && $len>=4){return substr($str, 0, strpos(wordwrap($str, ($len-4)), "\n"))." ...";}
    else{return $str;}
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
        $item_link  = $item->getElementsByTagName('link')->item(0)->nodeValue;
        $item_title = $item->getElementsByTagName('title')->item(0)->nodeValue;
        $item_desc  = $item->getElementsByTagName('description')->item(0)->nodeValue;
        $item_pubDate  = $item->getElementsByTagName('pubDate')->item(0)->nodeValue;
        
        $item_title = minimize($item_title);
        $item_desc  = minimize($item_desc);
        
        //$item_desc  = str_replace("http://","https://",$item_desc);
        if(strlen($item_title)<3){$item_title = "TL;DR";}
        if(strlen($item_desc)<5){
            $item_descE  = $item->getElementsByTagName('content:encoded')->item(0)->nodeValue;
            $item_desc  = minimize($item_descE);
            if(strlen($item_desc)<5){$item_desc = "no description found";}
        }
        
        //truncate description
        $item_title = truncate($item_title,200);
        $item_desc = truncate($item_desc,500);
        
        $entrys[] = [
            "url"       => strtok(trim($item_link),'?'),
            "title"     => $item_title,
            "preview"   => $item_desc,
            "pubDate"   => strtotime($item_pubDate)
        ];
        //echo substr(($item_desc), 0, 500);
    }
    return $entrys;
}

update_feeds();
?>