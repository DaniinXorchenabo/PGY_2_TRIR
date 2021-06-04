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
    <script defer src="../scripts/scripts.js"></script>
    <link rel="stylesheet" href="../stiles/stiles.css">
</head>
<body>
<h1>Кто это тут решил продолжить захват мира?</h1>
<h3>Руки в руки, ноги в ноги, голову оставь тут и бегом строить своё войско!</h3>
<form action="../processing/login.php" method="POST">

    <div class="input_box">
        <p>Введите своё имя, под которым вас запомнят миллионы!</p>
        <input name="login" required id="login" placeholder="Ленин">
        <div id="login_error"></div>
    </div>

    <div class="input_box">
        <p>Введите свой секретный ключ, чтобы ваши солдаты свогли выйти из казармы!</p>
        <input name="password" required id="password" placeholder="Ваш секретный ключ от казармы" type="password">
        <div id="password_error"></div>
    </div>

    <div class="input_box">
        <input type="submit" value="Продолжить захват мира" id="check_login">
    </div>

</form>
<a href="registration.php"> Ещё не приступили к подготовке войска для захвата мира? Запись в военные диктаторы тут!</a>
</body>
</html>