<?php
require_once 'controller.php';
class Log extends Controller
{
  function retrieveLogs($startDate, $endDate)
  {
    $sql = "SELECT
    CASE 
    WHEN hr_users.middle_name IS NOT NULL AND hr_users.middle_name <> '' THEN
        CONCAT(hr_users.first_name, ' ', SUBSTRING(hr_users.middle_name, 1, 1), '. ', hr_users.last_name)
    ELSE
        CONCAT(hr_users.first_name, ' ', hr_users.last_name)
    END AS employee_name,
    hr_company.company_name,
    hr_user_accounts.user_type,
    hr_logs.*
    FROM hr_logs
    LEFT JOIN hr_users ON hr_users.employee_id = hr_logs.employee_id
    LEFT JOIN hr_company ON hr_company.company_id = hr_users.company
    LEFT JOIN hr_user_accounts ON hr_user_accounts.users_id = hr_users.users_id
    WHERE hr_logs.deleted = 0";
    if ($startDate && $endDate) {
      $sql .= " AND hr_logs.creation_date BETWEEN '" . $startDate . "' AND '" . $endDate . "'";
    }
    $sql .= " ORDER BY hr_logs.ID DESC";
    $this->setStatement($sql);
    $this->statement->execute();
    return $this->statement->fetchAll();
  }

  function retrieveApprovalLogs()
  {
    $this->setStatement("SELECT * FROM `hr_approval_logs` WHERE deleted = 0");
    $this->statement->execute();
    return $this->statement->fetchAll();
  }

  function companyLog($employee_id, $modification_type, $event, $new_value)
  {
    $this->setStatement("INSERT INTO hr_logs (employee_id, modification_type, event, new_value, deleted, creation_date) 
                          VALUES (:employee_id, :modification_type, :event, :new_value, 0, :creation_date)");
    return $this->statement->execute([
      'employee_id' => $employee_id,
      'modification_type' => $modification_type,
      'event' => $event,
      'new_value' => $new_value,
      ':creation_date' => date('Y-m-d H:i:s')
    ]);
  }

  function userLog($employee_id, $modification_type, $event, $new_value)
  {
    $this->setStatement("INSERT INTO hr_logs (employee_id, modification_type, event, new_value, deleted, creation_date)
                                      VALUES (:employee_id, :modification_type, :event, :new_value, 0, :creation_date)");
    $process = $this->statement->execute([
      'employee_id' => $employee_id,
      'modification_type' => $modification_type,
      'event' => $event,
      'new_value' => $new_value,
      ':creation_date' => date('Y-m-d H:i:s')
    ]);
    if ($process) {
      return "success";
    }
  }

  function createGoals($employee_id, $modification_type, $event, $new_value)
  {
    $this->setStatement("INSERT INTO hr_logs (employee_id, modification_type, event, new_value, deleted, creation_date)
                                      VALUES (:employee_id, :modification_type, :event, :new_value, 0, :creation_date)");
    $process = $this->statement->execute([
      'employee_id' => $employee_id,
      'modification_type' => $modification_type,
      'event' => $event,
      'new_value' => $new_value,
      ':creation_date' => date('Y-m-d H:i:s')
    ]);
    if ($process) {
      return "success";
    }
  }

  function updateGoals($user_id, $modification_type, $event, $new_value)
  {
    $this->setStatement("SET @employee_id := (SELECT employee_id FROM hr_users WHERE users_id = :user_id);
    INSERT INTO hr_logs (employee_id, modification_type, event, new_value, deleted, creation_date)
    VALUES (@employee_id, :modification_type, :event, :new_value, 0, :creation_date)");
    $process = $this->statement->execute([
      'user_id' => $user_id,
      'modification_type' => $modification_type,
      'event' => $event,
      'new_value' => $new_value,
      ':creation_date' => date('Y-m-d H:i:s')
    ]);
    if ($process) {
      return "success";
    }
  }
}
