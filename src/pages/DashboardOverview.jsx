import React, { useEffect, useState } from "react";
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
import classNames from "classnames";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { format } from "date-fns";
import { developmentAPIs as url } from "../context/apiList";

export default function DashboardOverview() {
  const [performanceData, setPerformanceData] = useState([]);
  const [employeeCount, setEmployeeCount] = useState([]);
  const [workYear, setKpiDuration] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { kpiDurations } = useAuth();

  const onPerformanceStatusClick = (e) => {
    const employeeFilter = e.activeLabel;
    switch (employeeFilter) {
      case "Awaiting Submission":
        localStorage.setItem("goalstatus", 3);
        localStorage.setItem("work_year", workYear);
        navigate("/main_goals");
        break;
      case "Pending Approval":
        localStorage.setItem("goalstatus", 2);
        localStorage.setItem("work_year", workYear);
        navigate("/main_goals");
        break;
      case "Awaiting Evaluation":
        // localStorage.setItem("goalstatus", 3);
        // navigate("/main_goals");
        break;
      case "Approved Evaluation":
        // localStorage.setItem("goalstatus", 3);
        // navigate("/main_goals");
        break;
    }
  };

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(url.getEmployeeGoals, {
          params: {
            employee_goals: true,
            count: true,
            work_year: workYear,
          },
        });
        setPerformanceData(response.data);
      } catch (e) {
        console.log(e.message);
      }
    };
    const countUsers = async () => {
      try {
        const response = await axios.get(url.retrieveUsers, {
          params: {
            count_employees: true,
          },
        });
        setEmployeeCount(response.data);
      } catch (e) {
        console.log(e.message);
      }
    };
    const fetchUsers = async () => {
      try {
        const response = await axios.get(url.retrieveUsers, {
          params: {
            get_grades: true,
          },
        });
        setData(response.data);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchGoals();
    countUsers();
    fetchUsers();
    setLoading(false);
  }, []);
  return !loading ? (
    <>
      {/* overview */}
      <Overview />
      <div className=" bg-default m-2 grid gap-2 md:grid-cols-2 lg:grid-cols-6 lg:ml-[18rem] lg:mr-6 xl:ml-[24.5rem] xl:mr-32">
        {/* HEADER */}
        <Graph
          title="Performance Evaluation Status"
          className="md:col-[1/3] lg:col-[1/5]"
          chartHeight={275}
          dropdown={
            <div className="flex flex-row gap-2 items-center">
              <label htmlFor="workyear" className="font-semibold">
                Select Work Year:
              </label>
              <select
                id="workyear"
                className="bg-default rounded-md p-1 px-2"
                onChange={(e) => {
                  setKpiDuration(parseInt(e.target.value));
                }}
              >
                <option value="-1" disabled selected={workYear === -1}>
                  --Select Year--
                </option>
                {kpiDurations.length > 0 &&
                  kpiDurations.map((year) => {
                    return (
                      <option
                        value={year.kpi_year_duration_id}
                        selected={year.kpi_year_duration_id === workYear}
                      >
                        {format(new Date(year.from_date), "MMM d, yyyy") +
                          " - " +
                          format(new Date(year.to_date), "MMM d, yyyy")}
                      </option>
                    );
                  })}
              </select>
            </div>
          }
          chart={
            <BarChart
              onClick={(e) => onPerformanceStatusClick(e)}
              data={[
                {
                  name: "Awaiting Submission",
                  [`Regular Employees`]: performanceData.waiting_regular,
                  [`Probationary Employees`]:
                    performanceData.waiting_probationary,
                },
                {
                  name: "Pending Approval",
                  [`Regular Employees`]: performanceData.pending_regular,
                  [`Probationary Employees`]:
                    performanceData.pending_probationary,
                },
                {
                  name: "Awaiting Evaluation",
                  [`Regular Employees`]: performanceData.pending_regular,
                  [`Probationary Employees`]:
                    performanceData.pending_probationary,
                },
                {
                  name: "Approved Evaluation",
                  [`Regular Employees`]: performanceData.pending_regular,
                  [`Probationary Employees`]:
                    performanceData.pending_probationary,
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
                    value: employeeCount.regular,
                    fill: "#306088",
                  },
                  {
                    name: "Probationary",
                    value: employeeCount.probationary,
                    fill: "#d22735",
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
                    value: 0,
                    fill: "#306088",
                  },
                  {
                    name: "Annual Evaluation",
                    value: 0,
                    fill: "#d22735",
                  },
                  {
                    name: "Third Month Evaluation",
                    value: 0,
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
                {data !== [] && (
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
                )}
              </div>
            </>
          }
        />
      </div>
    </>
  ) : (
    <>Loading...</>
  );
}
