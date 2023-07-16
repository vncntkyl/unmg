import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Route, Router, Routes } from "react-router-dom";
import AssessmentTracking from "../components/TrackingAssessment/AssessmentTracking";
import EmployeeAssessmentTable from "../components/TrackingAssessment/EmployeeAssessmentTable";
import EmployeeAssessment from "../components/TrackingAssessment/EmployeeAssessment";
import CreateAssessment from "../components/TrackingAssessment/CreateAssessment";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useFunction } from "../context/FunctionContext";
import Toggle from "../components/Toggle";
import EmployeeAssessmentGradeEdit from "../components/TrackingAssessment/EmployeeAssessmentGradeEdit";

export default function TrackingAssessment() {
  const [panel, setPanel] = useState("My Assessment");
  const [employeeID, setEmployeeID] = useState();
  const { getPath } = useFunction();
  
  const setHeader = (path) => {
    switch (path) {
      case "/tracking_and_assessment":
      case "/tracking_and_assessment/":
        if (panel === "My Assessment") {
          return "Tracking & Assessment";
        } else {
          return "Employees' Tracking & Assessment";
        }
      case "/tracking_and_assessment/create":
      case "/tracking_and_assessment/create/":
        return "Create Assessment";
    }
  };
  if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("redirect_to", window.location.pathname);
  }
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const employeeID = currentUser ? currentUser.employee_id : null;
    setEmployeeID(employeeID);
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
                {["/tracking_and_assement/create", "/tracking_and_assement/create/"].includes(getPath()) && (
                  <a
                    href="/tracking_and_assement"
                    className="flex flex-row items-center w-fit text-dark-gray text-[.9rem] bg-default-dark p-1 rounded-md"
                  >
                    <MdOutlineKeyboardArrowLeft />
                    <span>Back</span>
                  </a>
                )
              }
                {setHeader(getPath())}
              </span>
              {/* TOGGLE */}
              <Toggle
                paths={["/tracking_and_assessment/", "/tracking_and_assessment"]}
                panel={panel}
                panel_1={"My Assessment"}
                setPanel={setPanel}
                panel_2={"Employee Assessment"}
              />
            </div>
            <div className="flex flex-col">
              <Routes>
                {panel === "My Assessment" ? <Route
                  path="/"
                  element={<AssessmentTracking emp_id={employeeID}/>}
                /> : <Route
                  path="/"
                  element={<EmployeeAssessmentTable emp_id={employeeID} />}
                />}
                <Route
                  path="/create/*"
                  element={
                    <CreateAssessment emp_id={employeeID} /> 
                  }
                />
                <Route path="/employee_assessment/:id" element={<EmployeeAssessment />}/>
                <Route path="/employee_assessment/:id/grade_edit" element={<EmployeeAssessmentGradeEdit />}/>
                <Route path="/employee_assessment/:id/approve" element={<EmployeeAssessment />}/>
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
