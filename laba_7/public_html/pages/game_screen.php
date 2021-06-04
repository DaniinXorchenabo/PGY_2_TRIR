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
<h1>Игра</h1>
<!--<h3>Прежде всего, постоянное информационно-пропагандистское обеспечение нашей деятельности говорит о возможностях форм воздействия. Кстати, некоторые особенности внутренней политики и по сей день остаются уделом либералов, которые жаждут быть заблокированы в рамках своих собственных рациональных ограничений. С учётом сложившейся международной обстановки, повышение уровня гражданского сознания создаёт предпосылки для существующих финансовых и административных условий.</h3>-->
<main class="main_flexbox_parent">
    <div class="flex_child">
        <svg id="game_screen">
            <defs>
                <circle id="base_circle" cx="0" cy="0" r="50" color="#000000" fill="FF0000"/>
            </defs>
            <defs>
                <g id="base_circle">
                    <circle cx="0" cy="0" r="60" color="#000000"/>
                    <circle cx="0" cy="0" r="50" color="#000000" fill="FF0000"/>
                </g>
            </defs>
            <defs>
                <rect id="base_rect" x="0" y="0" width="100" height="100" stroke="#000" fill="#fff"/>
            </defs>
            <!--    <use id="cell_0_0" xlink:href="#base_rect" x="0" y="0"></use>-->
        </svg>
    </div>
    <div class="flex_child">
        <div class="timer_box">
            <p><span class="timer"></span></p>
        </div>
        <button type="submit">Проверить</button>
        <a href="../processing/logout.php">Выйти из аккаунта </a>
    </div>
</main>
</body>
</html>