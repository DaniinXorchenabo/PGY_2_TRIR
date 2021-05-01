<?php
//session_start();

function registration_create($login_exists, $some_errors, $different_passwords)
{
    $res = '<h1 >Регистрация</h1 >';
    if ($login_exists) {
        $res = $res . '<p>Человек с таким именем уже существует, введите другое</p>';
    } elseif ($some_errors){
        $res = $res . '<p>Возникла непредвиденная ошибка при регистрации... попробуйте еще раз</p>';
    }

    if ($different_passwords){
        $res = $res . '<p>Пароли должны совпадать! Но они не совпадают...</p>';
    }

    return $res . '<form action="registration.php" method="POST">
                    <input name="login" required  placeholder="Введите ваш логин">
                    <input name="password" required  placeholder="Введите ваш пароль">
                    <input name="return_password" required  placeholder="Введите ваш пароль еще раз">
                    <input type="submit" value="Зарегестрироваться">
                    </form>
                    <a href="login.php">Уже зарегестрированы? Авторизуйтесь!</a>';
}