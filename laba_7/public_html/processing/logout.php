<?php
session_start();

$_SESSION['is_login'] = "no";
unset($_SESSION['user_login']);
unset($_SESSION['current_result']);
//echo "logout";
header('Location: /pages/registration.php');