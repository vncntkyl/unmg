<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require "../config/userController.php";
$user = new User();
if (isset($_POST['action'])) {
    if ($_POST['action'] === 'deactivate') {
        if ($user->deactivateAcc($_POST['user_id'])) {
            echo "success";
        }
    } else {
        if ($user->deleteAcc($_POST['user_id'])) {
            echo "success";
        }
    }
}
?>