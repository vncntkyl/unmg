<?php
require_once 'controller.php';
Class formController extends Controller
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
    function pillarCount()
    {
        $this->setStatement("SELECT COUNT(*) as `Count` FROM `hr_pillars`");
        $this->statement->execute();
        return $this->statement->fetch();
    }
    function updatePillar($pillarID,$pillarName)
    {
        $this->setStatement("UPDATE `hr_pillars` SET pillar_name = :pillarName WHERE pillar_id = :pillarID");
        return $this->statement->execute([':pillarID' => $pillarID, ':pillarName' => $pillarName]);
    }
    function deletePillar($pillarID,$pillarName)
    {
        $this->setStatement("UPDATE `hr_pillars` SET deleted = '1' WHERE pillar_id = :pillarID");
        return $this->statement->execute([':pillarID' => $pillarID]);
    }
    function restorePillar($pillarID,$pillarName)
    {
        $this->setStatement("UPDATE `hr_pillars` SET deleted = '0' WHERE pillar_id = :pillarID");
        return $this->statement->execute([':pillarID' => $pillarID]);
    }
    function insertGoals($formPillarsID,$latestFpID,$objDesc)
    {
        $this->setStatement("INSERT into `hr_objectives` (hr_eval_form_pillar_id, hr_eval_form_fp_id ,objective) VALUES (:formPillarID,:formFpID,:objective)");
        return $this->statement->execute([':formPillarID' => $formPillarsID ,':formFpID'=> $latestFpID,':objective' => $objDesc]);
    }
    function updateGoals($evalFpID,$formPillarsID,$objDesc)
    {
        $this->setStatement("UPDATE `hr_objectives` set objective = :objective WHERE hr_eval_form_pillar_id = :formPillarID and hr_eval_form_fp_id = :evalFpID");
        return $this->statement->execute([':evalFpID' => $evalFpID,':formPillarID' => $formPillarsID ,':objective' => $objDesc]);
    }
    function GoalsCount($formID)
    {
        $this->setStatement("SELECT COUNT(*) as `Count` FROM `hr_objectives` WHERE hr_eval_form_fp_id = :formID");
        $this->statement->execute([':formID' => $formID]);
        return $this->statement->fetch();
    }
    function LastGoalsID()
    {
        $this->setStatement("SELECT objective_id FROM `hr_objectives` order by objective_id DESC LIMIT 1");
        $this->statement->execute();
        return $this->statement->fetch();
    }
    function insertKPI($kpiDesc,$objectID,$weight)
    {
        $this->setStatement("INSERT into `hr_kpi` (kpi_desc,objective_id,kpi_weight) VALUES (:kpi_desc,:objectID,:KPIweight)");
        return $this->statement->execute([':kpi_desc' => $kpiDesc, ':objectID' => $objectID,':KPIweight' => $weight]);
    }
    function updateKPI($kpiDesc, $objectID,$weight)
    {
        $this->setStatement("UPDATE `hr_kpi` set kpi_desc = :kpi_desc, kpi_weight = :KPIweight  WHERE objective_id = :objectID");
        return $this->statement->execute([':kpi_desc' => $kpiDesc, ':objectID' => $objectID,':KPIweight' => $weight]);
    }
    function kpiCount($objID)
    {
        $this->setStatement("SELECT COUNT(*) as `Count` FROM `hr_kpi` WHERE objective_id = :objID");
        $this->statement->execute([':objID' => $objID]);
        return $this->statement->fetch();
    }
    function LastKpiID()
    {
        $this->setStatement("SELECT kpi_id FROM `hr_kpi` order by kpi_id DESC LIMIT 1");
        $this->statement->execute();
        return $this->statement->fetch();
    }
    function createEvalForm($userid)
    {
        $this->setStatement("INSERT into `hr_eval_form` (users_id) VALUES (:id)");
        return $this->statement->execute([':id' => $userid]);
    }
    function selectLastformID()
    {
        $this->setStatement("SELECT hr_eval_form_id FROM `hr_eval_form` order by hr_eval_form_id DESC LIMIT 1");
        $this->statement->execute();
        return $this->statement->fetch();
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
        return $this->statement->execute([':formID' => $formID]);
    }
    function selectLastEvalFormFpID()
    {
        $this->setStatement("SELECT hr_eval_form_fp_id FROM `hr_eval_form_fp` order by hr_eval_form_fp_id DESC LIMIT 1");
        $this->statement->execute();
        return $this->statement->fetch();
    }
    function createEvalFormSp($formID)
    {
        $this->setStatement("INSERT into `hr_eval_form_sp` (eval_form_id) VALUES (:formID)");
        return $this->statement->execute([':formID' => $formID]);
    }
    function selectLastEvalFormSpID()
    {
        $this->setStatement("SELECT hr_eval_form_sp_id FROM `hr_eval_form_sp` order by hr_eval_form_sp_id DESC LIMIT 1");
        $this->statement->execute();
        return $this->statement->fetch();
    }
    function createEvalFormPillarsPart($formID,$pillarID,$latestFpID,$pillarperc)
    {
        $this->setStatement("INSERT into `hr_eval_form_pillars` (hr_eval_form_id,pillar_id,hr_eval_form_fp_id,pillar_percentage) VALUES (:formid,:pillarid,:latestFpID,:pillarperc)");
        return $this->statement->execute([':formid' => $formID,':pillarid' => $pillarID,':latestFpID'=> $latestFpID,':pillarperc' => $pillarperc]);
    }
    function selectLastPillarFormID()
    {
        $this->setStatement("SELECT hr_eval_form_pillar_id FROM `hr_eval_form_pillars` order by hr_eval_form_pillar_id DESC LIMIT 1");
        $this->statement->execute();
        return $this->statement->fetch();
    }
    function insertTargetMetrics($TMScore,$TMDesc,$kpiID)
    {
        $this->setStatement("INSERT into `hr_target_metrics` (target_metrics_score,target_metrics_desc,kpi_id) VALUES (:TMScore,:TMDesc,:kpiID)");
        return $this->statement->execute([':TMScore' => $TMScore, ':TMDesc' => $TMDesc,':kpiID' => $kpiID]);
    }
    function insertFqEval($formPillarID,$latestSpID)
    {
        $this->setStatement("INSERT into `hr_eval_form_sp_fq` (hr_eval_form_pillars_id,hr_eval_form_sp_id) VALUES (:formPillarID,:formSpID)");
        return $this->statement->execute([':formPillarID' => $formPillarID, ':formSpID' => $latestSpID]);
    }
    function insertMyrEval($formPillarID,$latestSpID)
    {
        $this->setStatement("INSERT into `hr_eval_form_sp_myr` (hr_eval_form_pillars_id,hr_eval_form_sp_id) VALUES (:formPillarID,:formSpID)");
        return $this->statement->execute([':formPillarID' => $formPillarID, ':formSpID' => $latestSpID]);
    }
    function insertTqEval($formPillarID,$latestSpID)
    {
        $this->setStatement("INSERT into `hr_eval_form_sp_tq` (hr_eval_form_pillars_id,hr_eval_form_sp_id) VALUES (:formPillarID,:formSpID)");
        return $this->statement->execute([':formPillarID' => $formPillarID, ':formSpID' => $latestSpID]);
    }
    function insertYeEval($formPillarID,$latestSpID)
    {
        $this->setStatement("INSERT into `hr_eval_form_sp_yee` (hr_eval_form_pillars_id,hr_eval_form_sp_id) VALUES (:formPillarID,:formSpID)");
        return $this->statement->execute([':formPillarID' => $formPillarID, ':formSpID' => $latestSpID]);
    }
    function InsertRatingForYearEndEvaluation($latestYearEndValID)
    {
        $this->setStatement("INSERT into `hr_eval_form_sp_yee_rating` (hr_eval_form_sp_yee_id) VALUES (:yearEndRateID");
        return $this->statement->execute([':yearEndRateID' => $latestYearEndValID]);
    }
    function selectLastYearEndEvalID()
    {
        $this->setStatement("SELECT hr_eval_form_sp_yee_id  FROM `hr_eval_form_sp_yee` order by hr_eval_form_sp_yee_id DESC LIMIT 1");
        $this->statement->execute();
        return $this->statement->fetch();
    }
    function EvaluationForFirstQT($results,$remarks,$reviewDate,$formPillarID,$latestSpID)
    {
        $this->setStatement("UPDATE `hr_eval_form_sp_fq` SET results = :results, remarks = :remarks, fq_review_date = :revDate  WHERE hr_eval_form_pillars_id = :formPillarID and hr_eval_form_sp_id = :formSpID");
        return $this->statement->execute([':results' => $results,':remarks' => $remarks,':revDate' => $reviewDate,':formPillarID' => $formPillarID, ':formSpID' => $latestSpID]);
    }
    function EvaluationForMidyear($formPillarID,$results,$status,$remarks,$reviewDate,$actToAddress,$latestSpID)
    {
        $this->setStatement("UPDATE `hr_eval_form_sp_myr` SET results = :results, status = :status, remarks = :remarks, actions_to_address = :actAddress, myr_review_date = :revDate) WHERE hr_eval_form_pillars_id = :formPillarID and hr_eval_form_sp_id = :formSpID");
        return $this->statement->execute([':results' => $results,':remarks' => $remarks,':status' => $status,':actAddress'=>$actToAddress,':revDate' => $reviewDate,':formPillarID' => $formPillarID, ':formSpID' => $latestSpID]);
    }
    function EvaluationForThirdQT($formPillarID,$results,$reVariance,$reviewDate,$latestSpID)
    {
        $this->setStatement("UPDATE `hr_eval_form_sp_tq` SET results = :results, reason_for_variance = :reVariance, tq_review_date = :revDate) WHERE hr_eval_form_pillars_id = :formPillarID and hr_eval_form_sp_id = :formSpID");
        return $this->statement->execute([':results' => $results,':reVariance' => $reVariance,':revDate' => $reviewDate,':formPillarID' => $formPillarID, ':formSpID' => $latestSpID]);
    }
    function EvaluationForYearEnd($formPillarID,$results,$remarks,$reviewDate,$latestSpID)
    {
        $this->setStatement("UPDATE `hr_eval_form_sp_yee` SET results = :results, remarks = :remarks, yee_review_date = :revDate WHERE hr_eval_form_pillars_id = :formPillarID and hr_eval_form_sp_id = :formSpID");
        return $this->statement->execute([':results' => $results,':remarks' => $remarks,':revDate' => $reviewDate,':formPillarID' => $formPillarID, ':formSpID' => $latestSpID]);
    }
    function RatingForYearEndEvaluation($agreedRate,$weightedRating,$latestYearEndValID)
    {
        $this->setStatement("UPDATE `hr_eval_form_sp_yee_rating` SET agreed_rating = :agreedrating, wtd_rating = :weightedRate WHERE hr_eval_form_sp_yee_id  = :yearEndRateID");
        return $this->statement->execute([':agreedrating' => $agreedRate,':weightedRate' => $weightedRating,':yearEndRateID' => $latestYearEndValID]);
    }
}
?>