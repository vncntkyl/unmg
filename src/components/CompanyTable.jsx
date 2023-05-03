import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useAuth } from "../context/authContext";
import { GrFormNext, GrFormPrevious, GrFormSearch } from "react-icons/gr";
import { AiOutlineEdit } from "react-icons/ai";
import { CompanyAction } from "./Action";
export default function CompanyTable({ toggleModal, setCompanyData, setDepartmentID }) {
  const { companyList, departmentList } = useAuth();

  const [company, setCompany] = useState(-1);
  const [currentCompany, setCurrentCompany] = useState(
    "United Neon Media Group"
  );
  const [query, setQuery] = useState("");
  const [onEdit, toggleEdit] = useState(false);
  const [actionsVisibility, setActionsVisibility] = useState(
    Array(departmentList.length).fill(false)
  );
  const toggleActions = (index) => {
    setActionsVisibility((prev) => {
      const updatedVisibility = [...prev];
      updatedVisibility.fill(false);
      updatedVisibility[index] = !prev[index];
      return updatedVisibility;
    });
  };

  useEffect(() => {
    if (company > -1) {
      setCurrentCompany(
        companyList.find((c) => c.company_id === company).company_name
      );
      setCompanyData(companyList.find((c) => c.company_id === company));
    } else {
      setCurrentCompany("United Neon Media Group");
    }
  }, [company]);
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 py-2">
        <div className="flex flex-col gap-2 lg:w-1/2 xl:w-[40%]">
          <div
            className={classNames(
              company === -1 && "show",
              "company_container flex flex-col rounded-md overflow-hidden bg-default transition-all"
            )}
          >
            <div className="bg-un-red-light  px-2 text-white py-1 flex flex-row items-center justify-between">
              <span>{currentCompany}</span>
            </div>
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
        <div
          className={classNames(
            company !== -1 && "show",
            "lg:w-1/2 xl:w-[60%] company_data flex flex-col py-2  rounded-md bg-default transition-all"
          )}
        >
          <button
            type="button"
            className="flex flex-row gap-1 items-center text-[.9rem] lg:hidden p-1"
            onClick={() => setCompany(-1)}
          >
            <GrFormPrevious className="text-dark-gray" />
            <span className="text-dark-gray">Back to Companies</span>
          </button>
          {/* HEADER */}
          <div className="px-2 grid grid-cols-2 gap-2">
            <div className="group/title w-max p-1 flex flex-row gap-1">
              {!onEdit ? (
                <span className="font-semibold">{currentCompany}</span>
              ) : (
                <input
                  type="text"
                  style={{ minWidth: currentCompany.length + "ch" }}
                  className="px-1 rounded"
                  defaultValue={currentCompany}
                />
              )}
              <button onClick={() => toggleEdit(true)}>
                <AiOutlineEdit
                  className={classNames(
                    "hidden",
                    !onEdit && "group-hover/title:block"
                  )}
                />
              </button>
              {onEdit && (
                <>
                  <button className="bg-un-blue-light text-white p-1 rounded-md text-[.9rem] hover:bg-un-blue">
                    Save
                  </button>
                  <button
                    onClick={() => toggleEdit(false)}
                    className="bg-transparent text-dark-gray border border-dark-gray p-1 rounded-md text-[.9rem] hover:bg-dark-gray hover:text-white"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
            {/* ADD DEPT */}
            {company > -1 && (
              <>
                {/* SEARCH */}
                <div className="col-[1/3] row-[2] flex flex-row items-center gap-2 p-1 bg-white rounded-md">
                  <GrFormSearch className="text-[1.3rem]" />
                  <input
                    type="text"
                    placeholder="Search department (Atleast 3 characters)"
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
                <button
                  type="button"
                  onClick={() => toggleModal("add department")}
                  className="col-[3/4] row-[2] w-full border bg-un-blue-light hover:bg-un-blue rounded-md p-1 text-white text-[.8rem]"
                >
                  Add Department
                </button>
              </>
            )}
          </div>
          {/* BODY */}
          {company > -1 ? (
            <div className="relative m-2 min-h-[250px] max-h-[400px] rounded-md bg-white overflow-x-auto">
              <table>
                <thead>
                  <tr className="sticky top-0 z-40">
                    <th className="text-center w-1/2 bg-un-blue-light text-white p-1 px-2 font-normal whitespace-nowrap">
                      Department Name
                    </th>
                    <th className="text-center w-full bg-un-blue-light text-white p-1 px-2 font-normal whitespace-nowrap">
                      No. of Employees
                    </th>
                    <th className="text-center w-full bg-un-blue-light text-white p-1 px-2 font-normal whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {departmentList &&
                    departmentList
                      .filter(
                        (dept) =>
                          dept.company_id == company &&
                          dept.department_name
                            .toLowerCase()
                            .includes(query.toLowerCase())
                      )
                      .map((department, i) => {
                        return (
                          <tr className="text-center">
                            <td className="whitespace-nowrap px-2 py-1 text-start">
                              {department.department_name}
                            </td>
                            <td>{0}</td>
                            <CompanyAction
                              toggleActions={toggleActions}
                              actionsVisibility={actionsVisibility}
                              idx={i}
                              toggleModal={toggleModal}
                              deptID={department.department_id}
                              setDepartmentID={setDepartmentID}
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
          ) : (
            <div className="m-2 px-2 bg-white rounded-md">
              Please select a company
            </div>
          )}
        </div>
      </div>
    </>
  );
}
