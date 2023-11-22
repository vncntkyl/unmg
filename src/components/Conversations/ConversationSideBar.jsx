import React, { createContext, useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { FaPencilAlt } from "react-icons/fa";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const SidebarComponent = createContext();
export default function ConversationSideBar({ children }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <>
      <div className="lg:flex lg:flex-col mt-10 mr-2">
        <div className={`lg:ml-2 flex overflow-hidden transition-all gap-1 lg:mr-2 ${expanded ? "flex-col-reverse lg:flex-row lg:justify-between" : "flex-col-reverse"}`}>
          <button className={`outline-none bg-mid-gray rounded-md text-white hover:bg-dark-gray flex items-center justify-center text-[0.8rem] lg:text-[1rem] transition-all overflow-hidden ${expanded ? "px-2 py-3 lg:w-32 lg:gap-2 lg:px-4 lg:py-2" : "w-10 px-2 py-3"}`}>
            <FaPencilAlt className="text-[0.8rem] lg:text-[1rem]" /><span className="hidden lg:block">{expanded && "Compose"}</span>
          </button>
          <button
            onClick={() => setExpanded(previous => !previous)}
            className="hidden lg:flex lg:items-center lg:justify-center w-10 px-3 py-1 bg-default hover:bg-default-dark text-center rounded-lg">
            {expanded ? <BsArrowBarLeft className="text-[2rem]" /> : <BsArrowBarRight className="text-[2rem]" />}
          </button>
        </div>
        <SidebarComponent.Provider value={{ expanded }}>
          <ul className="lg:px-2">{children}</ul>
        </SidebarComponent.Provider>
      </div>
    </>
  );
}
export function SidebarItem({ icon, text, active, alert, link }) {
  const { expanded } = useContext(SidebarComponent);
  return (
    <Link
      to={link}
      className={classNames("relative flex items-center py-2 px-3 my-1 rounded-md cursor-pointer select-none group", active ? "bg-default-dark" : "hover:bg-default")}
    >
      {icon}
      <span className={classNames("overflow-hidden whitespace-nowrap transition-all", expanded ? "w-0 ml-0 lg:w-52 lg:ml-3" : "w-0")}>{text}</span>
      {alert && (
        <div
          className={classNames("absolute right-2 w-2 h-2 rounded bg-un-red-light",!expanded ? "top-2" : "top-2 lg:top-4")}
        ></div>
      )}

      {!expanded && <div className="absolute left-full whitespace-nowrap rounded-md px-2 py-1 ml-6 bg-black text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">{text}</div>}
    </Link>
  );
}
