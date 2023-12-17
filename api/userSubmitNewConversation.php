<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$submitInbox = new Form();

if (isset($_POST['submit'])) {
    $user_id = $_POST['user_id'];
    $receiver_id = $_POST['rec'];
    $convo_type = $_POST['convo_type'];
    $selected_quarter = $_POST['selected_quarter'];
    $selected_coach = $_POST['selected_coaching'];
    $convo_agenda = $_POST['convo_agenda'];
    $convo_message = $_POST['convo_message'];
    $convo_file_type = $_POST['convo_file_type'];
    $convo_file = $_POST['convo_file'];
    if ($convo_file_type == '' || $convo_file == null) {
        $convo_file_type = null;
        $convo_file = null;
    } else {
        $convoFileType = explode(',', $convo_file_type);
        $convoFile = explode(',', $convo_file);
    }
    $see_admin = $_POST['see_admin'];
    $inbox = $submitInbox->insertNewConversation($user_id, $convo_type, $selected_quarter, $selected_coach, $convo_agenda, $convo_message, $see_admin);
    if ($inbox) {
        $participants1 = $submitInbox->insertParticipantConversation($inbox, $user_id);
        $participants2 = $submitInbox->insertParticipantConversation($inbox, $receiver_id);
        if ($participants1 && $participants2) {
            $message = $submitInbox->insertMessage($inbox, $user_id, $message_type = 1, $convo_message);
            if ($message) {
                if ($convo_file != null && $convo_file_type != null) {
                    foreach ($convoFile as $index => $file) {
                        $message_type = 0;
                        if (isset($convoFileType[$index])) {
                            switch ($convoFileType[$index]) {
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
                        $res = $submitInbox->insertMessage($inbox, $user_id, $message_type, $file);
                    }
                    if ($res) {
                        echo "Success";
                    } else {
                        echo "error";
                    }
                } else{
                    echo "Success";
                }
            } else {
                echo "error";
            }
        } else {
            echo "error";
        }
    } else {
        echo "error";
    }
}
