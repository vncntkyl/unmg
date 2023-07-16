<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/formController.php';
$formController = new Form();
$goal = array();

if (isset($_POST['user_id'])) {
    $data = $formController->checkEvaluationForm($_POST['user_id']);
    if ($data) {
        foreach ($formController->fetchPillars($data) as $idx => $pillar) {
            $pillar_data = $formController->retrievePillars();
            $goal[$idx] = array([
                'pillar_name' => $pillar_data[$idx]->pillar_name,
                'pillar_percentage' => $pillar->pillar_percentage,
            ]);

            $hr_pillar_id = $pillar->hr_eval_form_pillar_id;
            foreach ($formController->fetchObjectives($hr_pillar_id) as $index => $objective) {
                $goal[$idx][$index]['objectives'] = array([
                    'objectives_description' => $objective->objective,
                    'kpi' => array()
                ]);

                foreach ($formController->fetchKPIs($objective->objective_id) as $kpiIndex => $kpi) {
                    array_push($goal[$idx][$index]['objectives'][0]['kpi'], array([
                        'kpi_description' => $kpi->kpi_desc,
                        'kpi_weight' => $kpi->kpi_weight,
                        'target_metrics' => array()
                    ]));

                    foreach ($formController->fetchTargetMetrics($kpi->kpi_id) as $metric_idx => $metric) {
                        array_push($goal[$idx][$index]['objectives'][0]['kpi'][$kpiIndex][0]['target_metrics'], array([
                            'target_metrics_score' => $metric->target_metrics_score,
                            'target_metrics_desc' => $metric->target_metrics_desc
                        ]));
                    }
                }
            }
        }
    }
    echo json_encode($goal);
} else {
    echo "id not found";
}
?>