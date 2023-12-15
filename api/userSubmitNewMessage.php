<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$submitDiscussion = new Form();
if (isset($_POST['submit'])) {
    if (isset($_POST['employee_id'])) {
        $employee_id = $_POST['employee_id'];
        $convo_id = $_POST['convo_id'];
        $new_message = $_POST['newMessage'];
        $result = $submitDiscussion->insertNewMessage($employee_id, $convo_id, $new_message);
    }
}
