<?php
header("Content-type: application/json");
include("../config.php");

session_start();
if (isSet($_POST["username"]) && isSet($_POST["password"])) {
	$username = $_POST["username"];
	$password = $_POST["password"];

	try {
	    $DBH = new PDO(DB_TYPE . ":host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
	    $STH = $DBH->query("SELECT * FROM users WHERE username='$username'");
		$STH->setFetchMode(PDO::FETCH_ASSOC);
		$record = $STH->fetch(); //Should only be one record, username is unique.

		if (password_verify($password, $record['password'])) {
			$record['password'] = '';
			$_SESSION = $record;
			print_r(json_encode($record));
		}
	}
	catch(PDOException $e) {
	    echo $e->getMessage();
	}
}