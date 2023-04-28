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
    function insertGoals($evalFormID,$formPillarsID,$objDesc)
    {
        $this->setStatement("INSERT into `hr_objectives` (hr_eval_form_id,	hr_eval_form_pillar_id ,objective) VALUES (:evalID,:formPillarID,:objective)");
        return $this->statement->execute([':evalID' => $evalFormID,':formPillarID' => $formPillarsID ,':objective' => $objDesc]);
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
    function insertKPI($kpiDesc, $objectID,$weight)
    {
        $this->setStatement("INSERT into `hr_kpi` (kpi_desc,objective_id,kpi_weight) VALUES (:kpi_desc,:objectID,:weight)");
        return $this->statement->execute([':kpi_desc' => $kpiDesc, ':objectID' => $objectID,':weight' => $weight]);
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
        $this->setStatement("INSERT into `hr_eval_form` (hr_eval_form_id) VALUES (:id)");
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
    
    function createEvalFormFp($formID, $formPillarsID)
    {
        $this->setStatement("INSERT into `hr_eval_form_fp` (hr_eval_form_id,hr_eval_form_pillars_id) VALUES (:formID,:formPillarsID)");
        return $this->statement->execute([':formID' => $formID, ':formPillarsID' => $formPillarsID]);
    }
    function createEvalFormSp($formID)
    {
        $this->setStatement("INSERT into `hr_eval_form_sp` (eval_form_id) VALUES (:formID)");
        return $this->statement->execute([':formID' => $formID]);
    }
    function createEvalFormPillarsPart($formID,$pillarID,$pillarperc)
    {
        $this->setStatement("INSERT into `hr_eval_form_fp` (hr_eval_form_id,pillar_id,pillar_percentage) VALUES (:formid,:pillarid,:pillarperc)");
        return $this->statement->execute([':formid' => $formID,':pillarid' => $pillarID,':pillarperc' => $pillarperc]);
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
    function insertFqEval($formID,$results,$remarks,$reviewDate)
    {
        $this->setStatement("INSERT into `hr_eval_form_sp_fq` (hr_eval_form_id,results,remarks,fq_review_date) VALUES (:formID,:results,:remarks,:revDate)");
        return $this->statement->execute([':formID' => $formID, ':results' => $results,':remarks' => $remarks,':revDate' => $reviewDate]);
    }
    function insertMyrEval($formID,$results,$status,$remarks,$reviewDate,$actToAddress)
    {
        $this->setStatement("INSERT into `hr_eval_form_sp_myr` (eval_form_id,results,status,remarks,actions_to_address,myr_review_date) VALUES (:formID,:results,:status,:remarks,:actAddress,:revDate)");
        return $this->statement->execute([':formID' => $formID, ':results' => $results,':remarks' => $remarks,':status' => $status,':actAddress'=>$actToAddress,':revDate' => $reviewDate]);
    }
    function insertTqEval($formID,$results,$reVariance,$reviewDate)
    {
        $this->setStatement("INSERT into `hr_eval_form_sp_tq` (eval_form_id,results,reason_for_variance,tq_review_date) VALUES (:formID,:results,:reVariance,:revDate)");
        return $this->statement->execute([':formID' => $formID, ':results' => $results,':reVariance' => $reVariance,':revDate' => $reviewDate]);
    }
    function insertYeEval($formID,$results,$remarks,$reviewDate)
    {
        $this->setStatement("INSERT into `hr_eval_form_sp_yee` (eval_form_id,results,remarks,yee_review_date) VALUES (:formID,:results,:remarks,:revDate)");
        return $this->statement->execute([':formID' => $formID, ':results' => $results,':remarks' => $remarks,':revDate' => $reviewDate]);
    }
    


}
?>