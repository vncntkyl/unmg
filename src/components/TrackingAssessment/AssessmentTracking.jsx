import React, { useEffect, useState } from "react";
import axios from "axios";
import AssessmentTrackingDetails from "./AssessmentTrackingDetails";
import AssessmentInstructions from "./AssessmentInstructions";
import Badge from "../../misc/Badge";
import NoAssessmentTrackingDetails from "./NoAssessmentTrackingDetails";

export default function AssessmentTracking({ emp_id }) {
  const [userPerformance, setUserPerformance] = useState([]);
  const [pillarName, setPillarName] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [selectedPillar, setSelectedPillar] = useState(0);
  const [tabTitle, setTabTitle] = useState([]);
  const [quarter, setQuarter] = useState(1);
  //checkers
  const [checkForm, setcheckForm] = useState(false);
  const [checkScores, setCheckScores] = useState(false);
  const [checkAchievements, setCheckAchievements] = useState(false);
  let previousObjective = null;
  useEffect(() => {
    const getUserPerformance = async () => {
      try {
        const response = await axios.get(
          "http://localhost/unmg_pms/api/retrieveTracking.php",
          {
            params: {
              userTracking: true,
              quarter: quarter,
              empID: emp_id,
            },
          }
        );

        setUserPerformance(response.data);
        const form = response.data.some(
          (item) => item.hr_eval_form_id !== null
        );
        setcheckForm(form);
        const scores = response.data.every(
          (item) => item.results !== 0 && item.metrics_desc !== null
        );
        setCheckScores(scores);

        const achievements = response.data.every(
          (item) => item.ratee_achievement !== ""
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

        setObjectives(obj);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserPerformance();
  }, [emp_id, selectedPillar, quarter]);

  return checkForm ? (
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
          >
            <option value="" disabled>
              Select Quarter
            </option>
            <option value={1}>First Quarter</option>
            <option value={2}>Second Quarter</option>
            <option value={3}>Third Quarter</option>
            <option value={4}>Fourth Quarter</option>
          </select>
        </div>
        <div className="flex flex-row items-center gap-2  justify-between md:justify-start">
          <label className="font-semibold">Status:</label>
          {!checkScores && !checkAchievements ? (
            <Badge
              message={"Awaiting Submission"}
              className={"text-[.8rem] px-1"}
            />
          ) : !checkScores && checkAchievements ? (
            <Badge
              message={"Achievements Submitted"}
              type="warning"
              className={"text-[.8rem] px-1"}
            />
          ) : checkScores && !checkAchievements ? (
            <Badge
              message={"Graded/No Achievements"}
              type="success"
              className={"text-[.8rem] px-1"}
            />
          ) : checkScores && checkAchievements ? (
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
      {!checkScores && <AssessmentTrackingDetails quarter={quarter} />}
      {checkScores && (
        <div>
          <div className="md:text-[.8rem] px-2 lg:text-[1rem]">
            {pillarName.map((pillar, index) => (
              <button
                key={pillar.pillar_id}
                className={`px-2 text-[1rem]
                  ${index > 0 ? "border-1" : ""}
                  ${index < pillarName.length - 1 ? "border-r" : ""}
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

          {pillarName
            .filter((pillar) => pillar.pillar_name === tabTitle.pillar_name)
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
                        <td className="w-[20%]">
                          <div className="font-semibold">Objectives</div>
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
                        <td className="w-[10%] px-2 bg-un-blue-light">
                          <div className="text-white flex justify-center">
                            Results
                          </div>
                        </td>
                        <td className="w-[20%] px-2 bg-un-blue-light">
                          <div className="text-white flex justify-center">
                            Description
                          </div>
                        </td>
                        <td className="w-[20%] px-2 bg-un-blue-light rounded-tr-lg">
                          <div className="text-white flex justify-center">
                            Remarks
                          </div>
                        </td>
                      </tr>
                    </thead>
                    {objectives
                      .filter(
                        (object) =>
                          object.obj_eval_pillar_id === pillar.eval_pillar_id
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
                              <React.Fragment key={performance.kpi_objective_id}>
                                <tr>
                                <td className="w-[20%] p-4">
                                  <div>
                                {objective.obj_objective !== previousObjective ? performance.obj_objective : ""}
                                  </div>
                                </td>
                                <td className="w-[20%] p-4 bg-white">
                                  <div className="flex items-center justify-center">
                                  {performance.kpi_desc}
                                  </div>
                                </td>
                                <td className="w-[10%] p-4 bg-white">
                                  <div className="flex items-center justify-center">
                                  {`${performance.kpi_weight}%`}
                                  </div>
                                </td>
                                <td className="w-[10%] p-4 bg-white">
                                  <div className="flex items-center justify-center">
                                    {
                                      quarter == 3 ? (                                  
                                      <Badge message={performance.results} 
                                        type={performance.results === 1 ? "failure":
                                        performance.results === 2 ? "warning":
                                        performance.results === 3 ? "success":
                                        performance.results === 4 ? "success":
                                        ""} 
                                        className="px-8 rounded-md text-[1rem]"/>
                                        ): performance.results
                                    }
                                  </div>
                                </td>
                                <td className="w-[20%] p-4 bg-white">
                                  <div className="flex items-center justify-center">
                                  {performance.metrics_desc}
                                  </div>
                                </td>
                                <td className="w-[20%] p-4 bg-white">
                                  <div className="flex items-center"> 
                                  {performance.remarks}
                                  </div>
                                </td>
                              </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                      ))}
                  </table>
                </div>
              </div>
            ))}
          <AssessmentInstructions />
        </div>
      )}
    </>
  ) : (
    <>
      <NoAssessmentTrackingDetails />
    </>
  );
}
