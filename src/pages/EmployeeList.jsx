import React, { useEffect } from "react";
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import { EmployeeTable, EmployeeAdd } from "../components";
import { useFunction } from "../context/FunctionContext";
import EmployeeProfile from "../components/EmployeeProfile";
import BulkEmployeeAdd from "../components/BulkEmployeeAdd";
import { useAuth } from "../context/authContext";
import classNames from "classnames";

export default function EmployeeList() {
  const { getPath } = useFunction();
  const { currentUser } = useAuth();
  const searchParams = useSearchParams();
  const navigate = useNavigate();
  const setHeader = (pathname) => {
    switch (pathname) {
      case "/employees":
      case "/employees/":
        return "Employees";
      case "/employees/add":
        return "Add New Employee";
      case "/employees/edit":
        return "Edit Employee";
      case "/employees/batch_add":
        return "Import Employees";
    }
  };
  useEffect(() => {
    document.title =
      "Employees | United Neon Media Group Performance Management System";
  }, []);
  const userType = JSON.parse(currentUser).user_type;
  return (
    <>
      <section className="relative">
      <div className={classNames("w-full min-h-[175px]", userType <= 2 ? "bg-un-blue" : userType >= 3 && userType <= 5 ? "bg-un-red-dark-1" : "bg-dark-gray")} />
        <div className="absolute top-0 left-0 w-full px-4 lg:pl-[18rem] xl:pl-[18.5rem] xl:pr-[1.5rem]">
          <div className="bg-white p-2 rounded-md flex flex-col shadow-md justify-between">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <span className="text-un-blue text-[1.2rem] font-semibold">
                {setHeader(getPath())}
              </span>
              <div
                className={
                  getPath() !== ("/employees" || "/employees/")
                    ? "hidden"
                    : "flex flex-row gap-2 items-center justify-evenly md:w-1/2 xl:w-1/3"
                }
              >
                <button
                  type="button"
                  className=" w-1/2 flex justify-center items-center gap-2 bg-default hover:bg-default-dark rounded-md p-1 md:w-full"
                  onClick={() => navigate(0)}
                >
                  <MdRefresh />
                  <span className="text-[.8rem] md:text-[.9rem]">Refresh</span>
                </button>
                <a
                  href="/employees/add"
                  className="w-1/2 flex items-center justify-center gap-2 border bg-un-blue-light hover:bg-un-blue rounded-md p-1 text-white md:w-full"
                >
                  <AiOutlineUserAdd />
                  <span className="text-[.8rem] md:text-[.9rem]">
                    Add Employee
                  </span>
                </a>
                <a
                  href="/employees/batch_add"
                  className="w-1/2 flex items-center justify-center gap-2 border bg-un-blue-light hover:bg-un-blue rounded-md p-1 text-white md:w-full"
                >
                  <AiOutlineUsergroupAdd />
                  <span className="text-[.8rem] md:text-[.9rem] whitespace-nowrap">
                    Batch Add Employee
                  </span>
                </a>
              </div>
            </div>
            <Routes>
              {JSON.parse(currentUser).user_type < 2 ? (
                <>
                  <Route
                    path="*"
                    element={
                      <EmployeeTable
                        filters={{
                          company: searchParams[0].get("company"),
                          department: searchParams[0].get("department"),
                        }}
                      />
                    }
                  />

                  <Route path="/profile/:id" element={<EmployeeProfile />} />
                  <Route
                    path="/profile/:id/edit"
                    element={<EmployeeProfile />}
                  />
                  <Route path="/add" element={<EmployeeAdd />} />
                  <Route path="/batch_add" element={<BulkEmployeeAdd />} />
                </>
              ) : (
                <>
                  <Route path="/profile/:id" element={<EmployeeProfile />} />
                  <Route
                    path="/profile/:id/edit"
                    element={<EmployeeProfile />}
                  />
                </>
              )}
            </Routes>
          </div>
        </div>
      </section>
    </>
  );
}
