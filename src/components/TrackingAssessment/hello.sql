SELECT
employee.users_id,
employee.emp_id,
employee.user_status,
CONCAT(employee.first_name, ' ', LEFT(employee.middle_name, 1), '. ', employee.last_name) AS employee_name,
CONCAT(primary_eval.first_name, ' ', LEFT(primary_eval.middle_name, 1), '. ', primary_eval.last_name) AS primary_eval_name,
CONCAT(secondary_eval.first_name, ' ', LEFT(secondary_eval.middle_name, 1), '. ', secondary_eval.last_name) AS secondary_eval_name,
CONCAT(tertiary_eval.first_name, ' ', LEFT(tertiary_eval.middle_name, 1), '. ', tertiary_eval.last_name) AS tertiary_eval_name,

hr_eval_form_sp.hr_eval_form_sp_id,
hr_eval_form_sp_fq.results AS fq_results,
hr_eval_form_sp_fq.remarks AS fq_remarks,

hr_eval_form_sp_myr.results AS myr_results,
hr_eval_form_sp_myr.remarks AS myr_remarks,

hr_eval_form_sp_tq.results AS tq_results,
hr_eval_form_sp_tq.remarks AS tq_remarks,

hr_eval_form_sp_yee.results AS yee_results,
hr_eval_form_sp_yee.remarks AS yee_remarks

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
    hr_eval_form_sp_fq ON hr_eval_form_sp_fq.hr_eval_form_kpi_id = hr_kpi.kpi_id
LEFT JOIN
    hr_eval_form_sp_myr ON hr_eval_form_sp_myr.hr_eval_form_kpi_id = hr_kpi.kpi_id
LEFT JOIN
    hr_eval_form_sp_tq ON hr_eval_form_sp_tq.hr_eval_form_kpi_id = hr_kpi.kpi_id
LEFT JOIN
    hr_eval_form_sp_yee ON hr_eval_form_sp_yee.hr_eval_form_kpi_id = hr_kpi.kpi_id
    
WHERE 
  (employee.rater_1 = 23052906 OR employee.rater_2 = 23052906 OR employee.rater_3 = 23052906)
   AND employee.user_status = 0








   SELECT
employee.users_id,
employee.emp_id,
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
hr_eval_form_sp_yee.remarks AS yee_remarks

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
  (employee.rater_1 = 23052906 OR employee.rater_2 = 23052906 OR employee.rater_3 = 23052906)
   AND employee.user_status = 0