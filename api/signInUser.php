<?php
header("Access-Control-Allow-Origin: *");
session_start();
require "userController.php";
$user = new User();
if (isset($_POST['username']) && isset($_POST['password'])) {
    session_start();
    $json_user = $user->loginAccount($uName, $pWord);
    $uName = $_POST['username'];
    $pWord = md5($_POST['password']);
    $_SESSION['currentuser'] = $json_user;
    echo json_encode($json_user);
}
?>