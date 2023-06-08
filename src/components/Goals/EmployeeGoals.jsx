import React, { useEffect, useState } from "react";
import { GrFormSearch } from "react-icons/gr";
import { useFunction } from "../../context/FunctionContext";
import axios from "axios";

export default function EmployeeGoals({ pillars = [] }) {
  const { removeSubText } = useFunction();
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

  const DataTable = ({ data }) => {
    const mergedData = {};

    data.forEach((item) => {
      const userKey = item.users_id;
      if (!mergedData[userKey]) {
        mergedData[userKey] = {
          users_id: item.users_id,
          full_name: item.full_name,
          pillar_id_1:
            item.pillar_id === 1 && item.is_in_eval_form
              ? item.pillar_percentage
              : "-",
          pillar_id_2:
            item.pillar_id === 2 && item.is_in_eval_form
              ? item.pillar_percentage
              : "-",
          pillar_id_3:
            item.pillar_id === 3 && item.is_in_eval_form
              ? item.pillar_percentage
              : "-",
          pillar_id_4:
            item.pillar_id === 4 && item.is_in_eval_form
              ? item.pillar_percentage
              : "-",
        };
      } else {
        const existingUser = mergedData[userKey];
        existingUser.pillar_id_1 =
          existingUser.pillar_id_1 === "-" &&
          item.pillar_id === 1 &&
          item.is_in_eval_form
            ? item.pillar_percentage
            : existingUser.pillar_id_1;
        existingUser.pillar_id_2 =
          existingUser.pillar_id_2 === "-" &&
          item.pillar_id === 2 &&
          item.is_in_eval_form
            ? item.pillar_percentage
            : existingUser.pillar_id_2;
        existingUser.pillar_id_3 =
          existingUser.pillar_id_3 === "-" &&
          item.pillar_id === 3 &&
          item.is_in_eval_form
            ? item.pillar_percentage
            : existingUser.pillar_id_3;
        existingUser.pillar_id_4 =
          existingUser.pillar_id_4 === "-" &&
          item.pillar_id === 4 &&
          item.is_in_eval_form
            ? item.pillar_percentage
            : existingUser.pillar_id_4;
      }
    });

    const mergedDataArray = Object.values(mergedData);

    return (
      <table className="w-full rounded-md overflow-hidden">
        <thead className="bg-un-blue-light">
          <tr>
            <td align="center" className="p-2 text-white">Name</td>
            {pillars.map((pillar) => {
              return (
                <td  align="center" className="whitespace-nowrap p-2 text-white">
                  {removeSubText(pillar.pillar_name)}
                </td>
              );
            })}
            <td  align="center" className="p-2 text-white">Actions</td>
          </tr>
        </thead>
        <tbody>
          {mergedDataArray.map((item) => (
            <tr key={item.full_name}>
              <td align="center">{item.full_name}</td>
              <td align="center">{item.pillar_id_1 !== '-' ? item.pillar_id_1 + '%' : item.pillar_id_1}</td>
              <td align="center">{item.pillar_id_2 !== '-' ? item.pillar_id_2 + '%' : item.pillar_id_2}</td>
              <td align="center">{item.pillar_id_3 !== '-' ? item.pillar_id_3 + '%' : item.pillar_id_3}</td>
              <td align="center">{item.pillar_id_4 !== '-' ? item.pillar_id_4 + '%' : item.pillar_id_4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
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
        <div className="w-full overflow-x-scroll rounded-md">
          <DataTable data={employees} />
        </div>
      </div>
    </>
  );
}
