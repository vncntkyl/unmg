<?php
require_once 'controller.php';
class User extends Controller
{
    function loginAccount($userlogin, $password)
    {
        $status = "active";
        $this->setStatement("SELECT * FROM `hr_user_accounts` WHERE (username = :userlogin OR email_address = :userlogin) AND password = :password");
        try {
            $this->statement->execute([':userlogin' => $userlogin, ':password' => $password]);
            if ($result = $this->statement->fetch()) {
                if ($result->user_status === $status && $result->account_status === $status) {
                    $this->setStatement("SELECT a.username, a.email_address, a.user_type, i.* FROM hr_user_accounts as a JOIN hr_users i ON a.users_id = i.users_id WHERE a.users_id = ?");
                    $this->statement->execute([$result->users_id]);
                    return $this->statement->fetch();
                } else {
                    return "Sorry, you cannot login because your employment/account status has been deactivated.";
                }
            } else {
                return "Incorrect username or password.";
            }
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }
    function retrieveUsers()
    {
        $this->setStatement("SELECT a.username, a.email_address, a.user_type, i.* FROM hr_user_accounts as a JOIN hr_users i ON a.users_id = i.users_id");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function retrieveUsersByContract($contractID)
    {
        $this->setStatement("SELECT a.username, a.email_address, a.user_type, i.* FROM hr_user_accounts as a JOIN hr_users i ON a.users_id = i.users_id WHERE user_status = ?");
        $this->statement->execute([$contractID]);
        return $this->statement->fetchAll();
    }
    function retrieveDeletedUsers()
    {
        $this->setStatement("SELECT * FROM `hr_users` WHERE deleted = '1'");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function retrieveDeactivatedUsers()
    {
        $this->setStatement("SELECT * FROM `hr_users` WHERE inactive = '1'");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }

    function retrieveHeadUsers()
    {
        $this->setStatement("SELECT u.employee_id, CONCAT(u.last_name, ', ', u.first_name, ' ', LEFT(u.middle_name, 1), '.') AS full_name, a.user_type
        FROM hr_users u LEFT JOIN hr_user_accounts a ON u.users_id = a.users_id
        WHERE a.user_type != 6");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }

    function retrieveUserTypes()
    {
        $this->setStatement("SELECT * FROM hr_user_level");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }

    function deactivateAcc($uID)
    {
        $this->setStatement("UPDATE `hr_users` SET inactive = 1 WHERE users_id= :uID");
        return $this->statement->execute([':uID' => $uID]);
    }
    function deleteAcc($uID)
    {
        $this->setStatement("UPDATE `hr_users` SET deleted = 1 WHERE users_id=:uID");
        return $this->statement->execute([':uID' => $uID]);
    }
    function insertAcc($u)
    {
        $salutations = ['Mr.', 'Miss', 'Mrs.'];
        $employee_ID = intval($u->employee_id);
        $company_ID = intval($u->company);
        $salutation = $salutations[intval($u->salutation)];
        $department_ID = intval($u->department);
        $job_level = intval($u->job_level);
        $password = md5($u->password);
        $employment_type = intval($u->employment_type) === 0 ? "LOCAL" : "EXPAT";
        $primary_evaluator = intval($u->primary_evaluator);
        $secondary_evaluator = $u->secondary_evaluator != NULL ? intval($u->secondary_evaluator) : NULL;
        $tertiary_evaluator = $u->secondary_evaluator != NULL ? intval($u->tertiary_evaluator) : NULL;
        $status = 1;

        try {

            $this->setStatement("BEGIN;
    
            INSERT INTO hr_users (employee_id, salutation, last_name, first_name, middle_name, suffix, nickname, company, department, team, 
            job_description, contract_type, contact_no, address, primary_evaluator, secondary_evaluator, tertiary_evaluator, 
            employment_category, nationality, hire_date) 
            VALUES (:employee_ID, :salutation, :last_name,:first_name, :middle_name, :suffix,
            :nickname, :company_ID, :department_ID, :team, :job_description, :contract_type, :contact_no,
            :address, :primary_evaluator, :secondary_evaluator, :tertiary_evaluator, :employment_type, :nationality,:hire_date);
            SET @generated_id = LAST_INSERT_ID();
            INSERT INTO hr_user_accounts (users_id, username, password, email_address, user_type, user_status, account_status) 
            VALUES (@generated_id, :username, :password, :email, :user_type, :user_status, :account_status);
            
            COMMIT;");
            if ($this->statement->execute([
                ':employee_ID' => $employee_ID,
                ':salutation' => $salutation,
                ':last_name' => $u->last_name,
                ':first_name' => $u->first_name,
                ':middle_name' => $u->middle_name,
                ':suffix' => $u->suffix,
                ':nickname' =>  $u->nickname,
                ':company_ID' => $company_ID,
                ':department_ID' => $department_ID,
                ':team' => $u->team,
                ':job_description' => $u->job_description,
                ':contract_type' => $u->contract_type,
                ':contact_no' => $u->contact_no,
                ':address' => $u->address,
                ':primary_evaluator' => $primary_evaluator,
                ':secondary_evaluator' => $secondary_evaluator,
                ':tertiary_evaluator' => $tertiary_evaluator,
                ':employment_type' => $employment_type,
                ':nationality' => $u->nationality,
                ':hire_date' =>  $u->hire_date,
                ':username' => $u->username,
                ':password' => $password,
                ':email' => $u->email,
                ':user_type' => $job_level,
                ':user_status' => $status,
                ':account_status' =>  $status,
            ])) {
                return 1;
            } else {
                return 0;
            }
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }
    function updateAcc($supervisor_id, $imm_supp_id, $lName, $fName, $mName, $compID, $deptID, $salutation, $contactNo, $address, $jobDesc, $uStatus, $user_id)
    {
        $this->setStatement("UPDATE `hr_users` SET `supervisor_id`= :supervisor,`immediate_supervisor_id`= :immsupervisor,`salutation`= :salutation,`last_name`= :lastname,`first_name`= :firstname,`middle_name`= :middlename,`company_id`= :companyid,`department_id`= :departmentid ,`user_status`= :userstatus,`job_description`= :jobdesc,`contact_no`= :contactno,`address`= :address WHERE `users_id` = :user_id");

        // Update the number of values being passed in the execute function to match the number of placeholders in your SQL statement
        return $this->statement->execute([
            ':supervisor' => $supervisor_id,
            ':immsupervisor' => $imm_supp_id,
            ':lastname' => $lName,
            ':firstname' => $fName,
            ':middlename' => $mName,
            ':companyid' => $compID,
            ':departmentid' => $deptID,
            ':salutation' => $salutation,
            ':contactno' => $contactNo,
            ':address' => $address,
            ':jobdesc' => $jobDesc,
            ':userstatus' => $uStatus,
            ':user_id' => $user_id
        ]);
    }
    function insertPicture($user_id, $imageURL)
    {
        $this->setStatement("UPDATE `hr_users` set picture = :url WHERE users_id = :user_id");
        $this->statement->execute([':url' => $imageURL, ':user_id' => $user_id]);
        return true;
    }
    function retrieveSuperAdmin()
    {
        $usertype = 1;
        $this->setStatement("SELECT * FROM `hr_users` WHERE user_type = ?");
        $this->statement->execute([$usertype]);
        return $this->statement->fetch();
    }
    function insertNewUserType($userTypeDesc)
    {
        $this->setStatement("INSERT into `hr_usertype` (user_type_description) values (:userTypeDesc)");
        if ($this->statement->execute([':userTypeDesc' => $userTypeDesc])) {
            return $this->connection->lastInsertId();
        }
    }
    function updateUserType($userType, $userTypeDesc)
    {
        $this->setStatement("UPDATE `hr_usertype` SET user_type_description = :userTypeDesc WHERE user_type = :usertype");
        $this->statement->execute([':usertype' => $userType, ':userTypeDesc' => $userTypeDesc]);
        return $this->statement->fetchAll();
    }
    function updateUserRole($userID, $roleID)
    {
        $this->setStatement("UPDATE `hr_users` SET user_type = ? WHERE users_id = ?");
        return $this->statement->execute([$roleID, $userID]);
    }
    function removeUserRole($user_id)
    {
        $this->setStatement("UPDATE `hr_users` SET user_type = 0 WHERE users_id = ?");
        return $this->statement->execute([$user_id]);
    }
    function deleteRole($role_id)
    {
        $this->setStatement("DELETE FROM `hr_usertype` WHERE user_type = ?");
        if ($this->statement->execute([$role_id])) {
            $this->setStatement("UPDATE `hr_users` SET user_type = 0 WHERE user_type = ?");
            return $this->statement->execute([$role_id]);
        }
    }
    function getEmployeesForEvaluation($contract)
    {
        $this->setStatement("SELECT a.username, a.email_address, a.user_type, i.* FROM hr_user_accounts as a JOIN hr_users i ON a.users_id = i.users_id LEFT JOIN hr_eval_form ef ON ef.users_id = a.users_id LEFT JOIN hr_eval_form_fp fp ON fp.eval_form_id = ef.hr_eval_form_id WHERE i.contract_type = ? AND i.hire_date <= CONCAT(YEAR(CURRENT_DATE()), '-09-30')");
        $this->statement->execute([$contract]);
        return $this->statement->fetchAll();
    }
    function getEmployeesForConsultation()
    {
        $this->setStatement("SELECT a.username, a.email_address, a.user_type, i.* FROM hr_user_accounts as a JOIN hr_users i ON a.users_id = i.users_id  WHERE i.request_consult IS NOT NULL");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function getEmployeeGroupForConsultation($request)
    {
        $this->setStatement("SELECT a.username, a.email_address, a.user_type, i.* FROM hr_user_accounts as a JOIN hr_users i ON a.users_id = i.users_id  WHERE i.request_consult = ?");
        $this->statement->execute([$request]);
        return $this->statement->fetchAll();
    }
    function getEmployeesForRegularization()
    {
        $this->setStatement("SELECT a.username, a.email_address, a.user_type, i.* FROM hr_user_accounts as a JOIN hr_users i ON a.users_id = i.users_id  WHERE i.for_regularization = 1");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function getEmployeesWithoutGoals()
    {
        $this->setStatement("SELECT a.username, a.email_address, a.user_type, i.* FROM hr_user_accounts as a 
        JOIN hr_users i ON a.users_id = i.users_id
        LEFT JOIN hr_eval_form as e ON a.users_id = e.users_id
        WHERE e.users_id IS NULL");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function getEmployeesWithApprovedMetrics()
    {
        $this->setStatement("SELECT a.username, a.email_address, a.user_type, i.* FROM hr_user_accounts as a 
        JOIN hr_users i ON a.users_id = i.users_id
        LEFT JOIN hr_eval_form e ON a.users_id = e.users_id
        LEFT JOIN hr_eval_form_fp as fp ON fp.eval_form_id = e.hr_eval_form_id
        WHERE fp.created_by IS NOT NULL AND fp.approved_by IS NOT NULL");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
}
