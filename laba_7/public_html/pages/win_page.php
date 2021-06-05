<?php
session_start();
if (!(isset($_SESSION['is_login']) && $_SESSION['is_login'] == "yes")) {
    header('Location: /pages/registration.php');
//$new_location = "/pages/game_screen.php";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
<!--    <script defer src="../jquery/jQuery_v3.6.0.js"></script>-->
<!--    <script defer src="../scripts/scripts.js"></script>-->
    <link rel="stylesheet" href="../stiles/stiles.css">
    <link rel="stylesheet" href="../stiles/background_stiles.css">
</head>
<body>
<img class="background_solder1" src="../images/background_solder1.svg">
<img class="background_grass" src="../images/background_grass.svg">
<img class="background_hill" src="../images/background_hill.svg">
<img class="background_ellipse" src="../images/background_ellipse.svg">
<img class="background_plane" src="../images/background_plane.svg">

<h2>Ваши бойцы успешно овладели уровнем построения: <?
        $res = 0;
        if (isset($_SESSION['current_result'])){
            $res = $_SESSION['current_result'];
        }
        echo $res;
        ?></h2>
<h1>Что что?! Ваши солдаты научились строиться!?</h1>
<h2>Ну хорошо, хорошо, вот задачка тебе посложнее!</h2>
<button><a href="../processing/logout.php">Хватит с меня этих салаг! Я на пенсию!</a></button>
<button><a href="../pages/game_screen.php">Если не я, то кто же еще!?</a></button>
</body>

</html>

