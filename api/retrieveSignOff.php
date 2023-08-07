<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$form = new Form(); 
if(isset($_GET['empID']))
{
    $empID = $_GET['empID'];
    $creation_date = $_GET['workYear'];
    if (isset($_GET['signoff'])) {
        echo json_encode($form->selectUserFinalGrade($empID, $creation_date));
    }
    
    if (isset($_GET['metrics']))
    {
        echo json_encode($form->selectTrackingGradingMetrics($empID, $creation_date));
    }
    
    if (isset($_GET['signature']))
    {
        echo json_encode($form->selectApprover($empID, $creation_date));
    }
}
?>