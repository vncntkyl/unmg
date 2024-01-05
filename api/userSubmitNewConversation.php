<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$submitInbox = new Form();

if (isset($_POST['submit'])) {
    if (isset($_POST['user_id'])) {
        $user_id = $_POST['user_id'];
        $receiver_id = $_POST['rec'];
        $convo_type = $_POST['convo_type'];
        $selected_quarter = $_POST['selected_quarter'];
        $selected_coach = $_POST['selected_coaching'];
        $convo_agenda = $_POST['convo_agenda'];
        $convo_message = $_POST['convo_message'];
        $convo_file_type = $_POST['convo_file_type'];
        $convo_file = $_POST['convo_file'];
        $see_admin = 2;
        $rater_access = 2;

        if ($convo_message != null) {
            $inbox = $submitInbox->insertNewConversation($user_id, $receiver_id, $convo_type, $selected_quarter, $selected_coach, $convo_agenda, $convo_message, $see_admin, $rater_access);
            if ($inbox) {
                // $participants1 = $submitInbox->insertParticipantConversation($inbox, $user_id);
                // $participants2 = $submitInbox->insertParticipantConversation($inbox, $receiver_id);
                // if ($participants1 && $participants2) {
                    $message = $submitInbox->insertMessage($inbox, $user_id, $message_type = 1, $convo_message);
                    if ($message) {
                        if (isset($_FILES['file'])) {
                            $fileCount = count($_FILES['file']['name']);
                            for ($i = 0; $i < $fileCount; $i++) {
                                $filename = $_FILES['file']['name'][$i];
                                $filetempname = $_FILES['file']['tmp_name'][$i];
                                $message_type = 0;
                                $filetype = explode('/', $_FILES['file']['type'][$i]);
                                switch ($filetype[0]) {
                                    case "image":
                                        $target_dirserve = "./../media/image/";
                                        $message_type = 2;
                                        break;
                                    case "video":
                                        $target_dirserve = "./../media/video/";
                                        $message_type = 3;
                                        break;
                                    case "audio":
                                        $target_dirserve = "./../media/audio/";
                                        $message_type = 4;
                                        break;
                                    case "application":
                                        $target_dirserve = "./../media/file/";
                                        $message_type = 5;
                                        break;
                                    default:
                                        $target_dirserve = "";
                                        $message_type = 1;
                                        break;
                                }
                                $target_fileserve = $target_dirserve . basename($filename);
                                $imageFileTypeserve = strtolower(pathinfo($target_fileserve, PATHINFO_EXTENSION));
                                $fullpath = $target_dirserve . $filename;
                                $file_info = pathinfo($fullpath);
                                $file = $file_info['filename'];
                                $count = 1;
                                while (file_exists($fullpath)) {
                                    $info = pathinfo($fullpath);
                                    $fullpath = $info['dirname'] . '/' . $file . ' (' . $count++ . ')' . '.' . $info['extension'];
                                }
                                $final_name = pathinfo($fullpath, PATHINFO_FILENAME) . "." . pathinfo($fullpath, PATHINFO_EXTENSION);
                                if (move_uploaded_file($filetempname, $fullpath)) {
                                    $res = $submitInbox->insertMessage($inbox, $user_id, $message_type, $final_name);
                                }
                            }
                            if ($res) {
                                echo "Success";
                            } else {
                                echo "error";
                            }
                        } else if (!isset($_FILES['file'])) {
                            echo "Success";
                        } else {
                            echo "error";
                        }
                    } else {
                        echo "error";
                    }
                // } else {
                //     echo "error";
                // }
            } else {
                echo "error";
            }
        } else {
            echo "error";
        }
    } else {
        echo "error";
    }
    // $user_id = $_POST['user_id'];
    // $receiver_id = $_POST['rec'];
    // $convo_type = $_POST['convo_type'];
    // $selected_quarter = $_POST['selected_quarter'];
    // $selected_coach = $_POST['selected_coaching'];
    // $convo_agenda = $_POST['convo_agenda'];
    // $convo_message = $_POST['convo_message'];
    // $convo_file_type = $_POST['convo_file_type'];
    // $convo_file = $_POST['convo_file'];
    // if ($convo_file_type == '' || $convo_file == null) {
    //     $convo_file_type = null;
    //     $convo_file = null;
    // } else {
    //     $convoFileType = explode(',', $convo_file_type);
    //     $convoFile = explode(',', $convo_file);
    // }
    // $see_admin = $_POST['see_admin'];
    // $inbox = $submitInbox->insertNewConversation($user_id, $convo_type, $selected_quarter, $selected_coach, $convo_agenda, $convo_message, $see_admin);
    // if ($inbox) {
    //     $participants1 = $submitInbox->insertParticipantConversation($inbox, $user_id);
    //     $participants2 = $submitInbox->insertParticipantConversation($inbox, $receiver_id);
    //     if ($participants1 && $participants2) {
    //         $message = $submitInbox->insertMessage($inbox, $user_id, $message_type = 1, $convo_message);
    //         if ($message) {
    //             if ($convo_file != null && $convo_file_type != null) {
    //                 foreach ($convoFile as $index => $file) {
    //                     $message_type = 0;
    //                     if (isset($convoFileType[$index])) {
    //                         switch ($convoFileType[$index]) {
    //                             case "image":
    //                                 $message_type = 2;
    //                                 break;
    //                             case "video":
    //                                 $message_type = 3;
    //                                 break;
    //                             case "audio":
    //                                 $message_type = 4;
    //                                 break;
    //                             case "application":
    //                                 $message_type = 5;
    //                                 break;
    //                             default:
    //                                 $message_type = 1;
    //                                 break;
    //                         }
    //                     }
    //                     $res = $submitInbox->insertMessage($inbox, $user_id, $message_type, $file);
    //                 }
    //                 if ($res) {
    //                     echo "Success";
    //                 } else {
    //                     echo "error";
    //                 }
    //             } else{
    //                 echo "Success";
    //             }
    //         } else {
    //             echo "error";
    //         }
    //     } else {
    //         echo "error";
    //     }
    // } else {
    //     echo "error";
    // }
} else {
    echo "error";
}
