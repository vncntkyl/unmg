<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/formController.php';
$form = new Form();
if (isset($_GET['convo_type']) && isset($_GET['user_id'])) {
    $convo_type = $_GET['convo_type'];
    $user_id = $_GET['user_id'];
        echo json_encode($form->selectPlanningConversations($user_id, $convo_type));
}
