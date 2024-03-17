import React, { useEffect, useState } from "react";
import { GrFormSearch } from "react-icons/gr";
import axios from "axios";
import DataTable from "../Goals/DataTable";
import { useFunction } from "../../context/FunctionContext";
import { useAuth } from "../../context/authContext";
import { format } from "date-fns";
import { developmentAPIs as url } from "../../context/apiList";

export default function EmployeeGoals({
  pillars = [],
  workYear,
  setKpiDuration,
}) {
  const [employees, setEmployees] = useState([]);
  const [loading, toggleLoading] = useState(true);
  const [approvalStatus, setStatus] = useState(0);
  const [type, setType] = useState("all");
  const { capitalize } = useFunction();
  const { currentUser, kpiDurations } = useAuth();
  const statusList = ["Approved", "Pending Approval", "Awaiting Submission"];

  useEffect(() => {
    const fetchUsers = async () => {
      const parameters = {
        params: {
          employee_goals: true,
          work_year: workYear,
        },
      };
      if (
        JSON.parse(currentUser).user_type != 6 &&
        JSON.parse(currentUser).users_id != 1
      ) {
        parameters.params.evaluator = JSON.parse(currentUser).employee_id;
      }

      try {
        const response = await axios.get(url.getEmployeeGoals, parameters);
        setEmployees(response.data);
        console.log(response.data);
        toggleLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    if (localStorage.getItem("usertype")) {
      setType(localStorage.getItem("usertype"));
      localStorage.removeItem("usertype");
    }
    if (localStorage.getItem("goalstatus")) {
      setStatus(parseInt(localStorage.getItem("goalstatus")));
      localStorage.removeItem("goalstatus");
    }
    fetchUsers();
  }, [workYear]);

  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="bg-default p-2 flex flex-col gap-2">
        <div className="flex flex-col gap-2 md:flex-row justify-between">
          <div className="flex flex-col gap-2">
            <div className="w-full flex flex-row items-center gap-2">
              <span>Status: </span>
              <select
                className="w-full rounded-md md:w-[unset] h-full p-1 px-2"
                value={approvalStatus}
                onChange={(e) => setStatus(parseInt(e.target.value))}
              >
                <option value="0" selected>
                  All
                </option>
                {statusList.map((status, index) => {
                  return (
                    <option value={index + 1} key={index}>
                      {status}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-full flex flex-row items-center gap-2">
              <span className="whitespace-nowrap">Employee Type: </span>
              <select
                className="w-full rounded-md md:w-[unset] h-full p-1 px-2"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                {["all", "regular", "probationary"].map((user_type) => {
                  return (
                    <option value={user_type} key={user_type}>
                      {capitalize(user_type)}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2 p-1 bg-white rounded-md">
              <GrFormSearch className="text-[1.3rem]" />
              <input
                type="text"
                placeholder="Search employee... (Atleast 3 characters)"
                className="w-full outline-none bg-transparent placeholder:text-[.9rem] placeholder:md:text-[1rem]"
              />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <label htmlFor="workyear"> Select Work Year:</label>
              <select
                id="workyear"
                className="bg-white rounded-md p-1 px-2"
                onChange={(e) => {
                  localStorage.setItem("work_year", parseInt(e.target.value));
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
          </div>
        </div>
        {workYear === -1 ? (
          <div className="font-semibold text-dark-gray bg-white rounded-md p-2 flex flex-col gap-2 items-center text-center">
            <span>Please select a work year to show your goals.</span>
          </div>
        ) : (
          <div className="w-full rounded-md max-h-[60vh]">
            <DataTable
              data={employees}
              pillars={pillars}
              statusIdx={approvalStatus}
              statusList={statusList}
              usertype={type}
              workYear={workYear}
            />
          </div>
        )}
      </div>
    </>
  );
}
