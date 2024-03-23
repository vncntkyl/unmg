<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/formController.php';
require_once '../config/logController.php';
require_once '../config/notificationController.php';
$form = new Form();
$logs = new Log();
$notif = new Notification();

if (isset($_POST['goalData'])) {
    $data = json_decode($_POST['goalData']);
    $goal_editor = $_POST['goal_editor'];
    $user_id = $_POST['user_id'];
    $status  = array();
    $notification = array();

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
        if($userLog = "success"){
            if ($goal_editor === $user_id) {
                $fetchGoalRaters = $notif->fetchGoalRaters($user_id);
                foreach ($fetchGoalRaters as $rater) {
                    $raterNotif = $notif->addGoalNotification($goal_editor, $rater->evaluator, "Employee Goals Updated!", "have updated their goals. Please check for their approval", "/main_goals/" . $user_id);
                    if ($raterNotif == "success") {
                        array_push($notification, 1);
                    } else {
                        array_push($notification, 0);
                    }
                }
                if (in_array(0, $notification)) {
                    echo 0;
                } else {
                    echo 1;
                }
            } else {
                $userNotif = $notif->updateEmployeeGoalNotification($goal_editor, $user_id, "Goal Updated!", "have updated your goals. Please check for your approval.", "/main_goals");
                if ($userNotif == "success") {
                    echo 1;
                } else {
                    echo 0;
                }
            }
        }
    }
}
