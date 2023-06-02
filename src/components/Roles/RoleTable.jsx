import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { GrFormSearch } from "react-icons/gr";
import RoleRow from "./RoleRow";

export default function RoleTable({ toggleModal, setEmployee }) {
  const { usertypeList, companyList, departmentList } = useAuth();

  const [groupedEmployees, setGroupedEmployees] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [visibility, setVisibility] = useState([]);
  const [usertype, setUserType] = useState(0);
  const [loader, setLoader] = useState(true);
  const [query, setQuery] = useState("");

  const groupEmployeesByRole = (empList) => {
    let grouped = empList.reduce((acc, obj) => {
      let user_type = obj.user_type;
      if (!acc[user_type]) {
        acc[user_type] = [];
      }
      acc[user_type].push(obj);
      return acc;
    }, {});

    let result = Object.keys(grouped).map((key) => ({
      user_type: parseInt(key),
      users: grouped[key],
    }));

    setGroupedEmployees(result);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      let url = "http://localhost/unmg_pms/api/retrieveUsers.php";
      //let url = "../api/retrieveUsers.php";
      try {
        const response = await axios.get(url, {
          params: {
            users: "regular",
          },
        });
        if (usertype === 0) {
          setEmployeeList(response.data.filter((d) => d.user_type != 0));
          groupEmployeesByRole(response.data.filter((d) => d.user_type != 0));
          setVisibility(
            response.data
              .filter((d) => d.user_type != 1 && d.user_type != 0)
              .map((d) => {
                return {
                  users_id: d.users_id,
                  modal: false,
                };
              })
          );
        } else {
          setEmployeeList(
            response.data.filter((d) => d.user_type === usertype)
          );
          setVisibility(
            response.data
              .filter((d) => d.user_type === usertype)
              .map((d) => {
                return {
                  users_id: d.users_id,
                  modal: false,
                };
              })
          );
        }
        setLoader(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchUsers();
  }, [usertype]);
  return (
    <>
      <div className="p-2 flex flex-col gap-2 rounded-lg bg-default">
        <div className="grid grid-cols-2 gap-2 items-center">
          {/* filter */}
          <div className="col-[1/3] row-[2/3] xs:row-[1/2] lg:col-[1/2] flex flex-row gap-2 items-center justify-between sm:justify-start">
            <label htmlFor="roles">Roles:</label>
            <select
              className="p-1 rounded"
              id="roles"
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="0" selected>
                All
              </option>
              {usertypeList.map((type) => {
                return (
                  type.user_type != 1 && (
                    <>
                      <option key={type.user_type} value={type.user_type}>
                        {type.user_type_description}
                      </option>
                    </>
                  )
                );
              })}
            </select>
          </div>
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
          {/* ASSIGN ROLE */}
          <div className="col-[1/3] row-[1/2] xs:row-[3/4] sm:col-[3/4] sm:row-[2/3] lg:col-[5/6]">
            <a
              href="/roles/unassigned_employees"
              className="flex flex-row items-center gap-2 p-1 px-2 text-[.8rem] sm:text-[.9rem] w-full justify-center bg-un-blue-light text-white rounded-md hover:bg-un-blue"
            >
              <FaUser />
              <span>Unassigned Employees</span>
            </a>
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
                ? usertype == 0
                  ? groupedEmployees.map((group) => {
                      return (
                        <>
                          <tr className="bg-white">
                            {usertypeList.find(
                              (type) =>
                                type.user_type != 1 &&
                                type.user_type == group.user_type
                            ) && (
                              <td colSpan={7}>
                                <div className="m-1 p-1  rounded-md bg-default-dark">
                                  {
                                    usertypeList.find(
                                      (type) =>
                                        type.user_type != 1 &&
                                        type.user_type == group.user_type
                                    ).user_type_description
                                  }
                                </div>
                              </td>
                            )}
                          </tr>
                          {group.users.map((user) => {
                            return (
                              user.user_type != 1 && (
                                <RoleRow
                                  user={user}
                                  companyList={companyList}
                                  departmentList={departmentList}
                                  visibility={visibility}
                                  setVisibility={setVisibility}
                                  employeeList={employeeList}
                                  toggleModal={toggleModal}
                                  setEmployee={setEmployee}
                                />
                              )
                            );
                          })}
                        </>
                      );
                    })
                  : employeeList.map((user) => {
                      return (
                        user.user_type != 1 && (
                          <RoleRow
                            user={user}
                            companyList={companyList}
                            departmentList={departmentList}
                            visibility={visibility}
                            setVisibility={setVisibility}
                            employeeList={employeeList}
                            toggleModal={toggleModal}
                            setEmployee={setEmployee}
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
