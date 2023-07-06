<?php
require_once 'controller.php';
class Form extends Controller
{
    function retrievePillars()
    {
        $this->setStatement("SELECT * FROM `hr_pillars`");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function insertPillar($pillarName)
    {
        $this->setStatement("INSERT into `hr_pillars` (pillar_name) VALUES (:pillarName)'");
        return $this->statement->execute([':pillarName' => $pillarName]);
    }
    function updatePillar($pillarID, $pillarName)
    {
        $this->setStatement("UPDATE `hr_pillars` SET pillar_name = :pillarName WHERE pillar_id = :pillarID");
        return $this->statement->execute([':pillarID' => $pillarID, ':pillarName' => $pillarName]);
    }
    function deletePillar($pillarID, $pillarName)
    {
        $this->setStatement("UPDATE `hr_pillars` SET deleted = '1' WHERE pillar_id = :pillarID");
        return $this->statement->execute([':pillarID' => $pillarID]);
    }
    function restorePillar($pillarID, $pillarName)
    {
        $this->setStatement("UPDATE `hr_pillars` SET deleted = '0' WHERE pillar_id = :pillarID");
        return $this->statement->execute([':pillarID' => $pillarID]);
    }
    function insertGoals($formPillarsID, $latestFpID, $objDesc)
    {
        $this->setStatement("INSERT into `hr_objectives` (hr_eval_form_pillar_id, hr_eval_form_fp_id ,objective) VALUES (:formPillarID,:formFpID,:objective)");
        if ($this->statement->execute([':formPillarID' => $formPillarsID, ':formFpID' => $latestFpID, ':objective' => $objDesc])) {
            return $this->connection->lastInsertId();
        }
    }
    function updateGoals($evalFpID, $formPillarsID, $objDesc)
    {
        $this->setStatement("UPDATE `hr_objectives` set objective = :objective WHERE hr_eval_form_pillar_id = :formPillarID and hr_eval_form_fp_id = :evalFpID");
        return $this->statement->execute([':evalFpID' => $evalFpID, ':formPillarID' => $formPillarsID, ':objective' => $objDesc]);
    }

    function insertKPI($kpiDesc, $objectID, $weight)
    {
        $this->setStatement("INSERT into `hr_kpi` (kpi_desc,objective_id,kpi_weight) VALUES (:kpi_desc,:objectID,:KPIweight)");
        if ($this->statement->execute([':kpi_desc' => $kpiDesc, ':objectID' => $objectID, ':KPIweight' => $weight])) {
            return $this->connection->lastInsertId();
        }
    }
    function updateKPI($kpiDesc, $objectID, $weight)
    {
        $this->setStatement("UPDATE `hr_kpi` set kpi_desc = :kpi_desc, kpi_weight = :KPIweight  WHERE objective_id = :objectID");
        return $this->statement->execute([':kpi_desc' => $kpiDesc, ':objectID' => $objectID, ':KPIweight' => $weight]);
    }
    function kpiCount($objID)
    {
        $this->setStatement("SELECT COUNT(*) as `Count` FROM `hr_kpi` WHERE objective_id = :objID");
        $this->statement->execute([':objID' => $objID]);
        return $this->statement->fetch();
    }
    function createEvalForm($userid)
    {
        $this->setStatement("INSERT into `hr_eval_form` (users_id) VALUES (:id)");
        if ($this->statement->execute([':id' => $userid])) {
            return $this->connection->lastInsertId();
        }
    }
    function selectFormIDForSpecUser($userID)
    {
        $this->setStatement("SELECT hr_eval_form_id FROM `hr_eval_form` WHERE users_id = :userID");
        $this->statement->execute([':userID' => $userID]);
        return $this->statement->fetch();
    }

    function createEvalFormFp($formID)
    {
        $this->setStatement("INSERT into `hr_eval_form_fp` (eval_form_id) VALUES (:formID)");
        if ($this->statement->execute([':formID' => $formID])) {
            return $this->connection->lastInsertId();
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
    function insertTargetMetrics($TMScore, $TMDesc, $kpiID)
    {
        $this->setStatement("INSERT into `hr_target_metrics` (target_metrics_score,target_metrics_desc,kpi_id) VALUES (:TMScore,:TMDesc,:kpiID)");
        return $this->statement->execute([':TMScore' => $TMScore, ':TMDesc' => $TMDesc, ':kpiID' => $kpiID]);
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
    function InsertRatingForYearEndEvaluation($latestYearEndValID)
    {
        $this->setStatement("INSERT into `hr_eval_form_sp_yee_rating` (hr_eval_form_sp_yee_id) VALUES (:yearEndRateID)");
        return $this->statement->execute([':yearEndRateID' => $latestYearEndValID]);
    }
    function EvaluationForFirstQT($results, $remarks, $reviewDate, $formPillarID, $latestSpID)
    {
        $this->setStatement("UPDATE `hr_eval_form_sp_fq` SET results = :results, remarks = :remarks, fq_review_date = :revDate  WHERE hr_eval_form_pillars_id = :formPillarID and hr_eval_form_sp_id = :formSpID");
        return $this->statement->execute([':results' => $results, ':remarks' => $remarks, ':revDate' => $reviewDate, ':formPillarID' => $formPillarID, ':formSpID' => $latestSpID]);
    }
    function EvaluationForMidyear($formPillarID, $results, $status, $remarks, $reviewDate, $actToAddress, $latestSpID)
    {
        $this->setStatement("UPDATE `hr_eval_form_sp_myr` SET results = :results, status = :status, remarks = :remarks, actions_to_address = :actAddress, myr_review_date = :revDate) WHERE hr_eval_form_pillars_id = :formPillarID and hr_eval_form_sp_id = :formSpID");
        return $this->statement->execute([':results' => $results, ':remarks' => $remarks, ':status' => $status, ':actAddress' => $actToAddress, ':revDate' => $reviewDate, ':formPillarID' => $formPillarID, ':formSpID' => $latestSpID]);
    }
    function EvaluationForThirdQT($formPillarID, $results, $reVariance, $reviewDate, $latestSpID)
    {
        $this->setStatement("UPDATE `hr_eval_form_sp_tq` SET results = :results, reason_for_variance = :reVariance, tq_review_date = :revDate) WHERE hr_eval_form_pillars_id = :formPillarID and hr_eval_form_sp_id = :formSpID");
        return $this->statement->execute([':results' => $results, ':reVariance' => $reVariance, ':revDate' => $reviewDate, ':formPillarID' => $formPillarID, ':formSpID' => $latestSpID]);
    }
    function EvaluationForYearEnd($formPillarID, $results, $remarks, $reviewDate, $latestSpID)
    {
        $this->setStatement("UPDATE `hr_eval_form_sp_yee` SET results = :results, remarks = :remarks, yee_review_date = :revDate WHERE hr_eval_form_pillars_id = :formPillarID and hr_eval_form_sp_id = :formSpID");
        return $this->statement->execute([':results' => $results, ':remarks' => $remarks, ':revDate' => $reviewDate, ':formPillarID' => $formPillarID, ':formSpID' => $latestSpID]);
    }
    function RatingForYearEndEvaluation($agreedRate, $weightedRating, $latestYearEndValID)
    {
        $this->setStatement("UPDATE `hr_eval_form_sp_yee_rating` SET agreed_rating = :agreedrating, wtd_rating = :weightedRate WHERE hr_eval_form_sp_yee_id  = :yearEndRateID");
        return $this->statement->execute([':agreedrating' => $agreedRate, ':weightedRate' => $weightedRating, ':yearEndRateID' => $latestYearEndValID]);
    }

    function selectUserPerformance($empID)
    {
        $this->setStatement("SELECT
        hr_users.emp_id,
        hr_eval_form.users_id, 
        hr_eval_form.rater_1, 
        hr_eval_form.rater_2,
        hr_eval_form.rater_3,
        hr_eval_form.recipient_signatory,  
        hr_objectives.hr_eval_form_pillar_id,
        hr_eval_form_pillars.pillar_id,
        hr_pillars.pillar_name, 
        hr_pillars.pillar_description,
        hr_eval_form_pillars.pillar_percentage,
        hr_objectives.hr_eval_form_fp_id, 
        hr_objectives.objective, 
        hr_kpi.objective_id, 
        hr_kpi.kpi_desc, 
        hr_kpi.kpi_weight,
        hr_eval_form_sp_yee.results,
        hr_eval_form_sp_yee.remarks,
        hr_eval_form_sp_yee.hr_eval_form_kpi_id,
        hr_eval_form_sp_yee.agreed_rating,
        hr_eval_form_sp_yee.wtd_rating
    FROM 
        hr_eval_form
    JOIN
            hr_users ON hr_users.users_id = hr_eval_form.users_id
    JOIN
        hr_eval_form_fp ON hr_eval_form_fp.eval_form_id = hr_eval_form.hr_eval_form_id
    JOIN 
        hr_objectives ON hr_objectives.hr_eval_form_fp_id = hr_eval_form_fp.hr_eval_form_fp_id
    JOIN 
        hr_eval_form_pillars ON hr_eval_form_pillars.hr_eval_form_pillar_id = hr_objectives.hr_eval_form_pillar_id
    JOIN
        hr_pillars ON hr_pillars.pillar_id = hr_eval_form_pillars.pillar_id
    JOIN 
        hr_kpi ON hr_kpi.objective_id = hr_objectives.objective_id
    JOIN 
        hr_eval_form_sp_yee ON hr_eval_form_sp_yee.hr_eval_form_kpi_id = hr_kpi.kpi_id
    WHERE 
        hr_users.emp_id = ?");
        $this->statement->execute([$empID]);

        return $this->statement->fetchAll();
    }

    function insertUserAssessment($tbl_name, $formspID, $achievements)
    {
        $this->setStatement("UPDATE {$tbl_name} SET ratee_achievement = :ratee_achievement WHERE hr_eval_form_sp_id = :hr_eval_form_sp_id");
        return $this->statement->execute([':ratee_achievement' => $achievements, ':hr_eval_form_sp_id' => $formspID]);
    }

    function selectUserAssessment($empID)
    {
        $this->setStatement("SELECT 
        hr_users.emp_id,
        hr_eval_form.users_id AS eval_user_id,
        hr_eval_form.rater_1, 
        hr_eval_form.rater_2,
        hr_eval_form.rater_3,
        hr_eval_form.recipient_signatory, 
        hr_objectives.hr_eval_form_pillar_id,
        hr_eval_form_pillars.pillar_id,
        hr_pillars.pillar_name, 
        hr_pillars.pillar_description,
        hr_eval_form_pillars.pillar_percentage,
        hr_objectives.hr_eval_form_fp_id, 
        hr_objectives.objective, 
        hr_kpi.objective_id, 
        hr_kpi.kpi_desc, 
        hr_kpi.kpi_weight,
        hr_eval_form.hr_eval_form_id,
        hr_eval_form_sp.hr_eval_form_sp_id,

        hr_eval_form_sp_fq.results AS fq_results,
        hr_eval_form_sp_fq.remarks AS fq_remarks,
        hr_eval_form_sp_fq.fq_review_date AS fq_review_date,
        hr_eval_form_sp_fq_rating.ratee_achievement AS fq_ratee_achievement,
        
        hr_eval_form_sp_myr.results AS myr_results,
        hr_eval_form_sp_myr.status AS myr_status,
        hr_eval_form_sp_myr.remarks AS myr_remarks,
        hr_eval_form_sp_myr.actions_to_address AS myr_address_action,
        hr_eval_form_sp_myr.myr_review_date AS myr_review_date,
        hr_eval_form_sp_myr_rating.ratee_achievement AS myr_ratee_achievement,
        hr_eval_form_sp_myr_rating.rater_1 AS myr_rater1,
        hr_eval_form_sp_myr_rating.rater_2 AS myr_rater2,
        hr_eval_form_sp_myr_rating.rater_3 AS myr_rater3,
        
        hr_eval_form_sp_tq.results AS tq_results,
        hr_eval_form_sp_tq.remarks AS tq_remarks,
        hr_eval_form_sp_tq.tq_review_date AS tq_review_date,
        hr_eval_form_sp_tq_rating.ratee_achievement AS tq_ratee_achievement,
        
        hr_eval_form_sp_yee.results AS yee_results,
        hr_eval_form_sp_yee.remarks AS yee_remarks,
        hr_eval_form_sp_yee.agreed_rating,
        hr_eval_form_sp_yee.wtd_rating,
        hr_eval_form_sp_yee_rating.ratee_achievement AS yee_ratee_achievement
FROM 
            hr_users
        LEFT JOIN
            hr_eval_form ON hr_users.users_id = hr_eval_form.users_id
        LEFT JOIN 
            hr_eval_form_fp ON hr_eval_form_fp.eval_form_id = hr_eval_form.hr_eval_form_id
        LEFT JOIN 
            hr_objectives ON hr_objectives.hr_eval_form_fp_id = hr_eval_form_fp.hr_eval_form_fp_id
        LEFT JOIN 
            hr_eval_form_pillars ON hr_eval_form_pillars.hr_eval_form_pillar_id = hr_objectives.hr_eval_form_pillar_id
        LEFT JOIN
            hr_pillars ON hr_pillars.pillar_id = hr_eval_form_pillars.pillar_id
        LEFT JOIN 
            hr_kpi ON hr_kpi.objective_id = hr_objectives.objective_id
        LEFT JOIN
            hr_eval_form_sp ON hr_eval_form_sp.eval_form_id = hr_eval_form.hr_eval_form_id
            
        LEFT JOIN
            hr_eval_form_sp_fq ON hr_eval_form_sp_fq.hr_eval_form_kpi_id = hr_kpi.kpi_id
        LEFT JOIN
            hr_eval_form_sp_fq_rating ON hr_eval_form_sp_fq_rating.hr_eval_form_sp_id = hr_eval_form_sp.hr_eval_form_sp_id
        LEFT JOIN
            hr_eval_form_sp_myr ON hr_eval_form_sp_myr.hr_eval_form_kpi_id = hr_kpi.kpi_id
        LEFT JOIN
            hr_eval_form_sp_myr_rating ON hr_eval_form_sp_myr_rating.hr_eval_form_sp_id = hr_eval_form_sp.hr_eval_form_sp_id 
        LEFT JOIN
            hr_eval_form_sp_tq ON hr_eval_form_sp_tq.hr_eval_form_kpi_id = hr_kpi.kpi_id
        LEFT JOIN
            hr_eval_form_sp_tq_rating ON hr_eval_form_sp_tq_rating.hr_eval_form_sp_id = hr_eval_form_sp.hr_eval_form_sp_id 
        LEFT JOIN 
            hr_eval_form_sp_yee ON hr_eval_form_sp_yee.hr_eval_form_kpi_id = hr_kpi.kpi_id
        LEFT JOIN
            hr_eval_form_sp_yee_rating ON hr_eval_form_sp_yee_rating.hr_eval_form_sp_id = hr_eval_form_sp.hr_eval_form_sp_id
        WHERE 
        hr_users.emp_id = ?
        ");
        $this->statement->execute([$empID]);
        return $this->statement->fetchAll();
    }



    function selectUserAssessmentScores($empID)
    {
        $this->setStatement("SELECT
        hr_users.emp_id,
        hr_eval_form.hr_eval_form_id, 
        hr_eval_form_fp.eval_form_id, 
        hr_objectives.hr_eval_form_fp_id, 
        hr_kpi.objective_id,
        
        hr_eval_form_sp_fq.results AS fq_results,
        hr_fq_desc.target_metrics_desc AS fq_desc,
        hr_fq_desc.kpi_id AS fq_kpi_id,
        
        hr_eval_form_sp_myr.results AS myr_results,
        hr_myr_desc.target_metrics_desc AS myr_desc,
        hr_myr_desc.kpi_id AS myr_kpi_id,
        
        hr_eval_form_sp_tq.results AS tq_results,
        hr_tq_desc.target_metrics_desc AS tq_desc,
        hr_tq_desc.kpi_id AS tq_kpi_id,
        
        hr_eval_form_sp_yee.results AS yee_results,
        hr_yee_desc.target_metrics_desc AS yee_desc,
        hr_yee_desc.kpi_id AS yee_kpi_id
        
        FROM hr_users
        LEFT JOIN
        hr_eval_form ON hr_users.users_id = hr_eval_form.users_id
        LEFT JOIN
        hr_eval_form_fp ON hr_eval_form_fp.eval_form_id = hr_eval_form.hr_eval_form_id
        LEFT JOIN
        hr_objectives ON hr_objectives.hr_eval_form_fp_id = hr_eval_form_fp.hr_eval_form_fp_id
        LEFT JOIN
        hr_kpi ON hr_kpi.objective_id = hr_objectives.objective_id
        LEFT JOIN
            hr_target_metrics AS hr_fq_desc ON hr_fq_desc.kpi_id = hr_kpi.kpi_id
        LEFT JOIN
            hr_eval_form_sp_fq ON hr_eval_form_sp_fq.hr_eval_form_kpi_id = hr_kpi.kpi_id
        LEFT JOIN
            hr_target_metrics AS hr_myr_desc ON hr_myr_desc.kpi_id = hr_kpi.kpi_id    
        LEFT JOIN
            hr_eval_form_sp_myr ON hr_eval_form_sp_myr.hr_eval_form_kpi_id = hr_kpi.kpi_id
        LEFT JOIN
            hr_target_metrics AS hr_tq_desc ON hr_tq_desc.kpi_id = hr_kpi.kpi_id
        LEFT JOIN
            hr_eval_form_sp_tq ON hr_eval_form_sp_tq.hr_eval_form_kpi_id = hr_kpi.kpi_id            
        LEFT JOIN
            hr_target_metrics AS hr_yee_desc ON hr_yee_desc.kpi_id = hr_kpi.kpi_id            
        LEFT JOIN 
            hr_eval_form_sp_yee ON hr_eval_form_sp_yee.hr_eval_form_kpi_id = hr_kpi.kpi_id            
        WHERE hr_users.emp_id = ?
        AND
        hr_fq_desc.target_metrics_score = hr_eval_form_sp_fq.results
        AND
        hr_myr_desc.target_metrics_score = hr_eval_form_sp_myr.results
        AND
        hr_tq_desc.target_metrics_score = hr_eval_form_sp_tq.results
        AND
        hr_yee_desc.target_metrics_score = hr_eval_form_sp_yee.results
        
        ");
        $this->statement->execute([$empID]);
        return $this->statement->fetchAll();
    }

    function selectEmployeeSignOffAssessment($empID, $userStatus)
    {
        $this->setStatement("SELECT
            employee.rater_1,
            employee.rater_2,
            employee.rater_3,
            CONCAT(primary_eval.first_name, ' ', LEFT(primary_eval.middle_name, 1), '. ', primary_eval.last_name) AS primary_eval_name,
            CONCAT(secondary_eval.first_name, ' ', LEFT(secondary_eval.middle_name, 1), '. ', secondary_eval.last_name) AS secondary_eval_name,
            CONCAT(tertiary_eval.first_name, ' ', LEFT(tertiary_eval.middle_name, 1), '. ', tertiary_eval.last_name) AS tertiary_eval_name,
            CONCAT(employee.first_name, ' ', LEFT(employee.middle_name, 1), '. ', employee.last_name) AS employee_name,
            employee.emp_id,
            employee.job_description
        FROM hr_users AS employee
        LEFT JOIN hr_users AS primary_eval ON primary_eval.emp_id = employee.rater_1
        LEFT JOIN hr_users AS secondary_eval ON secondary_eval.emp_id = employee.rater_2
        LEFT JOIN hr_users AS tertiary_eval ON tertiary_eval.emp_id = employee.rater_3
        WHERE 
        (employee.rater_1 = :rater_id OR employee.rater_2 = :rater_id OR employee.rater_3 = :rater_id)
        AND employee.user_status = :user_status
                ");
        $this->statement->execute([':rater_id' => $empID, ':user_status' => $userStatus]);
        return $this->statement->fetchAll();
    }

    function selectEmployeeAssessment($empID, $userStatus)
    {
        $this->setStatement("SELECT
        employee.users_id,
        employee.emp_id AS employee_id,
        employee.first_name,
        employee.user_status,
        CONCAT(employee.first_name, ' ', LEFT(employee.middle_name, 1), '. ', employee.last_name) AS employee_name,
        CONCAT(primary_eval.first_name, ' ', LEFT(primary_eval.middle_name, 1), '. ', primary_eval.last_name) AS primary_eval_name,
        CONCAT(secondary_eval.first_name, ' ', LEFT(secondary_eval.middle_name, 1), '. ', secondary_eval.last_name) AS secondary_eval_name,
        CONCAT(tertiary_eval.first_name, ' ', LEFT(tertiary_eval.middle_name, 1), '. ', tertiary_eval.last_name) AS tertiary_eval_name,
        
        
        hr_eval_form_sp_fq_rating.ratee_achievement fq_achievements,
        hr_eval_form_sp_myr_rating.ratee_achievement myr_achievements,
        hr_eval_form_sp_tq_rating.ratee_achievement tq_achievements,
        hr_eval_form_sp_yee_rating.ratee_achievement yee_achievements,
        
        hr_eval_form_sp.hr_eval_form_sp_id,
        hr_eval_form_sp_fq.results AS fq_results,
        hr_eval_form_sp_fq.remarks AS fq_remarks,
        
        hr_eval_form_sp_myr.results AS myr_results,
        hr_eval_form_sp_myr.remarks AS myr_remarks,
        
        hr_eval_form_sp_tq.results AS tq_results,
        hr_eval_form_sp_tq.remarks AS tq_remarks,
        
        hr_eval_form_sp_yee.results AS yee_results,
        hr_eval_form_sp_yee.remarks AS yee_remarks,
        hr_eval_form_sp_yee.agreed_rating AS agreed_rating

        
        FROM hr_users AS employee
        
        LEFT JOIN hr_users AS primary_eval ON primary_eval.emp_id = employee.rater_1
        LEFT JOIN hr_users AS secondary_eval ON secondary_eval.emp_id = employee.rater_2
        LEFT JOIN hr_users AS tertiary_eval ON tertiary_eval.emp_id = employee.rater_3
        
        LEFT JOIN
        hr_eval_form ON hr_eval_form.users_id = employee.users_id
        LEFT JOIN
        hr_eval_form_fp ON hr_eval_form_fp.eval_form_id = hr_eval_form.hr_eval_form_id
        LEFT JOIN
        hr_eval_form_pillars ON hr_eval_form_pillars.hr_eval_form_fp_id = hr_eval_form_fp.hr_eval_form_fp_id
        LEFT JOIN
        hr_pillars ON hr_pillars.pillar_id = hr_eval_form_pillars.pillar_id
        LEFT JOIN
        hr_objectives ON hr_objectives.hr_eval_form_pillar_id = hr_eval_form_pillars.hr_eval_form_pillar_id
        LEFT JOIN
        hr_kpi ON hr_kpi.objective_id = hr_objectives.objective_id
        LEFT JOIN
            hr_eval_form_sp ON hr_eval_form_sp.eval_form_id = hr_eval_form.hr_eval_form_id
         
         LEFT JOIN
            hr_eval_form_sp_fq_rating ON hr_eval_form_sp_fq_rating.hr_eval_form_sp_id = hr_eval_form_sp.hr_eval_form_sp_id
          LEFT JOIN
            hr_eval_form_sp_myr_rating ON hr_eval_form_sp_myr_rating.hr_eval_form_sp_id = hr_eval_form_sp.hr_eval_form_sp_id
          LEFT JOIN
            hr_eval_form_sp_tq_rating ON hr_eval_form_sp_tq_rating.hr_eval_form_sp_id = hr_eval_form_sp.hr_eval_form_sp_id
          LEFT JOIN
            hr_eval_form_sp_yee_rating ON hr_eval_form_sp_yee_rating.hr_eval_form_sp_id = hr_eval_form_sp.hr_eval_form_sp_id
         
        LEFT JOIN
            hr_eval_form_sp_fq ON hr_eval_form_sp_fq.hr_eval_form_kpi_id = hr_kpi.kpi_id   
        LEFT JOIN
            hr_eval_form_sp_myr ON hr_eval_form_sp_myr.hr_eval_form_kpi_id = hr_kpi.kpi_id  
        LEFT JOIN
            hr_eval_form_sp_tq ON hr_eval_form_sp_tq.hr_eval_form_kpi_id = hr_kpi.kpi_id
        LEFT JOIN
            hr_eval_form_sp_yee ON hr_eval_form_sp_yee.hr_eval_form_kpi_id = hr_kpi.kpi_id
            
        WHERE 
          (employee.rater_1 = :rater_id OR employee.rater_2 = :rater_id OR employee.rater_3 = :rater_id)
           AND employee.user_status = :user_status
         ORDER BY employee.users_id");
        $this->statement->execute([':rater_id' => $empID, ':user_status' => $userStatus]);
        return $this->statement->fetchAll();
    }

    function selectAchievements($empID)
    {
        $this->setStatement("
        SELECT 
    hr_users.emp_id,
    CONCAT(hr_users.first_name, ' ', LEFT(hr_users.middle_name, 1), '. ', hr_users.last_name) AS employee_name,
    hr_eval_form_fp.hr_eval_form_fp_id AS first_part_id,
    hr_eval_form_sp_fq_rating.ratee_achievement AS fq_ratee_achievement,
    hr_eval_form_sp_myr_rating.ratee_achievement AS myr_ratee_achievement,
    hr_eval_form_sp_tq_rating.ratee_achievement AS tq_ratee_achievement,
    hr_eval_form_sp_yee_rating.ratee_achievement AS yee_ratee_achievement
FROM 
    hr_users
LEFT JOIN
    hr_eval_form ON hr_users.users_id = hr_eval_form.users_id
LEFT JOIN
    hr_eval_form_fp ON hr_eval_form_fp.eval_form_id = hr_eval_form.hr_eval_form_id
LEFT JOIN
    hr_eval_form_sp ON hr_eval_form_sp.eval_form_id = hr_eval_form.hr_eval_form_id
LEFT JOIN
    hr_eval_form_sp_fq_rating ON hr_eval_form_sp_fq_rating.hr_eval_form_sp_id = hr_eval_form_sp.hr_eval_form_sp_id
LEFT JOIN
    hr_eval_form_sp_myr_rating ON hr_eval_form_sp_myr_rating.hr_eval_form_sp_id = hr_eval_form_sp.hr_eval_form_sp_id 
LEFT JOIN
    hr_eval_form_sp_tq_rating ON hr_eval_form_sp_tq_rating.hr_eval_form_sp_id = hr_eval_form_sp.hr_eval_form_sp_id 
LEFT JOIN
    hr_eval_form_sp_yee_rating ON hr_eval_form_sp_yee_rating.hr_eval_form_sp_id = hr_eval_form_sp.hr_eval_form_sp_id
WHERE 
    hr_users.emp_id = ?");
        $this->statement->execute([$empID]);
        return $this->statement->fetchAll();
    }


    function selectTrackingGrading($table_name_results, $table_name_rating, $empID)
    {
        $this->setStatement("
        SELECT 
        hr_users.emp_id,
        

        hr_eval_form_pillars.hr_eval_form_pillar_id AS eval_pillar_id,
        hr_pillars.pillar_id AS pillar_id,
        CASE
            WHEN ROW_NUMBER() OVER (PARTITION BY hr_pillars.pillar_name ORDER BY hr_pillars.pillar_name) = 1
                THEN hr_pillars.pillar_name
            ELSE ''
        END AS pillar_name,
        
        CASE
            WHEN ROW_NUMBER() OVER (PARTITION BY hr_pillars.pillar_description ORDER BY hr_pillars.pillar_description) = 1
                THEN hr_pillars.pillar_description
            ELSE ''
        END AS pillar_description,
        
        hr_eval_form_pillars.pillar_percentage,



        hr_objectives.objective_id AS obj_objective_id,
        hr_objectives.hr_eval_form_pillar_id AS obj_eval_pillar_id,

        CASE
            WHEN ROW_NUMBER() OVER (PARTITION BY hr_objectives.objective ORDER BY hr_objectives.objective) = 1
                THEN hr_objectives.objective
            ELSE ''
        END AS obj_objective,


        hr_kpi.objective_id AS kpi_objective_id,
        hr_kpi.kpi_desc,
        hr_kpi.kpi_weight,

        {$table_name_results}.results AS results,
        hr_metrics_desc.target_metrics_desc AS metrics_desc,
        {$table_name_results}.remarks AS remarks,
        {$table_name_rating}.ratee_achievement AS ratee_achievement
    FROM 
        hr_users
    LEFT JOIN
        hr_eval_form ON hr_users.users_id = hr_eval_form.users_id
    LEFT JOIN 
        hr_eval_form_fp ON hr_eval_form_fp.eval_form_id = hr_eval_form.hr_eval_form_id
    LEFT JOIN 
        hr_objectives ON hr_objectives.hr_eval_form_fp_id = hr_eval_form_fp.hr_eval_form_fp_id
    LEFT JOIN 
        hr_eval_form_pillars ON hr_eval_form_pillars.hr_eval_form_pillar_id = hr_objectives.hr_eval_form_pillar_id
    LEFT JOIN
        hr_pillars ON hr_pillars.pillar_id = hr_eval_form_pillars.pillar_id
    LEFT JOIN 
        hr_kpi ON hr_kpi.objective_id = hr_objectives.objective_id
    LEFT JOIN
        hr_eval_form_sp ON hr_eval_form_sp.eval_form_id = hr_eval_form.hr_eval_form_id
    LEFT JOIN
        {$table_name_results} ON {$table_name_results}.hr_eval_form_kpi_id = hr_kpi.kpi_id
    LEFT JOIN
        {$table_name_rating} ON {$table_name_rating}.hr_eval_form_sp_id = hr_eval_form_sp.hr_eval_form_sp_id
    LEFT JOIN
        hr_target_metrics AS hr_metrics_desc ON hr_metrics_desc.kpi_id = hr_kpi.kpi_id 
        AND hr_metrics_desc.target_metrics_score = {$table_name_results}.results
    WHERE 
        hr_users.emp_id = ?
        ORDER BY hr_pillars.pillar_id ASC
        ");
        $this->statement->execute([$empID]);
        return $this->statement->fetchAll();
    }

    function fetchPillars($evalID)
    {
        $this->setStatement("SELECT * FROM `hr_eval_form_pillars` WHERE hr_eval_form_id = ?");
        $this->statement->execute([$evalID]);
        return $this->statement->fetchAll();
    }
    function fetchObjectives($pillarID)
    {
        $this->setStatement("SELECT * FROM `hr_objectives` WHERE hr_eval_form_pillar_id = ?");
        $this->statement->execute([$pillarID]);
        return $this->statement->fetchAll();
    }
    function fetchKPIs($objectiveID)
    {
        $this->setStatement("SELECT * FROM `hr_kpi` WHERE objective_id = ?");
        $this->statement->execute([$objectiveID]);
        return $this->statement->fetchAll();
    }
    function fetchTargetMetrics($kpiID)
    {
        $this->setStatement("SELECT * FROM `hr_target_metrics` WHERE kpi_id = ? ORDER BY target_metrics_score DESC");
        $this->statement->execute([$kpiID]);
        return $this->statement->fetchAll();
    }
}
