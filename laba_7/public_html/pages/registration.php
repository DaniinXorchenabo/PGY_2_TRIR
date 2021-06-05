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

<h1>Запись в военные диктаторы</h1>
<form action="../processing/registration.php" method="POST">

    <div class="input_box">
        <p>Придумайте и введите свой свое имя, под которым вас запомнят милионы!</p>
        <input name="login" required id="login" placeholder="К примеру, 'Ленин'">
        <div id="login_error"></div>
    </div>

    <div class="input_box">
        <p>Придумайте и введите свой секретный ключ, который поможет закрыть казарму с солдатами</p>
        <input name="password" required id="password" placeholder="ваш придуманный ключ, только не admin/admin пожалуйста" type="password">
        <div id="password_error"></div>
    </div>

    <div class="input_box">
        <p>Введите свой секретный ключ еще раз, это очень важно, иначе вы не сможете тренеровать солдат1</p>
        <input name="return_password" required id="return_password" placeholder="Повторение ключа (ЭТО ВАЖНО)" type="password">
        <div id="return_password_error"></div>
    </div>

    <div class="input_box">
        <input type="submit" value="Начать подготовку к захвату мира!" id="check_registration">
    </div>

</form>
<a href="./login.php">Вы уже с нами? Добро пожаловать, военноначальник!</a>
</body>
</html>