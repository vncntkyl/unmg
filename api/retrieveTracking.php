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
            $retrieveAssessment = json_encode($form->selectUserAssessment($table_name_results, $empID, $creation_date), JSON_UNESCAPED_UNICODE);
        }
        else if($quarter == "3")
        {
            $table_name_results = "hr_eval_form_sp_tq";
            $retrieveAssessment = json_encode($form->selectUserAssessment($table_name_results, $empID, $creation_date), JSON_UNESCAPED_UNICODE);
        }
        else if($quarter == "4")
        {
            $table_name_results = "hr_eval_form_sp_yee";
            $retrieveAssessment = json_encode($form->selectUserAssessment($table_name_results, $empID, $creation_date), JSON_UNESCAPED_UNICODE);
        }
        echo $retrieveAssessment;
    }
//check personal achievements
    if (isset($_GET['checkUserAchievements'])) {
        $creation_date = $_GET['workYear'];
        echo json_encode($form->checkUserAchievements($empID, $creation_date));
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