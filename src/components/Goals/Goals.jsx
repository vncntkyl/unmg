import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";

export default function Goals({ user_id, pillars = [] }) {
  const { id } = useParams();
  const [hasSet, toggleSet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [goalData, setGoalData] = useState([]);
  useEffect(() => {
    if (!user_id) return;

    const retrieveUser = async () => {
      const url = "http://localhost/unmg_pms/api/fetchGoals.php";
      //const url = "../api/fetchGoals.php";

      const formData = new FormData();
      formData.append("user_id", user_id);
      try {
        const response = await axios.post(url, formData);
        if (response.data) {
          setGoalData(response.data);

          toggleSet(true);
          setLoading(false);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    retrieveUser();
  }, [user_id]);
  return !loading ? (
    <>
      {!hasSet ? (
        <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2 items-center text-center">
          <span>
            Sorry, you haven&lsquo;t set your KPIs Objectives yet. Please click
            the button to get started.
          </span>
          <a
            href="/main_goals/create"
            className="text-white p-2 flex flex-row items-center gap-2 bg-un-blue-light hover:bg-un-blue rounded-full text-[.9rem]"
          >
            <AiOutlinePlus />
            Create Goals
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <a
            className="bg-un-blue-light text-white p-1 w-fit rounded-md cursor-pointer hover:bg-un-blue"
            href="/main_goals/create"
            onClick={() => {
              sessionStorage.setItem("edit_goal", user_id);
            }}
          >
            Edit Goals
          </a>
          <div className="overflow-x-scroll xl:overflow-hidden border border-un-blue-light rounded-lg">
            <table className="w-full">
              <thead className="bg-un-blue-light text-white">
                <tr>
                  <th className="font-normal whitespace-nowrap">
                    Perspective
                    <br />
                    (Pillar)
                  </th>
                  <th className="font-normal whitespace-nowrap">
                    Objectives
                    <br />
                    (General)
                  </th>
                  <th className="font-normal whitespace-nowrap">
                    Key Performance Indicator
                    <br />
                    (KPI)
                  </th>
                  <th className="font-normal whitespace-nowrap">
                    Weight
                    <br />
                    (%)
                  </th>
                  <th className="font-normal whitespace-nowrap">
                    Target Metrics
                    <br />
                    (1 - 4)
                  </th>
                </tr>
              </thead>
              <tbody>
                {goalData.map((goals) => {
                  const goal = goals[0];
                  return (
                    <tr className="even:bg-default">
                      <td className="p-2">
                        <div className="flex flex-col items-center">
                          <span>{goal.pillar_name}</span>
                          <span>{goal.pillar_percentage}%</span>
                        </div>
                      </td>
                      {goal.objectives.map((objData) => {
                        return (
                          <>
                            <td className="p-2 text-center">
                              {objData.objectives_description}
                            </td>
                            {objData.kpi.map((kpi) => {
                              return (
                                <>
                                  <td className="p-2 text-center">
                                    {kpi.kpi_description}
                                  </td>
                                  <td className="p-2 text-center">
                                    {kpi.kpi_weight}%
                                  </td>
                                  <td className="flex flex-col p-2">
                                    {kpi.target_metrics.map((metrics) => {
                                      return (
                                        <>
                                          <div className="flex flex-row gap-2 p-1">
                                            <span>
                                              {metrics[0].target_metrics_score}
                                            </span>{" "}
                                            -{" "}
                                            <p>
                                              {metrics[0].target_metrics_desc}
                                            </p>
                                          </div>
                                        </>
                                      );
                                    })}
                                  </td>
                                </>
                              );
                            })}
                          </>
                        );
                      })}
                      {}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  ) : (
    <>Loading...</>
  );
}
