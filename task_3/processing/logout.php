<?php
session_start();
include_once "../data/save_users7.php";
$_SESSION['is_login'] = "no";
unset($_SESSION['user_login']);
//echo "logout";
header('Location: /pages/registration.php');