<?php
session_start();
if (!(isset($_SESSION['is_login']) && $_SESSION['is_login'] == "yes")) {
    header('Location: /pages/registration.php');
//$new_location = "/pages/game_screen.php";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
<!--    <script defer src="../jquery/jQuery_v3.6.0.js"></script>-->
<!--    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>-->
<!--    <script defer src="../scripts/scripts.js"></script>-->
    <link rel="stylesheet" href="../stiles/stiles.css">
</head>
<body>
<h1>Вагша армия еще не готова к захвату мира!</h1>
<h2>Вам приется начать все сначала!</h2>
<h2>Ваш текущий уровень выучки бойцов: <span id="level"><?
        include_once "../data/save_users7.php";
        $data = get_current_game($_SESSION['user_login']);
        if (isset($data['result'])){
            echo $data['result'];
        }
        ?></span></h2>
<h2 id="time_str"><?
    if (isset($data['date_str'])){
        echo $data['date_str'] . " по единому времени захватников мира";
    }
    ?></h2>
<button><a href="../processing/logout.php">Хватит с меня этих салаг! Я на пенсию!</a></button>
<button><a href="../pages/game_screen.php">Начнём сначала! Надо торопиться, а то мир захватят без меня!</a></button>
<!--<script>-->
<!--    $.ajax({-->
<!--        url: "/processing/get_level.php", // куда отправляем-->
<!--        type: "get", // метод передачи-->
<!--        dataType: "json", // тип передачи данных-->
<!--        success: data => {-->
<!--            console.log(data)-->
<!--            if (data && data['type'] === "level_settings"){-->
<!--                // timer.map((el, ind) => {timer[ind][0] = data['timer_data'][ind] !== undefined? data['timer_data'][ind]: 0});-->
<!--                // level = data['level'];-->
<!--                document.getElementById("level").innerText = data['level']-->
<!--                document.getElementById("time_str").innerText-->
<!--                -->
<!--            } else {-->
<!--                location.replace("/pages/registration.php")-->
<!--            }-->
<!--        }-->
<!--    });-->
<!--</script>-->
</body>
</html>