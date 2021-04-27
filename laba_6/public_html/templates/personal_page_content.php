<?php
//session_start();

function personal_page_create()
{
    $res = '<h1 >Форма заказа одежды</h1 >
            <p>У нас вы можете заказать какую-нибудь вещь</p>';
    return $res . '<form action="registration.php" method="POST"><input name="login" required>
                    <input name="password" required>
                    <input name="return_password" required>
                    <input type="submit" value="Зарегестрироваться">
                    </form>
                    <a href="logout.php">Выйти из аккаунта</a>';
}