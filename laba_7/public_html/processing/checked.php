<?php

include_once "../data/save_users7.php";
session_start();

function bad_data_answer($filtered_coords){
    return json_encode(array(
        "type" => "answer",
        "answer" => "no",
        "data" => $filtered_coords
    ));
}

if (!(isset($_SESSION['is_login']) && $_SESSION['is_login'] == "yes")){
    header('Location: /page/registration.php');
    echo json_encode(array(
        "type" => "error",
        "text" => "Вы не зарегестрированы"
    ));
}

// Убираем ненужные данные (ключи в координатах)
$data = $_POST['data'];
//$data = json_decode($_POST);
foreach ($data as $circle_id => $circle_data) {
    $data[$circle_id] = array($circle_data['x'], $circle_data['y']);
}

// убираем ненужные данные (ключи с id-шником)
$only_coord = array();
foreach ($data as $circle_id => $coords) {
    // преобразовываем координаты в числовой формат
    foreach ($coords as $ind => $coord) {
        $coords[$ind] = (int)$coord;
    }
    array_push($only_coord, $coords);
}

// Убираем кружочки, которые за полем
$filtered_coords = array();
foreach ($only_coord as $ind => $coords) {
   if ($coords[0] >= 0 && $coords[0] % $_POST["width"] == 0 && $coords[0] < $_POST["width"] * $_POST["count_x"] && $coords[1] >= 0 && $coords[1] % $_POST["height"] == 0 && $coords[1] < $_POST["height"] * $_POST["count_y"] ){
       array_push($filtered_coords, $coords);
   }
}

if (count($filtered_coords) == $_POST['good_count']){
    $axis = 1;
    $size = $_POST['height'];
    if ($filtered_coords[0][0] == $filtered_coords[1][0]){
        $axis = 0;
        $size = $_POST['width'];
    }
    $is_one_line = true;

    // проверяем, что фигуры расположены в линию
    $axes = array();
    foreach ($filtered_coords as $ind => $coords) {
        if ($filtered_coords[0][$axis] != $coords[$axis]){
            $is_one_line = false;
        }
        array_push($axes, $coords[1 - $axis]);
    }

    // Проверка, что линия непрерывна (если несколько кругов в одной клетке - то это тоже учитывается)
    sort($axes);
    foreach ($axes as $ind => $coords) {
        if ($ind != 0){
            if ($coords - $axes[$ind - 1] != $size){
                $is_one_line = false;
            }
        }
    }

    if ($is_one_line) {
        add_result($_SESSION['user_login'], 1);
        echo json_encode(array(
            "type" => "answer",
            "answer" => "ok",
            "data" => $filtered_coords,
            "axes" => $axes,
        ));
    } else {
        echo bad_data_answer($filtered_coords);
    }
} else {
    echo bad_data_answer($filtered_coords);
}

