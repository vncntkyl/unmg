import React, { useEffect, useState } from "react";
import axios from "axios";
import AssessmentTrackingDetails from "./AssessmentTrackingDetails";
import AssessmentInstructions from "./AssessmentInstructions";
import Badge from "../../misc/Badge";
import NoAssessmentTrackingDetails from "./NoAssessmentTrackingDetails";
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
  //total performance
  const [totalPerformance, setTotalPerformance] = useState([]);
  const [totalQuarterlyResults, setTotalQuarterlyResults] = useState([]);
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
              workYear: workYear,
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
        toggleLoading(false);
        setObjectives(obj);
      } catch (error) {
        console.log(error.message);
      }
    };

    //addional for tracking and assessment
    const getTotalPerformance = async () => {
      try {
        const response = await axios.get(
          "http://localhost/unmg_pms/api/retrieveTracking.php",
          {
            params: {
              totalTracking: true,
              empID: emp_id,
            },
          }
        );
        setTotalPerformance(response.data);




        const quarterly = response.data.reduce((uniqueQuarterlyResults, item) => {
          const existingQuarterlyResults = uniqueQuarterlyResults.find(
            (result) => result.eval_form_id === item.eval_form_id
          );
          if (!existingQuarterlyResults) {
            uniqueQuarterlyResults.push({
              eval_form_id: item.eval_form_id,
              FirstQuarterRating: item.FirstQuarterRating,
              MidYearRating: item.MidYearRating,
              ThirdQuarterRating: item.ThirdQuarterRating,
              YearEndRating: item.YearEndRating,
            });
          }
          return uniqueQuarterlyResults;
        }, []);
        setTotalQuarterlyResults(quarterly);
      } catch (error) {
        console.log(error.message);
      }
    };
    toggleLoading(false);
    getTotalPerformance();
    getUserPerformance();
  }, [emp_id, selectedPillar, quarter, workYear]);
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
      ) : (<>
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
          {/*<NoAssessmentTrackingDetails/> */}
        </div>
        {!checkForm ? (
          <></>
        ) : (
          <>
            {quarter === 0 ? (
              <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2 items-center text-center">
                <span>
                  Please select a quarter to show your assessment for that quarter.
                </span>
              </div>
            ) : (
            <>
            <AssessmentTrackingDetails quarter={quarter} emp_id={emp_id} workYear={workYear} />
            </>)}
          </>)}




      </>)
      }
    </>
  );
}
