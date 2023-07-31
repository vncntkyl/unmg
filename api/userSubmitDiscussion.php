<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$submitDiscussion = new Form();
if(isset($_POST['submit'])){
if(isset($_POST['employee_id'])){
    $employee_id = $_POST['employee_id'];
    $first_name = $_POST['first_name'];
    $subject = $_POST['subject'];
    $description = $_POST['description'];
    $result = $submitDiscussion->insertDiscussion($subject, $description);

    if($result)
    {
        $ID = $result;
        $updateUser = $submitDiscussion->updateUserRequestConsultation($ID, $employee_id);
        if($updateUser)
        {
            echo "A 1 on 1 disscussion with ".$first_name." has been sent!";
        }
        else
        {
            echo "error";
        }
    }
    else
    {
        echo "error";
    }
}
}