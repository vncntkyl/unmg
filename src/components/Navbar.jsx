import React from "react";
import logo from "../assets/unmg_logo_plain.png";
import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Navbar({ notification_count, user_img }) {
  return (
    <>
      <nav className="bg-un-blue flex p-4 max-h-24 justify-between gap-4 items-center">
        <div className="nav_brand flex flex-row gap-4 items-center w-[400px]">
          <img src={logo} alt="unmg_logo" className="h-[50px]"/>
          <span className="text-white">
            United Neon Media Group<br />Performance Management System
          </span>
        </div>
        <div className="nav_page mr-auto flex flex-col">
          <span className="crumbs text-white text-[.8rem]">Admin / Dashboard</span>
          <span className="text-white text-[1.5rem] font-semibold">Dashboard</span>
        </div>
        <div className="nav_user flex flex-row gap-3 items-center">
          <span className="text-white">Welcome Juan Dela Cruz</span>
          <button
            data-count={notification_count}
            className="relative
          before:block before:absolute before:content-[attr(data-count)] before:top-[-5px] before:right-[-5px] before:text-tooltip before:text-white before:bg-un-red before:w-[1.1rem] before:h-[1.1rem] before:rounded-full"
          >
            <FaBell className="text-white text-[1.5rem]" />
          </button>
          <div className="user_dropdown relative">
            <button className="">
              {user_img ? (
                <>
                  <img src="" alt="" />
                </>
              ) : (
                <>
                  <FaUserCircle className="text-white text-[1.7rem]"/>
                </>
              )}
            </button>
            <div className="user_panel absolute top-[100%] right-0 w-[max-content] bg-white py-2 px-3 rounded-md shadow-md">
                <ul>
                    <li><a href="/account-settings">Account Settings</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
