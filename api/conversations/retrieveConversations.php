<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');
require_once '../../config/conversationController.php';
$conversation = new Conversation();
if (isset($_GET['convo_type']) && isset($_GET['user_id'])) {
    $view_type = $_GET['view_type'];
    $convo_type = $_GET['convo_type'];
    $user_id = $_GET['user_id'];
    if ($view_type == '3'){
        echo json_encode($conversation->selectAllEmployeeConversations($convo_type));
    }
    else if ($view_type == '2'){
        echo json_encode($conversation->selectEmployeeConversations($user_id, $convo_type));
    }
    else{
        echo json_encode($conversation->selectConversations($user_id, $convo_type));
    }
}
