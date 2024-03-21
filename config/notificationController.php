<?php
require_once 'controller.php';
class Notification extends Controller
{
  function retrieveNotifications($employee_id)
  {
    $this->setStatement("
    SELECT 
    CASE
    WHEN hr_users.middle_name IS NOT NULL AND hr_users.middle_name <> '' THEN
        CONCAT(hr_users.first_name, ' ', SUBSTRING(hr_users.middle_name, 1, 1), '. ', hr_users.last_name)
    ELSE
        CONCAT(hr_users.first_name, ' ', hr_users.last_name)
    END AS sender_name,
    hr_notifications.* 
    FROM `hr_notifications`
    LEFT JOIN hr_users on hr_users.employee_id = hr_notifications.sender_id
    WHERE hr_notifications.employee_id = :employee_id 
    AND hr_notifications.deleted = 0 ORDER BY ID DESC");
    $this->statement->execute([':employee_id' => $employee_id]);
    return $this->statement->fetchAll();
  }

  function seenUserNotifications($notifID)
  {
    $this->setStatement("UPDATE hr_notifications SET seen = 1 WHERE ID = ?");
    $process = $this->statement->execute([$notifID]);
    if ($process) {
      return "success";
    }
  }
  function deleteUserNotifications($employee_ID)
  {
    $this->setStatement("UPDATE hr_notifications SET deleted = 1 WHERE employee_id = ?");
    $process = $this->statement->execute([$employee_ID]);
    if ($process) {
      return "success";
    }
  }
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
  function fetchGoalRaters($user_id)
  {
    $this->setStatement("SELECT primary_evaluator AS evaluator
    FROM hr_users
    WHERE employee_id = (SELECT employee_id FROM hr_users WHERE users_id = :user_id)
    UNION
    SELECT secondary_evaluator AS evaluator
    FROM hr_users
    WHERE employee_id = (SELECT employee_id FROM hr_users WHERE users_id = :user_id)
    UNION
    SELECT tertiary_evaluator AS evaluator
    FROM hr_users
    WHERE employee_id = (SELECT employee_id FROM hr_users WHERE users_id = :user_id)");
    $this->statement->execute([':user_id' => $user_id]);
    return $this->statement->fetchAll();
  }

  function addGoalNotification($creator_ID, $employee_ID, $title, $message, $link)
  {
    $this->setStatement("
    START TRANSACTION;
    SELECT employee_id INTO @creator_id FROM hr_users WHERE users_id = :user_id;
    INSERT INTO hr_notifications (sender_id, employee_id, title, message, link, seen, deleted, creation_date) 
    VALUES (@creator_id, :employee_ID, :title, :message, :link, 0, 0, :creation_date);
    COMMIT;");
    $process = $this->statement->execute([
      ':user_id' => $creator_ID, 
      ':employee_ID' => $employee_ID, 
      ':title' => $title, 
      ':message' => $message, 
      ':link' => $link, 
      ':creation_date' => date('Y-m-d H:i:s')
    ]);
    if ($process) {
      return "success";
    }
  }
  function addEmployeeGoalNotification($creator, $user_id, $title, $message, $link)
  {
    $this->setStatement("
    START TRANSACTION;
    SELECT employee_id INTO @creator_id FROM hr_users WHERE users_id = :creator;
    SELECT employee_id INTO @employee_id FROM hr_users WHERE users_id = :user_id;
    INSERT INTO hr_notifications (sender_id, employee_id, title, message, link, seen, deleted, creation_date)
    VALUES (@creator_id, @employee_id, :title, :message, :link, 0, 0, :creation_date);
    COMMIT;");
    $process = $this->statement->execute([':creator' => $creator, ':user_id' => $user_id, ':title' => $title, ':message' => $message, ':link' => $link, ':creation_date' => date('Y-m-d H:i:s')]);
    if ($process) {
      return "success";
    }
  }
  function updateEmployeeGoalNotification($user_id, $title, $message, $link)
  {
    $this->setStatement("INSERT INTO hr_notifications (employee_id, title, message, link, seen, deleted, creation_date)
    SELECT employee_id, :title, :message, :link, 0, 0, :creation_date 
    FROM hr_users 
    WHERE users_id = :user_id;");
    $process = $this->statement->execute([':user_id' => $user_id, ':title' => $title, ':message' => $message, ':link' => $link, ':creation_date' => date('Y-m-d H:i:s')]);
    if ($process) {
      return "success";
    }
  }
}
