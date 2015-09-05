<?php
if(isset($_REQUEST['cmd']) && isset($_REQUEST['url'])){
	switch($_REQUEST['cmd']){
		case 'get-gallery':
			echo getGallery($_REQUEST['url']);
		break;
	}//switch
}

function getGallery($url){
	$url = '../galleries/'.$url;
	$return_arr = array();
	$img_arr = glob($url.'/*');
	for($i = 0 ; $i < count($img_arr) ; $i++){
		$temp_arr =  explode("../",$img_arr[$i]);
		array_push($return_arr, $temp_arr[1]);
	}//for
	return json_encode($return_arr);
}//getGallery