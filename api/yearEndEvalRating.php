<?php
header("Access-Control-Allow-Origin: *");
require_once 'formController.php';
$formController = new formController();
$latestYearEndValID = $_POST['yearEndID'];

foreach($rating as $ratingIndex => $rate)
{
$agreedRate = $rate->agreedRate;
$weightedRating = $rate->weightedRate;
RatingForYearEndEvaluation($agreedRate, $weightedRating, $latestYearEndValID[$ratingIndex])
}
?>
