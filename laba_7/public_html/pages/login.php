<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script defer src="../jquery/jQuery_v3.6.0.js"></script>
    <script defer src="../scripts/scripts.js"></script>
</head>
<body>
<h1>Авторизация</h1>
<form action="../processing/login.php" method="POST">

    <div class="input_box">
        <p>Введите свой логин</p>
        <input name="login" required id="login" placeholder="Логин">
        <div id="login_error"></div>
    </div>

    <div class="input_box">
        <p>Введите свой пароль</p>
        <input name="password" required id="password" placeholder="Пароль">
        <div id="password_error"></div>
    </div>

    <div class="input_box">
        <input type="submit" value="Войти" id="check_login">
    </div>

</form>
<a href="registration.php"> Еще не зарегестрированы ? Зарегистрируйтесь!</a>
</body>
</html>