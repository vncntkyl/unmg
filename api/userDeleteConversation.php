<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$deleteConversation = new Form();

if (isset($_POST['submit'])) {
    if(isset($_POST['convo_id'])){
        $convo_id = $_POST['convo_id'];
        $employee_name = $_POST['employee_name'];
        $result = $deleteConversation->deleteConversation($convo_id);
        if($result){
            echo "The conversation with " . $employee_name . " has been deleted";
        }
    }
}
