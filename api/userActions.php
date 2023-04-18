<?php
header("Access-Control-Allow-Origin: *");
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