<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$form = new Form();
$empID = $_GET['empID']['emp_id'];
$userStatus = $_GET['employeeType'];
if (isset($_GET['employeeType'])) {
    if ($userStatus === "0") {
        echo json_encode($form->selectEmployeeAssessment($empID, $userStatus));
    }
    else {
        echo json_encode($form->selectEmployeeAssessment($empID, $userStatus));
    }
}
?>