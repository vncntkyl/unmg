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
    function createEvalForm($userid, $workyear)
    {
        $this->setStatement("INSERT into `hr_eval_form` (users_id, CreationDate) VALUES (:id, :work_year)");
        if ($this->statement->execute([':id' => $userid, ':work_year' => $workyear])) {
            return $this->connection->lastInsertId();
        }
    }
    function selectFormIDForSpecUser($userID)
    {
        $this->setStatement("SELECT hr_eval_form_id FROM `hr_eval_form` WHERE users_id = :userID");
        $this->statement->execute([':userID' => $userID]);
        return $this->statement->fetch();
    }

    function createEvalFormFp($formID, $created_by, $goal_owner)
    {
        $sqlQuery = "INSERT into `hr_eval_form_fp` (eval_form_id, ";
        if ($created_by === $goal_owner) {
            //may created_by pero for approval pa
            $sqlQuery .= "created_by) VALUES (:formID, :owner)";
            $this->setStatement($sqlQuery);
            if ($this->statement->execute([':formID' => $formID, ':owner' => $goal_owner])) {
                return $this->connection->lastInsertId();
            }
        } else {
            //created_by ay yung employee and then approved by automatically by superior
            $sqlQuery .= "created_by, approved_by) VALUES (:formID, :owner, :creator)";
            $this->setStatement($sqlQuery);
            if ($this->statement->execute([':formID' => $formID, ':owner' => $goal_owner, ':creator' => $created_by])) {
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
    function insertRatings($sp_id)
    {
        $this->setStatement("BEGIN;
        INSERT INTO hr_eval_form_sp_fq_rating (hr_eval_form_sp_id) VALUES (:sp_id);
        INSERT INTO hr_eval_form_sp_myr_rating (hr_eval_form_sp_id) VALUES (:sp_id);
        INSERT INTO hr_eval_form_sp_tq_rating (hr_eval_form_sp_id) VALUES (:sp_id);
        INSERT INTO hr_eval_form_sp_yee_rating (hr_eval_form_sp_id) VALUES (:sp_id);
        
        COMMIT;");
        return $this->statement->execute([":sp_id" => $sp_id]);
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
        $this->setStatement("UPDATE `hr_eval_form_sp_yee_rating` SET agreed_rating = :agreedrating, wtd_rating = :weightedRate WHERE yee_rating_id  = :yearEndRateID");
        return $this->statement->execute([':agreedrating' => $agreedRate, ':weightedRate' => $weightedRating, ':yearEndRateID' => $latestYearEndValID]);
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
    function approveGoal($approver, $id)
    {
        $this->setStatement("UPDATE `hr_eval_form_fp` SET `approved_by`= ? WHERE hr_eval_form_fp_id = ?");
        return $this->statement->execute([$approver, $id]);
    }
    function isGoalApproved($workyear, $creator, $approver)
    {
        $this->setStatement("SELECT COUNT(*) AS status FROM hr_eval_form_fp fp JOIN hr_eval_form ef ON fp.eval_form_id = ef.hr_eval_form_id WHERE ef.CreationDate = ? AND fp.created_by = ? AND fp.approved_by = ?");
        $this->statement->execute([$workyear, $creator, $approver]);
        return $this->statement->fetch();
    }
    function fetchEvaluationForm($userID, $workYear)
    {
        $this->setStatement(
            "SELECT
            hr_eval_form_fp.hr_eval_form_fp_id,
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
            hr_eval_form_pillars.pillar_percentage
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

    function fetchGoals($user_id)
    {
        $this->setStatement("SELECT a.users_id, b.pillar_id, b.pillar_percentage, c.objective_id, d.kpi_id, e.target_metrics_id 
        FROM hr_eval_form AS a 
        JOIN hr_eval_form_pillars AS b ON a.hr_eval_form_id = b.hr_eval_form_id
        JOIN hr_objectives AS c ON c.hr_eval_form_pillar_id = b.hr_eval_form_pillar_id
        JOIN hr_kpi AS d ON d.objective_id = c.objective_id
        JOIN hr_target_metrics AS e ON e.kpi_id = d.kpi_id WHERE a.users_id = ?");
        $this->statement->execute([$user_id]);
        return $this->statement->fetchAll();
    }
    function getEmployeeGoals($workyear, $is_count = false)
    {
        $this->setStatement("SELECT
        u.users_id,
        u.employee_id,
        IF(u.middle_name <> '.', CONCAT(u.last_name, ', ', u.first_name, ' ', LEFT(u.middle_name, 1), '.'), CONCAT(u.last_name, ', ', u.first_name)) AS full_name,
        u.contract_type,
        IF(ef.users_id IS NULL AND ef.CreationDate IS NULL, 0, IF(ef.CreationDate = :work_year, 1, 0)) AS has_eval,
        MAX(CASE WHEN (ef.CreationDate IS NOT NULL AND ef.CreationDate = :work_year) AND p.pillar_id = 1 THEN p.pillar_percentage ELSE '-' END) AS pillar_1,
        MAX(CASE WHEN (ef.CreationDate IS NOT NULL AND ef.CreationDate = :work_year) AND p.pillar_id = 2 THEN p.pillar_percentage ELSE '-' END) AS pillar_2,
        MAX(CASE WHEN (ef.CreationDate IS NOT NULL AND ef.CreationDate = :work_year) AND p.pillar_id = 3 THEN p.pillar_percentage ELSE '-' END) AS pillar_3,
        MAX(CASE WHEN (ef.CreationDate IS NOT NULL AND ef.CreationDate = :work_year) AND p.pillar_id = 4 THEN p.pillar_percentage ELSE '-' END) AS pillar_4,
        CASE
            WHEN (ef.CreationDate IS NOT NULL AND ef.CreationDate = :work_year) AND (fp.created_by <> '' AND fp.approved_by <> '') THEN '1'
            WHEN (ef.CreationDate IS NOT NULL AND ef.CreationDate = :work_year) AND (fp.created_by <> '' OR fp.approved_by <> '') THEN '2'
            ELSE '3'
        END AS status
        FROM
            hr_users u
            LEFT JOIN hr_eval_form ef ON ef.users_id = u.users_id
            LEFT JOIN hr_eval_form_fp fp ON fp.eval_form_id = ef.hr_eval_form_id
            LEFT JOIN hr_eval_form_pillars p ON p.hr_eval_form_id = ef.hr_eval_form_id
        WHERE
            u.contract_type IN ('regular', 'probationary') 
            AND u.hire_date <= CONCAT(YEAR(CURRENT_DATE()), '-09-30') 
        GROUP BY
        u.users_id");
        $this->statement->execute([":work_year" => $workyear]);
        if ($is_count) {
            return $this->statement->rowCount();
        } else {
            return $this->statement->fetchAll();
        }
    }
    function getEvaluatorEmployeeGoals($evaluator, $is_count = false, $workyear)
    {
        $this->setStatement("SELECT
        u.users_id,
        u.employee_id,
        IF(u.middle_name <> '.', CONCAT(u.last_name, ', ', u.first_name, ' ', LEFT(u.middle_name, 1), '.'), CONCAT(u.last_name, ', ', u.first_name)) AS full_name,
        u.contract_type,
        IF(ef.users_id IS NULL AND ef.CreationDate IS NULL, 0, IF(ef.CreationDate = :work_year, 1, 0)) AS has_eval,
        MAX(CASE WHEN (ef.CreationDate IS NOT NULL AND ef.CreationDate = :work_year) AND p.pillar_id = 1 THEN p.pillar_percentage ELSE '-' END) AS pillar_1,
        MAX(CASE WHEN (ef.CreationDate IS NOT NULL AND ef.CreationDate = :work_year) AND p.pillar_id = 2 THEN p.pillar_percentage ELSE '-' END) AS pillar_2,
        MAX(CASE WHEN (ef.CreationDate IS NOT NULL AND ef.CreationDate = :work_year) AND p.pillar_id = 3 THEN p.pillar_percentage ELSE '-' END) AS pillar_3,
        MAX(CASE WHEN (ef.CreationDate IS NOT NULL AND ef.CreationDate = :work_year) AND p.pillar_id = 4 THEN p.pillar_percentage ELSE '-' END) AS pillar_4,
        CASE
            WHEN (ef.CreationDate IS NOT NULL AND ef.CreationDate = :work_year) AND (fp.created_by <> '' AND fp.approved_by <> '') THEN '1'
            WHEN (ef.CreationDate IS NOT NULL AND ef.CreationDate = :work_year) AND (fp.created_by <> '' OR fp.approved_by <> '') THEN '2'
            ELSE '3'
        END AS status
        FROM
        hr_users u
        LEFT JOIN hr_eval_form ef ON ef.users_id = u.users_id
        LEFT JOIN hr_eval_form_fp fp ON fp.eval_form_id = ef.hr_eval_form_id
        LEFT JOIN hr_eval_form_pillars p ON p.hr_eval_form_id = ef.hr_eval_form_id
        WHERE
        u.contract_type IN ('regular', 'probationary') 
        AND u.hire_date <= CONCAT(YEAR(CURRENT_DATE()), '-09-30') 
        AND (u.primary_evaluator = :evaluator OR u.secondary_evaluator = :evaluator OR u.tertiary_evaluator = :evaluator) AND u.users_id != 1
        GROUP BY
        u.users_id");
        $this->statement->execute([":evaluator" => $evaluator, ":work_year" => $workyear]);
        if ($is_count) {
            return $this->statement->rowCount();
        } else {
            return $this->statement->fetchAll();
        }
    }
    function getEmployeeGoalsData()
    {
        $this->setStatement("SELECT   COUNT(CASE WHEN status = '3' AND contract_type = 'regular' THEN 1 END) AS waiting_regular,
		COUNT(CASE WHEN status = '3' AND contract_type = 'probationary' THEN 1 END) AS waiting_probationary,
         COUNT(CASE WHEN status = '2' AND contract_type = 'regular' THEN 1 END) AS pending_regular,
		COUNT(CASE WHEN status = '2' AND contract_type = 'probationary' THEN 1 END) AS pending_probationary
            FROM (
                SELECT
                    u.users_id,
                    CONCAT(u.first_name, ' ', LEFT(u.middle_name, 1), '.', ' ', u.last_name) AS full_name,
                    u.contract_type,
                    CASE
                        WHEN ef.users_id IS NULL THEN 0
                        ELSE 1
                    END AS has_eval,
                    MAX(CASE WHEN p.pillar_id = 1 THEN p.pillar_percentage ELSE '-' END) AS pillar_1,
                    MAX(CASE WHEN p.pillar_id = 2 THEN p.pillar_percentage ELSE '-' END) AS pillar_2,
                    MAX(CASE WHEN p.pillar_id = 3 THEN p.pillar_percentage ELSE '-' END) AS pillar_3,
                    MAX(CASE WHEN p.pillar_id = 4 THEN p.pillar_percentage ELSE '-' END) AS pillar_4,
                    CASE
                        WHEN fp.created_by <> '' AND fp.approved_by <> '' THEN '1'
                        WHEN fp.created_by <> '' OR fp.approved_by <> '' THEN '2'
                        ELSE '3'
                    END AS status
                FROM
                    hr_users u
                    LEFT JOIN hr_eval_form ef ON ef.users_id = u.users_id
                    LEFT JOIN hr_eval_form_fp fp ON fp.eval_form_id = ef.hr_eval_form_id
                    LEFT JOIN hr_eval_form_pillars p ON p.hr_eval_form_id = ef.hr_eval_form_id
                WHERE
                    u.contract_type IN ('regular', 'probationary') AND u.hire_date <= CONCAT(YEAR(CURRENT_DATE()), '-09-30')
                GROUP BY
                    u.users_id
            ) AS subquery;");
        $this->statement->execute();
        return $this->statement->fetch();
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
    function fetchAllEvaluations()
    {
        $this->setStatement("SELECT CONCAT(hr_users.last_name,',', ' ',hr_users.first_name,' ',hr_users.middle_name) AS 'Name',company,department,hr_users.job_description AS 'Job_Title',
        hr_eval_form_sp_pillar_ratings.firstQuarterTotalResult as 'First_Quarter', 
        hr_eval_form_sp_pillar_ratings.midYearTotalResult as 'Second_Quarter', 
        hr_eval_form_sp_pillar_ratings.ThirdQuarterTotalResult as 'Third_Quarter', 
        hr_eval_form_sp_pillar_ratings.fourthQuarterTotalResult as 'Fourth_Quarter',
        hr_eval_form_sp_pillar_ratings.YearEndTotalResult as 'Fifth_Quarter',
        hr_eval_form_sp_quarterly_ratings.FirstQuarterRating as 'FirstQuarterRating',
        hr_eval_form_sp_quarterly_ratings.MidYearRating as 'MidYearRating',
        hr_eval_form_sp_quarterly_ratings.ThirdQuarterRating as 'ThirdQuarterRating',
        hr_eval_form_sp_quarterly_ratings.FourthQuarterRating as 'FourthQuarterRating',
        hr_eval_form_sp_quarterly_ratings.YearEndRating as 'YearEndRating',
        hr_eval_form_pillars.pillar_id AS 'EvalPillarID', 
        hr_eval_form.hr_eval_form_id as 'MainFormId',
        hr_eval_form_pillars.hr_eval_form_id as 'ComparedFormId',
        hr_eval_form_pillars.pillar_id, 
        employee_id,
        contract_type,
        primary_evaluator,
        secondary_evaluator,
        tertiary_evaluator,
        employee_id,
        CreationDate as 'form_kpi_duration'
        FROM hr_eval_form
        JOIN hr_kpi_year_duration ON hr_eval_form.CreationDate = kpi_year_duration_id
        JOIN hr_users ON hr_eval_form.users_id = hr_users.users_id
        JOIN hr_eval_form_pillars ON hr_eval_form.hr_eval_form_id = hr_eval_form_pillars.hr_eval_form_id
        JOIN hr_eval_form_sp_pillar_ratings ON hr_eval_form_pillars.hr_eval_form_pillar_id = hr_eval_form_sp_pillar_ratings.eval_form_pillars_id
        JOIN hr_eval_form_sp_quarterly_ratings ON hr_eval_form.hr_eval_form_id = hr_eval_form_sp_quarterly_ratings.eval_form_id;");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function fetchPillarPercentageAndKPIDesc()
    {
        $this->setStatement("SELECT CONCAT(hr_users.last_name,',', ' ',hr_users.first_name,' ',hr_users.middle_name) AS 'Name',employee_id,company,department,hr_users.job_description AS 'Job_Title',
        hr_eval_form_pillars.pillar_percentage,
        hr_eval_form_pillars.pillar_id AS 
        'EvalPillarID', 
        hr_eval_form_pillars.pillar_id, 
        contract_type,
        hr_objectives.objective as 'objective',
        CreationDate as 'form_kpi_duration'
        FROM hr_eval_form
        JOIN hr_kpi_year_duration ON hr_eval_form.CreationDate = kpi_year_duration_id
        JOIN hr_users ON hr_eval_form.users_id = hr_users.users_id
        JOIN hr_eval_form_pillars ON hr_eval_form.hr_eval_form_id = hr_eval_form_pillars.hr_eval_form_id
        JOIN hr_objectives ON hr_eval_form_pillars.hr_eval_form_pillar_id = hr_objectives.hr_eval_form_pillar_id
        ");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }
    function insertKpiDuration($fromDate, $toDate)
    {
        $this->setStatement("INSERT into `hr_kpi_year_duration` (from_date,to_date) VALUES (:fromDate,:toDate)");
        return $this->statement->execute([':fromDate' => $fromDate, ':toDate' => $toDate]);
    }
    function selectKpiDuration()
    {
        $this->setStatement("SELECT * FROM `hr_kpi_year_duration`");
        $this->statement->execute();
        return $this->statement->fetchAll();
    }








    //CODE NI NORVIN
    // DASHBOARD
    // DASHBOARD FETCH GOALS
    function adminFetchGoals($creation_date)
    {
        $this->setStatement("SELECT
        COUNT(CASE WHEN contract_type = 'regular' THEN 1 END) AS regular,
        COUNT(CASE WHEN contract_type = 'probationary' THEN 1 END) AS probationary,
        COUNT(CASE WHEN status = 3 AND contract_type = 'regular' THEN 1 END) AS waiting_regular,
		COUNT(CASE WHEN status = 3 AND contract_type = 'probationary' THEN 1 END) AS waiting_probationary,
        COUNT(CASE WHEN status = 2 AND contract_type = 'regular' THEN 1 END) AS submitted_regular,
		COUNT(CASE WHEN status = 2 AND contract_type = 'probationary' THEN 1 END) AS submitted_probationary,
        COUNT(CASE WHEN status = 1 AND contract_type = 'regular' THEN 1 END) AS approved_regular,
		COUNT(CASE WHEN status = 1 AND contract_type = 'probationary' THEN 1 END) AS approved_probationary
            FROM (SELECT
                    u.users_id,
                    CONCAT(u.first_name, ' ', LEFT(u.middle_name, 1), '.', ' ', u.last_name) AS full_name,
                   IF(ef.users_id IS NULL AND ef.CreationDate IS NULL, 0, IF(ef.CreationDate = :creation_date, 1, 0)) AS creation_date,
                    u.contract_type,
                    CASE
                        WHEN ef.users_id IS NULL THEN 0
                        ELSE 1
                    END AS has_eval,
                    MAX(CASE WHEN p.pillar_id = 1 THEN p.pillar_percentage ELSE '' END) AS pillar_1,
                    MAX(CASE WHEN p.pillar_id = 2 THEN p.pillar_percentage ELSE '' END) AS pillar_2,
                    MAX(CASE WHEN p.pillar_id = 3 THEN p.pillar_percentage ELSE '' END) AS pillar_3,
                    MAX(CASE WHEN p.pillar_id = 4 THEN p.pillar_percentage ELSE '' END) AS pillar_4,
                    CASE
                        WHEN fp.created_by <> '' AND fp.approved_by <> '' THEN '1'
                        WHEN fp.created_by <> '' OR fp.approved_by <> '' THEN '2'
                        ELSE '3'
                    END AS status
                FROM
                    hr_users u
                    LEFT JOIN hr_eval_form ef ON ef.users_id = u.users_id
                    LEFT JOIN hr_eval_form_fp fp ON fp.eval_form_id = ef.hr_eval_form_id
                    LEFT JOIN hr_eval_form_pillars p ON p.hr_eval_form_id = ef.hr_eval_form_id
                    LEFT JOIN hr_user_accounts ua ON ua.users_id = u.users_id 
                WHERE
                    u.contract_type IN ('regular', 'probationary')
                AND u.hire_date <= CONCAT(YEAR(CURRENT_DATE()), '-09-30')
                  AND ua.user_type >= 4
                GROUP BY
                    u.users_id) AS subquery");
            $this->statement->execute(['creation_date' => $creation_date]);
            return $this->statement->fetch();
    }

    // DASHBOARD FETCH EVALUATIONS
    function adminFetchEvaluations($creation_date)
    {
        $this->setStatement("             SELECT
        COUNT(CASE WHEN contract_type = 'regular' THEN 1 END) AS regular,
        COUNT(CASE WHEN has_first_quarter = 0 AND contract_type = 'regular' THEN 1 END) AS waiting_first_quarter_regular,
        COUNT(CASE WHEN has_first_quarter = 1 AND contract_type = 'regular' THEN 1 END) AS first_quarter_regular,
        
        COUNT(CASE WHEN has_mid_year = 0 AND contract_type = 'regular' THEN 1 END) AS waiting_mid_year_regular,
        COUNT(CASE WHEN has_mid_year = 1 AND contract_type = 'regular' THEN 1 END) AS mid_year_regular,
        COUNT(CASE WHEN rate_myr = 1 AND contract_type = 'regular' THEN 1 END) AS rate_myr_regular,
        
        COUNT(CASE WHEN has_third_quarter = 0 AND contract_type = 'regular' THEN 1 END) AS waiting_third_quarter_regular,
        COUNT(CASE WHEN has_third_quarter = 1 AND contract_type = 'regular' THEN 1 END) AS third_quarter_regular,
        
        COUNT(CASE WHEN has_year_end = 0 AND contract_type = 'regular' THEN 1 END) AS waiting_year_end_regular,
        COUNT(CASE WHEN has_year_end = 1 AND contract_type = 'regular' THEN 1 END) AS year_end_regular,
        COUNT(CASE WHEN rate_yee = 1 AND contract_type = 'regular' THEN 1 END) AS rate_yee_regular,
        COUNT(CASE WHEN finish_yee = 1 AND contract_type = 'regular' THEN 1 END) AS finish_yee_regular,
        
        COUNT(CASE WHEN contract_type = 'probationary' THEN 1 END) AS probationary,
        
        COUNT(CASE WHEN has_first_quarter = 0 AND contract_type = 'probationary' THEN 1 END) AS waiting_first_quarter_probationary,
        COUNT(CASE WHEN has_first_quarter = 1 AND contract_type = 'probationary' THEN 1 END) AS first_quarter_probationary,
        
        COUNT(CASE WHEN has_mid_year = 0 AND contract_type = 'probationary' THEN 1 END) AS waiting_mid_year_probationary,
        COUNT(CASE WHEN has_mid_year = 1 AND contract_type = 'probationary' THEN 1 END) AS mid_year_probationary,
        COUNT(CASE WHEN rate_myr = 1 AND contract_type = 'probationary' THEN 1 END) AS rate_myr_probationary,
        
        COUNT(CASE WHEN has_third_quarter = 0 AND contract_type = 'probationary' THEN 1 END) AS waiting_third_quarter_probationary,
        COUNT(CASE WHEN has_third_quarter = 1 AND contract_type = 'probationary' THEN 1 END) AS third_quarter_probationary,
        
        COUNT(CASE WHEN has_year_end = 0 AND contract_type = 'probationary' THEN 1 END) AS waiting_year_end_probationary,
        COUNT(CASE WHEN has_year_end = 1 AND contract_type = 'probationary' THEN 1 END) AS year_end_probationary,
        COUNT(CASE WHEN rate_yee = 1 AND contract_type = 'probationary' THEN 1 END) AS rate_yee_probationary,
        COUNT(CASE WHEN finish_yee = 1 AND contract_type = 'probationary' THEN 1 END) AS finish_yee_probationary
        FROM(SELECT
            u.users_id,
            CONCAT(u.first_name, ' ', LEFT(u.middle_name, 1), '.', ' ', u.last_name) AS full_name,
            IF(ef.users_id IS NULL AND ef.CreationDate IS NULL, 0, IF(ef.CreationDate = :creation_date, 1, 0)) AS creation_date,
            u.contract_type,
            CASE
            WHEN ef.users_id IS NULL THEN 0
            ELSE 1
            END AS has_eval,
            
            CASE
            WHEN fq.achievements <> '' OR fq.results <> '' THEN 1
            ELSE 0
            END AS has_first_quarter,
            
            CASE
            WHEN myr.achievements <> '' OR myr.results <> '' OR myr.status <> '' THEN 1
            ELSE 0
            END AS has_mid_year,
            
            CASE
            WHEN tq.achievements <> '' OR tq.results <> '' THEN 1
            ELSE 0
            END AS has_third_quarter,
            
            CASE
            WHEN yee.achievements <> '' OR yee.results <> '' OR yee.agreed_rating <> '' THEN 1
            ELSE 0
            END AS has_year_end,
            
            CASE
            WHEN ef.myr_rater_1 <> '' OR ef.myr_rater_2 <> '' OR ef.myr_rater_3 <> '' THEN 1
            ELSE 0
            END AS rate_myr,
            
            CASE
                WHEN ef.yee_rater_1 <> 0 OR ef.yee_rater_2 <> 0 OR ef.yee_rater_3 <> 0 THEN 1
                ELSE 0
            END AS rate_yee,
            CASE
                WHEN ef.yee_rater_1 <> 0 AND ef.yee_rater_2 <> 0 AND ef.yee_rater_3 <> 0 THEN 1
                ELSE 0
            END AS finish_yee
            FROM
            hr_users u
            LEFT JOIN hr_eval_form ef ON ef.users_id = u.users_id
            LEFT JOIN hr_eval_form_sp sp ON sp.eval_form_id = ef.hr_eval_form_id
            LEFT JOIN hr_eval_form_sp_fq fq ON fq.hr_eval_form_sp_id = sp.hr_eval_form_sp_id
            LEFT JOIN hr_eval_form_sp_myr myr ON myr.hr_eval_form_sp_id = sp.hr_eval_form_sp_id
            LEFT JOIN hr_eval_form_sp_tq tq ON tq.hr_eval_form_sp_id = sp.hr_eval_form_sp_id
            LEFT JOIN hr_eval_form_sp_yee yee ON yee.hr_eval_form_sp_id = sp.hr_eval_form_sp_id
            LEFT JOIN hr_user_accounts ua ON ua.users_id = u.users_id 
        WHERE
            u.contract_type IN ('regular', 'probationary')
        AND u.hire_date <= CONCAT(YEAR(CURRENT_DATE()), '-09-30')
          AND ua.user_type >= 4
        GROUP BY
            u.users_id) AS subquery");
         $this->statement->execute(['creation_date' => $creation_date]);
         return $this->statement->fetch();
    }

    // DASHBOARD FETCH RANKINGS
    function adminFetchRankings($creation_date)
    {
        $this->setStatement("SELECT
        u.users_id,
        CONCAT(u.first_name, ' ', LEFT(u.middle_name, 1), '.', ' ', u.last_name) AS full_name,
        IF(ef.users_id IS NULL AND ef.CreationDate IS NULL, 0, IF(ef.CreationDate = :creation_date, 1, 0)) AS creation_date,
        spq.YearEndRating AS grade
        FROM
        hr_users u
        LEFT JOIN hr_eval_form ef ON ef.users_id = u.users_id
        LEFT JOIN hr_eval_form_sp_quarterly_ratings spq ON spq.eval_form_id = ef.hr_eval_form_id
        LEFT JOIN hr_user_accounts ua ON ua.users_id = u.users_id 
        WHERE
        u.hire_date <= CONCAT(YEAR(CURRENT_DATE()), '-09-30')
        AND ua.user_type >= 4
        ORDER BY spq.YearEndRating DESC");
        $this->statement->execute(['creation_date' => $creation_date]);
        return $this->statement->fetchAll();
    }

    //main tracking and assessment code
    function selectUserAssessment($table_name_results, $empID, $creation_date)
    {
        $this->setStatement(" 
        SELECT 
        hr_users.employee_id,
        hr_eval_form.hr_eval_form_id,
        hr_eval_form.CreationDate,
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

        hr_kpi.kpi_id AS kpi_kpi_id,
        hr_kpi.objective_id AS kpi_objective_id,
        hr_kpi.kpi_desc,
        hr_kpi.kpi_weight,

        {$table_name_results}.ID AS table_id,
        {$table_name_results}.achievements AS achievements,
        {$table_name_results}.results AS results,
        hr_metrics_desc.target_metrics_desc AS metrics_desc,
        {$table_name_results}.remarks AS remarks
        FROM hr_users
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
            hr_target_metrics AS hr_metrics_desc ON hr_metrics_desc.kpi_id = hr_kpi.kpi_id AND hr_metrics_desc.target_metrics_score = {$table_name_results}.results
        WHERE 
        hr_users.employee_id = :employee_id
        AND hr_eval_form.CreationDate = :creation_date
        ORDER BY hr_pillars.pillar_id ASC
        ");
        $this->statement->execute(['employee_id' => $empID, 'creation_date' => $creation_date]);
        return $this->statement->fetchAll();
    }
    function selectUserMyrAssessment($table_name_results, $empID, $creation_date)
    {
        $this->setStatement("
        SELECT 
        hr_users.employee_id,
        hr_eval_form.hr_eval_form_id,
        hr_eval_form.CreationDate,
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

        hr_kpi.kpi_id AS kpi_kpi_id,
        hr_kpi.objective_id AS kpi_objective_id,
        hr_kpi.kpi_desc,
        hr_kpi.kpi_weight,

        {$table_name_results}.ID AS table_id,
        {$table_name_results}.achievements AS achievements,
        {$table_name_results}.results AS results,
        {$table_name_results}.status AS status,
        hr_metrics_desc.target_metrics_desc AS metrics_desc,
        {$table_name_results}.remarks AS remarks
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
        hr_target_metrics AS hr_metrics_desc ON hr_metrics_desc.kpi_id = hr_kpi.kpi_id 
        AND hr_metrics_desc.target_metrics_score = {$table_name_results}.results
        WHERE 
        hr_users.employee_id = :employee_id
        AND hr_eval_form.CreationDate = :creation_date
        ORDER BY hr_pillars.pillar_id ASC
        ");
        $this->statement->execute(['employee_id' => $empID, 'creation_date' => $creation_date]);
        return $this->statement->fetchAll();
    }

    function selectUserYeeAssessment($table_name_results, $empID, $creation_date)
    {
        $this->setStatement("
        SELECT 
        hr_users.employee_id,
        hr_eval_form.hr_eval_form_id,
        hr_eval_form.CreationDate,
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

        hr_kpi.kpi_id AS kpi_kpi_id,
        hr_kpi.objective_id AS kpi_objective_id,
        hr_kpi.kpi_desc,
        hr_kpi.kpi_weight,

        {$table_name_results}.ID AS table_id,
        {$table_name_results}.achievements AS achievements,
        {$table_name_results}.results AS results,
        hr_metrics_desc.target_metrics_desc AS metrics_desc,
        {$table_name_results}.remarks AS remarks,
        {$table_name_results}.agreed_rating AS agreed_rating,
        {$table_name_results}.wtd_rating AS wtd_rating
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
        hr_target_metrics AS hr_metrics_desc ON hr_metrics_desc.kpi_id = hr_kpi.kpi_id 
        AND hr_metrics_desc.target_metrics_score = {$table_name_results}.results
        WHERE 
        hr_users.employee_id = :employee_id
        AND hr_eval_form.CreationDate = :creation_date
        ORDER BY hr_pillars.pillar_id ASC
        ");
        $this->statement->execute(['employee_id' => $empID, 'creation_date' => $creation_date]);
        return $this->statement->fetchAll();
    }

    // additional for tracking and assessment
    function totalUserAssessment($empID)
    {
        $this->setStatement("
        SELECT 
        hr_users.employee_id,
        hr_eval_form_pillars.pillar_id,
        hr_pillars.pillar_name,
        hr_eval_form_sp_pillar_ratings.firstQuarterTotalResult,
        hr_eval_form_sp_pillar_ratings.midYearTotalResult,
        hr_eval_form_sp_pillar_ratings.ThirdQuarterTotalResult,
        hr_eval_form_sp_pillar_ratings.fourthQuarterTotalResult,
        hr_eval_form_sp_pillar_ratings.YearEndTotalResult,
        
        hr_eval_form_sp_quarterly_ratings.eval_form_id,
        CASE
        WHEN ROW_NUMBER() OVER (PARTITION BY hr_eval_form_sp_quarterly_ratings.FirstQuarterRating ORDER BY hr_eval_form_sp_quarterly_ratings.FirstQuarterRating) = 1
            THEN hr_eval_form_sp_quarterly_ratings.FirstQuarterRating
        ELSE ''
        END AS FirstQuarterRating,
        
        CASE
        WHEN ROW_NUMBER() OVER (PARTITION BY hr_eval_form_sp_quarterly_ratings.MidYearRating ORDER BY hr_eval_form_sp_quarterly_ratings.MidYearRating) = 1
            THEN hr_eval_form_sp_quarterly_ratings.MidYearRating
        ELSE ''
        END AS MidYearRating,
        
        CASE
        WHEN ROW_NUMBER() OVER (PARTITION BY hr_eval_form_sp_quarterly_ratings.ThirdQuarterRating ORDER BY hr_eval_form_sp_quarterly_ratings.ThirdQuarterRating) = 1
            THEN hr_eval_form_sp_quarterly_ratings.ThirdQuarterRating
        ELSE ''
        END AS ThirdQuarterRating,   
        
        CASE
        WHEN ROW_NUMBER() OVER (PARTITION BY hr_eval_form_sp_quarterly_ratings.FourthQuarterRating ORDER BY hr_eval_form_sp_quarterly_ratings.FourthQuarterRating) = 1
            THEN hr_eval_form_sp_quarterly_ratings.FourthQuarterRating
        ELSE ''
        END AS FourthQuarterRating,      
  
        CASE
        WHEN ROW_NUMBER() OVER (PARTITION BY hr_eval_form_sp_quarterly_ratings.YearEndRating ORDER BY hr_eval_form_sp_quarterly_ratings.YearEndRating) = 1
            THEN hr_eval_form_sp_quarterly_ratings.YearEndRating
        ELSE ''
        END AS YearEndRating
            
        FROM 
            hr_users
        LEFT JOIN
            hr_eval_form ON hr_users.users_id = hr_eval_form.users_id
        LEFT JOIN 
            hr_eval_form_pillars ON hr_eval_form_pillars.hr_eval_form_id = hr_eval_form.hr_eval_form_id
        LEFT JOIN
            hr_pillars ON hr_pillars.pillar_id = hr_eval_form_pillars.pillar_id
        LEFT JOIN
            hr_eval_form_sp_pillar_ratings ON hr_eval_form_sp_pillar_ratings.eval_form_pillars_id = hr_eval_form_pillars.hr_eval_form_pillar_id
        LEFT JOIN
        	hr_eval_form_sp_quarterly_ratings ON hr_eval_form_sp_quarterly_ratings.eval_form_id = hr_eval_form.hr_eval_form_id
        WHERE 
            hr_users.employee_id = ?
        ");
        $this->statement->execute([$empID]);
        return $this->statement->fetchAll();
    }
    //check personal achievements
    function checkUserAchievements($empID, $creation_date)
    {
        $this->setStatement("
        SELECT
        hr_users.users_id,
        hr_users.employee_id,
        
        hr_kpi_year_duration.from_date,
        hr_kpi_year_duration.to_date,
        hr_eval_form_sp.hr_eval_form_sp_id,
        hr_kpi.kpi_id,
        hr_kpi.kpi_desc,
        hr_eval_form_sp_fq.achievements AS fq_achievements,
        hr_eval_form_sp_myr.achievements AS myr_achievements,
        hr_eval_form_sp_tq.achievements AS tq_achievements,
        hr_eval_form_sp_yee.achievements AS yee_achievements,
        
        hr_eval_form_sp_fq.results AS fq_results,
        hr_eval_form_sp_myr.results AS myr_results,
        hr_eval_form_sp_tq.results AS tq_results,
        hr_eval_form_sp_yee.results AS yee_results,
    
        hr_eval_form_sp_yee.agreed_rating AS agreed_rating
        
        FROM hr_users
    
        LEFT JOIN
            hr_eval_form ON hr_eval_form.users_id = hr_users.users_id
        LEFT JOIN
            hr_kpi_year_duration ON hr_kpi_year_duration.kpi_year_duration_id = hr_eval_form.CreationDate
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
            hr_eval_form_sp_fq ON hr_eval_form_sp_fq.hr_eval_form_kpi_id = hr_kpi.kpi_id   
        LEFT JOIN
            hr_eval_form_sp_myr ON hr_eval_form_sp_myr.hr_eval_form_kpi_id = hr_kpi.kpi_id  
        LEFT JOIN
            hr_eval_form_sp_tq ON hr_eval_form_sp_tq.hr_eval_form_kpi_id = hr_kpi.kpi_id
        LEFT JOIN
            hr_eval_form_sp_yee ON hr_eval_form_sp_yee.hr_eval_form_kpi_id = hr_kpi.kpi_id
            WHERE employee_id = :employee_id
            AND hr_eval_form.CreationDate = :creation_date
        ");
        $this->statement->execute([':employee_id' => $empID, ':creation_date' => $creation_date]);
        return $this->statement->fetchAll();
    }

    //check employee assessments
    function selectEmployeeAssessment($empID, $contractType = 'all', $workYear)
    {
        $sql = "SELECT
        employee.users_id,
        employee.employee_id AS employee_id,
        employee.first_name,
        employee.contract_type,
        CONCAT(employee.first_name, ' ', LEFT(employee.middle_name, 1), '. ', employee.last_name) AS employee_name,
        CONCAT(primary_eval.first_name, ' ', LEFT(primary_eval.middle_name, 1), '. ', primary_eval.last_name) AS primary_eval_name,
        CONCAT(secondary_eval.first_name, ' ', LEFT(secondary_eval.middle_name, 1), '. ', secondary_eval.last_name) AS secondary_eval_name,
        CONCAT(tertiary_eval.first_name, ' ', LEFT(tertiary_eval.middle_name, 1), '. ', tertiary_eval.last_name) AS tertiary_eval_name,
        hr_user_accounts.user_type,
        IF(hr_eval_form.users_id IS NULL AND hr_eval_form.CreationDate IS NULL, 0, IF(hr_eval_form.CreationDate = :creation_date, 1, 0)) AS creation_date,
    
        hr_eval_form.myr_rater_1 AS myr_rater_1,
        hr_eval_form.myr_rater_2 AS myr_rater_2,
        hr_eval_form.myr_rater_3 AS myr_rater_3,
        
        hr_eval_form.rater_1 AS yee_rater_1,
        hr_eval_form.rater_2 AS yee_rater_2,
        hr_eval_form.rater_3 AS yee_rater_3,
        
        hr_eval_form_sp.hr_eval_form_sp_id AS sp_id,
        hr_eval_form_sp_fq.achievements AS fq_achievements,
        hr_eval_form_sp_fq.results AS fq_results,
        hr_eval_form_sp_fq.remarks AS fq_remarks,
        
        hr_eval_form_sp_myr.achievements AS myr_achievements,
        hr_eval_form_sp_myr.results AS myr_results,
        hr_eval_form_sp_myr.remarks AS myr_remarks,
        
        hr_eval_form_sp_tq.achievements AS tq_achievements,
        hr_eval_form_sp_tq.results AS tq_results,
        hr_eval_form_sp_tq.remarks AS tq_remarks,
        
        hr_eval_form_sp_yee.achievements AS yee_achievements,
        hr_eval_form_sp_yee.results AS yee_results,
        hr_eval_form_sp_yee.remarks AS yee_remarks,
        hr_eval_form_sp_yee.agreed_rating AS agreed_rating
    
        
        FROM hr_users AS employee
        
        LEFT JOIN hr_users AS primary_eval ON primary_eval.employee_id = employee.primary_evaluator
        LEFT JOIN hr_users AS secondary_eval ON secondary_eval.employee_id = employee.secondary_evaluator
        LEFT JOIN hr_users AS tertiary_eval ON tertiary_eval.employee_id = employee.tertiary_evaluator 
        LEFT JOIN 
        hr_user_accounts ON hr_user_accounts.users_id = employee.users_id
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
            hr_eval_form_sp_fq ON hr_eval_form_sp_fq.hr_eval_form_kpi_id = hr_kpi.kpi_id   
        LEFT JOIN
            hr_eval_form_sp_myr ON hr_eval_form_sp_myr.hr_eval_form_kpi_id = hr_kpi.kpi_id  
        LEFT JOIN
            hr_eval_form_sp_tq ON hr_eval_form_sp_tq.hr_eval_form_kpi_id = hr_kpi.kpi_id
        LEFT JOIN
            hr_eval_form_sp_yee ON hr_eval_form_sp_yee.hr_eval_form_kpi_id = hr_kpi.kpi_id
        WHERE 
        (employee.primary_evaluator = :rater_id OR employee.secondary_evaluator = :rater_id OR employee.tertiary_evaluator = :rater_id)";
        if ($contractType !== "all") {
            $sql .= " AND employee.contract_type = :contract_type ORDER BY hr_user_accounts.user_type ASC, employee.last_name ASC";
            $this->setStatement($sql);
            $this->statement->execute([':contract_type' => $contractType, ':creation_date' => $workYear, ':rater_id' => $empID]);
        } else {
            $sql .= " ORDER BY hr_user_accounts.user_type ASC, employee.last_name ASC";
            $this->setStatement($sql);
            $this->statement->execute([':creation_date' => $workYear, ':rater_id' => $empID]);
        }
        return $this->statement->fetchAll();
    }

    //check employee assessments admin
    function selectAllEmployeeAssessment($contractType = 'all', $workYear)
    {
        $sql = "SELECT
        employee.users_id,
        employee.employee_id AS employee_id,
        employee.first_name,
        employee.contract_type,
        CONCAT(employee.first_name, ' ', LEFT(employee.middle_name, 1), '. ', employee.last_name) AS employee_name,
        CONCAT(primary_eval.first_name, ' ', LEFT(primary_eval.middle_name, 1), '. ', primary_eval.last_name) AS primary_eval_name,
        CONCAT(secondary_eval.first_name, ' ', LEFT(secondary_eval.middle_name, 1), '. ', secondary_eval.last_name) AS secondary_eval_name,
        CONCAT(tertiary_eval.first_name, ' ', LEFT(tertiary_eval.middle_name, 1), '. ', tertiary_eval.last_name) AS tertiary_eval_name,
        hr_user_accounts.user_type,
        IF(hr_eval_form.users_id IS NULL AND hr_eval_form.CreationDate IS NULL, 0, IF(hr_eval_form.CreationDate = :creation_date, 1, 0)) AS creation_date,
      
        hr_eval_form.myr_rater_1 AS myr_rater_1,
        hr_eval_form.myr_rater_2 AS myr_rater_2,
        hr_eval_form.myr_rater_3 AS myr_rater_3,
        hr_eval_form.rater_1 AS yee_rater_1,
        hr_eval_form.rater_2 AS yee_rater_2,
        hr_eval_form.rater_3 AS yee_rater_3,
        
        hr_eval_form_sp.hr_eval_form_sp_id AS sp_id,
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
        
        LEFT JOIN hr_users AS primary_eval ON primary_eval.employee_id = employee.primary_evaluator
        LEFT JOIN hr_users AS secondary_eval ON secondary_eval.employee_id = employee.secondary_evaluator
        LEFT JOIN hr_users AS tertiary_eval ON tertiary_eval.employee_id = employee.tertiary_evaluator 
        LEFT JOIN 
        hr_user_accounts ON hr_user_accounts.users_id = employee.users_id
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
            hr_eval_form_sp_fq ON hr_eval_form_sp_fq.hr_eval_form_kpi_id = hr_kpi.kpi_id   
        LEFT JOIN
            hr_eval_form_sp_myr ON hr_eval_form_sp_myr.hr_eval_form_kpi_id = hr_kpi.kpi_id  
        LEFT JOIN
            hr_eval_form_sp_tq ON hr_eval_form_sp_tq.hr_eval_form_kpi_id = hr_kpi.kpi_id
        LEFT JOIN
      hr_eval_form_sp_yee ON hr_eval_form_sp_yee.hr_eval_form_kpi_id = hr_kpi.kpi_id
       ";
        if ($contractType !== "all") {
            $sql .= " WHERE employee.contract_type = :contract_type ORDER BY hr_user_accounts.user_type ASC, employee.last_name ASC";
            $this->setStatement($sql);
            $this->statement->execute([':contract_type' => $contractType, ':creation_date' => $workYear]);
        } else {
            $sql .= " ORDER BY hr_user_accounts.user_type ASC, employee.last_name ASC";
            $this->setStatement($sql);
            $this->statement->execute([':creation_date' => $workYear]);
        }
        return $this->statement->fetchAll();
    }

    function selectIndividualEmployeeAssessmentAchievements($empID, $creation_date)
    {
        $this->setStatement("
        SELECT
        employee.users_id,
        employee.employee_id AS employee_id,
        employee.first_name,
        employee.contract_type,
        CONCAT(employee.first_name, ' ', LEFT(employee.middle_name, 1), '. ', employee.last_name) AS employee_name,
        CONCAT(primary_eval.first_name, ' ', LEFT(primary_eval.middle_name, 1), '. ', primary_eval.last_name) AS primary_eval_name,
        CONCAT(secondary_eval.first_name, ' ', LEFT(secondary_eval.middle_name, 1), '. ', secondary_eval.last_name) AS secondary_eval_name,
        CONCAT(tertiary_eval.first_name, ' ', LEFT(tertiary_eval.middle_name, 1), '. ', tertiary_eval.last_name) AS tertiary_eval_name,
        hr_user_accounts.user_type,
        IF(hr_eval_form.users_id IS NULL AND hr_eval_form.CreationDate IS NULL, 0, IF(hr_eval_form.CreationDate = :creation_date, 1, 0)) AS creation_date,
    
        hr_eval_form.hr_eval_form_id,
        hr_kpi_year_duration.from_date,
        hr_kpi_year_duration.to_date,
        hr_kpi.kpi_desc,
        hr_kpi.kpi_id AS kpi_kpi_id,
        hr_eval_form_fp.hr_eval_form_fp_id AS first_part_id,
        hr_eval_form.myr_rater_1 AS myr_rater_1,
        hr_eval_form.myr_rater_2 AS myr_rater_2,
        hr_eval_form.myr_rater_3 AS myr_rater_3,
        
        hr_eval_form.rater_1 AS yee_rater_1,
        hr_eval_form.rater_2 AS yee_rater_2,
        hr_eval_form.rater_3 AS yee_rater_3,
        
        hr_eval_form_sp.hr_eval_form_sp_id AS sp_id,
        hr_eval_form_sp_fq.achievements AS fq_achievements,
        hr_eval_form_sp_fq.results AS fq_results,
        hr_eval_form_sp_fq.remarks AS fq_remarks,
        
        hr_eval_form_sp_myr.achievements AS myr_achievements,
        hr_eval_form_sp_myr.results AS myr_results,
        hr_eval_form_sp_myr.remarks AS myr_remarks,
        
        hr_eval_form_sp_tq.achievements AS tq_achievements,
        hr_eval_form_sp_tq.results AS tq_results,
        hr_eval_form_sp_tq.remarks AS tq_remarks,
        
        hr_eval_form_sp_yee.achievements AS yee_achievements,
        hr_eval_form_sp_yee.results AS yee_results,
        hr_eval_form_sp_yee.remarks AS yee_remarks,
        hr_eval_form_sp_yee.agreed_rating AS agreed_rating
      
        
        FROM hr_users AS employee
        
        LEFT JOIN hr_users AS primary_eval ON primary_eval.employee_id = employee.primary_evaluator
        LEFT JOIN hr_users AS secondary_eval ON secondary_eval.employee_id = employee.secondary_evaluator
        LEFT JOIN hr_users AS tertiary_eval ON tertiary_eval.employee_id = employee.tertiary_evaluator 
        LEFT JOIN 
        hr_user_accounts ON hr_user_accounts.users_id = employee.users_id
        LEFT JOIN
        hr_eval_form ON hr_eval_form.users_id = employee.users_id
        LEFT JOIN
        hr_kpi_year_duration ON hr_kpi_year_duration.kpi_year_duration_id = hr_eval_form.CreationDate
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
            hr_eval_form_sp_fq ON hr_eval_form_sp_fq.hr_eval_form_kpi_id = hr_kpi.kpi_id   
        LEFT JOIN
            hr_eval_form_sp_myr ON hr_eval_form_sp_myr.hr_eval_form_kpi_id = hr_kpi.kpi_id  
        LEFT JOIN
            hr_eval_form_sp_tq ON hr_eval_form_sp_tq.hr_eval_form_kpi_id = hr_kpi.kpi_id
        LEFT JOIN
            hr_eval_form_sp_yee ON hr_eval_form_sp_yee.hr_eval_form_kpi_id = hr_kpi.kpi_id
        WHERE 
        employee.employee_id = :employee_id");
        $this->statement->execute([':employee_id' => $empID, ':creation_date' => $creation_date]);
        return $this->statement->fetchAll();
    }

    function selectTrackingEmployees($empID, $workYear)
    {
        $this->setStatement("
        SELECT
        employee.users_id,
        employee.employee_id AS employee_id,
        employee.first_name,
        employee.contract_type,
        CONCAT(employee.first_name, ' ', LEFT(employee.middle_name, 1), '. ', employee.last_name) AS employee_name,
        CONCAT(primary_eval.first_name, ' ', LEFT(primary_eval.middle_name, 1), '. ', primary_eval.last_name) AS primary_eval_name,
        CONCAT(secondary_eval.first_name, ' ', LEFT(secondary_eval.middle_name, 1), '. ', secondary_eval.last_name) AS secondary_eval_name,
        CONCAT(tertiary_eval.first_name, ' ', LEFT(tertiary_eval.middle_name, 1), '. ', tertiary_eval.last_name) AS tertiary_eval_name,
        hr_user_accounts.user_type,
        IF(hr_eval_form.users_id IS NULL AND hr_eval_form.CreationDate IS NULL, 0, IF(hr_eval_form.CreationDate = :creation_date, 1, 0)) AS creation_date,
    
        hr_eval_form.myr_rater_1 AS myr_rater_1,
        hr_eval_form.myr_rater_2 AS myr_rater_2,
        hr_eval_form.myr_rater_3 AS myr_rater_3,
        
        hr_eval_form.rater_1 AS yee_rater_1,
        hr_eval_form.rater_2 AS yee_rater_2,
        hr_eval_form.rater_3 AS yee_rater_3,
        
        hr_eval_form_sp.hr_eval_form_sp_id AS sp_id,
        hr_eval_form_sp_fq.achievements AS fq_achievements,
        hr_eval_form_sp_fq.results AS fq_results,
        hr_eval_form_sp_fq.remarks AS fq_remarks,
        
        hr_eval_form_sp_myr.achievements AS myr_achievements,
        hr_eval_form_sp_myr.results AS myr_results,
        hr_eval_form_sp_myr.remarks AS myr_remarks,
        
        hr_eval_form_sp_tq.achievements AS tq_achievements,
        hr_eval_form_sp_tq.results AS tq_results,
        hr_eval_form_sp_tq.remarks AS tq_remarks,
        
        hr_eval_form_sp_yee.achievements AS yee_achievements,
        hr_eval_form_sp_yee.results AS yee_results,
        hr_eval_form_sp_yee.remarks AS yee_remarks,
        hr_eval_form_sp_yee.agreed_rating AS agreed_rating
    
        
        FROM hr_users AS employee
        
        LEFT JOIN hr_users AS primary_eval ON primary_eval.employee_id = employee.primary_evaluator
        LEFT JOIN hr_users AS secondary_eval ON secondary_eval.employee_id = employee.secondary_evaluator
        LEFT JOIN hr_users AS tertiary_eval ON tertiary_eval.employee_id = employee.tertiary_evaluator 
        LEFT JOIN 
        hr_user_accounts ON hr_user_accounts.users_id = employee.users_id
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
            hr_eval_form_sp_fq ON hr_eval_form_sp_fq.hr_eval_form_kpi_id = hr_kpi.kpi_id   
        LEFT JOIN
            hr_eval_form_sp_myr ON hr_eval_form_sp_myr.hr_eval_form_kpi_id = hr_kpi.kpi_id  
        LEFT JOIN
            hr_eval_form_sp_tq ON hr_eval_form_sp_tq.hr_eval_form_kpi_id = hr_kpi.kpi_id
        LEFT JOIN
            hr_eval_form_sp_yee ON hr_eval_form_sp_yee.hr_eval_form_kpi_id = hr_kpi.kpi_id
        WHERE 
        (employee.primary_evaluator = :rater_id OR employee.secondary_evaluator = :rater_id OR employee.tertiary_evaluator = :rater_id)
        ORDER BY hr_user_accounts.user_type ASC, employee.last_name ASC
            ");
        $this->statement->execute([':rater_id' => $empID, ':creation_date' => $workYear]);
        return $this->statement->fetchAll();
    }

    function selectIndividualEmployeeAssessmentGrades($empID, $creation_date)
    {
        $this->setStatement("
        SELECT
        employee.users_id,
        employee.employee_id AS employee_id,
        employee.first_name,
        employee.contract_type,
        CONCAT(employee.first_name, ' ', LEFT(employee.middle_name, 1), '. ', employee.last_name) AS employee_name,
        hr_user_accounts.user_type,
        hr_eval_form_pillars.hr_eval_form_pillar_id AS eval_pillar_id,
        hr_pillars.pillar_id AS pillar_id,
        IF(hr_eval_form.users_id IS NULL AND hr_eval_form.CreationDate IS NULL, 0, IF(hr_eval_form.CreationDate = :creation_date, 1, 0)) AS creation_date,
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
    
        hr_kpi.kpi_id AS kpi_kpi_id,
        hr_kpi.objective_id AS kpi_objective_id,
        hr_kpi.kpi_desc,
        hr_kpi.kpi_weight,
        
        hr_eval_form.hr_eval_form_id,
        hr_kpi_year_duration.from_date,
        hr_kpi_year_duration.to_date,
        hr_eval_form_fp.hr_eval_form_fp_id AS first_part_id,
        hr_eval_form.myr_rater_1 AS myr_rater_1,
        hr_eval_form.myr_rater_2 AS myr_rater_2,
        hr_eval_form.myr_rater_3 AS myr_rater_3,
        
        hr_eval_form.rater_1 AS yee_rater_1,
        hr_eval_form.rater_2 AS yee_rater_2,
        hr_eval_form.rater_3 AS yee_rater_3,
        
        hr_eval_form_sp.hr_eval_form_sp_id AS sp_id,
        hr_eval_form_sp_fq.achievements AS fq_achievements,
        hr_eval_form_sp_fq.results AS fq_results,
        hr_eval_form_sp_fq.remarks AS fq_remarks,
        
        hr_eval_form_sp_myr.achievements AS myr_achievements,
        hr_eval_form_sp_myr.results AS myr_results,
        hr_eval_form_sp_myr.status AS myr_status,
        hr_eval_form_sp_myr.remarks AS myr_remarks,
        
        hr_eval_form_sp_tq.achievements AS tq_achievements,
        hr_eval_form_sp_tq.results AS tq_results,
        hr_eval_form_sp_tq.remarks AS tq_remarks,
        
        hr_eval_form_sp_yee.achievements AS yee_achievements,
        hr_eval_form_sp_yee.results AS yee_results,
        hr_eval_form_sp_yee.remarks AS yee_remarks,
        hr_eval_form_sp_yee.agreed_rating AS agreed_rating,
        hr_eval_form_sp_yee.wtd_rating AS wtd_rating
      
        
        FROM hr_users AS employee
        LEFT JOIN 
        hr_user_accounts ON hr_user_accounts.users_id = employee.users_id
        LEFT JOIN
        hr_eval_form ON hr_eval_form.users_id = employee.users_id
        LEFT JOIN
        hr_kpi_year_duration ON hr_kpi_year_duration.kpi_year_duration_id = hr_eval_form.CreationDate
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
            hr_eval_form_sp_fq ON hr_eval_form_sp_fq.hr_eval_form_kpi_id = hr_kpi.kpi_id   
        LEFT JOIN
            hr_eval_form_sp_myr ON hr_eval_form_sp_myr.hr_eval_form_kpi_id = hr_kpi.kpi_id  
        LEFT JOIN
            hr_eval_form_sp_tq ON hr_eval_form_sp_tq.hr_eval_form_kpi_id = hr_kpi.kpi_id
        LEFT JOIN
            hr_eval_form_sp_yee ON hr_eval_form_sp_yee.hr_eval_form_kpi_id = hr_kpi.kpi_id
        WHERE 
        employee.employee_id = :employee_id
        ORDER BY hr_pillars.pillar_id ASC
        ");
        $this->statement->execute([':employee_id' => $empID, ':creation_date' => $creation_date]);
        return $this->statement->fetchAll();
    }

    // function selectTrackingGrading($table_name_results, $creation_date, $empID)
    // {
    //     $this->setStatement("
    //     SELECT 
    //     hr_users.employee_id,
    //     CONCAT(hr_users.first_name, ' ', LEFT(hr_users.middle_name, 1), '. ', hr_users.last_name) AS employee_name,
    //     hr_eval_form.CreationDate,
    //     hr_eval_form_pillars.hr_eval_form_pillar_id AS eval_pillar_id,
    //     hr_pillars.pillar_id AS pillar_id,
    //     IF(hr_eval_form.users_id IS NULL AND hr_eval_form.CreationDate IS NULL, 0, IF(hr_eval_form.CreationDate = :creation_date, 1, 0)) AS creation_date,
    //     CASE
    //         WHEN ROW_NUMBER() OVER (PARTITION BY hr_pillars.pillar_name ORDER BY hr_pillars.pillar_name) = 1
    //             THEN hr_pillars.pillar_name
    //         ELSE ''
    //     END AS pillar_name,

    //     CASE
    //         WHEN ROW_NUMBER() OVER (PARTITION BY hr_pillars.pillar_description ORDER BY hr_pillars.pillar_description) = 1
    //             THEN hr_pillars.pillar_description
    //         ELSE ''
    //     END AS pillar_description,

    //     hr_eval_form_pillars.pillar_percentage,



    //     hr_objectives.objective_id AS obj_objective_id,
    //     hr_objectives.hr_eval_form_pillar_id AS obj_eval_pillar_id,

    //     CASE
    //         WHEN ROW_NUMBER() OVER (PARTITION BY hr_objectives.objective ORDER BY hr_objectives.objective) = 1
    //             THEN hr_objectives.objective
    //         ELSE ''
    //     END AS obj_objective,

    //     hr_kpi.kpi_id AS kpi_kpi_id,
    //     hr_kpi.objective_id AS kpi_objective_id,
    //     hr_kpi.kpi_desc,
    //     hr_kpi.kpi_weight,
    //     hr_eval_form_sp.hr_eval_form_sp_id,

    //     {$table_name_results}.ID AS table_id,
    //     {$table_name_results}.achievements AS achievements,
    //     {$table_name_results}.results AS results,
    //     hr_metrics_desc.target_metrics_desc AS metrics_desc,
    //     {$table_name_results}.remarks AS remarks
    //     FROM 
    //         hr_users
    //     LEFT JOIN
    //         hr_eval_form ON hr_users.users_id = hr_eval_form.users_id
    //     LEFT JOIN 
    //         hr_eval_form_fp ON hr_eval_form_fp.eval_form_id = hr_eval_form.hr_eval_form_id
    //     LEFT JOIN 
    //         hr_objectives ON hr_objectives.hr_eval_form_fp_id = hr_eval_form_fp.hr_eval_form_fp_id
    //     LEFT JOIN 
    //         hr_eval_form_pillars ON hr_eval_form_pillars.hr_eval_form_pillar_id = hr_objectives.hr_eval_form_pillar_id
    //     LEFT JOIN
    //         hr_pillars ON hr_pillars.pillar_id = hr_eval_form_pillars.pillar_id
    //     LEFT JOIN 
    //         hr_kpi ON hr_kpi.objective_id = hr_objectives.objective_id
    //     LEFT JOIN
    //         hr_eval_form_sp ON hr_eval_form_sp.eval_form_id = hr_eval_form.hr_eval_form_id
    //     LEFT JOIN
    //         {$table_name_results} ON {$table_name_results}.hr_eval_form_kpi_id = hr_kpi.kpi_id
    //     LEFT JOIN
    //         hr_target_metrics AS hr_metrics_desc ON hr_metrics_desc.kpi_id = hr_kpi.kpi_id 
    //         AND hr_metrics_desc.target_metrics_score = {$table_name_results}.results
    //     WHERE 
    //         hr_users.employee_id = :employee_id
    //     ORDER BY hr_pillars.pillar_id ASC
    //     ");
    //     $this->statement->execute([':employee_id' => $empID, ':creation_date' => $creation_date]);
    //     return $this->statement->fetchAll();
    // }

    function selectTrackingGradingMetrics($empID)
    {
        $this->setStatement("
        SELECT 
        hr_objectives.objective_id,
        hr_kpi.kpi_id,
        hr_kpi.kpi_desc,
        hr_kpi.kpi_weight,
        hr_target_metrics.target_metrics_id,
        hr_target_metrics.target_metrics_score,
        hr_target_metrics.target_metrics_desc,
        hr_target_metrics.kpi_id AS metric_kpi_id
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
            hr_target_metrics ON hr_target_metrics.kpi_id = hr_kpi.kpi_id
        WHERE
        hr_users.employee_id = ?
        ");
        $this->statement->execute([$empID]);
        return $this->statement->fetchAll();
    }


    //submit achievement of user on quarter
    function updateUserAchievements($tbl_name, $formspID, $currentKpiId, $currentAchievement)
    {
        $this->setStatement("UPDATE {$tbl_name} SET achievements = :achievement WHERE hr_eval_form_kpi_id = :kpi_id AND hr_eval_form_sp_id = :hr_eval_form_sp_id");
        return $this->statement->execute([':achievement' => $currentAchievement, ':kpi_id' => $currentKpiId, ':hr_eval_form_sp_id' => $formspID]);
    }
    //Grade user based on quarter
    function updateUserAssessment($tbl_name, $formspID, $currentKpiId, $currenttotal_results, $currenttotal_remarks)
    {
        $this->setStatement("UPDATE {$tbl_name} SET results = :results, remarks = :remarks WHERE hr_eval_form_kpi_id = :hr_eval_form_kpi_id AND hr_eval_form_sp_id = :hr_eval_form_sp_id");
        return $this->statement->execute([':results' => $currenttotal_results, ':remarks' => $currenttotal_remarks, ':hr_eval_form_kpi_id' => $currentKpiId, ':hr_eval_form_sp_id' => $formspID]);
    }
    function updateUserMidYearAssessment($tbl_name, $formspID, $currentKpiId, $currenttotal_results, $currenttotal_status, $currenttotal_remarks)
    {
        $this->setStatement("UPDATE {$tbl_name} SET results = :results, status = :status, remarks = :remarks WHERE hr_eval_form_kpi_id = :hr_eval_form_kpi_id AND hr_eval_form_sp_id = :hr_eval_form_sp_id");
        return $this->statement->execute([':results' => $currenttotal_results, ':status' => $currenttotal_status, ':remarks' => $currenttotal_remarks, ':hr_eval_form_kpi_id' => $currentKpiId, ':hr_eval_form_sp_id' => $formspID]);
    }
    function updateUserYearEndAssessment($tbl_name, $formspID, $currentKpiId, $currenttotal_results, $currenttotal_rating, $currenttotal_weight, $currenttotal_remarks)
    {
        $this->setStatement("UPDATE {$tbl_name} SET results = :results, agreed_rating = :agreed_rating, wtd_rating = :wtd_rating, remarks = :remarks WHERE hr_eval_form_kpi_id = :hr_eval_form_kpi_id AND hr_eval_form_sp_id = :hr_eval_form_sp_id");
        return $this->statement->execute([':results' => $currenttotal_results, ':agreed_rating' => $currenttotal_rating, ':wtd_rating' => $currenttotal_weight, ':remarks' => $currenttotal_remarks, ':hr_eval_form_kpi_id' => $currentKpiId, ':hr_eval_form_sp_id' => $formspID]);
    }
    function updateTotalQuarterlyRating($yeetotal, $column, $evalID)
    {
        $this->setStatement("UPDATE hr_eval_form_sp_quarterly_ratings SET $column = :res WHERE eval_form_id = :eval_id");
        return $this->statement->execute([':res' => $yeetotal, 'eval_id' => $evalID]);
    }



    //1 on 1 discussion statements
    function insertDiscussion($subject, $description)
    {
        $this->setStatement("INSERT INTO hr_request_discussion (consultation_subject, description) VALUES (:consultation_subject, :description)");
        if ($this->statement->execute([':consultation_subject' => $subject, ':description' => $description])) {
            return $this->connection->lastInsertId();
        }
    }
    function updateUserRequestConsultation($ID, $employee_id)
    {
        $this->setStatement("UPDATE hr_users SET request_consult = :request_consult WHERE employee_id = :employee_id");
        return $this->statement->execute([':request_consult' => $ID, ':employee_id' => $employee_id]);
    }

    //assessment approval
    //select where is the rater placed
    //Mid Year
    function selectRaterPlacementMyr($rater_id, $employee_id)
    {
        $this->setStatement("
            SELECT 
                hr_eval_form.hr_eval_form_id AS form_id,
                CASE
                    WHEN hr_users.primary_evaluator = :rater_id THEN 'myr_rater_1'
                    WHEN hr_users.secondary_evaluator = :rater_id THEN 'myr_rater_2'
                    WHEN hr_users.tertiary_evaluator = :rater_id THEN 'myr_rater_3'
                END AS evaluator
            FROM hr_users
            JOIN hr_eval_form ON hr_eval_form.users_id = hr_users.users_id
            WHERE (hr_users.primary_evaluator = :rater_id OR hr_users.secondary_evaluator = :rater_id OR hr_users.tertiary_evaluator = :rater_id)
            AND hr_users.employee_id = :employee_id
        ");
        $this->statement->execute([':rater_id' => $rater_id, ':employee_id' => $employee_id]);
        return $this->statement->fetch();
    }
    //Year End
    function selectRaterPlacementYee($rater_id, $employee_id)
    {
        $this->setStatement("
            SELECT 
                hr_eval_form.hr_eval_form_id AS form_id,
                CASE
                    WHEN hr_users.primary_evaluator = :rater_id THEN 'yee_rater_1'
                    WHEN hr_users.secondary_evaluator = :rater_id THEN 'yee_rater_2'
                    WHEN hr_users.tertiary_evaluator = :rater_id THEN 'yee_rater_3'
                END AS evaluator
            FROM hr_users
            JOIN hr_eval_form ON hr_eval_form.users_id = hr_users.users_id
            WHERE (hr_users.primary_evaluator = :rater_id OR hr_users.secondary_evaluator = :rater_id OR hr_users.tertiary_evaluator = :rater_id)
            AND hr_users.employee_id = :employee_id
        ");
        $this->statement->execute([':rater_id' => $rater_id, ':employee_id' => $employee_id]);
        return $this->statement->fetch();
    }

    //update midyear
    function midyearApproveAssessment($rater, $rater_id, $sp_id)
    {
        $this->setStatement("UPDATE hr_eval_form SET {$rater} = :rater_id WHERE hr_eval_form_id = :sp_id");
        return $this->statement->execute([':rater_id' => $rater_id, ':sp_id' => $sp_id]);
    }

    function yearendApproveAssessment($rater, $rater_id, $form_id)
    {
        $this->setStatement("UPDATE hr_eval_form SET {$rater} = :rater_id WHERE hr_eval_form_id = :form_id");
        return $this->statement->execute([':rater_id' => $rater_id, ':form_id' => $form_id]);
    }







    //Agreement Sign Off
    function selectUserFinalGrade($empID, $creation_date)
    {
        $this->setStatement("
        SELECT 
        hr_users.employee_id,
        CONCAT(hr_users.first_name, ' ', LEFT(hr_users.middle_name, 1), '. ', hr_users.last_name) AS employee_name,
        hr_eval_form.hr_eval_form_id,
        hr_eval_form_pillars.hr_eval_form_pillar_id AS eval_pillar_id,
        hr_pillars.pillar_id AS pillar_id,
        IF(hr_eval_form.users_id IS NULL AND hr_eval_form.CreationDate IS NULL, 0, IF(hr_eval_form.CreationDate = :creation_date, 1, 0)) AS creation_date,
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


        hr_kpi_year_duration.from_date,
        hr_kpi_year_duration.to_date,
        hr_kpi.kpi_id AS kpi_kpi_id,
        hr_kpi.objective_id AS kpi_objective_id,
        hr_kpi.kpi_desc,
        hr_kpi.kpi_weight,
    
        hr_eval_form_sp_yee.ID AS table_id,
        hr_eval_form_sp_yee.results AS results,
        hr_metrics_desc.target_metrics_desc AS metrics_desc,
        hr_eval_form_sp_yee.remarks AS remarks,
        hr_eval_form_sp_yee.agreed_rating AS agreed_rating,
        hr_eval_form_sp_yee.wtd_rating AS wtd_rating
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
            hr_kpi_year_duration ON hr_kpi_year_duration.kpi_year_duration_id = hr_eval_form.CreationDate
        LEFT JOIN
            hr_eval_form_sp ON hr_eval_form_sp.eval_form_id = hr_eval_form.hr_eval_form_id
        LEFT JOIN
        hr_eval_form_sp_yee ON hr_eval_form_sp_yee.hr_eval_form_kpi_id = hr_kpi.kpi_id
        LEFT JOIN
            hr_target_metrics AS hr_metrics_desc ON hr_metrics_desc.kpi_id = hr_kpi.kpi_id 
            AND hr_metrics_desc.target_metrics_score = hr_eval_form_sp_yee.results
        WHERE 
            hr_users.employee_id = :employee_id
        AND hr_eval_form.CreationDate = :creation_date
        ORDER BY hr_pillars.pillar_id ASC
        ");
        $this->statement->execute([':employee_id' => $empID, ':creation_date' => $creation_date]);

        return $this->statement->fetchAll();
    }
    //Additional Agreement Sign Off
    function selectApprover($empID, $creation_date)
    {
        $this->setStatement("
        SELECT
        employee.users_id,
        employee.employee_id AS employee_id,
        employee.primary_evaluator,
        employee.secondary_evaluator,
        employee.tertiary_evaluator,
        employee.first_name,
        employee.contract_type,
        CONCAT(employee.first_name, ' ', LEFT(employee.middle_name, 1), '. ', employee.last_name) AS employee_name,
        CONCAT(primary_eval.first_name, ' ', LEFT(primary_eval.middle_name, 1), '. ', primary_eval.last_name) AS primary_eval_name,
        CONCAT(secondary_eval.first_name, ' ', LEFT(secondary_eval.middle_name, 1), '. ', secondary_eval.last_name) AS secondary_eval_name,
        CONCAT(tertiary_eval.first_name, ' ', LEFT(tertiary_eval.middle_name, 1), '. ', tertiary_eval.last_name) AS tertiary_eval_name,
        IF(hr_eval_form.users_id IS NULL AND hr_eval_form.CreationDate IS NULL, 0, IF(hr_eval_form.CreationDate = :creation_date, 1, 0)) AS creation_date,
        hr_eval_form.*,
        hr_eval_form_sp_quarterly_ratings.YearEndRating
        
        FROM hr_users AS employee
        LEFT JOIN hr_users AS primary_eval ON primary_eval.employee_id = employee.primary_evaluator
        LEFT JOIN hr_users AS secondary_eval ON secondary_eval.employee_id = employee.secondary_evaluator
        LEFT JOIN hr_users AS tertiary_eval ON tertiary_eval.employee_id = employee.tertiary_evaluator 
        LEFT JOIN 
        hr_user_accounts ON hr_user_accounts.users_id = employee.users_id
        LEFT JOIN
        hr_eval_form ON hr_eval_form.users_id = employee.users_id
        LEFT JOIN
        hr_eval_form_sp_quarterly_ratings ON hr_eval_form_sp_quarterly_ratings.eval_form_id = hr_eval_form.hr_eval_form_id
        LEFT JOIN
        hr_kpi_year_duration ON hr_kpi_year_duration.kpi_year_duration_id = hr_eval_form.CreationDate
        WHERE 
        employee.employee_id = :employee_id
        AND
        hr_eval_form.CreationDate = :creation_date
        ");
        $this->statement->execute([':employee_id' => $empID, ':creation_date' => $creation_date]);

        return $this->statement->fetchAll();
    }


    //Agreement Sign Off Employee Table 
    function selectEmployeeSignOffAssessment($empID, $contractType = 'all', $workYear)
    {
        $sql = "SELECT
        employee.users_id,
        employee.employee_id AS employee_id,
        employee.contract_type,
        employee.first_name,
        CONCAT(employee.first_name, ' ', LEFT(employee.middle_name, 1), '. ', employee.last_name) AS employee_name,
        CONCAT(primary_eval.first_name, ' ', LEFT(primary_eval.middle_name, 1), '. ', primary_eval.last_name) AS primary_eval_name,
        CONCAT(secondary_eval.first_name, ' ', LEFT(secondary_eval.middle_name, 1), '. ', secondary_eval.last_name) AS secondary_eval_name,
        CONCAT(tertiary_eval.first_name, ' ', LEFT(tertiary_eval.middle_name, 1), '. ', tertiary_eval.last_name) AS tertiary_eval_name,
        hr_user_accounts.user_type,
        hr_eval_form.*,
        IF(hr_eval_form.users_id IS NULL AND hr_eval_form.CreationDate IS NULL, 0, IF(hr_eval_form.CreationDate = :creation_date, 1, 0)) AS creation_date
        FROM hr_users AS employee
        LEFT JOIN hr_users AS primary_eval ON primary_eval.employee_id = employee.primary_evaluator
        LEFT JOIN hr_users AS secondary_eval ON secondary_eval.employee_id = employee.secondary_evaluator
        LEFT JOIN hr_users AS tertiary_eval ON tertiary_eval.employee_id = employee.tertiary_evaluator 
        LEFT JOIN 
        hr_user_accounts ON hr_user_accounts.users_id = employee.users_id
        LEFT JOIN
        hr_eval_form ON hr_eval_form.users_id = employee.users_id
        WHERE
        (employee.primary_evaluator = :rater_id OR employee.secondary_evaluator = :rater_id OR employee.tertiary_evaluator = :rater_id)";
        if ($contractType !== "all") {
            $sql .= " AND employee.contract_type = :contract_type ORDER BY hr_user_accounts.user_type ASC, employee.last_name ASC";
            $this->setStatement($sql);
            $this->statement->execute([':contract_type' => $contractType, ':creation_date' => $workYear, ':rater_id' => $empID]);
        } else {
            $sql .= " ORDER BY hr_user_accounts.user_type ASC, employee.last_name ASC";
            $this->setStatement($sql);
            $this->statement->execute([':creation_date' => $workYear, ':rater_id' => $empID]);
        }
        return $this->statement->fetchAll();
    }

    //Agreement Sign Off Select Evaluator
    function selectEvaluator($empID, $evaluator_id)
    {
        $this->setStatement("
            SELECT 
                hr_eval_form.hr_eval_form_id AS form_id,
                CASE
                    WHEN hr_users.primary_evaluator = :rater_id THEN 'rater_1'
                    WHEN hr_users.secondary_evaluator = :rater_id THEN 'rater_2'
                    WHEN hr_users.tertiary_evaluator = :rater_id THEN 'rater_3'
                END AS evaluator
            FROM hr_users
            JOIN hr_eval_form ON hr_eval_form.users_id = hr_users.users_id
            WHERE (hr_users.primary_evaluator = :rater_id OR hr_users.secondary_evaluator = :rater_id OR hr_users.tertiary_evaluator = :rater_id)
            AND hr_users.employee_id = :employee_id
        ");
        $this->statement->execute([':rater_id' => $evaluator_id, ':employee_id' => $empID]);
        return $this->statement->fetch();
    }

    //Sign Assessment
    function finalApproveAssessmentRater($eval_id, $rater_id, $evaluator_tier, $recommendation, $recommendation_id)
    {
        $this->setStatement("UPDATE hr_eval_form SET {$evaluator_tier} = :rater_id, {$recommendation_id} = :recommendation WHERE hr_eval_form_id = :eval_id");
        return $this->statement->execute([':rater_id' => $rater_id, ':eval_id' => $eval_id, 'recommendation' => $recommendation]);
    }
    function finalApproveAssessmentRatee($eval_id, $employee_id, $comments)
    {
        $this->setStatement("UPDATE hr_eval_form SET ratee = :employee_id, ratees_comment = :comments WHERE hr_eval_form_id = :eval_id");
        return $this->statement->execute([':employee_id' => $employee_id, ':eval_id' => $eval_id, 'comments' => $comments]);
    }
}
