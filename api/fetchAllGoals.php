<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/performanceplanController.php';
$performancePlan = new PerformancePlan();

if (isset($_POST['user_id'])) {
    $data = $performancePlan->checkEvaluationForm($_POST['user_id'], $_POST['work_year']);
    if ($data) {
        echo json_encode($performancePlan->fetchEvaluationForm($_POST['user_id'], $_POST['work_year']));
    }
}
if (isset($_GET['approvals'])) {
    echo json_encode($performancePlan->fetchEvaluationFormApproval($_GET['user_id'], $_GET['work_year']));
}
if (isset($_POST['checkApproval'])) {
    if (!isset($_POST['workYear']) && !isset($_POST['creator']) && !isset($_POST['approver'])) return;

    echo $performancePlan->isGoalApproved($_POST['workYear'], $_POST['creator'], $_POST['approver'])->status;
}
