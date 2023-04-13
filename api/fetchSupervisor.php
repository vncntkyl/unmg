<?php
header("Access-Control-Allow-Origin: *");
require_once 'userController.php';
$fetch = new User();
$supervisors = $fetch->retrieveSupervisor();
$formatted_name = array();
    foreach($supervisors as $su){
        $name = $su->last_name . ", ". $su->first_name . " " . substr($su->middle_name,0,1) . ".";
        array_push($formatted, $name);
    }
echo json_encode($formatted_name);
?>