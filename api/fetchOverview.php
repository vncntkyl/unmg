<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/userController.php';
$user_controller = new User();

if (isset($_POST['getCount'])) {
    $option = $_POST['getCount'];

    switch ($option) {
        case "all":
            $employees = count($user_controller->retrieveUsers());
            $annualEval = count($user_controller->getEmployeesForEvaluation("regular"));
            $thirdMonthEval = count($user_controller->getEmployeesForEvaluation("probationary"));
            $discussion = count($user_controller->getEmployeesForConsultation());
            $regularization = count($user_controller->getEmployeesForRegularization());

            $dataArray = array(
                [
                    "title" => "Employees",
                    "value" => $employees
                ],
                [
                    "title" => "For Annual Evaluation",
                    "value" => $annualEval
                ],
                [
                    "title" => "For Third Month Evaluation",
                    "value" => $thirdMonthEval
                ],
                [
                    "title" => "1 on 1 Discussion",
                    "value" => $discussion
                ],
                [
                    "title" => "For Regularization",
                    "value" => $regularization
                ],
            );

            echo json_encode($dataArray);

            break;
    }
}
