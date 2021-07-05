<?php
include_once "../data/save_users7.php";
session_start();

if (!(isset($_SESSION['is_login']) && $_SESSION['is_login'] == "yes")) {
    header('Location: /pages/registration.php');
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
    <script defer src="../scripts/figures_controller.js"></script>
    <link rel="stylesheet" href="../stiles/stiles.css">
    <link rel="stylesheet" href="../stiles/svg_stiles.css">

</head>
<body>

<h1>Игра</h1>
<form  action="../processing/get_group.php" method="POST" >
    <p>Загрузить группу с назнанием: <input name="get_group_name" id="get_group_name"></p>
    <div id="get_group_name_error"></div>
    <input type="submit" value="Загрузить" id="get_group">
</form>
<svg class="main_svg" id="main_svg">
    <defs>
        <circle r="65" cx="70" cy="70" id="circle1" fill="orangered" stroke="crimson" stroke-width="5"
                data-darkreader-inline-fill="" data-darkreader-inline-stroke=""
                style="--darkreader-inline-fill:#ab4f2d; --darkreader-inline-stroke:#bf4e65;"></circle>
        <rect x="5" y="5" width="220" height="130" id="rect1" fill="skyblue" stroke="steelblue" stroke-width="5"
              data-darkreader-inline-fill="" data-darkreader-inline-stroke=""
              style="--darkreader-inline-fill:#386374; --darkreader-inline-stroke:#7190a8;"></rect>

        <polygon points="5,135 115,5 225,135" id="triangle" fill="violet" stroke="purple" stroke-width="5"
                 data-darkreader-inline-fill="" data-darkreader-inline-stroke=""
                 style="--darkreader-inline-fill:#773777; --darkreader-inline-stroke:#ca73ca;"></polygon>
        <polygon id="star" points="70,5 90,41 136,48 103,80 111,126 70,105 29,126 36,80 5,48 48,41" fill="turquoise"
                 stroke="lightseagreen" stroke-width="5" data-darkreader-inline-fill="" data-darkreader-inline-stroke=""
                 style="--darkreader-inline-fill:#3d8e89; --darkreader-inline-stroke:#62b8b3;"></polygon>
        <ellipse rx="110" ry="60" cx="115" cy="70" id="ellipse" fill="gold" stroke="orange" stroke-width="5"
                 data-darkreader-inline-fill="" data-darkreader-inline-stroke=""
                 style="--darkreader-inline-fill:#ab972d; --darkreader-inline-stroke:#ca983d;"></ellipse>
    </defs>
    <use id="circle_0" xlink:href="#circle1" x="0" y="0"></use>
    <use id="circle_1" xlink:href="#rect1" x="150" y="0"></use>
    <use id="circle_2" xlink:href="#triangle" x="0" y="140"></use>

    <use id="circle_3" xlink:href="#star" x="200" y="150"></use>
    <use id="circle_4" xlink:href="#ellipse" x="400" y="0"></use>
</svg>
<form action="../processing/save_group.php" method="POST" >
    <textarea id="figures_list_into_the_group" disabled></textarea>

    <textarea disabled id="group_data" name="group_data" style="display: none"></textarea>
    <div id="group_data_error"></div>
    <p>Введите название создаваемой группы</p>
    <input  name="group_name" id="group_name">
    <div id="group_name_error"></div>
    <input type="submit" value="Сохранить группу" id="save_group">
</form>
</body>
</html>
