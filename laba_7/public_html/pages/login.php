<?php
session_start();
if (isset($_SESSION['is_login']) && $_SESSION['is_login'] == "yes") {
    header('Location: /pages/game_screen.php');
//$new_location = "/pages/game_screen.php";
}
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
<h1>Кто это тут решил продолжить захват мира?</h1>

<form action="../processing/login.php" method="POST">
    <div class="input_box">
        <p>
            Ещё не приступили к подготовке войска для захвата мира?
            <a href="registration.php">Запись в военные диктаторы тут!</a>
        </p>
        <h3>Руки в руки, ноги в ноги, голову оставь тут и бегом строить своё войско!</h3>
    </div>
    <div class="input_box">
        <p>Введите своё имя, под которым вас запомнят миллионы!</p>
        <input name="login" required id="login" placeholder="Ленин" autocomplete="off">
        <div id="login_error"></div>
    </div>

    <div class="input_box">
        <p>Введите свой секретный ключ, чтобы ваши солдаты свогли выйти из казармы!</p>
        <input name="password" required id="password" placeholder="Ваш секретный ключ от казармы" type="password" autocomplete="off">
        <div id="password_error"></div>
    </div>

    <div class="input_box">
        <input type="submit" value="Продолжить захват мира" id="check_login">

    </div>

</form>
</body>
</html>