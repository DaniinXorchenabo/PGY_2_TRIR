<?php
session_start();

$_SESSION['is_login'] = "no";
unset($_SESSION['user_login']);;
//echo "logout";
header('Location: /pages/registration.php');