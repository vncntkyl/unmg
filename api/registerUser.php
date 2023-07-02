<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
session_start();
require "../config/userController.php";
$user = new User();
$salutations = ["Mr.", "Miss", "Mrs."];

if (isset($_POST['userdata'])) {
    $u = $_POST['userdata'];
    // var_dump(json_decode($u));
    echo $user->insertAcc(json_decode($u));

}
