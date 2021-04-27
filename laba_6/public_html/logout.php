<?php
session_start();

$_SESSION['is_login'] = "no";
//echo "logout";
header('Location: /registration.php ');