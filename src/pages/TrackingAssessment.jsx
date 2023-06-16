import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Route, Router, Routes } from "react-router-dom";
import AssessmentTracking from "../components/TrackingAssessment/AssessmentTracking";
import EmployeeAssessment from "../components/TrackingAssessment/EmployeeAssessment";
import Badge from "../misc/Badge";
import AssessmentInstructions from "../components/TrackingAssessment/AssessmentInstructions";



export default function TrackingAssessment() {
  if (!sessionStorage.getItem("currentUser")) {
    sessionStorage.setItem("redirect_to", window.location.pathname);
  }
  const [panel, setPanel] = useState("my assessment");
  const [employeeID, setEmployeeID] = useState(-1);
  useEffect(() => {
    setEmployeeID(JSON.parse(sessionStorage.getItem("currentUser")).users_id);
  }, []);
  return employeeID !== -1 && (
    <>
      <section className="relative">
        <div className="w-full min-h-[175px] bg-un-blue" />
        <div className="absolute top-0 left-0 w-full px-4 lg:pl-[18rem] xl:pl-[24.5rem] xl:pr-32">
          <div className="bg-white p-2 rounded-md flex flex-col shadow-md justify-between gap-2">
            {/* HEADER */}
            <div className="flex flex-col items-center justify-between md:flex-row">
              <span className="text-un-blue text-[1.2rem] font-semibold text-start w-full flex flex-row items-center gap-2">
                Tracking & Assessment
              </span>
              {/* TOGGLE */}
              <div
                className={classNames(
                  "toggle flex flex-row gap-2 bg-default w-full p-1 rounded-full relative overflow-hidden z-[4] md:w-[400px]",
                  panel !== "my assessment" && "on"
                )}
              >
                <button
                  type="button"
                  className={classNames(
                    "toggle_text py-1 px-2 rounded-full text-[.8rem] z-[6] text-center w-1/2 md:text-[.8rem]",
                    panel === "my assessment" ? "text-white" : "text-black"
                  )}
                  onClick={() => {
                    setPanel("my assessment");
                  }}
                >
                  My Assessment
                </button>
                <button
                  type="button"
                  className={classNames(
                    "toggle_text py-1 px-2 rounded-full text-[.8rem] z-[6] w-1/2 text-center whitespace-nowrap md:text-[.8rem]",
                    panel === "emp assessment" ? "text-white" : "text-black"
                  )}
                  onClick={() => {
                    setPanel("emp assessment");
                  }}
                >
                  Employee Assessment
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-4">
              <div className="flex px-2 justify-between">
                <div className="flex flex-row items-center gap-2 justify-between md:justify-start">
                  <label htmlFor="quarterPicker" className="font-semibold">
                    Select Quarter:
                  </label>
                  <select
                    className="bg-default text-black rounded-md p-1 px-2 outline-none"
                  >
                    <option value="First Quarter" defaultChecked>
                      First Quarter
                    </option>
                    <option value="Second Quarter">Second Quarter</option>
                    <option value="Third Quarter">Third Quarter</option>
                    <option value="Fourth Quarter">Fourth Quarter</option>
                  </select>
                </div>
                <div className="flex flex-row items-center gap-2  justify-between md:justify-start">
                  <label className="font-semibold">
                    Status:
                  </label>
                  <Badge message={"Awaiting Submission"} className={"text-[.8rem] px-1"} />
                </div>
              </div>
              <Routes>
                {panel === "my assessment" ? <Route
                  path="/"
                  element={<AssessmentTracking users_id={employeeID} />}
                /> : <Route
                  path="/"
                  element={<EmployeeAssessment users_id={employeeID} />}
                />}</Routes>
            </div>
            <AssessmentInstructions/>
          </div>
        </div>
      </section>
    </>
  );
}
