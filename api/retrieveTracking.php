<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$form = new Form(); 
$userID = $_GET['userID'];
if (isset($_GET['userTracking'])) {
    echo json_encode($form->selectUserAssessment($userID));
}
?>