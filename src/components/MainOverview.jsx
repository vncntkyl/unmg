import React, { useEffect, useState } from "react";
import { format, startOfToday } from "date-fns";
import axios from "axios";
import { GrFormNext, GrFormPrevious, GrFormSearch } from "react-icons/gr";
import { HiOutlineUserGroup, HiMenu } from "react-icons/hi";
import classNames from "classnames";
export default function MainOverview({ panel_type }) {
  const [quarter, setQuarter] = useState("First Quarter");
  const [evaluation, setEvaluation] = useState("all");
  const [employees, setEmployees] = useState([]);
  const [employeeSearch, setEmployeeSearch] = useState([]);
  const [positions, setPositions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    //const url = "../api/conglomerate.php";
    const url = "http://localhost/unmg_pms/api/conglomerate.php";
    axios
      .get(url)
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    //GET NAMES (RANDOM)
    if (company.length > 0 || panel_type !== "regular") {
      setEmployees([]);
      setPositions([]);
      const size =
        panel_type !== "regular" ? 10 : Math.ceil(company.length / 2);
      axios
        .get(
          "https://names.drycodes.com/" +
            size +
            "?nameOptions=boy_names&separator=space"
        )
        .then((response) => {
          response.data.forEach((emp) => {
            setEmployees((prev) => {
              return [...prev, emp];
            });
          });
        });
      axios
        .get(
          "https://names.drycodes.com/" +
            size +
            "?nameOptions=girl_names&separator=space"
        )
        .then((response) =>
          response.data.forEach((emp) => {
            setEmployees((prev) => {
              return [...prev, emp];
            });
          })
        );
      axios
        .get(
          "https://names.drycodes.com/ " +
            size * 2 +
            "?nameOptions=starwarsTitles&separator=space"
        )
        .then((response) =>
          response.data.forEach((pos) => {
            setPositions((prev) => {
              return [...prev, pos];
            });
          })
        );
    }
  }, [quarter, company, panel_type]);

  useEffect(() => {
    if (company > 0 || panel_type !== "regular") {
      if (query.length > 0) {
        setEmployeeSearch(
          employees.filter((emp) => emp.toLowerCase().includes(query))
        );
      } else {
        setEmployeeSearch([]);
      }
    }
  }, [query]);
  return (
    <>
      <div className="overflow-hidden bg-white m-2 rounded-md p-2 shadow-md flex flex-col gap-2 lg:ml-[18rem] lg:mr-6 xl:ml-[24.5rem] xl:mr-32">
        {/* HEADER */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <span className="text-[1.1rem] font-semibold">Rating Overview</span>
            <span className="text-[.8rem] text-dark-gray">
              As of {format(startOfToday(), "EEEE, MMMM d, yyyy")}
            </span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <label htmlFor="quarterPicker" className="font-semibold">
              Select Quarter:
            </label>
            <select
              id="quarterPicker"
              onChange={(e) => setQuarter(e.target.value)}
              className="shadow-sm bg-white text-un-blue rounded-md p-1 px-2 outline-none border border-gray"
            >
              <option value="First Quarter" defaultChecked>
                First Quarter
              </option>
              <option value="Second Quarter">Second Quarter</option>
              <option value="Third Quarter">Third Quarter</option>
              <option value="Fourth Quarter">Fourth Quarter</option>
            </select>
          </div>
          {panel_type !== "regular" && (
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="quarterPicker" className="font-semibold">
                Show Evaluations For:
              </label>
              <select
                id="quarterPicker"
                onChange={(e) => setEvaluation(e.target.value)}
                className="shadow-sm bg-white text-un-blue rounded-md p-1 px-2 outline-none border border-gray"
              >
                <option value="all" defaultChecked>
                  All
                </option>
                {employees.map((emp, index) => {
                  return <option value={emp} key={index}>{emp}</option>;
                })}
              </select>
            </div>
          )}
        </div>
        {/* BODY */}
        <div className="flex flex-col lg:flex-row gap-2">
          {panel_type === "regular" && (
            <div className="flex flex-col gap-2 lg:w-1/2 xl:w-1/3">
              <div
                className={classNames(
                  company === "" && "show",
                  "company_container flex flex-col gap-1 rounded-md overflow-hidden border shadow-sm border-gray transition-all"
                )}
              >
                <span className="bg-un-red-light px-2 text-white py-1">
                  United Neon Media Group
                </span>
                {companies.map((comp, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      className={classNames(
                        company === comp && "bg-gray",
                        "flex flex-row items-center justify-between px-2 text-start hover:bg-gray transition-all"
                      )}
                      onClick={() => setCompany(comp)}
                    >
                      <span>{comp}</span>
                      <GrFormNext />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <div
            className={classNames(
              panel_type === "regular" ? company !== "" && "show" : "show",
              panel_type === "regular" ? "lg:w-1/2 xl:w-2/3" : "w-full",
              "company_data flex flex-col py-2  rounded-md overflow-hidden overflow-y-scroll border shadow-sm border-gray transition-all"
            )}
          >
            <button
              type="button"
              className={classNames(
                panel_type === "regular"
                  ? "flex flex-row gap-1 items-center text-[.9rem] lg:hidden p-1"
                  : "hidden"
              )}
              onClick={() => setCompany("")}
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
                    ? company || "Select a Company"
                    : "Probationary Employees"}
                </span>
                <HiOutlineUserGroup />
                <span>{panel_type === "regular" ? company.length : 10}</span>
              </div>
              {/* SEARCH */}
              <div className="col-[1/3] row-span-2 flex flex-row items-center gap-2 p-1 rounded-md border border-gray md:col-[2/3] md:row-span-1">
                <GrFormSearch className="text-[1.3rem]" />
                <input
                  type="text"
                  onChange={(e) => setQuery(e.target.value)}
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
                <div className="m-2 overflow-hidden rounded-md shadow-sm border border-gray">
                  <div className="grid grid-cols-[1fr_2fr_.5fr] px-2 text-center gap-1 bg-un-blue-light text-white">
                    <span>Name</span>
                    <span>Job Title</span>
                    <span>Result</span>
                  </div>
                  <div className="flex flex-col max-h-[300px] gap-1 overflow-hidden overflow-y-scroll px-2 pt-1">
                    {employeeSearch.length > 0
                      ? employeeSearch.map((employee, index) => {
                          return (
                            <>
                              <div
                                key={index}
                                className="grid grid-cols-[1fr_2fr_.5fr] gap-2 md:gap-4"
                              >
                                <span className="flex flex-row items-center gap-1 text-[.9rem]">
                                  {employee}
                                </span>
                                <span className="text-[.9rem]">
                                  {positions[index]}
                                </span>
                                <span className="text-center">
                                  {employee.length / 4}
                                </span>
                              </div>
                            </>
                          );
                        })
                      : employees.map((employee, index) => {
                          return (
                            <>
                              <div
                                key={index}
                                className="grid grid-cols-[1fr_2fr_.5fr] gap-2 md:gap-4"
                              >
                                <span className="flex flex-row items-center gap-1 text-[.9rem]">
                                  {employee}
                                </span>
                                <span className="text-[.9rem]">
                                  {positions[index]}
                                </span>
                                <span className="text-center">
                                  {employee.length / 4}
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
        {/* FOOTER */}
        <button className="bg-un-blue-light w-fit text-white py-1 px-2 rounded-md">
          More Information
        </button>
      </div>
    </>
  );
}
