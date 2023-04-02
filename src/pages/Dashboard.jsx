import React, { useEffect, useState } from "react";
import { Navbar, Sidebar } from "../components";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebar, toggleSidebar] = useState(false);
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
    if (xDiff < 0) {
      toggleSidebar((prev) => !prev);
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
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    // Remove touch event listeners on unmount
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);
  return !loader ? (
    <>
      <Navbar
        notification_count={0}
        user_data={{
          first_name: "Kyle",
        }}
        sidebarToggler={toggleSidebar}
      />
      {sidebar ? (
        <>
          <Sidebar sidebarToggler={toggleSidebar}/>
          <div className="bg-[#00000050] fixed h-full w-full z-[4] top-0 left-0 animate-fade pointer-events-auto" onClick={() => toggleSidebar(false)} />
        </>
      ) : (
        <></>
      )}
      {user.map((data) => {
        return (
          <>
            <div key={data}>
              <span>{data.username}</span>
              <span>{data.password}</span>
            </div>
          </>
        );
      })}
    </>
  ) : (
    <>Loading...</>
  );
}
