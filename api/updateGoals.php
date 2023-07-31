<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/formController.php';
$form = new Form();

if (isset($_POST['goalData'])) {
    $data = json_decode($_POST['goalData']);
    $status  = array();

    foreach ($data as $datum) {
        if ($datum->isFirstObjective) {
            if ($form->updateObjectiveByID($datum->objective_id, $datum->objective)) {
                array_push($status, 1);
            } else {
                array_push($status, 0);
            }
        }
        if ($datum->isFirstKpi) {

            if ($form->updateKPIByID($datum->kpi_id, $datum->kpi_desc, $datum->kpi_weight)) {
                array_push($status, 1);
            } else {
                array_push($status, 0);
            }
        }
        if ($form->updateTargetMetricsByID($datum->target_metrics_id, $datum->target_metrics_desc)) {
            array_push($status, 1);
        } else {
            array_push($status, 0);
        }
    }
    if (in_array(0, $status)) {
        echo 0;
    } else {
        echo 1;
    }
}
?>