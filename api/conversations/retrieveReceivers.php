<?php
header("Access-Control-Allow-Origin: *");
require_once '../../config/conversationController.php';
$conversation = new Conversation();
if(isset($_GET['empID']))
{
    $employee_id = $_GET['empID'];
    echo json_encode($conversation->selectReceivers($employee_id));
}
?>