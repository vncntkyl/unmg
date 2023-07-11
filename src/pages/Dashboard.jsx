import React, { useEffect, useState } from "react";
import { Navbar, Sidebar } from "../components";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Routes, Route } from "react-router-dom";
import { DashboardOverview, EmployeeList } from ".";
import AccountSettings from "./AccountSettings";
import CompanyList from "./CompanyList";
import Roles from "./Roles";
import Help from "./Help";
import MainGoals from "./MainGoals";
import ViewEvaluation from "./ViewEvaluation";
import CompanyPlans from "./CompanyPlans";
import TrackingAssessment from "./TrackingAssessment";
import AgreementSignOff from "./AgreementSignOff";

export default function Dashboard() {
  if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("redirect_to", window.location.pathname);
  }
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
    if (xDown < 50 && xDiff < 0) {
      toggleSidebar(true);
    }
    xDown = null;
  }

  function handleTouchEnd(evt) {
    xDown = null;
  }

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login");
      return;
    } else {
      setUser(JSON.parse(localStorage.getItem("currentUser")));
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
  }, [localStorage]);
  return !loader ? (
    <>
      <Navbar
        notification_count={0}
        user_data={user}
        sidebarToggler={toggleSidebar}
      />
      <div className="min-h-[(calc(100vh_-_76px))]">
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
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          {user.user_type < 2 && (
            <Route path="/employees/*" element={<EmployeeList />} />
          )}
          <Route path="/account/*" element={<AccountSettings />} />
          <Route path="/companies/*" element={<CompanyList />} />
          <Route path="/roles/*" element={<Roles />} />
          <Route path="/help/*" element={<Help />} />
          <Route path="/main_goals/*" element={<MainGoals />} />
          <Route
            path="/tracking_and_assessment/*"
            element={<TrackingAssessment />}
          />
          <Route path="/sign_off/*" element={<AgreementSignOff />} />
          <Route path="/view_evaluations/*" element={<ViewEvaluation />} />
          <Route path="/company_plans/*" element={<CompanyPlans />} />
        </Routes>
      </div>
    </>
  ) : (
    <>Loading...</>
  );
}
