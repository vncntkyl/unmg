<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/formController.php';
$formController = new Form();
if (isset($_GET['employee_goals'])) {
    echo json_encode($formController->getEmployeeGoals());
}
?>