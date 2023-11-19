<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$updateSettings = new Form();

if (isset($_POST['submit'])) {
    $pillar_min = $_POST['pillar_min'];
    $pillar_max = $_POST['pillar_max'];
    $required_min = $_POST['required_min'];
    $required_max = $_POST['required_max'];
    $overall_percentage = $_POST['overall_percentage'];
    $goal_status = $_POST['goal_status'];

    $result = $updateSettings->updateGlobalSettings($pillar_min, $pillar_max, $required_min, $required_max, $overall_percentage, $goal_status);
    if ($result) {
        echo "You have updated the settings successfully!";
    } else {
        echo "error";
    }
}
