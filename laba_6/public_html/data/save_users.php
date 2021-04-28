<?php

function save_data($data){
    $json_str = json_encode($data, JSON_UNESCAPED_UNICODE);
    file_put_contents('data/users.txt', $json_str);
}

function get_user_data(){
    $file = file_get_contents('data/users.txt', FILE_USE_INCLUDE_PATH) ;
    if ($file){
        return json_decode($file, true);

    } else {
        $file = array();
        return $file;
    }

}

function add_user($login, $user_data){
    /*
     * $login - str
     * $user_data = array(
     *  "password" => "123"
     * );
     */
    $data = get_user_data();
    if (array_key_exists($login, $data)){
        return false;
    }
    $data[$login] = $user_data;
    save_data($data);
    return true;
}

function check_user($login, $password){
    $data = get_user_data();
    if (array_key_exists($login, $data) && $data[$login]["password"] == $password){
        return true;
    }
    return false;
}


/*
 * users_data = array(
 *  "login1" => array(
 *      "password" => "123"
 *  ),
 *  "login2" => array()
 * );
 */
