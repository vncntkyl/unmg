import React, { useEffect, useState } from "react";
import axios from "axios";
import { GrFormNext, GrFormPrevious, GrFormSearch } from "react-icons/gr";
import { HiOutlineUserGroup, HiMenu } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import classNames from "classnames";
import { useAuth } from "../context/authContext";
import { useFunction } from "../context/FunctionContext";
import { FaUserCircle } from "react-icons/fa";
import Action from "./Action";
import Modal from "../misc/Modal";
import LazyImage from "../misc/LazyImage";

export default function EmployeeTable({ quarter, panel_type, onDashboard }) {
  const [employees, setEmployees] = useState([]);
  const [employeeID, setEmployeeID] = useState(null);
  const [employeeSearch, setEmployeeSearch] = useState([]);
  const [onFilter, toggleFilter] = useState(false);
  const [actionsVisibility, setActionsVisibility] = useState(
    Array(employees.length).fill(false)
  );
  const [status, setStatus] = useState("all");
  const [userdata, setUserdata] = useState({
    users_id: false,
    picture: true,
    salutation: false,
    name: true,
    username: false,
    address: false,
    email: false,
    contact_no: false,
    company: true,
    department: true,
    job_description: false,
    supervisor: false,
    immediate_supervisor: false,
    user_type: false,
  });
  const [company, setCompany] = useState(-1);
  const [query, setQuery] = useState("");
  const [modal, toggleModal] = useState("standby");

  const { companyList, departmentList, manageUser } = useAuth();
  const { splitKey } = useFunction();

  const toggleActions = (index) => {
    setActionsVisibility((prev) => {
      const updatedVisibility = [...prev];
      updatedVisibility.fill(false);
      updatedVisibility[index] = !prev[index];
      return updatedVisibility;
    });
  };

  const handleAction = () => {
    const action = modal;
    if (manageUser(action, employeeID)) {
      toggleModal(action === "delete" ? "deleted" : "deactivated");
    }
  };

  const handleDismissal = () => {
    toggleModal("standby");
    setActionsVisibility([]);
  };

  useEffect(() => {
    if (query.length != 0) {
      const searchQuery = query.toLowerCase();
      setEmployeeSearch(
        employees.filter((emp) =>
          [
            emp.first_name,
            emp.last_name,
            emp.middle_name,
            emp.job_description,
            companyList.find((company) => company.company_id == emp.company_id)
              ?.company_name,
            departmentList.find(
              (dept) => dept.department_id == emp.department_id
            )?.department_name,
            emp.username,
            emp.email,
            emp.contact_no,
            emp.address,
          ].some((value) =>
            value.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      );
    } else {
      setEmployeeSearch(employees);
    }
  }, [query]);

  //GET USERS
  useEffect(() => {
    const fetchUsers = async () => {
      let url = "http://localhost/unmg_pms/api/retrieveUsers.php";
      //let url = "../api/retrieveUsers.php";
      try {
        const response = await axios.get(url, {
          params: {
            users: panel_type === "regular" ? "regular" : "probation",
          },
        });
        if (company == -1 || company == -2) {
          switch (status) {
            case "all":
            default:
              setEmployees(response.data);
              break;
            case "active":
              setEmployees(response.data.filter((d) => d.inactive === "0"));
              break;
            case "inactive":
              setEmployees(response.data.filter((d) => d.inactive === "1"));
              break;
            case "left the organization":
              setEmployees(response.data.filter((d) => d.deleted === "1"));
              break;
          }
        } else {
          switch (status) {
            case "all":
            default:
              setEmployees(
                response.data.filter((d) => d.company_id === company)
              );
              break;
            case "active":
              setEmployees(
                response.data.filter(
                  (d) => d.company_id === company && d.inactive === "0"
                )
              );
              break;
            case "inactive":
              setEmployees(
                response.data.filter(
                  (d) => d.company_id === company && d.inactive === "1"
                )
              );
              break;
            case "left the organization":
              setEmployees(
                response.data.filter(
                  (d) => d.company_id === company && d.deleted === "1"
                )
              );
              break;
          }
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchUsers();
  }, [quarter, company, panel_type, userdata, status]);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 py-2">
        {panel_type === "regular" && (
          <div className="flex flex-col gap-2 lg:w-1/2 xl:w-1/3">
            <div
              className={classNames(
                company === -1 && "show",
                "company_container flex flex-col rounded-md overflow-hidden bg-default transition-all"
              )}
            >
              <button
                className="bg-un-red-light  px-2 text-white py-1 flex flex-row items-center justify-between"
                onClick={() => setCompany(-2)}
              >
                <span>United Neon Media Group</span>
                <MdNavigateNext />
              </button>
              {companyList.map((comp, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    className={classNames(
                      company === comp.company_id && "bg-default-dark",
                      "flex flex-row items-center justify-between p-1 m-1 rounded text-start hover:bg-default-dark transition-all"
                    )}
                    onClick={() => setCompany(comp.company_id)}
                  >
                    <span>{comp.company_name}</span>
                    <GrFormNext />
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <div
          className={classNames(
            panel_type === "regular" ? company !== -1 && "show" : "show",
            panel_type === "regular" ? "lg:w-1/2 xl:w-2/3" : "w-full",
            "company_data flex flex-col py-2  rounded-md bg-default transition-all"
          )}
        >
          <button
            type="button"
            className={classNames(
              panel_type === "regular"
                ? "flex flex-row gap-1 items-center text-[.9rem] lg:hidden p-1"
                : "hidden"
            )}
            onClick={() => setCompany(-1)}
          >
            <GrFormPrevious className="text-dark-gray" />
            <span className="text-dark-gray">Back to Companies</span>
          </button>
          {/* HEADER */}
          <div className="grid grid-cols-2 gap-2 px-2 items-center md:gap-1">
            {/* COMPANY NAME */}
            <div className="flex flex-row items-center justify-start gap-2 col-[1/3] md:col-[1/2] lg:col-[1/3] xl:col-[1/2]">
              <span className="font-semibold">
                {panel_type === "regular"
                  ? company > -1
                    ? companyList.find((c) => c.company_id === company)
                        .company_name
                    : "United Neon Media Group"
                  : "Probationary Employees"}
              </span>
              <HiOutlineUserGroup />
              <span>{panel_type === "regular" ? employees.length : 10}</span>
            </div>
            {/* SEARCH */}
            <div className="col-[1/3] row-span-2 flex flex-row items-center gap-2 p-1 bg-white rounded-md md:col-[2/3] lg:col-[1/3] xl:col-[2/3] md:row-span-1">
              <GrFormSearch className="text-[1.3rem]" />
              <input
                type="text"
                placeholder="Search employee... (Atleast 3 characters)"
                onChange={(e) => {
                  if (e.target.value.length < 3) {
                    setQuery("");
                  } else {
                    setQuery(e.target.value);
                  }
                }}
                className="w-full outline-none bg-transparent placeholder:text-[.9rem] placeholder:md:text-[1rem]"
              />
            </div>
            {/* FILTERS */}
            <div className="col-[1/3] row-span-3 flex flex-row items-center py-1 gap-2 md:row-span-2">
              <label htmlFor="company_data_filter">Status:</label>
              <select
                id="company_data_filter"
                className="outline-none rounded-md"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="all" selected>
                  All
                </option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="left the organization">
                  Left the Organization
                </option>
              </select>
              <div className="relative">
                <button
                  className="bg-white rounded-md p-1"
                  onClick={() => toggleFilter((prev) => !prev)}
                >
                  <HiMenu />
                </button>
                <div
                  className={classNames(
                    onFilter
                      ? "max-h-[250px] opacity-100"
                      : "max-h-[0px] opacity-0",
                    "absolute top-full right-0 md:left-0 mt-1 min-w-max overflow-y-scroll flex flex-col gap-1 bg-white px-2 py-1 shadow-lg rounded-md transition-all"
                  )}
                >
                  {Object.keys(userdata).map((data, index) => {
                    return (
                      data !== "users_id" && (
                        <>
                          <div
                            key={index}
                            className="flex flex-row gap-2 p-1 z-[10]"
                          >
                            <input
                              type="checkbox"
                              defaultChecked={userdata[data]}
                              disabled={data === "name"}
                              id={data}
                              onChange={() => {
                                setUserdata((prev) => {
                                  return {
                                    ...prev,
                                    [`${data}`]: !prev[data],
                                  };
                                });
                              }}
                            />
                            <label htmlFor={data}>{splitKey(data)}</label>
                          </div>
                        </>
                      )
                    );
                  })}
                  <div
                    className={classNames(
                      "bg-[#00000000] fixed h-full w-full z-[8] top-0 left-0 animate-fade pointer-events-auto",
                      !onFilter && "hidden pointer-events-none"
                    )}
                    onClick={() => toggleFilter(false)}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* BODY */}
          {employees && (
            <>
              <div className="max-w-full max-h-[400px] shadow-md rounded-md bg-white overflow-x-auto mx-2 mt-1">
                <table>
                  <thead>
                    {Object.keys(userdata).map((objKey) => {
                      return (
                        userdata[objKey] && (
                          <td
                            className={classNames(
                              "text-center w-1/2 bg-un-blue-light text-white p-1 px-2",
                              !onFilter && "sticky top-0"
                            )}
                          >
                            {splitKey(objKey)}
                          </td>
                        )
                      );
                    })}
                    {!onDashboard && (
                      <td
                        className={classNames(
                          "text-center w-1/2 bg-un-blue-light text-white p-1 px-2",
                          !onFilter && "sticky top-0"
                        )}
                      >
                        Action
                      </td>
                    )}
                  </thead>
                  <tbody>
                    {employeeSearch.length > 0
                      ? employeeSearch.map((emp, idx) => (
                          <tr key={emp.id} className={`text-center w-full`}>
                            {Object.entries(userdata).map(
                              ([key, value]) =>
                                value && (
                                  <td
                                    key={key}
                                    className="whitespace-nowrap px-2 py-1"
                                  >
                                    {key === "company" ? (
                                      companyList.find(
                                        (company) =>
                                          company.company_id === emp.company_id
                                      )?.company_name
                                    ) : key === "picture" ? (
                                      emp.picture ? (
                                        <div className="flex items-center justify-center">
                                          <LazyImage
                                            key={emp.users_id}
                                            src={emp.picture}
                                            alt={emp.first_name + "_profile"}
                                          />
                                        </div>
                                      ) : (
                                        <>
                                          <div className="flex items-center justify-center text-dark-gray">
                                            <FaUserCircle className="text-[2rem]" />
                                          </div>
                                        </>
                                      )
                                    ) : key === "name" ? (
                                      emp.last_name +
                                      ", " +
                                      emp.first_name +
                                      " " +
                                      emp.middle_name.substring(0, 1) +
                                      "."
                                    ) : key === "department" ? (
                                      departmentList.find(
                                        (dept) =>
                                          dept.department_id ===
                                          emp.department_id
                                      ).department_name
                                    ) : key === "supervisor" ? (
                                      emp.supervisor_id
                                    ) : (
                                      emp[key]
                                    )}
                                  </td>
                                )
                            )}
                            {/* ACTIONS */}
                            {!onDashboard && (
                              <Action
                                idx={idx}
                                toggleActions={toggleActions}
                                actionsVisibility={actionsVisibility}
                                emp={emp}
                                setEmployeeID={setEmployeeID}
                                toggleModal={toggleModal}
                              />
                            )}
                          </tr>
                        ))
                      : employees.map((emp, idx) => (
                          <tr key={emp.id} className={`text-center w-full`}>
                            {Object.entries(userdata).map(
                              ([key, value]) =>
                                value && (
                                  <td
                                    key={key}
                                    className="whitespace-nowrap px-2 py-1"
                                  >
                                    {key === "company" ? (
                                      companyList.find(
                                        (company) =>
                                          company.company_id === emp.company_id
                                      )?.company_name
                                    ) : key === "picture" ? (
                                      emp.picture ? (
                                        <div className="flex items-center justify-center">
                                          <LazyImage
                                            key={emp.users_id}
                                            src={emp.picture}
                                            alt={emp.first_name + "_profile"}
                                          />
                                        </div>
                                      ) : (
                                        <>
                                          <div className="flex items-center justify-center text-dark-gray">
                                            <FaUserCircle className="text-[2rem]" />
                                          </div>
                                        </>
                                      )
                                    ) : key === "name" ? (
                                      emp.last_name +
                                      ", " +
                                      emp.first_name +
                                      " " +
                                      emp.middle_name.substring(0, 1) +
                                      "."
                                    ) : key === "department" ? (
                                      departmentList.find(
                                        (dept) =>
                                          dept.department_id ===
                                          emp.department_id
                                      ).department_name
                                    ) : key === "supervisor" ? (
                                      emp.supervisor_id
                                    ) : (
                                      emp[key]
                                    )}
                                  </td>
                                )
                            )}
                            {/* ACTIONS */}
                            {!onDashboard && (
                              <Action
                                idx={idx}
                                toggleActions={toggleActions}
                                actionsVisibility={actionsVisibility}
                                emp={emp}
                                setEmployeeID={setEmployeeID}
                                toggleModal={toggleModal}
                              />
                            )}
                          </tr>
                        ))}
                    <div
                      className={classNames(
                        "bg-[#00000000] fixed h-full w-full z-[8] top-0 left-0 animate-fade pointer-events-auto",
                        actionsVisibility.length === 0 &&
                          "z-[-1] hidden pointer-events-none"
                      )}
                      onClick={() => setActionsVisibility([])}
                    />
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
      {employeeID && modal !== "standby" && (
        <>
          {modal !== "view" && (
            <Modal
              title={"Account Management"}
              message={`Are you sure you want to ${modal} this account?`}
              action={modal}
              closeModal={toggleModal}
              setEmployeeID={setEmployeeID}
              handleContinue={handleAction}
            />
          )}
          {(modal === "deleted" || modal === "deactivated") && (
            <Modal
              title={"Account Management"}
              message={`Account has been successfully ${modal}`}
              action={"Dismiss"}
              closeModal={toggleModal}
              handleContinue={handleDismissal}
            />
          )}
          <div
            className={classNames(
              "bg-[#00000035] fixed h-full w-full z-[21] top-0 left-0 animate-fade pointer-events-auto",
              employeeID === null && "z-[-1] hidden pointer-events-none"
            )}
            onClick={() => {
              toggleModal("standby");
              setEmployeeID(null);
            }}
          />
        </>
      )}
    </>
  );
}
