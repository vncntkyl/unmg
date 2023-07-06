import React, { useEffect, useState } from "react";
import AssessmentInstructions from "./AssessmentInstructions";
import axios from "axios";
import classNames from "classnames";
import { hr } from "date-fns/locale";

export default function EmployeeAssessmentGradeEdit({ employee_id, quarter }) {
  const [grades, setGrades] = useState([]);
  const [checkForm, setcheckForm] = useState();
  const [checkScores, setCheckScores] = useState();
  const [pillars, setPillars] = useState([]);
  const [objectives, setObjectives] = useState([]);


  useEffect(() => {
    const getGrades = async () => {
      const url = "http://localhost/unmg_pms/api/retrieveTracking.php";
      try {
        const response = await axios.get(url, {
          params: {
            userGrading: true,
            quarter: quarter,
            empID: employee_id,
          },
        });
        setGrades(response.data);

        const ColumnAllFalse = response.data.some((item) => item.pillar_id === null && item.objective === null);
        setcheckForm(ColumnAllFalse);


        const scores = response.data.some((item) => item.results === 0);
        setCheckScores(scores);


        const pillars = response.data.reduce((uniquePillars, item) => {
          const existingPillar = uniquePillars.find(
            (pillar) => pillar.eval_pillar_id === item.eval_pillar_id
          );
          if (!existingPillar) {
            uniquePillars.push({
              eval_pillar_id: item.eval_pillar_id,
              pillar_name: item.pillar_name,
              pillar_description: item.pillar_description,
              pillar_percentage: item.pillar_percentage,
            });
          }
          return uniquePillars;
        }, []);

        setPillars(pillars);

        const obj = response.data.reduce((uniqueObjectives, item) => {
          if (item.objective.trim() !== '') {
            const existingObjective = uniqueObjectives.find(
              (objective) => objective.objective === item.objective
            );
            if (!existingObjective) {
              uniqueObjectives.push({
                objectives_objective_id: item.objectives_objective_id,
                hr_eval_form_pillar_id: item.hr_eval_form_pillar_id,
                objective: item.objective
              });
            }
          }
          return uniqueObjectives;
        }, []);

        setObjectives(obj);

      } catch (error) {
        console.log(error.message);
      }
    };
    if (!employee_id) return;
    getGrades();
  }, [employee_id, quarter]);

  return (
    <>
      {checkForm === true ? (
        <div className="w-full bg-default px-2 pb-4 pt-2 rounded-md">
          <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
            <span>
              Sorry, the employee have not yet created their main goals yet.
            </span>
          </div>
        </div>
      ) : (
        <>
          {checkScores === true ? (
            <>
              <div className="w-full bg-default px-2 pb-4 pt-2 rounded-md">
                <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
                  <span>
                    Sorry, the employee has not been graded in this quarter.
                  </span>
                </div>
              </div>
              <div className="w-full flex justify-end pt-4">
                <a className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed">
                  Grade Employee
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="w-full h-[36.8rem] bg-default px-2 pb-4 pt-2 rounded-md overflow-y-scroll">
                <div className="w-full pb-4">
                  <span className="font-bold text-dark-gray">
                    Employee Grades:
                  </span>
                </div>
                {pillars.map((pillar) => (
                  <>
                    <div className="bg-white w-full rounded-md p-2 mb-4">
                      <div className="w-full">
                        <span className="text-black font-semibold">
                          {`${pillar.pillar_name} (${pillar.pillar_description}) - ${pillar.pillar_percentage}%`}
                        </span>
                      </div>
                      <div className="px-4">
                        <span>Objectives: {objectives.filter((object) => object.hr_eval_form_pillar_id === pillar.eval_pillar_id).length}</span>
                      </div>

                      <div className="flex gap-2 p-2 overflow-x-auto w-full">
                        {objectives
                          .filter((object) => object.hr_eval_form_pillar_id === pillar.eval_pillar_id)
                          .map((object) => (
                            <div
                              key={object.objective}
                              className={classNames(
                                "bg-default-dark",
                                "flex-none",
                                "bg-gray-200",
                                "p-2",
                                "rounded-md",
                                {
                                  "w-[50%]": objectives.filter((obj) => obj.hr_eval_form_pillar_id === pillar.eval_pillar_id).length > 1,
                                  "w-[100%]": objectives.filter((obj) => obj.hr_eval_form_pillar_id === pillar.eval_pillar_id).length <= 1
                                }
                              )}
                            >
                              <div className="pb-2">
                                <span className="whitespace-normal">
                                  {object.objective}
                                </span>
                              </div>

                              <div className="bg-white rounded-md shadow">
                                <table className="w-full">
                                  <thead>
                                    <tr>
                                      <td>
                                        <div className="flex justify-center p-2 font-semibold">
                                          KPIs
                                        </div>
                                      </td>
                                      <td>
                                        <div className="flex justify-center p-2 font-semibold">
                                          Weight
                                        </div>
                                      </td>
                                      <td>
                                        <div className="flex justify-center p-2 font-semibold">
                                          Results
                                        </div>
                                      </td>
                                      <td>
                                        <div className="flex justify-center p-2 font-semibold">
                                          Description
                                        </div>
                                      </td>
                                      <td>
                                        <div className="flex justify-center p-2 font-semibold">
                                          Remarks
                                        </div>
                                      </td>
                                    </tr>
                                  </thead>
                                  {grades
                                    .filter((grade) => grade.kpi_objective_id === object.objectives_objective_id)
                                    .map((grade) => (
                                      <tbody key={grade.kpi_objective_id}
                                      >
                                        <tr>
                                          <td>
                                            <div className="whitespace-normal p-2">
                                              {grade.kpi_desc}
                                            </div>
                                          </td>
                                          <td>
                                            <div className="p-2 flex items-center justify-center">
                                              {grade.kpi_weight}
                                            </div>
                                          </td>
                                          <td>
                                            <div className="p-2 flex items-center justify-center">
                                              {grade.results}
                                              {/* <select className="bg-default rounded-md px-4">
                                      <option value="0" default></option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                    </select> */}
                                            </div>
                                          </td>
                                          <td>
                                            <div className="whitespace-normal p-2">
                                              {grade.metrics_desc === ""
                                                ? "N/A"
                                                : grade.metrics_desc}
                                            </div>
                                          </td>
                                          <td>
                                            <div className="whitespace-normal p-2">
                                              {grade.remarks === ""
                                                ? "N/A"
                                                : grade.remarks}
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    ))
                                  }
                                </table>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </>
                ))}





              </div>
              <AssessmentInstructions />
              <div className="w-full flex justify-end pt-4">
                <a className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed">
                  Edit
                </a>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
