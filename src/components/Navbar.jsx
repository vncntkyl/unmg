import React, { useEffect, useState } from "react";
import logo from "../assets/unmg_logo_plain.png";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { BiDownArrow } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import classNames from "classnames";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useFunction } from "../context/FunctionContext";
import axios from "axios";
import { developmentAPIs as url } from "../context/apiList";
import { format } from "date-fns";
import AlertModal from "../misc/AlertModal";
import { Tabs } from "flowbite-react";
import { Popover } from "flowbite-react";
export default function Navbar({
  notification_count,
  user_data,
  sidebarToggler,
}) {
  const { setCurrentUser, currentUser, usertypeList } = useAuth();
  const {
    getPath,
    capitalize,
    capitalizePath,
    formatName,
    capitalizeSentence,
  } = useFunction();
  const [imgProfile, setImgProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [panel, togglePanel] = useState({
    notification: false,
    user: false,
  });
  const [modal, setModal] = useState("standby");
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser([]);
    navigate("/login");
  };
  const getNotification = async () => {
    const parameters = {
      params: {
        logs: true,
        employee_id: JSON.parse(localStorage.getItem("currentUser"))
          .employee_id,
      },
    };
    try {
      const response = await axios.get(url.retrieveNotifications, parameters);
      setNotifications(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDeleteNotifications = async () => {
    try {
      const fData = new FormData();
      fData.append("submit", true);
      fData.append(
        "employee_id",
        JSON.parse(localStorage.getItem("currentUser")).employee_id
      );
      const response = await axios.post(url.deleteNotifications, fData);
      if (response.data === "success") {
        setModal("success");
        setModalMessage("Notifications deleted successfully!");
      }
    } catch (e) {
      console.log(e.message);
      setModal("success");
      setModalMessage(e.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getNotification();
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const setImg = async () => {
      if (!currentUser["picture"]) return;
      try {
        const image = await import("./" + currentUser["picture"]);
        setImgProfile(image.default);
      } catch (e) {
        console.log(e.message);
      }
    };
    setImg();
  }, []);
  const userType = JSON.parse(currentUser).user_type;
  const handleViewNotification = async (ID, link) => {
    try {
      const fData = new FormData();
      fData.append("submit", true);
      fData.append("notifID", ID);
      const response = await axios.post(url.seenNotifications, fData);
      if (response.data === "success") {
        navigate(link);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    user_data && (
      <>
        <nav
          className={classNames(
            "w-[100%] mx-auto px-4 py-2 grid grid-cols-[.5fr_1fr_s1fr] gap-2 md:px-6 md:flex md:gap-4 md:justify-between xl:px-18 z-[10]",
            userType <= 2
              ? "bg-un-blue"
              : userType >= 3 && userType <= 5
              ? "bg-un-red-dark-1"
              : "bg-dark-gray"
          )}
        >
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
              {usertypeList?.length > 0 &&
                currentUser != [] &&
                capitalize(
                  usertypeList?.find(
                    (usertype) =>
                      usertype.job_level_id == JSON.parse(currentUser).user_type
                  ).job_level_name === "rank and file"
                    ? "employee"
                    : usertypeList?.find(
                        (usertype) =>
                          usertype.job_level_id ==
                          JSON.parse(currentUser).user_type
                      ).job_level_name
                )}{" "}
              /{" "}
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
            <Popover
              aria-labelledby="default-popover"
              placement="bottom"
              content={
                <div className="animate-fade w-[30rem]">
                  <Tabs
                    className="pt-1 px-2"
                    aria-label="Default tabs"
                    theme={{
                      tablist: {
                        tabitem: {
                          base: "px-2 py-1 focus:ring-0 hover:bg-default",
                          styles: {
                            default: {
                              active: {
                                on: "bg-un-red text-white hover:bg-un-red",
                              },
                            },
                          },
                        },
                      },
                    }}
                  >
                    <Tabs.Item active title="All">
                      <ul className="max-h-[20rem] overflow-y-scroll">
                        {notifications.length > 0 ? (
                          notifications?.map((notification) => (
                            <li
                              className={classNames(
                                "group relative px-2 text-left hover:bg-default-dark cursor-pointer border-b border-default",
                                parseInt(notification.seen) === 0
                                  ? "bg-default"
                                  : "bg-white text-mid-gray"
                              )}
                              key={notification.ID}
                              onClick={() =>
                                handleViewNotification(
                                  notification.ID,
                                  notification.link
                                )
                              }
                            >
                              <div
                                // href={notification.link}
                                className="py-2 flex flex-col justify-center items-start"
                              >
                                <span className="text-[0.9rem] font-semibold">
                                  {notification.title}
                                </span>
                                <p className="ml-2 text-[0.8rem]">
                                  {notification.message}
                                </p>
                              </div>
                              <div
                                className={classNames(
                                  "right-0 bottom-0 p-2 flex flex-col text-end text-[0.8rem] group-hover:bg-default-dark",
                                  parseInt(notification.seen) === 0
                                    ? "bg-default"
                                    : "bg-white group-hover:bg-default"
                                )}
                              >
                                <span>
                                  {format(
                                    new Date(notification.creation_date),
                                    "dd/MM/yyyy hh:mm a"
                                  )}
                                </span>
                              </div>
                            </li>
                          ))
                        ) : (
                          <li className="group text-left px-2">
                            There are no new notifications.
                          </li>
                        )}
                      </ul>
                    </Tabs.Item>
                    <Tabs.Item title="Unread">
                      <ul className="max-h-[20rem] overflow-y-scroll">
                        {notifications.length > 0 ? (
                          notifications
                            ?.filter((item) => parseInt(item.seen) === 0)
                            .map((notification) => (
                              <li
                                className="group relative px-2 text-left bg-default hover:bg-default-dark"
                                key={notification.ID}
                                onClick={() =>
                                  handleViewNotification(
                                    notification.ID,
                                    notification.link
                                  )
                                }
                              >
                                <div
                                  // href={notification.link}
                                  className="py-2 flex flex-col justify-center items-start"
                                >
                                  <span className="text-[0.9rem] font-semibold">
                                    {notification.title}
                                  </span>
                                  <p className="ml-2 text-[0.8rem]">
                                    {notification.message}
                                  </p>
                                </div>
                                <div className="group-hover:bg-default-dark right-0 bottom-0 p-2 flex flex-col text-end text-[0.8rem]">
                                  <span>
                                    {format(
                                      new Date(notification.creation_date),
                                      "dd/MM/yyyy hh:mm a"
                                    )}
                                  </span>
                                </div>
                              </li>
                            ))
                        ) : (
                          <li className="group text-left px-2">
                            There are no new notifications.
                          </li>
                        )}
                      </ul>
                    </Tabs.Item>
                    <Tabs.Item title="Read">
                      <ul className="max-h-[20rem] overflow-y-scroll">
                        {notifications.length > 0 ? (
                          notifications
                            ?.filter((item) => parseInt(item.seen) === 1)
                            .map((notification) => (
                              <li
                                className="group relative px-2 text-left hover:bg-default-dark cursor-pointer"
                                key={notification.ID}
                                onClick={() =>
                                  handleViewNotification(
                                    notification.ID,
                                    notification.link
                                  )
                                }
                              >
                                <div
                                  // href={notification.link}
                                  className="py-2 flex flex-col justify-center items-start"
                                >
                                  <span className="text-[0.9rem] font-semibold">
                                    {notification.title}
                                  </span>
                                  <p className="ml-2 text-[0.8rem]">
                                    {notification.message}
                                  </p>
                                </div>
                                <div className="bg-white group-hover:bg-default-dark right-0 bottom-0 p-2 flex flex-col text-end text-[0.8rem]">
                                  <span>
                                    {format(
                                      new Date(notification.creation_date),
                                      "dd/MM/yyyy hh:mm a"
                                    )}
                                  </span>
                                </div>
                              </li>
                            ))
                        ) : (
                          <li className="group text-left px-2">
                            There are no new notifications.
                          </li>
                        )}
                      </ul>
                    </Tabs.Item>
                  </Tabs>
                  <div className="flex items-center justify-center py-2 border-t border-default">
                    <button
                      type="button"
                      className="text-un-blue-light hover:text-un-blue text-[0.8rem] underline"
                      onClick={() => setModal("confirmation")}
                    >
                      Delete All Notifications
                    </button>
                  </div>
                </div>
              }
            >
              <button
                data-count={
                  notifications &&
                  notifications?.filter((notif) => parseInt(notif.seen) === 0)
                    .length
                }
                className="relative before:block before:absolute before:content-[attr(data-count)] before:top-[-5px] before:right-[-5px] before:text-tooltip before:text-white before:bg-un-red before:w-[1rem] before:h-[1rem] sm:before:w-[1.1rem] sm:before:h-[1.1rem] before:rounded-full ml-3"
              >
                <FaBell className="text-white text-[1.2rem] sm:text-[1.5rem]" />
              </button>
            </Popover>
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
                    <a href="/help">Help</a>
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
        {modal === "confirmation" && (
          <AlertModal
            closeModal={setModal}
            modalType={"confirmation"}
            title={"Delete Notifications"}
            message={
              "Are you sure you want to delete all of your notifications?"
            }
            handleContinue={() => {
              handleDeleteNotifications();
            }}
          />
        )}
        {modal === "success" && (
          <AlertModal
            closeModal={setModal}
            modalType={"status"}
            modalStatus={
              modalMessage === "Notifications deleted successfully!"
                ? "success"
                : "error"
            }
            message={modalMessage}
            continuebutton={"Confirm"}
            handleContinue={() => {
              handleSuccess();
              setModal("standby");
            }}
            handleSuccess={() => {
              navigate(0);
            }}
          />
        )}
      </>
    )
  );
}
