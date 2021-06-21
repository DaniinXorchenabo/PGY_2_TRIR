<?php
include_once "../data/save_users7.php";
session_start();

if (!(isset($_SESSION['is_login']) && $_SESSION['is_login'] == "yes")) {
    header('Location: /pages/registration.php');
}
if (isset($_SESSION['current_result']) and $_SESSION['current_result'] != 0){
    add_result($_SESSION['user_login'], $_SESSION['current_result']);
    unset($_SESSION['current_result']);

}
//$new_location = "/pages/game_screen.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script defer src="../jquery/jQuery_v3.6.0.js"></script>
    <script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script defer src="../scripts/scripts.js"></script>
    <link rel="stylesheet" href="../stiles/stiles.css">
    <link rel="stylesheet" href="../stiles/table_stiles.css">
    <link rel="stylesheet" href="../stiles/background_stiles.css">

</head>
<body>

<img class="background_solder1" src="../images/background_solder1.svg">
<img class="background_grass" src="../images/background_grass.svg">
<img class="background_hill" src="../images/background_hill.svg">
<img class="background_ellipse" src="../images/background_ellipse.svg">
<img class="background_plane" src="../images/background_plane.svg">

<h1>Это ваш профиль, <? echo $_SESSION['user_login']; ?></h1>
<div class="main_flexbox_parent">
    <div class="center_box input_box">

        <p>Посмотреть
            <a href="../pages/main_table.php">
                Общую рейтинговую таблицу
            </a>
        </p>
        <p>
            <a href="../processing/logout.php">
                Выйти
            </a>
            из аккаунта
        </p>
        <p>
            <a href="../pages/game_screen.php">
                Начать обучение
            </a>
            новых солдат
        </p>

        </p>
    </div>
</div>

<main class="table_flex_parent main_flexbox_parent">
    <div class="flex_child table_flex">
        <table id="last_games">
        </table>
    </div>
    <div class="flex_child table_flex">
        <table id="best_games">
        </table>
    </div>
</main>
<script>
    const last_games = JSON.parse(`<? echo json_encode(get_users_records_for_table($_SESSION['user_login'])); ?>`);
    let last_game_table = last_games.map(el => `<tr><td>${el['date_str']}</td><td>${el['result']}</td><tr>`).reduce((table, el) => table + '\n' + el, "");
    last_game_table = `<tbody>\n` + last_game_table + '\n</tbody>';
    last_game_table = `<caption>Ваши последние результаты:</caption><thead><tr><th>Время</th><th>Уровень</th></tr></thead>\n` + last_game_table + '';
    document.getElementById("last_games").innerHTML = last_game_table;

    const best_games = JSON.parse(`<? echo json_encode(get_user_best_game_for_table($_SESSION['user_login'])); ?>`);
    let best_game_table = best_games.map(el => `<tr><td>${el['date_str']}</td><td>${el['result']}</td><tr>`).reduce((table, el) => table + '\n' + el, "");
    best_game_table = `<tbody>\n` + best_game_table + '\n</tbody>';
    best_game_table = `<caption>Ваши лучшие результаты:</caption><thead><tr><th>Время</th><th>Уровень</th></tr></thead>\n` + best_game_table + '';
    document.getElementById("best_games").innerHTML = best_game_table;

    console.log(last_games);
</script>
</body>
</html>
