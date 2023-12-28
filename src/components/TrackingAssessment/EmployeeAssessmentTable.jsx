import React, { useEffect, useState, useRef } from "react";
import Badge from "../../misc/Badge";
import axios from "axios";
import TrackingAction from "./TrackingAction";
import { useAuth } from "../../context/authContext";
import { format } from "date-fns";
import { releaseAPIs as url } from "../../context/apiList";

export default function EmployeeAssessmentTable({ emp_id }) {
  const [employeeType, setEmployeeType] = useState(0);
  const [employeesRecords, setEmployeesRecords] = useState([]);
  const [getEmployees, setGetEmployees] = useState([]);
  const [checkRecords, setCheckRecords] = useState([]);
  const [loading, toggleLoading] = useState(true);
  const [actionVisibility, setActionVisibility] = useState(false);
  const { currentUser, kpiDurations } = useAuth();
  const [workYear, setWorkYear] = useState(-1);
  localStorage.setItem("assessment_quarter", 0);
  const toggleActionVisibility = () => {
    setActionVisibility((prev) => !prev);
  };

  const fqisColumnAllFalse =
    checkRecords.length > 0 &&
    checkRecords.every(
      (employee) => !employee.fq_achievements && !employee.fq_results
    );
  const myrisColumnAllFalse =
    checkRecords.length > 0 &&
    checkRecords.every(
      (employee) => !employee.myr_achievements && !employee.myr_results
    );
  const tqisColumnAllFalse =
    checkRecords.length > 0 &&
    checkRecords.every(
      (employee) => !employee.tq_achievements && !employee.tq_results
    );
  const yeeisColumnAllFalse =
    checkRecords.length > 0 &&
    checkRecords.every(
      (employee) => !employee.yee_achievements && !employee.yee_results
    );
  const yeeagreedisColumnAllFalse =
    checkRecords.length > 0 &&
    checkRecords.every(
      (employee) => !employee.agreed_rating && !employee.yee_results
    );

    
  const creation_dateColumnAllFalse =
    employeesRecords.length > 0 &&
    employeesRecords.every(
      (employee) => !employee.creation_date && !employee.creation_date
    );
  useEffect(() => {
    const getemployeesRecords = async () => {
      const parameters = {
        params: {
          empRecords: true,
          employeeType: employeeType,
          empID: JSON.parse(currentUser).user_type === "1" ? 1 : emp_id,
          workYear: workYear,
        },
      };
      try {
        const response = await axios.get(url.retrieveTrackingEmployee, parameters);
        console.log(response.data);

        const employeeRecords = response.data.map((item) => {
          return {
            employee_id: item.employee_id,
            first_name: item.first_name,
            employee_name: item.employee_name,
            sp_id: item.sp_id,
            creation_date: item.creation_date > 0 && item.creation_date !== null,
          };
        });
        setEmployeesRecords(employeeRecords);

        const empType = employeeType == 1 ? response.data.filter((item) => item.contract_type === "regular") : employeeType == 2 ? response.data.filter( (item) => item.contract_type === "probationary") : response.data.filter((item) => item.contract_type);
        setGetEmployees(empType);
        const emp = response.data.map((item) => {
          return {
            employee_id: item.employee_id,
            first_name: item.first_name,
            employee_name: item.employee_name,
            sp_id: item.sp_id,
            creation_date: item.creation_date > 0 && item.creation_date !== null,
              myr_rater_1: item.myr_rater_1 !== null && item.myr_rater_1 !== 0,
              myr_rater_2: item.myr_rater_2 !== null && item.myr_rater_2 !== 0,
              myr_rater_3: item.myr_rater_3 !== null && item.myr_rater_3 !== 0,
              yee_rater_1: item.yee_rater_1 !== null && item.yee_rater_1 !== 0,
              yee_rater_2: item.yee_rater_2 !== null && item.yee_rater_2 !== 0,
              yee_rater_3: item.yee_rater_3 !== null && item.yee_rater_3 !== 0,
            fq_achievements: item.fq_achievements !== "" && item.fq_achievements !== null,
            myr_achievements: item.myr_achievements !== "" && item.myr_achievements !== null,
            tq_achievements: item.tq_achievements !== "" && item.tq_achievements !== null,
            yee_achievements: item.yee_achievements !== "" && item.yee_achievements !== null,
            fq_results: item.fq_results != "" && item.fq_results !== null,
            myr_results: item.myr_results != "" && item.myr_results !== null,
            tq_results: item.tq_results != "" && item.tq_results !== null,
            yee_results: item.yee_results != "" && item.yee_results !== null,
            agreed_rating: item.agreed_rating != "" && item.agreed_rating !== null && item.agreed_rating != 0,
          };
        })
        setCheckRecords(emp);
        
      } catch (error) {
        console.log(error.message);
      }
    };
    getemployeesRecords();
    toggleLoading(false);
  }, [employeeType, workYear]);
  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="bg-default px-2 pb-4 pt-2 rounded-md">
        <div className="flex flex-row justify-between p-2 items-center gap-3">
          <div className="flex items-center gap-3">
            <span>Job Status:</span>
            <select
              className="text-black rounded-md p-1 px-2 outline-none"
              onChange={(event) => setEmployeeType(event.target.value)}
            >
              <option value={0}>All</option>
              <option value={1}>Regular</option>
              <option value={2}>Probationary</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <span>Select Work Year:</span>
            <select
              className="text-black rounded-md p-1 px-2 outline-none"
              onChange={(event) => setWorkYear(event.target.value)}
            >
              {" "}
              <option value="-1" disabled selected={workYear === -1}>
                --Select Year--
              </option>
              {kpiDurations.length > 0 &&
                kpiDurations.map((year) => {
                  return (
                    <option
                      value={year.kpi_year_duration_id}
                      selected={year.kpi_year_duration_id === workYear}
                    >
                      {format(new Date(year.from_date), "MMM d, yyyy") +
                        " - " +
                        format(new Date(year.to_date), "MMM d, yyyy")}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        {workYear != -1 ? (
          <>
            {!creation_dateColumnAllFalse ? (
              <>
                <table className="bg-white w-full">
                  <thead>
                    <tr className="bg-un-blue-light text-white pb-4">
                      <td>
                        <div className="flex justify-center px-2">Name</div>
                      </td>
                      <td>
                        <div className="flex justify-center px-2">Status</div>
                      </td>
                      <td>
                        <div className="flex justify-center px-2">
                          First Quarter
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center px-2">Mid Year</div>
                      </td>
                      <td>
                        <div className="flex justify-center px-2">
                          Third Quarter
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center px-2">Year End</div>
                      </td>
                      <td>
                        <div className="flex justify-center px-2">
                          Final Evaluation
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center px-2">Action</div>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {getEmployees.length !== 0 &&
                      getEmployees.map((employee, index) => (
                        <React.Fragment key={index}>
                          {index === 0 ||
                          employee.employee_id !==
                            getEmployees[index - 1].employee_id ? (
                            <tr>
                              <td>
                                <div className="pl-4 pt-2">
                                  {employee.employee_name}
                                </div>
                              </td>
                              <td>
                                <div className="flex items-center justify-center pt-2">
                                  {employee.creation_date == 0? (
                                    <Badge
                                      message={"No goals yet"}
                                      className={"text-[.8rem] px-2"}
                                    />
                                  ) : (
                                    <Badge
                                      message={"Ongoing"}
                                      type="success"
                                      className={"text-[.8rem] px-1"}
                                    />
                                  )}
                                  {/* SELECT
        employee.users_id,
        employee.employee_id AS employee_id,
        employee.first_name,
        employee.contract_type,
        CONCAT(employee.first_name, ' ', LEFT(employee.middle_name, 1), '. ', employee.last_name) AS employee_name,
        IF(hr_eval_form.users_id IS NULL AND hr_eval_form.CreationDate IS NULL, 0, IF(hr_eval_form.CreationDate = :creation_date, 1, 0)) AS creation_date,

        hr_eval_form.myr_rater_1 AS myr_rater_1,
        hr_eval_form.myr_rater_2 AS myr_rater_2,
        hr_eval_form.myr_rater_3 AS myr_rater_3,
        
        hr_eval_form.rater_1 AS yee_rater_1,
        hr_eval_form.rater_2 AS yee_rater_2,
        hr_eval_form.rater_3 AS yee_rater_3,
        
        hr_eval_form_sp.hr_eval_form_sp_id AS sp_id,
        
        CASE WHEN hr_eval_form_sp_fq.achievements <> '' THEN 1 ELSE 0 END AS fq_achievements,
        CASE WHEN hr_eval_form_sp_fq.results <> '' OR hr_eval_form_sp_fq.remarks <> '' THEN 1 ELSE 0 END AS fq_results_remarks,
        
        CASE WHEN hr_eval_form_sp_myr.achievements <> '' THEN 1 ELSE 0 END AS myr_achievements,
        CASE WHEN hr_eval_form_sp_myr.results <> '' OR hr_eval_form_sp_myr.remarks <> '' THEN 1 ELSE 0 END AS myr_results_remarks,
        
        CASE WHEN hr_eval_form_sp_tq.achievements <> '' THEN 1 ELSE 0 END AS tq_achievements,
        CASE WHEN hr_eval_form_sp_tq.results <> '' OR hr_eval_form_sp_tq.remarks <> '' THEN 1 ELSE 0 END AS tq_results_remarks,
        
        CASE WHEN hr_eval_form_sp_yee.achievements <> '' THEN 1 ELSE 0 END AS yee_achievements,
        CASE WHEN hr_eval_form_sp_yee.results <> '' OR hr_eval_form_sp_yee.remarks <> '' THEN 1 ELSE 0 END AS yee_results_remarks,
        hr_eval_form_sp_quarterly_ratings.YearEndRating AS agreed_rating
    
        
        FROM hr_users AS employee
        
        LEFT JOIN hr_users AS primary_eval ON primary_eval.employee_id = employee.primary_evaluator
        LEFT JOIN hr_users AS secondary_eval ON secondary_eval.employee_id = employee.secondary_evaluator
        LEFT JOIN hr_users AS tertiary_eval ON tertiary_eval.employee_id = employee.tertiary_evaluator 
        LEFT JOIN hr_user_accounts ON hr_user_accounts.users_id = employee.users_id
        LEFT JOIN hr_eval_form ON hr_eval_form.users_id = employee.users_id
        LEFT JOIN hr_eval_form_fp ON hr_eval_form_fp.eval_form_id = hr_eval_form.hr_eval_form_id
        LEFT JOIN hr_eval_form_pillars ON hr_eval_form_pillars.hr_eval_form_fp_id = hr_eval_form_fp.hr_eval_form_fp_id
        LEFT JOIN hr_pillars ON hr_pillars.pillar_id = hr_eval_form_pillars.pillar_id
        LEFT JOIN hr_objectives ON hr_objectives.hr_eval_form_pillar_id = hr_eval_form_pillars.hr_eval_form_pillar_id
        LEFT JOIN hr_kpi ON hr_kpi.objective_id = hr_objectives.objective_id
        LEFT JOIN hr_eval_form_sp ON hr_eval_form_sp.eval_form_id = hr_eval_form.hr_eval_form_id
        LEFT JOIN hr_eval_form_sp_quarterly_ratings ON hr_eval_form_sp_quarterly_ratings.eval_form_id = hr_eval_form.hr_eval_form_id
        LEFT JOIN hr_eval_form_sp_fq ON hr_eval_form_sp_fq.hr_eval_form_kpi_id = hr_kpi.kpi_id   
        LEFT JOIN hr_eval_form_sp_myr ON hr_eval_form_sp_myr.hr_eval_form_kpi_id = hr_kpi.kpi_id  
        LEFT JOIN hr_eval_form_sp_tq ON hr_eval_form_sp_tq.hr_eval_form_kpi_id = hr_kpi.kpi_id
        LEFT JOIN hr_eval_form_sp_yee ON hr_eval_form_sp_yee.hr_eval_form_kpi_id = hr_kpi.kpi_id
        WHERE 
        (employee.primary_evaluator = :rater_id OR employee.secondary_evaluator = :rater_id OR employee.tertiary_evaluator = :rater_id)
        AND employee.contract_type IN ('regular', 'probationary')
        GROUP BY employee.users_id
        ORDER BY hr_user_accounts.user_type ASC, employee.last_name ASC */}
                                </div>
                              </td>
                              <td>
                                <div className="flex items-center justify-center pt-2">
                                  {!fqisColumnAllFalse ? (
                                    <>
                                      {employee.fq_achievements &&
                                      employee.fq_results ? (
                                        <Badge
                                          message={"Graded"}
                                          type="success"
                                          className={"text-[.8rem] px-1"}
                                        />
                                      ) : !employee.fq_achievements &&
                                        employee.fq_results ? (
                                        <Badge
                                          message={"Not Submitted/Graded"}
                                          type="success"
                                          className={"text-[.8rem] px-1"}
                                        />
                                      ) : employee.fq_achievements &&
                                        !employee.fq_results ? (
                                        <Badge
                                          message={"Achievements Submitted"}
                                          type="warning"
                                          className={"text-[.8rem] px-1"}
                                        />
                                      ) : !employee.fq_achievements &&
                                        !employee.fq_results ? (
                                        <Badge
                                          message={"Awaiting Submission"}
                                          className={"text-[.8rem] px-1"}
                                        />
                                      ) : (
                                        <Badge
                                          message={"Internal Error"}
                                          type="failure"
                                          className={"text-[.8rem] px-1"}
                                        />
                                      )}
                                    </>
                                  ) : (
                                    "-"
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="flex items-center justify-center pt-2">
                                  {!myrisColumnAllFalse ? (
                                    <>
                                      {employee.myr_rater_1 ||
                                      employee.myr_rater_2 ||
                                      employee.myr_rater_3 ? (
                                        <>
                                          <Badge
                                            message={"Approved"}
                                            type="success"
                                            className={"text-[.8rem] px-1"}
                                          />
                                        </>
                                      ) : (
                                        <>
                                          {employee.myr_achievements &&
                                          employee.myr_results ? (
                                            <Badge
                                              message={"Graded"}
                                              type="success"
                                              className={"text-[.8rem] px-1"}
                                            />
                                          ) : !employee.myr_achievements &&
                                            employee.myr_results ? (
                                            <Badge
                                              message={"Not Submitted/Graded"}
                                              type="success"
                                              className={"text-[.8rem] px-1"}
                                            />
                                          ) : employee.myr_achievements &&
                                            !employee.myr_results ? (
                                            <Badge
                                              message={"Achievements Submitted"}
                                              type="warning"
                                              className={"text-[.8rem] px-1"}
                                            />
                                          ) : !employee.myr_achievements &&
                                            !employee.myr_results ? (
                                            <Badge
                                              message={"Awaiting Submission"}
                                              className={"text-[.8rem] px-1"}
                                            />
                                          ) : (
                                            <Badge
                                              message={"Internal Error"}
                                              type="failure"
                                              className={"text-[.8rem] px-1"}
                                            />
                                          )}
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    "-"
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="flex items-center justify-center pt-2">
                                  {!tqisColumnAllFalse ? (
                                    <>
                                      {employee.tq_achievements &&
                                      employee.tq_results ? (
                                        <Badge
                                          message={"Graded"}
                                          type="success"
                                          className={"text-[.8rem] px-1"}
                                        />
                                      ) : !employee.tq_achievements &&
                                        employee.tq_results ? (
                                        <Badge
                                          message={"Not Submitted/Graded"}
                                          type="success"
                                          className={"text-[.8rem] px-1"}
                                        />
                                      ) : employee.tq_achievements &&
                                        !employee.tq_results ? (
                                        <Badge
                                          message={"Achievements Submitted"}
                                          type="warning"
                                          className={"text-[.8rem] px-1"}
                                        />
                                      ) : !employee.tq_achievements &&
                                        !employee.tq_results ? (
                                        <Badge
                                          message={"Awaiting Submission"}
                                          className={"text-[.8rem] px-1"}
                                        />
                                      ) : (
                                        <Badge
                                          message={"Internal Error"}
                                          type="failure"
                                          className={"text-[.8rem] px-1"}
                                        />
                                      )}
                                    </>
                                  ) : (
                                    "-"
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="flex items-center justify-center pt-2">
                                  {!yeeisColumnAllFalse ? (
                                    <>
                                      {employee.yee_rater_1 ||
                                      employee.yee_rater_2 ||
                                      employee.yee_rater_3 ? (
                                        <>
                                          <Badge
                                            message={"Approved"}
                                            type="success"
                                            className={"text-[.8rem] px-1"}
                                          />
                                        </>
                                      ) : (
                                        <>
                                          {employee.yee_achievements &&
                                          employee.yee_results ? (
                                            <Badge
                                              message={"Graded"}
                                              type="success"
                                              className={"text-[.8rem] px-1"}
                                            />
                                          ) : !employee.yee_achievements &&
                                            employee.yee_results ? (
                                            <Badge
                                              message={"Not Submitted/Graded"}
                                              type="success"
                                              className={"text-[.8rem] px-1"}
                                            />
                                          ) : employee.yee_achievements &&
                                            !employee.yee_results ? (
                                            <Badge
                                              message={"Achievements Submitted"}
                                              type="warning"
                                              className={"text-[.8rem] px-1"}
                                            />
                                          ) : !employee.yee_achievements &&
                                            !employee.yee_results ? (
                                            <Badge
                                              message={"Awaiting Submission"}
                                              className={"text-[.8rem] px-1"}
                                            />
                                          ) : (
                                            <Badge
                                              message={"Internal Error"}
                                              type="failure"
                                              className={"text-[.8rem] px-1"}
                                            />
                                          )}
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    "-"
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="flex items-center justify-center pt-2">
                                  {!yeeagreedisColumnAllFalse ? (
                                    <>
                                      {employee.yee_results &&
                                      employee.agreed_rating ? (
                                        <Badge
                                          message={"Graded"}
                                          type="success"
                                          className={"text-[.8rem] px-1"}
                                        />
                                      ) : employee.yee_results &&
                                        !employee.agreed_rating ? (
                                        <Badge
                                          message={"Waiting for Agreement"}
                                          type="warning"
                                          className={"text-[.8rem] px-1"}
                                        />
                                      ) : !employee.yee_results &&
                                        !employee.agreed_rating ? (
                                        <Badge
                                          message={"Not Yet Graded"}
                                          className={"text-[.8rem] px-1"}
                                        />
                                      ) : (
                                        <Badge
                                          message={"Internal Error"}
                                          type="failure"
                                          className={"text-[.8rem] px-1"}
                                        />
                                      )}
                                    </>
                                  ) : (
                                    "-"
                                  )}
                                </div>
                              </td>
                              <td>
                                <TrackingAction
                                  toggleActionVisibility={
                                    toggleActionVisibility
                                  }
                                  workYear={workYear}
                                  sp_id={employee.sp_id}
                                  employee_id={employee.employee_id}
                                  first_name={employee.first_name}
                                  myr_results={employee.myr_results}
                                  yee_results={employee.yee_results}
                                  myr_achievements={employee.myr_achievements}
                                  yee_achievements={employee.yee_achievements}
                                />
                              </td>
                            </tr>
                          ) : null}
                        </React.Fragment>
                      ))}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <div className="font-semibold text-dark-gray bg-white rounded-md p-2 flex flex-col gap-2 items-center text-center">
                  <span>No Assessment Found.</span>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="font-semibold text-dark-gray bg-white rounded-md p-2 flex flex-col gap-2 items-center text-center">
            <span>
              Please select a work year to show Tracking and Assessment.
            </span>
          </div>
        )}
      </div>
    </>
  );
}
