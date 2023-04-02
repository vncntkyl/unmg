import React, { useEffect, useState } from "react";
import { Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [sidebar, toggleSidebar] = useState(false);

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
  return (
    <>
      <Navbar
        notification_count={0}
        user_data={{
          first_name: "Kyle",
        }}
      />
      {sidebar ? "helo" : "hi"}
      <br />
      {currentUser.map((data) => {
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
  );
}
