<?php
include_once "../data/save_users7.php";
session_start();

if (!(isset($_SESSION['is_login']) && $_SESSION['is_login'] == "yes")) {
    header('Location: /pages/registration.php');
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
</head>
<body>
<h1>Это ваш профиль, <?echo $_SESSION['user_login']; ?></h1>
<table id="last_games"></table>
<table id="best_games"></table>
<script>
    const last_games = JSON.parse(`<? echo json_encode(get_users_records_for_table($_SESSION['user_login'])); ?>`);
    let last_game_table = last_games.map(el => `<tr><td>${el['date_str']}</td><td>${el['result']}</td><tr>`).reduce((table, el) => table + '\n' + el, "");
    last_game_table = `<tbody>\n` + last_game_table + '\n</tbody>';
    last_game_table = `<thead><tr><th>Время</th><th>Уровень</th></tr></thead>\n` + last_game_table + '';
    document.getElementById("last_games").innerHTML = last_game_table;

    const best_games = JSON.parse(`<? echo json_encode(get_user_best_game_for_table($_SESSION['user_login'])); ?>`);
    let best_game_table = best_games.map(el => `<tr><td>${el['date_str']}</td><td>${el['result']}</td><tr>`).reduce((table, el) => table + '\n' + el, "");
    best_game_table = `<tbody>\n` + best_game_table + '\n</tbody>';
    best_game_table = `<thead><tr><th>Время</th><th>Уровень</th></tr></thead>\n` + best_game_table + '';
    document.getElementById("best_games").innerHTML = best_game_table;

    console.log(last_games);
</script>
</body>
</html>
