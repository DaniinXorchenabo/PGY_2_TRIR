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
</head>
<body>

<h1>Регистрация</h1>
<form action="../processing/registration.php" method="POST">


    <div class="input_box">
        <p>Придумайте и введите свой логин</p>
        <input name="login" required id="login" placeholder="Ваш логин" autocomplete="off">
        <div id="login_error"></div>
    </div>

    <div class="input_box">
        <p>Придумайте и введите пароль</p>
        <input name="password" required id="password" placeholder="Ваш пароль" type="password" autocomplete="off">
        <div id="password_error"></div>
    </div>

    <div class="input_box">
        <p>Введите свой пароль еще раз</p>
        <input name="return_password" required id="return_password" placeholder="введите пароль еще раз" type="password">
        <div id="return_password_error"></div>
    </div>

    <div class="input_box">
        <input type="submit" value="Зарегестрироваться" id="check_registration" autocomplete="off">

    </div>

    <div class="input_box">
        <p>Уже зарегестрированы? <a href="./login.php">Авторизуйтесь</a></p>
    </div>
</form>
<!--<a href="./login.php">Вы уже с нами? Добро пожаловать, военноначальник!</a>-->
</body>
</html>