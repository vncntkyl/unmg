<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
session_start();
require "../config/userController.php";

$user = new User();
$errors = array();

if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case "register":
            $roleData = json_decode($_POST['role_data']);
            if ($ID = $user->insertNewUserType($roleData->role_name)) {
                if (count($roleData->memberList) > 0) {
                    foreach ($roleData->memberList as $member) {
                        if (!$user->updateUserRole((int)$member, $ID)) {
                            array_push($errors, 1);
                        }
                    }
                    if (count($errors) === 0) {
                        echo "success";
                    } else {
                        echo "error";
                    }
                }
            }
            break;
            case "change":
            break;
    }
}
?>