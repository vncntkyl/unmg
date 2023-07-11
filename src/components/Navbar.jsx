import React, { useEffect, useState } from "react";
import logo from "../assets/unmg_logo_plain.png";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { BiDownArrow } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import classNames from "classnames";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useFunction } from "../context/FunctionContext";

export default function Navbar({
  notification_count,
  user_data,
  sidebarToggler,
}) {
  const { setCurrentUser } = useAuth();
  const {
    getPath,
    capitalize,
    capitalizePath,
    formatName,
    capitalizeSentence,
  } = useFunction();
  const [imgProfile, setImgProfile] = useState(null);
  const [panel, togglePanel] = useState({
    notification: false,
    user: false,
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser([]);
    navigate("/login");
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const setImg = async () => {
      try {
        const image = await import("./" + currentUser["picture"]);
        setImgProfile(image.default);
      } catch (error) {
        console.log(error.message);
      }
    };
    setImg();
  }, []);
  return (
    user_data && (
      <>
        <nav className="w-[100%] bg-un-blue mx-auto px-4 py-2 grid grid-cols-[.5fr 1fr 1fr] gap-2 md:px-6 md:flex md:gap-4 md:justify-between xl:px-32 z-[10]">
          <div className=" col-[1/2] flex flex-row gap-2 py-2 items-center w-fit">
            <img
              src={logo}
              alt="unmg_logo"
              className="hidden h-7 w-auto md:h-10 lg:block"
            />
            <GiHamburgerMenu
              className="text-white text-[1.5rem] cursor-pointer lg:hidden"
              onClick={() => sidebarToggler(true)}
            />
            <span className="hidden text-white text-[.8rem] md:text-[.9rem] font-medium lg:block">
              United Neon Media Group
              <br />
              Performance Management System
            </span>
          </div>
          <div className="nav_page col-[2/3] flex items-center md:mr-auto">
            <span className="crumbs text-white text-[.8rem] text-sm md:text-lg sm:text-[.9rem]">
              Admin /{" "}
              <span className="font-semibold text-[.9rem] sm:text-[1.2rem]">
                {getPath() === "/"
                  ? "Dashboard"
                  : capitalizeSentence(capitalizePath(getPath()))}
              </span>
            </span>
          </div>
          <div className="nav_user relative col-[3/4] flex-shrink-0 flex items-center justify-end p-1 gap-2">
            <span className="text-white text-sm md:text-lg font-medium hidden lg:block">
              Welcome {capitalize(user_data.first_name)}!
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
              className="relative before:block before:absolute before:content-[attr(data-count)] before:top-[-5px] before:right-[-5px] before:text-tooltip before:text-white before:bg-un-red before:w-[1rem] before:h-[1rem] sm:before:w-[1.1rem] sm:before:h-[1.1rem] before:rounded-full ml-3"
            >
              <FaBell className="text-white text-[1.2rem] sm:text-[1.5rem]" />
              <div
                className={classNames(
                  "notification_panel",
                  !panel.notification && "hidden",
                  "absolute top-full right-0 w-[max-content] mt-4 bg-white py-2 px-3 rounded-md shadow-md animate-fade z-[10]"
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
            </button>
            <div className="user_dropdown relative ml-3 group/user">
              <button
                className="flex text-sm rounded-full bg-white items-center gap-1 transition-all group-hover/user:pr-1 lg:pr-0 lg:bg-transparent lg:group-hover/user:pr-0"
                onClick={() => {
                  togglePanel((prev) => {
                    return {
                      notification: false,
                      user: !prev.user,
                    };
                  });
                }}
              >
                {user_data && imgProfile ? (
                  <>
                    <img
                      src={imgProfile}
                      alt=""
                      className="h-8 w-8 rounded-full"
                    />
                  </>
                ) : (
                  <>
                    <FaUserCircle className="text-un-blue text-[1.7rem] lg:text-white" />
                  </>
                )}
                {user_data && user_data.username && (
                  <>
                    <span className="hidden text-[.9rem] group-hover/user:block lg:hidden group-hover/user:lg:hidden">
                      {user_data.username}
                    </span>
                  </>
                )}
                <BiDownArrow
                  className={classNames(
                    panel.user && "rotate-180",
                    "transition-all ease-in-out duration-300 hidden group-hover/user:block lg:hidden group-hover/user:lg:hidden"
                  )}
                />
              </button>
              <div
                className={classNames(
                  "user_panel",
                  !panel.user && "hidden",
                  "absolute top-full right-0 w-[max-content] mt-3 bg-white py-2 px-3 rounded-md shadow-md animate-fade z-[10]"
                )}
              >
                <ul>
                  <li className="p-2 text-end">
                    <a
                      href={`/account/${formatName(user_data.first_name)}_${
                        user_data.last_name
                      }`}
                    >
                      Account Settings
                    </a>
                  </li>
                  <li className="p-2 text-end">
                    <a
                      href="/help"
                    >
                      Help
                    </a>
                  </li>
                  <li className="p-2 text-end">
                    <button type="button" onClick={() => handleLogout()}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className={classNames(
                "bg-[#00000000] fixed h-full w-full z-[8] top-0 left-0 animate-fade pointer-events-auto",
                !panel.user &&
                  !panel.notification &&
                  "hidden pointer-events-none"
              )}
              onClick={() =>
                togglePanel({
                  notification: false,
                  user: false,
                })
              }
            />
          </div>
        </nav>
      </>
    )
  );
}
