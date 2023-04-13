<?php
header("Access-Control-Allow-Origin: *");
require_once 'userController.php';
$fetch = new User();
if(isset($_GET['users']))
{
    $json_users = json_encode($fetch->retrieveUsers(), JSON_UNESCAPED_UNICODE);
    echo $json_company;
}
else if(isset($_GET['inactive']))
{
    $json_inactive = json_encode($fetch->retrieveDeactivatedUsers(), JSON_UNESCAPED_UNICODE);
    echo $json_inactive;
}
else
{
    $json_deleted = json_encode($fetch->retrieveDeletedUsers(), JSON_UNESCAPED_UNICODE);
    echo $json_deleted;
}
?>