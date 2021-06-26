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
    "get_group_name" => array(
        "error" => "no",
        "text_error" => "",
        "sended_data" => "",
        "group" => ""
    )
);
$new_location = "";
$answer = "no";

if (isset($_POST["get_group_name"]) && $_POST["get_group_name"] != "") {
    // обработка формы
    $group_data = get_group($_SESSION["user_login"], $_POST["get_group_name"]["val"]);
    $answer = "yes";
    $data["group"] = $group_data;

//            header('Location: /pages/game_screen.php');
//        $new_location = "/pages/game_screen.php";

    if ($group_data == "") {
        $answer = "no";
        $data['get_group_name']['error'] = "yes";
        $data['get_group_name']['text_error'] = "Такой группы не существует";
    }
} else {
    if (!(isset($_POST["get_group_name"])) || $_POST["get_group_name"] == "") {
        $data['get_group_name']['error'] = "yes";
        $data['get_group_name']['text_error'] = "Такой группы не существует";
    }

}

echo json_encode(array(
    "location" => $new_location,
    "answer" => $answer,
    "data" => $data
));
