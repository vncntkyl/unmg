<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/formController.php';
$fetch = new Form();
if(isset($_GET['logs']))
{

}
?>