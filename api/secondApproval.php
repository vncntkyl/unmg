<?php
header("Access-Control-Allow-Origin: *");
require_once 'formController.php';
require_once 'userController.php';
$formController = new formController();
$userController= new userController();
$uID = $_POST['userID'];
$formID = $_POST['formID'];
$second_approver = $userController->retrieveSpecificUser($uID);
$approved_by = array();
    foreach($second_approver as $su){
        $name = $su->last_name . ", ". $su->first_name . " " . substr($su->middle_name,0,1) . ".";
        array_push($formatted, $name);
    }
$formController->FirstApproveEvaluationForm($formID,$approved_by)
?>
