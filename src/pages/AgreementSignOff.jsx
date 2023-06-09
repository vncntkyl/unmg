import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Route, Router, Routes } from "react-router-dom";
import SignOff from "../components/Signoff/SignOff";
import { BsFillTrash3Fill } from "react-icons/bs";
import EmployeeSignOff from "../components/Signoff/EmployeeSignOff";



export default function AgreementSignOff() {
  if (!sessionStorage.getItem("currentUser")) {
    sessionStorage.setItem("redirect_to", window.location.pathname);
  }
  const [panel, setPanel] = useState("my evaluations");
  const [employeeID, setEmployeeID] = useState([]);
  useEffect(() => {
    setEmployeeID(JSON.parse(sessionStorage.getItem("currentUser")).users_id);
  }, []);
  return (
    <>
      <section className="relative">
        <div className="w-full min-h-[175px] bg-un-blue" />
        <div className="absolute top-0 left-0 w-full px-4 lg:pl-[18rem] xl:pl-[24.5rem] xl:pr-32">
          <div className="bg-white p-2 rounded-md flex flex-col shadow-md justify-between">
            {/* HEADER */}
            <div className="flex flex-col items-center justify-between md:flex-row">
              <span className="text-un-blue text-[1.2rem] font-semibold text-start w-full flex flex-row items-center gap-2">
                Agreement Sign Off
              </span>
              {/* TOGGLE */}
              <div
                className={classNames(
                  "toggle flex flex-row gap-2 bg-default w-full p-1 rounded-full relative overflow-hidden z-[4] md:w-[400px]",
                  panel !== "my evaluations" && "on"
                )}
              >
                <button
                  type="button"
                  className={classNames(
                    "toggle_text py-1 px-2 rounded-full text-[.8rem] z-[6] text-center w-1/2 md:text-[.8rem]",
                    panel === "my evaluations" ? "text-white" : "text-black"
                  )}
                  onClick={() => {
                    setPanel("my evaluations");
                  }}
                >
                  My Evaluations
                </button>
                <button
                  type="button"
                  className={classNames(
                    "toggle_text py-1 px-2 rounded-full text-[.8rem] z-[6] w-1/2 text-center whitespace-nowrap md:text-[.8rem]",
                    panel === "emp evaluations" ? "text-white" : "text-black"
                  )}
                  onClick={() => {
                    setPanel("emp evaluations");
                  }}
                >
                  Employee Evaluation
                </button>
              </div>
            </div>
            <div className="flex flex-row pt-4">
            </div>
            <Routes>
              {panel === "my evaluations" ? <Route
                path="/"
                element={<SignOff users_id={employeeID}/>}
              /> : <Route
                path="/"
                element={<EmployeeSignOff users_id={employeeID}/>}
              />}</Routes>
          </div>
        </div>
      </section>
    </>
  );
}
