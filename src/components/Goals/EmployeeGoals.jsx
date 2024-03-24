import React, { useEffect, useState } from "react";
import { GrFormSearch } from "react-icons/gr";
import axios from "axios";
import DataTable from "./DataTable";
import { useFunction } from "../../context/FunctionContext";
import { useAuth } from "../../context/authContext";
import { developmentAPIs as url } from "../../context/apiList";
import WorkYear from "../../misc/WorkYear";

export default function EmployeeGoals({
  user_id,
  employee_id,
  userType,
  pillars,
  workYear,
  setWorkYear,
}) {
  const [employees, setEmployees] = useState([]);
  const [loading, toggleLoading] = useState(true);
  const [approvalStatus, setApprovalStatus] = useState(0);
  const [type, setType] = useState("all");
  const { capitalize } = useFunction();
  const statusList = ["Approved", "Pending Approval", "Awaiting Submission"];
  const fetchUsers = async () => {
    const parameters = {
      params: {
        employee_goals: true,
        work_year: workYear,
        evaluator: userType != 6 && userType != 1 ? employee_id : "",
        admin: userType <= 2 ? true : false,
      },
    };
    try {
      const response = await axios.get(url.getEmployeeGoals, parameters);
      setEmployees(response.data);
      toggleLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUsers();
        toggleLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchData();
    const intervalID = setInterval(fetchData, 5000);
    return () => clearInterval(intervalID);
  }, [workYear]);

  useEffect(() => {
    if (localStorage.getItem("usertype")) {
      setType(localStorage.getItem("usertype"));
    }
    if (localStorage.getItem("goalstatus")) {
      setApprovalStatus(parseInt(localStorage.getItem("goalstatus")));
    }
  }, []);
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
                onChange={(e) => setApprovalStatus(parseInt(e.target.value))}
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
            <WorkYear workYear={workYear} setWorkYear={setWorkYear} />
          </div>
        </div>
        {workYear === -1 ? (
          <div className="font-semibold text-dark-gray bg-white rounded-md p-2 flex flex-col gap-2 items-center text-center">
            <span>Please select a work year to show your goals.</span>
          </div>
        ) : (
          <div className="w-full rounded-md max-h-[60vh]">
            <DataTable
              user_id={user_id}
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
