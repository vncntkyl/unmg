<?php
header("Access-Control-Allow-Origin: *");
if (isset($_POST['username']) && isset($_POST['password'])) {
    session_start();
    $_SESSION['currentuser'] = array([
        "username" => $_POST['username'],
        "password" => $_POST['password'],
    ]);

    echo json_encode($_SESSION['currentuser']);
}
?>