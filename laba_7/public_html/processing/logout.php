<?php
session_start();
include_once "../data/save_users7.php";
if (isset($_SESSION['current_result']) and $_SESSION['current_result'] != 0){
    add_result($_SESSION['user_login'], $_SESSION['current_result']);
}

$_SESSION['is_login'] = "no";
unset($_SESSION['user_login']);
unset($_SESSION['current_result']);
//echo "logout";
header('Location: /pages/registration.php');