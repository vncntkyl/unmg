<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$submitGrade = new Form();

if (isset($_POST['submit'])) {
    if (isset($_POST['tbl_name']) && isset($_POST['formspID'])) {
        $quarter = $_POST['quarter'];
        if($quarter == 2)
        {
            $tbl_name = $_POST['tbl_name'];
            $formspID = $_POST['formspID'];
            $kpi_id = json_decode($_POST['kpi_id']);
            $total_results = json_decode($_POST['total_results']);
            $total_status = json_decode($_POST['total_stat']);
            $total_remarks = json_decode($_POST['total_remarks']);
            $count = count($kpi_id);
            for ($i = 0; $i < $count; $i++) {
                $currentKpiId = $kpi_id[$i];
                $currenttotal_results = $total_results[$i];
                $currenttotal_status = $total_status[$i];
                $currenttotal_remarks = $total_remarks[$i];
                $result = $submitGrade->updateUserMidYearAssessment($tbl_name, $formspID, $currentKpiId, $currenttotal_results, $currenttotal_status, $currenttotal_remarks);
            }
            if ($result) {
                echo "You have graded this employee successfully!";
            } else {
                echo "error";
            }
        }
        else if($quarter == 4)
        {
            $tbl_name = $_POST['tbl_name'];
            $formspID = $_POST['formspID'];
            $kpi_id = json_decode($_POST['kpi_id']);
            $kpi_weight = json_decode($_POST['kpi_weight']);
            $total_results = json_decode($_POST['total_results']);
            $agreed_rating = json_decode($_POST['agreed_rating']);
            $total_remarks = json_decode($_POST['total_remarks']);
            foreach ($kpi_weight as $index => $weight) {
                $currentWeight[] = ($weight / 100) * $agreed_rating[$index];
            }

            $count = count($kpi_id);
            for ($i = 0; $i < $count; $i++) {
                $currentKpiId = $kpi_id[$i];
                $currenttotal_results = $total_results[$i];
                $currenttotal_rating = $agreed_rating[$i];
                $currenttotal_weight = $currentWeight[$i];
                $currenttotal_remarks = $total_remarks[$i];
                $result = $submitGrade->updateUserYearEndAssessment($tbl_name, $formspID, $currentKpiId, $currenttotal_results, $currenttotal_rating, $currenttotal_weight, $currenttotal_remarks);
            }
            if ($result) {
                echo "You have graded this employee successfully!";
            } else {
                echo "error";
            }
        }
        else
        {
            $tbl_name = $_POST['tbl_name'];
            $formspID = $_POST['formspID'];
            $kpi_id = json_decode($_POST['kpi_id']);
            $total_results = json_decode($_POST['total_results']);
            $total_remarks = json_decode($_POST['total_remarks']);
            $count = count($kpi_id);
            for ($i = 0; $i < $count; $i++) {
                $currentKpiId = $kpi_id[$i];
                $currenttotal_results = $total_results[$i];
                $currenttotal_remarks = $total_remarks[$i];
                $result = $submitGrade->updateUserAssessment($tbl_name, $formspID, $currentKpiId, $currenttotal_results, $currenttotal_remarks);
            }
            if ($result) {
                echo "You have graded this employee successfully!";
            } else {
                echo "error";
            }

        }
    }
}
