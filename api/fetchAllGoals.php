<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/formController.php';
$formController = new Form();

if (isset($_POST['user_id'])) {
    $data = $formController->checkEvaluationForm($_POST['user_id']);
    if ($data) {
        echo json_encode($formController->fetchEvaluationForm($_POST['user_id']));
    }
} else {
    echo "id not found";
}
