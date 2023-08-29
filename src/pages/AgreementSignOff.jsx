import React, { useEffect, useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import SignOff from "../components/Signoff/SignOff";
import EmployeeSignOffTable from "../components/Signoff/EmployeeSignOffTable";
import EmployeeSignOffAssessment from "../components/Signoff/EmployeeSignOffAssessment";
import { useFunction } from "../context/FunctionContext";
import { useAuth } from "../context/authContext";
import Toggle from "../components/Toggle";
import axios from "axios";
import { developmentAPIs as url } from "../context/apiList";

export default function AgreementSignOff() {
  const [loading, toggleLoading] = useState(true);
  const [isEvaluator, setIsEvaluator] = useState(false);
  const [panel, setPanel] = useState("My Evaluation");
  const [employeeID, setEmployeeID] = useState();
  const [workYear, setWorkYear] = useState(-1);
  const { currentUser, kpiDurations } = useAuth();
  const { getPath } = useFunction();
  const setHeader = (path) => {
    switch (path) {
      case "/sign_off":
      case "/sign_off/":
        if (panel === "My Evaluation") {
          return "Agreement Sign Off";
        } else {
          return "Employee's Sign Off";
        }
    }
  }

  const verifyEvaluator = async () => {
    const parameters = {
      params: {
        employee_goals: true,
        evaluator: JSON.parse(currentUser).employee_id,
        work_year: workYear,
        is_count: true,
      },
    };
    try {
      const response = await axios.get(url.getEmployeeGoals, parameters);
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
      setPanel("Employee Evaluation");
    }
    toggleLoading(false);
  }, []);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")).employee_id;
    setEmployeeID(currentUser);
  }, []);
  return employeeID !== -1 && (loading ? (
    "Loading..."
  ) : (
    <>
      <section className="relative">
        <div className="w-full min-h-[175px] bg-un-blue" />
        <div className="absolute top-0 left-0 w-full px-4 lg:pl-[18rem] xl:pl-[18.5rem] xl:pr-[1.5rem]">
          <div className="bg-white p-2 rounded-md flex flex-col shadow-md justify-between">
            {/* HEADER */}
            <div className="flex flex-col items-center justify-between md:flex-row">
              <span className="text-un-blue text-[1.2rem] font-semibold text-start w-full flex flex-row items-center gap-2">
                {setHeader(getPath())}
              </span>
              {/* TOGGLE */}
              {JSON.parse(currentUser).user_type != 3 && (
                <>
                  {isEvaluator && (
                    <Toggle
                      paths={["/sign_off/", "/sign_off", "/"]}
                      panel={panel}
                      panel_1={"My Evaluation"}
                      setPanel={setPanel}
                      panel_2={"Employee Evaluation"}
                    />
                  )}
                </>
              )}
            </div>
            <div className="flex flex-col">
              <Routes>
                {panel === "My Evaluation" ? <Route
                  path="/"
                  element={<SignOff
                    emp_id={employeeID}
                    kpiYears={kpiDurations}
                    workYear={workYear}
                    setKpiDuration={setWorkYear} />}
                /> : <Route
                  path="/"
                  element={<EmployeeSignOffTable emp_id={employeeID} />}
                />}
                <Route path="/employee_sign_off_assessment/:id" element={<EmployeeSignOffAssessment />} />
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </>
  ));
}
