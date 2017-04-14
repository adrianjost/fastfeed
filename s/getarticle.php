<?php
// !!! is working as it is - no changes here!!!
require_once 'inc/Readability.php';
header('Content-Type: application/json; charset=utf-8');

// get latest Medialens alert 
// (change this URL to whatever you'd like to test)
$url = 'http://t3n.de/news/besten-news-apps-807908/';
if(isset($_GET["url"])){
    $url = $_GET["url"];
}else{
    echo json_encode(["status"=>false,"desc"=>"missing url"]);
    exit();
}
if(isset($_GET["id"])){
    $id = $_GET["id"];
}else{
    echo json_encode(["status"=>false,"desc"=>"missing id"]);
    exit();
}
//$url = str_replace("https://","http://",$url);
//echo $url;
$html = file_get_contents($url);

// Note: PHP Readability expects UTF-8 encoded content.
// If your content is not UTF-8 encoded, convert it 
// first before passing it to PHP Readability. 
// Both iconv() and mb_convert_encoding() can do this.

// If we've got Tidy, let's clean up input.
// This step is highly recommended - PHP's default HTML parser
// often does a terrible job and results in strange output.
if (function_exists('tidy_parse_string')) {
	$tidy = tidy_parse_string($html, array(), 'UTF8');
	$tidy->cleanRepair();
	$html = $tidy->value;
}
function lazyimg( $content ) { 
    //if ( false !== strpos( $content, 'data-src' ) ) return $content; 
    $placeholder_image = ('data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='); 
    //$content = preg_replace( '#<img([^>]+?)src=[\'"]?([^\'"\s>]+)[\'"]?([^>]*)>#', sprintf( '<img${1}src="%s" data-src="${2}"${3}>', $placeholder_image ), $content ); 
    $content = preg_replace( '#<img([^>]+?)src=[\'"]?([^\'"\s>]+)[\'"]?([^>]*)>#', sprintf( '<img src="%s" data-src="${2}">', $placeholder_image ), $content ); 
    return $content; } 
// give it to Readability
$readability = new Readability($html, $url);
// print debug output? 
// useful to compare against Arc90's original JS version - 
// simply click the bookmarklet with FireBug's console window open
$readability->debug = false;
// convert links to footnotes?
$readability->convertLinksToFootnotes = false;
// process it
$result = $readability->init();
// does it look like we found what we wanted?
if ($result) {
    
	//echo "== Title =====================================\n";
	//echo $readability->getTitle()->textContent, "\n\n";
	//echo "== Body ======================================\n";
	$content = $readability->getContent()->innerHTML;
	// if we've got Tidy, let's clean it up for output
	if (function_exists('tidy_parse_string')) {
		$tidy = tidy_parse_string($content, array('indent'=>true, 'show-body-only' => true), 'UTF8');
		$tidy->cleanRepair();
		$content = $tidy->value;
	} 
    $content = lazyimg($content);
	//echo $content;
    echo json_encode([
        "status"=> true,
        "id"    => $id,
        "title" => $readability->getTitle()->textContent, 
        "body"  => $content]);
} else {
	echo json_encode(["status"=>false,"id"=>$id]);
}
?>