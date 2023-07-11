import React, { useEffect, useState } from "react";
import { GrFormSearch } from "react-icons/gr";
import axios from "axios";
import DataTable from "./DataTable";
import { useFunction } from "../../context/FunctionContext";
import { useAuth } from "../../context/authContext";

export default function EmployeeGoals({ pillars = [] }) {
  const [employees, setEmployees] = useState([]);
  const [loading, toggleLoading] = useState(true);
  const [approvalStatus, setStatus] = useState(0);
  const [type, setType] = useState("all");
  const { capitalize } = useFunction();
  const { currentUser } = useAuth();
  const statusList = ["Approved", "Pending Approval", "Awaiting Submission"];

  useEffect(() => {
    const fetchUsers = async () => {
      let url = "http://localhost/unmg_pms/api/getEmployeeGoals.php";
      //let url = "../api/retrieveUsers.php";
      const parameters = {
        params: {
          employee_goals: true,
        },
      };
      if (JSON.parse(currentUser).user_type != 6) {
        parameters.params.evaluator = JSON.parse(currentUser).employee_id;
      }

      console.log(parameters);
      try {
        const response = await axios.get(url, parameters);
        setEmployees(response.data);
        // console.log(response.data);
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
  }, []);

  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="bg-default p-2 flex flex-col gap-2">
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex flex-col gap-2">
            <div className="w-full flex flex-row items-center gap-2">
              <span>Status: </span>
              <select
                className="w-full rounded-md md:w-[unset] h-full"
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
                className="w-full rounded-md md:w-[unset] h-full"
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
          <div className="flex flex-row items-center gap-2 p-1 bg-white rounded-md md:w-[50%] ml-auto">
            <GrFormSearch className="text-[1.3rem]" />
            <input
              type="text"
              placeholder="Search employee... (Atleast 3 characters)"
              className="w-full outline-none bg-transparent placeholder:text-[.9rem] placeholder:md:text-[1rem]"
            />
          </div>
        </div>
        <div className="w-full rounded-md max-h-[60vh]">
          <DataTable
            data={employees}
            pillars={pillars}
            statusIdx={approvalStatus}
            statusList={statusList}
            usertype={type}
          />
        </div>
      </div>
    </>
  );
}
