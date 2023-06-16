<?php
header("Access-Control-Allow-Origin: *");
require "../config/userController.php";
$user = new User();
if (isset($_POST['username']) && isset($_POST['password'])) {
    session_start();
    $username = $_POST['username'];
    $password = md5($_POST['password']);
    $result = $user->loginAccount($username, $password);
    if(gettype($result) == 'object'){
        echo json_encode($result);
    }else{
        echo $result;
    }
}
?>