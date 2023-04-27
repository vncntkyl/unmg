<?php
require_once 'controller.php';
Class formController extends Controller
{
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
        $this->setStatement("SELECT COUNT(*) as `Count` FROM `hr_objectives` WHERE hr_eval_form_fp_id = ':formID'");
        $this->statement->execute([':formID' => $formID]);
        return $this->statement->fetch();
    }
    function LastGoalsID()
    {
        $this->setStatement("SELECT objective_id FROM `hr_objectives` order by objective_id DESC LIMIT 1");;
        $this->statement->execute();
        return $this->statement->fetch();
    }
    function insertKPI($kpiDesc, $objectID,$weight)
    {
        $this->setStatement("INSERT into `hr_kpi` (kpi_desc,objective_id,kpi_weight) VALUES (:kpi_desc,:objectID,:weight)'");
        return $this->statement->execute([':kpi_desc' => $kpiDesc, ':objectID' => $objectID,':weight' => $weight]);
    }
    function kpiCount($objID)
    {
        $this->setStatement("SELECT COUNT(*) as `Count` FROM `hr_kpi` WHERE objective_id = ':objID'");
        $this->statement->execute([':objID' => $objID]);
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
    function createEvalFormFp($formID, $formPillarsID)
    {
        $this->setStatement("INSERT into `hr_eval_form_fp` (hr_eval_form_id,hr_eval_form_pillars_id) VALUES (:formID,:formPillarsID)");
        return $this->statement->execute([':formID' => $formID, ':formPillarsID' => $formPillarsID]);
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

    



}
?>