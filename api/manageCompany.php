<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
session_start();
require "../config/companyController.php";
$company = new Companies();

if (isset($_POST['add_company'])) {
    $company_data = json_decode($_POST['company_data']);
    $company_departments = $company_data->department_list;

    if ($company_id = $company->insertCompany($company_data->company_name)) {
        foreach ($company_departments[0] as $dept) {
            if (strlen($dept) !== 0) {
                $company->insertDepartment($company_id,$dept);
            }
        }
        echo "success";
    } else {
        echo "error";
    }
}

if(isset($_POST['add_department'])){
    $department_list = json_decode($_POST['department_list']);
    $company_id = $_POST['company_id'];
    foreach($department_list as $dept){
        $company->insertDepartment($company_id,$dept->department_name);
    }

    echo 'success';
}

if(isset($_POST['delete_department'])){
    $department_id = $_POST['departmentID'];
    if($company->deleteDepartment($department_id)){
        echo "success";
    }
}
?>