import React, { useEffect, useState } from "react";
import axios from "axios";
import { developmentAPIs as url } from "../../context/apiList";
import classNames from "classnames";

export default function SignOff({ emp_id }) {
  const [grades, setGrades] = useState([]);
  const [pillars, setPillars] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [checkForm, setcheckForm] = useState();
  const [checkScores, setCheckScores] = useState();
  let pCounter,
    oCounter,
    kCounter = 1;
  useEffect(() => {
    const getfinalUserPerformance = async () => {
      try {
        const response = await axios.get(url.retrieveSignOff, {
          params: {
            signoff: true,
            empID: emp_id,
          },
        });

        setGrades(response.data);

        const ColumnAllFalse = response.data.some(
          (item) => item.pillar_id === null
        );
        setcheckForm(ColumnAllFalse);

        const scores = response.data.every(
          (item) => item.agreed_rating == "0" || item.wtd_rating == "0"
        );

        setCheckScores(scores);

        const pillars = response.data.reduce((uniquePillars, item) => {
          const existingPillar = uniquePillars.find(
            (pillar) => pillar.eval_pillar_id === item.eval_pillar_id
          );
          if (!existingPillar) {
            uniquePillars.push({
              eval_pillar_id: item.eval_pillar_id,
              pillar_id: item.pillar_id,
              pillar_name: item.pillar_name,
              pillar_description: item.pillar_description,
              pillar_percentage: item.pillar_percentage,
            });
          }
          return uniquePillars;
        }, []);

        setPillars(pillars);

        const obj = response.data.reduce((uniqueObjectives, item) => {
          if (item.obj_objective.trim() !== "") {
            const existingObjective = uniqueObjectives.find(
              (objective) => objective.obj_objective === item.obj_objective
            );
            if (!existingObjective) {
              uniqueObjectives.push({
                obj_objective_id: item.obj_objective_id,
                obj_eval_pillar_id: item.obj_eval_pillar_id,
                obj_objective: item.obj_objective,
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
    getfinalUserPerformance();
  }, [emp_id]);
  console.log(checkForm);
  return (
    <>
      {checkForm ? (
        <div className="w-full bg-default px-2 pb-4 pt-2 rounded-md">
          <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
            <span>Sorry, you have not created your main goals yet.</span>
          </div>
        </div>
      ) : (
        <>
          {checkScores ? (
            <>
              <div className="w-full bg-default px-2 pb-4 pt-2 rounded-md">
                <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
                  <span>
                    Sorry, but the your final evaluation has not been graded.
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full h-[36.8rem] bg-default px-2 pb-4 pt-2 rounded-t-md overflow-y-scroll">
                <div className="w-full pb-4">
                  <span className="font-bold text-dark-gray">
                    Employee Grades:
                  </span>
                </div>
                {pillars.map((pillar) => (
                  <React.Fragment
                    key={"pillar - " + pillar.eval_pillar_id + pCounter++}
                  >
                    <div className="bg-white w-full rounded-md p-2 mb-4">
                      <div className="w-full">
                        <span className="text-black font-semibold">
                          {`${pillar.pillar_name} (${pillar.pillar_description}) - ${pillar.pillar_percentage}%`}
                        </span>
                      </div>
                      <div className="px-4">
                        <span>Objectives</span>
                      </div>
                      <div className="flex gap-2 p-2 overflow-x-auto w-full">
                        {objectives
                          .filter(
                            (object) =>
                              object.obj_eval_pillar_id ===
                              pillar.eval_pillar_id
                          )
                          .map((object) => (
                            <div
                              key={
                                "objective - " +
                                object.obj_objective_id +
                                oCounter++
                              }
                              className={classNames(
                                "bg-default-dark",
                                "flex-none",
                                "bg-gray-200",
                                "p-2",
                                "rounded-md",
                                {
                                  "w-[50%]":
                                    objectives.filter(
                                      (obj) =>
                                        obj.obj_eval_pillar_id ===
                                        pillar.eval_pillar_id
                                    ).length > 1,
                                  "w-[100%]":
                                    objectives.filter(
                                      (obj) =>
                                        obj.obj_eval_pillar_id ===
                                        pillar.eval_pillar_id
                                    ).length <= 1,
                                }
                              )}
                            >
                              <div className="pb-2">
                                <span className="whitespace-normal">
                                  {object.obj_objective}
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
                                  <tbody>
                                    {grades
                                      .filter(
                                        (grade) =>
                                          grade.kpi_objective_id ===
                                          object.obj_objective_id
                                      )
                                      .map((grade) => (
                                        <tr
                                          key={
                                            "kpi - " +
                                            grade.kpi_kpi_id +
                                            kCounter++
                                          }
                                        >
                                          <td>
                                            <div className="whitespace-normal p-2">
                                              {grade.kpi_desc}
                                            </div>
                                          </td>
                                          <td>
                                            <div className="p-2 flex items-center justify-center">
                                              {grade.kpi_weight}%
                                            </div>
                                          </td>
                                          <td>
                                            <div className="p-2 flex items-center justify-center">
                                              {grade.results}
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
                                      ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div className="w-full bg-default px-2 pb-4 pt-2 rounded-b-md overflow-y-scroll">
                <div className="w-full bg-white px-2 rounded">hello</div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
