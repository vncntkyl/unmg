<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/notificationController.php';
$notif = new Notification();

if (isset($_GET['logs'])) {
    $employee_id = $_GET['employee_id'];
    $fetch = json_encode($notif->retrieveNotifications($employee_id), JSON_UNESCAPED_UNICODE);
    echo $fetch;
}
