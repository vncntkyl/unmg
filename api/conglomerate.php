<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/companyController.php';
$fetch = new Companies();
if(isset($_GET['company']))
{
    $json_company = json_encode($fetch->retrieveCompany(), JSON_UNESCAPED_UNICODE);
    echo $json_company;
}
if(isset($_GET['department']))
{
    $json_department = json_encode($fetch->retrieveDepartments(), JSON_UNESCAPED_UNICODE);
    echo $json_department;
}
?>