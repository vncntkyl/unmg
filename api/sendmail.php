<?php
date_default_timezone_set('Asia/Manila');


if (isset($_POST['sendNotification'])) {
    $status = array();
    $receipients = json_decode($_POST['receipients']);
    $linkMessage = $_POST['linkMessage'];
    $link = $_POST['link'];
    $employeeName = $_POST['employeeName'];
    $date = date("F j, Y H:i:s A");

    foreach ($receipients as $receipient) {
        $message = file_get_contents("email_template.php");
        $message = str_replace('{receipient}', $receipient->name, $message);
        if ($receipient->user_type === "employee") {
            $content = file_get_contents("employee_email.php");
        } else {
            $content = file_get_contents("superior_email.php");
        }
        $message = str_replace('{content}', $content, $message);
        $message = str_replace('{message}', $receipient->message, $message);
        $message = str_replace('{link}', $link, $message);
        $message = str_replace('{link_message}', $linkMessage, $message);
        $message = str_replace('{employee_name}', $employeeName, $message);
        $message = str_replace('{date_submitted}', $date, $message);

        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "From: no-reply@pms.unmg.com.ph\r\n";

        if (mail($receipient->email, $receipient->subject, $message, $headers)) {
            array_push($status, 1);
        } else {
            array_push($status, 0);
        }
    }
    if (in_array(0, $status)) {
        echo 0;
    } else {
        echo 1;
    }
}
