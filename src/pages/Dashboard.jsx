import React, { useEffect, useState } from "react";
import { Navbar, Sidebar } from "../components";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import Overview from "../components/Overview";
import MainOverview from "../components/MainOverview";
export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebar, toggleSidebar] = useState(false);
  const [panel, setPanel] = useState("regular");
  const [loader, toggleLoader] = useState(true);
  const [user, setUser] = useState({});
  let xDown = null;

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
  }

  function handleTouchMove(evt) {
    if (!xDown) {
      return;
    }
    let xDiff = xDown - evt.touches[0].clientX;
    if (xDown < 50 && xDiff < 0) {
      toggleSidebar(true);
    }
    xDown = null;
  }

  function handleTouchEnd(evt) {
    xDown = null;
  }

  useEffect(() => {
    if (!sessionStorage.getItem("currentUser")) {
      navigate("/login");
    } else {
      setUser(JSON.parse(sessionStorage.getItem("currentUser")));
      toggleLoader(false);
    }
    if (window.innerWidth < 1024) {
      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);

      // Remove touch event listeners on unmount
      return () => {
        document.removeEventListener("touchstart", handleTouchStart);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, []);
  return !loader ? (
    <>
      <Navbar
        notification_count={0}
        user_data={user}
        sidebarToggler={toggleSidebar}
      />
      <div className=" min-h-screen">
        <Sidebar
          sidebarToggler={toggleSidebar}
          className={classNames(sidebar && "translate-x-[0%]")}
        />
        <div
          className={classNames(
            "bg-[#00000050] fixed h-full w-full z-[12] top-0 left-0 animate-fade pointer-events-auto",
            !sidebar && "hidden pointer-events-none"
          )}
          onClick={() => toggleSidebar(false)}
        />
        {/* DASHBOARD MAIN */}

          {/* toggler */}
        <div className="w-full bg-un-blue px-4 lg:pl-[18rem] xl:pl-[24.5rem]">
          <div
            className={classNames(
              "toggle flex flex-row gap-2 bg-white w-[200px] p-1 rounded-full relative overflow-hidden z-[4]",
              panel !== "regular" && "on"
            )}
          >
            <button
              type="button"
              className={classNames(
                "toggle_text py-1 px-2 rounded-full text-[.9rem] z-[6] w-1/2",
                panel === "regular" ? "text-white" : "text-black"
              )}
              onClick={() => {
                setPanel("regular");
              }}
            >
              Regular
            </button>
            <button
              type="button"
              className={classNames(
                "toggle_text py-1 px-2 rounded-full text-[.9rem] z-[6] w-1/2 text-start",
                panel === "probation" ? "text-white" : "text-black"
              )}
              onClick={() => {
                setPanel("probation");
              }}
            >
              Probation
            </button>
          </div>
        </div>
        {/* overview */}
        <Overview overview_type={panel} />
        <MainOverview panel_type={panel}/>
      </div>
    </>
  ) : (
    <>Loading...</>
  );
}
