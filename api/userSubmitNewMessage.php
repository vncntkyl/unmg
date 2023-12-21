<?php
header("Access-Control-Allow-Origin: *");
require_once '../config/formController.php';
$submitDiscussion = new Form();
if (isset($_POST['submit'])) {
    if (isset($_POST['employee_id'])) {
        $employee_id = $_POST['employee_id'];
        $convo_id = $_POST['convo_id'];
        $new_message = $_POST['newMessage'];

        if ($new_message != null) {
            $result = $submitDiscussion->insertNewMessage($employee_id, $convo_id, $message_type = 1, $new_message);
        }
        if (isset($_FILES['file'])) {
            $fileCount = count($_FILES['file']['name']);
            for ($i = 0; $i < $fileCount; $i++) {
                $filename = $_FILES['file']['name'][$i];
                $filetempname = $_FILES['file']['tmp_name'][$i];
                $message_type = 0;
                $filetype = explode('/', $_FILES['file']['type'][$i]);
                switch ($filetype[0]) {
                    case "image":
                        $target_dirserve = "./../assets/messages/image/";
                        $message_type = 2;
                        break;
                    case "video":
                        $target_dirserve = "./../assets/messages/video/";
                        $message_type = 3;
                        break;
                    case "audio":
                        $target_dirserve = "./../assets/messages/audio/";
                        $message_type = 4;
                        break;
                    case "application":
                        $target_dirserve = "./../assets/messages/file/";
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
                if (move_uploaded_file($filetempname, $fullpath)){
                    $res = $submitDiscussion->insertMessage($convo_id, $employee_id, $message_type, $final_name);
                }
            }
        }
        // $employee_id = $_POST['employee_id'];
        // $convo_id = $_POST['convo_id'];
        // $new_message = $_POST['newMessage'];
        // $file_name = $_POST['file_name'];
        // $file_type = $_POST['file_type'];
        // if ($file_name == "" || $file_type == null) {
        //     $file_name = null;
        //     $file_type = null;
        // } else {
        //     $fileType = explode(',', $file_type);
        //     $fileName = explode(',', $file_name);
        // }
        // if ($new_message != null) {
        //     $result = $submitDiscussion->insertNewMessage($employee_id, $convo_id, $message_type = 1, $new_message);
        // }
        // if ($file_name != null && $file_type != null) {
        //     foreach ($fileName as $index => $file) {
        //         $message_type = 0;
        //         if (isset($fileType[$index])) {
        //             switch ($fileType[$index]) {
        //                 case "image":
        //                     $message_type = 2;
        //                     break;
        //                 case "video":
        //                     $message_type = 3;
        //                     break;
        //                 case "audio":
        //                     $message_type = 4;
        //                     break;
        //                 case "application":
        //                     $message_type = 5;
        //                     break;
        //                 default:
        //                     $message_type = 1;
        //                     break;
        //             }
        //         }
        //         $res = $submitDiscussion->insertMessage($convo_id, $employee_id, $message_type, $file);
        //     }
        // }
    }
}
