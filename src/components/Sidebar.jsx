import React from "react";
import { FaUserAlt } from "react-icons/fa";
import logo from "../assets/unmg_logo_plain.png";

export default function Sidebar() {

    return (
    <>
      <aside className="group bg-un-blue flex max-w-xs sticky inset-y-0 items-start justify-center hover:opacity-0 pointer-events-none">
        <div className="flex flex-row items-center gap-4 p-4 justify-between">
          <img src={logo} alt="United Neon Logo"  className="w-1/4"/>
          <span className="text-white font-sans group-hover:hidden">
            United Neon Performance Management System
          </span>
        </div>
      </aside>
    </>
  );
}