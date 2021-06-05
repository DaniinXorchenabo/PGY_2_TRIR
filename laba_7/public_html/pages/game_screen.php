<?php
session_start();
if (!(isset($_SESSION['is_login']) && $_SESSION['is_login'] == "yes")) {
    header('Location: /pages/registration.php');
}
//$new_location = "/pages/game_screen.php";
?>
<!-- Дьячков Даниил Алк=ександрович 6 вариант -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script defer src="../jquery/jQuery_v3.6.0.js"></script>
    <script defer src="../scripts/timer.js"></script>
    <script defer src="../scripts/scripts.js"></script>
    <script defer src="../scripts/create_border.js"></script>
    <script defer src="../scripts/mouse_processing.js"></script>
    <script defer src="../scripts/checked.js"></script>

    <link rel="stylesheet" href="../stiles/stiles.css">
    <link rel="stylesheet" href="../stiles/timer_stiles.css">
</head>
<body>
<h1>Отлично! Теперь вы - начинающий военный диктатор!</h1>
<div>
<text>Но, чтобы приступить к захвату мира, сначала необходимо обучить ваше войско!</text>
<text>Начнем с азов! А именно со строевой подготовки!</text>
<text>Для начала вам необходимо всего-то построить войска в колонну или в ширенгу</text>
<text>Смотри-ка! а вон и войска в своей казарме! такая синия в нижнем углу!</text>
<text>Бери свою волшебную мышку м перетаскивай войска туда, куда они должны встать!</text>
<text>Глупые войска! Сами не могут выстроиться в линию! Какой кошмар!</text>
<text>Но будь осторожен! Времени у тебя осталось совсем чуть-чуть!</text>
<text>Не уложишься во время - лишишся головы))))))</text>
</div>
<main class="main_flexbox_parent">
    <div class="flex_child">
        <svg id="game_screen"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <circle id="base_circle" cx="0" cy="0" r="40" color="#000000" fill="FF0000"/>
            </defs>
            <defs>
                <g id="base_circle_button" width="50" height="50">
                    <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                    <circle cx="0" cy="0" r="20" fill="#0000f0"/>

                    <image xlink:href="/icons/soldier_1.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_1" width="40" height="40">

                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_1.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_2" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_2.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_3" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_3.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_4" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_4.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_5" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_5.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_6" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_6.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_7" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_7.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_8" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_8.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_9" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_9.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_10" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_10.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_11" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_11.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_12" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_12.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_13" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_13.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_14" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_14.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_15" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_15.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_16" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_16.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_17" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_17.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_18" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_18.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_19" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_19.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_20" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_20.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_21" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_21.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_22" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_22.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_23" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_23.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_24" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_24.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_25" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_25.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
                <g id="soldier_26" width="40" height="40">
                <rect x="-25" y="-25" width="50" height="50" fill="#fff"/>
                <circle cx="0" cy="0" r="25" fill="#fff" stroke="#00f" stroke-width="1"/>
                <image xlink:href="/icons/soldier_26.svg" width="40" height="40" x="-20" y="-20"/>
                </g>
            </defs>
            <defs>
                <rect id="base_rect" x="0" y="0" width="100" height="100" stroke="#000" fill="#fff"/>
            </defs>
            <!--    <use id="cell_0_0" xlink:href="#base_rect" x="0" y="0"></use>-->
        </svg>
    </div>
    <div class="flex_child">
        <h2>Ваши бойцы имеют <?
            $res = 0;
            if (isset($_SESSION['current_result'])){
                $res = $_SESSION['current_result'];
            }
            echo $res;
            ?> уровень</h2>
        <div class="timer_box">
            <p><span class="timer"></span></p>
        </div>
        <button id="submit" type="submit">Войско построено! Идём дальше!</button>
        <p>Милионы будут помнить вас как <?php echo $_SESSION['user_login']; ?></p>
        <a href="../processing/logout.php">НЕТ! Я слишком стар для этих ваших строевых, я на пенсию! </a>
        <p>(кхм-кхм, военный диктатор на пенсии)</p>
    </div>
</main>
</body>
</html>