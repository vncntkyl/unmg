<?php
require_once 'controller.php';
class Companies extends Controller
{
    function retrieveCompany()
    {
        $this->setStatement("SELECT * FROM `hr_company` WHERE deleted = 0");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function insertCompany($companyName)
    {
        $this->setStatement("INSERT INTO hr_company (company_name, creation_date) VALUES (:companyName, :creation_date)");
        $this->statement->execute([':companyName' => $companyName, ':creation_date' => date('Y-m-d H:i:s')]);
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

    function deleteCompany($company_id)
    {
        $this->setStatement("SELECT COUNT(*) AS departments FROM `hr_departments` WHERE company_id = :company_id AND deleted = 0");
        $this->statement->execute([':company_id' => $company_id]);
        $result = $this->statement->fetch();
        if ($result->departments > 0) {
            return "Please delete all departments before deleting the company";
        } else {
            $this->setStatement("UPDATE hr_company SET deleted = '1' WHERE company_id = :company_id");
            $process = $this->statement->execute([':company_id' => $company_id]);
            if ($process) {
                return "success";
            }
        }
    }

    function retrieveDepartments()
    {
        $this->setStatement("SELECT * FROM `hr_departments` WHERE deleted = 0");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function insertDepartment($companyID, $departmentName)
    {
        $this->setStatement("INSERT INTO hr_departments (company_id, department_name, creation_date) VALUES (:companyid, :departmentName, :creation_date)");
        return $this->statement->execute([':companyid' => $companyID, ':departmentName' => $departmentName, ':creation_date' => date('Y-m-d H:i:s')]);
    }

    function insertDepartments($departmentData)
    {
        try {
            $sqlQuery = "INSERT INTO `hr_departments` (company_id, department_name, creation_date) VALUES " . $departmentData;
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
        $this->setStatement("UPDATE hr_departments
        LEFT JOIN hr_users ON hr_users.department = hr_departments.department_id
        SET hr_departments.deleted = 1, hr_users.department = 0
        WHERE hr_departments.department_id = :departmentID");
        $process = $this->statement->execute([':departmentID' => $departmentID]);
        if ($process) {
            return "success";
        }
    }
}
