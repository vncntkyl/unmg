<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
session_start();
require "../config/userController.php";
require "../config/logController.php";
require "../config/notificationController.php";
$user = new User();
$log = new Log();
$notification = new Notification();

if (isset($_POST['userdata'])) {
    $u = json_decode($_POST['userdata']);
    $contributor = $_POST['contributor'] ? $_POST['contributor'] : 0;
    $first_name = ucwords($u->first_name);
    $middle_name = ucwords($u->middle_name);
    $last_name = ucwords($u->last_name);
    $suffix = $u->suffix;
    $nickname = ucwords($u->nickname);
    $salutations = intval($u->salutation) == 0 ? 'Mr.' : 'Miss.';
    $email = $u->email;
    $contact_no = $u->contact_no;
    $address = ucwords($u->address);
    $nationality = ucwords($u->nationality);
    $username = $u->username;
    $password = md5($u->password);

    $employee_ID = intval($u->employee_id);
    $company_ID = intval($u->company);
    $department_ID = intval($u->department);
    $team = ucwords($u->team);
    $job_description = ucwords($u->job_description);
    $job_level = intval($u->job_level);
    $employment_type = intval($u->employment_type) == 0 ? "LOCAL" : "EXPAT";
    $contract_type = intval($u->contract_type) == 0 ? "Regular" : "Probationary";
    $hire_date = $u->hire_date;
    $primary_evaluator = isset($u->primary_evaluator) ? intval($u->primary_evaluator) : NULL;
    $secondary_evaluator = isset($u->secondary_evaluator) ? intval($u->secondary_evaluator) : NULL;
    $tertiary_evaluator = isset($u->tertiary_evaluator) ? intval($u->tertiary_evaluator) : NULL;
    $user_id = $user->insertAcc($first_name, $middle_name, $last_name, $suffix, $nickname, $salutations, $contact_no, $address, $nationality, $employee_ID, $company_ID, $department_ID, $team, $job_description, $employment_type, $contract_type, $hire_date, $primary_evaluator, $secondary_evaluator, $tertiary_evaluator);
    if ($user_id) {
        $result = $user->insertAcc1($user_id, $username, $password, $email, $job_level);
        if ($result == "success") {
            $addUserLog = $log->userLog($contributor, 1, 1, "added a new employee with the name of " . $first_name . " " . $last_name);
            if ($addUserLog == "success") {
                $addUserNotification = $notification->addUserNotification($employee_ID, "Welcome!", "Your account has been created successfully " . $first_name . " " . $last_name . "!", "/main_goals");
                if ($addUserNotification == "success") {
                    echo "success";
                } else {
                    echo "failed to add user notification";
                }
            } else {
                echo "failed to add user log";
            }
        }
    } else {
        echo "user_id is missing";
    }
}
