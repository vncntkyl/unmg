<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../config/userController.php';
require_once '../config/companyController.php';
$user = new User();

if (isset($_POST['employees'])) {
    $status = array();
    $company = new Companies();
    $companies_data = array();
    $departments_data = array();
    $stored_companies = array();
    $stored_departments = array();

    $user_levels = $user->retrieveUserTypes();

    $data = json_decode($_POST['employees']);
    foreach ($data as $key => $emp) {
        array_push($companies_data, $emp->company);

        $emp->hire_date = DateTime::createFromFormat('m/d/Y', $emp->hire_date)->format("Y-m-d");
        $user_type = array_filter($user_levels, function ($level) use ($emp) {
            return strtolower($level->job_level_name) === strtolower($emp->job_level);
        });
        $emp->job_level = reset($user_type)->job_level_id;
    }

    $new_companies_data = array_unique($companies_data);
    $companies = $company->retrieveCompany();
    $departments = $company->retrieveDepartments();

    foreach ($companies as $key => $comp) {
        array_push($stored_companies, $comp->company_name);
    }
    foreach ($departments as $key => $dept) {
        array_push($stored_departments, [
            'company_id' => $dept->company_id,
            'department_name' => trim($dept->department_name),
        ]);
    }

    $companies_for_registration = array_diff($new_companies_data, $stored_companies);
    if (count($companies_for_registration) > 0) {
        $companies_for_registration = array_map(function ($comp) {
            return '("' . $comp . '")';
        }, $companies_for_registration);

        $companies_for_registration = join(",", $companies_for_registration);
        $company->insertCompanies($companies_for_registration);
    }
    //NEWLY RETRIEVED COMPANIES
    $companies = $company->retrieveCompany();

    foreach ($data as $key => $emp) {

        $company_info = array_filter($companies, function ($val) use ($emp) {
            return $val->company_name === $emp->company;
        });

        // Accessing the first matching element (if any)
        if (!empty($company_info)) {
            $company_id = reset($company_info)->company_id;
            array_push($departments_data, [
                'company_id' => $company_id,
                'department_name' => trim($emp->department),
            ]);
        }
    }
    $unique_departments = array_map("unserialize", array_unique(array_map("serialize", $departments_data)));

    $new_departments = array();

    $filtered_departments = array_filter($unique_departments, function ($newDept) use ($stored_departments) {
        foreach ($stored_departments as $storedDept) {
            if ($newDept['company_id'] === $storedDept['company_id'] && $newDept['department_name'] === $storedDept['department_name']) {
                return false; // Exclude the department from the filtered list
            }
        }
        return true; // Include the department in the filtered list
    });

    if (count($filtered_departments) > 0) {
        $filtered_departments = array_map(function ($dept) {
            return '(' . $dept['company_id'] . ',"' . $dept['department_name'] . '")';
        }, $filtered_departments);

        $departments_for_registration = join(",", $filtered_departments);
        //insert department code
        echo $company->insertDepartments($departments_for_registration);
    }
    $departments = $company->retrieveDepartments();

    foreach ($data as $key => $emp) {
        $company_data = array_filter($companies, function ($comp) use ($emp) {
            return strtolower($comp->company_name) === strtolower($emp->company);
        });
        $company_data = reset($company_data);
        $department_data = array_filter($departments, function ($dept) use ($emp, $company_data) {
            return strtolower($dept->department_name) === strtolower($emp->department) && $dept->company_id === $company_data->company_id;
        });
        $emp->company = $company_data->company_id;
        $emp->department = reset($department_data)->department_id;
        $emp->username = $emp->employee_id;
        $emp->password = join("", explode(" ", $emp->last_name)) . $emp->employee_id;
        $emp->suffix = isset($emp->suffix) ? $emp->suffix : null;
        $emp->job_description = $emp->position;
        $emp->employment_type = strtolower($emp->employment_type) === "local" ? intval(0) : intval(1);
        $emp->contract_type = isset($emp->contract_type) ? $emp->contract_type : "regular";
        $emp->contact_no = isset($emp->contact_no) ? $emp->contact_no : "09991113498";
        $emp->address = isset($emp->address) ? $emp->address : "Makati, Philippines";
        $emp->email = isset($emp->email) ? $emp->email : join("", explode(" ", strtolower($emp->first_name))) . "." . join("", explode(" ", strtolower($emp->last_name))) . "@unitedneon.com";
        unset($emp->position);
    }

    foreach ($data as $key => $emp) {
        if($emp->contract_type !== "project based" && $emp->contract_type !== "consultant"){
            if($user->checkUser($emp->employee_id) == 0){
                array_push($status, $user->insertAcc($emp) ? 1 : 0);
            }
        }
    }
    if(in_array(0, $status)){
        echo 0;
    }else{
        echo 1;
    }
}
