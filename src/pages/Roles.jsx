import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { BsPersonAdd } from "react-icons/bs";
import { MdOutlineKeyboardArrowLeft, MdRefresh } from "react-icons/md";
import LazyImage from "../misc/LazyImage";
import { useAuth } from "../context/authContext";
import classNames from "classnames";
import { Route, Routes } from "react-router-dom";
import UnassignedEmployeeTable from "../components/UnassignedEmployeeTable";
import { useFunction } from "../context/FunctionContext";
import RoleModal from "../misc/RoleModal";
import { RoleActions } from "../components/Action";
import { RoleAdd, RoleTable } from "../components/Roles";
import { GrCircleInformation } from "react-icons/gr";
import { developmentAPIs as url } from "../context/apiList";

export default function Roles() {
  const [modal, toggleModal] = useState("standby");
  const [loader, toggleLoader] = useState(true);
  const [userType, setUserType] = useState(0);
  const [roleList, setRoleList] = useState([]);
  const [superadmin, setSuperAdmin] = useState([]);
  const [employeeID, setEmployeeID] = useState([]);

  const {
    deleteRole,
    companyList,
    usertypeList,
    unassignUser,
    updateUserRole,
    departmentList,
    currentUser
  } = useAuth();
  const { getPath, capitalizeSentence } = useFunction();

  const handleSave = async () => {
    switch (modal) {
      case "assign role":
      case "re-assign role":
        if (userType === 0) {
          alert("Please select a role.");
          return;
        }

        if (updateUserRole(employeeID.users_id, userType)) {
          alert("yahoo");
        } else {
          alert("meh");
        }
        break;
      case "unassign role":
        if (unassignUser(employeeID.users_id)) {
          alert("yahoo");
        } else {
          alert("meh");
        }
        break;
      case "delete role":
        if (roleList.length === 0) {
          alert("Please select a role");
          return;
        }
        if (deleteRole(roleList)) {
          alert("yahoo");
        } else {
          alert("meh");
        }
        break;
    }
  };

  const setHeader = (pathname) => {
    switch (pathname) {
      case "/roles/":
      case "/roles":
        return "Roles";
      case "/roles/add":
        return "Add New Role";
      case "/roles/unassigned_employees":
        return "Unassigned Employees";
    }
  };

  useEffect(() => {
    const getSuperAdmin = async () => {

      const formData = new FormData();
      formData.append("super", true);
      try {
        const response = await axios.post(url.retrieveUsers, formData);
        setSuperAdmin(response.data);
        toggleLoader(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    getSuperAdmin();
  }, []);
  const usertype = JSON.parse(currentUser).user_type;
  return (
    <>
      <section className="relative">
      <div className={classNames("w-full min-h-[175px]", usertype <= 2 ? "bg-un-blue" : usertype >= 3 && usertype <= 5 ? "bg-un-red-dark-1" : "bg-dark-gray")} />
        <div className="absolute top-0 left-0 w-full px-4 lg:pl-[18rem] xl:pl-[18.5rem] xl:pr-[1.5rem]">
          <div className="bg-white p-2 rounded-md flex flex-col shadow-md justify-between">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <span className="text-un-blue text-[1.2rem] font-semibold flex gap-2 items-center">
                {!["/roles/", "/roles"].includes(getPath()) && (
                  <div className="p-1 pb-2">
                    <a
                      href="/roles"
                      className="flex flex-row items-center w-fit text-dark-gray text-[.9rem] bg-default-dark p-1 rounded-md"
                    >
                      <MdOutlineKeyboardArrowLeft />
                      <span>Back</span>
                    </a>
                  </div>
                )}
                {setHeader(getPath())}
              </span>
              {(getPath() === "/roles/" || getPath() === "/roles") && (
                <div className="flex flex-row gap-2 items-center justify-evenly md:w-2/3 xl:w-1/2">
                  <button
                    type="button"
                    className=" w-1/3 flex justify-center items-center gap-2 bg-default hover:bg-default-dark rounded-md p-1 md:w-full"
                  >
                    <MdRefresh />
                    <span className="text-[.8rem] md:text-[.9rem] lg:whitespace-nowrap">
                      Refresh
                    </span>
                  </button>
                  <a
                    href="/roles/add"
                    className="w-1/3 flex items-center justify-center gap-2 border bg-un-blue-light hover:bg-un-blue rounded-md p-1 text-white md:w-full"
                  >
                    <BsPersonAdd className="hidden md:block" />
                    <span className="text-[.8rem] md:text-[.9rem] whitespace-nowrap">
                      Add Role
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => toggleModal("delete role")}
                    className="w-1/3 flex items-center justify-center gap-2 border bg-un-red-light hover:bg-un-red rounded-md p-1 px-2 text-white md:w-full"
                  >
                    <BiTrash className="hidden md:block" />
                    <span className="text-[.8rem] md:text-[.9rem] whitespace-nowrap">
                      Delete Role
                    </span>
                  </button>
                </div>
              )}
            </div>
            {/* BODY */}
            <Routes>
              <Route
                path="*"
                element={
                  <>
                    <div className="py-2 flex flex-col gap-2">
                      {/* super admin card */}
                      {!loader ? (
                        <>
                          <div className="p-2 flex flex-col rounded-lg bg-default">
                            <div className="px-4 py-2 bg-default-dark rounded-lg flex flex-row justify-between items-center">
                              <span className="font-bold text-un-blue">
                                Super Admin
                              </span>
                              <div className="relative flex items-center justify-center py-1">
                                <RoleActions
                                  isSuperAdmin
                                  modal={modal}
                                  toggleModal={toggleModal}
                                  emp={superadmin}
                                  setEmployee={setEmployeeID}
                                />
                              </div>
                            </div>
                            <div className="py-2 gap-2 flex flex-col text-center items-center xs:flex-row xs:text-start xs:items-start">
                              <LazyImage
                                src={superadmin.picture}
                                alt={"Admin Img"}
                                large
                                square
                              />
                              <div className="flex flex-col text-[.9rem]">
                                <span className="font-semibold">
                                  {superadmin.first_name +
                                    " " +
                                    superadmin.middle_name.substring(0, 1) +
                                    "." +
                                    superadmin.last_name}
                                </span>
                                <span>{superadmin.email}</span>
                                <span>
                                  {
                                    companyList.find(
                                      (comp) =>
                                        comp.company_id ===
                                        superadmin.company_id
                                    ).company_name
                                  }
                                </span>
                                <span className="hidden xs:block">
                                  {
                                    departmentList.find(
                                      (dept) =>
                                        dept.department_id ===
                                        superadmin.department_id
                                    ).department_name
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                          <RoleTable
                            toggleModal={toggleModal}
                            setEmployee={setEmployeeID}
                          />
                        </>
                      ) : (
                        "loading..."
                      )}
                    </div>
                  </>
                }
              />
              <Route path="/add/" element={<RoleAdd />} />
              <Route
                path="/unassigned_employees/"
                element={
                  <UnassignedEmployeeTable
                    setEmployee={setEmployeeID}
                    toggleModal={toggleModal}
                  />
                }
              />
            </Routes>
          </div>
        </div>
        {modal !== "standby" && (
          <>
            {[
              "re-assign role",
              "assign role",
              "unassign role",
              "delete role",
            ].includes(modal) && (
              <>
                <RoleModal
                  typeChanged={
                    modal === "re-assign role"
                      ? userType === 0 || userType === employeeID.user_type
                      : false
                  }
                  title={capitalizeSentence(modal)}
                  content={
                    modal === "re-assign role" ? (
                      <>
                        <div className="flex flex-col gap-2 bg-default p-4 rounded">
                          <div className="flex justify-between items-center w-full gap-2">
                            <span className="font-semibold">User: </span>
                            <span>
                              {employeeID.first_name +
                                " " +
                                employeeID.middle_name
                                  .substring(0, 1)
                                  .toUpperCase() +
                                ". " +
                                employeeID.last_name}
                            </span>
                          </div>
                          <div className="flex justify-between items-center w-full gap-2">
                            <label htmlFor="current" className="font-semibold">
                              Current Role:
                            </label>
                            <span>
                              {usertypeList.find(
                                (user) => user.user_type == employeeID.user_type
                              )
                                ? usertypeList.find(
                                    (user) =>
                                      user.user_type == employeeID.user_type
                                  ).user_type_description
                                : "Error"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center gap-2">
                            <label htmlFor="new" className="font-semibold">
                              New Role:{" "}
                            </label>
                            <select
                              id="new"
                              className="rounded p-1"
                              onChange={(e) => setUserType(e.target.value)}
                            >
                              <option value="" defaultChecked disabled>
                                --Select Role--
                              </option>
                              {usertypeList.map((type) => {
                                return (
                                  <option
                                    key={type.user_type}
                                    value={type.user_type}
                                  >
                                    {capitalizeSentence(
                                      type.user_type_description
                                    )}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </>
                    ) : modal === "assign role" ? (
                      <>
                        <div className="flex flex-col gap-2 bg-default p-4 rounded">
                          <div className="flex justify-between items-center w-full gap-2">
                            <span className="font-semibold">User: </span>
                            <span>
                              {employeeID.first_name +
                                " " +
                                employeeID.middle_name
                                  .substring(0, 1)
                                  .toUpperCase() +
                                ". " +
                                employeeID.last_name}
                            </span>
                          </div>
                          <div className="flex justify-between items-center gap-2">
                            <label htmlFor="new" className="font-semibold">
                              New Role:
                            </label>
                            <select
                              id="new"
                              className="rounded p-1"
                              onChange={(e) => setUserType(e.target.value)}
                            >
                              <option value="" defaultChecked disabled>
                                --Select Role--
                              </option>
                              {usertypeList.map((type) => {
                                return (
                                  <option
                                    key={type.user_type}
                                    value={type.user_type}
                                  >
                                    {capitalizeSentence(
                                      type.user_type_description
                                    )}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </>
                    ) : modal === "delete role" ? (
                      <>
                        <div className="flex flex-row justify-evenly items-start">
                          <div className="flex flex-row items-center gap-2">
                            <span>Select Role/s:</span>
                            <div className="relative group/info">
                              <GrCircleInformation className="" />
                              <div className="absolute hidden group-hover/info:block bg-default w-[200px] p-2 rounded-md">
                                Deleting roles does not delete the employee. You
                                will need to reassign the employees that were
                                removed.
                              </div>
                            </div>
                          </div>
                          <div>
                            {usertypeList.map((type) => {
                              return (
                                <>
                                  <div className="flex flex-row gap-2 items-center">
                                    <input
                                      type="checkbox"
                                      id={type.user_type}
                                      value={type.user_type}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setRoleList((current) => [
                                            ...current,
                                            e.target.value,
                                          ]);
                                        } else {
                                          const tempList = roleList.filter(
                                            (role) => role !== e.target.value
                                          );
                                          setRoleList(tempList);
                                        }
                                      }}
                                    />
                                    <label htmlFor={type.user_type}>
                                      {capitalizeSentence(
                                        type.user_type_description
                                      )}
                                    </label>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <span>
                            Are you sure you want to unassign role of{" "}
                            {employeeID.first_name +
                              " " +
                              employeeID.middle_name
                                .substring(0, 1)
                                .toUpperCase() +
                              ". " +
                              employeeID.last_name}
                            ?
                          </span>
                        </div>
                      </>
                    )
                  }
                  closeModal={toggleModal}
                  handleContinue={handleSave}
                  ID={employeeID}
                />
              </>
            )}
            <div
              className={classNames(
                modal === "open"
                  ? "z-[8] bg-[#00000000]"
                  : "z-[25] bg-[#00000035]",
                "fixed h-full w-full top-0 left-0 animate-fade pointer-events-auto"
              )}
              onClick={() => {
                toggleModal("standby");
              }}
            />
          </>
        )}
      </section>
    </>
  );
}
