<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$form = new Form(); 
$empID = $_GET['empID'];
if (isset($_GET['userTracking'])) {
    echo json_encode($form->selectUserAssessment($empID));
}
?>