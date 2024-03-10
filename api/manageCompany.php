<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
session_start();
require "../config/companyController.php";
require "../config/logController.php";
require "../config/notificationController.php";
$company = new Companies();
$log = new Log();
$notification = new Notification();

if (isset($_POST['add_company'])) {
  $company_data = json_decode($_POST['company_data']);
  $contributor = $_POST['contributor'];
  $company_departments = $company_data->department_list;

  if ($company_id = $company->insertCompany($company_data->company_name)) {
    foreach ($company_departments[0] as $dept) {
      if (strlen($dept) !== 0) {
        $company->insertDepartment($company_id, $dept);
        $log->companyLog($contributor, 1, 1, "added a new department called " . $dept . " under the company " . $company_data->company_name);
      }
    }
    $result = $log->companyLog($contributor, 1, 1, "added a new company called " . $company_data->company_name);
    if ($result) {
      echo "success";
    }
  } else {
    echo "error";
  }
}

if (isset($_POST['add_department'])) {
  $department_list = json_decode($_POST['department_list']);
  $company_id = $_POST['company_id'];
  $company_name = $_POST['company_name'];
  $contributor = $_POST['contributor'];
  foreach ($department_list as $dept) {
    $resultComp = $company->insertDepartment($company_id, $dept->department_name);
    $resultLog = $log->companyLog($contributor, 1, 1, "added a new department called " . $dept->department_name . " under the company " . $company_name);
  }
  if ($resultLog && $resultComp) {
    echo "success";
  }
}

if (isset($_POST['delete_company'])) {
  if (isset($_POST['companyID']) && isset($_POST['companyName'])) {
    $contributor = $_POST['contributor'];
    $company_id = $_POST['companyID'];
    $company_name = $_POST['companyName'];
    $result = $company->deleteCompany($company_id);
    if ($result === "success") {
      $resultLog = $log->companyLog($contributor, 1, 3, "deleted the company " . $company_name);
      if ($resultLog) {
        echo "The company " . $company_name . " has been deleted!";
      }
    } else {
      $resultLog = $log->companyLog($contributor, 1, 3, "attempted to delete the company " . $company_name);
      if ($resultLog) {
        echo $result;
      }
    }
  }
}

if (isset($_POST['delete_department'])) {
  if (isset($_POST['departmentID']) && isset($_POST['departmentName'])) {
    $contributor = $_POST['contributor'];
    $department_id = $_POST['departmentID'];
    $department_name = $_POST['departmentName'];
    $company_name = $_POST['companyName'];
    $result = $company->deleteDepartment($department_id);
    if ($result === "success") {
      $resultLog = $log->companyLog($contributor, 1, 3, "has deleted the department " . $department_name . " under the company " . $company_name);
      if ($resultLog) {
        echo "The department " . $department_name . " under the company " . $company_name . " has been deleted! Please set a new department for the employees.";
      }
    } else {
      $resultLog = $log->companyLog($contributor, 1, 3, "attempted to delete the department " . $department_name . " under the company " . $company_name);
      if ($resultLog) {
        echo $result;
      }
    }
  }
}
