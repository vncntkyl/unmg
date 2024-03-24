<?php
require_once 'controller.php';
class ApprovalLogs extends Controller
{
  function goalApprovals($approver_id, $user_id, $approval_type, $message, $form_id){
    $this->setStatement("
    SET @approver_id := (SELECT employee_id FROM hr_users WHERE users_id = :approver_id);
    SET @user_id := (SELECT employee_id FROM hr_users WHERE users_id = :user_id);
    INSERT INTO hr_approval_logs (approver, approvee, approval_type, message, evaluation_form_id, deleted, creation_date)
    VALUES (@approver_id, @user_id, :approval_type, :message, :form_id, 0, :creation_date)");
    $process = $this->statement->execute([
      'approver_id' => $approver_id,
      'user_id' => $user_id,
      'approval_type' => $approval_type,
      'message' => $message,
      'form_id' => $form_id,
      ':creation_date' => date('Y-m-d H:i:s')
    ]);
    if ($process) {
      return "success";
    }
  }
}
