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
            $fetchedFormID = array();
            foreach($latestFormID as $fetch)
            {
            array_push($fetchedFormID, $fetch);
            }
            $evalFormID = $fetchedFormID[0];
            createEvalFormPillarsPart($formID,$pillarID,$pillarperc)
            if(isset($_POST['objectiveDesc']))
            {
                $objDesc = $_POST['objectiveDesc'];
                $countOfObjective = count($objDesc) - 1;
                for($x = 0; $x <= $countOfObjective; $x++)
                {
                    $formController->insertGoals($evalFormID,$objDesc);
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