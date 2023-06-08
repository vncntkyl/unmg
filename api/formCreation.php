<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$formController = new Form();
if (isset($_POST['submit'])) {
    $goals = json_decode($_POST['goals']);
    if (isset($_POST['userID'])) {
        $userID = $_POST['userID'];

        if ($formID = $formController->createEvalForm($userID)) {
            $latestFpID = $formController->createEvalFormFp($formID);
            $latestSpID = $formController->createEvalFormSp($formID);

            foreach ($goals as $index => $goal) {
                $pillarObjectives = $goal->objectives;
                $pillarID = $index + 1;
                $pillarPercentage =  $goal->pillar_percentage;

                if ($formPillarID = $formController->createEvalFormPillarsPart($formID, $pillarID, $latestFpID, $pillarPercentage)) {
                    
                    
                    foreach ($pillarObjectives as $objectiveIndex => $objective) {
                        $objective_description = $objective->objective_description;
                        $objectiveKPIs = $objective->kpi;
                        
                        if ($objectiveID = $formController->insertGoals($formPillarID, $latestFpID, $objective_description)) {
                            
                            
                            foreach ($objectiveKPIs as $kpiIndex => $kpi) {
                                $kpi_description = $kpi->kpi_description;
                                $kpi_weight = $kpi->kpi_weight;
                                $target_metrics = $kpi->target_metrics;
                                
                                if ($kpiID = $formController->insertKPI($kpi_description, $objectiveID, $kpi_weight)) {
                                    $formController->insertFqEval($kpiID, $latestSpID);
                                    $formController->insertMyrEval($kpiID, $latestSpID);
                                    $formController->insertTqEval($kpiID, $latestSpID);
                                    $latestYearEndValID = $formController->insertYeEval($kpiID, $latestSpID);
                                    $formController->InsertRatingForYearEndEvaluation($latestYearEndValID);

                                    foreach ($target_metrics as $metricIndex => $metric) {
                                        $metric_point = $metric->point;
                                        $metric_description = $metric->metric_description;
                                        
                                        if($formController->insertTargetMetrics($metric_point, $metric_description, $kpiID)){
                                            echo "YEHEY";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
?>