import React, { useEffect, useState } from "react";

export default function GoalTable({ data, current }) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    let previousObjective = "";
    let previousKpi = "";

    const updatedTableData = data
      .filter((pillar) => pillar.pillar_id == current)
      .map((item) => {
        const isFirstObjective = item.objective !== previousObjective;
        const isFirstKpi = item.kpi_desc !== previousKpi;

        previousObjective = item.objective;
        previousKpi = item.kpi_desc;

        return {
          ...item,
          isFirstObjective,
          isFirstKpi,
        };
      });

    setTableData(updatedTableData);
  }, [data, current]);

  return (
    <div className="w-full overflow-x-scroll lg:overflow-auto bg-white rounded-md">
      <table className="rounded-md overflow-hidden">
        <thead>
          <tr className="bg-un-blue-light text-white border border-un-blue-light">
            <th className="w-full md:w-1/4 p-1 text-center ">Objective</th>
            <th className="w-full md:w-1/4 p-1 text-center ">KPI</th>
            <th className="w-full md:w-1/4 p-1 text-center ">Weight</th>
            <th className="w-full md:w-1/4 p-1 text-center ">Target Metrics</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              {item.isFirstObjective && (
                <td
                  valign="top"
                  align="center"
                  className="p-2 border border-mid-gray"
                  rowSpan={
                    tableData.filter((i) => i.objective === item.objective)
                      .length
                  }
                >
                  {item.objective}
                </td>
              )}
              {item.isFirstKpi && (
                <>
                  <td
                    valign="top"
                    align="center"
                    className="p-2 border border-mid-gray"
                    rowSpan={
                      tableData.filter((i) => i.kpi_desc === item.kpi_desc)
                        .length
                    }
                  >
                    {item.kpi_desc}
                  </td>
                  <td
                    valign="top"
                    align="center"
                    className="p-2 border border-mid-gray"
                    rowSpan={
                      tableData.filter((i) => i.kpi_desc === item.kpi_desc)
                        .length
                    }
                  >
                    {item.kpi_weight}%
                  </td>
                </>
              )}
              <td className="w-1/4 py-1 border border-mid-gray">
                <div className="flex gap-1 text-[.9rem]">
                  <span>{item.target_metrics_score}</span>
                  <span>-</span>
                  <span>{item.target_metrics_desc}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
