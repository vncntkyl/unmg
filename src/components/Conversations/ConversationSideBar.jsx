import React, { createContext, useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { FaPencilAlt } from "react-icons/fa";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";

const SidebarContext = createContext();
export default function ConversationSideBar({ children }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <>
      <div className="flex flex-col mt-5 mr-2">
        <div className={`ml-2 flex overflow-hidden transition-all gap-1 pr-2 ${expanded ? "justify-between" : "flex-col-reverse"}`}>
          <button className={`bg-mid-gray rounded-md text-white hover:bg-dark-gray flex items-center justify-center text-[1rem] transition-all overflow-hidden ${expanded ? "w-32 gap-2 px-4 py-2" : "w-10 px-2 py-3"}`}>
           <FaPencilAlt className="text-[1rem]"/>{expanded && "Compose"}
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-10 px-3 py-1 bg-default hover:bg-default-dark flex items-center justify-center text-center rounded-lg">
            {expanded ? <BsArrowBarLeft className="text-[2rem]" /> : <BsArrowBarRight className="text-[2rem]" />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
        <ul className="px-2">{children}</ul>
        </SidebarContext.Provider>
      </div>
    </>
  );
}
export function SidebarItem({ icon, text, active, alert }) {
    const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 rounded-md cursor-pointer select-none group
        ${active ? "bg-default-dark" : "hover:bg-default"}`}
    >
      {icon}
      <span className={`overflow-hidden whitespace-nowrap transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-un-red-light ${expanded ? "" : "top-2"}`}
        ></div>
      )}

      {!expanded && <div className={`absolute left-full whitespace-nowrap rounded-md px-2 py-1 ml-6 bg-black text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>{text}</div>}
    </li>
  );
}
