<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$fetch = new Form();
if(isset($_GET['evals']))
{
    $json_evaluations = json_encode($fetch->fetchAllEvaluations(), JSON_UNESCAPED_UNICODE);
    echo $json_evaluations;
}
?>