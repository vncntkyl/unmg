<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$form = new Form(); 
if (isset($_GET['empID'])) {
    $empID = $_GET['empID'];

    if (isset($_GET['userTracking'])) {
        echo json_encode($form->selectUserAssessment($empID));
    }

    if (isset($_GET['userTrackingAchievements'])) {
        echo json_encode($form->selectAchievements($empID));
    }
}
?>