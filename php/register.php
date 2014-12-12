<?php

header("Content-type: application/json");
include("../config.php");

if (isset($_REQUEST["case"])) {
	switch($_REQUEST["case"]) {
		case "check":
			if (isSet($_REQUEST["username"])) {
				$username = $_REQUEST["username"];

				try {
				    $DBH = new PDO(DB_TYPE . ":host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
				    $STH = $DBH->query("SELECT * FROM users WHERE username='$username'");
					$STH->setFetchMode(PDO::FETCH_ASSOC);
					$record = $STH->fetch(); //Should only be one record, username is unique.
					if(is_array($record)) {
						echo 'false';
					} else {
						echo 'true';
					}
				}
				catch(PDOException $e) {
				    echo $e->getMessage();
				}
			}
			break;

		case "register":
			if (isSet($_REQUEST["username"]) && isSet($_REQUEST["password"]) && $_REQUEST["displayname"] && $_REQUEST["email"]) {
				$newUserArray = array($_REQUEST["username"],
									  password_hash($_REQUEST["password"], PASSWORD_BCRYPT),
									  $_REQUEST["displayname"],
									  $_REQUEST["email"]);

				try {
				    $DBH = new PDO(DB_TYPE . ":host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
				    $STH = $DBH->prepare("INSERT INTO users (username, password, displayname, email) values (?, ?, ?, ?)");
					$STH->execute($newUserArray);
					echo "success";
				}
				catch(PDOException $e) {
				    echo $e->getMessage();
				}
			}
			break;

		default:
			echo "ERROR: case not recognized";
	}
} else {
	echo "ERROR: case not set";
}