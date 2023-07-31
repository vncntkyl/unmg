import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Route, Router, Routes } from "react-router-dom";
import AssessmentTracking from "../components/TrackingAssessment/AssessmentTracking";
import EmployeeAssessmentTable from "../components/TrackingAssessment/EmployeeAssessmentTable";
import EmployeeAssessment from "../components/TrackingAssessment/EmployeeAssessment";
import CreateAchievements from "../components/TrackingAssessment/CreateAchievements";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useFunction } from "../context/FunctionContext";
import Toggle from "../components/Toggle";
import axios from "axios";
import EmployeeAssessmentGradeEdit from "../components/TrackingAssessment/EmployeeAssessmentGradeEdit";
import { useAuth } from "../context/authContext";

export default function TrackingAssessment() {
  const [loading, toggleLoading] = useState(true);
  const [panel, setPanel] = useState("My Assessment");
  const [employeeID, setEmployeeID] = useState();
  const [isEvaluator, setIsEvaluator] = useState(false);
  const { getPath } = useFunction();
  const { currentUser, kpiDurations } = useAuth();
  const [workYear, setWorkYear] = useState(-1);
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
  const verifyEvaluator = async () => {
    let url = "http://localhost/unmg_pms/api/getEmployeeGoals.php";
    //let url = "../api/retrieveUsers.php";
    const parameters = {
      params: {
        employee_goals: true,
        evaluator: JSON.parse(currentUser).employee_id,
        work_year: workYear,
        is_count: true,
      },
    };
    try {
      const response = await axios.get(url, parameters);
      setIsEvaluator(response.data > 0);
      toggleLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };
  verifyEvaluator();
  if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("redirect_to", window.location.pathname);
  }
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setEmployeeID(currentUser.employee_id);
    if (currentUser.user_type == 3 || currentUser.users_id == 1) {
      setPanel("Employee Assessment");
    }
    toggleLoading(false);
  }, []);
  return employeeID !== -1 && (loading ? (
    "Loading..."
  ) : (
    <>
      <section className="relative">
        <div className="w-full min-h-[175px] bg-un-blue" />
        <div className="absolute top-0 left-0 w-full px-4 lg:pl-[18rem] xl:pl-[24.5rem] xl:pr-32">
          <div className="bg-white p-2 rounded-md flex flex-col shadow-md justify-between gap-2">
            {/* HEADER */}
            <div className="flex flex-col items-center justify-between md:flex-row">
              <span className="text-un-blue text-[1.2rem] font-semibold text-start w-full flex flex-row items-center gap-2">
                {["/tracking_and_assessment/create", "/tracking_and_assessment/create/"].includes(getPath()) && (
                  <a
                    href="/tracking_and_assessment"
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
              {JSON.parse(currentUser).user_type != 3 && (
                <>
                  {isEvaluator && (
                    <Toggle
                      paths={["/tracking_and_assessment/", "/tracking_and_assessment", "/"]}
                      panel={panel}
                      panel_1={"My Assessment"}
                      setPanel={setPanel}
                      panel_2={"Employee Assessment"}
                    />
                  )}
                </>
              )}
            </div>
            <div className="flex flex-col">
              <Routes>
                {panel === "My Assessment" ? <Route
                  path="/"
                  element={<AssessmentTracking
                    emp_id={employeeID}
                    kpiYears={kpiDurations}
                    workYear={workYear}
                    setKpiDuration={setWorkYear} />}
                /> : <Route
                  path="/"
                  element={<EmployeeAssessmentTable emp_id={employeeID} />}
                />}
                <Route
                  path="/create/*"
                  element={
                    <CreateAchievements emp_id={employeeID} />
                  }
                />
                <Route path="/employee_assessment/:id" element={<EmployeeAssessment />} />
                <Route path="/employee_assessment/:id/grade_edit" element={<EmployeeAssessmentGradeEdit />} />
                <Route path="/employee_assessment/:id/approve" element={<EmployeeAssessment />} />
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </>
  ));
}