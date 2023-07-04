<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$fetch = new Form();
if(isset($_GET['pillarDesc']))
{
    $json_kpiDesc = json_encode($fetch->fetchPillarPercentageAndKPIDesc(), JSON_UNESCAPED_UNICODE);
    echo $json_kpiDesc;
}
?>