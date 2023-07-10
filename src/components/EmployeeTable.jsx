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
import Search from "../misc/Search";

export default function EmployeeTable({ filters = [] }) {
  const [employees, setEmployees] = useState([]);
  const [employeeID, setEmployeeID] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [businessUnits, setBusinessUnits] = useState([]);
  const [onFilter, toggleFilter] = useState(false);
  const [employeeFilters, setFilters] = useState({
    username: false,
    email_address: false,
    user_type: false,
    employee_id: true,
    picture: false,
    salutation: false,
    last_name: true,
    first_name: true,
    middle_name: false,
    suffix: false,
    nickname: false,
    company: true,
    department: true,
    team: false,
    job_description: true,
    contract_type: false,
    contact_no: false,
    address: false,
    primary_evaluator: true,
    secondary_evaluator: false,
    tertiary_evaluator: false,
    employment_category: false,
    nationality: false,
    hire_date: true,
    request_consult: false,
    for_regularization: false,
  });
  const [actionsVisibility, setActionsVisibility] = useState(
    Array(employees.length).fill(false)
  );
  const [status, setStatus] = useState("all");
  const [company, setCompany] = useState(-1);
  const [query, setQuery] = useState("");
  const [modal, toggleModal] = useState("standby");
  const {
    getBusinessUnits,
    getDepartments,
    fetchUsers,
    manageUser,
    usertypeList,
  } = useAuth();
  const { splitKey, capitalizeSentence } = useFunction();

  const filterEmployees = (query, employees = []) => {
    if (query === "") {
      return company > -1
        ? employees.filter((emp) => emp.company === company)
        : employees;
    } else {
      return employees.filter(
        (emp) =>
          emp.first_name.toLowerCase().includes(query.toLowerCase()) ||
          emp.last_name.toLowerCase().includes(query.toLowerCase())
      );
    }
  };

  const convertIDsToValue = (key, data) => {
    if (key === "company") {
      return businessUnits.find((bu) => bu.company_id === data.company)
        .company_name;
    } else if (key === "department") {
      return departments.find((d) => d.department_id === data.department)
        .department_name;
    } else if (key === "picture") {
      return data.picture ? (
        <div className="flex items-center justify-center">
          <LazyImage
            key={data.users_id}
            src={data.picture}
            alt={data.first_name + "_profile"}
          />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center text-dark-gray">
            <FaUserCircle className="text-[2rem]" />
          </div>
        </>
      );
    } else if (key.includes("evaluator")) {
      const evaluator = employees.find(
        (employee) => employee.employee_id === data.primary_evaluator
      );

      if (evaluator) {
        return evaluator.last_name + ", " + evaluator.first_name;
      }else{
        return "";
      }
    } else if (key === "user_type") {
      return capitalizeSentence(
        usertypeList.find((type) => type.job_level_id === data[key])
          .job_level_name
      );
    } else {
      return data[key] || "--";
    }
  };

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
    const setup = async () => {
      const companyList = await getBusinessUnits();
      setBusinessUnits(companyList);
      const departmentList = await getDepartments();
      setDepartments(departmentList);
      const userList = await fetchUsers();
      setEmployees(userList);
    };

    setup();
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 py-2">
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
            {businessUnits.map((comp, index) => {
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
        <div
          className={classNames(
            company !== -1 && "show",
            "lg:w-1/2 xl:w-2/3",
            "company_data flex flex-col py-2  rounded-md bg-default transition-all"
          )}
        >
          {/* HEADER */}
          <div className="grid grid-cols-2 gap-2 px-2 items-center md:gap-1">
            {/* COMPANY NAME */}
            <div className="flex flex-row items-center justify-start gap-2 col-[1/3] md:col-[1/2] lg:col-[1/3] xl:col-[1/2]">
              <span className="font-semibold">
                {company > -1
                  ? businessUnits.find((c) => c.company_id === company)
                      .company_name
                  : "United Neon Media Group"}
              </span>
              <HiOutlineUserGroup />
              <span>
                {company > -1
                  ? employees.filter((employee) => employee.company === company)
                      .length
                  : employees.length}
              </span>
            </div>
            {/* SEARCH */}
            <Search setQuery={setQuery} />
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
                <option value="resigned">Resigned</option>
                <option value="terminated">Left the Organization</option>
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
                  {Object.keys(employeeFilters).map((data, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-row gap-2 p-1 z-[10]"
                      >
                        <input
                          type="checkbox"
                          defaultChecked={employeeFilters[data]}
                          disabled={data === "name"}
                          id={data}
                          onChange={() => {
                            setFilters((prev) => {
                              return {
                                ...prev,
                                [`${data}`]: !prev[data],
                              };
                            });
                          }}
                        />
                        <label htmlFor={data}>{splitKey(data)}</label>
                      </div>
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
          <div className="max-w-full max-h-[400px] shadow-md rounded-md bg-white overflow-x-scroll mx-2 mt-1">
            <table>
              <thead>
                <tr>
                  {Object.keys(employeeFilters).map((key) => {
                    return (
                      employeeFilters[key] && (
                        <th
                          className={classNames(
                            "text-center w-1/2 bg-un-blue-light text-white p-1 px-2 whitespace-nowrap",
                            !onFilter && "sticky top-0"
                          )}
                        >
                          {key === "picture" ? "" : splitKey(key)}
                        </th>
                      )
                    );
                  })}
                  <th
                    className={classNames(
                      "text-center w-1/2 bg-un-blue-light text-white p-1 px-2",
                      !onFilter && "sticky top-0"
                    )}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterEmployees(query, employees).map((emp, index) => {
                  return (
                    <tr key={index}>
                      {Object.entries(employeeFilters).map(
                        ([key, value]) =>
                          value && (
                            <td
                              key={key}
                              className="whitespace-nowrap px-2 py-1"
                            >
                              {convertIDsToValue(key, emp)}
                            </td>
                          )
                      )}
                      {/* ACTIONS */}
                      <Action
                        idx={index}
                        toggleActions={toggleActions}
                        actionsVisibility={actionsVisibility}
                        emp={emp}
                        setEmployeeID={setEmployeeID}
                        toggleModal={toggleModal}
                      />
                    </tr>
                  );
                })}
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
