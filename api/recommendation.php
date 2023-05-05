<?php
header("Access-Control-Allow-Origin: *");
require_once 'formController.php';
$formController = new formController();
$formID = $_POST['formID'];
$recommendation = $_POST['recommendation'];
$formController->recommendation($formID,$recommendation);
?>
