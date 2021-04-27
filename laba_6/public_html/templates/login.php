<?php
//session_start();

function login_create($error_registration, $some_errors)
{
    $res = '<h1 >Авторизация</h1 >';
    if ($error_registration){
        $res = $res . "<p>Введен неверный логин или пароль</p>";
    } else {
        $res = $res . "<p>роизошла неизвестная ошибка, попробуйте авторизироваться еще раз</p>";
    }

    return $res . '<form action="login.php" method="POST">
            <input name="login" required>
            <input name = "password" required>
            <input type="submit" value="Войти">
            </form>
            <a href = "registration.php" > Еще не зарегестрированы ? Зарегистрируйтесь!</a >';
}