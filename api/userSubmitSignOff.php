<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$approval = new Form();
if (isset($_POST['submit'])) {
    if (isset($_POST['rater'])) {
        $eval_id = $_POST['eval_id'];
        // $employee_id = $_POST['employee_id'];
        $rater_id = $_POST['rater_id'];
        $evaluator_tier = $_POST['evaluator_tier'];
        $full_name = $_POST['full_name'];
        $recommendation = $_POST['recommendation'];
        if ($evaluator_tier === 'rater_1') {
            $recommendation_id = "recommendation_1";
        } elseif ($evaluator_tier === 'rater_2') {
            $recommendation_id = "recommendation_2";
        } elseif ($evaluator_tier === 'rater_3') {
            $recommendation_id = "recommendation_3";
        }
        $result = $approval->finalApproveAssessmentRater($eval_id, $rater_id, $evaluator_tier, $recommendation, $recommendation_id);
        if ($result) {
            echo "The Assessment of " . $full_name . " has been signed successfully!";
        } else {
            echo "error";
        }
    } elseif (isset($_POST['ratee'])) {
        $eval_id = $_POST['eval_id'];
        $employee_id = $_POST['employee_id'];
        $comments = $_POST['comments'];
        $result = $approval->finalApproveAssessmentRatee($eval_id, $employee_id, $comments);
        if ($result) {
            echo "Your assessment has been signed successfully!";
        } else {
            echo "error";
        }
    } else {
        echo "error";
    }
}
