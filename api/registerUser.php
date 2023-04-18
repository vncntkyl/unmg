<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
session_start();
require "../config/userController.php";
$user = new User();

$requestBody = file_get_contents('php://input');
// Decode JSON data
$data = json_decode($requestBody, true);
$salutations = ["Mr.", "Miss", "Mrs."];

if ($data['params']) {
    $userdata = $data['params']['userdata'];
    $imm_sup = $userdata['immediate_supervisor'] ? $userdata['immediate_supervisor'] : NULL;
    $result = $user->insertAcc(
        $userdata['supervisor'],
        $imm_sup,
        $userdata['last_name'],
        $userdata['first_name'],
        $userdata['middle_name'],
        $userdata['company'],
        $userdata['department'],
        $salutations[$userdata['salutation']],
        $userdata['email'],
        $userdata['contact_no'],
        $userdata['address'],
        $userdata['username'],
        $userdata['password'],
        $userdata['job_description'],
        $userdata['user_type'],
        $userdata['job_status']
    );
    if ($result) {
        echo 'success';
    }
}
?>
