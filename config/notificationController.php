<?php
require_once 'controller.php';
class Notification extends Controller
{
  function retrieveNotifications ($employee_id){
    $this->setStatement("SELECT * FROM `hr_notifications` WHERE employee_id = :employee_id AND deleted = 0");
    $this->statement->execute([':employee_id' => $employee_id]);
    return $this->statement->fetchAll();
  }
}