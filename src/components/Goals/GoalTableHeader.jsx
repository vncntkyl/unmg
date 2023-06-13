import React, { useEffect, useState } from "react";
import JSONCheck from "../../misc/JSONCheck";
import axios from "axios";

export default function GoalTable({tableData, current, edit, updateData, saveData }) {


  return (
    <>
      <div className="w-full overflow-x-scroll lg:overflow-x-auto bg-white rounded-md">
        <table className="rounded-md w-full overflow-hidden">
          <thead>
            <tr className="bg-un-blue-light text-white border border-un-blue-light">
              <th className="w-full md:w-1/4 p-1 text-center ">Objective</th>
              <th className="w-full md:w-1/4 p-1 text-center ">KPI</th>
              <th className="w-full md:w-1/4 p-1 text-center ">Weight</th>
              <th className="w-full md:w-1/4 p-1 text-center ">
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
                      className="p-2 border border-mid-gray"
                      rowSpan={
                        tableData
                          .filter((pillar) => pillar.pillar_id == current)
                          .filter((i) => i.objective === item.objective).length
                      }
                    >
                      <div className="w-full">
                        {edit ? (
                          <textarea
                            className="w-full resize-y bg-default p-2 rounded-md h-[500px]"
                            rows={10}
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
                        className="p-2 border border-mid-gray"
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
                        className="p-2 border border-mid-gray"
                        rowSpan={
                          tableData
                            .filter((pillar) => pillar.pillar_id == current)
                            .filter((i) => i.kpi_desc === item.kpi_desc).length
                        }
                      >
                        {edit ? (
                          <input
                            type="number"
                            className="w-fit text-center resize-y bg-default p-2 rounded-md"
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
                  <td className="w-1/4 py-1 border border-mid-gray">
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
