<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$form = new Form();
if (isset($_GET['employeeType'])) {
    $empID = $_GET['empID']['emp_id'];

    if ($_GET['employeeType'] === "0") {
        $userStatus = 0;
        $json_employee = json_encode($form->selectEmployeeAssessment($empID, $userStatus), JSON_UNESCAPED_UNICODE);
        echo $json_employee;

    }
    if ($_GET['employeeType'] === "1") {
        $userStatus = 1;
        $json_employee = json_encode($form->selectEmployeeAssessment($empID, $userStatus), JSON_UNESCAPED_UNICODE);
        echo $json_employee;
    }

}
?>