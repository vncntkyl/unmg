import React, { useEffect, useState } from "react";
import AssessmentInstructions from "./AssessmentInstructions";
import axios from "axios";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export default function EmployeeAssessmentGradeEdit() {
  const [grades, setGrades] = useState([]);
  const [checkForm, setcheckForm] = useState();
  const [pillars, setPillars] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [quarter, setQuarter] = useState(sessionStorage.getItem("assessment_quarter") || 0);
  const [name, setName] = useState([]);
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState([]);
  useEffect(() => {
    //Whole Grades
    const getGrades = async () => {
      const url = "http://localhost/unmg_pms/api/retrieveTracking.php";
      try {
        const response = await axios.get(url, {
          params: {
            userGrading: true,
            quarter: quarter,
            empID: sessionStorage.getItem("assessment_id"),
          },
        });
        setGrades(response.data);
        //if pillar id is not found
        const ColumnAllFalse = response.data.some((item) => item.pillar_id === null);
        setcheckForm(ColumnAllFalse);
        const uniqueNames = [...new Set(response.data.map((item) => item.employee_name))];
        setName(uniqueNames);


        //checking the stored quarter
        const storedQuarter = sessionStorage.getItem("assessment_quarter");
        if (storedQuarter) {
          setQuarter(storedQuarter);
        }

        //removing null from pillar columns
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


        //removing null from qobjectives columns
        const obj = response.data.reduce((uniqueObjectives, item) => {
          if (item.obj_objective.trim() !== '') {
            const existingObjective = uniqueObjectives.find(
              (objective) => objective.obj_objective === item.obj_objective
            );
            if (!existingObjective) {
              uniqueObjectives.push({
                obj_objective_id: item.obj_objective_id,
                obj_eval_pillar_id: item.obj_eval_pillar_id,
                obj_objective: item.obj_objective
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


    //Metrics
    const getMetrics = async () => {
      const url = "http://localhost/unmg_pms/api/retrieveTracking.php";
      try {
        const response = await axios.get(url, {
          params: {
            metrics: true,
            empID: sessionStorage.getItem("assessment_id"),
          },
        });
        setMetrics(response.data);

      } catch (error) {
        console.log(error.message);
      }
    };

    getMetrics();
    getGrades();
  }, [quarter]);

  return (
    <>
      <button className="flex flex-row items-center w-fit text-dark-gray text-[.9rem] bg-default-dark p-1 rounded-md"
        onClick={() => navigate(-1)}
      >
        <MdOutlineKeyboardArrowLeft />
        <span>Back</span>
      </button>
      <div className="flex pb-2 px-2 justify-between">
        <div className="flex flex-row items-center gap-2 justify-between md:justify-start">
          <label className="font-semibold">Employee Name:</label>
          <label>{name}</label>
        </div>
      </div>
      <div className="flex pb-2 px-2 justify-between">
        <div className="flex flex-row items-center gap-2 justify-between md:justify-start">
          <label htmlFor="quarterPicker" className="font-semibold">
            Select Quarter:
          </label>
          <select className="bg-default text-black rounded-md p-1 px-2 outline-none"
            onChange={(event) => {
              const selectedQuarter = event.target.value;
              setQuarter(selectedQuarter);
              sessionStorage.setItem("assessment_quarter", selectedQuarter);
            }}
            value={quarter}
          >
            <option value={0} disabled>Select Quarter</option>
            <option value={1}>First Quarter</option>
            <option value={2}>Second Quarter</option>
            <option value={3}>Third Quarter</option>
            <option value={4}>Fourth Quarter</option>
          </select>
        </div>
      </div>
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
                    <span>Objectives</span>
                  </div>
                  <div className="flex gap-2 p-2 overflow-x-auto w-full">
                    {objectives
                      .filter((object) => object.obj_eval_pillar_id === pillar.eval_pillar_id)
                      .map((object) => (
                        <div
                          key={object.obj_eval_pillar_id}
                          className={classNames(
                            "bg-default-dark",
                            "flex-none",
                            "bg-gray-200",
                            "p-2",
                            "rounded-md",
                            {
                              "w-[50%]": objectives.filter((obj) => obj.obj_eval_pillar_id === pillar.eval_pillar_id).length > 1,
                              "w-[100%]": objectives.filter((obj) => obj.obj_eval_pillar_id === pillar.eval_pillar_id).length <= 1
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
                              {grades
                                .filter((grade) => grade.kpi_objective_id === object.obj_objective_id)
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
                                          {grade.kpi_weight}%
                                        </div>
                                      </td>
                                      <td>
                                        <div className="p-2 flex items-center justify-center">
                                          <select className="bg-default rounded-md px-4" onChange={handleSelectChange}>
                                            <option value={grade.results} default>{grade.results}</option>
                                            {metrics
                                              .filter((metric) => metric.metric_kpi_id === grade.kpi_kpi_id)
                                              .map((metric) => (
                                                <>
                                                  <option key={metric.target_metrics_id} value={grade.results === metric.target_metrics_score}>
                                                    {metric.target_metrics_score}
                                                  </option>
                                                </>
                                              ))}
                                          </select>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="whitespace-normal p-2 flex justify-center">
                                          <table>
                                            {metrics
                                              .filter((metric) => metric.metric_kpi_id === grade.kpi_kpi_id)
                                              .map((metric) => (
                                                <tr>
                                                  <td>
                                                    {metric.target_metrics_score} -
                                                  </td>
                                                  <td>
                                                    {metric.target_metrics_desc}
                                                  </td>
                                                </tr>

                                              ))}
                                          </table>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="whitespace-normal p-2">
                                          <textarea
                                            id="message"
                                            rows="4"
                                            className="bg-default block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-md resize-none"
                                            placeholder="Write your remarks here..."
                                            value={grade.remarks || ''}
                                            onChange={(e) => setNewGrade({ ...grade, remarks: e.target.value })}
                                          ></textarea>
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
          <div className="w-full flex justify-end pt-4">
            <a className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed">
              Submit
            </a>
          </div>
        </>
      )}
    </>
  );
}

function handleSelectChange(event) {
  const selectedValue = event.target.value;
  if (selectedValue === "4") {
    alert("Are you sure you want to rate this as a 4?");
  }
}