<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$form = new Form(); 
$empID = $_GET['employeeID'];
if (isset($_GET['trackingMetrics'])) {
    echo json_encode($form->selectUserAssessment($empID));
}
?>