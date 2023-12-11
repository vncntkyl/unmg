<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/formController.php';
$form = new Form();
if (isset($_GET['settings']) && isset($_GET['convo_id'])) {
    if (isset($_GET['employee_id']) && isset($_GET['convo_id'])) {
        $employee_id = $_GET['employee_id'];
        $convo_id = $_GET['convo_id'];
        echo json_encode($form->selectConvoSettings($employee_id, $convo_id));
    } else {
        echo "error";
    }
} else if (isset($_GET['convo']) && isset($_GET['convo_id'])) {
    if (isset($_GET['convo_id'])) {
        $convo_id = $_GET['convo_id'];
        echo json_encode($form->selectConvo($convo_id));
    }
    else {
        echo "error";
    }
}
