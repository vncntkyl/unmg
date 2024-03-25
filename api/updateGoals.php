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

if (isset($_POST['goalData'])) {
    $data = json_decode($_POST['goalData']);
    $goal_editor = $_POST['goal_editor'];
    $user_id = $_POST['user_id'];
    $workYear = $_POST['workYear'];
    $fp_id = $_POST['fp_id'];
    $status  = array();
    $notification = array();
    $approvals = array();
    foreach ($data as $datum) {
        if ($form->updatePillarByID($datum->hr_eval_form_pillar_id, $datum->pillar_percentage, $datum->comment)) {
            array_push($status, 1);
        } else {
            array_push($status, 0);
        }
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
        $userLog = $logs->updateGoals($goal_editor === $user_id ? $user_id : $goal_editor, 3, 2, $goal_editor === $user_id ? "has updated their goals" : "has updated the goals of their employee");
        if ($userLog = "success") {
            $performancePlan = $form->fetchEvaluationFormApproval($user_id, $workYear);
            if ($performancePlan->employee_id == $goal_editor) {
                if ($performancePlan->status == 2) {
                    $updatefp = $form->updateFpByID($fp_id, 1, 0, 5, 5);
                } else if ($performancePlan->status == 3) {
                    $updatefp = $form->updateFpByID($fp_id, 1, 0, 0, 5);
                } else if ($performancePlan->status == 4) {
                    $updatefp = $form->updateFpByID($fp_id, 1, 0, 0, 0);
                }
            } else if ($performancePlan->primary_id == $goal_editor) {
                if ($performancePlan->status == 2) {
                    $updatefp = $form->updateFpByID($fp_id, 0, 0, 5, 5);
                } else if ($performancePlan->status == 3) {
                    $updatefp = $form->updateFpByID($fp_id, 0, 0, 0, 5);
                } else if ($performancePlan->status == 4) {
                    $updatefp = $form->updateFpByID($fp_id, 0, 0, 0, 0);
                }
            } else if ($performancePlan->secondary_id == $goal_editor) {
                if ($performancePlan->status == 3) {
                    $updatefp = $form->updateFpByID($fp_id, 1, 0, 0, 5);
                } else if ($performancePlan->status == 4) {
                    $updatefp = $form->updateFpByID($fp_id, 1, 0, 0, 0);
                }
            } else if ($performancePlan->tertiary_id == $goal_editor) {
                if ($performancePlan->status == 4) {
                    $updatefp = $form->updateFpByID($fp_id, 1, 0, 0, 0);
                }
            }

            if ($goal_editor === $user_id) {
                $fetchGoalRaters = $notif->fetchGoalRaters($user_id);
                foreach ($fetchGoalRaters as $rater) {
                    if ($rater->evaluator != null) {
                        $raterNotif = $notif->addGoalNotification($goal_editor, $rater->evaluator, "Employee Goals Updated!", "has updated their goals. Please check for their approval", "/main_goals/" . $user_id);
                        if ($raterNotif == "success") {
                            array_push($notification, 1);
                        } else {
                            array_push($notification, 0);
                        }
                    }
                }
                if (in_array(0, $notification)) {
                    echo 0;
                } else {
                    echo 1;
                }
            } else {
                $fetchRaters = $notif->fetchGoalRatersEmployee($user_id, $goal_editor);
                foreach ($fetchRaters as $rater) {
                    if ($rater->approval != null) {
                        $userNotif = $notif->updateEmployeeGoalNotification($goal_editor, $rater->approval, "Goal Updated!", $rater->employee == $rater->approval ? "has updated your goals. Please wait for other raters for your approval" : "has updated the goals of your employee. Please check for your approval", $rater->employee == $rater->approval ? "/main_goals" : "/main_goals/" . $user_id);
                        if ($userNotif == "success") {
                            array_push($approvals, 1);
                        } else {
                            array_push($approvals, 0);
                        }
                    }
                }
                if (in_array(0, $approvals)) {
                    echo 0;
                } else {
                    echo 1;
                }
            }
        }
    }
}
