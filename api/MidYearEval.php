<?php
header("Access-Control-Allow-Origin: *");
require_once 'formController.php';
$formController = new formController();
$formPillarID = $_POST['frmPillarID'];
$latestSpID = $_POST['SpID'];

foreach($evaluation as $evaluationIndex => $eval)
{
$results = $eval->results;
$remarks = $eval->remarks;
$status = $eval->status;
$reviewDate = $eval->reviewDate;
$actToAddress = $eval->actions_to_address;
EvaluationForMidyear($formPillarID[$evaluationIndex], $results, $status, $remarks, $reviewDate, $actToAddress, $latestSpID);
}
?>
