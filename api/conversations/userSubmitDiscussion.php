<?php
header("Access-Control-Allow-Origin: *");
require_once '../../config/conversationController.php';
$conversation = new Conversation();
if(isset($_POST['submit'])){
if(isset($_POST['employee_id'])){
    $employee_id = $_POST['employee_id'];
    $first_name = $_POST['first_name'];
    $subject = $_POST['subject'];
    $description = $_POST['description'];
    $result = $conversation->insertDiscussion($subject, $description);

    if($result)
    {
        $ID = $result;
        $updateUser = $conversation->updateUserRequestConsultation($ID, $employee_id);
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
