<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/userController.php';
$fetch = new User();
if (isset($_GET['users'])) {
    $json_users = json_encode($fetch->retrieveUsers(), JSON_UNESCAPED_UNICODE);
    echo $json_users;
}
if (isset($_GET['inactive'])) {
    $json_inactive = json_encode($fetch->retrieveDeactivatedUsers(), JSON_UNESCAPED_UNICODE);
    echo $json_inactive;
}
if (isset($_GET['deleted'])) {
    $json_deleted = json_encode($fetch->retrieveDeletedUsers(), JSON_UNESCAPED_UNICODE);
    echo $json_deleted;
}
if (isset($_GET['heads'])) {
    $json_head = json_encode($fetch->retrieveHeadUsers(), JSON_UNESCAPED_UNICODE);
    echo $json_head;
}
if (isset($_GET['usertype'])) {
    $json_head = json_encode($fetch->retrieveUserTypes(), JSON_UNESCAPED_UNICODE);
    echo $json_head;
}

if (isset($_POST['super'])) {
    echo json_encode($fetch->retrieveSuperAdmin(), JSON_UNESCAPED_UNICODE);
}
