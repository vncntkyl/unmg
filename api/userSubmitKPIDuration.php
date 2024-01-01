<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$submitKPIDuration = new Form();

if (isset($_POST['submit']) && isset($_POST['KPIDate'])) {
  $KPIDate = $_POST['KPIDate'];
  foreach($KPIDate as $date) {
    $fromDate = $date['start'];
    $toDate = $date['end'];
    $result = $submitKPIDuration->insertKPIDuration($fromDate, $toDate);
  }
  if ($result){
    echo "KPI year successfully added!";
  }
}
