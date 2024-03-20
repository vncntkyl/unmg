import React, { useEffect, useState } from "react";
// import JSONCheck from "../../misc/JSONCheck";
// import axios from "axios";
import classNames from "classnames";
import { MdMessage } from "react-icons/md";
import { Popover, Tooltip } from "flowbite-react";

export default function GoalTable({
  tableData,
  current,
  edit,
  updateData,
  isApprover,
  handleContinue,
}) {
  return (
    <>
      <div className="w-full overflow-x-auto rounded-md">
        <div className="flex flex-row items-center gap-2 py-2">
          <p className="font-semibold">Pillar Percentage: </p>
          {edit ? (
            <>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="w-[50px] text-center p-1 bg-white rounded-md border-none"
                  value={
                    tableData.filter((pillar) => pillar.pillar_id == current)[0]
                      .pillar_percentage
                  }
                  min={0}
                  onChange={(e) => {
                    if (e.target.value < 0) return;
                    updateData("pillar percentage", current, e);
                  }}
                />
                <span>%</span>
                {isApprover ? (
                  <Popover
                    aria-labelledby="default-popover"
                    content={
                      <div className="w-72 text-sm text-gray-500">
                        <div className="border-b border-gray-200 bg-gray-100 px-3 py-2">
                          <h3
                            id="default-popover"
                            className="font-semibold text-gray-900"
                          >
                            Provide your comment
                          </h3>
                        </div>
                        <div className="px-3 py-2">
                          <textarea
                            className="w-full resize-y bg-default p-2 rounded-md min-h-[100px] text-black"
                            value={
                              tableData.filter(
                                (pillar) => pillar.pillar_id == current
                              )[0].comment
                            }
                            onChange={(e) => {
                              if (e.target.value < 0) return;
                              updateData("comment", current, e);
                            }}
                          ></textarea>
                        </div>
                      </div>
                    }
                  >
                    <button>
                      <Tooltip
                        placement="bottom"
                        content={"Add a comment?"}
                        style="light"
                        trigger="hover"
                      >
                        <div className="flex">
                          <MdMessage className="text-un-blue-light text-[1.2rem]" />
                        </div>
                      </Tooltip>
                    </button>
                  </Popover>
                ) : (
                  <>
                    {tableData.find((p) => p.pillar_id == current).comment && (
                      <Popover
                        aria-labelledby="default-popover"
                        content={
                          <div className="w-72 text-sm text-gray-500">
                            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2">
                              <h3
                                id="default-popover"
                                className="font-semibold text-gray-900"
                              >
                                Comment from your approver
                              </h3>
                            </div>
                            <div className="px-3 py-2">
                              <p>
                                {
                                  tableData.find(
                                    (p) => parseInt(p.pillar_id) == current
                                  ).comment
                                }
                              </p>
                            </div>
                          </div>
                        }
                      >
                        <button>
                          <Tooltip
                            placement="bottom"
                            content={
                              isApprover
                                ? "Add a comment?"
                                : "Your approver provided a comment"
                            }
                            style="light"
                            trigger="hover"
                          >
                            <div className="flex">
                              <MdMessage className="text-un-blue-light text-[1.2rem]" />
                              <div className="w-1 h-1 bg-un-red rounded-full animate-ping" />
                            </div>
                          </Tooltip>
                        </button>
                      </Popover>
                    )}
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <span>
                {
                  tableData.filter((pillar) => pillar.pillar_id == current)[0]
                    .pillar_percentage
                }
                %
              </span>
              {tableData.find((p) => p.pillar_id == current).comment && (
                <Popover
                  aria-labelledby="default-popover"
                  content={
                    <div className="w-72 text-sm text-gray-500">
                      <div className="border-b border-gray-200 bg-gray-100 px-3 py-2">
                        <h3
                          id="default-popover"
                          className="font-semibold text-gray-900 dark:text-white"
                        >
                          Comment from your approver
                        </h3>
                      </div>
                      <div className="px-3 py-2">
                        <p>
                          {
                            tableData.find((p) => p.pillar_id == current)
                              .comment
                          }
                        </p>
                      </div>
                    </div>
                  }
                >
                  <button className="flex">
                    <MdMessage className="text-un-blue-light text-[1.2rem]" />
                    <div className="w-1 h-1 bg-un-red rounded-full animate-ping" />
                  </button>
                </Popover>
              )}
            </>
          )}
        </div>
        <table
          className={classNames(
            "rounded-md w-full bg-white overflow-hidden",
            edit && "shadow-md shadow-black"
          )}
        >
          <thead>
            <tr className="bg-un-blue-light text-white border border-un-blue-light">
              <th className="w-full md:w-1/3 p-1 text-center">Objective</th>
              <th className="w-full md:w-1/3 p-1 text-center">KPI</th>
              <th className="w-full md:w-[10%] p-1 text-center">Weight</th>
              <th className="w-full md:w-1/3 p-1 text-center">
                Target Metrics
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData
              .filter((pillar) => pillar.pillar_id == current)
              .map((item, index) => (
                <tr key={index}>
                  {item.isFirstObjective && (
                    <td
                      valign="top"
                      align="center"
                      className={classNames(
                        "p-2",
                        !edit && "border border-mid-gray"
                      )}
                      rowSpan={
                        tableData
                          .filter((pillar) => pillar.pillar_id == current)
                          .filter((i) => i.objective === item.objective).length
                      }
                    >
                      <div className="w-full">
                        {edit ? (
                          <textarea
                            className="w-full resize-y bg-default p-2 rounded-md min-h-[100px]"
                            value={
                              tableData.filter(
                                (obj) => obj.objective_id === item.objective_id
                              )[0].objective
                            }
                            onChange={(e) => {
                              updateData("objective", item.objective_id, e);
                            }}
                          ></textarea>
                        ) : (
                          <span>{item.objective}</span>
                        )}
                      </div>
                    </td>
                  )}
                  {item.isFirstKpi && (
                    <>
                      <td
                        valign="top"
                        align="center"
                        className={classNames(
                          "p-2",
                          !edit && "border border-mid-gray"
                        )}
                        rowSpan={
                          tableData
                            .filter((pillar) => pillar.pillar_id == current)
                            .filter((i) => i.kpi_desc === item.kpi_desc).length
                        }
                      >
                        <div className="w-full">
                          {edit ? (
                            <textarea
                              className="w-full resize-y bg-default p-2 rounded-md h-[100px]"
                              rows={10}
                              value={item.kpi_desc}
                              onChange={(e) => {
                                updateData("KPI", item.kpi_id, e);
                              }}
                            ></textarea>
                          ) : (
                            <span>{item.kpi_desc}</span>
                          )}
                        </div>
                      </td>
                      <td
                        valign="top"
                        align="center"
                        className={classNames(
                          "p-2",
                          !edit && "border border-mid-gray"
                        )}
                        rowSpan={
                          tableData
                            .filter((pillar) => pillar.pillar_id == current)
                            .filter((i) => i.kpi_desc === item.kpi_desc).length
                        }
                      >
                        {edit ? (
                          <input
                            type="number"
                            className="w-full text-center resize-y bg-default p-2 rounded-md"
                            value={item.kpi_weight}
                            min={0}
                            onChange={(e) => {
                              if (e.target.value < 0) return;
                              updateData("KPI Weight", item.kpi_id, e);
                            }}
                          />
                        ) : (
                          <span>{item.kpi_weight}%</span>
                        )}
                      </td>
                    </>
                  )}
                  <td
                    className={classNames(
                      "p-1",
                      !edit && "border border-mid-gray"
                    )}
                  >
                    <div className="flex gap-1 text-[.9rem] px-2">
                      <span>{item.target_metrics_score}</span>
                      <span>-</span>
                      {edit ? (
                        <textarea
                          className="w-full resize-y bg-default p-2 rounded-md min-h-[75px]"
                          value={item.target_metrics_desc}
                          onChange={(e) => {
                            updateData(
                              "target metrics",
                              item.target_metrics_id,
                              e
                            );
                          }}
                        ></textarea>
                      ) : (
                        <span>{item.target_metrics_desc}</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {edit && (
        <button
          onClick={() => handleContinue()}
          className=" bg-un-blue-light text-white mt-2 py-1 px-3 rounded-md float-right"
        >
          Save
        </button>
      )}
    </>
  );
}

export function GoalList({
  pillars,
  tableData,
  edit,
  updateData,
  isApprover,
  handleContinue,
}) {
  return (
    <div className="max-h-[80vh] overflow-y-scroll">
      <div className="flex flex-col gap-4">
        {pillars?.map((pillar, pillarIndex) => {
          const uniqueObjectives = tableData
            .filter((item) => item.pillar_id === pillar.pillar_id)
            .filter((item, index, array) => {
              return (
                array.findIndex(
                  (obj) => obj.objective_id === item.objective_id
                ) === index
              );
            });
          return (
            <div className="bg-default rounded-md p-2" key={pillarIndex}>
              <div className="flex flex-col text-[1.2rem]">
                <div className="flex gap-2">
                  <span className="font-semibold">{pillar.pillar_name}</span>
                  {isApprover ? (
                      <Popover
                        aria-labelledby="default-popover"
                        content={
                          <div className="w-72 text-sm text-gray-500 text-[1rem]">
                            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2">
                              <h3
                                id="default-popover"
                                className="font-semibold text-gray-900"
                              >
                                Provide your comment
                              </h3>
                            </div>
                            <div className="px-3 py-2">
                              <textarea
                                className="w-full resize-y bg-default p-2 rounded-md min-h-[100px] text-black"
                                value={
                                  tableData.filter(
                                    (p) => p.pillar_id == pillar.pillar_id
                                  )[0].comment
                                }
                                onChange={(e) => {
                                  if (e.target.value < 0) return;
                                  updateData("comment", pillar.pillar_id, e);
                                }}
                              ></textarea>
                            </div>
                          </div>
                        }
                      >
                        <button className="text-[1rem]">
                          <Tooltip
                            placement="bottom"
                            content={"Add a comment?"}
                            style="light"
                            trigger="hover"
                          >
                            <div className="flex">
                              <MdMessage className="text-un-blue-light text-[1.2rem]" />
                            </div>
                          </Tooltip>
                        </button>
                      </Popover>
                    ) : (
                      <>
                        {tableData.find((p) => p.pillar_id == pillar.pillar_id)
                          .comment && (
                          <Popover
                            aria-labelledby="default-popover"
                            content={
                              <div className="w-72 text-sm text-gray-500 text-[1rem]">
                                <div className="border-b border-gray-200 bg-gray-100 px-3 py-2">
                                  <h3
                                    id="default-popover"
                                    className="font-semibold text-gray-900"
                                  >
                                    Comment from your approver
                                  </h3>
                                </div>
                                <div className="px-3 py-2">
                                  <p>
                                    {
                                      tableData.find(
                                        (p) => parseInt(p.pillar_id) == pillar.pillar_id
                                      ).comment
                                    }
                                  </p>
                                </div>
                              </div>
                            }
                          >
                            <button className="text-[1rem]">
                              <Tooltip
                                placement="bottom"
                                content={
                                  isApprover
                                    ? "Add a comment?"
                                    : "Your approver provided a comment"
                                }
                                style="light"
                                trigger="hover"
                              >
                                <div className="flex">
                                  <MdMessage className="text-un-blue-light text-[1.2rem]" />
                                  <div className="w-1 h-1 bg-un-red rounded-full animate-ping" />
                                </div>
                              </Tooltip>
                            </button>
                          </Popover>
                        )}
                      </>
                    )}
                </div>
                {edit ? (
                  <div className="flex items-center gap-2">
                    <span>Pillar Percentage:</span>
                    <input
                      type="number"
                      className="w-[50px] text-center p-1 bg-white rounded-md border-none"
                      value={
                        tableData.filter(
                          (pill) => pill.pillar_id === pillar.pillar_id
                        )[0].pillar_percentage
                      }
                      min={0}
                      onChange={(e) => {
                        if (e.target.value < 0) return;
                        updateData("pillar percentage", pillar.pillar_id, e);
                      }}
                    />
                    <span>%</span>
                  </div>
                ) : (
                  <>
                    <span>
                      {`Pillar Percentage:${
                        tableData.find((p) => p.pillar_id === pillar.pillar_id)
                          ?.pillar_percentage
                      }%`}
                    </span>
                  </>
                )}
              </div>
              {uniqueObjectives.map((objective, objectiveIndex) => {
                const uniqueKPIs = tableData
                  .filter(
                    (item) => item.objective_id === objective.objective_id
                  )
                  .filter((item, index, array) => {
                    return (
                      array.findIndex((kpi) => kpi.kpi_id === item.kpi_id) ===
                      index
                    );
                  });
                return (
                  <>
                    <div className="ml-2 mt-5">
                      <span className="flex items-center text-[1.2rem] gap-2">
                        {`${objectiveIndex + 1} Objective: `}
                        {edit ? (
                          <textarea
                            className="min-w-[300px] resize-y bg-white p-2 rounded-md min-h-[100px] mb-2"
                            value={
                              tableData.filter(
                                (obj) =>
                                  obj.objective_id === objective.objective_id
                              )[0].objective
                            }
                            onChange={(e) => {
                              updateData(
                                "objective",
                                objective.objective_id,
                                e
                              );
                            }}
                          ></textarea>
                        ) : (
                          <span className="font-semibold">
                            {objective.objective}
                          </span>
                        )}
                      </span>
                    </div>
                    <table
                      className={classNames("w-full", !edit ? "" : "mt-4")}
                    >
                      <thead>
                        <tr>
                          <td
                            className={classNames(
                              "py-1 px-2 text-center",
                              !edit
                                ? "bg-un-blue-light rounded-tl-md text-white"
                                : "font-semibold text-[1.2rem]"
                            )}
                          >
                            KPI
                          </td>
                          <td
                            className={classNames(
                              "py-1 px-2 text-center",
                              !edit
                                ? "bg-un-blue-light text-white"
                                : "font-semibold text-[1.2rem]"
                            )}
                          >
                            Weight
                          </td>
                          <td
                            className={classNames(
                              "py-1 px-2 text-center",
                              !edit
                                ? "bg-un-blue-light rounded-tr-md text-white"
                                : "font-semibold text-[1.2rem]"
                            )}
                          >
                            Metrics
                          </td>
                        </tr>
                      </thead>
                      <tbody
                        className={
                          !edit ? "bg-white" : "border-t border-mid-gray"
                        }
                      >
                        {uniqueKPIs.map((kpi, kpiIndex) => {
                          const uniqueMetrics = tableData
                            .filter((item) => item.kpi_id === kpi.kpi_id)
                            .filter((item, index, array) => {
                              return (
                                array.findIndex(
                                  (metrics) =>
                                    metrics.target_metrics_id ===
                                    item.target_metrics_id
                                ) === index
                              );
                            });
                          return (
                            <tr key={kpiIndex} className="">
                              <td
                                valign="top"
                                className={classNames(
                                  "w-full md:w-1/3 p-1 text-center",
                                  !edit
                                    ? "border border-mid-gray"
                                    : "border-b border-mid-gray"
                                )}
                              >
                                {edit ? (
                                  <div className="flex items-center gap-2">
                                    {`${kpiIndex + 1} KPI:`}
                                    <textarea
                                      className="min-w-[300px] resize-y bg-white p-2 rounded-md h-[60px]"
                                      value={
                                        tableData.filter(
                                          (item) => item.kpi_id === kpi.kpi_id
                                        )[0].kpi_desc
                                      }
                                      onChange={(e) => {
                                        updateData("KPI", kpi.kpi_id, e);
                                      }}
                                    ></textarea>
                                  </div>
                                ) : (
                                  <>{kpi.kpi_desc}</>
                                )}
                              </td>
                              <td
                                valign="top"
                                className={classNames(
                                  "w-full md:w-1/3 p-1 text-center",
                                  !edit
                                    ? "border border-mid-gray"
                                    : "border-b border-mid-gray"
                                )}
                              >
                                {edit ? (
                                  <div className="flex items-center justify-center gap-2">
                                    {`${kpiIndex + 1} Weight:`}
                                    <input
                                      type="number"
                                      className="max-w-[50px] text-center resize-y p-2 rounded-md"
                                      value={
                                        tableData.filter(
                                          (item) => item.kpi_id === kpi.kpi_id
                                        )[0].kpi_weight
                                      }
                                      min={0}
                                      onChange={(e) => {
                                        if (e.target.value < 0) return;
                                        updateData("KPI Weight", kpi.kpi_id, e);
                                      }}
                                    />
                                    %
                                  </div>
                                ) : (
                                  <>{kpi.kpi_weight}</>
                                )}
                              </td>
                              <td
                                className={classNames(
                                  "w-full md:w-1/3 p-1 text-center",
                                  !edit
                                    ? "border border-mid-gray"
                                    : "border-b border-mid-gray"
                                )}
                              >
                                {uniqueMetrics.map((metrics) => {
                                  return (
                                    <>
                                      {edit ? (
                                        <div className="flex items-center gap-2 space-y-1">
                                          <span>
                                            {metrics.target_metrics_score}
                                          </span>
                                          <span>-</span>
                                          <textarea
                                            className="w-full resize-y bg-white p-2 rounded-md min-h-[60px]"
                                            value={metrics.target_metrics_desc}
                                            onChange={(e) => {
                                              updateData(
                                                "target metrics",
                                                metrics.target_metrics_id,
                                                e
                                              );
                                            }}
                                          ></textarea>
                                        </div>
                                      ) : (
                                        <>
                                          <div>
                                            <span>
                                              {metrics.target_metrics_score}
                                            </span>
                                            <span>-</span>
                                            <span>
                                              {metrics.target_metrics_desc}
                                            </span>
                                          </div>
                                        </>
                                      )}
                                    </>
                                  );
                                })}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </>
                );
              })}
            </div>
          );
        })}
      </div>
      {edit && (
        <button
          onClick={() => handleContinue()}
          className=" bg-un-blue-light text-white mt-2 py-1 px-3 rounded-md float-right"
        >
          Save
        </button>
      )}
    </div>
  );
}
