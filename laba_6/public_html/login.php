<?php


include "templates/login.php";
include_once "data/save_users.php";
session_start();

$error_registration = false;
$some_errors = false;

if (isset($_SESSION['is_login']) && $_SESSION['is_login'] == "yes") {
    header('Location: /personal_page.php ');
}

if (isset($_POST["login"]) && isset($_POST["password"])) {
    // обработка формы
    if (check_user($_POST["login"], $_POST["password"])) {
        $_SESSION['is_login'] = "yes";
        $_SESSION["user_login"] = $_POST["login"];
        header('Location: /personal_page.php');

    } else {
        $_SESSION['is_login'] = "no";
        $error_registration = true;
    }
} else {
    if ((isset($_POST["login"]) || isset($_POST["password"]))){
        $some_errors = true;
    }

}

echo login_create($error_registration, $some_errors);

if (isset($_SESSION['last_page']) && $_SESSION['last_page'] == "login.php") {
    $_SESSION['count_visit'] += 1;
} else {
    $_SESSION['last_page'] = "login.php";
    $_SESSION['count_visit'] = 1;
}