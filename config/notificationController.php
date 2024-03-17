<?php
require_once 'controller.php';
class Notification extends Controller
{
  function retrieveNotifications($employee_id)
  {
    $this->setStatement("SELECT * FROM `hr_notifications` WHERE employee_id = :employee_id AND deleted = 0 ORDER BY ID   DESC");
    $this->statement->execute([':employee_id' => $employee_id]);
    return $this->statement->fetchAll();
  }
  // function countNotifications($employee_id){
  //   $this->setStatement("SELECT * FROM `hr_notifications` WHERE employee_id = :employee_id AND deleted = 0");
  //   $this->statement->execute([':employee_id' => $employee_id]);
  //   return $this->statement->rowCount();
  // }
  function addUserNotification($employee_ID, $title, $message, $link)
  {
    $this->setStatement("INSERT INTO `hr_notifications` (employee_id, title, message, link, seen, deleted, creation_date) VALUES (:employee_ID, :title, :message, :link, 0, 0, :creation_date)");
    $process = $this->statement->execute([':employee_ID' => $employee_ID, ':title' => $title, ':message' => $message, ':link' => $link, ':creation_date' => date('Y-m-d H:i:s')]);
    if ($process) {
      return "success";
    }
  }
  function updateUserNotification($employee_ID, $title, $message, $link)
  {
    $this->setStatement("INSERT INTO `hr_notifications` (employee_id, title, message, link, seen, deleted, creation_date) VALUES (:employee_ID, :title, :message, :link, 0, 0, :creation_date)");
    $process = $this->statement->execute([':employee_ID' => $employee_ID, ':title' => $title, ':message' => $message, ':link' => $link, ':creation_date' => date('Y-m-d H:i:s')]);
    if ($process) {
      return "success";
    }
  }

  function fetchRaters($employee_id)
  {
    $this->setStatement("SELECT primary_evaluator AS evaluator
    FROM hr_users
    WHERE employee_id = :employee_id
    UNION
    SELECT secondary_evaluator AS evaluator
    FROM hr_users
    WHERE employee_id = :employee_id
    UNION
    SELECT tertiary_evaluator AS evaluator
    FROM hr_users
    WHERE employee_id = :employee_id");
    $this->statement->execute([':employee_id' => $employee_id]);
    return $this->statement->fetchAll();
  }

  function addGoalNotification($employee_ID, $title, $message, $link)
  {
    $this->setStatement("INSERT INTO hr_notifications (employee_id, title, message, link, seen, deleted, creation_date) VALUES (:employee_ID, :title, :message, :link, 0, 0, :creation_date)");
    $process = $this->statement->execute([':employee_ID' => $employee_ID, ':title' => $title, ':message' => $message, ':link' => $link, ':creation_date' => date('Y-m-d H:i:s')]);
    if ($process) {
      return "success";
    }
  }
  function addEmployeeGoalNotification($user_id, $title, $message, $link)
  {
    $this->setStatement("DECLARE @employee_id INT;
    SELECT @employee_id = employee_id
    FROM hr_users
    WHERE users_id = :user_id;
    INSERT INTO hr_notifications (employee_id, title, message, link, seen, deleted, creation_date)
    VALUES (@employee_id, :title, :message, :link, 0, 0, :creation_date)");
    $process = $this->statement->execute([':user_id' => $user_id, ':title' => $title, ':message' => $message, ':link' => $link, ':creation_date' => date('Y-m-d H:i:s')]);
    if ($process) {
      return "success";
    }
  }
}
