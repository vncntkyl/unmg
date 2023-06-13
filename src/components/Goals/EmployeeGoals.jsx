import React, { useEffect, useState } from "react";
import { GrFormSearch } from "react-icons/gr";
import axios from "axios";
import DataTable from "./DataTable";

export default function EmployeeGoals({ pillars = [] }) {
  const [employees, setEmployees] = useState([]);
  const [loading, toggleLoading] = useState(true);
  const [approvalStatus, setStatus] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      let url = "http://localhost/unmg_pms/api/getEmployeeGoals.php";
      //let url = "../api/retrieveUsers.php";
      try {
        const response = await axios.get(url, {
          params: {
            employee_goals: true,
          },
        });
        setEmployees(response.data);
        toggleLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchUsers();
  }, []);

  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="bg-default p-2 flex flex-col gap-2">
        <div className="flex flex-col gap-2 md:flex-row-reverse">
          <div className="flex flex-row items-center gap-2 p-1 bg-white rounded-md md:w-full">
            <GrFormSearch className="text-[1.3rem]" />
            <input
              type="text"
              placeholder="Search employee... (Atleast 3 characters)"
              // onChange={(e) => {
              //   if (e.target.value.length < 3) {
              //     setQuery("");
              //   } else {
              //     setQuery(e.target.value);
              //   }
              // }}
              className="w-full outline-none bg-transparent placeholder:text-[.9rem] placeholder:md:text-[1rem]"
            />
          </div>
          <div className="w-full flex flex-row items-center gap-2">
            <span>Status: </span>
            <select className="w-full rounded-md md:w-[unset] h-full">
              {["Approved", "Pending Approval", "Awaiting Submission"].map(
                (status, index) => {
                  return (
                    <>
                      <option value={index} key={index}>
                        {status}
                      </option>
                    </>
                  );
                }
              )}
            </select>
          </div>
        </div>
        <div className="w-full overflow-auto rounded-md">
          <DataTable data={employees} pillars={pillars} />
        </div>
      </div>
    </>
  );
}
