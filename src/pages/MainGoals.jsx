import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CreateGoals, EmployeeGoals, Goals } from "../components/Goals";
import { useFunction } from "../context/FunctionContext";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import axios from "axios";

export default function MainGoals() {
  const [panel, setPanel] = useState("My Goals");
  const [employeeID, setEmployeeID] = useState(
    JSON.parse(sessionStorage.getItem("currentUser")).users_id
  );
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
        return "Create Goals";
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
        console.log(response.data);
        setPillars(response.data);
      } catch (e) {
        console.log(e.message);
      }
    };

    getPillars();
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
                    className="flex flex-row items-center w-fit text-dark-gray text-[.9rem] bg-default-dark p-1 rounded-md"
                  >
                    <MdOutlineKeyboardArrowLeft />
                    <span>Back</span>
                  </a>
                )}
                {setHeader(getPath())}
              </span>
              {/* TOGGLE */}
              {["/main_goals/", "/main_goals"].includes(getPath()) && (
                <div
                  className={classNames(
                    "toggle flex flex-row gap-2 bg-default w-full p-1 rounded-full relative overflow-hidden z-[4] md:w-[400px]",
                    panel !== "My Goals" && "on"
                  )}
                >
                  <button
                    type="button"
                    className={classNames(
                      "toggle_text py-1 px-2 rounded-full text-[.8rem] z-[6] text-center w-1/2 md:text-[.8rem]",
                      panel === "My Goals" ? "text-white" : "text-black"
                    )}
                    onClick={() => {
                      setPanel("My Goals");
                    }}
                  >
                    My Goals
                  </button>
                  <button
                    type="button"
                    className={classNames(
                      "toggle_text py-1 px-2 rounded-full text-[.8rem] z-[6] w-1/2 text-center whitespace-nowrap md:text-[.8rem]",
                      panel === "Employee Goals" ? "text-white" : "text-black"
                    )}
                    onClick={() => {
                      setPanel("Employee Goals");
                    }}
                  >
                    Employee Goals
                  </button>
                </div>
              )}
            </div>
            {/* BODY */}
            <div>
              <Routes>
                {panel === "My Goals" ? (
                  <>
                    <Route path="/*" element={<Goals />} />
                    <Route path="/:id" element={<Goals />} />
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
