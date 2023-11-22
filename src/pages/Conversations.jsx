import React, { useState, useEffect } from "react";
import { useNavigate, Route, Router, Routes } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useFunction } from "../context/FunctionContext";
import classNames from "classnames";
import ConversationSideBar, { SidebarItem } from "../components/Conversations/ConversationSideBar";
import Planning from "../components/Conversations/Planning";
import Evaluations from "../components/Conversations/Evaluations";
import Discussions from "../components/Conversations/Discussions";
import DirectionalRedirectional from "../components/Conversations/DirectionalRedirectional";
import Coaching from "../components/Conversations/Coaching";
import PIP from "../components/Conversations/PIP";
import { FaRegLightbulb, FaPeopleArrows, FaHeadset } from "react-icons/fa";
import { BsClipboard2Check, BsCalendar2Week } from "react-icons/bs";
import { SlDirections } from "react-icons/sl";

export default function Conversations() {
  const [loading, toggleLoading] = useState(true);
  const [employeeID, setEmployeeID] = useState(-1);
  const { currentUser } = useAuth();
  const { getPath } = useFunction();
  const linkActive = getPath().split("/")[2];
console.log(linkActive);
  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    ).employee_id;
    if (currentUser) {
      toggleLoading(false);
    }
    setEmployeeID(currentUser);
  }, []);

  const userType = JSON.parse(currentUser).user_type;
  return (
    employeeID !== -1 &&
    (loading ? (
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
            <div className="h-[90vh] bg-white p-2 rounded-md flex flex-col shadow-md justify-between">
              {/* HEADER */}
              <div className="flex flex-col items-center justify-between md:flex-row">
                <span className="text-un-blue text-[1.2rem] font-semibold text-start w-full flex flex-row items-center gap-2">
                  Conversations
                </span>
              </div>
              <div className="h-full w-full flex">
                <ConversationSideBar>
                  <SidebarItem
                    icon={<FaRegLightbulb className="text-[0.8rem] lg:text-[1rem]" />}
                    text="Planning"
                    link="./planning"
                    active={linkActive === "planning"}
                  />
                  <SidebarItem
                    icon={<BsClipboard2Check className="text-[0.8rem] lg:text-[1rem]" />}
                    text="Evaluations"
                    link="./evaluations"
                    active={linkActive === "evaluations"}
                  />
                  <SidebarItem
                    icon={<FaPeopleArrows className="text-[0.8rem] lg:text-[1rem]" />}
                    text="1 on 1"
                    link="./1_on_1"
                    active={linkActive === "1_on_1"}
                  />
                  <SidebarItem
                    icon={<SlDirections className="text-[0.8rem] lg:text-[1rem]" />}
                    text="Directional/Redirectional"
                    link="./directional_redirectional"
                    active={linkActive === "directional_redirectional"}
                  />
                  <SidebarItem
                    icon={<FaHeadset className="text-[0.8rem] lg:text-[1rem]" />}
                    text="Coaching"
                    link="./coaching"
                    active={linkActive === "coaching"}
                    alert
                  />
                  <SidebarItem
                    icon={<BsCalendar2Week className="text-[0.8rem] lg:text-[1rem]" />}
                    text="PIP"
                    link="./performance_improvement_plan"
                    active={linkActive === "performance_improvement_plan"}
                    alert
                  />
                </ConversationSideBar>
                <Routes>
                  <Route path="/planning" element={<Planning/>}/>
                  <Route path="/evaluations" element={<Evaluations />}/>
                  <Route path="/1_on_1" element={<Discussions />}/>
                  <Route path="/directional_redirectional" element={<DirectionalRedirectional />}/>
                  <Route path="/coaching" element={<Coaching />}/>
                  <Route path="/performance_improvement_plan" element={<PIP />}/>
                </Routes>
                {linkActive === undefined ? (<div className="w-full flex items-center justify-center text-[1.5rem] font-bold">No Conversation Selected</div>) : ""}
              </div>
            </div>
          </div>
        </section>
      </>
    ))
  );
}
