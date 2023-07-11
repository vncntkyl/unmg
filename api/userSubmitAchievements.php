<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$submitAchievements = new Form();

if (isset($_POST['submit'])) {
    if (isset($_POST['tbl_name']) && isset($_POST['formspID'])) {
        $tbl_name = $_POST['tbl_name'];
        $formspID = $_POST['formspID'];
        $achievements = $_POST['achievements'];
    $result = $submitAchievements->insertUserAssessment($tbl_name, $formspID, $achievements);
    if($result)
    {
        echo "You have submitted your achievements successfully!";
    }
    else
    {
        echo "error";
    }
    }
}
