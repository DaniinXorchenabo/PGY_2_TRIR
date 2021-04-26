<?php

include_once "templates/registration.php";
$error_registration = false;
$some_errors = false;
if (isset($_SESSION['is_login']) && $_SESSION['is_login'] = "yes"){
    header('Location: /personal_page.php ');
}

if(isset($_POST["login"]) && isset($_POST["password"])  && isset($_POST["return_password"])){
    // обработка формы
    if ($_POST["password"] == $_POST["return_password"]){
        $_SESSION['is_login'] = "yes";
        header('Location: /personal_page.php ');
    } else {
        $_SESSION['is_login'] = "no";
        $error_registration = true;
    }
} else {
    if (isset($_POST["login"]) || isset($_POST["password"])  || isset($_POST["return_password"])){
        $some_errors = true;
    }
}

echo login_create($error_registration, $some_errors);

if (isset($_SESSION['last_page']) && $_SESSION['last_page'] == "registration.php"){
    $_SESSION['count_visit'] += 1;
} else {
    $_SESSION['last_page'] = "registration.php";
    $_SESSION['count_visit'] = 1;
}



