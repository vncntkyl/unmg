<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$submitDiscussion = new Form();
if (isset($_POST['submit'])) {
    if (isset($_POST['employee_id'])) {
        $employee_id = $_POST['employee_id'];
        $convo_id = $_POST['convo_id'];
        $new_message = $_POST['newMessage'];
        $file_name = $_POST['file_name'];
        $file_type = $_POST['file_type'];
        if ($file_name == "" || $file_type == null) {
            $file_name = null;
            $file_type = null;
        } else {
            $fileType = explode(',', $file_type);
            $fileName = explode(',', $file_name);
        }
        if ($new_message != null) {
            $result = $submitDiscussion->insertNewMessage($employee_id, $convo_id, $message_type = 1, $new_message);
        }
        if ($file_name != null && $file_type != null) {
            foreach ($fileName as $index => $file) {
                $message_type = 0;
                if (isset($fileType[$index])) {
                    switch ($fileType[$index]) {
                        case "image":
                            $message_type = 2;
                            break;
                        case "video":
                            $message_type = 3;
                            break;
                        case "audio":
                            $message_type = 4;
                            break;
                        case "application":
                            $message_type = 5;
                            break;
                        default:
                            $message_type = 1;
                            break;
                    }
                }
                $res = $submitDiscussion->insertMessage($convo_id, $employee_id, $message_type, $file);
            }
        }
    }
}
