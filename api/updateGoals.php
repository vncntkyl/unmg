<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/formController.php';
$form = new Form();

if (isset($_POST['goalData'])) {
    $data = json_decode($_POST['goalData']);

    foreach ($data as $datum) {
        if ($datum->isFirstObjective) {
            // echo "OBJECTIVE ";
            // echo $datum->pillar_id . "\n";
            // run insert objectives

            if ($form->updateObjectiveByID($datum->objective_id, $datum->objective)) {
                echo "YAY \n";
            }
        }
        if ($datum->isFirstKpi) {
            // echo "KPI ";
            // echo $datum->kpi_id . "\n";
            if ($form->updateKPIByID($datum->kpi_id, $datum->kpi_desc, $datum->kpi_weight)) {
                echo "YAY \n";
            }
        }
        if ($form->updateTargetMetricsByID($datum->target_metrics_id, $datum->target_metrics_desc)) {
            echo "YAY \n";
        }
    }
}
?>