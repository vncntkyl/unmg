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
            $latestCount = $formController->pillarCount();
            $count = $latestCount->Count;
            $formController->createEvalFormFp($formID);
            $FetchFpFormID = $formController->selectLastEvalFormFpID();
            $latestFpID = $FetchFpFormID->hr_eval_form_fp_id;
            $formController->createEvalFormSp($formID);
            $FetchSpFormID = $formController->selectLastEvalFormSpID();
            $latestSpID = $FetchSpFormID->hr_eval_form_sp_id;
            for($x = 0; $x <= $count - 1; $x++)
            {
                $pillarID = $x + 1;
                $pillarperc = $_POST['pillarPerc']; //dito mo lagay yung from top to bottom na pillar percentages
                $formController->createEvalFormPillarsPart($formID,$pillarID,$latestFpID,$pillarperc[$x]);
                $PillarFormID = $formController->selectLastPillarFormID();
                $formPillarsID = $PillarFormID->hr_eval_form_pillar_id;
                $formPillarID = $formPillarsID;
                $formController->insertFqEval($formPillarID,$latestSpID);
                $formController->insertMyrEval($formPillarID,$latestSpID);
                $formController->insertTqEval($formPillarID,$latestSpID);
                $formController->insertYeEval($formPillarID,$latestSpID);
                $fetchYeID = $formController->selectLastYearEndEvalID();
                $latestYearEndValID = $fetchYeID->hr_eval_form_sp_yee_id;
                $formController->InsertRatingForYearEndEvaluation($latestYearEndValID);
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
                    $formController->insertGoals($formID,$formPillarsID,$latestFpID,$objDesc[$x]);
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