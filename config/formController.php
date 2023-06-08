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


    function selectUserPillarPercentage()
    {
        $this->setStatement("SELECT 
    hr_eval_form.hr_eval_form_id,
    hr_eval_form.users_id,
    hr_pillars.pillar_id,
    hr_pillars.pillar_name,
    hr_eval_form_pillars.pillar_percentage
    FROM 
    hr_eval_form
    JOIN 
    hr_eval_form_pillars ON hr_eval_form.hr_eval_form_id = hr_eval_form_pillars.hr_eval_form_id
    JOIN 
    hr_pillars ON hr_eval_form_pillars.pillar_id = hr_pillars.pillar_id
    WHERE 
    hr_eval_form.users_id = 4");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }


    function selectUserPerformance()
    {
        $this->setStatement("SELECT 
        hr_eval_form.users_id, 
        hr_eval_form.approved_by, 
        hr_eval_form.approved_by_2, 
        hr_eval_form.recipient_signatory, 
        hr_eval_form.users_id, 
        hr_objectives.hr_eval_form_pillar_id,
        hr_eval_form_pillars.pillar_id,
        hr_eval_form_pillars.pillar_percentage,
        hr_pillars.pillar_name, 
        hr_objectives.hr_eval_form_fp_id, 
        hr_objectives.objective, 
        hr_kpi.objective_id, 
        hr_kpi.kpi_desc, 
        hr_kpi.kpi_weight,
        hr_eval_form_sp_yee.results,
        hr_eval_form_sp_yee.remarks,
        hr_eval_form_sp_yee.hr_eval_form_kpi_id,
        hr_eval_form_sp_yee_rating.hr_eval_form_sp_yee_id,
        hr_eval_form_sp_yee_rating.agreed_rating,
        hr_eval_form_sp_yee_rating.wtd_rating
    FROM 
        hr_eval_form
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
    JOIN 
        hr_eval_form_sp_yee_rating ON hr_eval_form_sp_yee_rating.hr_eval_form_sp_yee_id = hr_eval_form_sp_yee.hr_eval_form_sp_yee_id
    WHERE 
        hr_eval_form.users_id = '4'");
        $this->statement->execute();

        return $this->statement->fetchAll();
    }

    function selectUserSignOff()
    {
        $this->setStatement("SELECT 
        hr_eval_form.*, 
        hr_users.supervisor_id, 
        hr_users.immediate_supervisor_id 
        FROM hr_eval_form
        JOIN hr_users ON hr_users.users_id = hr_eval_form.users_id WHERE hr_users.users_id = '4'");
        $this->statement->execute();
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
