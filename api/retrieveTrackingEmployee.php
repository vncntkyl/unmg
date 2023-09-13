<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$form = new Form();
// if (isset($_GET['employeeType'])) {
//     $empID = $_GET['empID'];
//     if($empID == '1')
//     {
//         if ($_GET['employeeType'] === "1") {
//             $contractType = "regular";
//             $workYear = $_GET['workYear'];
//             echo json_encode($form->selectAllEmployeeAssessment($contractType, $workYear), JSON_UNESCAPED_UNICODE);


//         }
//         else if ($_GET['employeeType'] === "2") {
//             $contractType = "probationary";
//             $workYear = $_GET['workYear'];
//             $json_employee = json_encode($form->selectAllEmployeeAssessment($contractType, $workYear), JSON_UNESCAPED_UNICODE);
//             echo $json_employee;
//         }
//         else{
//             $workYear = $_GET['workYear'];
//             $json_employee = json_encode($form->selectAllEmployeeAssessment("all", $workYear), JSON_UNESCAPED_UNICODE);
//             echo $json_employee;
//         }
//     }
//     else
//     {
//         if ($_GET['employeeType'] === "1") {
//             $contractType = "regular";
//             $workYear = $_GET['workYear'];
//             echo json_encode($form->selectEmployeeAssessment($empID, $contractType, $workYear), JSON_UNESCAPED_UNICODE);


//         }
//         else if ($_GET['employeeType'] === "2") {
//             $contractType = "probationary";
//             $workYear = $_GET['workYear'];
//             $json_employee = json_encode($form->selectEmployeeAssessment($empID, $contractType, $workYear), JSON_UNESCAPED_UNICODE);
//             echo $json_employee;
//         }
//         else{
//             $workYear = $_GET['workYear'];
//             $json_employee = json_encode($form->selectEmployeeAssessment($empID, "all", $workYear), JSON_UNESCAPED_UNICODE);
//             echo $json_employee;
//         }
//         $contractType = $_GET['employeeType'];
//     }
// }
if (isset($_GET['empRecords'])) {
    $empID = $_GET['empID'];
    if ($empID == '1') {
        $employeeType = $_GET['employeeType'];
        if ($employeeType == '1'){
            $contractType = "regular";
            $workYear = $_GET['workYear'];
            $json_employee = json_encode($form->selectAllEmployeeAssessment($contractType, $workYear), JSON_UNESCAPED_UNICODE);
            echo $json_employee;
        } else if ($employeeType == '2'){
            $contractType = "probationary";
            $workYear = $_GET['workYear'];
            $json_employee = json_encode($form->selectAllEmployeeAssessment($contractType, $workYear), JSON_UNESCAPED_UNICODE);
            echo $json_employee;
        } else {
            $workYear = $_GET['workYear'];
            $json_employee = json_encode($form->selectAllEmployeeAssessment('all', $workYear), JSON_UNESCAPED_UNICODE);
            echo $json_employee;
        }
    } else {
        $empID = $_GET['empID'];
        $workYear = $_GET['workYear'];
        $json_employee = json_encode($form->selectTrackingEmployees($empID, $workYear), JSON_UNESCAPED_UNICODE);
        echo $json_employee;
    }
}
