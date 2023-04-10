import React, { useEffect, useState } from "react";
import axios from "axios";
import { GrFormNext, GrFormPrevious, GrFormSearch } from "react-icons/gr";
import { HiOutlineUserGroup, HiMenu } from "react-icons/hi";
import classNames from "classnames";
import { useAuth } from "../context/authContext";

export default function EmployeeTable({ quarter, panel_type }) {
  const [employees, setEmployees] = useState([]);
  const [employeeSearch, setEmployeeSearch] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState(-1);
  const [query, setQuery] = useState("");

  const { companyList } = useAuth();

  useEffect(() => {
    if (query.length > 0) {
      console.log(query);
      setEmployeeSearch(
        employees.filter((emp) =>
          emp.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setEmployeeSearch([]);
    }
  }, [query]);
  useEffect(() => {
    let employeeURL = "../../api/employees.json";

    if (panel_type !== "regular") {
      setCompany(-1);
      employeeURL = "../../api/probation.json";
    }

    axios.get(employeeURL).then((res) => {
      if (company !== -1) {
        setEmployees(
          res.data.filter((employee) => employee.company === company)
        );
      } else {
        setEmployees(res.data);
      }
    });
  }, [quarter, company, panel_type]);
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2">
        {panel_type === "regular" && (
          <div className="flex flex-col gap-2 lg:w-1/2 xl:w-1/3">
            <div
              className={classNames(
                company === -1 && "show",
                "company_container flex flex-col gap-1 rounded-md overflow-hidden border shadow-sm border-gray transition-all"
              )}
            >
              <span className="bg-un-red-light px-2 text-white py-1">
                United Neon Media Group
              </span>
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
            "company_data flex flex-col py-2  rounded-md overflow-hidden border shadow-sm border-gray transition-all"
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
                  ? company !== -1
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
              <div>
                <button className="border border-gray p-1 rounded-md">
                  <HiMenu />
                </button>
              </div>
            </div>
          </div>
          {/* BODY */}
          {employees && (
            <>
              <div className="hide_scroll m-2 rounded-md shadow-sm overflow-hidden border border-gray">
                <div className="grid grid-cols-[1fr_2fr_.5fr] px-2 text-center gap-1 bg-un-blue-light text-white">
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
          )}
        </div>
      </div>
    </>
  );
}
