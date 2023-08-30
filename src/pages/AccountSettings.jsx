import React, { useEffect } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { Route, Routes } from "react-router-dom";
import { EmployeeTable, EmployeeAdd } from "../components";
import { useFunction } from "../context/FunctionContext";
import EmployeeProfile from "../components/EmployeeProfile";
import { useAuth } from "../context/authContext";
import classNames from "classnames";

export default function AccountSettings() {
  const { currentUser } = useAuth();
  const { getPath } = useFunction();
  const setHeader = (pathname) => {
    switch (pathname) {
      case "/account":
      case "/account/":
        return "Account";
      case "/account/edit":
        return "Edit Account";
    }
  };
  useEffect(() => {
    document.title =
      "Account | United Neon Media Group Performance Management System";
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
                Account Settings
              </span>
            </div>
            <Routes>
              <Route
                path="/:id"
                element={<EmployeeProfile admin={true} />}
              />
              <Route
                path="/:id/edit"
                element={<EmployeeProfile admin={true} />}
              />
            </Routes>
          </div>
        </div>
      </section>
    </>
  );
}
