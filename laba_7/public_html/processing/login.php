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
            $data['login']['text_error'] = "Ваше имя не совпадает с вашим секретным ключом от вашей казармы! Вас ждет расстрел! (если не вспомните)";
        }
    } else {
        if ((isset($_POST["login"]) || isset($_POST["password"]))) {
            if (!(isset($_POST["login"]))) {
                $data['login']['error'] = "yes";
                $data['login']['text_error'] = "Милионы (и МЫ) не смогут запомнить вашего имени, если его у вас не будет! Его обяхательно ввести!";
            }
            if (!(isset($_POST["password"]))) {
                $data['password']['error'] = "yes";
                $data['password']['text_error'] = "Если на вашей казарме не будет ключа, то ваши солдаты разбегутся и захватят мир без вас :( Вам обязательно нужен этот ключ!";
            }
        }
    }
}

echo json_encode(array(
    "location" => $new_location,
    "answer" => $answer,
    "data" => $data
));
