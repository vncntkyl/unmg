<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
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
        case "update":
            $role = $_POST['role_id'];
            $user_id = $_POST['user_id'];

            if ($user->updateUserRole($user_id, $role)) {
                echo "success";
            } else {
                echo "error";
            }
            break;
        case "remove":
            $user_id = $_POST['user_id'];

            if ($user->removeUserRole($user_id)) {
                echo "success";
            } else {
                echo "error";
            }
            break;
        case "delete":
            $roleList = json_decode($_POST['roles']);

            foreach ($roleList as $role) {
                if (!$user->deleteRole($role)) {
                    array_push($errors, 1);
                }
            }
            
            if (count($errors) === 0) {
                echo "success";
            } else {
                echo "error";
            }
            break;
    }
}
?>