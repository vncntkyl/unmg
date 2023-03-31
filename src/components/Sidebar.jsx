import React, {useState} from "react";
import Navlink from "./Navlink";
import { RiDashboardLine } from "react-icons/ri";

export default function Sidebar() {
  const [navlink, togglenavlink] = useState({
   forms: false,
  administrator: false});
  return (
    <>
      <aside className="bg-white h-[88%] w-[20vw] fixed z-2 top-16 left-0 m-2 rounded">
      <Navlink icon={<RiDashboardLine />} label="Dashboard" />
        <div className="items">
          <Navlink icon={<RiDashboardLine />} panel={"forms"} navlink={navlink} label="Forms" togglenavlink={togglenavlink} isDropdown={true}/>
          {
            navlink.forms && (
                <div className="pl-4">
                <Navlink icon={<RiDashboardLine />} label="goodbye"/>
                </div>
            )
        }
        </div>
        <Navlink icon={<RiDashboardLine />} panel={"administrator"} label="Administrator" togglenavlink={togglenavlink} isDropdown={true}/>
        {
            navlink.administrator && (
                <div className="pl-4">
                <Navlink icon={<RiDashboardLine />} label="goodbye"/>
                <Navlink icon={<RiDashboardLine />} label="goodbye"/>
                <Navlink icon={<RiDashboardLine />} label="goodbye"/>
                <Navlink icon={<RiDashboardLine />} label="goodbye"/>
                <Navlink icon={<RiDashboardLine />} label="goodbye"/>
                <Navlink icon={<RiDashboardLine />} label="goodbye"/>
                </div>
            )
        }
      </aside>

    </>
  );
}
