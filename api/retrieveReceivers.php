<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$form = new Form(); 
if(isset($_GET['empID']))
{
    $employee_id = $_GET['empID'];
    echo json_encode($form->selectReceivers($employee_id));
}
?>