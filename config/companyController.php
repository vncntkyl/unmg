<?php
require_once 'controller.php';
class Companies extends Controller
{
    function retrieveCompany()
    {
        $this->setStatement("SELECT * FROM `hr_company`");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function insertCompany($companyName)
    {
        $this->setStatement("INSERT INTO `hr_company` (`company_name`) VALUES (:companyName)");
        $this->statement->execute([':companyName' => $companyName]);
        return $this->connection->lastInsertId();
    }
    function insertCompanies($companyData)
    {
        try {
            $sqlQuery = "INSERT INTO `hr_company` (company_name) VALUES " . $companyData;
            $this->setStatement($sqlQuery);
            return $this->statement->execute();
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    function retrieveDepartments()
    {
        $this->setStatement("SELECT * FROM `hr_departments`");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function insertDepartment($companyID, $departmentName)
    {
        $this->setStatement("INSERT into `hr_departments` (company_id,department_name) VALUES (:companyid,:departmentName)");
        return $this->statement->execute([':companyid' => $companyID, ':departmentName' => $departmentName]);
    }
    function insertDepartments($departmentData)
    {
        try {
            $sqlQuery = "INSERT INTO `hr_departments` (company_id, department_name) VALUES " . $departmentData;
            $this->setStatement($sqlQuery);
            return $this->statement->execute();
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    function updateDepartment($departmentID, $companyID, $departmentName)
    {
        $this->setStatement("UPDATE `hr_departments` SET company_id = ':companyid',department_name = ':departmentName' WHERE department_id = ':deptID'");
        $this->statement->execute([':deptID' => $departmentID, ':companyid' => $companyID, ':departmentName' => $departmentName]);
        return true;
    }
    function deactivateDepartment($departmentID)
    {
        $this->setStatement("UPDATE `hr_departments` SET inactive = '1' WHERE department_id = :deptID");
        $this->statement->execute([':deptID' => $departmentID]);
        return true;
    }
    function deleteDepartment($departmentID)
    {
        $this->setStatement("UPDATE `hr_departments` SET deleted = 1 WHERE department_id = ?");
        return $this->statement->execute([$departmentID]);
    }
}
