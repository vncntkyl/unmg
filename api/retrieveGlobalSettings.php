<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$form = new Form(); 
    if (isset($_GET['globalSettings'])) {
        echo json_encode($form->selectGlobalSettings());
    }
?>