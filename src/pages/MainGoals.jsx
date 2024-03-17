import React, { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { CreateGoals, EmployeeGoals, Goals } from "../components/Goals";
import { useFunction } from "../context/FunctionContext";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import axios from "axios";
import Toggle from "../components/Toggle";
import EditGoals from "../components/Goals/EditGoals";
import { useAuth } from "../context/authContext";
import { developmentAPIs as url } from "../context/apiList";
import classNames from "classnames";

export default function MainGoals() {
  const [loading, toggleLoading] = useState(true);
  const [panel, setPanel] = useState("My Goals");
  const [pillars, setPillars] = useState([]);
  const [isEvaluator, setIsEvaluator] = useState(false);
  const [workYear, setWorkYear] = useState(-1);
  const { getPath } = useFunction();
  const { currentUser } = useAuth();
  const [employeeID, setEmployeeID] = useState();
  const [userID, setUserID] = useState();
  const [userType, setUsertype] = useState();
  const setHeader = (path) => {
    switch (path) {
      case "/main_goals":
      case "/main_goals/":
      case "/":
        if (panel === "My Goals") {
          return "Main Goals";
        } else {
          return "Employee Goals";
        }
      case "/main_goals/create":
      case "/main_goals/create/":
        return "Create Goals";
      case "/main_goals/edit":
      case "/main_goals/edit/":
        return "Edit Goals";
    }
  };

  const getPillars = async () => {
    try {
      const response = await axios.get(url.retrievePillars, {
        params: {
          pillars: true,
        },
      });
      setPillars(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  const verifyEvaluator = async () => {
    const parameters = {
      params: {
        employee_goals: true,
        evaluator: employeeID,
        admin: userType <= 2 ? true : false,
        work_year: workYear,
        is_count: true,
      },
    };
    try {
      const response = await axios.get(url.getEmployeeGoals, parameters);
      setIsEvaluator(response.data > 0);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await verifyEvaluator();
        await getPillars();
        toggleLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };

    const user = JSON.parse(currentUser);
    setUserID(parseInt(user.users_id));
    setEmployeeID(parseInt(user.employee_id));
    setUsertype(parseInt(user.user_type));
    if (user.user_type == 3 || user.users_id == 1) {
      setPanel("Employee Goals");
    }
    if (localStorage.getItem("work_year")) {
      setWorkYear(parseInt(localStorage.getItem("work_year")));
    }

    fetchData();
  }, [workYear, employeeID]);
  return loading ? (
    "Loading..."
  ) : (
    <>
      <section className="relative">
        <div
          className={classNames(
            "w-full min-h-[175px]",
            userType <= 2
              ? "bg-un-blue"
              : userType >= 3 && userType <= 5
              ? "bg-un-red-dark-1"
              : "bg-dark-gray"
          )}
        />
        <div className="absolute top-0 left-0 w-full px-4 lg:pl-[18rem] xl:pl-[18.5rem] xl:pr-[1.5rem]">
          <div className="max-h-[90vh] bg-white p-2 rounded-md overflow-y-scroll">
            {/* HEADER */}
            <div className="flex flex-col items-center justify-between md:flex-row mb-4">
              <span className="text-un-blue text-[1.2rem] font-semibold text-start w-full flex flex-row items-center gap-2">
                {!["/main_goals/", "/main_goals"].includes(getPath()) &&
                  getPath() !== "/" && (
                    <a
                      href="/main_goals"
                      onClick={() => localStorage.removeItem("goal_name")}
                      className="flex flex-row items-center w-fit text-dark-gray text-[.9rem] bg-default-dark p-1 rounded-md"
                    >
                      <MdOutlineKeyboardArrowLeft />
                      <span>Back</span>
                    </a>
                  )}
                {setHeader(getPath())}
              </span>
              {/* TOGGLE */}
              {userType != 3 && (
                <>
                  {isEvaluator && (
                    <Toggle
                      paths={["/main_goals/", "/main_goals", "/"]}
                      panel={panel}
                      panel_1={"My Goals"}
                      setPanel={setPanel}
                      panel_2={"Employee Goals"}
                    />
                  )}
                </>
              )}
            </div>
            {/* BODY */}
            <div>
              <Routes>
                {panel === "My Goals" ? (
                  <>
                    <Route
                      path="/*"
                      element={
                        <Goals
                          user_id={userID}
                          pillars={pillars}
                          workYear={workYear}
                          setWorkYear={setWorkYear}
                        />
                      }
                    />
                    <Route
                      path="/:id"
                      element={
                        <Goals
                          user_id={userID}
                          pillars={pillars}
                          workYear={workYear}
                          setWorkYear={setWorkYear}
                        />
                      }
                    />
                  </>
                ) : (
                  <>
                    <Route
                      path="/*"
                      element={
                        <EmployeeGoals
                          user_id={userID}
                          employee_id={employeeID}
                          userType={userType}
                          pillars={pillars}
                          workYear={workYear}
                          setWorkYear={setWorkYear}
                        />
                      }
                    />
                    <Route
                      path="/:id"
                      element={
                        <Goals
                          user_id={userID}
                          pillars={pillars}
                          workYear={workYear}
                          setWorkYear={setWorkYear}
                        />
                      }
                    />
                  </>
                )}

                <Route
                  path="/create"
                  element={
                    <CreateGoals
                      pillars={pillars}
                      user_id={userID}
                      employee_id={employeeID}
                      kpi_work_year={workYear}
                    />
                  }
                />
                <Route
                  path="/edit/*"
                  element={<EditGoals pillars={pillars} workYear={workYear} />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
