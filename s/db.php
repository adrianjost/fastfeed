<?php 
require("config.php");

function db_connect(){
	global $db_host, $db_user, $db_pw, $db_name;
	$db = mysqli_connect($db_host, $db_user, $db_pw, $db_name);
    // Check connection
    if (mysqli_connect_errno()){
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
        return false;
}else{return $db;}}

function db_close($db){
    mysqli_close($db);
}

function db_query($query){
    $db = db_connect();
    if($db){
        $result = mysqli_query($db,$query);
        db_close($db);
        return $result;
    }else{return false;}
}

function get_last_feeditem_url($feedid){
    // get url from newest stored article from this feed (highest id)
    //lasturl = SELECT URL FROM FEEDDATA WHERE FEEDID = $feedid AND MAX(ID) = ID;
    global $db_prefix;
    $sql = "SELECT url FROM ".$db_prefix."FEEDDATA WHERE articleid=(SELECT MAX(articleid) FROM ".$db_prefix."FEEDDATA WHERE feedid=".$feedid.");";
    $result = db_query($sql);
    return mysqli_fetch_assoc($result)["url"];
}
function get_feed_list(){
    global $db_prefix;
    $sql = "SELECT feedid, feedurl FROM ".$db_prefix."FEEDS;";
    $result = db_query($sql);
    $return = [];
    while ($row = mysqli_fetch_assoc($result)) {$return[] = $row;}
    return $return;
}

function save_feed_item($data){
    /* Artikel aus Feed Speichern */
    global $db_prefix;
    $sql = "INSERT INTO ".$db_prefix."FEEDDATA (`cdate`, `feedid`, `url`, `title`, `preview`) VALUES (".time().", ".$data["feedid"].", '".substr(trim($data["url"]),0,2000)."', '".substr(trim($data["title"]),0,200)."', '".trim($data["preview"])."');";
    db_query($sql);
}

function cleanup_db(){
    global $db_prefix;
    // keep only 100 articles per feed and delete all articles that are older than 1 week
    // select all articleids to delete
    $getsql = "SELECT articleid FROM ".$db_prefix."FEEDDATA s WHERE (
            SELECT  COUNT(*) 
            FROM    ".$db_prefix."FEEDDATA  f
            WHERE f.feedid = s.feedid
            	AND f.feedid > s.feedid
        ) > 100 OR ((SELECT UNIX_TIMESTAMP(NOW()) - 604800) > s.cdate) ORDER BY s.feedid;";
    $result = db_query($getsql);
    //delete each article
    while ($row = mysqli_fetch_assoc($result)){
        $delsql = "DELETE FROM ".$db_prefix."FEEDDATA WHERE feedid = ".$row["feedid"].";";
        db_query($delsql);
    }
    return true;    
}

function get_new_feeds($lastid){
    global $db_prefix;
    $sql = "SELECT ".$db_prefix."FEEDDATA.*,".$db_prefix."FEEDS.iconurl  FROM ".$db_prefix."FEEDDATA, ".$db_prefix."FEEDS WHERE ".$db_prefix."FEEDDATA.articleid > ".$lastid." AND ".$db_prefix."FEEDDATA.feedid = ".$db_prefix."FEEDS.feedid ORDER BY ".$db_prefix."FEEDDATA.articleid LIMIT 0 , 100;";
    $result = db_query($sql);
    $return = [];
    while ($row = mysqli_fetch_assoc($result)){
        $return[] = [
        "id"        => $row["articleid"],
        "cdate"     => $row["cdate"],
        "content"   => [
            "url"       => $row["url"],
            "iconurl"   => $row["iconurl"],
            "title"     => utf8_encode($row["title"]),
            "preview"   => strip_tags(utf8_encode(strip_tags($row["preview"])))
        ]];
    }
    return $return;
}

?>