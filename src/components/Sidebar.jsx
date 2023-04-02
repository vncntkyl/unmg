import React, { useState } from "react";
import classNames from "classnames";
import logo from "../assets/unmg_logo_plain_colored.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import { BsPeople } from "react-icons/bs";
import { GrInProgress, GrUserAdmin } from "react-icons/gr";
import NavButton from "./NavButton";
export default function Sidebar({ sidebarToggler }) {
    const [dropdown, toggleDropdown] = useState({});
  return (
    <>
      <section className="sidebar fixed top-0 left-0 w-[250px] bg-white h-full animate-slide-right z-[5] p-2 flex flex-col gap-2">
        <div className="w-full flex justify-end">
          <GiHamburgerMenu
            className="text-un-blue-light text-[2rem]"
            onClick={() => sidebarToggler(false)}
          />
        </div>
        <div className="flex w-full justify-start gap-1 items-center">
          <img src={logo} alt="unmg_logo" className="h-7 w-auto md:h-10" />
          <span className="text-black text-[.67rem] font-medium">
            United Neon Media Group
            <br />
            Performance Management System
          </span>
        </div>
        <section className="w-full flex flex-col py-4">
          <NavButton icon={<RxDashboard />} textLabel={"Dashboard"} />
          <div className="flex flex-col">
            <NavButton
              isDropdown={true}
              icon={<BsPeople />}
              textLabel={"Regular Employees"}
            />
            <div className={classNames("pl-4 scale-0 origin-top h-0")}>
              <NavButton icon={<RxDashboard />} textLabel={"Dashboard"} />
            </div>
          </div>
          <div className="">
            <NavButton
              isDropdown={true}
              icon={<GrInProgress />}
              textLabel={"Probationary"}
            />
            <div className="nav_dropdown"></div>
          </div>
          <div className="">
            <NavButton
              isDropdown={true}
              icon={<GrUserAdmin />}
              textLabel={"Administrator"}
            />
            <div className="nav_dropdown"></div>
          </div>
        </section>
      </section>
    </>
  );
}
