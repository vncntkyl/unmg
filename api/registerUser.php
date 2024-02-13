<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
session_start();
require "../config/userController.php";
require "../config/logController.php";
$user = new User();
$log = new Log();
$salutations = ["Mr.", "Miss"];

if (isset($_POST['userdata'])) {
    $u = $_POST['userdata'];
    $contributor = $_POST['contributor'] ? $_POST['contributor'] : 0;
    if ($user->insertAcc(json_decode($u))) {
        
    }
    //echo $user->insertAcc(json_decode($u));

}
