<?php
// аккаунт, личный кабинет

include "templates/personal_page_content.php";
session_start();
if (isset($_SESSION['is_login']) && $_SESSION['is_login'] == "yes"){
//    echo personal_page_create();
    header('Location: /index.php');
} else {
    header('Location: /registration.php');
}
