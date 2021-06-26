<?php
session_start();
if (!(isset($_SESSION['is_login']) && $_SESSION['is_login'] == "yes")) {
    header('Location: /pages/game_screen.php');
//$new_location = "/pages/game_screen.php";
}


//include "templates/login.php";
include_once "../data/save_users7.php";
//session_start();

$data = array(
    "group_data" => array(
        "error" => "no",
        "text_error" => "",
        "sended_data" => ""
    ),
    "group_name" => array(
        "error" => "no",
        "text_error" => ""
    )
);
$new_location = "";
$answer = "no";

if (isset($_POST["group_data"]) && $_POST["group_data"] != "" && isset($_POST["group_name"]) && $_POST["group_name"] != "") {
    // обработка формы
    if (add_group($_SESSION["user_login"], $_POST["group_name"]["val"],  $_POST["group_data"]["val"])) {
        $answer = "yes";
//            header('Location: /pages/game_screen.php');
        $new_location = "/pages/game_screen.php";

    } else {

        $data['group_name']['error'] = "yes";
        $data['group_name']['text_error'] = "Такое имя группы уже существует! Выберите другое!";
    }
} else {
        if (!(isset($_POST["group_data"])) || $_POST["group_data"] == "") {
            $data['group_data']['error'] = "yes";
            $data['group_data']['text_error'] = "Группа не может быть пустой!";
            $data['group_data']['sended_data'] = "*";
//            array_push($data['group_data'],  array("group_data" => $_POST["group_data"]));

        }
        if (!(isset($_POST["group_name"])) || $_POST["group_name"] == "") {
            $data['group_name']['error'] = "yes";
            $data['group_name']['text_error'] = "Введите название группы!";
        }

}

echo json_encode(array(
    "location" => $new_location,
    "answer" => $answer,
    "data" => $data
));
