import React from "react";
import logo from "../assets/unmg_logo.png";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { BiDownArrow } from "react-icons/bi";
function Navbar({notification}) {
  return (
    <>
      <nav className="bg-un-blue p-10">
        <img src={logo} alt="logo" className="" />
        <span className="text-white text-base">Dashboard</span>
        <button data-count={notification} className="relative before:block before:absolute before:content-[attr(data-count)] before:text-white before:text-tooltip before:w-5 before:h-5 before:bg-un-red before:top-[-5px] before:right-[-5px] before:rounded-full"><FaBell className="text-white text-[1.5rem]" /></button>
        <button className="border border-white h-10 w-20 rounded-full flex justify-end items-center p-2 before:content-[{FaUserCircle}]"><BiDownArrow className="text-white"/></button>
      </nav>
    </>
  );
}

export default Navbar;
