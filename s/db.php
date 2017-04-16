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

function save_feed_item($url,$data){
    /* Artikel aus Feed Speichern */
    global $db_prefix;
    $sql = "INSERT INTO ".$db_prefix."FEEDDATA (`cdate`, `feedid`, `url`, `title`, `preview`) VALUES (".time().", ".$data["feedid"].", '".substr($data["url"],0,2000)."', '".substr($data["title"],0,200)."', '".$data["preview"]."');";
    echo $sql."</br>";
    var_dump(db_query($sql));
}

?>