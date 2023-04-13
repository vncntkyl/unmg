<?php
require_once 'controller.php';
Class Companies extends Controller
{
    function retrieveCompany()
    {
        $this->setStatement("SELECT * FROM `hr_company`");
        $this->statement->execute();
        return $this->statement->fetchAll(); 
    }
    function insertCompany($companyName)
    {
        $this->setStatement("INSERT into `hr_company` (company_name) VALUES (:companyName)'");
        $this->statement->execute([':companyName' => $companyName]);
        return true;
    }
    function retrieveDepartments()
    {
        $this->setStatement("SELECT * FROM `hr_departments`");
        $this->statement->execute();
        return $this->statement->fetchAll(); 
    }
    function insertDepartment($companyID,$departmentName)
    {
        $this->setStatement("INSERT into `hr_departments` (company_id,department_name) VALUES (:companyid,:departmentName)");
        $this->statement->execute([':companyid' => $companyName, ':departmentName' => $departmentName]);
        return true;
    }
    function updateDepartment($departmentID,$companyID,$departmentName)
    {
        $this->setStatement("UPDATE `hr_departments` SET company_id = ':companyid',department_name = ':departmentName' WHERE department_id = ':deptID'");
        $this->statement->execute([':deptID' => $departmentID,':companyid' => $companyName, ':departmentName' => $departmentName]);
        return true;
    }
    function deactivateDepartment($departmentID)
    {
        $this->setStatement("UPDATE `hr_departments` SET inactive = '1' WHERE department_id = ':deptID'");
        $this->statement->execute([':deptID' => $departmentID]);
        return true;
    }
    function deleteDepartment($departmentID)
    {
        $this->setStatement("UPDATE `hr_departments` SET deleted = '1'WHERE department_id = ':deptID'");
        $this->statement->execute([':deptID' => $departmentID]);
        return true;
    }
}
?>