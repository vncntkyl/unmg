<?php
require_once 'controller.php';
class User extends Controller
{
    function loginAccount($uName, $pWord)
    {
        $this->setStatement("SELECT * FROM `hr_users` WHERE username = :username AND password = :password");
        $this->statement->execute([':username' => $uName, ':password' => $pWord]);
        return $this->statement->fetch();
    }
    function retrieveUsers()
    {
        $this->setStatement("SELECT * FROM `hr_users`");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function retrieveRegularUsers()
    {
        $this->setStatement("SELECT * FROM `hr_users` WHERE user_status = 0");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function retrieveProbationaryUsers()
    {
        $this->setStatement("SELECT * FROM `hr_users` WHERE user_status = 1");
        $this->statement->execute();
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
        $this->setStatement("SELECT users_id, CONCAT(last_name, ', ', first_name, ' ', LEFT(middle_name, 1), '.') AS full_name, user_type
        FROM hr_users
        WHERE user_type = '5' || user_type = '6'");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }

    function retrieveUserTypes()
    {
        $this->setStatement("SELECT * FROM hr_usertype");
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
    function insertAcc($supervisor_id, $imm_supp_id, $lName, $fName, $mName, $compID, $deptID, $salutation, $email, $contactNo, $address, $uName, $pass, $jobDesc, $uStatus)
    {
        $this->setStatement("INSERT into `hr_users` (supervisor_id,immediate_supervisor_id,last_name,first_name,middle_name,company_id,department_id,salutation,email,contact_no,address,username,password,job_description,user_status) VALUES (:supervisor,:immsupervisor,:lastname,:firstname,:middlename,:companyid,:departmentid,:salutation,:email,:contactno,:address,:username,:password,:jobdesc,:userstatus)");
        return $this->statement->execute([':supervisor' => $supervisor_id, ':immsupervisor' => $imm_supp_id, ':lastname' => $lName, ':firstname' => $fName, ':middlename' => $mName, ':companyid' => $compID, ':departmentid' => $deptID, ':salutation' => $salutation, ':email' => $email, ':contactno' => $contactNo, ':address' => $address, ':username' => $uName, ':password' => $pass, ':jobdesc' => $jobDesc, ':userstatus' => $uStatus]);
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
}
?>