<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$form = new Form();
if (isset($_GET['userpillarpercentage'])) {
    echo json_encode($form->selectUserPillarPercentage());
}
if (isset($_GET['userPerformance'])) {
    echo json_encode($form->selectUserPerformance());
}
if (isset($_GET['userSignOff'])) {
    echo json_encode($form->selectUserSignOff());
}
?>