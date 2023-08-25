import React, { useState, useEffect } from "react";
import axios from "axios";
import Badge from "../../misc/Badge";
import Toggle from "../Toggle";
import EmployeeAssessmentGrade from "./EmployeeAssessmentGrade";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { developmentAPIs as url } from "../../context/apiList";

export default function EmployeeAssessment() {
  const [loading, toggleLoading] = useState(true);
  const employee_id = localStorage.getItem("assessment_id");
  const workYear = localStorage.getItem("work_year");
  const [panel, setPanel] = useState("Achievements");
  const [quarter, setQuarter] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [checkAchievements, setCheckAchievements] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getAchievements = async () => {
      const parameters = {
        params: {
          userTrackingIndividualEmployeeAchievements: true,
          workYear: workYear,
          empID: employee_id,
        }
      }
      try {
        const response = await axios.get(url.retrieveTracking, parameters);
        setAchievements(response.data);
        const quarterlyAchievements = {
          first_part_id: response.data.some(
            (item) => item.first_part_id !== "" && item.first_part_id !== null
          ),
          fq_achievements: response.data.some(
            (item) =>
              item.fq_achievements !== "" && item.fq_achievements !== null
          ),
          myr_achievements: response.data.some(
            (item) =>
              item.myr_achievements !== "" && item.myr_achievements !== null
          ),
          tq_achievements: response.data.some(
            (item) =>
              item.tq_achievements !== "" && item.tq_achievements !== null
          ),
          yee_achievements: response.data.some(
            (item) =>
              item.yee_achievements !== "" && item.yee_achievements !== null
          ),
          fq_results: response.data.some(
            (item) => item.fq_results !== "" && item.fq_results !== null
          ),
          myr_results: response.data.some(
            (item) => item.myr_results !== "" && item.myr_results !== null
          ),
          tq_results: response.data.some(
            (item) => item.tq_results !== "" && item.tq_results !== null
          ),
          yee_results: response.data.some(
            (item) => item.yee_results !== "" && item.yee_results !== null
          ),
        };
        setCheckAchievements(quarterlyAchievements);
      } catch (error) {
        console.log(error.message);
      }
    };
    toggleLoading(false);
    getAchievements();
  }, [employee_id, quarter]);
  return loading ? (
    "Loading..."
  ) : (
    <>
      <button
        className="flex flex-row items-center w-fit text-dark-gray text-[.9rem] bg-default-dark p-1 rounded-md mb-4"
        onClick={() => navigate(-1)}
      >
        <MdOutlineKeyboardArrowLeft />
        <span>Back</span>
      </button>
      <div className="flex pb-2 px-2 justify-between">
        <div className="flex flex-row items-center gap-2 justify-between md:justify-start">
          <label className="font-semibold">Employee Name:</label>
          <label>
            {achievements.length > 0 && achievements[0].employee_name}
          </label>
        </div>
        <Toggle
          paths={[
            "/tracking_and_assessment/employee_assessment/" +
              localStorage.getItem("assessment_name"),
            "/tracking_and_assessment/employee_assessment/" +
              localStorage.getItem("assessment_name") +
              "/",
          ]}
          panel={panel}
          panel_1={"Achievements"}
          setPanel={setPanel}
          panel_2={"Grades"}
        />
      </div>
      <div className="flex flex-row items-center gap-2 pb-2 px-2 justify-between md:justify-start">
        <label className="font-semibold">KPI Duration:</label>
        <label>
          {achievements.length > 0 &&
            achievements[0].from_date + " - " + achievements[0].to_date}
        </label>
      </div>
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
          {quarter == 1 ? (
            <>
              <label className="font-semibold">Status:</label>
              {checkAchievements.fq_achievements &&
              !checkAchievements.fq_results ? (
                <Badge
                  message={"Ready for Grading"}
                  type={"warning"}
                  className={"text-[.8rem] px-1"}
                />
              ) : !checkAchievements.fq_achievements &&
                checkAchievements.fq_results ? (
                <Badge
                  message={"No Achievements/Graded"}
                  type={"warning"}
                  className={"text-[.8rem] px-1"}
                />
              ) : checkAchievements.fq_achievements &&
                checkAchievements.fq_results ? (
                <Badge
                  message={"Graded"}
                  type={"success"}
                  className={"text-[.8rem] px-1"}
                />
              ) : !checkAchievements.fq_achievements &&
                !checkAchievements.fq_results ? (
                <Badge
                  message={"Not yet Submitted"}
                  className={"text-[.8rem] px-1"}
                />
              ) : (
                "Loading..."
              )}
            </>
          ) : quarter == 2 ? (
            <>
              <label className="font-semibold">Status:</label>
              {checkAchievements.myr_achievements &&
              !checkAchievements.myr_results ? (
                <Badge
                  message={"Ready for Grading"}
                  type={"warning"}
                  className={"text-[.8rem] px-1"}
                />
              ) : !checkAchievements.myr_achievements &&
                checkAchievements.myr_results ? (
                <Badge
                  message={"No Achievements/Graded"}
                  type={"warning"}
                  className={"text-[.8rem] px-1"}
                />
              ) : checkAchievements.myr_achievements &&
                checkAchievements.myr_results ? (
                <Badge
                  message={"Graded"}
                  type={"success"}
                  className={"text-[.8rem] px-1"}
                />
              ) : !checkAchievements.myr_achievements &&
                !checkAchievements.myr_results ? (
                <Badge
                  message={"Not yet Submitted"}
                  className={"text-[.8rem] px-1"}
                />
              ) : (
                "Loading..."
              )}
            </>
          ) : quarter == 3 ? (
            <>
              <label className="font-semibold">Status:</label>
              {checkAchievements.tq_achievements &&
              !checkAchievements.tq_results ? (
                <Badge
                  message={"Ready for Grading"}
                  type={"warning"}
                  className={"text-[.8rem] px-1"}
                />
              ) : !checkAchievements.tq_achievements &&
                checkAchievements.tq_results ? (
                <Badge
                  message={"No Achievements/Graded"}
                  type={"warning"}
                  className={"text-[.8rem] px-1"}
                />
              ) : checkAchievements.tq_achievements &&
                checkAchievements.tq_results ? (
                <Badge
                  message={"Graded"}
                  type={"success"}
                  className={"text-[.8rem] px-1"}
                />
              ) : !checkAchievements.tq_achievements &&
                !checkAchievements.tq_results ? (
                <Badge
                  message={"Not yet Submitted"}
                  className={"text-[.8rem] px-1"}
                />
              ) : (
                "Loading..."
              )}
            </>
          ) : quarter == 4 ? (
            <>
              <label className="font-semibold">Status:</label>
              {checkAchievements.yee_achievements &&
              !checkAchievements.yee_results ? (
                <Badge
                  message={"Ready for Grading"}
                  type={"warning"}
                  className={"text-[.8rem] px-1"}
                />
              ) : !checkAchievements.yee_achievements &&
                checkAchievements.yee_results ? (
                <Badge
                  message={"No Achievements/Graded"}
                  type={"warning"}
                  className={"text-[.8rem] px-1"}
                />
              ) : checkAchievements.yee_achievements &&
                checkAchievements.yee_results ? (
                <Badge
                  message={"Graded"}
                  type={"success"}
                  className={"text-[.8rem] px-1"}
                />
              ) : !checkAchievements.yee_achievements &&
                !checkAchievements.yee_results ? (
                <Badge
                  message={"Not yet Submitted"}
                  className={"text-[.8rem] px-1"}
                />
              ) : (
                "Loading..."
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* Achievements */}
      {panel === "Achievements" && (
        <div className="w-full bg-default p-2 rounded-md">
          {checkAchievements.first_part_id ? (
            <>
              {quarter == 0 ? (
                <>
                  <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
                    <span>Please select a quarter</span>
                  </div>
                </>
              ) : quarter == 1 ? (
                <>
                  {checkAchievements.fq_achievements ? (
                    <>
                      <span className="w-full block p-2">
                        Achievements Submitted:
                      </span>
                      <div className="bg-white rounded-md text-black font-normal">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="w-1/2 bg-un-blue-light font-semibold rounded-tl-md">
                                <div className="text-white flex justify-center">
                                  KPI Description
                                </div>
                              </th>
                              <th className="w-1/2 bg-un-blue-light font-semibold rounded-tr-md">
                                <div className="text-white flex justify-center">
                                  Achievements
                                </div>
                              </th>
                            </tr>
                          </thead>
                          {achievements.map((achievement) => (
                            <tbody key={achievement.kpi_id}>
                              <tr className="shadow">
                                <td>
                                  <div className="px-10 pb-2">
                                    {achievement.kpi_desc}
                                  </div>
                                </td>
                                <td>
                                  <div className="px-10">
                                    {achievement.fq_achievements}
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          ))}
                        </table>
                      </div>
                    </>
                  ) : (
                    <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
                      <span>
                        Sorry, the employee have not yet submitted their
                        achievements yet for the first quarter
                      </span>
                    </div>
                  )}
                </>
              ) : quarter == 2 ? (
                <>
                  {checkAchievements.myr_achievements ? (
                    <>
                      <span className="w-full block p-2">
                        Achievements Submitted:
                      </span>
                      <div className="bg-white rounded-md text-black font-normal">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="w-1/2 bg-un-blue-light font-semibold rounded-tl-md">
                                <div className="text-white flex justify-center">
                                  KPI Description
                                </div>
                              </th>
                              <th className="w-1/2 bg-un-blue-light font-semibold rounded-tr-md">
                                <div className="text-white flex justify-center">
                                  Achievements
                                </div>
                              </th>
                            </tr>
                          </thead>
                          {achievements.map((achievement) => (
                            <tbody key={achievement.kpi_id}>
                              <tr className="shadow">
                                <td>
                                  <div className="px-10 pb-2">
                                    {achievement.kpi_desc}
                                  </div>
                                </td>
                                <td>
                                  <div className="px-10">
                                    {achievement.myr_achievements}
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          ))}
                        </table>
                      </div>
                    </>
                  ) : (
                    <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
                      <span>
                        Sorry, the employee have not yet submitted their
                        achievements yet for the mid year quarter.
                      </span>
                    </div>
                  )}
                </>
              ) : quarter == 3 ? (
                <>
                  {checkAchievements.tq_achievements ? (
                    <>
                      <span className="w-full block p-2">
                        Achievements Submitted:
                      </span>
                      <div className="bg-white rounded-md text-black font-normal">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="w-1/2 bg-un-blue-light font-semibold rounded-tl-md">
                                <div className="text-white flex justify-center">
                                  KPI Description
                                </div>
                              </th>
                              <th className="w-1/2 bg-un-blue-light font-semibold rounded-tr-md">
                                <div className="text-white flex justify-center">
                                  Achievements
                                </div>
                              </th>
                            </tr>
                          </thead>
                          {achievements.map((achievement) => (
                            <tbody key={achievement.kpi_id}>
                              <tr className="shadow">
                                <td>
                                  <div className="px-10 pb-2">
                                    {achievement.kpi_desc}
                                  </div>
                                </td>
                                <td>
                                  <div className="px-10">
                                    {achievement.tq_achievements}
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          ))}
                        </table>
                      </div>
                    </>
                  ) : (
                    <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
                      <span>
                        Sorry, the employee have not yet submitted their
                        achievements yet for the third quarter.
                      </span>
                    </div>
                  )}
                </>
              ) : quarter == 4 ? (
                <>
                {checkAchievements.yee_achievements ? (
                    <>
                      <span className="w-full block p-2">
                        Achievements Submitted:
                      </span>
                      <div className="bg-white rounded-md text-black font-normal">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="w-1/2 bg-un-blue-light font-semibold rounded-tl-md">
                                <div className="text-white flex justify-center">
                                  KPI Description
                                </div>
                              </th>
                              <th className="w-1/2 bg-un-blue-light font-semibold rounded-tr-md">
                                <div className="text-white flex justify-center">
                                  Achievements
                                </div>
                              </th>
                            </tr>
                          </thead>
                          {achievements.map((achievement) => (
                            <tbody key={achievement.kpi_id}>
                              <tr className="shadow">
                                <td>
                                  <div className="px-10 pb-2">
                                    {achievement.kpi_desc}
                                  </div>
                                </td>
                                <td>
                                  <div className="px-10">
                                    {achievement.yee_achievements}
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          ))}
                        </table>
                      </div>
                    </>
                  ) : (
                    <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
                      <span>
                        Sorry, the employee have not yet submitted their
                        achievements yet for the year end quarter.
                      </span>
                    </div>
                  )}
                </>
              ) : (
                "Loading..."
              )}
            </>
          ) : (
            <>
              <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
                <span>
                  Sorry, the employee have not yet created their main goals yet
                </span>
              </div>
            </>
          )}
        </div>
      )}
      {/* Grades */}

      {panel === "Grades" && (
        <EmployeeAssessmentGrade employee_id={employee_id} quarter={quarter} workYear={workYear} checkAchievements={checkAchievements} />
      )}
    </>
  );
}
