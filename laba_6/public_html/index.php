<?php
session_start();
if (!(isset($_SESSION['is_login']) && $_SESSION['is_login'] == "yes")){
    header('Location: /registration.php');
}

?>

<!-- Дьячков Даниил Александрович, 6 вариант, 6 лаба -->

<!DOCTYPE html>
<html>

<head>
    <title>title</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script defer src="jquery/jQuery_v3.6.0.js"></script>
    <script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script defer src="scripts/scripts.js"></script>
    <link rel="stylesheet" href="stiles/sriles.css">

</head>
<body>

<h1>Форма заказа одежды на сайте</h1>


<form>
    <div class="input_box">
        <text>Форма заказа одежды. Форма. Формка. Формочка.</text>
        <text>Что за дивные вещи тут можно заказать!</text>
        <text>Пчти все, что угодно, и даже больше!</text>
        <text>И шляпы! И не шляпы! богатый выбор!</text>
        <text>ОООООчень богатый, если учесть</text>
        <text>что деньги за посещения этой страницы </text>
        <text>(576 рублей за одну перезагрузку) вам никто не вернёт!</text>
    </div>
    <div class="input_box">
        <p>Вы вошли как <?php echo $_SESSION['user_login']; ?></p>
        <a href="logout.php">Выйти из аккаунта </a>
    </div>
    <div class="input_box">
        <p>Введите своё имя</p>
        <input name="name" id="name" placeholder="Имя">
        <div id="name_error"></div>
    </div>
    <div class="input_box">
        <p>Введите свою фамилию</p>
        <input name="surname" id="surname" placeholder="Фамилия">
        <div id="surname_error"></div>
    </div>
    <div class="input_box">
        <p>Введите свою электронную почту</p>
        <input name="email" id="email" placeholder="E-mail">
        <div id="email_error"></div>
    </div>
    <div class="input_box">
        <p>Выберите тип одежды:</p>
        <select name="type_dress" id="type_dress" placeholder="Тип одежды">
            <option value="Шляпа">Шляпа</option>
            <option value="Штаны">Штаны</option>
            <option value="Футболка">Футболка</option>
            <option value="Кофта">Кофта</option>
        </select>
        <div id="type_dress_error"></div>
    </div>
    <div class="input_box">
        <p>Выберите цвет одежды (основной):</p>
        <input type="color" name="color" id="color" placeholder="Основной цвет">
        <div id="color_error"></div>
    </div>
    <div class="input_box">
        <p>Выберите второй цвет одежды (Дополнительный):</p>
        <input type="color" name="color2" id="color2" placeholder="Дополнительный цвет">
        <div id="color2_error"></div>
    </div>

    <div class="input_box">
        <input type="submit" value="Заказать" id="submit"/>
    </div>
</form>
<!--<div id="messages">-->
<!--    тут пусто(-->
<!--</div>-->
</body>
</html>
