<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$form = new Form(); 
if (isset($_GET['empID'])) {
    $empID = $_GET['empID'];

    if (isset($_GET['userTracking'])) {
        $quarter = $_GET['quarter'];
        if($quarter == "0" || $quarter == "1")
        {
            $table_name_results = "hr_eval_form_sp_fq";
            $table_name_rating = "hr_eval_form_sp_fq_rating";
            $retrieveAssessment = json_encode($form->selectUserAssessment($table_name_results, $table_name_rating, $empID), JSON_UNESCAPED_UNICODE);
        }
        else if($quarter == "2")
        {
            $table_name_results = "hr_eval_form_sp_myr";
            $table_name_rating = "hr_eval_form_sp_myr_rating";
            $retrieveAssessment = json_encode($form->selectUserAssessment($table_name_results, $table_name_rating, $empID), JSON_UNESCAPED_UNICODE);
        }
        else if($quarter == "3")
        {
            $table_name_results = "hr_eval_form_sp_tq";
            $table_name_rating = "hr_eval_form_sp_tq_rating";
            $retrieveAssessment = json_encode($form->selectUserAssessment($table_name_results, $table_name_rating, $empID), JSON_UNESCAPED_UNICODE);
        }
        else if($quarter == "4")
        {
            $table_name_results = "hr_eval_form_sp_yee";
            $table_name_rating = "hr_eval_form_sp_yee_rating";
            $retrieveAssessment = json_encode($form->selectUserAssessment($table_name_results, $table_name_rating, $empID), JSON_UNESCAPED_UNICODE);
        }
        echo $retrieveAssessment;
    }
//check personal achievements
    if (isset($_GET['checkUserAchievements'])) {
        echo json_encode($form->checkUserAchievements($empID));
    }
//get total results quarterly and per pillar
if(isset($_GET['totalTracking']))
{
    echo json_encode($form->totalUserAssessment($empID));
}


    if (isset($_GET['userTrackingAchievements'])) {
        echo json_encode($form->selectAchievements($empID));
    }

    if (isset($_GET['userGrading'])) {
        $quarter = $_GET['quarter'];
        if($quarter == "0" || $quarter == "1")
        {
            $table_name_results = "hr_eval_form_sp_fq";
            $table_name_rating = "hr_eval_form_sp_fq_rating";
            $retrieveGrading = json_encode($form->selectTrackingGrading($table_name_results, $table_name_rating, $empID), JSON_UNESCAPED_UNICODE);
        }
        else if($quarter == "2")
        {
            $table_name_results = "hr_eval_form_sp_myr";
            $table_name_rating = "hr_eval_form_sp_myr_rating";
            $retrieveGrading = json_encode($form->selectTrackingGrading($table_name_results, $table_name_rating, $empID), JSON_UNESCAPED_UNICODE);
        }
        else if($quarter == "3")
        {
            $table_name_results = "hr_eval_form_sp_tq";
            $table_name_rating = "hr_eval_form_sp_tq_rating";
            $retrieveGrading = json_encode($form->selectTrackingGrading($table_name_results, $table_name_rating, $empID), JSON_UNESCAPED_UNICODE);
        }
        else if($quarter == "4")
        {
            $table_name_results = "hr_eval_form_sp_yee";
            $table_name_rating = "hr_eval_form_sp_yee_rating";
            $retrieveGrading = json_encode($form->selectTrackingGrading($table_name_results, $table_name_rating, $empID), JSON_UNESCAPED_UNICODE);
        }
        echo $retrieveGrading;
    }
    if (isset($_GET['metrics']))
    {
        echo json_encode($form->selectTrackingGradingMetrics($empID));
    }
}
?>