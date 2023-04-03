import React, { useState } from "react";
import classNames from "classnames";
import logo from "../assets/unmg_logo_plain_colored.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import { BsPeople, BsClipboard2Check, BsChat } from "react-icons/bs";
import { GrInProgress, GrUserAdmin } from "react-icons/gr";
import { TbCalendarStats } from "react-icons/tb";
import { RiLineChartLine } from "react-icons/ri";
import NavButton from "./NavButton";

export default function Sidebar({ sidebarToggler, className }) {
  const [dropdown, toggleDropdown] = useState({
    regular: false,
    probation: false,
    administrator: false,
  });
  return (
    <>
      <section
        className={classNames(
          "sidebar fixed top-0 left-0 w-[250px] bg-white h-full z-[20] p-2 flex flex-col gap-2 translate-x-[-100%] transition-all",
          "lg:absolute lg:w-[320px] lg:translate-x-[1.5rem] lg:translate-y-[4.7rem] lg:rounded-md shadow-lg xl:translate-x-[8rem]",
          className
        )}
      >
        <div className="w-full flex justify-end lg:hidden">
          <GiHamburgerMenu
            className="text-un-blue text-[1.5rem] cursor-pointer"
            onClick={() => sidebarToggler(false)}
          />
        </div>
        <div className="flex w-full justify-start gap-1 items-center lg:hidden">
          <img src={logo} alt="unmg_logo" className="h-7 w-auto md:h-10" />
          <span className="text-black text-[.67rem] font-medium">
            United Neon Media Group
            <br />
            Performance Management System
          </span>
        </div>
        <section className="w-full flex flex-col py-2 lg:py-0">
          <NavButton
            icon={<RxDashboard />}
            textLabel={"Dashboard"}
            slug={"dashboard"}
          />
          <div className="flex flex-col">
            <NavButton
              isDropdown={true}
              dropdown={dropdown}
              icon={<BsPeople />}
              textLabel={"Regular Employees"}
              code={"reg"}
              onClick={toggleDropdown}
            />
            <div
              className={classNames(
                "pl-4 scale-0 origin-top-left transition-all duration-200 bg-[#00000015] rounded-sm",
                dropdown.regular ? "scale-100 max-h-[10rem]" : "max-h-[0rem]"
              )}
            >
              <NavButton
                icon={<BsClipboard2Check />}
                textLabel={"Main Objectives"}
                slug={"main_objectives"}
              />
              <NavButton
                icon={<TbCalendarStats />}
                textLabel={"Quarterly Performance"}
                slug={"quarterly_performance"}
              />
              <NavButton
                icon={<RiLineChartLine />}
                textLabel={"Evaluation"}
                slug={"evaluation"}
              />
              <NavButton
                icon={<BsChat />}
                textLabel={"Discussion"}
                slug={"discussion"}
              />
            </div>
          </div>
          <div className="">
            <NavButton
              isDropdown={true}
              dropdown={dropdown}
              icon={<GrInProgress />}
              textLabel={"Probationary"}
              code={"prob"}
              onClick={toggleDropdown}
            />
            <div className="nav_dropdown"></div>
          </div>
          <div className="">
            <NavButton
              isDropdown={true}
              dropdown={dropdown}
              icon={<GrUserAdmin />}
              textLabel={"Administrator"}
              code={"adm"}
              onClick={toggleDropdown}
            />
            <div className="nav_dropdown"></div>
          </div>
        </section>
      </section>
    </>
  );
}
