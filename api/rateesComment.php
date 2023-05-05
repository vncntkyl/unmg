<?php
header("Access-Control-Allow-Origin: *");
require_once 'formController.php';
$formController = new formController();
$formID = $_POST['formID'];
$ratees_comment = $_POST['ratees_comment'];
$formController->rateesComment($formID,$ratees_comment);
?>
