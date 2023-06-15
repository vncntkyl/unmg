import React, { useEffect, useState } from "react";
import JSONCheck from "../../misc/JSONCheck";
import axios from "axios";
import classNames from "classnames";

export default function GoalTable({
  tableData,
  current,
  edit,
  updateData,
  saveData,
}) {
  return (
    <>
      <div className="w-full overflow-x-scroll lg:overflow-x-auto rounded-md">
        <div className="hidden lg:flex flex-row items-center gap-2 py-2">
          <p className="font-semibold">Pillar Percentage: </p>
          {edit ? (
            <>
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
            </>
          ) : (
            <span>
              {
                tableData.filter((pillar) => pillar.pillar_id == current)[0]
                  .pillar_percentage
              }
              %
            </span>
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
                            value={item.objective}
                            onChange={(e) => {
                              updateData("objective", item.pillar_id, e);
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
                          className="w-full resize-y bg-default p-2 rounded-md"
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
      <button onClick={() => saveData()}>Save</button>
    </>
  );
}
