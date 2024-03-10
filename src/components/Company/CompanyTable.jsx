import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useAuth } from "../../context/authContext";
import { GrFormNext, GrFormPrevious, GrFormSearch } from "react-icons/gr";
import { AiOutlineEdit } from "react-icons/ai";
import OutsideTrigger from "../OutsideTrigger";
import { MdDelete } from "react-icons/md";
import AlertModal from "../../misc/AlertModal";
export default function CompanyTable({
  toggleModal,
  setCompanyData,
  success,
  setDeleteModal,
  setDeleteDetails,
}) {
  const { getBusinessUnits, getDepartments, fetchUsers } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [businessUnits, setBusinessUnits] = useState([]);
  const [company, setCompany] = useState(0);
  const [currentCompany, setCurrentCompany] = useState("");
  const [query, setQuery] = useState("");
  const [onEdit, toggleEdit] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const setup = async () => {
      const companyList = await getBusinessUnits();
      setBusinessUnits(companyList);
      const department = await getDepartments();
      setDepartments(department);
      const userList = await fetchUsers();
      setUsers(userList);
    };
    setup();
  }, []);
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 py-2">
        <div className="flex flex-col gap-2 lg:w-1/2 xl:w-[40%]">
          <div
            className={classNames(
              company === 0 && "show",
              "company_container flex flex-col rounded-md overflow-hidden bg-default transition-all"
            )}
          >
            <div className="bg-un-red-light  px-2 text-white py-1 flex flex-row items-center justify-between">
              <span>United Neon Media Group</span>
            </div>
            {businessUnits.map((comp, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  className={classNames(
                    company === comp.company_id && "bg-default-dark",
                    "flex flex-row items-center justify-between p-1 m-1 rounded text-start hover:bg-default-dark transition-all"
                  )}
                  onClick={() => {
                    setCompany(comp.company_id);
                    setCurrentCompany(comp.company_name);
                    setCompanyData(comp);
                  }}
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
            company !== 0 && "show",
            "lg:w-1/2 xl:w-[60%] company_data flex flex-col py-2  rounded-md bg-default transition-all"
          )}
        >
          <button
            type="button"
            className="flex flex-row gap-1 items-center text-[.9rem] lg:hidden p-1"
            onClick={() => setCompany(0)}
          >
            <GrFormPrevious className="text-dark-gray" />
            <span className="text-dark-gray">Back to Companies</span>
          </button>
          {/* HEADER */}
          <div className="px-2 grid grid-cols-4 gap-2">
            <div className="col-span-3 group/title w-max p-1 flex flex-row gap-1">
              {!onEdit ? (
                <span className="font-semibold">
                  {currentCompany || "United Neon Media Group"}
                </span>
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
                    company !== 0 && !onEdit && "group-hover/title:block"
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
            {company > 0 ? (
              <div className="relative flex items-center justify-end">
                <div className="group">
                  <MdDelete
                    className="peer text-un-red-light text-[1.3rem] cursor-pointer"
                    onClick={() => {
                      setDeleteModal("Company");
                      setDeleteDetails({
                        ID: company,
                        name: currentCompany,
                      });
                    }}
                  />
                  <span className="absolute right-0 hidden group-hover:flex bg-white rounded-md p-1 text-dark-gray">
                    Delete
                  </span>
                </div>
              </div>
            ) : (
              ""
            )}
            {/* ADD DEPT */}
            {company > 0 && (
              <>
                {/* SEARCH */}
                <div className="col-[1/4] row-[2] flex flex-row items-center gap-2 p-1 bg-white rounded-md">
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
                  className="row-[2] w-full border bg-un-blue-light hover:bg-un-blue rounded-md p-1 text-white text-[.8rem]"
                >
                  Add Department
                </button>
              </>
            )}
          </div>
          {/* BODY */}
          {company > 0 ? (
            <div className="relative m-2 min-h-[250px] max-h-[400px] rounded-md bg-white overflow-x-auto">
              <table>
                <thead>
                  <tr
                    className={classNames(
                      "top-0 z-40",
                      success === "" ? "sticky" : "unset"
                    )}
                  >
                    {["Department Name", "No. of Employees", "Action"].map(
                      (header, i) => {
                        return (
                          <th
                            key={i}
                            className={classNames(
                              "text-center bg-un-blue-light text-white p-1 px-2 font-normal whitespace-nowrap w-full"
                            )}
                          >
                            {header}
                          </th>
                        );
                      }
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {departments
                    .filter(
                      (dept) =>
                        dept.company_id == company &&
                        dept.department_name
                          .toLowerCase()
                          .includes(query.toLowerCase())
                    )
                    .map((department, i) => {
                      return (
                        <tr className="text-center" key={i}>
                          <td className="whitespace-nowrap px-2 py-1 text-start">
                            {department.department_name}
                          </td>
                          <td>
                            {users.filter(
                              (user) =>
                                user.department === department.department_id
                            ).length > 0 ? (
                              <a
                                href={`/employees?company=${department.company_id}&department=${department.department_id}`}
                                className="text-un-blue-light underline"
                              >
                                {
                                  users.filter(
                                    (user) =>
                                      user.department ===
                                      department.department_id
                                  ).length
                                }
                              </a>
                            ) : (
                              users.filter(
                                (user) =>
                                  user.department === department.department_id
                              ).length
                            )}
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                // setDeleteDepartmentModal("Delete Department");
                                // setDepartmentDetails({
                                //   ID: department.department_id,
                                //   department: department.department_name,
                                // })
                                setDeleteModal("Department");
                                setDeleteDetails({
                                  ID: department.department_id,
                                  name: department.department_name,
                                  company: currentCompany,
                                });
                              }}
                            >
                              <MdDelete className="text-un-red-light" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="m-2 mx-4 bg-default-dark rounded-md text-center font-semibold text-dark-gray py-2">
              Please select a company
            </div>
          )}
        </div>
      </div>
    </>
  );
}
