<?php
header("Access-Control-Allow-Origin: *");
require "../config/userController.php";
$user = new User();
if (isset($_POST['username']) && isset($_POST['password'])) {
    session_start();
    $uName = $_POST['username'];
    $pWord = md5($_POST['password']);
    $json_user = $user->loginAccount($uName, $pWord);
    $_SESSION['currentuser'] = $json_user;
    echo json_encode($json_user);
}
?>