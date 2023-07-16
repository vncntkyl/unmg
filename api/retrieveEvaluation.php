<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/formController.php';
$fetch = new Form();
if(isset($_GET['evals']))
{
    $json_evaluations = json_encode($fetch->fetchAllEvaluations(), JSON_UNESCAPED_UNICODE);
    echo $json_evaluations;
}
?>