import React, { useState } from "react";
import classNames from "classnames";
import logo from "../assets/unmg_logo_plain_colored.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxDashboard, RxCounterClockwiseClock } from "react-icons/rx";
import { FaWpforms, FaSignature } from "react-icons/fa";
import {
  BsPeople,
  BsClipboard2Check,
  BsBuildings,
  BsPersonGear,
  BsJournalCheck,
} from "react-icons/bs";
import { GrUserAdmin, GrBarChart } from "react-icons/gr";
import { TbCalendarStats } from "react-icons/tb";
import { RiLineChartLine, RiLogoutCircleLine } from "react-icons/ri";
import NavButton from "./NavButton";

export default function Sidebar({ sidebarToggler, className }) {
  const [dropdown, toggleDropdown] = useState({
    forms: false,
    administrator: false,
  });

  return (
    <>
      <section
        className={classNames(
          "sidebar fixed top-0 left-0 w-[250px] bg-white h-full z-[20] p-2 flex flex-col gap-2 translate-x-[-100%] transition-all",
          "lg:absolute lg:h-[80%] lg:translate-x-[1.5rem] lg:translate-y-[4.7rem] lg:rounded-md shadow-lg xl:translate-x-[8rem]",
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
          <NavButton icon={<RxDashboard />} textLabel={"Dashboard"} slug={""} />
          <div className="flex flex-col">
            <NavButton
              isDropdown={true}
              dropdown={dropdown}
              icon={<FaWpforms />}
              textLabel={"KPI Management"}
              code={"forms"}
              onClick={toggleDropdown}
            />
            <div
              className={classNames(
                "pl-4 opacity-0 origin-top transition-all duration-300 bg-default rounded-md pointer-events-none",
                dropdown.forms ? "opacity-100 max-h-[15rem] pointer-events-auto" : "max-h-[0rem]"
              )}
            >
              <NavButton
                icon={<BsClipboard2Check />}
                textLabel={"Main Objectives"}
                slug={"main_objectives"}
              />
              <NavButton
                icon={<RiLineChartLine />}
                textLabel={"Tracking & Assessment"}
                slug={"tracking_and_assement"}
              />
              <NavButton
                icon={<FaSignature />}
                textLabel={"Agreement Sign-off"}
                slug={"sign_off"}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <NavButton
              isDropdown={true}
              dropdown={dropdown}
              icon={<GrUserAdmin />}
              textLabel={"Administration"}
              code={"admin"}
              onClick={toggleDropdown}
            />
            <div
              className={classNames(
                "pl-4 opacity-0 origin-top transition-all duration-500 bg-default rounded-md pointer-events-none",
                dropdown.administrator
                  ? "opacity-100 max-h-[30rem] pointer-events-auto"
                  : "max-h-[0rem]"
              )}
            >
              <NavButton
                icon={<BsPeople />}
                textLabel={"List of Employees"}
                slug={"employees"}
              />
              <NavButton
                icon={<BsPersonGear />}
                textLabel={"Roles"}
                slug={"roles"}
              />
              <NavButton
                icon={<BsBuildings />}
                textLabel={"Companies"}
                slug={"companies"}
              />
              <NavButton
                icon={<BsJournalCheck />}
                textLabel={"Company Plans"}
                slug={"company_plans"}
              />
              <NavButton
                icon={<RiLineChartLine />}
                textLabel={"View Evaluations"}
                slug={"view_evaluation"}
              />
              <NavButton
                icon={<GrBarChart />}
                textLabel={"Statistics"}
                slug={"statistics"}
              />
              <NavButton
                icon={<RxCounterClockwiseClock />}
                textLabel={"Logs"}
                slug={"logs"}
              />
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
