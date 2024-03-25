<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/performanceplanController.php';
require_once '../config/logController.php';
require_once '../config/notificationController.php';
require_once '../config/approvallogsController.php';

$plan = new PerformancePlan();
$logs = new Log();
$notif = new Notification();
$approval = new ApprovalLogs();


if (isset($_POST['approve'])) {
    $userID = $_POST['employee_id'];
    $approver = $_POST['approver'];
    $column_name = $_POST['column_name'];
    $accept = $_POST['accept'];
    $id = $_POST['id'];
    $notification = array();
    $approvals = array();
    $process = $plan->approveGoal($column_name, $accept, $id);
    if ($process) {
        $userLog = $logs->approveGoals($userID == $approver ? $userID : $approver, 3, 2, $userID == $approver ? "has approved their goals. Waiting for approval from their rater/s." : ($accept == 1 ? "has accepted the goals of their employee." : "has approved the goals of their employee."));
        if ($userLog == "success") {
            $approvalLog = $approval->goalApprovals($approver, $userID, 1, $approver == $userID ? "has approved their goals." : ($accept == 1 ? "has accepted the goals of" : "has approved the goals of"), $id);
            if ($approvalLog == "success") {
                if ($userID == $approver) {
                    $fetchRaters = $notif->fetchGoalRaters($userID);
                    foreach ($fetchRaters as $rater) {
                        if ($rater->evaluator != null) {
                            $raterNotif = $notif->approveGoalNotification($approver, $rater->evaluator, "Employee Accepted!", $accept == 1 ? "has accepted their goals. Please check to accept them." : "has accepted their goals. Please check to approve them", "/main_goals/" . $userID);
                            if ($raterNotif == "success") {
                                array_push($notification, 1);
                            } else {
                                array_push($notification, 0);
                            }
                        }
                    }
                    if (in_array(0, $notification)) {
                        echo "error";
                    } else {
                        echo "success";
                    }
                } else {
                    $fetchRaters = $notif->fetchGoalRatersEmployee($userID, $approver);
                    foreach ($fetchRaters as $rater) {
                        if ($rater->approval != null) {
                            $approvalNotif = $notif->approveGoalNotificationRater($approver, $rater->approval, $accept == 1 ? "Rater Accepted!" : "Rater Approved!", $rater->employee == $rater->approval ? ($accept == 1 ? "has accepted your goals. Please wait for other raters to accept your goals." : "has approved your goals. You are now poised to achieve your objectives.") : ($accept == 1 ? "has accepted the goals of their employee. Please check their objectives to see if you accept/approve." : "has approved the goals of their employee."), $rater->employee == $rater->approval ? "/main_goals/" : "/main_goals/" . $userID);
                            if ($approvalNotif == "success") {
                                array_push($approvals, 1);
                            } else {
                                array_push($approvals, 0);
                            }
                        }
                    }
                    if (in_array(0, $approvals)) {
                        echo "error";
                    } else {
                        echo "success";
                    }
                }
            }
        }
    } else {
        echo "error";
    }
}
