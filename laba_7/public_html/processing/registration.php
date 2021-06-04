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
                $data['login']['text_error'] = "Военный диктатор с таким именем уже начал тренировать свою армию! введите другое имя и поторапливайтесь! а то мир захватят без вас(";
            }
        } else {
            $_SESSION['is_login'] = "no";
            $data['return_password']['error'] = "yes";
            $data['return_password']['text_error'] = "Нет нет, чтобы изготовить ключ от казармы, эти строчки должны совпадать!";
//        $error_registration = true;
        }

    } else {
        if (isset($_POST["login"]) || isset($_POST["password"]) || isset($_POST["return_password"])) {
            if (!(isset($_POST["login"]))) {
                $data['login']['error'] = "yes";
                $data['login']['text_error'] = "Милионы (и МЫ) не смогут запомнить вашего имени, если его у вас не будет! Его обяхательно ввести!";
            }
            if (!(isset($_POST["password"]))) {
                $data['password']['error'] = "yes";
                $data['password']['text_error'] = "Если на вашей казарме не будет ключа, то ваши солдаты разбегутся и захватят мир без вас :( Вам обязательно нужен этот ключ (и его необходимо ввести дважды)!";
            }
            if (!(isset($_POST["return_password"]))) {
                $data['return_password']['error'] = "yes";
                $data['return_password']['text_error'] = "Если на вашей казарме не будет ключа, то ваши солдаты разбегутся и захватят мир без вас :( Вам обязательно нужен этот ключ (и его необходимо ввести дважды)!";
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
