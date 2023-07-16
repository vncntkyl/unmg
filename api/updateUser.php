<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
session_start();
require "../config/userController.php";
$user = new User();


if (isset($_POST['userdata'])) {
    $userdata = $_POST['userdata'];
    $imm_sup = isset($userdata['immediate_supervisor']) ? $userdata['immediate_supervisor'] : NULL;
    $job_desc = isset($userdata['job_description']) ? $userdata['job_description'] : "N/A";
    $result = $user->updateAcc(
        $userdata['supervisor'],
        $imm_sup,
        $userdata['last_name'],
        $userdata['first_name'],
        $userdata['middle_name'],
        $userdata['company'],
        $userdata['department'],
        $userdata['salutation'],
        $userdata['contact_no'],
        $userdata['address'],
        $job_desc,
        $userdata['status'],
        $data['params']['id']
    );
    if ($result) {
        echo 'success';
    }
}
