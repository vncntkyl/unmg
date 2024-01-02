<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/formController.php';
$form = new Form();
if (isset($_GET['verifyIfEvaluator'])) {
    $employee_id = $_GET['employee_id'];
    echo json_encode($form->verifyIfEvaluator($employee_id));
}
