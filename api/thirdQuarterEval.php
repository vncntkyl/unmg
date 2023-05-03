<?php
header("Access-Control-Allow-Origin: *");
require_once 'formController.php';
$formController = new formController();
$formPillarID = $_POST['frmPillarID'];
$latestSpID = $_POST['SpID'];

foreach($evaluation as $evaluationIndex => $eval)
{
$results = $eval->results;
$reVariance = $eval->reason_for_variance;
$reviewDate = $eval->reviewDate;
EvaluationForThirdQT($formPillarID[$evaluationIndex], $results, $reVariance, $reviewDate, $latestSpID);
}
?>
