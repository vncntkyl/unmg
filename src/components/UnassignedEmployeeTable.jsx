import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import RoleRow from "./Roles/RoleRow";
import { GrFormSearch } from "react-icons/gr";
import { useFunction } from "../context/FunctionContext";
import { developmentAPIs as url } from "../context/apiList";

export default function UnassignedEmployeeTable({ toggleModal, setEmployee, setMembers, members }) {
  const { companyList, departmentList } = useAuth();
  const { getPath } = useFunction();

  const [employeeList, setEmployeeList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [query, setQuery] = useState("");
  const [visibility, setVisibility] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(url.retrieveUsers, {
          params: {
            users: "regular",
          },
        });
        setEmployeeList(response.data.filter((d) => d.user_type == 0));
        setVisibility(
          response.data
            .filter((d) => d.user_type == 0)
            .map((d) => {
              return {
                users_id: d.users_id,
                modal: false,
              };
            })
        );

        setLoader(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchUsers();
  }, []);
  return (
    <>
      <div className="p-2 flex flex-col gap-2 rounded-lg bg-default">
        <div className="grid grid-cols-2 gap-2 items-center">
          <div>{getPath() === "/roles/add" && "Add Members"}</div>
          {/* SEARCH */}
          <div className="col-[1/3] row-[3/4] xs:row-[2/3] sm:col-[1/3] lg:col-[4/6] lg:row-[1/2] flex flex-row items-center gap-2 p-1 bg-white rounded-md">
            <label htmlFor="search">
              <GrFormSearch className="text-[1.3rem]" />
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search employee... (Atleast 3 characters)"
              onChange={(e) => {
                if (e.target.value.length < 3) {
                  setQuery("");
                } else {
                  setQuery(e.target.value);
                }
              }}
              className="w-full lg:min-w-[350px] outline-none bg-transparent placeholder:text-[.9rem] placeholder:md:text-[1rem]"
            />
          </div>
        </div>
        <div className="min-w-full max-h-[400px] shadow-md rounded-md bg-white overflow-x-auto mt-1">
          <table className="w-full">
            <thead>
              <tr className="sticky top-0 bg-un-blue-light text-white z-[22]">
                <th className="whitespace-nowrap font-normal p-1 "></th>
                <th className="whitespace-nowrap font-normal p-1 ">Name</th>
                <th className="whitespace-nowrap font-normal p-1 ">Email</th>
                <th className="whitespace-nowrap font-normal p-1 ">Company</th>
                <th className="whitespace-nowrap font-normal p-1 ">
                  Department
                </th>
                <th className="whitespace-nowrap font-normal p-1 ">
                  Job Description
                </th>
                <th className="whitespace-nowrap font-normal p-1 ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loader
                ? employeeList.map((user) => {
                    return (
                      user.user_type != 1 && (
                        <RoleRow
                          user={user}
                          companyList={companyList}
                          departmentList={departmentList}
                          visibility={visibility}
                          setVisibility={setVisibility}
                          employeeList={employeeList}
                          unassigned
                          toggleModal={toggleModal}
                          setEmployee={setEmployee}
                          setMembers={setMembers}
                          members={members}
                        />
                      )
                    );
                  })
                : "Loading..."}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
