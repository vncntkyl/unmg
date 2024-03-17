<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../../config/notificationController.php';
$notif = new Notification();
if (isset($_POST['submit'])) {
    $notifID = $_POST['notifID'];
    $result = $notif->seenUserNotifications($notifID);
    echo $result;
}
