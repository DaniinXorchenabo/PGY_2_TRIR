<?php
include_once "../data/save_users7.php";
session_start();

$data = array(
    "login" => array(
        "error" => "no",
        "val" => "",
        "text_error" => ""
    ),
    "password" => array(
        "error" => "no",
        "val" => "",
        "text_error" => ""
    ),
    "return_password" => array(
        "error" => "no",
        "val" => "",
        "text_error" => ""
    )
);

$new_location = "";
$answer = "no";

if (isset($_SESSION['is_login']) && $_SESSION['is_login'] == "yes"){
    $new_location = "../pages/game_screen.php";
    $answer = "yes";
//    header('Location: /pages/game_screen.php');

} else {
    if (isset($_POST["login"]) && isset($_POST["password"]) && isset($_POST["return_password"])) {
        // обработка формы
        if ($_POST["password"]["val"] == $_POST["return_password"]["val"]) {
            if (add_user7($_POST["login"]["val"], array("password" => $_POST["password"]["val"]))) {
                $_SESSION['is_login'] = "yes";
                $_SESSION["user_login"] = $_POST["login"]["val"];
                $answer = "yes";
                $new_location = "../pages/game_screen.php";
//                header('Location: /pages/game_screen.php');
            } else {
                $_SESSION['is_login'] = "no";
                $data['login']['error'] = "yes";
                $data['login']['text_error'] = "Пользователь с таким логином уже существует!";
            }
        } else {
            $_SESSION['is_login'] = "no";
            $data['return_password']['error'] = "yes";
            $data['return_password']['text_error'] = "Пароли должны совпадать, но они не совпадают!";
//        $error_registration = true;
        }

    } else {
        if (isset($_POST["login"]) || isset($_POST["password"]) || isset($_POST["return_password"])) {
            if (!(isset($_POST["login"]))) {
                $data['login']['error'] = "yes";
                $data['login']['text_error'] = "Это поле должно быть заполнено!";
            }
            if (!(isset($_POST["password"]))) {
                $data['password']['error'] = "yes";
                $data['password']['text_error'] = "Это поле должно быть заполнено!";
            }
            if (!(isset($_POST["return_password"]))) {
                $data['return_password']['error'] = "yes";
                $data['return_password']['text_error'] = "Это поле должно быть заполнено!";
            }
        }
    }
}

//save_data77($data);
//save_data7($data);
//add_user7($_POST["login"]["val"], array("password" => $_POST["password"]["val"]));
echo json_encode(array(
//    "session" => $_SESSION,
    "location" => $new_location,
    "answer" => $answer,
    "data" => $data
));
//echo json_encode(array(
////    "session" => $_SESSION,
//    "location" => $new_location,
//    "answer" => $answer,
//    "data" => $data
//));
