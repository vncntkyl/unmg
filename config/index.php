<?php
require "user.php";
$user = new User();
if (isset($_GET['username']) && isset($_GET['password'])) 
{
    $uName = $_GET['username'];
    $pWord = md5($_GET['password']);
    var_dump($user->loginAccount($uName, $pWord));

}
?>