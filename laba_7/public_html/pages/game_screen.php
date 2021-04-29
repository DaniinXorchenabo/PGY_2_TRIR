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
</head>
<body>
<h1>Играаааааааааааааааааааааа</h1>
<a href="../processing/logout.php">Выйти из аккаунта </a>
</body>
</html>