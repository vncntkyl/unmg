<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../../config/notificationController.php';
$notif = new Notification();
if (isset($_POST['submit'])) {
    $employee_ID = $_POST['employee_id'];
    $result = $notif->deleteUserNotifications($employee_ID);
    echo $result;
}
