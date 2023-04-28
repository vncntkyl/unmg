<?php
header("Access-Control-Allow-Origin: *");
require_once 'formController.php';
$formController = new formController();
if(isset($_POST['submit']))
{
    if(isset($_POST['userID']))
    {
        if($formController->createEvalForm($userid))
        {
            $latestFormID = $formController->selectLastformID();
            $formID = $latestFormID->hr_eval_form_id;
            $latestCount = $control->pillarCount();
            $count = $latestCount->Count;
            for($x = 1; $x<= $count; $x++)
            {
                $pillarID = $x;
                $pillarperc = $_POST['pillarPerc'] //dito mo lagay yung from top to bottom na pillar percentages
                $formController->createEvalFormPillarsPart($formID,$pillarID,$pillarperc[$x]);
                $PillarFormID = $formController->selectLastPillarFormID();
                $formPillarsID = $PillarFormID->hr_eval_form_pillar_id;
                $formController->createEvalFormFp($formID, $formPillarsID);
            }
            if(isset($_POST['objectiveDesc']))
            {
                $objDesc = $_POST['objectiveDesc'];
                $kpiDesc = $_POST['KpiDesc'];
                $weight = $_POST['weight'];
                $countOfObjective = count($objDesc) - 1;
                $countOfKpi = count($kpiDesc) - 1;
                for($x = 0; $x <= $countOfObjective; $x++)
                {
                    $formController->insertGoals($formID,$formPillarsID,$objDesc[$x]);
                    $fetchGoalID = $formController->LastGoalsID();
                    $objectID = $fetchGoalID->objective_id;
                    for($y = 0; $y <= $countOfKpi; $y++)
                    {
                        $TMScore = $_POST['targMetScore'];
                        $TMDesc = $_POST['targMetDesc'];
                        $formController->insertKPI($kpiDesc[$y], $objectID,$weight[$y]);
                        $retrieveKpiID = $formController->LastKpiID();
                        $kpiID = $retrieveKpiID->kpi_id;
                        $countOfDescAndScore = count($TMScore)- 1;
                        for($c = 0; $c <=$countOfDescAndScore; $c++)
                        {
                        $formController->insertTargetMetrics($TMScore[$c],$TMDesc[$c],$kpiID);
                        }
                    }
                }
                
            }
            else
            {
                //kyle palagay na lang kung pano mo ilalabas yung error dito
            }
        }
        else
        {
        //kyle palagay na lang kung pano mo ilalabas yung error dito
        }
    }
    else
    {
        //kyle palagay na lang kung pano mo ilalabas yung error dito
    }



}





?>