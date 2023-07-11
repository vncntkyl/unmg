<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/formController.php';
$formController = new Form();
if (isset($_GET['employee_goals'])) {
    if (isset($_GET['count'])) {
        echo json_encode($formController->getEmployeeGoalsData());
    } else {
        if (isset($_GET['evaluator'])) {
            // echo $_GET['evaluator'];
            echo json_encode($formController->getEvaluatorEmployeeGoals($_GET['evaluator']));
        } else {
            echo json_encode($formController->getEmployeeGoals());
        }
    }
}
?>