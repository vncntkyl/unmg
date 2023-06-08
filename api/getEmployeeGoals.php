<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$formController = new Form();
if (isset($_GET['employee_goals'])) {
    echo json_encode($formController->getEmployeeGoals());
}
?>