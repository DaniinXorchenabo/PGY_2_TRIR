<?php
session_start();
if (!(isset($_SESSION['is_login']) && $_SESSION['is_login'] == "yes")) {
//    header('Location: /pages/registration.php');
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
    <link rel="stylesheet" href="../stiles/background_stiles.css">
</head>
<body>
<img class="background_solder1" src="../images/background_solder1.svg">
<img class="background_grass" src="../images/background_grass.svg">
<img class="background_hill" src="../images/background_hill.svg">
<img class="background_ellipse" src="../images/background_ellipse.svg">
<img class="background_plane" src="../images/background_plane.svg">
<h1>Отлично! Теперь вы - начинающий военный диктатор!</h1>
<h2>Так, ну и <a href="#fish_description" style="font-size: inherit;">что тут надо делать?</a></h2>
<div>
    <div class="fish_text">
        <p>
            <text>Но, чтобы приступить к захвату мира, сначала необходимо обучить ваше войско!</text>
            <text>Начнем с азов! А именно со строевой подготовки!</text>
            <text>Для начала вам необходимо всего-то построить войска в колонну или в ширенгу</text>
            <text>Давай-ка начнем с числа 3: Тебе необходимо выстроить 3 подразделения своих войск в линию (ширенгу или
                колонну)!
            </text>
            <text>Смотри-ка! а вон и войска в своей казарме! такая синия в нижнем углу!</text>
            <text>Бери свою волшебную мышку м перетаскивай войска туда, куда они должны встать!</text>
            <text>Глупые войска! Сами не могут выстроиться в линию! Какой кошмар!</text>
            <text>Но будь осторожен! Времени у тебя осталось совсем чуть-чуть!</text>
            <text>Не уложишься во время - лишишся головы))))))</text>
        </p>
        <a name="fish_description"></a>
        <p>Всё прочитал? Всё понял?! Уже готов ЗАВОЕВАТЬ МИР?!</p>
        <p>Тогда жми <a href="/pages/game_screen.php">СЮДА</a> и поехали ставить мир к твоим ногам!</p>
    </div>
</div>
</body>
</html>
