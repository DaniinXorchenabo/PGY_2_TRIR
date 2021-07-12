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

<h1>Авторизация</h1>

<form action="../processing/login.php" method="POST">
    <div class="input_box">
        <p>Введите свой логин</p>
        <input name="login" required id="login" placeholder="ваш логин" autocomplete="off">
        <div id="login_error"></div>
    </div>

    <div class="input_box">
        <p>Введите пароль</p>
        <input name="password" required id="password" placeholder="Пароль" type="password" autocomplete="off">
        <div id="password_error"></div>
    </div>

    <div class="input_box">
        <input type="submit" value="Войти" id="check_login">

    </div>
    <div class="input_box">
        <p>Еще не зарегестрированы? <a href="./login.php">Зарегестрируйтесь!</a></p>
    </div>

</form>
</body>
</html>