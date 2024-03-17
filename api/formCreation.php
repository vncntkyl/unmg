<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/formController.php';
require_once '../config/logController.php';
require_once '../config/notificationController.php';
$formController = new Form();
$logs = new Log();
$notif = new Notification();

if (isset($_POST['submit'])) {
    $status  = array();
    $notification = array();
    $goals = json_decode($_POST['goals']);
    if (isset($_POST['userID'])) {
        $userID = $_POST['userID'];
        $employee_id = $_POST['employee_id'];
        $creator = $_POST['current_user_id'];
        $work_year = $_POST['work_year'];

        if ($formID = $formController->createEvalForm($userID, $work_year)) {
            $latestFpID = $formController->createEvalFormFp($formID, $creator, $_POST['userID']);
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

                                    foreach ($target_metrics as $metricIndex => $metric) {
                                        $metric_point = $metric->point;
                                        $metric_description = $metric->metric_description;
                                        if ($formController->insertTargetMetrics($metric_point, $metric_description, $kpiID)) {
                                            array_push($status, 1);
                                        } else {
                                            array_push($status, 0);
                                        }
                                    }
                                } else {
                                    array_push($status, 0);
                                }
                            }
                        } else {
                            array_push($status, 0);
                        }
                    }
                } else {
                    array_push($status, 0);
                }
            }
        } else {
            array_push($status, 0);
        }
    }
    if (in_array(0, $status)) {
        echo "There seems to be an error in creating your goals. Please try again.";
    } else {
        $userLog = $logs->goalsLog($employee_id, 1, 1, $userID == $creator ? "have submitted their goals. Waiting for approval from their rater/s." : "have submitted the goals of their employee.");
        if ($userLog = "success") {
            if ($userID == $creator) {
                $fetchRaters = $notif->fetchRaters($employee_id);
                foreach ($fetchRaters as $rater) {
                    $raterNotif = $notif->addGoalNotification($rater->evaluator, "Employee Goals Submitted!", "Your employee have submitted their goals. Please check for their approval", "/main_goals");
                    if ($raterNotif == "success") {
                        array_push($notification, 1);
                    } else {
                        array_push($notification, 0);
                    }
                }
                if (in_array(0, $notification)) {
                    echo "There seems to be an error in sending notifications. Please try again.";
                } else {
                    echo "Congratulations! You have set your goals!";
                }
            } else {
                $userNotif = $notif->addEmployeeGoalNotification($userID, "Goal Submitted!", "Your goals have been set by your rater.", "/main_goals");
                if ($userNotif == "success") {
                    echo "Congratulations! You have set your goals!";
                } else {
                    echo "There seems to be an error in sending notifications. Please try again.";
                }
            }
        }
    }
}
