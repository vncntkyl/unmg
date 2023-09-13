<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/formController.php';
$form = new Form();

if (isset($_GET['compute_goals'])) {
    $creation_date = $_GET['workYear'];
    echo json_encode($form->adminFetchGoals($creation_date));
}

if (isset($_GET['compute_evaluations'])) {
    $creation_date = $_GET['workYear'];
    echo json_encode($form->adminFetchEvaluations($creation_date));
}

if (isset($_GET['compute_ranking'])) {
    $creation_date = $_GET['workYear'];
    echo json_encode($form->adminFetchRankings($creation_date));
}
