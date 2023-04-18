<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
session_start();
require "../config/userController.php";
$user = new User();

$requestBody = file_get_contents('php://input');
// Decode JSON data
$data = json_decode($requestBody, true);

if ($data['params']) {
    $userdata = $data['params']['userdata'];
    $imm_sup = $userdata['immediate_supervisor'] ? $userdata['immediate_supervisor'] : NULL;
    $job_desc = $userdata['job_description'] ? $userdata['job_description'] : "N/A";
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
        $userdata['user_type'],
        $userdata['status'],
        $data['params']['id']
    );
    if ($result) {
        echo 'success';
    }
}
?>