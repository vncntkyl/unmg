import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import { AiOutlinePlus } from "react-icons/ai";

export default function AssessmentTrackingDetails({ quarter, emp_id, workYear }) {
  const [loading, toggleLoading] = useState(true);
  const quarterName = quarter == 1 ? "First Quarter" : quarter == 2 ? "Mid Year Quarter" : quarter == 3 ? "Third Quarter" : "Year End Quarter";
  const [achievements, setAchievements] = useState([]);
  const [ifAchievementsExists, setIfAchievementsExists] = useState(false);
  const [ifResultsExists, setIfResultsExists] = useState(false);
  useEffect(() => {
    const getfinalUserPerformance = async () => {
      const url = "http://localhost/unmg_pms/api/retrieveTracking.php";
      try {
        const response = await axios.get(url, {
          params: {
            checkUserAchievements: true,
            workYear: workYear,
            empID: emp_id
          },
        });
        setAchievements(response.data);
console.log(response.data);
        const achievements = response.data.map((item) => {
          return {
            fq_achievements: item.fq_achievements != '' && item.fq_achievements != null,
            myr_achievements: item.myr_achievements != '' && item.myr_achievements != null,
            tq_achievements: item.tq_achievements != '' && item.tq_achievements != null,
            yee_achievements: item.yee_achievements != '' && item.yee_achievements != null
          };
        });
        const allAchievements = {
          fq_achievements: achievements.some((item) => item.fq_achievements),
          myr_achievements: achievements.some((item) => item.myr_achievements),
          tq_achievements: achievements.some((item) => item.tq_achievements),
          yee_achievements: achievements.some((item) => item.yee_achievements),
        }
        setIfAchievementsExists(allAchievements);

        const results = [
          {
            checkfq: response.data.some((item) => item.fq_results != 0),
            checkmyr: response.data.some((item) => item.myr_results != 0),
            checktq: response.data.some((item) => item.tq_results != 0),
            checkyee: response.data.some((item) => item.yee_results != 0)
          }
        ];
        setIfResultsExists(results);
        console.log(results);
      }
      catch (error) {
        console.log(error.message);
      }
    }
    if (!emp_id) return;
    toggleLoading(false);
    getfinalUserPerformance();
  }, [emp_id, workYear]);

  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="font-semibold text-dark-gray bg-default rounded-md p-2">
        {quarter == 1 ? (
          <>
            {ifAchievementsExists.fq_achievements ? (
              <>
                {ifResultsExists && ifResultsExists.map((checkresult, index) => (
                  <React.Fragment key={index}>
                    {checkresult.checkfq === true ? "" : (
                      <>
                        {
                          ifAchievementsExists.fq_achievements && !checkresult.checkfq ? (
                            <React.Fragment>
                              <span className="w-full flex justify-center">
                                Please wait for your supervisor to grade your KPI.
                              </span>
                              <span className="w-full block pt-8">
                                Achievements Submitted:
                              </span>
                              <div className="bg-white rounded-md text-black font-normal">
                              <table className="w-full">
                                <thead>
                                  <tr>
                                    <td className="w-1/2 bg-un-blue-light font-semibold rounded-tl-md"><div className="text-white flex justify-center">KPI Description</div></td>
                                    <td className="w-1/2 bg-un-blue-light font-semibold rounded-tr-md"><div className="text-white flex justify-center">Achievements</div></td>
                                  </tr>
                                </thead>
                                {achievements.map((achievement) => (
                                  <tbody key={achievement.kpi_id}>
                                    <tr className="shadow">
                                      <td><div className="px-10 pb-2"><ul className="list-disc"><li>{achievement.kpi_desc}</li></ul></div></td>
                                      <td><div className="px-10">{achievement.fq_achievements && <ul className="list-disc"><li>{achievement.fq_achievements}</li></ul>}</div></td>
                                    </tr>
                                  </tbody>
                                ))}
                              </table>
                              </div>
                            </React.Fragment>
                          ) : (
                            <>

                            </>
                          )}
                      </>
                    )}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <>
                <span className="flex justify-center py-2">
                  You have not yet submitted your achievements for the {quarterName}.
                </span>
                <div className="flex justify-center py-2">
                  <a
                    href="/tracking_and_assessment/create"
                    className="text-white p-2 flex flex-row items-center gap-2 bg-un-blue-light hover:bg-un-blue rounded-full text-[.9rem]"
                    onClick={() => {
                      sessionStorage.setItem("assessment_quarter", quarter);
                    }}
                  >
                    <AiOutlinePlus />
                    Add Quarter Evaluation
                  </a>
                </div>
              </>
            )}
            {/* {ifResultsExists && ifResultsExists.map((checkresult, resultIndex) => (
                            <div key={resultIndex}>
                                {checkresult.checkfq === true ? "" : (
                                    <>
                                        {
                                            ifAchievementsExists.map((checkAchievement, achievementIndex) => (
                                                <div key={achievementIndex}>
                                                    {checkAchievement.fq_achievements === true ? (
                                                        <>
                                                            <div>
                                                                <span className="w-full flex justify-center">
                                                                    Please wait for your supervisor to grade your KPI.
                                                                </span>
                                                                <span className="w-full block pt-8">
                                                                    Achievements Submitted:
                                                                </span>
                                                                <span className="w-full block pl-4">
                                                                    {achievements.map((achievement) => achievement.fq_achievements)}
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="flex justify-center py-2">
                                                                You have not yet submitted your achievements for the {quarterName}.
                                                            </span>
                                                            <div className="flex justify-center py-2">    
                                                            <a
                                                                href="/tracking_and_assessment/create"
                                                                className="text-white p-2 flex flex-row items-center gap-2 bg-un-blue-light hover:bg-un-blue rounded-full text-[.9rem]"
                                                                onClick={() => {
                                                                    sessionStorage.setItem("assessment_quarter", quarter);
                                                                }}
                                                            >
                                                                <AiOutlinePlus />
                                                                Add Quarter Evaluation
                                                            </a>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            ))
                                        }
                                    </>
                                )}

                            </div>
                        ))} */}
          </>
        ) : quarter == 2 ? (
          <>
            {ifResultsExists && ifResultsExists.map((checkresult, resultIndex) => (
              <div key={resultIndex}>
                {checkresult.checkmyr === true ? "" : (
                  <>
                    {
                      ifAchievementsExists.map((checkAchievement, achievementIndex) => (
                        <div key={achievementIndex}>
                          {checkAchievement.myr_achievements === true ? (
                            <>
                              <div>
                                <span className="w-full flex justify-center">
                                  Please wait for your supervisor to grade your KPI.
                                </span>
                                <span className="w-full block pt-8">
                                  Achievements Submitted:
                                </span>
                                <span className="w-full block pl-4">
                                  {achievements.map((achievement) => achievement.myr_achievements)}
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              {checkresult.checkfq === false && checkAchievement.fq_achievements === false ?

                                (
                                  <span className="flex justify-center py-2">
                                    This quarter is still unavailable. Please submit achievements on the First Quarter
                                  </span>
                                ) : (
                                  <>
                                    <span className="flex justify-center py-2">
                                      You have not yet submitted your achievements for the {quarterName}.
                                    </span>
                                    <div className="flex justify-center py-2">
                                      <a
                                        href="/tracking_and_assessment/create"
                                        className="text-white p-2 flex flex-row items-center gap-2 bg-un-blue-light hover:bg-un-blue rounded-full text-[.9rem]"
                                        onClick={() => {
                                          sessionStorage.setItem("assessment_quarter", quarter);
                                        }}
                                      >
                                        <AiOutlinePlus />
                                        Add Quarter Evaluation
                                      </a>
                                    </div>
                                  </>
                                )}
                            </>
                          )}
                        </div>
                      ))
                    }
                  </>
                )}

              </div>
            ))}
          </>
        ) : quarter == 3 ? (
          <>
            {ifResultsExists && ifResultsExists.map((checkresult, resultIndex) => (
              <div key={resultIndex}>
                {checkresult.checktq === true ? "" : (
                  <>
                    {
                      ifAchievementsExists.map((checkAchievement, achievementIndex) => (
                        <div key={achievementIndex}>
                          {checkAchievement.tq_achievements === true ? (
                            <>
                              <div>
                                <span className="w-full flex justify-center">
                                  Please wait for your supervisor to grade your KPI.
                                </span>
                                <span className="w-full block pt-8">
                                  Achievements Submitted:
                                </span>
                                <span className="w-full block pl-4">
                                  {achievements.map((achievement) => achievement.tq_achievements)}
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              {checkresult.checkmyr === false && checkAchievement.myr_achievements === false ?

                                (
                                  <span className="flex justify-center py-2">
                                    This quarter is still unavailable. Please submit achievements on the Second Quarter
                                  </span>
                                ) : (
                                  <>
                                    <span className="flex justify-center py-2">
                                      You have not yet submitted your achievements for the {quarterName}.
                                    </span>
                                    <div className="flex justify-center py-2">
                                      <a
                                        href="/tracking_and_assessment/create"
                                        className="text-white p-2 flex flex-row items-center gap-2 bg-un-blue-light hover:bg-un-blue rounded-full text-[.9rem]"
                                        onClick={() => {
                                          sessionStorage.setItem("assessment_quarter", quarter);
                                        }}
                                      >
                                        <AiOutlinePlus />
                                        Add Quarter Evaluation
                                      </a>
                                    </div>
                                  </>
                                )}
                            </>
                          )}
                        </div>
                      ))
                    }
                  </>
                )}

              </div>
            ))}
          </>
        ) : quarter == 4 ? (
          <>
            {ifResultsExists && ifResultsExists.map((checkresult, resultIndex) => (
              <div key={resultIndex}>
                {checkresult.checkyee === true ? "" : (
                  <>
                    {
                      ifAchievementsExists.map((checkAchievement, achievementIndex) => (
                        <div key={achievementIndex}>
                          {checkAchievement.yee_achievements === true ? (
                            <>
                              <div>
                                <span className="w-full flex justify-center">
                                  Please wait for your supervisor to grade your KPI.
                                </span>
                                <span className="w-full block pt-8">
                                  Achievements Submitted:
                                </span>
                                <span className="w-full block pl-4">
                                  {achievements.map((achievement) => achievement.yee_achievements)}
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              {checkresult.checktq === false && checkAchievement.tq_achievements === false ?

                                (
                                  <span className="flex justify-center py-2">
                                    This quarter is still unavailable. Please submit achievements on the Third Quarter
                                  </span>
                                ) : (
                                  <>
                                    <span className="flex justify-center py-2">
                                      You have not yet submitted your achievements for the {quarterName}.
                                    </span>
                                    <div className="flex justify-center py-2">
                                      <a
                                        href="/tracking_and_assessment/create"
                                        className="text-white p-2 flex flex-row items-center gap-2 bg-un-blue-light hover:bg-un-blue rounded-full text-[.9rem]"
                                        onClick={() => {
                                          sessionStorage.setItem("assessment_quarter", quarter);
                                        }}
                                      >
                                        <AiOutlinePlus />
                                        Add Quarter Evaluation
                                      </a>
                                    </div>
                                  </>
                                )}
                            </>
                          )}
                        </div>
                      ))
                    }
                  </>
                )}

              </div>
            ))}
          </>
        ) : ""}
      </div>
    </>
  )
}