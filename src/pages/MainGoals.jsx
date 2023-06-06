import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CreateGoals, EmployeeGoals, Goals } from "../components/Goals";
import { useFunction } from "../context/FunctionContext";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import axios from "axios";
import Toggle from "../components/Toggle";

export default function MainGoals() {
  const [panel, setPanel] = useState("My Goals");
  const [employeeID, setEmployeeID] = useState();
  const [pillars, setPillars] = useState([]);
  const { getPath } = useFunction();

  const setHeader = (path) => {
    switch (path) {
      case "/main_goals":
      case "/main_goals/":
        if (panel === "My Goals") {
          return "Main Goals";
        } else {
          return "Employee Goals";
        }
      case "/main_goals/create":
      case "/main_goals/create/":
        if (sessionStorage.getItem("edit_goal")) {
          return "Edit Goals";
        } else {
          return "Create Goals";
        }
    }
  };

  useEffect(() => {
    const getPillars = async () => {
      const url = "http://localhost/unmg_pms/api/retrievePillars.php";
      //const url = "../api/retrievePillars.php";
      try {
        const response = await axios.get(url, {
          params: {
            pillars: true,
          },
        });
        setPillars(response.data);
      } catch (e) {
        console.log(e.message);
      }
    };

    getPillars();
  }, []);
  useEffect(() => {
    setEmployeeID(JSON.parse(sessionStorage.getItem("currentUser")).users_id);
  }, []);
  return (
    <>
      <section className="relative">
        <div className="w-full min-h-[175px] bg-un-blue" />
        <div className="absolute top-0 left-0 w-full px-4 lg:pl-[18rem] xl:pl-[24.5rem] xl:pr-32">
          <div className="bg-white p-2 rounded-md flex flex-col shadow-md justify-between gap-2">
            {/* HEADER */}
            <div className="flex flex-col items-center justify-between md:flex-row">
              <span className="text-un-blue text-[1.2rem] font-semibold text-start w-full flex flex-row items-center gap-2">
                {!["/main_goals/", "/main_goals"].includes(getPath()) && (
                  <a
                    href="/main_goals"
                    onClick={() => {
                      if (sessionStorage.getItem("edit_goal")) {
                        sessionStorage.removeItem("edit_goal");
                      }
                    }}
                    className="flex flex-row items-center w-fit text-dark-gray text-[.9rem] bg-default-dark p-1 rounded-md"
                  >
                    <MdOutlineKeyboardArrowLeft />
                    <span>Back</span>
                  </a>
                )}
                {setHeader(getPath())}
              </span>
              {/* TOGGLE */}
              <Toggle paths={["/main_goals/", "/main_goals"]} panel={panel} panel_1={"My Goals"} setPanel={setPanel} panel_2={"Employee Goals"}/>
            </div>
            {/* BODY */}
            <div>
              <Routes>
                {panel === "My Goals" ? (
                  <>
                    <Route
                      path="/*"
                      element={<Goals user_id={employeeID} pillars={pillars} />}
                    />
                    <Route
                      path="/:id"
                      element={<Goals user_id={employeeID} pillars={pillars} />}
                    />
                  </>
                ) : (
                  <>
                    <Route path="/*" element={<EmployeeGoals />} />
                  </>
                )}

                <Route
                  path="/create/*"
                  element={
                    <CreateGoals pillars={pillars} user_id={employeeID} />
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
