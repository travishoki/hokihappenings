<?php
include 'connect_vars.php';

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_DB);

if(isset($_REQUEST['cmd'])){
	switch($_REQUEST['cmd']){
		case 'get-gallery':
			if(isset($_REQUEST['slug'])){
				echo getGallery($_REQUEST['slug']);
			}
		break;
		case 'get-galleries':
			echo getGalleries();
		break;
	}//switch
}

function getGallery($slug){
	//Get slug item from gallery table
	global $conn;
	$sql = "SELECT *
			FROM gallery
			WHERE slug = '".$slug."'
			LIMIT 1";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		$obj = $result->fetch_assoc();

		//Get Image names from slug directory
		$slug = '../galleries/'.$slug;
		$img_arr = glob($slug.'/*');
		$obj['images'] = array();
		for($i = 0 ; $i < count($img_arr) ; $i++){
			$temp_arr =  explode($slug,$img_arr[$i]);
			array_push($obj['images'], $temp_arr[1]);
		}//for
		return json_encode($obj);
	}
}//getGallery

function getGalleries(){
	global $conn;
	$sql = "SELECT * 
			FROM gallery
			ORDER BY event_year DESC, event_month DESC, event_day DESC";
	$result = $conn->query($sql);

	$array = array();
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$array[] = $row;
		}//while
		return json_encode($array);
	}

}//getGalleries

?>