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
    $convo_file = $_POST['convo_file'];
    $see_admin = $_POST['see_admin'];
    $inbox = $submitInbox->insertNewConversation($user_id, $convo_type, $selected_quarter, $selected_coach, $convo_agenda, $convo_message, $see_admin);
    if($inbox){
        $participants1 = $submitInbox->insertParticipantConversation($inbox, $user_id);
        $participants2 = $submitInbox->insertParticipantConversation($inbox, $receiver_id);
        if($participants1 && $participants2)
        {
            $message = $submitInbox->insertMessage($inbox, $user_id, $convo_message);
            if($message)
            {
                echo "You have submitted your conversation successfully!";
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
    else
    {
        echo "error";
    }

}
