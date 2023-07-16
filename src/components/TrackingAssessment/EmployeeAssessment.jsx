import React, { useState, useEffect } from "react";
import axios from "axios";
import { error } from "jquery";
import Badge from "../../misc/Badge";
import classNames from "classnames";
import Toggle from "../Toggle";
import EmployeeAssessmentGrade from "./EmployeeAssessmentGrade";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function EmployeeAssessment() {
  const employee_id = localStorage.getItem("assessment_id");
  const [panel, setPanel] = useState("Achievements");
  const [quarter, setQuarter] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [checkAchievements, setCheckAchievements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAchievements = async () => {
      const url = "http://localhost/unmg_pms/api/retrieveTracking.php";
      try {
        const response = await axios.get(url, {
          params: {
            userTrackingAchievements: true,
            empID: employee_id
          },
        });
        setAchievements(response.data);
        const quarterlyAchievements = response.data.map((item) => {
          return {
            first_part_id: item.first_part_id !== "" && item.first_part_id !== null,
            fq_ratee_achievement: item.fq_ratee_achievement !== "" && item.fq_ratee_achievement !== null,
            myr_ratee_achievement: item.myr_ratee_achievement !== "" && item.myr_ratee_achievement !== null,
            tq_ratee_achievement: item.tq_ratee_achievement !== "" && item.tq_ratee_achievement !== null,
            yee_ratee_achievement: item.yee_ratee_achievement !== "" && item.yee_ratee_achievement !== null,
          };
        })
        setCheckAchievements(quarterlyAchievements);
      }
      catch (error) {
        console.log(error.message);
      }
    }
    getAchievements();
  }, [employee_id]);

  return (
    <>
      <button className="flex flex-row items-center w-fit text-dark-gray text-[.9rem] bg-default-dark p-1 rounded-md mb-4"
        onClick={() => navigate(-1)}
      >
        <MdOutlineKeyboardArrowLeft />
        <span>Back</span>
      </button>
      <div className="flex pb-2 px-2 justify-between">
        <div className="flex flex-row items-center gap-2 justify-between md:justify-start">
          <label className="font-semibold">Employee Name:</label>
          <label>{achievements.map((achieve) => achieve.employee_name)}</label>
        </div>
        <Toggle
          paths={[
            "/tracking_and_assement/employee_assessment/" +
            localStorage.getItem("assessment_name"),
            "/tracking_and_assement/employee_assessment/" +
            localStorage.getItem("assessment_name") +
            "/",
          ]}
          panel={panel}
          panel_1={"Achievements"}
          setPanel={setPanel}
          panel_2={"Grades"}
        />
      </div>
      <div className="flex pb-2 px-2 justify-between">
        <div className="flex flex-row items-center gap-2 justify-between md:justify-start">
          <label htmlFor="quarterPicker" className="font-semibold">
            Select Quarter:
          </label>
          <select className="bg-default text-black rounded-md p-1 px-2 outline-none"
            onChange={quart => setQuarter(quart.target.value)}
            value={quarter}
          >
            <option value={0} disabled>Select Quarter</option>
            <option value={1}>First Quarter</option>
            <option value={2}>Second Quarter</option>
            <option value={3}>Third Quarter</option>
            <option value={4}>Fourth Quarter</option>
          </select>
        </div>
        <div className="flex flex-row items-center gap-2  justify-between md:justify-start">
          <label className="font-semibold">Status:</label>
          <Badge
            message={"Ready for Grading"}
            className={"text-[.8rem] px-1"}
          />
        </div>
      </div>
      {/* Achievements */}
      {panel === "Achievements" && (
        <div className="w-full bg-default px-2 pb-4 pt-2 rounded-md">
          {/* checkAchievements */}
          {checkAchievements.map((check, index) => (
            <div key={index}>
              {check.first_part_id ? (
                <>
                  <div className="w-full">
                    <span className="font-semibold text-dark-gray">
                      Employee Achievements:
                    </span>
                  </div>
                  <div className="w-full pt-4 pl-4">
                    {achievements.map((ach, use) => (

                      <span 
                      key={use}
                      className="text-black">
                        {quarter == 0 || quarter == 1 ?
                          (<>
                            {check.fq_ratee_achievement ? (ach.fq_ratee_achievement)
                              : (
                                <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
                                  <span>
                                    Sorry, the employee have not yet submitted their <a className="font-bold">First Quarter</a> achievements
                                  </span>
                                </div>
                              )}
                          </>)
                          : quarter == 2 ?
                            (<>
                              {check.myr_ratee_achievement ? (ach.myr_ratee_achievement)
                                : (
                                  <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
                                    <span>
                                      Sorry, the employee have not yet submitted their <a className="font-bold">Mid Year Quarter</a> achievements
                                    </span>
                                  </div>
                                )}
                            </>)
                            : quarter == 3 ?
                              (<>
                                {check.tq_ratee_achievement ? (ach.tq_ratee_achievement)
                                  : (
                                    <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
                                      <span>
                                        Sorry, the employee have not yet submitted their <a className="font-bold">Third Quarter</a> achievements
                                      </span>
                                    </div>
                                  )}
                              </>)
                              : quarter == 4 ?
                                (<>
                                  {check.yee_ratee_achievement ? (ach.yee_ratee_achievement)
                                    : (
                                      <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
                                        <span>
                                          Sorry, the employee have not yet submitted their <a className="font-bold">Year End Quarter</a> achievements
                                        </span>
                                      </div>
                                    )}
                                </>)
                                : (<>
                                  Loading...
                                </>)}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
                  <span>
                    Sorry, the employee have not yet created their main goals yet
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Grades */}

      {panel === "Grades" && (<EmployeeAssessmentGrade employee_id={employee_id} quarter={quarter} />)}
    </>
  );
}
