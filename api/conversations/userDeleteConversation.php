<?php
header("Access-Control-Allow-Origin: *");
require_once '../../config/conversationController.php';
$conversation = new Conversation();

if (isset($_POST['submit'])) {
    if(isset($_POST['convo_id'])){
        $convo_id = $_POST['convo_id'];
        $employee_name = $_POST['employee_name'];
        $result = $conversation->deleteConversation($convo_id);
        if($result){
            echo "The conversation with " . $employee_name . " has been deleted";
        }
    }
}
