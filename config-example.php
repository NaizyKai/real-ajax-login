<?php
/*
 * Rename this file to config.php and change the information below.
 */

// DB_TYPE support depends on your server, but this will be the first part of 
// the connection string for the PDO object. Other options might be 'mssql',
// 'sybase', or 'sqllite'. Only mysql has been tested.
define('DB_TYPE', 'mysql');

// These settings will work for typical installs of XAMPP.
define('DB_HOST', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');

// Don't forget to import the sql file in the repository.
define('DB_NAME', 'ral_users');
