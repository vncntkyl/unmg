<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$form = new Form(); 
if (isset($_GET['empID'])) {
    $empID = $_GET['empID'];
    $creation_date = $_GET['workYear'];

    if (isset($_GET['userTracking'])) {
        $quarter = $_GET['quarter'];
        if($quarter == "0" || $quarter == "1")
        {
            $table_name_results = "hr_eval_form_sp_fq";
            $retrieveAssessment = json_encode($form->selectUserAssessment($table_name_results, $empID, $creation_date), JSON_UNESCAPED_UNICODE);
        }
        else if($quarter == "2")
        {
            $table_name_results = "hr_eval_form_sp_myr";
            $retrieveAssessment = json_encode($form->selectUserMyrAssessment($table_name_results, $empID, $creation_date), JSON_UNESCAPED_UNICODE);
        }
        else if($quarter == "3")
        {
            $table_name_results = "hr_eval_form_sp_tq";
            $retrieveAssessment = json_encode($form->selectUserAssessment($table_name_results, $empID, $creation_date), JSON_UNESCAPED_UNICODE);
        }
        else if($quarter == "4")
        {
            $table_name_results = "hr_eval_form_sp_yee";
            $retrieveAssessment = json_encode($form->selectUserYeeAssessment($table_name_results, $empID, $creation_date), JSON_UNESCAPED_UNICODE);
        }
        echo $retrieveAssessment;
    }
//check personal achievements
    if (isset($_GET['checkUserAchievements'])) {
        echo json_encode($form->checkUserAchievements($empID, $creation_date));
    }
//get total results quarterly and per pillar
if(isset($_GET['totalTracking']))
{
    echo json_encode($form->totalUserAssessment($empID));
}

//employee tracking & assessment
    if (isset($_GET['userTrackingIndividualEmployeeAchievements'])) {
        echo json_encode($form->selectIndividualEmployeeAssessmentAchievements($empID, $creation_date));
    }

    if (isset($_GET['userTrackingIndividualEmployeeGrades'])) {
        echo json_encode($form->selectIndividualEmployeeAssessmentGrades($empID, $creation_date));
    }

    if (isset($_GET['metrics']))
    {
        echo json_encode($form->selectTrackingGradingMetrics($empID, $creation_date));
    }
}
?>