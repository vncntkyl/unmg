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

export default function EmployeeTable({ quarter, panel_type, onDashboard }) {
  const [employees, setEmployees] = useState([]);
  const [employeeID, setEmployeeID] = useState(null);
  const [employeeSearch, setEmployeeSearch] = useState([]);
  const [onFilter, toggleFilter] = useState(false);
  const [actionsVisibility, setActionsVisibility] = useState(
    Array(employees.length).fill(false)
  );
  const [userdata, setUserdata] = useState({
    id: false,
    picture: false,
    salutation: false,
    name: true,
    company: false,
    department: false,
    position: true,
    username: false,
    email: false,
    contact_no: false,
    address: false,
    result: true,
    status: false,
  });
  const [company, setCompany] = useState(-1);
  const [query, setQuery] = useState("");
  const [modal, toggleModal] = useState("standby");

  const { companyList } = useAuth();
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
    alert(employeeID);
  }

  useEffect(() => {
    if (query.length > 0) {
      const searchQuery = query.toLowerCase();
      setEmployeeSearch(
        employees.filter(
          (emp) =>
            emp.name.toLowerCase().includes(searchQuery) ||
            emp.position.toLowerCase().includes(searchQuery) ||
            companyList
              .find((company) => company.id == emp.company)
              .name.toLowerCase()
              .includes(searchQuery) ||
            emp.department.toLowerCase().includes(searchQuery) ||
            emp.username.toLowerCase().includes(searchQuery) ||
            emp.email.toLowerCase().includes(searchQuery) ||
            emp.contact_no.toLowerCase().includes(searchQuery) ||
            emp.address.toLowerCase().includes(searchQuery)
        )
      );
    } else {
      setEmployeeSearch(employees);
    }
  }, [query]);
  useEffect(() => {
    let employeeURL = "../../api/employees.json";
    //uncomment below if deploying
    //let employeeURL = "../api/employees.json";

    if (panel_type !== "regular") {
      setCompany(-1);
      employeeURL = "../../api/probation.json";
      //employeeURL = "../api/probation.json";

    }

    axios.get(employeeURL).then((res) => {
      if (company > -1) {
        setEmployees(
          res.data.filter((employee) => employee.company === company)
        );
      } else {
        setEmployees(res.data);
      }
    });
  }, [quarter, company, panel_type, userdata]);
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 py-2">
        {panel_type === "regular" && (
          <div className="flex flex-col gap-2 lg:w-1/2 xl:w-1/3">
            <div
              className={classNames(
                company === -1 && "show",
                "company_container flex flex-col gap-1 rounded-md overflow-hidden border shadow-sm border-gray transition-all"
              )}
            >
              <button
                className="bg-un-red-light px-2 text-white py-1 flex flex-row items-center justify-between"
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
                      company === comp.id && "bg-gray",
                      "flex flex-row items-center justify-between px-2 text-start hover:bg-gray transition-all"
                    )}
                    onClick={() => setCompany(comp.id)}
                  >
                    <span>{comp.name}</span>
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
            "company_data flex flex-col py-2  rounded-md border shadow-sm border-gray transition-all"
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
            <div className="flex flex-row items-center justify-start gap-2 col-[1/3] md:col-[1/2]">
              <span className="text-[.9rem]">
                {panel_type === "regular"
                  ? company > -1
                    ? companyList.find((c) => c.id === company).name
                    : "United Neon Media Group"
                  : "Probationary Employees"}
              </span>
              <HiOutlineUserGroup />
              <span>{panel_type === "regular" ? employees.length : 10}</span>
            </div>
            {/* SEARCH */}
            <div className="col-[1/3] row-span-2 flex flex-row items-center gap-2 p-1 rounded-md border border-gray md:col-[2/3] md:row-span-1">
              <GrFormSearch className="text-[1.3rem]" />
              <input
                type="text"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                className="w-full outline-none"
              />
            </div>
            {/* FILTERS */}
            <div className="col-[1/3] row-span-3 flex flex-row items-center p-1 gap-2 md:row-span-2">
              <label htmlFor="company_data_filter">Status:</label>
              <select
                id="company_data_filter"
                className="outline-none border rounded-md border-gray"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="relative">
                <button
                  className="border border-gray p-1 rounded-md"
                  onClick={() => toggleFilter((prev) => !prev)}
                >
                  <HiMenu />
                </button>
                <div
                  className={classNames(
                    onFilter
                      ? "max-h-[250px] opacity-100"
                      : "max-h-[0px] opacity-0",
                    "absolute top-full left-0 min-w-max overflow-y-scroll flex flex-col gap-1 bg-white px-2 py-1 shadow-lg rounded-md transition-all"
                  )}
                >
                  {Object.keys(userdata).map((data, index) => {
                    return (
                      data !== "id" && (
                        <>
                          <div
                            key={index}
                            className="flex flex-row gap-2 p-1 z-[10]"
                          >
                            <input
                              type="checkbox"
                              defaultChecked={userdata[data]}
                              disabled={data === "name" || data === "action"}
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
              <div className="max-w-full max-h-[400px] shadow-md rounded border border-gray overflow-x-scroll mx-3">
                <table>
                  <thead>
                    {Object.keys(userdata).map((objKey) => {
                      return (
                        userdata[objKey] && (
                          <td
                            className={`text-center w-1/2 bg-un-blue-light text-white p-1 px-2`}
                          >
                            {splitKey(objKey)}
                          </td>
                        )
                      );
                    })}
                    {!onDashboard && (
                      <td
                        className={`text-center w-1/2 bg-un-blue-light text-white p-1 px-2`}
                      >
                        Action
                      </td>
                    )}
                  </thead>
                  <tbody>
                    {employeeSearch.length > 0
                      ? employeeSearch.map((emp, idx) => (
                          <tr key={emp.id} className={`text-left w-full`}>
                            {Object.entries(userdata).map(
                              ([key, value]) =>
                                value && (
                                  <td
                                    key={key}
                                    className="whitespace-nowrap px-2 py-1"
                                  >
                                    {key === "company" ? (
                                      companyList.find(
                                        (company) => company.id === emp.company
                                      )?.name
                                    ) : key === "picture" ? (
                                      <div className="flex items-center justify-center">
                                        <FaUserCircle />
                                      </div>
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
                          <tr key={emp.id} className={`text-left w-full`}>
                            {Object.entries(userdata).map(
                              ([key, value]) =>
                                value && (
                                  <td
                                    key={key}
                                    className="whitespace-nowrap px-2 py-1"
                                  >
                                    {key === "company" ? (
                                      companyList.find(
                                        (company) => company.id === emp.company
                                      )?.name
                                    ) : key === "picture" ? (
                                      <div className="flex items-center justify-center">
                                        <FaUserCircle />
                                      </div>
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
          {/* {employees && (
            <>
              <div className="hide_scroll m-2 rounded-md shadow-sm overflow-hidden border border-gray">
                <div
                  className={classNames(
                    `grid px-2 text-center gap-1 bg-un-blue-light text-white grid-cols-${columnCount}`
                  )}
                >
                  <span>Name</span>
                  <span>Job Title</span>
                  <span>Result</span>
                </div>
                <div className="hide_scroll flex flex-col max-h-[300px] gap-1 overflow-hidden overflow-y-scroll px-2 pt-1">
                  {employeeSearch.length > 0
                    ? employeeSearch.map((employee) => {
                        return (
                          <>
                            <div
                              key={"S" + employee.id}
                              className="grid grid-cols-[1fr_1fr_1fr] gap-2 md:gap-4"
                            >
                              <span className="flex flex-row items-center gap-1 text-[.9rem]">
                                {employee.name}
                              </span>
                              <span className="text-[.9rem]">
                                {employee.position}
                              </span>
                              <span className="text-center">
                                {employee.name.length / 4}
                              </span>
                            </div>
                          </>
                        );
                      })
                    : employees.map((employee) => {
                        return (
                          <>
                            <div
                              key={employee.id}
                              className="grid grid-cols-[1fr_2fr_.5fr] gap-2 md:gap-4"
                            >
                              <span className="flex flex-row items-center gap-1 text-[.9rem]">
                                {employee.name}
                              </span>
                              <span className="text-[.9rem]">
                                {employee.position}
                              </span>
                              <span className="text-center">
                                {employee.name.length / 4}
                              </span>
                            </div>
                          </>
                        );
                      })}
                </div>
              </div>
            </>
          )} */}
        </div>
      </div>
      {employeeID && modal !== "standby" && (
        <>
          {modal === "view" ? (
            <></>
          ) : (
            <Modal
              title={"Account Deactivation"}
              message={`Are you sure you want to ${modal} this account?`}
              action={modal}
              closeModal={toggleModal}
              setEmployeeID={setEmployeeID}
              handleContinue={handleAction}
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
