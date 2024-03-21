<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/performanceplanController.php';
require_once '../config/logController.php';
require_once '../config/notificationController.php';
$form = new PerformancePlan();
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

        if ($formID = $form->createEvalForm($userID, $work_year)) {
            $latestFpID = $form->createEvalFormFp($formID, $creator, $_POST['userID']);
            $latestSpID = $form->createEvalFormSp($formID);
            foreach ($goals as $index => $goal) {
                $pillarObjectives = $goal->objectives;
                $pillarID = $index + 1;
                $pillarPercentage =  $goal->pillar_percentage;

                if ($formPillarID = $form->createEvalFormPillarsPart($formID, $pillarID, $latestFpID, $pillarPercentage)) {

                    foreach ($pillarObjectives as $objectiveIndex => $objective) {
                        $objective_description = $objective->objective_description;
                        $objectiveKPIs = $objective->kpi;

                        if ($objectiveID = $form->insertGoals($formPillarID, $latestFpID, $objective_description)) {

                            foreach ($objectiveKPIs as $kpiIndex => $kpi) {
                                $kpi_description = $kpi->kpi_description;
                                $kpi_weight = $kpi->kpi_weight;
                                 $target_metrics = array_reverse($kpi->target_metrics);
                                if ($kpiID = $form->insertKPI($kpi_description, $objectiveID, $kpi_weight)) {
                                    $form->insertFqEval($kpiID, $latestSpID);
                                    $form->insertMyrEval($kpiID, $latestSpID);
                                    $form->insertTqEval($kpiID, $latestSpID);
                                    $latestYearEndValID = $form->insertYeEval($kpiID, $latestSpID);

                                    foreach ($target_metrics as $metricIndex => $metric) {
                                        $metric_point = $metric->point;
                                        $metric_description = $metric->metric_description;
                                        if ($form->insertTargetMetrics($metric_point, $metric_description, $kpiID)) {
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
        $userLog = $logs->createGoals($employee_id, 3, 1, $userID == $creator ? "have submitted their goals. Waiting for approval from their rater/s." : "have submitted the goals of their employee.");
        if ($userLog = "success") {
            if ($userID == $creator) {
                $fetchRaters = $notif->fetchRaters($employee_id);
                foreach ($fetchRaters as $rater) {
                    $raterNotif = $notif->addGoalNotification($creator, $rater->evaluator, "Employee Goals Submitted!", "have submitted their goals. Please check for their approval", "/main_goals/" . $userID);
                    if ($raterNotif == "success") {
                        array_push($notification, 1);
                    } else {
                        array_push($notification, 0);
                    }
                }
                if (in_array(0, $notification)) {
                    echo "There seems to be an error in sending notifications. Please try again.";
                } else {
                    echo "success";
                }
            } else {
                $userNotif = $notif->addEmployeeGoalNotification($creator, $userID, "Goal Submitted!", "has submitted your goals. Please check it for your approval", "/main_goals/" . $userID);
                if ($userNotif == "success") {
                    echo "success";
                } else {
                    echo "There seems to be an error in sending notifications. Please try again.";
                }
            }
        }
    }
}
