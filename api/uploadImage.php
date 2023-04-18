<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
session_start();
require "../config/userController.php";
$user = new User();

if (isset($_FILES["imageFile"]) && $_FILES["imageFile"]["error"] === UPLOAD_ERR_OK) {
    $file = $_FILES["imageFile"];

    // Get file information
    $fileName = $file["name"];
    $fileTmpName = $file["tmp_name"];
    $fileSize = $file["size"];
    $fileType = $file["type"];

    $targetPath = $_POST['imageURL'];
    if (move_uploaded_file($fileTmpName, $targetPath)) {
      
        if($user->insertPicture($_POST['user_id'],$targetPath)){
            echo "success";
        }
    } else {
      echo "Failed to upload file.";
    }
  } else {
    echo "Error uploading file: " . $_FILES["imageFile"]["error"];
  }
?>