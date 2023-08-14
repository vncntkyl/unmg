<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$approval = new Form();
if (isset($_POST['submit'])) {
    if (isset($_POST['employee_id'])) {
        if (isset($_POST['rater_id'])) {
            $approval_type = $_POST['approval_type'];
            $rater_id = $_POST['rater_id'];
            $employee_id = $_POST['employee_id'];
            $first_name = $_POST['first_name'];
            $sp_id = $_POST['sp_id'];


            if ($approval_type == "midyear") {
                $check = $approval->selectRaterPlacementMyr($rater_id, $employee_id);
                $rater = $check->evaluator;
                if ($rater === 'myr_rater_1') {
                    $result = $approval->midyearApproveAssessment($rater, $rater_id, $sp_id);
                } 
                elseif ($rater === 'myr_rater_2') {
                    $result = $approval->midyearApproveAssessment($rater, $rater_id, $sp_id);
                } 
                elseif ($rater === 'myr_rater_3') {
                    $result = $approval->midyearApproveAssessment($rater, $rater_id, $sp_id);
                } 
                else {
                    echo "error";
                }
                if ($result) {
                    echo "The Mid Year assessment of ".$first_name." has been approved successfully!";
                }
                else{
                    echo "error";
                }
            } 
            else if ($approval_type == "yearend") {
                $check = $approval->selectRaterPlacementYee($rater_id, $employee_id);
                $form_id = $check->form_id;
                $rater = $check->evaluator;
                if ($rater === 'yee_rater_1') {
                    $result = $approval->yearendApproveAssessment($rater, $rater_id, $form_id);
                } 
                elseif ($rater === 'yee_rater_2') {
                    $result = $approval->yearendApproveAssessment($rater, $rater_id, $form_id);
                } 
                elseif ($rater === 'yee_rater_3') {
                    $result = $approval->yearendApproveAssessment($rater, $rater_id, $form_id);
                } 
                else {
                    echo "error";
                }
                if ($result) {
                    echo "The Year End assessment of ".$first_name." has been approved successfully!";
                }
                else{
                    echo "error";
                }
            } 
            else {
                echo "error";
            }
        }
    }
}
