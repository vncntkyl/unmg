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
    
    function retrieveSupervisor()
    {
        $this->setStatement("SELECT last_name,first_name,middle_name FROM `hr_users` WHERE user_type= '5'");
        $this->statement->execute();
        return $this->statement->fetchAll(); 
    }
    function retrieveImmSupervisor()
    {
        $this->setStatement("SELECT last_name,first_name,middle_name FROM `hr_users` WHERE user_type= '6'");
        $this->statement->execute();
        return $this->statement->fetchAll(); 
    }
    function deactivateAcc($uID)
    {
        $this->setStatement("UPDATE `hr_users` SET inactive = '1' WHERE users_id=':uID'");
        $this->statement->execute([':uID' => $uID]);
        return true;
    }
    function deleteAcc($uID)
    {
        $this->setStatement("UPDATE `hr_users` SET deleted = '1' WHERE users_id=':uID'");
        $this->statement->execute([':uID' => $uID]);
        return true;
    }
    function insertAcc($supervisor_id,$imm_supp_id,$lName,$fName,$mName,$compID,$deptID,$salutation,$email,$contactNo,$address,$uName,$pass,$jobDesc,$uType,$uStatus)
    {
        $this->setStatement("INSERT into `hr_users` (supervisor_id,immediate_supervisor,last_name,first_name,middle_name,company_id,department_id,salutation,email,contact_no,address,username,password,job_description,user_type,user_status) VALUES (:supervisor,:immsupervisor,:lastname,:firstname,:middlename,:companyid,:departmentid,:salutation,:email,:contactno,:address,:username,:password,:jobdesc,:usertype,:userstatus)'");
        $this->statement->execute([':supervisor' => $supervisor_id, ':immsupervisor' => $imm_supp_id, ':lastname' => $lName, ':firstname' => $fName, ':middlename' => $mName, ':companyid' => $compID, ':departmentid' => $dept_id, ':salutation' => $salutation, ':email' => $email, ':contactno' => $contactNo, ':address' => $address, ':username' => $uName, ':password' => $pass, ':jobdesc' => $jobDesc, ':usertype' => $uType, ':userstatus' => $uStatus]);
        return true;
    }
    function updateAcc($supervisor_id,$imm_supp_id,$lName,$fName,$mName,$compID,$deptID,$salutation,$email,$contactNo,$address,$uName,$pass,$jobDesc,$uType,$uStatus)
    {
        $this->setStatement("UPDATE `hr_users` set supervisor_id = ':supervisor', immediate_supervisor = ':immsupervisor', last_name = ':lastname', first_name = ':firstname', middle_name = ':middlename', company_id = ':companyid', department_id =':departmentid', salutation = ':salutation' ,contactNo = ':contactno', address = ':address', job_description = ':jobdesc', user_type = ':usertype', user_status = ':usertype'");
        $this->statement->execute([':supervisor' => $supervisor_id, ':immsupervisor' => $imm_supp_id, ':lastname' => $lName, ':firstname' => $fName, ':middlename' => $mName, ':companyid' => $compID, ':departmentid' => $dept_id, ':salutation' => $salutation, ':contactno' => $contactNo, ':address' => $address, ':jobdesc' => $jobDesc, ':usertype' => $uType, ':userstatus' => $uStatus]);
        return true;
    }
}
?>