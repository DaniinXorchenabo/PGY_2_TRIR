<?php
echo "персональный кабинет";

if (!(isset($_SESSION['is_login']) && $_SESSION['is_login'] = "yes")){
    header('Location: /registration.php ');
}
