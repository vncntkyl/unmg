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
  const [workYear, setKpiDuration] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { kpiDurations, currentUser } = useAuth();
  const [goals, setGoals] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [ranking, setRanking] = useState([]);
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
    const fetchDashboardGoals = async () => {
      try {
        const response = await axios.get(url.fetchDashboardData, {
          params: {
            compute_goals: true,
            workYear: workYear,
          },
        });
        setGoals(response.data);
      }
      catch (e) {
        console.log(e.message);
      }
    };

    const fetchDashboardEvaluations = async () => {
      try {
        const response = await axios.get(url.fetchDashboardData, {
          params: {
            compute_evaluations: true,
            workYear: workYear,
          },
        });
        setEvaluations(response.data);
      }
      catch (e) {
        console.log(e.message);
      }
    };

    const fetchDashboardRanking = async () => {
      try {
        const response = await axios.get(url.fetchDashboardData, {
          params: {
            compute_ranking: true,
            workYear: workYear,
          },
        });
        setRanking(response.data);
      }
      catch (e) {
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
    fetchDashboardGoals();
    fetchDashboardEvaluations();
    fetchDashboardRanking();
    fetchUsers();
    setLoading(false);
  }, [workYear]);
  const userType = JSON.parse(currentUser).user_type;
  return !loading ? (
    <>
      {/* overview */}
      <section className="relative">
        <div className={classNames("w-full min-h-[175px]", userType <= 2 ? "bg-un-blue" : userType >= 3 && userType <= 5 ? "bg-un-red-dark-1" : "bg-dark-gray")} />
        <div className="absolute top-0 left-0 w-full grid gap-2 md:grid-cols-2 lg:grid-cols-6  px-4 lg:pl-[18rem] xl:pl-[18.5rem] xl:pr-[1.5rem]">
          <div className="md:col-[1/3] lg:col-[1/7] lg:row-[1/2] grid grid-cols-3">
            <Graph
              title="Performance Evaluation Status (Regular)"
              className="rounded-l-md"
              chartHeight={375}
              chart={
                <BarChart
                  onClick={(e) => onPerformanceStatusClick(e)}
                  data={[
                    {
                      name: "Goal",
                      [`No of Regular Employees`]: goals.regular,
                      [`Awaiting Submission`]: goals.waiting_regular,
                      [`Submitted`]: goals.submitted_regular,
                      [`Approved`]: goals.approved_regular,
                    },

                  ]}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="No of Regular Employees" fill="#306088" />
                  <Bar dataKey="Awaiting Submission" fill="#d22735" />
                  <Bar dataKey="Submitted" fill="#ed9036" />
                  <Bar dataKey="Approved" fill="#2da947" />
                </BarChart>
              }

            />
            <Graph
              className="rounded-r-md col-span-2"
              chartHeight={375}
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
                      name: "No of Regular Employees",
                      [`Regular Employees`]: evaluations.regular,
                    },
                    {
                      name: "First Quarter",
                      [`Awaiting Submission`]: evaluations.waiting_first_quarter_regular,
                      [`Submitted`]: evaluations.first_quarter_regular,
                    },
                    {
                      name: "Mid Year",
                      [`Awaiting Submission`]: evaluations.waiting_mid_year_regular,
                      [`Submitted`]: evaluations.mid_year_regular,
                      [`Approved`]: evaluations.rate_myr_regular,
                    },
                    {
                      name: "Third Quarter",
                      [`Awaiting Submission`]: evaluations.waiting_third_quarter_regular,
                      [`Submitted`]: evaluations.third_quarter_regular,
                    },
                    {
                      name: "Year End",
                      [`Awaiting Submission`]: evaluations.waiting_year_end_regular,
                      [`Submitted`]: evaluations.year_end_regular,
                      [`Approved`]: evaluations.rate_yee_regular,
                      [`Signoff`]: evaluations.finish_yee_regular,
                    },
                  ]}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Regular Employees" fill="#306088" />
                  <Bar dataKey="Awaiting Submission" fill="#d22735" />
                  <Bar dataKey="Submitted" fill="#ed9036" />
                  <Bar dataKey="Approved" fill="#2da947" />
                  <Bar dataKey="Signoff" fill="#198065" />
                </BarChart>
              }

            />


          </div>
          <div className="md:col-[1/3] lg:col-[1/5] lg:row-[2/3] h-fit grid grid-cols-3">
            <Graph
              title={"Performance Evaluation Status (Probationary)"}
              className="rounded-l-md"
              chartHeight={375}
              chart={
                <BarChart
                  onClick={(e) => onPerformanceStatusClick(e)}
                  data={[
                    {
                      name: "Goal",
                      [`No of Probationary Employees`]: goals.probationary,
                      [`Awaiting Submission`]: goals.waiting_probationary,
                      [`Submitted`]: goals.submitted_probationary,
                      [`Approved`]: goals.approved_probationary,
                    },

                  ]}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="No of Probationary Employees" fill="#306088" />
                  <Bar dataKey="Awaiting Submission" fill="#d22735" />
                  <Bar dataKey="Submitted" fill="#ed9036" />
                  <Bar dataKey="Approved" fill="#2da947" />
                </BarChart>

              }
            />
            <Graph
              className="rounded-r-md col-span-2 pt-10"
              chartHeight={375}
              chart={
                <BarChart
                  onClick={(e) => onPerformanceStatusClick(e)}
                  data={[
                    {
                      name: "No of Regular Employees",
                      [`Regular Employees`]: evaluations.probationary,
                    },
                    {
                      name: "First Quarter",
                      [`Awaiting Submission`]: evaluations.waiting_first_quarter_probationary,
                      [`Submitted`]: evaluations.first_quarter_probationary,
                    },
                    {
                      name: "Mid Year",
                      [`Awaiting Submission`]: evaluations.waiting_mid_year_probationary,
                      [`Submitted`]: evaluations.mid_year_probationary,
                      [`Approved`]: evaluations.rate_myr_probationary,
                    },
                    {
                      name: "Third Quarter",
                      [`Awaiting Submission`]: evaluations.waiting_third_quarter_probationary,
                      [`Submitted`]: evaluations.third_quarter_probationary,
                    },
                    {
                      name: "Year End",
                      [`Awaiting Submission`]: evaluations.waiting_year_end_probationary,
                      [`Submitted`]: evaluations.year_end_probationary,
                      [`Approved`]: evaluations.rate_yee_probationary,
                      [`Signoff`]: evaluations.finish_yee_probationary,
                    },
                  ]}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Regular Employees" fill="#306088" />
                  <Bar dataKey="Awaiting Submission" fill="#d22735" />
                  <Bar dataKey="Submitted" fill="#ed9036" />
                  <Bar dataKey="Approved" fill="#2da947" />
                  <Bar dataKey="Signoff" fill="#198065" />
                </BarChart>
              }
            />
          </div>
          <Graph
            title="Performance Evaluation Ranking"
            className="md:col-[1/3] lg:col-[5/7] lg:row-[2/3] rounded-md col-span-2"
            table
            chart={
              <>
                <div className="h-[375px] overflow-y-auto rounded-md shadow-md">
                  {ranking != [] && (
                    <table className="w-full">
                      <thead>
                        <tr className="bg-un-blue-light text-white sticky top-0 shadow-md">
                          <th>Employee</th>
                          <th>Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ranking
                          .sort((a, b) => b.grade - a.grade)
                          .map((employee, index) => {
                            return (
                              <tr key={index} className="hover:bg-default">
                                <td className="p-2">{employee.full_name}</td>
                                <td align="center">
                                  <div
                                    className={classNames(
                                      "w-3/4 p-1 rounded-md font-semibold",
                                      employee.grade <= 4.0 && employee.grade >= 3.26 ? "bg-un-green-light text-un-green-dark" 
                                      : employee.grade <= 3.25 && employee.grade >= 2.51 ? "bg-un-green-light text-un-green-dark"
                                      : employee.grade <= 2.5 && employee.grade >= 1.76 ? "bg-un-yellow-light text-un-yellow-dark"
                                      : employee.grade <= 1.75 && employee.grade >= 1.0 ? "bg-un-red-light-1 text-un-red-dark"
                                      : ""
                                    )}
                                  >
                                    {employee.grade ? employee.grade : "-"}
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
      </section>
    </>
  ) : (
    <>Loading...</>
  );
}
