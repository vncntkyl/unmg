<?php
date_default_timezone_set('Asia/Manila');

$receipient = "Mr. Michael Ramilo";
$sampleMessage = "One of your employees has just submitted their goals. Let's take a look at the details below.";
$linkMessage = "Check it now!";
$link = "https://www.linkedin.com/in/vncntkyl/";
$employee_name = "Vincent Kyle Riñoza";
$date = date("F j, Y H:i:s A");

$to_email = "kyle.rinoza2009@gmail.com";
$subject = "United Neon Performance Management System";
$message = file_get_contents("email_template.php");

$message = str_replace('{receipient}', $receipient, $message);
$message = str_replace('{message}', $sampleMessage, $message);
$message = str_replace('{link}', $link, $message);
$message = str_replace('{link_message}', $linkMessage, $message);
$message = str_replace('{employee_name}', $employee_name, $message);
$message = str_replace('{date_submitted}', $date, $message);

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: penthoughts.blog@gmail.com\r\n";

if (mail($to_email, $subject, $message, $headers)) {
    echo "Email successfully sent to $to_email...";
} else {
    echo "Email sending failed...";
}
