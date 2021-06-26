<?php


//include "templates/login.php";
include_once "../data/save_users7.php";
session_start();

$data = array(
    "login" => array(
        "error" => "no",
        "text_error" => ""
    ),
    "password" => array(
        "error" => "no",
        "text_error" => ""
    )
);
$new_location = "";
$answer = "no";

if (isset($_SESSION['is_login']) && $_SESSION['is_login'] == "yes") {
//    header('Location: /pages/game_screen.php');
    $new_location = "/pages/game_screen.php";
    $answer = "yes";
} else {

    if (isset($_POST["login"]) && isset($_POST["password"])) {
        // обработка формы
        if (check_user7($_POST["login"]["val"], $_POST["password"]["val"])) {
            $_SESSION['is_login'] = "yes";
            $_SESSION["user_login"] = $_POST["login"]["val"];
            $answer = "yes";
//            header('Location: /pages/game_screen.php');
            $new_location = "/pages/game_screen.php";

        } else {
            $_SESSION['is_login'] = "no";
            $data['login']['error'] = "yes";
            $data['login']['text_error'] = "Логин или пароль введены не верно";
        }
    } else {
        if ((isset($_POST["login"]) || isset($_POST["password"]))) {
            if (!(isset($_POST["login"]))) {
                $data['login']['error'] = "yes";
                $data['login']['text_error'] = "Введите логин!";
            }
            if (!(isset($_POST["password"]))) {
                $data['password']['error'] = "yes";
                $data['password']['text_error'] = "Введите пароль!";
            }
        }
    }
}

echo json_encode(array(
    "location" => $new_location,
    "answer" => $answer,
    "data" => $data
));
