import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useAuth } from "../context/authContext";
import EvaluationTable from "../components/EvaluationTable";
import { GrFormSearch } from "react-icons/gr";
export default function ViewEvaluation() {
  const { companyList, departmentList } = useAuth();
  const [selectedQuarter, setSelectedQuarter] = useState("All");
  const [selectedCompanyID, setSelectedCompanyID] = useState("All");
  const [departments, completeDepartments] = useState([]);
  const [selectedDepartmentID, setSelectedDepartmentID] = useState("All");
  const [employeeType, setEmployeeType] = useState("regular");
  const [query, setQuery] = useState("");
  const [currentUserType, setCurrentUserType] = useState("");
  const [currentUserContractType, setCurrentUserContractType] = useState("");
  const [defaultState, setDefaultState] = useState();
  const [currentEmployeeID, setCurrentEmployeeID] = useState();
  const [showFeature] = useState(defaultState);
  useEffect(() => {
    const currentUser = sessionStorage.getItem("currentUser");
    if (currentUser) {
      const userId = JSON.parse(currentUser);
      setCurrentUserType(userId.user_type);
      setCurrentUserContractType(userId.contract_type);
      setCurrentEmployeeID(userId.employee_id);
      setDefaultState(currentUserType != 6);
    }
  }, []);
  const handleChange = (event) => {
    setSelectedQuarter(event.target.value);
  };
  const handleCompanyChange = (event) => {
    setSelectedCompanyID(event.target.value);
  };
  const handleDepartmentChange = (event) => {
    setSelectedDepartmentID(event.target.value);
  };
  
  useEffect(() => {
    const fetchCompanyDepartments = async () => {
      if (selectedCompanyID === "All") {
        completeDepartments(departmentList);
      } else if (selectedCompanyID !== "") {
        const filteredDepartments = departmentList.filter(
          (department) => department.company_id == selectedCompanyID
        );
        completeDepartments(filteredDepartments);
      } else {
        completeDepartments([]);
      }
    };
    fetchCompanyDepartments();
  }, [selectedCompanyID]);
  return (
    <>
      <section className="relative">
        <div className="w-full min-h-[175px] bg-un-blue" />
        <div className="absolute top-0 left-0 w-full px-4 lg:pl-[18rem] xl:pl-[24.5rem] xl:pr-32">
          <div className="bg-white p-2 rounded-md flex flex-col shadow-md justify-between ">
            {/* HEADER */}
            <div className="p-2 flex flex-row gap-2 justify-between rounded-lg ">
              <span className="text-un-blue text-[1.2rem] font-semibold text-start w-full flex flex-row items-center gap-2">
                Evaluations
              </span>
              {/* TOGGLE */}
              {showFeature && (
                <div
                  className={classNames(
                    "toggle flex flex-row gap-2 bg-default w-full p-1 rounded-full relative overflow-hidden z-[4] md:w-[400px]",
                    employeeType !== "regular" && "on"
                  )}
                >
                  <button
                    type="button"
                    className={classNames(
                      "toggle_text py-1 px-2 rounded-full text-[.8rem] z-[6] text-center w-1/2 md:text-[.8rem]",
                      employeeType === "regular" ? "text-white" : "text-black"
                    )}
                    onClick={() => {
                      setEmployeeType("regular");
                    }}
                  >
                    Regular
                  </button>
                  <button
                    type="button"
                    className={classNames(
                      "toggle_text py-1 px-2 rounded-full text-[.8rem] z-[6] w-1/2 text-center whitespace-nowrap md:text-[.8rem] col-[1/3] row-[3/4] xs:row-[2/3] sm:col-[1/3] lg:col-[4/6] lg:row-[1/2]  ",
                      employeeType === "probation" ? "text-white" : "text-black"
                    )}
                    onClick={() => {
                      setEmployeeType("probationary");
                    }}
                  >
                    Probation
                  </button>
                </div>
              )}
            </div>
            <div className="gap-2 items-center md:gap-1">
              <div className="grid grid-cols-2">
                <div className="p-2 flex flex-row gap-2 rounded-lg">
                  <span className="text-un-blue text-[1.2rem] font-semibold text-start w-full flex flex-row items-center gap-6">
                    Quarter:
                    {employeeType === "regular" ? (
                      <>
                        <select
                          id="quarterPicker"
                          key={selectedQuarter}
                          className="border rounded-md w-full flex flex-row md:w-fit"
                          value={selectedQuarter}
                          onChange={handleChange}
                        >
                          <option value="All">All</option>
                          <option value="First_Quarter">First Quarter</option>
                          <option value="Second_Quarter">Second Quarter</option>
                          <option value="Third_Quarter">Third Quarter</option>
                          <option value="Fifth_Quarter">Year End</option>
                        </select>
                      </>
                    ) : (
                      <>
                        <select
                          id="quarterPicker"
                          key={selectedQuarter}
                          className="border rounded-md w-full flex flex-row md:w-fit"
                          value={selectedQuarter}
                          onChange={handleChange}
                        >
                          <option value="All">All</option>
                          <option value="First_Quarter">First Quarter</option>
                          <option value="Second_Quarter">Second Quarter</option>
                          <option value="Third_Quarter">Third Quarter</option>
                          <option value="Fourth_Quarter">Fourth Quarter</option>
                          <option value="Fifth_Quarter">Year-End</option>
                        </select>
                      </>
                    )}
                  </span>
                </div>
                {/* SEARCH */}
                {showFeature && (
                  <div className="col-[1/3] row-[3/4] xs:row-[2/3] sm:col-[1/3] lg:col-[4/6] lg:row-[1/2] flex flex-row items-center gap-2 p-1 bg-default rounded-md">
                    <label htmlFor="search">
                      <GrFormSearch className="text-[1.3rem]" />
                    </label>
                    <input
                      type="text"
                      id="search"
                      placeholder="Search Employee Name (At least 3 characters)"
                      onChange={(e) => {
                        if (e.target.value.length < 3) {
                          setQuery("");
                        } else {
                          setQuery(e.target.value.toLowerCase());
                        }
                      }}
                      className="w-full lg:min-w-[350px] outline-none bg-transparent placeholder:text-[.9rem] placeholder:md:text-[1rem]"
                    />
                  </div>
                )}
              </div>
              {showFeature && (
                <div className="grid grid-cols-2">
                  <div className="p-2 flex flex-row gap-2 rounded-lg">
                    <span className="text-un-blue text-[1.2rem] font-semibold text-start w-full flex flex-row items-center gap-6 col-[1/3] row-[3/4] xs:row-[2/3] sm:col-[1/3] lg:col-[4/6] lg:row-[1/2]">
                      Company:
                      <select
                        id="companyPicker"
                        className="border rounded-md w-full flex flex-row md:max-w-250px"
                        value={selectedCompanyID}
                        onChange={handleCompanyChange}
                      >
                        <option value="All">All</option>
                        {companyList.map((comp) => {
                          return (
                            <option value={comp.company_id}>
                              {comp.company_name}
                            </option>
                          );
                        })}
                      </select>
                    </span>
                    {departments.length !== 0 ? (
                      <>
                        {selectedCompanyID === "All" ? (
                          <>
                            <span className="text-un-blue text-[1.2rem] font-semibold text-start w-full flex flex-row items-center gap-6">
                              Select Company
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-un-blue text-[1.2rem] font-semibold text-start w-full flex flex-row items-center gap-6">
                              Department:
                              <select
                                id="departmentPicker"
                                className="border rounded-md w-full flex flex-row md:max-w-250px"
                                value={selectedDepartmentID}
                                onChange={handleDepartmentChange}
                              >
                                <option value="All">All</option>
                                {departments.map((dept) => {
                                  return (
                                    <option
                                      key={dept.department_id}
                                      value={dept.department_id}
                                    >
                                      {dept.department_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </span>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {selectedCompanyID === "All" ? (
                          <>
                            <span className="text-un-blue text-[1.2rem] font-semibold text-start w-full flex flex-row items-center gap-6">
                              Select Company
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-un-blue text-[1.2rem] font-semibold text-start w-full flex flex-row items-center gap-6">
                              No Departments
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <EvaluationTable
              selectedQuarter={selectedQuarter}
              selectedCompanyID={selectedCompanyID}
              selectedDepartmentID={selectedDepartmentID}
              employeeType={employeeType}
              query={query}
              currentUserContractType={currentUserContractType}
              currentUserType={currentUserType}
              currentEmployeeID={currentEmployeeID}
            />
          </div>
        </div>
      </section>
    </>
  );
}
