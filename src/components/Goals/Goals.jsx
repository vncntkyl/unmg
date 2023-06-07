import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useFunction } from "../../context/FunctionContext";
import GoalTableHeader from "./GoalTableHeader";

export default function Goals({ user_id, pillars = [] }) {
  const { id } = useParams();
  const [hasSet, toggleSet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [goalData, setGoalData] = useState([]);
  const [currentPillar, setPillar] = useState(1);

  const { removeSubText } = useFunction();

  const TableComponent = ({ data }) => {
    let previousObjective = "";
    let previousKpi = "";

    return (
      <table>
        <thead>
          <tr>
            <th>Objective</th>
            <th>KPI</th>
            <th>Weight</th>
            <th>Target Metrics</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const isFirstObjective = item.objective !== previousObjective;
            const isFirstKpi = item.kpi_desc !== previousKpi;

            previousObjective = item.objective;
            previousKpi = item.kpi_desc;

            return (
              <tr key={index}>
                {isFirstObjective && (
                  <td
                    rowSpan={
                      data.filter((i) => i.objective === item.objective).length
                    }
                  >
                    {item.objective}
                  </td>
                )}
                {isFirstKpi && (
                  <>
                    <td
                      rowSpan={
                        data.filter((i) => i.kpi_desc === item.kpi_desc).length
                      }
                    >
                      {item.kpi_desc}
                    </td>
                    <td
                      rowSpan={
                        data.filter((i) => i.kpi_desc === item.kpi_desc).length
                      }
                    >
                      {item.kpi_weight}
                    </td>
                  </>
                )}
                <td>{item.target_metrics_desc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  useEffect(() => {
    if (!user_id) return;

    const retrieveUser = async () => {
      const url = "http://localhost/unmg_pms/api/fetchAllGoals.php";
      //const url = "../api/fetchGoals.php";

      const formData = new FormData();
      formData.append("user_id", user_id);
      try {
        const response = await axios.post(url, formData);
        if (response.data != 0) {
          setGoalData(response.data);
          toggleSet(true);
          setLoading(false);
        } else {
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
          <div className="overflow-x-scroll xl:overflow-hidden border-no rounded-lg bg-default">
            <div className="w-full p-2 flex flex-col gap-2">
              <select
                onChange={(e) => setPillar(e.target.value)}
                className="w-full outline-none"
              >
                {pillars.map((pillar) => {
                  return (
                    <>
                      <option value={pillar.pillar_id}>
                        {removeSubText(pillar.pillar_name)}
                      </option>
                    </>
                  );
                })}
              </select>
              <div className="bg-white rounded overflow-hidden w-full">
                <TableComponent data={goalData} />
                {/* {goalData[currentPillar - 1].map((pillar, pillar_index) => {
                  return (
                    <>
                      <div className="flex flex-row items-center gap-2 justify-between font-semibold  bg-un-blue-light text-white p-1">
                        <p>{pillar.pillar_name}</p>
                        <span>{pillar.pillar_percentage}%</span>
                      </div>
                      <div className="p-2 overflow-x-scroll w-full">
                        <table className="w-full">
                          <thead>
                            <tr>
                              {[
                                ["Objectives", "(General)"],
                                ["Key Performance Indicator", "(KPI)"],
                                ["Weight", "%"],
                                ["Target Metrics", "(1 - 4)"],
                              ].map((title) => {
                                return <GoalTableHeader title={title} />;
                              })}
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </>
                  );
                })} */}
              </div>
            </div>
            {/* <div className="w-full">
              <div className="bg-un-blue-light text-white grid grid-cols-5">
                {[
                  ["Perspective", "(Pillar)"],
                  ["Objectives", "(General)"],
                  ["Key Performance Indicator", "(KPI)"],
                  ["Weight", "%"],
                  ["Target Metrics", "(1 - 4)"],
                ].map((title) => {
                  return <GoalTableHeader title={title} />;
                })}
              </div>
              <div className="grid grid-cols-5"></div>
            </div> */}
            {/* <table className="w-full">
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
                            {objData.kpi.map((kpis) => {
                              const kpi = kpis[0];
                              return (
                                <>
                                  <td>{kpi.kpi_description}</td>
                                  <td>{kpi.kpi_weight}</td>
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
                    </tr>
                  );
                })}
              </tbody>
            </table> */}
            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: "Courier New",
                fontSize: "14px",
                padding: "10px",
              }}
            >
              {JSON.stringify(goalData, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </>
  ) : (
    <>Loading...</>
  );
}
