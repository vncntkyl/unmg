<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/formController.php';

$fc = new Form();

if(isset($_POST['approve'])){
    return $fc->approveGoal($_POST['approver'],$_POST['id']);
}
