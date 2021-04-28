<?php

include "templates/registration.php";
include_once "data/save_users.php";
session_start();
$error_registration = false;
$some_errors = false;
$different_passwords = false;
if (isset($_SESSION['is_login']) && $_SESSION['is_login'] == "yes"){
    header('Location: /personal_page.php ');
}

if(isset($_POST["login"]) && isset($_POST["password"])  && isset($_POST["return_password"])){
    // обработка формы
    if ( htmlentities($_POST["password"]) ==  htmlentities($_POST["return_password"])){
        if (add_user($_POST["login"], array("password" => $_POST["password"]))) {
            $_SESSION['is_login'] = "yes";
            $_SESSION["user_login"] = $_POST["login"];
            header('Location: /personal_page.php');
        } else {
            $error_registration = true;
        }
    } else {
        $_SESSION['is_login'] = "no";
        $different_passwords = true;
//        $error_registration = true;
    }

} else {
    if (isset($_POST["login"]) || isset($_POST["password"])  || isset($_POST["return_password"])){
        $some_errors = true;
    }
}

echo registration_create($error_registration, $some_errors, $different_passwords);

if (isset($_SESSION['last_page']) && $_SESSION['last_page'] == "registration.php"){
    $_SESSION['count_visit'] += 1;
} else {
    $_SESSION['last_page'] = "registration.php";
    $_SESSION['count_visit'] = 1;
}



