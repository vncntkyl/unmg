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
    $user_id = $_POST['user_id'];

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

    $employee_ID = intval($u->employee_id);
    $company_ID = intval($u->company);
    $department_ID = intval($u->department);
    $team = ucwords($u->team);
    $job_description = ucwords($u->job_description);
    $job_level = intval($u->job_level);
    $employment_type = intval($u->employment_type) == 0 ? "LOCAL" : "EXPAT";
    $contract_type = intval($u->contract_type) == 0 ? "Regular" : "Probationary";
    $hire_date = $u->hire_date;
    $primary_evaluator = $u->primary_evaluator !== "N/A" ? intval($u->primary_evaluator) : NULL;
    $secondary_evaluator = $u->secondary_evaluator !== "N/A" ? intval($u->secondary_evaluator) : NULL;
    $tertiary_evaluator = $u->tertiary_evaluator !== "N/A" ? intval($u->tertiary_evaluator) : NULL;
    $result = $user->updateAcc($user_id, $first_name, $middle_name, $last_name, $suffix, $nickname, $salutations, $contact_no, $address, $nationality, $employee_ID, $company_ID, $department_ID, $team, $job_description, $employment_type, $contract_type, $hire_date, $primary_evaluator, $secondary_evaluator, $tertiary_evaluator);
    if ($result == "success") {
        $result1 = $user->updateAcc1($user_id, $username, $email, $job_level);
        if ($result1 == "success") {
            if (intval($contributor) == intval($employee_ID)) {
                $updateUserLog = $log->userLog($contributor, 2, 2, "updated their account");
                if ($updateUserLog == "success") {
                    echo "success";
                }
            } else {
                $updateUserLog = $log->userLog($contributor, 1, 2, "updated the account details of " . $first_name . " " . $last_name);
                if ($updateUserLog == "success") {
                    $linkName = str_replace(' ', '_', $first_name) . "_" . str_replace(' ', '_', $last_name);
                    $updateUserNotification = $notification->updateUserNotification($employee_ID, "Account Updated!", "Your account has been updated by the administrator", "/account/" . $linkName);
                    if ($updateUserNotification == "success") {
                        echo "success";
                    }
                }
            }
        }
    }




    // if ($user_id) {
    //     $result = $user->insertAcc1($user_id, $username, $password, $email, $job_level);
    //     if ($result == "success") {
    //         $addUserLog = $log->userLog($contributor, 1, 1, "added a new employee with the name of " . $first_name . " " . $last_name);
    //         if ($addUserLog == "success") {
    //             $addUserNotification = $notification->addUserNotification($employee_ID, "Welcome!", "Your account has been created successfully " . $first_name . " " . $last_name . "!", "/main_goals");
    //             if ($addUserNotification == "success") {
    //                 echo "success";
    //             } else {
    //                 echo "failed to add user notification";
    //             }
    //         } else {
    //             echo "failed to add user log";
    //         }
    //     }
    // } else {
    //     echo "user_id is missing";
    // }
}
