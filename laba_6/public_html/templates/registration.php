<?php
//session_start();

function registration_create($login_exists, $some_errors)
{
    $res = '<h1 >Регистрация</h1 >';
    if ($login_exists) {
        $res = $res . '<p>Человек с таким именем уже существует, введите другое</p>';
    } elseif ($some_errors){
        $res = $res . '<p>Возникла непредвиденная ошибка при регистрации... попробуйте еще раз</p>';
    }
    return $res . '<form action="registration.php" method="POST"><input name="login" required>
                    <input name="password" required>
                    <input name="return_password" required>
                    <input type="submit" value="Зарегестрироваться">
                    </form>
                    <a href="login.php">Уже зарегестрированы? Авторизуйтесь!</a>';
}