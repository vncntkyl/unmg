<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/companyController.php';
$fetch = new Companies();
if (isset($_GET['companies'])) {
    echo json_encode($fetch->retrieveCompany());
}
?>