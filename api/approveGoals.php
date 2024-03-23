<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/performanceplanController.php';

$fc = new PerformancePlan();

if(isset($_POST['approve'])){
    return $fc->approveGoal($_POST['column_name'], $_POST['id']);
}
