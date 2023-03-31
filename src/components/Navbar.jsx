import React, { useState } from "react";
import logo from "../assets/unmg_logo_plain.png";
import { FaBell, FaUserCircle } from "react-icons/fa";
import classNames from "classnames";

export default function Navbar({ notification_count, user_img }) {
  const [panel, togglePanel] = useState({
    notification: false,
    user: false,
  });
  return (
    <>
      <nav className="bg-un-blue mx-auto px-4 py-2 grid grid-cols-2 md:px-6 md:flex md:gap-4 md:justify-between">
        <div className="nav_brand col-[1/3] flex flex-row gap-2 py-2 items-center justify-center">
          <img src={logo} alt="unmg_logo" className="h-7 w-auto md:h-10" />
          <span className="text-white text-[.8rem] md:text-[.9rem] font-medium">
            United Neon Media Group
            <br />
            Performance Management System
          </span>
        </div>
        <div className="nav_page col-[1/2] flex items-center md:mr-auto">
          <span className="crumbs text-white text-sm md:text-lg">
            Admin /{" "}
            <span className="font-semibold text-[1.3rem]">Dashboard</span>
          </span>
          <span className="hidden text-white text-[1.5rem] font-semibold">
            Dashboard
          </span>
        </div>
        <div className="nav_user relative col-[2/3] flex-shrink-0 flex items-center justify-end p-1 gap-2">
          <span className="text-white text-sm md:text-lg font-medium hidden">
            Welcome Juan Dela Cruz
          </span>
          <button
            onClick={() =>
              togglePanel((prev) => {
                return {
                  notification: !prev.notification,
                  user: false,
                };
              })
            }
            data-count={notification_count}
            className="relative before:block before:absolute before:content-[attr(data-count)] before:top-[-5px] before:right-[-5px] before:text-tooltip before:text-white before:bg-un-red before:w-[1.1rem] before:h-[1.1rem] before:rounded-full ml-3"
          >
            <div
              className={classNames(
                "notification_panel",
                !panel.notification && "hidden",
                "absolute top-full right-0 w-[max-content] mt-4 bg-white py-2 px-3 rounded-md shadow-md"
              )}
            >
              <ul>
                <li className="p-2">
                  <a href="/account-settings">Notification 1</a>
                </li>
                <li className="p-2">
                  <a href="/logout">Notification 2</a>
                </li>
              </ul>
            </div>
            <FaBell className="text-white text-[1.5rem]" />
          </button>
          <div className="user_dropdown relative ml-3">
              <button
                className="flex text-sm rounded-full"
                onClick={() =>
                  togglePanel((prev) => {
                    return {
                      notification: false,
                      user: !prev.user,
                    };
                  })
                }
              >
                {user_img ? (
                  <>
                    <img src="" alt="" className="h-8 w-8 rounded-full" />
                  </>
                ) : (
                  <>
                    <FaUserCircle className="text-white text-[1.7rem]" />
                  </>
                )}
              </button>
            <div
              className={classNames(
                "user_panel",
                !panel.user && "hidden",
                "absolute top-full right-0 w-[max-content] mt-3 bg-white py-2 px-3 rounded-md shadow-md"
              )}
            >
              <ul>
                <li className="p-2 text-end">
                  <a href="/account-settings">Account Settings</a>
                </li>
                <li className="p-2 text-end">
                  <a href="/logout">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
