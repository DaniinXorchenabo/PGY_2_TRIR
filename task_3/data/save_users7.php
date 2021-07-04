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

function get_figures()
{
    $file = file_get_contents('../data/figures.txt', FILE_USE_INCLUDE_PATH);
    if ($file) {
        return json_decode($file, true);

    } else {
        $file = array();
        return $file;
    }
}

function save_figures($data)
{
    $json_str = json_encode($data, JSON_UNESCAPED_UNICODE);
    file_put_contents('../data/figures.txt', $json_str);
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


function add_group($login, $group_name, $group_data)
{
    $data = get_figures();
    $current_user = array("groups" => array("" => ""));
    if (array_key_exists($login, $data)) {
        $current_user = $data[$login];
    }
    if (array_key_exists($group_name, $current_user["groups"])) {
        return false;
    }
    $current_user["groups"][$group_name] = $group_data;
    $data[$login] = $current_user;
    save_figures($data);
    return true;
}

function get_group($login, $group_name)
{
    $data = get_figures();
    if (array_key_exists($login, $data)) {
        $current_user = $data[$login];
        if (array_key_exists($group_name, $current_user['groups'])) {
            return $current_user['groups'][$group_name];
        }
        return "";
    }
    return "";


}

function get_users_records_for_table($login)
{
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

function get_user_best_game_for_table($login)
{
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

function get_all_best_games()
{
    $data_from_file = get_results();
    $data = array();
    $best_results = array();
    foreach ($data_from_file as $login => $current_user_data) {
        foreach ($current_user_data as $ind => $game_data) {
            array_push($data, array(
                "login" => $login,
                "date_str" => $game_data['date_str'],
                "result" => $game_data['result'],
                "raw_date" => $game_data['raw_date']
            ));
            array_push($best_results, $game_data["result"]);
        }
    }
    array_multisort($best_results, SORT_DESC, SORT_NUMERIC, $data);
    return $data;
}

function get_last_games()
{
    $data_from_file = get_results();
    $data = array();
    $last_games = array();
    foreach ($data_from_file as $login => $current_user_data) {
        foreach ($current_user_data as $ind => $game_data) {
            array_push($data, array(
                "login" => $login,
                "date_str" => $game_data['date_str'],
                "result" => $game_data['result'],
                "raw_date" => $game_data['raw_date']
            ));
            array_push($last_games, $game_data["raw_date"]);
        }
    }
    array_multisort($last_games, SORT_DESC, SORT_NUMERIC, $data);
    return $data;
}