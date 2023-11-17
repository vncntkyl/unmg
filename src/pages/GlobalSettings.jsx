import React, { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Settings from "../components/Settings";
import { useAuth } from "../context/authContext";
import classNames from "classnames";

export default function GlobalSettings() {
  const { currentUser, kpiDurations } = useAuth();

  const userType = JSON.parse(currentUser).user_type;
  return (
    <>
      <section className="relative">
        <div className={classNames("w-full min-h-[175px]", userType <= 2 ? "bg-un-blue" : userType >= 3 && userType <= 5 ? "bg-un-red-dark-1" : "bg-dark-gray")} />
        <div className="absolute top-0 left-0 w-full px-4 lg:pl-[18rem] xl:pl-[18.5rem] xl:pr-[1.5rem]">
          <div className="bg-white p-2 rounded-md flex flex-col shadow-md justify-between gap-2">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <span className="text-un-blue text-[1.2rem] font-semibold text-start w-full flex flex-row items-center gap-2">
                Global Settings
              </span>
              {/* TOGGLE */}
            </div>
            {/* BODY */}
            <div>
              <Routes>
                <Route
                  path="/*"
                  element={<Settings/>}/>
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
