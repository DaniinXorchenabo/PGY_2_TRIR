<?php
session_start();
if (isset($_SESSION['is_login']) && $_SESSION['is_login'] == "yes") {
    $res = 0;
    if (isset($_SESSION['current_result'])){
        $res = $_SESSION['current_result'];
    }
    $seconds = 70;
    if ($seconds - $res * 5 < 40){
        $seconds = 40;
        if ($seconds - ($res - 6) * 3 < 20){
            $seconds = 20;
            if ($seconds - ($res - 6 - 7) * 2 < 10){
                $seconds = 10;
                if ($seconds - ($res - 6 - 7 - 5) * 2 < 5){
                    $seconds = 5;
                }else {
                    $seconds = $seconds - ($res - 6 - 7 - 5) * 2;
                }
            } else {
                $seconds = $seconds - ($res - 6 - 7) * 2;
            }
        } else {
            $seconds = $seconds - ($res - 6) * 3;
        }
    } else {
        $seconds = $seconds - $res * 5;
    }
    echo json_encode(array(
        "type" => "level_settings",
        "timer_data" => array($seconds % 60, $seconds / 60 % 60, $seconds / 3600 % 24, 0),
        "level" => $res
    ));
} else {
    echo json_encode(array("type" => "error", "description" => "no authentication"));
}

