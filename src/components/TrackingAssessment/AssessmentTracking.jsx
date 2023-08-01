import React, { useEffect, useState } from "react";
import axios from "axios";
import AssessmentTrackingDetails from "./AssessmentTrackingDetails";
import Badge from "../../misc/Badge";
import { developmentAPIs as url } from "../../context/apiList";
import { format } from "date-fns";
export default function AssessmentTracking({
  emp_id,
  kpiYears = [],
  workYear,
  setKpiDuration,
}) {
  //setters
  const [loading, toggleLoading] = useState(true);
  const [userPerformance, setUserPerformance] = useState([]);
  const [pillarName, setPillarName] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [selectedPillar, setSelectedPillar] = useState(0);
  const [tabTitle, setTabTitle] = useState([]);
  const [quarter, setQuarter] = useState(0);
  const quarter_id =
    quarter == 1
      ? "fq_"
      : quarter == 2
      ? "myr_"
      : quarter == 3
      ? "tq_"
      : quarter == 4
      ? "yee_"
      : "";
  //total performance
  const [totalPerformance, setTotalPerformance] = useState([]);
  const [totalQuarterlyResults, setTotalQuarterlyResults] = useState([]);
  //checkers
  const [checkForm, setcheckForm] = useState(false);
  const [checkResult, setCheckResults] = useState(false);
  const [checkAchievements, setCheckAchievements] = useState(false);
  let previousObjective = null;

  useEffect(() => {
    const getUserPerformance = async () => {
      try {
        const response = await axios.get(url.retrieveTracking, {
          params: {
            userTracking: true,
            workYear: workYear,
            quarter: quarter,
            empID: emp_id,
          },
        });
        console.log(response.data);
        setUserPerformance(response.data);

        const form = response.data.some(
          (item) => item.hr_eval_form_id !== null
        );
        setcheckForm(form);

        const results = response.data.some((item) => item.results !== "");
        setCheckResults(results);

        const achievements = response.data.some(
          (item) => item.achievements !== ""
        );
        setCheckAchievements(achievements);
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
        setPillarName(pillars);

        const pillarData = Array.from(pillars.values());
        setPillarName(pillarData);
        setTabTitle(pillarData[selectedPillar]);

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
        toggleLoading(false);
        setObjectives(obj);
      } catch (error) {
        console.log(error.message);
      }
    };

    //addional for tracking and assessment
    const getTotalPerformance = async () => {
      try {
        const response = await axios.get(url.retrieveTracking, {
          params: {
            totalTracking: true,
            empID: emp_id,
          },
        });
        setTotalPerformance(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getTotalPerformance();
    getUserPerformance();
    toggleLoading(false);
  }, [emp_id, selectedPillar, quarter, workYear]);

  let wtd = 0;
  userPerformance.forEach((final) => {
    wtd = wtd + parseFloat(final.wtd_rating);
  });

  return loading ? (
    "Loading..."
  ) : (
    <>
      {/* <NoAssessmentTrackingDetails /> */}
      <div className="flex flex-row pb-2 px-2 gap-2 items-center">
        <label htmlFor="workyear" className="font-semibold">
          Select Work Year:
        </label>
        <select
          id="workyear"
          className="bg-default rounded-md p-1 px-2"
          onChange={(e) => {
            setKpiDuration(parseInt(e.target.value));
          }}
        >
          <option value="-1" disabled selected={workYear === -1}>
            --Select Year--
          </option>
          {kpiYears.length > 0 &&
            kpiYears.map((year) => {
              return (
                <option value={year.kpi_year_duration_id}>
                  {format(new Date(year.from_date), "MMM d, yyyy") +
                    " - " +
                    format(new Date(year.to_date), "MMM d, yyyy")}
                </option>
              );
            })}
        </select>
      </div>
      {workYear === -1 ? (
        <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2 items-center text-center">
          <span>
            Please select a work year to show your Tracking and assessment.
          </span>
        </div>
      ) : (
        <>
          {!checkForm ? (
            <>
              <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2 items-center text-center">
                <span>You have no assessment for this KPI period.</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex pb-2 px-2 justify-between">
                <div className="flex flex-row items-center gap-2 justify-between md:justify-start">
                  <label htmlFor="quarterPicker" className="font-semibold">
                    Select Quarter:
                  </label>
                  <select
                    className="bg-default text-black rounded-md p-1 px-2 outline-none"
                    onChange={(quart) => setQuarter(quart.target.value)}
                    value={quarter}
                    defaultValue={0}
                  >
                    <option value={0} disabled>
                      Select Quarter
                    </option>
                    <option value={1}>First Quarter</option>
                    <option value={2}>Mid Year</option>
                    <option value={3}>Third Quarter</option>
                    <option value={4}>Year End</option>
                  </select>
                </div>
                <div className="flex flex-row items-center gap-2  justify-between md:justify-start">
                  <label className="font-semibold">Status:</label>
                  {!checkResult && !checkAchievements ? (
                    <Badge
                      message={"Awaiting Submission"}
                      className={"text-[.8rem] px-1"}
                    />
                  ) : !checkResult && checkAchievements ? (
                    <Badge
                      message={"Achievements Submitted"}
                      type="warning"
                      className={"text-[.8rem] px-1"}
                    />
                  ) : checkResult && !checkAchievements ? (
                    <Badge
                      message={"Graded/No Achievements"}
                      type="success"
                      className={"text-[.8rem] px-1"}
                    />
                  ) : checkResult && checkAchievements ? (
                    <Badge
                      message={"Graded"}
                      type="success"
                      className={"text-[.8rem] px-1"}
                    />
                  ) : (
                    <Badge
                      message={"Internal Error"}
                      type="failure"
                      className={"text-[.8rem] px-1"}
                    />
                  )}
                </div>
              </div>
              {quarter == 0 ? (
                <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2 items-center text-center">
                  <span>
                    Please select a quarter to show your assessment for that
                    quarter.
                  </span>
                </div>
              ) : (
                <>
                  {(checkResult && checkAchievements) ||
                  (checkResult && !checkAchievements) ? (
                    <>
                      <div className="md:text-[.8rem] px-2 lg:text-[1rem]">
                        {pillarName.map((pillar, index) => (
                          <button
                            key={pillar.pillar_id}
                            className={`px-2 text-[1rem]
                                 ${index > 0 ? "border-1" : ""}
                                 ${
                                   index < pillarName.length - 1
                                     ? "border-r"
                                     : ""
                                 }
                                 ${
                                   selectedPillar !== index
                                     ? "hover:border-b-2 border-b-un-red-light"
                                     : ""
                                 } 
                                 ${
                                   selectedPillar === index
                                     ? "border-b-4 border-b-un-red-light"
                                     : ""
                                 }`}
                            onClick={() => setSelectedPillar(index)}
                          >
                            {pillar.pillar_name}
                          </button>
                        ))}
                      </div>
                      <div className="bg-default rounded-md p-2">
                        {pillarName
                          .filter(
                            (pillar) =>
                              pillar.pillar_name === tabTitle.pillar_name
                          )
                          .map((pillar) => (
                            <div
                              className="bg-default px-2 pb-4 pt-2 rounded-md"
                              key={pillar.pillar_id}
                            >
                              <div>
                                <span className="text-black ml-2 md:text-[1rem] font-bold block">
                                  {`${pillar.pillar_name} (${pillar.pillar_description}) - ${pillar.pillar_percentage}%`}
                                </span>
                              </div>
                              <div className="pt-10 px-2 w-full">
                                {/* Header */}
                                <table className="w-full">
                                  <thead>
                                    <tr>
                                      {quarter == 2 ? (
                                        <>
                                          <td className="w-[20%]">
                                            <div className="font-semibold">
                                              Objectives
                                            </div>
                                          </td>
                                          <td className="w-[20%] px-2 bg-un-blue-light rounded-tl-lg">
                                            <div className="text-white flex justify-center">
                                              KPI
                                            </div>
                                          </td>
                                          <td className="w-[10%] px-2 bg-un-blue-light">
                                            <div className="text-white flex justify-center">
                                              Weight
                                            </div>
                                          </td>
                                          <td className="w-[20%] px-2 bg-un-blue-light">
                                            <div className="text-white flex justify-center">
                                              Results (Actual)
                                            </div>
                                          </td>
                                          <td className="w-[10%] px-2 bg-un-blue-light">
                                            <div className="text-white flex justify-center">
                                              Status
                                            </div>
                                          </td>
                                          <td className="w-[20%] px-2 bg-un-blue-light rounded-tr-lg">
                                            <div className="text-white flex justify-center">
                                              Remarks
                                            </div>
                                          </td>
                                        </>
                                      ) : quarter == 4 ? (
                                        <>
                                          <td className="w-[20%]">
                                            <div className="font-semibold">
                                              Objectives
                                            </div>
                                          </td>
                                          <td className="w-[20%] px-2 bg-un-blue-light rounded-tl-lg">
                                            <div className="text-white flex justify-center">
                                              KPI
                                            </div>
                                          </td>
                                          <td className="w-[5%] px-2 bg-un-blue-light">
                                            <div className="text-white flex justify-center">
                                              Weight
                                            </div>
                                          </td>
                                          <td className="w-[20%] px-2 bg-un-blue-light">
                                            <div className="text-white flex justify-center">
                                              Results (Actual)
                                            </div>
                                          </td>
                                          <td className="w-[5%] px-2 bg-un-blue-light">
                                            <div className="text-white flex justify-center">
                                              Agreed Rating
                                            </div>
                                          </td>
                                          <td className="w-[10%] px-2 bg-un-blue-light">
                                            <div className="text-white flex justify-center">
                                              Weighted
                                            </div>
                                          </td>
                                          <td className="w-[20%] px-2 bg-un-blue-light rounded-tr-lg">
                                            <div className="text-white flex justify-center">
                                              Remarks
                                            </div>
                                          </td>
                                        </>
                                      ) : (
                                        <>
                                          <td className="w-[20%]">
                                            <div className="font-semibold">
                                              Objectives
                                            </div>
                                          </td>
                                          <td className="w-[20%] px-2 bg-un-blue-light rounded-tl-lg">
                                            <div className="text-white flex justify-center">
                                              KPI
                                            </div>
                                          </td>
                                          <td className="w-[20%] px-2 bg-un-blue-light">
                                            <div className="text-white flex justify-center">
                                              Weight
                                            </div>
                                          </td>
                                          <td className="w-[20%] px-2 bg-un-blue-light">
                                            <div className="text-white flex justify-center">
                                              Results (Actual)
                                            </div>
                                          </td>
                                          <td className="w-[20%] px-2 bg-un-blue-light rounded-tr-lg">
                                            <div className="text-white flex justify-center">
                                              Remarks
                                            </div>
                                          </td>
                                        </>
                                      )}
                                    </tr>
                                  </thead>
                                  {objectives
                                    .filter(
                                      (object) =>
                                        object.obj_eval_pillar_id ===
                                        pillar.eval_pillar_id
                                    )
                                    .map((objective) => (
                                      <tbody key={objective.obj_objective_id}>
                                        {userPerformance
                                          .filter(
                                            (performance) =>
                                              performance.kpi_objective_id ===
                                              objective.obj_objective_id
                                          )
                                          .map((performance) => (
                                            <React.Fragment
                                              key={performance.kpi_objective_id}
                                            >
                                              <tr>
                                                {quarter == 2 ? (
                                                  <>
                                                    <td className="w-[20%] p-2">
                                                      <div>
                                                        {objective.obj_objective !==
                                                        previousObjective
                                                          ? performance.obj_objective
                                                          : ""}
                                                      </div>
                                                    </td>
                                                    <td className="w-[20%] p-2 bg-white">
                                                      <div className="flex items-center justify-center">
                                                        {performance.kpi_desc}
                                                      </div>
                                                    </td>
                                                    <td className="w-[10%] p-2 bg-white">
                                                      <div className="flex items-center justify-center">
                                                        {`${performance.kpi_weight}%`}
                                                      </div>
                                                    </td>
                                                    <td className="w-[20%] p-2 bg-white">
                                                      <div className="flex items-center justify-center">
                                                        {performance.results}
                                                      </div>
                                                    </td>
                                                    <td className="w-[10%] p-2 bg-white">
                                                      <div className="flex items-center justify-center">
                                                        {performance.status ==
                                                        1 ? (
                                                          <Badge
                                                            message={
                                                              "Struggling/Help!"
                                                            }
                                                            type={"failure"}
                                                            className={
                                                              "text-[.8rem] px-1"
                                                            }
                                                          />
                                                        ) : performance.status ==
                                                          2 ? (
                                                          <Badge
                                                            message={
                                                              "Lagging/Behind"
                                                            }
                                                            type={"warning"}
                                                            className={
                                                              "text-[.8rem] px-1"
                                                            }
                                                          />
                                                        ) : performance.status ==
                                                          3 ? (
                                                          <Badge
                                                            message={
                                                              "Ontrack/Completed"
                                                            }
                                                            type={"success"}
                                                            className={
                                                              "text-[.8rem] px-1"
                                                            }
                                                          />
                                                        ) : performance.status ==
                                                          4 ? (
                                                          <Badge
                                                            message={
                                                              "Ontrack/Completed"
                                                            }
                                                            type={"success"}
                                                            className={
                                                              "text-[.8rem] px-1"
                                                            }
                                                          />
                                                        ) : (
                                                          "Loading..."
                                                        )}
                                                      </div>
                                                    </td>
                                                    <td className="w-[20%] p-2 bg-white">
                                                      <div className="flex items-center">
                                                        {performance.remarks}
                                                      </div>
                                                    </td>
                                                  </>
                                                ) : quarter == 4 ? (
                                                  <>
                                                    <td className="w-[20%] p-2">
                                                      <div>
                                                        {objective.obj_objective !==
                                                        previousObjective
                                                          ? performance.obj_objective
                                                          : ""}
                                                      </div>
                                                    </td>
                                                    <td className="w-[20%] p-2 bg-white">
                                                      <div className="flex items-center justify-center">
                                                        {performance.kpi_desc}
                                                      </div>
                                                    </td>
                                                    <td className="w-[5%] p-2 bg-white">
                                                      <div className="flex items-center justify-center">
                                                        {`${performance.kpi_weight}%`}
                                                      </div>
                                                    </td>
                                                    <td className="w-[20%] p-2 bg-white">
                                                      <div className="flex items-center justify-center">
                                                        {performance.results}
                                                      </div>
                                                    </td>
                                                    <td className="w-[10%] p-2 bg-white">
                                                      <div className="flex items-center justify-center">
                                                        {
                                                          performance.agreed_rating
                                                        }
                                                      </div>
                                                    </td>
                                                    <td className="w-[5%] p-2 bg-white">
                                                      <div className="flex items-center justify-center">
                                                        {performance.wtd_rating}
                                                      </div>
                                                    </td>
                                                    <td className="w-[20%] p-2 bg-white">
                                                      <div className="flex items-center">
                                                        {performance.remarks}
                                                      </div>
                                                    </td>
                                                  </>
                                                ) : (
                                                  <>
                                                    <td className="w-[20%] p-2">
                                                      <div>
                                                        {objective.obj_objective !==
                                                        previousObjective
                                                          ? performance.obj_objective
                                                          : ""}
                                                      </div>
                                                    </td>
                                                    <td className="w-[20%] p-2 bg-white">
                                                      <div className="flex items-center justify-center">
                                                        {performance.kpi_desc}
                                                      </div>
                                                    </td>
                                                    <td className="w-[20%] p-2 bg-white">
                                                      <div className="flex items-center justify-center">
                                                        {`${performance.kpi_weight}%`}
                                                      </div>
                                                    </td>
                                                    <td className="w-[20%] p-2 bg-white">
                                                      <div className="flex items-center justify-center">
                                                        {performance.results}
                                                      </div>
                                                    </td>
                                                    <td className="w-[20%] p-2 bg-white">
                                                      <div className="flex items-center">
                                                        {performance.remarks}
                                                      </div>
                                                    </td>
                                                  </>
                                                )}
                                              </tr>
                                            </React.Fragment>
                                          ))}
                                      </tbody>
                                    ))}
                                </table>
                              </div>
                            </div>
                          ))}
                        {quarter == 4 && (
                          <>
                            Total Weighted Score:{" "}
                            <span className="text-[1.1rem] font-semibold">
                              {wtd.toFixed(2)}
                            </span>
                            /4
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-semibold text-dark-gray bg-default rounded-md p-2">
                        <AssessmentTrackingDetails
                          quarter={quarter}
                          emp_id={emp_id}
                          workYear={workYear}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
