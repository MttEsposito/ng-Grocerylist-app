<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	session_start();
	$postData = file_get_contents('php://input');
	$jsonDataPost = json_decode($postData);
	$UserEmail = $jsonDataPost -> email; 
	$UserPassword = $jsonDataPost -> password; 
	include_once 'connect-to-db-app.php';
	try{
		$result = mysqli_query($con, "SELECT * FROM User_app WHERE email = '" .$UserEmail. "' and password = '" .$UserPassword. "'");
	if ($row = mysqli_fetch_array($result)) {
			$_SESSION['app_user_id'] = $row['userid'];
			$_SESSION['app_user_name'] = $row['name'];
			$myObjUser = new \stdClass();
			$myObjUser->userid = $row['userid'];
			$myObjUser->name = $row['name'];
			$myJson = json_encode($myObjUser);
			echo $myJson;
			mysqli_close($con);
		} else {
			$myObjUser = new \stdClass();
			$myObjUser->userid = 'error';
			$myJson = json_encode($myObjUser);
			echo $myJson;
			session_unset();
			session_destroy();
		}	
	}
	catch(Exception $e){
		mysqli_close($con);
	}
?>