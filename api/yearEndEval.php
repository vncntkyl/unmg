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
$reviewDate = $eval->reviewDate;
EvaluationForYearEnd($formPillarID[$evaluationIndex], $results, $remarks, $reviewDate, $latestSpID);
}
?>
