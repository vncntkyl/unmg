<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/formController.php';
$formController = new Form();

    if(isset($_POST['startDate']) && isset($_POST['endDate']))
    {
        $fromDate = $_POST['startDate'];
        $toDate = $_POST['endDate'];
        $formController->insertKpiDuration($fromDate, $toDate);
    }

?>