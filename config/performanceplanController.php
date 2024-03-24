<?php
require_once 'controller.php';
class PerformancePlan extends Controller
{
  function createEvalForm($userid, $workyear)
  {
    $this->setStatement("INSERT into `hr_eval_form` (users_id, CreationDate) VALUES (:id, :work_year)");
    if ($this->statement->execute([':id' => $userid, ':work_year' => $workyear])) {
      return $this->connection->lastInsertId();
    }
  }
  function checkRaters($userID)
  {
    $process = "SELECT 
    CASE
          WHEN hr_users.primary_evaluator IS NULL AND hr_users.secondary_evaluator IS NULL AND hr_users.tertiary_evaluator IS NULL THEN '1'
          WHEN hr_users.primary_evaluator IS NOT NULL AND hr_users.secondary_evaluator IS NULL AND hr_users.tertiary_evaluator IS NULL THEN '2'
          WHEN hr_users.primary_evaluator IS NOT NULL AND hr_users.secondary_evaluator IS NOT NULL AND hr_users.tertiary_evaluator IS NULL THEN '3'
          WHEN hr_users.primary_evaluator IS NOT NULL AND hr_users.secondary_evaluator IS NOT NULL AND hr_users.tertiary_evaluator IS NOT NULL THEN '4'
          ELSE '5'
      END AS status
    FROM hr_users 
    WHERE users_id = :users_id";
    $this->setStatement($process);
    $this->statement->execute([':users_id' => $userID]);
    return $this->statement->fetch();
  }
  function createEvalFormFp($formID, $created_by, $goal_owner, $checkRaters)
  {
    $sqlQuery = "INSERT into `hr_eval_form_fp` (eval_form_id, ";
    if ($created_by === $goal_owner) {
      if ($checkRaters == 1) {
        $sqlQuery .= "created_by, employee, rater_1, rater_2, rater_3) VALUES (:formID, :owner, 1, 5, 5, 5)";
      } else if ($checkRaters == 2) {
        $sqlQuery .= "created_by, employee, rater_2, rater_3) VALUES (:formID, :owner, 1, 5, 5)";
      } else if ($checkRaters == 3) {
        $sqlQuery .= "created_by, employee, rater_3) VALUES (:formID, :owner, 1, 5)";
      } else if ($checkRaters == 4) {
        $sqlQuery .= "created_by, employee) VALUES (:formID, :owner, 1)";
      }
      $this->setStatement($sqlQuery);
      if ($this->statement->execute([':formID' => $formID, ':owner' => $goal_owner])) {
        return $this->connection->lastInsertId();
      }
    } else {
      if ($checkRaters == 1) {
        $sqlQuery .= "created_by, rater_1, rater_2, rater_3) VALUES (:formID, :owner, 5, 5, 5)";
      } else if ($checkRaters == 2) {
        $sqlQuery .= "created_by, rater_1, rater_2, rater_3) VALUES (:formID, :owner, 1, 5, 5)";
      } else if ($checkRaters == 3) {
        $sqlQuery .= "created_by, rater_1, rater_3) VALUES (:formID, :owner, 1, 5)";
      } else if ($checkRaters == 4) {
        $sqlQuery .= "created_by, rater_1) VALUES (:formID, :owner, 1)";
      }
      $this->setStatement($sqlQuery);
      if ($this->statement->execute([':formID' => $formID, ':owner' => $goal_owner])) {
        return $this->connection->lastInsertId();
      }
    }
  }

  function createEvalFormSp($formID)
  {
    $this->setStatement("INSERT into `hr_eval_form_sp` (eval_form_id) VALUES (:formID)");
    if ($this->statement->execute([':formID' => $formID])) {
      return $this->connection->lastInsertId();
    }
  }

  function createEvalFormPillarsPart($formID, $pillarID, $latestFpID, $pillarperc)
  {
    $this->setStatement("INSERT into `hr_eval_form_pillars` (hr_eval_form_id,pillar_id,hr_eval_form_fp_id,pillar_percentage) VALUES (:formid,:pillarid,:latestFpID,:pillarperc)");
    if ($this->statement->execute([':formid' => $formID, ':pillarid' => $pillarID, ':latestFpID' => $latestFpID, ':pillarperc' => $pillarperc])) {
      return $this->connection->lastInsertId();
    }
  }

  function insertGoals($formPillarsID, $latestFpID, $objDesc)
  {
    $this->setStatement("INSERT into `hr_objectives` (hr_eval_form_pillar_id, hr_eval_form_fp_id ,objective) VALUES (:formPillarID,:formFpID,:objective)");
    if ($this->statement->execute([':formPillarID' => $formPillarsID, ':formFpID' => $latestFpID, ':objective' => $objDesc])) {
      return $this->connection->lastInsertId();
    }
  }

  function insertKPI($kpiDesc, $objectID, $weight)
  {
    $this->setStatement("INSERT into `hr_kpi` (kpi_desc,objective_id,kpi_weight) VALUES (:kpi_desc,:objectID,:KPIweight)");
    if ($this->statement->execute([':kpi_desc' => $kpiDesc, ':objectID' => $objectID, ':KPIweight' => $weight])) {
      return $this->connection->lastInsertId();
    }
  }

  function insertFqEval($kpiID, $latestSpID)
  {
    $this->setStatement("INSERT into `hr_eval_form_sp_fq` (hr_eval_form_kpi_id,hr_eval_form_sp_id) VALUES (:kpi_ID,:formSpID)");
    return $this->statement->execute([':kpi_ID' => $kpiID, ':formSpID' => $latestSpID]);
  }

  function insertMyrEval($kpiID, $latestSpID)
  {
    $this->setStatement("INSERT into `hr_eval_form_sp_myr` (hr_eval_form_kpi_id,hr_eval_form_sp_id) VALUES (:kpi_ID,:formSpID)");
    return $this->statement->execute([':kpi_ID' => $kpiID, ':formSpID' => $latestSpID]);
  }

  function insertTqEval($kpiID, $latestSpID)
  {
    $this->setStatement("INSERT into `hr_eval_form_sp_tq` (hr_eval_form_kpi_id,hr_eval_form_sp_id) VALUES (:kpi_ID,:formSpID)");
    return $this->statement->execute([':kpi_ID' => $kpiID, ':formSpID' => $latestSpID]);
  }

  function insertYeEval($kpiID, $latestSpID)
  {
    $this->setStatement("INSERT into `hr_eval_form_sp_yee` (hr_eval_form_kpi_id,hr_eval_form_sp_id) VALUES (:kpi_ID,:formSpID)");
    if ($this->statement->execute([':kpi_ID' => $kpiID, ':formSpID' => $latestSpID])) {
      return $this->connection->lastInsertId();
    }
  }

  function insertTargetMetrics($TMScore, $TMDesc, $kpiID)
  {
    $this->setStatement("INSERT into `hr_target_metrics` (target_metrics_score,target_metrics_desc,kpi_id) VALUES (:TMScore,:TMDesc,:kpiID)");
    return $this->statement->execute([':TMScore' => $TMScore, ':TMDesc' => $TMDesc, ':kpiID' => $kpiID]);
  }

  function getAdminEmployeeGoals($workyear)
  {
    $this->setStatement("SELECT 
    u.users_id,
    u.employee_id,
    CASE WHEN u.middle_name IS NOT NULL AND u.middle_name <> '' THEN CONCAT(u.last_name, ' ', u.first_name, ' ', SUBSTRING(u.middle_name, 1, 1), '. ')
    ELSE CONCAT(u.last_name, ' ', u.first_name)
    END AS full_name,
    u.contract_type,
    CASE WHEN (ef.users_id IS NULL AND ef.CreationDate IS NULL) THEN 0 ELSE CASE WHEN (ef.CreationDate = :work_year) THEN 1 ELSE 0 END END AS has_eval,
    MAX(CASE WHEN p.pillar_id = 1 THEN p.pillar_percentage ELSE '-' END) AS pillar_1,
    MAX(CASE WHEN p.pillar_id = 2 THEN p.pillar_percentage ELSE '-' END) AS pillar_2,
    MAX(CASE WHEN p.pillar_id = 3 THEN p.pillar_percentage ELSE '-' END) AS pillar_3,
    MAX(CASE WHEN p.pillar_id = 4 THEN p.pillar_percentage ELSE '-' END) AS pillar_4,
    fp.employee AS fp_employee,
    CASE WHEN pe.middle_name IS NOT NULL AND pe.middle_name <> '' THEN CONCAT(pe.last_name, ' ', pe.first_name, ' ', SUBSTRING(pe.middle_name, 1, 1), '. ')
    ELSE CONCAT(pe.last_name, ' ', pe.first_name) 
    END AS primary_evaluator,
    fp.rater_1 AS fp_rater_1,
    CASE WHEN se.middle_name IS NOT NULL AND se.middle_name <> '' THEN CONCAT(se.last_name, ' ', se.first_name, ' ', SUBSTRING(se.middle_name, 1, 1), '. ') 
    ELSE CONCAT(se.last_name, ' ', se.first_name)
    END AS secondary_evaluator,
    fp.rater_2 AS fp_rater_2,
    CASE WHEN te.middle_name IS NOT NULL AND te.middle_name <> '' THEN CONCAT(te.last_name, ' ', te.first_name, ' ', SUBSTRING(te.middle_name, 1, 1), '. ') 
    ELSE CONCAT(te.last_name, ' ', te.first_name)
    END AS tertiary_evaluator,
    fp.rater_3 AS fp_rater_3
    FROM hr_users AS u
    LEFT JOIN hr_eval_form ef ON ef.users_id = u.users_id
    AND ef.CreationDate = :work_year
    LEFT JOIN hr_eval_form_fp fp ON fp.eval_form_id = ef.hr_eval_form_id
    LEFT JOIN hr_eval_form_pillars p ON p.hr_eval_form_fp_id = fp.hr_eval_form_fp_id
    LEFT JOIN hr_users pe ON pe.employee_id = u.primary_evaluator
    LEFT JOIN hr_users se ON se.employee_id = u.secondary_evaluator
    LEFT JOIN hr_users te ON te.employee_id = u.tertiary_evaluator
    WHERE u.users_id != 1
    AND u.contract_type IN ('regular', 'probationary') 
    GROUP BY u.users_id, u.employee_id, full_name, u.contract_type, has_eval");
    $this->statement->execute([":work_year" => $workyear]);
    return $this->statement->fetchAll();
  }

  function getEvaluatorEmployeeGoals($evaluator, $is_count = false, $workyear)
  {
    $this->setStatement("SELECT
          u.users_id,
          u.employee_id,
          CASE 
          WHEN u.middle_name IS NOT NULL AND u.middle_name <> '' THEN CONCAT(u.last_name, ' ', u.first_name, ' ', SUBSTRING(u.middle_name, 1, 1), '. ')
          ELSE CONCAT(u.last_name, ' ', u.first_name)
          END AS full_name,
          u.contract_type,
          IF(ef.users_id IS NULL AND ef.CreationDate IS NULL, 0, IF(ef.CreationDate = :work_year, 1, 0)) AS has_eval,
          MAX(CASE WHEN p.pillar_id = 1 THEN p.pillar_percentage ELSE '-' END) AS pillar_1,
          MAX(CASE WHEN p.pillar_id = 2 THEN p.pillar_percentage ELSE '-' END) AS pillar_2,
          MAX(CASE WHEN p.pillar_id = 3 THEN p.pillar_percentage ELSE '-' END) AS pillar_3,
          MAX(CASE WHEN p.pillar_id = 4 THEN p.pillar_percentage ELSE '-' END) AS pillar_4,
          fp.employee AS fp_employee,
          pe.users_id AS primary_id,
          CASE WHEN pe.middle_name IS NOT NULL AND pe.middle_name <> '' THEN CONCAT(pe.last_name, ' ', pe.first_name, ' ', SUBSTRING(pe.middle_name, 1, 1), '. ')
          ELSE CONCAT(pe.last_name, ' ', pe.first_name) 
          END AS primary_evaluator,
          fp.rater_1 AS fp_rater_1,
          se.users_id AS secondary_id,
          CASE WHEN se.middle_name IS NOT NULL AND se.middle_name <> '' THEN CONCAT(se.last_name, ' ', se.first_name, ' ', SUBSTRING(se.middle_name, 1, 1), '. ') 
          ELSE CONCAT(se.last_name, ' ', se.first_name)
          END AS secondary_evaluator,
          fp.rater_2 AS fp_rater_2,
          te.users_id AS tertiary_id,
          CASE WHEN te.middle_name IS NOT NULL AND te.middle_name <> '' THEN CONCAT(te.last_name, ' ', te.first_name, ' ', SUBSTRING(te.middle_name, 1, 1), '. ') 
          ELSE CONCAT(te.last_name, ' ', te.first_name)
          END AS tertiary_evaluator,
          fp.rater_3 AS fp_rater_3
          FROM
          hr_users u
          LEFT JOIN hr_eval_form ef ON ef.users_id = u.users_id
          AND ef.CreationDate = :work_year
          LEFT JOIN hr_eval_form_fp fp ON fp.eval_form_id = ef.hr_eval_form_id
          LEFT JOIN hr_eval_form_pillars p ON p.hr_eval_form_id = ef.hr_eval_form_id
          LEFT JOIN hr_users pe ON pe.employee_id = u.primary_evaluator
          LEFT JOIN hr_users se ON se.employee_id = u.secondary_evaluator
          LEFT JOIN hr_users te ON te.employee_id = u.tertiary_evaluator
          WHERE
          u.users_id != 1
          AND u.contract_type IN ('regular', 'probationary') 
          AND (u.primary_evaluator = :evaluator OR u.secondary_evaluator = :evaluator OR u.tertiary_evaluator = :evaluator) 
          GROUP BY
          u.users_id");
    $this->statement->execute([":evaluator" => $evaluator, ":work_year" => $workyear]);
    if ($is_count) {
      return $this->statement->rowCount();
    } else {
      return $this->statement->fetchAll();
    }
  }

  function fetchEvaluationForm($userID, $workYear)
  {
    $this->setStatement(
      "SELECT
          hr_eval_form_fp.hr_eval_form_fp_id,
          hr_eval_form_fp.employee,
          hr_eval_form_fp.rater_1,
          hr_eval_form_fp.rater_2,
          hr_eval_form_fp.rater_3,
          hr_users.users_id, 
          hr_pillars.pillar_id,
          hr_objectives.objective_id,
          hr_objectives.objective,
          hr_kpi.kpi_id,
          hr_kpi.kpi_desc,
          hr_kpi.kpi_weight,
          hr_target_metrics.target_metrics_id,
          hr_target_metrics.target_metrics_score,
          hr_target_metrics.target_metrics_desc,
          hr_eval_form_pillars.pillar_percentage,
          hr_eval_form_pillars.comment,
          hr_eval_form_pillars.hr_eval_form_pillar_id

      FROM 
          hr_eval_form
      JOIN 
          hr_eval_form_fp ON hr_eval_form.hr_eval_form_id = hr_eval_form_fp.eval_form_id
      JOIN 
          hr_users ON hr_eval_form.users_id = hr_users.users_id
      JOIN 
          hr_eval_form_pillars ON hr_eval_form.hr_eval_form_id = hr_eval_form_pillars.hr_eval_form_id 
      JOIN 
          hr_pillars ON hr_pillars.pillar_id = hr_eval_form_pillars.pillar_id 
      JOIN 
          hr_objectives ON hr_eval_form_pillars.hr_eval_form_pillar_id = hr_objectives.hr_eval_form_pillar_id
      JOIN 
          hr_kpi ON hr_objectives.objective_id = hr_kpi.objective_id
      JOIN 
          hr_target_metrics ON hr_kpi.kpi_id = hr_target_metrics.kpi_id
      WHERE 
          hr_eval_form.users_id = :userID AND hr_eval_form.CreationDate = :kpi_year"
    );
    $this->statement->execute([':userID' => $userID, ':kpi_year' => $workYear]);
    return $this->statement->fetchAll();
  }

  function fetchEvaluationFormApproval($userID, $workYear)
  {
    $this->setStatement("SELECT
    u.users_id AS employee_id,
    CASE WHEN u.middle_name IS NOT NULL AND u.middle_name <> '' THEN CONCAT(u.last_name, ' ', u.first_name, ' ', SUBSTRING(u.middle_name, 1, 1), '. ')
    ELSE CONCAT(u.last_name, ' ', u.first_name) 
    END AS full_name,
    fp.employee AS fp_employee,
    pe.users_id AS primary_id,
    CASE WHEN pe.middle_name IS NOT NULL AND pe.middle_name <> '' THEN CONCAT(pe.last_name, ' ', pe.first_name, ' ', SUBSTRING(pe.middle_name, 1, 1), '. ')
    ELSE CONCAT(pe.last_name, ' ', pe.first_name) 
    END AS primary_evaluator,
    fp.rater_1 AS fp_rater_1,
    se.users_id AS secondary_id,
    CASE WHEN se.middle_name IS NOT NULL AND se.middle_name <> '' THEN CONCAT(se.last_name, ' ', se.first_name, ' ', SUBSTRING(se.middle_name, 1, 1), '. ') 
    ELSE CONCAT(se.last_name, ' ', se.first_name)
    END AS secondary_evaluator,
    fp.rater_2 AS fp_rater_2,
    te.users_id AS tertiary_id,
    CASE WHEN te.middle_name IS NOT NULL AND te.middle_name <> '' THEN CONCAT(te.last_name, ' ', te.first_name, ' ', SUBSTRING(te.middle_name, 1, 1), '. ') 
    ELSE CONCAT(te.last_name, ' ', te.first_name)
    END AS tertiary_evaluator,
    fp.rater_3 AS fp_rater_3,
    CASE
          WHEN fp.rater_1 = 5 AND fp.rater_2 = 5 AND fp.rater_3 = 5 THEN 1
          WHEN fp.rater_1 != 5 AND fp.rater_2 = 5 AND fp.rater_3 = 5 THEN 2
          WHEN fp.rater_1 != 5 AND fp.rater_2 != 5 AND fp.rater_3 = 5 THEN 3
          WHEN fp.rater_1 != 5 AND fp.rater_2 != 5 AND fp.rater_3 != 5 THEN 4
          ELSE 5
      END AS status
    FROM
    hr_eval_form ef
    LEFT JOIN hr_users u ON u.users_id = ef.users_id
    LEFT JOIN hr_eval_form_fp fp ON fp.eval_form_id = ef.hr_eval_form_id
    LEFT JOIN hr_users pe ON pe.employee_id = u.primary_evaluator
    LEFT JOIN hr_users se ON se.employee_id = u.secondary_evaluator
    LEFT JOIN hr_users te ON te.employee_id = u.tertiary_evaluator
    WHERE ef.CreationDate = :kpi_year AND u.users_id = :userID");
    $this->statement->execute([':userID' => $userID, ':kpi_year' => $workYear]);
    return $this->statement->fetch();
  }

  function checkEvaluationForm($userID, $workYear = 0)
  {
    $this->setStatement("SELECT * FROM `hr_eval_form` WHERE users_id = ? AND CreationDate = ?");
    $this->statement->execute([$userID, $workYear]);
    if ($evalArr = $this->statement->fetch()) {
      if (!empty($evalArr)) {
        return $evalArr->hr_eval_form_id;
      } else {
        return 0;
      }
    }
  }

  function isGoalApproved($workyear, $creator, $approver)
  {
    $this->setStatement("SELECT COUNT(*) AS status FROM hr_eval_form_fp fp JOIN hr_eval_form ef ON fp.eval_form_id = ef.hr_eval_form_id WHERE ef.CreationDate = ? AND fp.created_by = ? AND fp.approved_by = ?");
    $this->statement->execute([$workyear, $creator, $approver]);
    return $this->statement->fetch();
  }

  function approveGoal($column_name, $acceptType, $id)
  {
    $this->setStatement("UPDATE `hr_eval_form_fp` SET {$column_name} = ? WHERE hr_eval_form_fp_id = ?");
    return $this->statement->execute([$acceptType, $id]);
  }

  function updatePillarByID($pillarID, $pillarPercentage, $comment)
  {
    $this->setStatement("UPDATE `hr_eval_form_pillars` SET `pillar_percentage`= ?, `comment` = ? WHERE `hr_eval_form_pillar_id` = ?");
    return $this->statement->execute([$pillarPercentage, $comment, $pillarID]);
  }

  function updateObjectiveByID($objectiveID, $objective)
  {
    $this->setStatement("UPDATE `hr_objectives` SET `objective`= ? WHERE `objective_id` = ?");
    return $this->statement->execute([$objective, $objectiveID]);
  }

  function updateKPIByID($kpiID, $kpi, $kpiWeight)
  {
    $this->setStatement("UPDATE `hr_kpi` SET `kpi_desc`= ?, `kpi_weight` = ? WHERE `kpi_id` = ?");
    return $this->statement->execute([$kpi, $kpiWeight, $kpiID]);
  }

  function updateTargetMetricsByID($targetMetricsID, $targetMetrics)
  {
    $this->setStatement("UPDATE `hr_target_metrics` SET `target_metrics_desc`= ? WHERE `target_metrics_id` = ?");
    return $this->statement->execute([$targetMetrics, $targetMetricsID]);
  }
  function updateFpByID($fpID, $employee, $rater_1, $rater_2, $rater_3)
  {
    $this->setStatement("UPDATE `hr_eval_form_fp` SET `employee`= ?, `rater_1` = ?, `rater_2` = ?, `rater_3` = ? WHERE `eval_form_id` = ?");
    return $this->statement->execute([$employee, $rater_1, $rater_2, $rater_3, $fpID]);
  }
}
