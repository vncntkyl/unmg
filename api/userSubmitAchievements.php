<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$submitAchievements = new Form();

if (isset($_POST['submit'])) {
    if (isset($_POST['tbl_name']) && isset($_POST['formspID'])) {
        $tbl_name = $_POST['tbl_name'];
        $formspID = $_POST['formspID'];
        $kpi_id = json_decode($_POST['kpi_id']);
        $achievement = json_decode($_POST['achievement']);

        $count = count($kpi_id);
        for ($i = 0; $i < $count; $i++) {
            $currentKpiId = $kpi_id[$i];
            $currentAchievement = $achievement[$i];
            $result = $submitAchievements->updateUserAchievements($tbl_name, $formspID, $currentKpiId, $currentAchievement);
        }
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
