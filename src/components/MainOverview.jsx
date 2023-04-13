import React, { useState } from "react";
import { format, startOfToday } from "date-fns";
import { EmployeeTable } from "./";

export default function MainOverview({ panel_type }) {
  const [quarter, setQuarter] = useState("First Quarter");
  const [evaluation, setEvaluation] = useState("all");

  return (
    <>
      <div className="overflow-hidden bg-white m-2 rounded-md p-2 shadow-md flex flex-col gap-2 lg:ml-[18rem] lg:mr-6 xl:ml-[24.5rem] xl:mr-32">
        {/* HEADER */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <span className="text-[1.1rem] font-semibold">Rating Overview</span>
            <span className="text-[.8rem] text-dark-gray">
              As of {format(startOfToday(), "EEEE, MMMM d, yyyy")}
            </span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <label htmlFor="quarterPicker" className="font-semibold">
              Select Quarter:
            </label>
            <select
              id="quarterPicker"
              onChange={(e) => setQuarter(e.target.value)}
              className="shadow-sm bg-white text-un-blue rounded-md p-1 px-2 outline-none border border-gray"
            >
              <option value="First Quarter" defaultChecked>
                First Quarter
              </option>
              <option value="Second Quarter">Second Quarter</option>
              <option value="Third Quarter">Third Quarter</option>
              <option value="Fourth Quarter">Fourth Quarter</option>
            </select>
          </div>
          {panel_type !== "regular" && (
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="quarterPicker" className="font-semibold">
                Show Evaluations For:
              </label>
              <select
                id="quarterPicker"
                onChange={(e) => setEvaluation(e.target.value)}
                className="shadow-sm bg-white text-un-blue rounded-md p-1 px-2 outline-none border border-gray"
              >
                <option value="all" defaultChecked>
                  All
                </option>
              </select>
            </div>
          )}
        </div>
        {/* BODY */}
        <EmployeeTable quarter={quarter} panel_type={panel_type} onDashboard />
        {/* FOOTER */}
        <button className="bg-un-blue-light w-fit text-white py-1 px-2 rounded-md">
          More Information
        </button>
      </div>
    </>
  );
}
