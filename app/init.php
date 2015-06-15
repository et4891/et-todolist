<?php


$_SESSION['user_id'] = 1;

//$db = new PDO('mysql:dbname=et4891_SharingDatabase;host=localhost', 'et4891_admin', '4513308');
$db = new PDO('mysql:dbname=phptodolist;host=localhost', 'root', '');
// Handle this in some other way
if (!isset($_SESSION['user_id']))
{
	die('Check your id and password');
	// header('Location: login-form.php');
}