<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/companyController.php';
$deleteConversation = new Companies();

if (isset($_POST['submit'])) {
    if (isset($_POST['companyID']) && isset($_POST['companyName'])) {
        $company_id = $_POST['companyID'];
        $company_name = $_POST['companyName'];
        $result = $deleteConversation->deleteCompany($company_id);
        if ($result === "success") {
            echo "The company " . $company_name . " has been deleted!";
        } else {
            echo $result;
        }
    }
}
