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
        $this->setStatement("SELECT a.username, a.email_address, a.user_type, i.* FROM hr_user_accounts as a JOIN hr_users i ON a.users_id = i.users_id WHERE i.users_id != 1");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function retrieveUsersByContract($contractID)
    {
        $this->setStatement("SELECT a.username, a.email_address, a.user_type, i.* FROM hr_user_accounts as a JOIN hr_users i ON a.users_id = i.users_id WHERE user_status = ? WHERE i.users_id != 1");
        $this->statement->execute([$contractID]);
        return $this->statement->fetchAll();
    }

    function retrieveHeadUsers()
    {
        $this->setStatement("SELECT u.users_id, u.employee_id, CONCAT(u.last_name, ', ', u.first_name, ' ', LEFT(u.middle_name, 1), '.') AS full_name, a.user_type
        FROM hr_users u LEFT JOIN hr_user_accounts a ON u.users_id = a.users_id
        WHERE a.user_type != 6 AND u.users_id != 1");
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
    function checkUser($employeeID)
    {
        $this->setStatement("SELECT * FROM hr_users WHERE employee_id = ?");
        $this->statement->execute([$employeeID]);
        return $this->statement->rowCount();
    }
    function insertAcc($first_name, $middle_name, $last_name, $suffix, $nickname, $salutations, $contact_no, $address, $nationality, $employee_ID, $company_ID, $department_ID, $team, $job_description, $employment_type, $contract_type, $hire_date, $primary_evaluator, $secondary_evaluator, $tertiary_evaluator)
    {
        $this->setStatement("INSERT INTO hr_users  (employee_id, salutation, last_name, first_name, middle_name, suffix, nickname, company, department, team, job_description, contract_type, contact_no, address, primary_evaluator, secondary_evaluator, tertiary_evaluator, employment_category, nationality, hire_date)
                                            VALUES (:employee_ID, :salutation, :last_name, :first_name, :middle_name, :suffix, :nickname, :company_ID, :department_ID, :team, :job_description, :contract_type, :contact_no, :address, :primary_evaluator, :secondary_evaluator, :tertiary_evaluator, :employment_type, :nationality, :hire_date)");
        $this->statement->execute([
            ':employee_ID' => $employee_ID,
            ':salutation' => $salutations,
            ':last_name' =>  $last_name,
            ':first_name' =>  $first_name,
            ':middle_name' => $middle_name,
            ':suffix' => $suffix,
            ':nickname' =>  $nickname,
            ':company_ID' => $company_ID,
            ':department_ID' => $department_ID,
            ':team' => $team,
            ':job_description' => $job_description,
            ':contract_type' => $contract_type,
            ':contact_no' => $contact_no,
            ':address' => $address,
            ':primary_evaluator' => $primary_evaluator == "" ? null : $primary_evaluator,
            ':secondary_evaluator' => $secondary_evaluator == "" ? null : $secondary_evaluator,
            ':tertiary_evaluator' => $tertiary_evaluator == "" ? null : $tertiary_evaluator,
            ':employment_type' => $employment_type,
            ':nationality' => $nationality,
            ':hire_date' => $hire_date
        ]);
        return $this->connection->lastInsertId();
    }
    function insertAcc1($user_id, $username, $password, $email, $job_level)
    {
        $this->setStatement("INSERT INTO hr_user_accounts (users_id, username, password, email_address, user_type, user_status, account_status) 
                                                VALUES (:users_id, :username, :password, :email, :user_type, :user_status, :account_status)");
        $process = $this->statement->execute([
            ':users_id' => $user_id,
            ':username' => $username,
            ':password' => $password,
            ':email' => $email,
            ':user_type' => $job_level,
            ':user_status' => "active",
            ':account_status' => "active"
        ]);
        if ($process) {
            return "success";
        }
    }

    function updateAcc($user_id, $first_name, $middle_name, $last_name, $suffix, $nickname, $salutations, $contact_no, $address, $nationality, $employee_ID, $company_ID, $department_ID, $team, $job_description, $employment_type, $contract_type, $hire_date, $primary_evaluator, $secondary_evaluator, $tertiary_evaluator)
    {
        $this->setStatement("UPDATE hr_users SET 
        employee_id = :employee_id, 
        salutation = :salutation, 
        last_name = :last_name, 
        first_name = :first_name, 
        middle_name = :middle_name, 
        suffix = :suffix, 
        nickname = :nickname, 
        company = :company_id, 
        department = :department_id, 
        team = :team, 
        job_description = :job_description, 
        contract_type = :contract_type, 
        contact_no = :contact_no, 
        address = :address, 
        primary_evaluator = :primary_evaluator,
        secondary_evaluator = :secondary_evaluator, 
        tertiary_evaluator = :tertiary_evaluator,
        employment_category = :employment_category,
        nationality = :nationality,
        hire_date = :hire_date
        WHERE users_id = :user_id");

        $process = $this->statement->execute([
            ':employee_id' => $employee_ID,
            ':salutation' => $salutations,
            ':last_name' =>  $last_name,
            ':first_name' =>  $first_name,
            ':middle_name' => $middle_name,
            ':suffix' => $suffix,
            ':nickname' =>  $nickname,
            ':company_id' => $company_ID,
            ':department_id' => $department_ID,
            ':team' => $team,
            ':job_description' => $job_description,
            ':contract_type' => $contract_type,
            ':contact_no' => $contact_no,
            ':address' => $address,
            ':primary_evaluator' => $primary_evaluator,
            ':secondary_evaluator' => $secondary_evaluator == "" ? null : $secondary_evaluator,
            ':tertiary_evaluator' => $tertiary_evaluator == "" ? null : $tertiary_evaluator,
            ':employment_category' => $employment_type == "" ? null : $employment_type,
            ':nationality' => $nationality,
            ':hire_date' => $hire_date,
            ':user_id' => $user_id
        ]);
        if($process){
            return "success";
        }
    }
    function updateAcc1($user_id, $username, $email, $job_level){
        $this->setStatement("UPDATE hr_user_accounts SET username = :username, email_address = :email, user_type = :user_type WHERE users_id = :user_id");
        $process = $this->statement->execute([
            ':username' => $username,
            ':email' => $email,
            ':user_type' => $job_level,
            ':user_id' => $user_id
        ]);
        if($process){
            return "success";
        }
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
        $this->setStatement("SELECT * FROM `hr_user_accounts` WHERE user_type = ?");
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
        $this->setStatement("SELECT a.username, a.email_address, a.user_type, i.* FROM hr_user_accounts as a JOIN hr_users i ON a.users_id = i.users_id LEFT JOIN hr_eval_form ef ON ef.users_id = a.users_id LEFT JOIN hr_eval_form_fp fp ON fp.eval_form_id = ef.hr_eval_form_id WHERE i.contract_type = ? AND i.hire_date <= CONCAT(YEAR(CURRENT_DATE()), '-09-30') AND i.users_id != 1");
        $this->statement->execute([$contract]);
        return $this->statement->fetchAll();
    }
    function getEmployeesForConsultation()
    {
        $this->setStatement("SELECT a.username, a.email_address, a.user_type, i.* FROM hr_user_accounts as a JOIN hr_users i ON a.users_id = i.users_id  WHERE i.request_consult IS NOT NULL AND i.users_id != 1");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function getEmployeeGroupForConsultation($request)
    {
        $this->setStatement("SELECT a.username, a.email_address, a.user_type, i.* FROM hr_user_accounts as a JOIN hr_users i ON a.users_id = i.users_id  WHERE i.request_consult = ? AND i.users_id != 1");
        $this->statement->execute([$request]);
        return $this->statement->fetchAll();
    }
    function getEmployeesForRegularization()
    {
        $this->setStatement("SELECT a.username, a.email_address, a.user_type, i.* FROM hr_user_accounts as a JOIN hr_users i ON a.users_id = i.users_id  WHERE i.for_regularization = 1 AND i.users_id != 1");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function getEmployeesWithoutGoals()
    {
        $this->setStatement("SELECT a.username, a.email_address, a.user_type, i.* FROM hr_user_accounts as a 
        JOIN hr_users i ON a.users_id = i.users_id
        LEFT JOIN hr_eval_form as e ON a.users_id = e.users_id
        WHERE e.users_id IS NULL AND i.users_id != 1");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function getEmployeesWithApprovedMetrics()
    {
        $this->setStatement("SELECT a.username, a.email_address, a.user_type, i.* FROM hr_user_accounts as a 
        JOIN hr_users i ON a.users_id = i.users_id
        LEFT JOIN hr_eval_form e ON a.users_id = e.users_id
        LEFT JOIN hr_eval_form_fp as fp ON fp.eval_form_id = e.hr_eval_form_id
        WHERE fp.created_by IS NOT NULL AND fp.approved_by IS NOT NULL AND i.users_id != 1");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }

    function countEmployeesByContract()
    {
        $this->setStatement('SELECT 
        COUNT(CASE WHEN contract_type = "regular" THEN 1 END) AS regular,
        COUNT(CASE WHEN contract_type = "probationary" THEN 1 END) AS probationary,
        COUNT(CASE WHEN contract_type = "project based" THEN 1 END) AS project_based,
        COUNT(CASE WHEN contract_type = "consultant" THEN 1 END) AS consultant 
        FROM 
        (SELECT * FROM hr_users WHERE users_id != 1)  AS subquery');
        $this->statement->execute();
        return $this->statement->fetch();
    }
    function getEmployeeGrades()
    {
        $this->setStatement("SELECT 
            CONCAT(last_name, ', ', ' ', first_name, 
            IF(LENGTH(middle_name) > 0, CONCAT(' ', SUBSTRING(middle_name, 1, 1), '.'), '')
            ) AS name,
            (DAY(hire_date) / 31 * 4) AS grade 
            FROM 
                hr_users 
            WHERE 
                users_id != 1;");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
}
