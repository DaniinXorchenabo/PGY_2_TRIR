<?php

function save_data7($data)
{
    $json_str = json_encode($data, JSON_UNESCAPED_UNICODE);
    file_put_contents('../data/users7.txt', $json_str);
}

function get_user_data7()
{
    $file = file_get_contents('../data/users7.txt', FILE_USE_INCLUDE_PATH);
    if ($file) {
        return json_decode($file, true);

    } else {
        $file = array();
        return $file;
    }

}

function get_results(){
    $file = file_get_contents('../data/results.txt', FILE_USE_INCLUDE_PATH);
    if ($file) {
        return json_decode($file, true);

    } else {
        $file = array();
        return $file;
    }
}
function save_results($data)
{
    $json_str = json_encode($data, JSON_UNESCAPED_UNICODE);
    file_put_contents('../data/results.txt', $json_str);
}

function add_user7($login, $user_data)
{
    /*
     * $login - str
     * $user_data = array(
     *  "password" => "123"
     * );
     */
    $data = get_user_data7();
    if (array_key_exists($login, $data)) {
        return false;
    }
    $data[$login] = $user_data;
    save_data7($data);
    return true;
}

function check_user7($login, $password)
{
    $data = get_user_data7();
    if (array_key_exists($login, $data) && $data[$login]["password"] == $password) {
        return true;
    }
    return false;
}


function add_result($login, $result){
    $data = get_results();
    $current_user = array();
    if (array_key_exists($login, $data)) {
        $current_user = $data[$login];
    }
    $date_str = "Завершил игру " . date("d.m.y") . " в " .  date("H:i:s");
    $raw_date = date("y") * 10000000000 + date("m") * 100000000 + date("d") * 1000000 + date("H") * 10000 + date("i") * 100 + date("s");
    array_push($current_user, array("result" => $result, "date_str" => $date_str, "raw_date" => $raw_date));
    $data[$login] = $current_user;
    save_results($data);
}

function get_current_game($login){
    $data = get_results();
    $current_user = array();
    if (array_key_exists($login, $data)) {
        $current_user = $data[$login];
    }
    $current_game_data = array();
    foreach ($current_user as $ind => $game_data) {
        if (!isset($current_game_data['raw_date']) or $current_game_data['raw_date'] < $game_data['raw_date']) {
            $current_game_data = $game_data;
        }
    }
    return $current_game_data;
}

function get_users_records_for_table($login){
    $data = get_results();
    $current_user = array();
    if (array_key_exists($login, $data)) {
        $current_user = $data[$login];
    }
    $id_arr = array();
    foreach ($current_user as $ind => $game_data) {
        $id_arr[$ind] = $game_data['raw_date'];
    }
    array_multisort($id_arr, SORT_DESC, SORT_NUMERIC, $current_user);
    return $current_user;

}

function get_user_best_game_for_table($login){
    $data = get_results();
    $current_user = array();
    if (array_key_exists($login, $data)) {
        $current_user = $data[$login];
    }
    $id_arr = array();
    foreach ($current_user as $ind => $game_data) {
        $id_arr[$ind] = $game_data['result'];
    }
    array_multisort($id_arr, SORT_DESC, SORT_NUMERIC, $current_user);
    return $current_user;

}