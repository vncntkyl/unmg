import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import { developmentAPIs as url } from "../../context/apiList";

export default function AssessmentTrackingDetails({
  quarter,
  emp_id,
  workYear,
}) {
  const [loading, toggleLoading] = useState(true);

  const quarterName =
    quarter == 1
      ? "First Quarter"
      : quarter == 2
      ? "Mid Year Quarter"
      : quarter == 3
      ? "Third Quarter"
      : "Year End Quarter";
  const [achievements, setAchievements] = useState([]);
  const [ifAchievementsExists, setIfAchievementsExists] = useState(false);
  const [ifResultsExists, setIfResultsExists] = useState(false);
  const [metrics, setMetrics] = useState(false);

  useEffect(() => {
    const getfinalUserPerformance = async () => {
      const parameters = {
        params: {
          checkUserAchievements: true,
          workYear: workYear,
          empID: emp_id,
        },
      };
      try {
        const response = await axios.get(url.retrieveTracking, parameters);
        setAchievements(response.data);
        const achievements = response.data.map((item) => {
          return {
            fq_achievements:
              item.fq_achievements != "" && item.fq_achievements != null,
            myr_achievements:
              item.myr_achievements != "" && item.myr_achievements != null,
            tq_achievements:
              item.tq_achievements != "" && item.tq_achievements != null,
            yee_achievements:
              item.yee_achievements != "" && item.yee_achievements != null,
          };
        });
        const allAchievements = {
          fq_achievements: achievements.some((item) => item.fq_achievements),
          myr_achievements: achievements.some((item) => item.myr_achievements),
          tq_achievements: achievements.some((item) => item.tq_achievements),
          yee_achievements: achievements.some((item) => item.yee_achievements),
        };
        setIfAchievementsExists(allAchievements);

        const results = [
          {
            checkfq: response.data.some((item) => item.fq_results != 0),
            checkmyr: response.data.some((item) => item.myr_results != 0),
            checktq: response.data.some((item) => item.tq_results != 0),
            checkyee: response.data.some((item) => item.yee_results != 0),
          },
        ];
        setIfResultsExists(results);
      } catch (error) {
        console.log(error.message);
      }
    };
    const getMetrics = async () => {
      const parameters = {
        params: {
          metrics: true,
          workYear: workYear,
          empID: emp_id,
        },
      };
      try {
        const response = await axios.get(url.retrieveTracking, parameters);
        setMetrics(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMetrics();
    getfinalUserPerformance();
    toggleLoading(false);
  }, [emp_id, workYear]);

  return loading ? (
    "Loading..."
  ) : (
    <>
      {quarter == 1 ? (
        <>
          {ifAchievementsExists.fq_achievements ? (
            <>
              {ifResultsExists &&
                ifResultsExists.map((checkresult, index) => (
                  <React.Fragment key={index}>
                    {checkresult.checkfq === true ? (
                      ""
                    ) : (
                      <>
                        {ifAchievementsExists.fq_achievements ? (
                          <React.Fragment>
                            <span className="w-full flex justify-center">
                              Please wait for your supervisor to grade your KPI.
                            </span>
                            <span className="w-full block pt-8 pb-2">
                              Achievements Submitted:
                            </span>
                            <div className="bg-white rounded-md text-black font-normal h-[62vh] overflow-auto hide_scroll">
                              <table className="w-full">
                                <thead className="sticky top-0">
                                  <tr>
                                    <th className="w-1/3 bg-un-blue-light font-semibold rounded-tl-md">
                                      <div className="text-white flex justify-center">
                                        KPI Description
                                      </div>
                                    </th>
                                    <th className="w-1/3 bg-un-blue-light font-semibold">
                                      <div className="text-white flex justify-center">
                                        Target Metrics
                                      </div>
                                    </th>
                                    <th className="w-1/3 bg-un-blue-light font-semibold rounded-tr-md">
                                      <div className="text-white flex justify-center">
                                        Achievements
                                      </div>
                                    </th>
                                  </tr>
                                </thead>
                                {achievements.map((achievement) => (
                                  <tbody key={achievement.kpi_id}>
                                    <tr className="shadow">
                                      <td className="w-1/3">
                                        <div className="px-10 pb-2">
                                          {achievement.kpi_desc}
                                        </div>
                                      </td>
                                      <td className="w-1/3">
                                        <div className="p-2 flex items-center justify-center">
                                          <div className="p-2 flex text-[.8rem] justify-center items-start">
                                            <table>
                                              {metrics
                                                .filter(
                                                  (metric) =>
                                                    metric.kpi_id ===
                                                    achievement.kpi_id
                                                )
                                                .map((metric) => (
                                                  <tr
                                                    key={
                                                      metric.target_metrics_id
                                                    }
                                                  >
                                                    <td
                                                      valign="top"
                                                      className="whitespace-nowrap"
                                                    >
                                                      <span>
                                                        {
                                                          metric.target_metrics_score
                                                        }
                                                      </span>
                                                      {" - "}
                                                    </td>
                                                    <td className="whitespace-break-spaces">
                                                      {
                                                        metric.target_metrics_desc
                                                      }
                                                    </td>
                                                  </tr>
                                                ))}
                                            </table>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="w-1/3">
                                        <div className="px-10">
                                          {achievement.fq_achievements}
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                ))}
                              </table>
                            </div>
                            <div className="pt-2 flex justify-end">
                              <a
                                href="/tracking_and_assessment/create"
                                className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue-light text-white rounded px-2 py-1 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
                                onClick={() => {
                                  localStorage.setItem(
                                    "assessment_quarter",
                                    quarter
                                  );
                                  localStorage.setItem(
                                    "quarter_name",
                                    quarterName
                                  );
                                  localStorage.setItem("workYear", workYear);
                                }}
                              >
                                Edit
                              </a>
                            </div>
                          </React.Fragment>
                        ) : null}
                      </>
                    )}
                  </React.Fragment>
                ))}
            </>
          ) : (
            <>
              <span className="flex justify-center py-2">
                You have not yet submitted your achievements for the{" "}
                {quarterName}.
              </span>
              <div className="flex justify-center py-2">
                <a
                  href="/tracking_and_assessment/create"
                  className="text-white p-2 flex flex-row items-center gap-2 bg-un-blue-light hover:bg-un-blue rounded-full text-[.9rem]"
                  onClick={() => {
                    localStorage.setItem("assessment_quarter", quarter);
                    localStorage.setItem("quarter_name", quarterName);
                    localStorage.setItem("workYear", workYear);
                  }}
                >
                  <AiOutlinePlus />
                  Add Quarter Evaluation
                </a>
              </div>
            </>
          )}
        </>
      ) : quarter == 2 ? (
        <>
          {ifAchievementsExists.myr_achievements ? (
            <>
              {ifResultsExists &&
                ifResultsExists.map((checkresult, index) => (
                  <React.Fragment key={index}>
                    {checkresult.checkmyr === true ? (
                      ""
                    ) : (
                      <>
                        {ifAchievementsExists.myr_achievements ? (
                          <React.Fragment>
                            <span className="w-full flex justify-center">
                              Please wait for your supervisor to grade your KPI.
                            </span>
                            <span className="w-full block pt-8 pb-2">
                              Achievements Submitted:
                            </span>
                            <div className="bg-white rounded-md text-black font-normal h-[62vh] overflow-auto hide_scroll">
                              <table className="w-full">
                                <thead className="sticky top-0">
                                  <tr>
                                    <th className="w-1/3 bg-un-blue-light font-semibold rounded-tl-md">
                                      <div className="text-white flex justify-center">
                                        KPI Description
                                      </div>
                                    </th>
                                    <th className="w-1/3 bg-un-blue-light font-semibold">
                                      <div className="text-white flex justify-center">
                                        Target Metrics
                                      </div>
                                    </th>
                                    <th className="w-1/3 bg-un-blue-light font-semibold rounded-tr-md">
                                      <div className="text-white flex justify-center">
                                        Achievements
                                      </div>
                                    </th>
                                  </tr>
                                </thead>
                                {achievements.map((achievement) => (
                                  <tbody key={achievement.kpi_id}>
                                    <tr className="shadow">
                                      <td className="w-1/3">
                                        <div className="px-10 pb-2">
                                          {achievement.kpi_desc}
                                        </div>
                                      </td>
                                      <td className="w-1/3">
                                        <div className="p-2 flex items-center justify-center">
                                          <div className="p-2 flex text-[.8rem] justify-center items-start">
                                            <table>
                                              {metrics
                                                .filter(
                                                  (metric) =>
                                                    metric.kpi_id ===
                                                    achievement.kpi_id
                                                )
                                                .map((metric) => (
                                                  <tr
                                                    key={
                                                      metric.target_metrics_id
                                                    }
                                                  >
                                                    <td
                                                      valign="top"
                                                      className="whitespace-nowrap"
                                                    >
                                                      <span>
                                                        {
                                                          metric.target_metrics_score
                                                        }
                                                      </span>
                                                      {" - "}
                                                    </td>
                                                    <td className="whitespace-break-spaces">
                                                      {
                                                        metric.target_metrics_desc
                                                      }
                                                    </td>
                                                  </tr>
                                                ))}
                                            </table>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="w-1/3">
                                        <div className="px-10">
                                          {achievement.myr_achievements}
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                ))}
                              </table>
                            </div>
                            <div className="pt-2 flex justify-end">
                              <a
                                href="/tracking_and_assessment/create"
                                className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue-light text-white rounded px-2 py-1 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
                                onClick={() => {
                                  localStorage.setItem(
                                    "assessment_quarter",
                                    quarter
                                  );
                                  localStorage.setItem(
                                    "quarter_name",
                                    quarterName
                                  );
                                  localStorage.setItem("workYear", workYear);
                                }}
                              >
                                Edit
                              </a>
                            </div>
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </React.Fragment>
                ))}
            </>
          ) : (
            <>
              {!ifAchievementsExists.fq_achievements &&
              !ifResultsExists.checkfq ? (
                <>
                  <span className="flex justify-center py-2">
                    This quarter is still unavailable. Please submit
                    achievements on the First Quarter
                  </span>
                </>
              ) : (
                <>
                  <span className="flex justify-center py-2">
                    You have not yet submitted your achievements for the{" "}
                    {quarterName}.
                  </span>
                  <div className="flex justify-center py-2">
                    <a
                      href="/tracking_and_assessment/create"
                      className="text-white p-2 flex flex-row items-center gap-2 bg-un-blue-light hover:bg-un-blue rounded-full text-[.9rem]"
                      onClick={() => {
                        localStorage.setItem("assessment_quarter", quarter);
                        localStorage.setItem("quarter_name", quarterName);
                        localStorage.setItem("workYear", workYear);
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
        </>
      ) : quarter == 3 ? (
        <>
          {ifAchievementsExists.tq_achievements ? (
            <>
              {ifResultsExists &&
                ifResultsExists.map((checkresult, index) => (
                  <React.Fragment key={index}>
                    {checkresult.checktq === true ? (
                      ""
                    ) : (
                      <>
                        {ifAchievementsExists.tq_achievements ? (
                          <React.Fragment>
                            <span className="w-full flex justify-center">
                              Please wait for your supervisor to grade your KPI.
                            </span>
                            <span className="w-full block pt-8 pb-2">
                              Achievements Submitted:
                            </span>
                            <div className="bg-white rounded-md text-black font-normal h-[62vh] overflow-auto hide_scroll">
                              <table className="w-full">
                                <thead className="sticky top-0">
                                  <tr>
                                    <td className="w-1/3 bg-un-blue-light font-semibold rounded-tl-md">
                                      <div className="text-white flex justify-center">
                                        KPI Description
                                      </div>
                                    </td>
                                    <td className="w-1/3 bg-un-blue-light font-semibold">
                                      <div className="text-white flex justify-center">
                                        Target Metrics
                                      </div>
                                    </td>
                                    <td className="w-1/3 bg-un-blue-light font-semibold rounded-tr-md">
                                      <div className="text-white flex justify-center">
                                        Achievements
                                      </div>
                                    </td>
                                  </tr>
                                </thead>
                                {achievements.map((achievement) => (
                                  <tbody key={achievement.kpi_id}>
                                    <tr className="shadow">
                                      <td className="w-1/3">
                                        <div className="px-10 pb-2">
                                          {achievement.kpi_desc}
                                        </div>
                                      </td>
                                      <td className="w-1/3">
                                        <div className="p-2 flex items-center justify-center">
                                          <div className="p-2 flex text-[.8rem] justify-center items-start">
                                            <table>
                                              {metrics
                                                .filter(
                                                  (metric) =>
                                                    metric.kpi_id ===
                                                    achievement.kpi_id
                                                )
                                                .map((metric) => (
                                                  <tr
                                                    key={
                                                      metric.target_metrics_id
                                                    }
                                                  >
                                                    <td
                                                      valign="top"
                                                      className="whitespace-nowrap"
                                                    >
                                                      <span>
                                                        {
                                                          metric.target_metrics_score
                                                        }
                                                      </span>
                                                      {" - "}
                                                    </td>
                                                    <td className="whitespace-break-spaces">
                                                      {
                                                        metric.target_metrics_desc
                                                      }
                                                    </td>
                                                  </tr>
                                                ))}
                                            </table>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="w-1/3">
                                        <div className="px-10">
                                          {achievement.tq_achievements}
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                ))}
                              </table>
                            </div>
                            <div className="pt-2 flex justify-end">
                              <a
                                href="/tracking_and_assessment/create"
                                className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue-light text-white rounded px-2 py-1 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
                                onClick={() => {
                                  localStorage.setItem(
                                    "assessment_quarter",
                                    quarter
                                  );
                                  localStorage.setItem(
                                    "quarter_name",
                                    quarterName
                                  );
                                  localStorage.setItem("workYear", workYear);
                                }}
                              >
                                Edit
                              </a>
                            </div>
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </React.Fragment>
                ))}
            </>
          ) : (
            <>
              {!ifAchievementsExists.myr_achievements &&
              !ifResultsExists.checkmyr ? (
                <>
                  <span className="flex justify-center py-2">
                    This quarter is still unavailable. Please submit
                    achievements on the Mid Year Quarter
                  </span>
                </>
              ) : (
                <>
                  <span className="flex justify-center py-2">
                    You have not yet submitted your achievements for the{" "}
                    {quarterName}.
                  </span>
                  <div className="flex justify-center py-2">
                    <a
                      href="/tracking_and_assessment/create"
                      className="text-white p-2 flex flex-row items-center gap-2 bg-un-blue-light hover:bg-un-blue rounded-full text-[.9rem]"
                      onClick={() => {
                        localStorage.setItem("assessment_quarter", quarter);
                        localStorage.setItem("quarter_name", quarterName);
                        localStorage.setItem("workYear", workYear);
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
        </>
      ) : quarter == 4 ? (
        <>
          {ifAchievementsExists.yee_achievements ? (
            <>
              {ifResultsExists &&
                ifResultsExists.map((checkresult, index) => (
                  <React.Fragment key={index}>
                    {checkresult.checkyee === true ? (
                      ""
                    ) : (
                      <>
                        {ifAchievementsExists.yee_achievements ? (
                          <React.Fragment>
                            <span className="w-full flex justify-center">
                              Please wait for your supervisor to grade your KPI.
                            </span>
                            <span className="w-full block pt-8 pb-2">
                              Achievements Submitted:
                            </span>
                            <div className="bg-white rounded-md text-black font-normal h-[62vh] overflow-auto hide_scroll">
                              <table className="w-full">
                                <thead className="sticky top-0">
                                  <tr>
                                    <td className="w-1/3 bg-un-blue-light font-semibold rounded-tl-md">
                                      <div className="text-white flex justify-center">
                                        KPI Description
                                      </div>
                                    </td>
                                    <td className="w-1/3 bg-un-blue-light font-semibold">
                                      <div className="text-white flex justify-center">
                                        Target Metrics
                                      </div>
                                    </td>
                                    <td className="w-1/3 bg-un-blue-light font-semibold rounded-tr-md">
                                      <div className="text-white flex justify-center">
                                        Achievements
                                      </div>
                                    </td>
                                  </tr>
                                </thead>
                                {achievements.map((achievement) => (
                                  <tbody key={achievement.kpi_id}>
                                    <tr className="shadow">
                                      <td className="w-1/3">
                                        <div className="px-10 pb-2">
                                          {achievement.kpi_desc}
                                        </div>
                                      </td>
                                      <td className="w-1/3">
                                        <div className="p-2 flex items-center justify-center">
                                          <div className="p-2 flex text-[.8rem] justify-center items-start">
                                            <table>
                                              {metrics
                                                .filter(
                                                  (metric) =>
                                                    metric.kpi_id ===
                                                    achievement.kpi_id
                                                )
                                                .map((metric) => (
                                                  <tr
                                                    key={
                                                      metric.target_metrics_id
                                                    }
                                                  >
                                                    <td
                                                      valign="top"
                                                      className="whitespace-nowrap"
                                                    >
                                                      <span>
                                                        {
                                                          metric.target_metrics_score
                                                        }
                                                      </span>
                                                      {" - "}
                                                    </td>
                                                    <td className="whitespace-break-spaces">
                                                      {
                                                        metric.target_metrics_desc
                                                      }
                                                    </td>
                                                  </tr>
                                                ))}
                                            </table>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="w-1/3">
                                        <div className="px-10">
                                          {achievement.yee_achievements}
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                ))}
                              </table>
                            </div>
                            <div className="pt-2 flex justify-end">
                              <a
                                href="/tracking_and_assessment/create"
                                className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue-light text-white rounded px-2 py-1 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
                                onClick={() => {
                                  localStorage.setItem(
                                    "assessment_quarter",
                                    quarter
                                  );
                                  localStorage.setItem(
                                    "quarter_name",
                                    quarterName
                                  );
                                  localStorage.setItem("workYear", workYear);
                                }}
                              >
                                Edit
                              </a>
                            </div>
                          </React.Fragment>
                        ) : !ifAchievementsExists.tq_achievements &&
                          !checkresult.checktq ? (
                          <>
                            <span className="flex justify-center py-2">
                              This quarter is still unavailable. Please submit
                              achievements on the First Quarter
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </React.Fragment>
                ))}
            </>
          ) : (
            <>
              {!ifAchievementsExists.tq_achievements &&
              !ifResultsExists.checktq ? (
                <>
                  <span className="flex justify-center py-2">
                    This quarter is still unavailable. Please submit
                    achievements on the Third Quarter
                  </span>
                </>
              ) : (
                <>
                  <span className="flex justify-center py-2">
                    You have not yet submitted your achievements for the{" "}
                    {quarterName}.
                  </span>
                  <div className="flex justify-center py-2">
                    <a
                      href="/tracking_and_assessment/create"
                      className="text-white p-2 flex flex-row items-center gap-2 bg-un-blue-light hover:bg-un-blue rounded-full text-[.9rem]"
                      onClick={() => {
                        localStorage.setItem("assessment_quarter", quarter);
                        localStorage.setItem("quarter_name", quarterName);
                        localStorage.setItem("workYear", workYear);
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
        </>
      ) : (
        ""
      )}
    </>
  );
}
