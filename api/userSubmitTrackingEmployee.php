<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$submitGrade = new Form();

if (isset($_POST['submit'])) {
    if (isset($_POST['tbl_name']) && isset($_POST['formspID'])) {
        $tbl_name = $_POST['tbl_name'];
        $formspID = $_POST['formspID'];
        $grade_id = json_decode($_POST['grade_id']);
        $metric = json_decode($_POST['metric']);
        $remarks = json_decode($_POST['remarks']);

        foreach ($grade_id as $index => $id) {
            $currentMetric = $metric[$index];
            //ERROR MO WALA LAMAN REMARKS, KAYA NAG NULLPOINTEREXCEPTION
            try{
                $currentRemarks =  $remarks[$index];
            }catch(Exception $e){
                $currentRemarks = "";
            }
            $result = $submitGrade->updateUserAssessment($tbl_name, $formspID, $currentMetric, $currentRemarks, $id);
        }
        if ($result) {
            echo "You have graded this employee successfully!";
        } else {
            echo "error";
        }
    }
}
