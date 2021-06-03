<?php
session_start();
if (!(isset($_SESSION['is_login']) && $_SESSION['is_login'] == "yes")) {
    header('Location: /pages/registration.php');
}
//$new_location = "/pages/game_screen.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script defer src="../jquery/jQuery_v3.6.0.js"></script>
    <script defer src="../scripts/scripts.js"></script>

    <script defer src="../scripts/create_border.js"></script>
    <script defer src="../scripts/mouse_processing.js"></script>
    <script defer src="../scripts/checked.js"></script>
    <link rel="stylesheet" href="../stiles/stiles.css">
</head>
<body>
<h1>Играаааааааааааааааааааааа</h1>
<svg id="game_screen">
    <defs>
        <circle id="base_circle" cx="0" cy="0" r="50" color="#000000" fill="FF0000"/>
    </defs>
    <defs>
        <rect id="base_rect" x="0" y="0" width="100" height="100" stroke="#000" fill="#fff"/>
    </defs>
<!--    <use id="cell_0_0" xlink:href="#base_rect" x="0" y="0"></use>-->
</svg>
<button type="submit">Проверить</button>
<a href="../processing/logout.php">Выйти из аккаунта </a>
</body>
</html>