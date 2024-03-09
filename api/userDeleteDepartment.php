<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/companyController.php';
$deleteConversation = new Companies();

if (isset($_POST['submit'])) {
    if (isset($_POST['departmentID']) && isset($_POST['departmentName'])) {
        $department_id = $_POST['departmentID'];
        $department_name = $_POST['departmentName'];
        $result = $deleteConversation->deleteDepartment($department_id);
        if ($result === "success") {
            echo "The department " . $department_name . " has been deleted! Please set a new department for the employees.";
        } else {
            echo $result;
        }
    }
}
