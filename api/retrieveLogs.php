<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/logController.php';
$logs = new Log();
if (isset($_GET['logs'])) {
  $startDate = $_GET['startDate'];
  $endDate = $_GET['endDate'];

  $startDate = $startDate != "" ? date("Y-m-d H:i:s", strtotime($startDate . " 00:00:00")) : "";
  $endDate = $endDate != "" ? date("Y-m-d H:i:s", strtotime($endDate . " 23:59:59")) : "";
  $fetch = json_encode($logs->retrieveLogs($startDate, $endDate), JSON_UNESCAPED_UNICODE);
  echo $fetch;
}
