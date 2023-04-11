import React, { useEffect } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { Route, Routes } from "react-router-dom";
import { EmployeeTable, EmployeeAdd } from "../components/";
import { useFunction } from "../context/FunctionContext";

export default function EmployeeList() {
  const { getPath } = useFunction();

  const setHeader = (pathname) => {
    switch (pathname) {
      case "/employees":
      case "/employees/":
        return "Employees";
      case "/employees/add":
        return "Add New Employee";
      case "/employees/edit":
        return "Edit Employee";
    }
  };
  useEffect(()=> {
    document.title = "Employees | United Neon Media Group Performance Management System";
  },[])
  return (
    <>
      <section className="relative">
        <div className="w-full min-h-[175px] bg-un-blue" />
        <div className="absolute top-0 left-0 w-full px-4 lg:pl-[18rem] xl:pl-[24.5rem] xl:pr-32">
          <div className="bg-white p-2 rounded-md flex flex-col gap-2 shadow-md">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <span className="text-un-blue text-[1.2rem] font-semibold">
                {setHeader(getPath())}
              </span>
              <div
                className={
                  getPath() !== ("/employees" || "/employees/")
                  ? "hidden"
                  : "flex flex-row gap-4 items-center justify-evenly md:w-1/2 xl:w-1/3"
                }
              >
                <button
                  type="button"
                  className=" w-1/2 flex justify-center items-center gap-2 border border-un-blue rounded-md p-1 md:w-full"
                >
                  <MdRefresh />
                  <span className="text-[.8rem]">Refresh</span>
                </button>
                <a
                  href="/employees/add"
                  className="w-1/2 flex items-center justify-center gap-2 border border-un-blue bg-un-blue rounded-md p-1 text-white md:w-full"
                >
                  <AiOutlineUserAdd />
                  <span className="text-[.8rem] md:text-[.9rem]">
                    Add Employee
                  </span>
                </a>
              </div>
            </div>
            <Routes>
              <Route
                path="*"
                element={<EmployeeTable panel_type={"regular"} />}
              />
              <Route path="/add" element={<EmployeeAdd />} />
            </Routes>
          </div>
        </div>
      </section>
    </>
  );
}
