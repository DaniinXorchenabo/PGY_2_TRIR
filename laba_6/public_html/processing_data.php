<?php

// функция отправки письма
function send_mail($message){
    // почта, на которую придет письмо
    $mail_to = "my@mail.ru";
    // тема письма
    $subject = "Письмо с обратной связи";

    // заголовок письма
    $headers= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
    $headers .= "From: Тестовое письмо <no-reply@test.com>\r\n"; // от кого письмо

    // отправляем письмо
    mail($mail_to, $subject, $message, $headers);
}


//$msg_box = ""; // в этой переменной будем хранить сообщения формы
$answer = "yes"; // контейнер для ошибок
// проверяем корректность полей
$data = array(
    "name" =>  array(
        "error" => "no",
        "val" => "--",
        "text_error" => ""
    ),
    "surname" =>  array(
        "error" => "no",
        "val" => "--",
        "text_error" => ""
    ),
    "email" =>  array(
        "error" => "no",
        "val" => "--",
        "text_error" => ""
    ),
    "type_dress" =>  array(
        "error" => "no",
        "val" => "--",
        "text_error" => ""
    ),
    "color" =>  array(
        "error" => "no",
        "val" => "--",
        "text_error" => ""
    ),
    "color2" =>  array(
        "error" => "no",
        "val" => "--",
        "text_error" => ""
    ),
);

foreach ($data as $key => $val) {
    if (!( $_POST[$key]["val"] != "") ){
        $data[$key]["error"] = "yes";
        $data[$key]["text_error"] = "Это поле обязательно для заполнения";
    }
    $data[$key]["val"] = $_POST[$key]["val"];
}

if ($data["email"]["error"] == "no" &&
    !(preg_match("/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/",
        $_POST["email"]["val"]))){
    $data["email"]["error"] = "yes";
    $data["email"]["text_error"] = "Вы ввели некорректный E-mail, Введите другой";
}

foreach (array("color", "color2") as $key) {
    if ($data[$key]["error"] == "no" && !(preg_match("/^#[0-9A-Fa-f]{6}$/",
            $_POST[$key]["val"]))){
        $data[$key]["error"] = "yes";
        $data[$key]["text_error"] = "Вы ввели некорректный цвет, Введите другой. Цвет должен быть введён как хештег (#) за которым идет шестизначная последовательность цифр или заглавных англицских букв (от A по F) Если сложно - выбирайте формат HEX  для цвета";
    }
}

foreach (array("name", "surname") as $key) {
    if ($data[$key]["error"] == "no" && !(preg_match("/^[А-Я][a-я]*$/",
            $_POST[$key]["val"]))){
        $data[$key]["error"] = "yes";
        $data[$key]["text_error"] = "Вы ввели поле " . $_POST[$key]["field_name"] . " некорректно. Данное поле может содержать только первую заглавную и остальные - прописные буквы русского алфовита";
    }
}
foreach ($data as $key => $val) {
    if ($val["error"] == "yes"){
        $answer = "no";
    }
}
echo json_encode(array(
    "answer" => $answer,
    "data" => $data
));