import React from "react";
import data from "../misc/unmg_kpi_sample.json";
import { Overview } from "../components";
import {
  Bar,
  BarChart,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Graph from "../components/Graph";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

export default function DashboardOverview() {
  const onPerformanceStatusClick = (e) => {
    const employeeFilter = e;
    console.log(employeeFilter);
    // sessionStorage.setItem("employeeFilter", employeeFilter);
    // navigate("/employees");
  };

  return (
    <>
      {/* overview */}
      <Overview />
      <div className=" bg-default m-2 grid gap-2 md:grid-cols-2 lg:grid-cols-6 lg:ml-[18rem] lg:mr-6 xl:ml-[24.5rem] xl:mr-32">
        {/* HEADER */}
        <Graph
          title="Performance Evaluation Status"
          className="md:col-[1/3] lg:col-[1/5]"
          chartHeight={275}
          chart={
            <BarChart
              onClick={(e) => onPerformanceStatusClick(e)}
              data={[
                {
                  name: "Not Yet Started",
                  [`Regular Employees`]: 150,
                  [`Probationary Employees`]: 30,
                },
                {
                  name: "Approved Metrics",
                  [`Regular Employees`]: 64,
                  [`Probationary Employees`]: 24,
                },
                {
                  name: "Awaiting Evaluation",
                  [`Regular Employees`]: 45,
                  [`Probationary Employees`]: 15,
                },
                {
                  name: "Approved Evaluation",
                  [`Regular Employees`]: 30,
                  [`Probationary Employees`]: 10,
                },
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Regular Employees" fill="#306088" />
              <Bar dataKey="Probationary Employees" fill="#d43953" />
            </BarChart>
          }
        />
        <Graph
          title="Employees by Contract"
          className="md:col-[1/2] lg:col-[1/3]"
          chartHeight={275}
          chart={
            <PieChart>
              <Tooltip />
              <Pie
                onClick={(e) => onPerformanceStatusClick(e)}
                className="outline-none"
                data={[
                  {
                    name: "Regular",
                    value: 219,
                    fill: "#306088",
                  },
                  {
                    name: "Probationary",
                    value: 38,
                    fill: "#d22735",
                  },
                  {
                    name: "Project Based",
                    value: 25,
                    fill: "#b4d3fd",
                  },
                  {
                    name: "Consultant",
                    value: 18,
                    fill: "#FDB4B4",
                  },
                ]}
                dataKey="value"
                nameKey="name"
                label={true}
                outerRadius={80}
                fill="#fff"
              />
              <Legend />
            </PieChart>
          }
        />
        <Graph
          title="For Consultation"
          className="md:col-[2/3] lg:col-[3/5]"
          chartHeight={275}
          chart={
            <PieChart>
              <Tooltip />
              <Pie
                className="outline-none"
                data={[
                  {
                    name: "Goal Setting",
                    value: 27,
                    fill: "#306088",
                  },
                  {
                    name: "Annual Evaluation",
                    value: 12,
                    fill: "#d22735",
                  },
                  {
                    name: "Third Month Evaluation",
                    value: 19,
                    fill: "#b4d3fd",
                  },
                ]}
                dataKey="value"
                nameKey="name"
                label={true}
                outerRadius={80}
                fill="#fff"
              />
              <Legend />
            </PieChart>
          }
        />
        <Graph
          title="Performance Evaluation Ranking"
          className="md:col-[1/3] lg:col-[5/7] lg:row-[1/3]"
          table
          chart={
            <>
              <div className="h-[600px] overflow-y-auto rounded-md shadow-md">
                <table className="w-full">
                  <thead>
                    <tr className="bg-un-blue-light text-white sticky top-0 shadow-md">
                      <th>Employee</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data
                      .sort((a, b) => b.grade - a.grade)
                      .map((employee, index) => {
                        return (
                          <tr key={index} className="hover:bg-default">
                            <td className="p-2">{employee.name}</td>
                            <td align="center">
                              <div
                                className={classNames(
                                  "w-3/4 p-1 rounded-md font-semibold",
                                  employee.grade <= 4.0 &&
                                    employee.grade >= 3.26
                                    ? "bg-un-green-light text-un-green-dark"
                                    : employee.grade <= 3.25 &&
                                      employee.grade >= 2.51
                                    ? "bg-un-yellow-light text-un-yellow-dark"
                                    : employee.grade <= 2.5 &&
                                      employee.grade >= 1.76
                                    ? "bg-un-orange-light text-un-orange-dark"
                                    : "bg-un-red-light-1 text-un-red-dark"
                                )}
                              >
                                {employee.grade}
                                {console.log()}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </>
          }
        />
      </div>
    </>
  );
}
