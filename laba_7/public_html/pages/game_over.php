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
    <link rel="stylesheet" href="../stiles/background_stiles.css">
</head>
<body>


<h1>Ваша армия еще не готова к захвату мира!</h1>
<div class="main_flexbox_parent">
    <div class="input_box flex_child">
        <h2>Вам просто необходимо начать все сначала!</h2>
        <h2>Ваш текущий уровень выучки бойцов: <span id="level"><?
                include_once "../data/save_users7.php";
                $data = get_current_game($_SESSION['user_login']);
                if (isset($data['result'])) {
                    echo $data['result'];
                }
                ?></span></h2>
        <h2 id="time_str">
            <?
            if (isset($data['date_str'])) {
                echo $_SESSION['user_login'] . " " . $data['date_str'] . " по единому времени захватников мира";
            }
            ?></h2>
        <p>
            <button>
                <a href="../pages/game_screen.php" class="no_stiles_a">
                    Начнём сначала! Надо торопиться, а то мир захватят без меня!
                </a>
            </button>
        </p>
        <p>
            <button class="bad_button">
                <a href="../pages/personal_page.php" class="no_stiles_a bad_button">
                    Хватит с меня этих салаг! Я на пенсию!
                </a>
            </button>
        </p>
    </div>
</div>


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
<img class="background_solder1" src="../images/background_solder1.svg">
<img class="background_grass" src="../images/background_grass.svg">
<img class="background_hill" src="../images/background_hill.svg">
<img class="background_ellipse" src="../images/background_ellipse.svg">
<img class="background_plane" src="../images/background_plane.svg">
</body>
</html>