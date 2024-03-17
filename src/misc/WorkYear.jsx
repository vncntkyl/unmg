import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import format from "date-fns/format";

export default function WorkYear({ workYear, setWorkYear }) {
  const { kpiDurations } = useAuth();
  return (
    <div className="flex flex-row items-center gap-2">
      <label htmlFor="workyear"> Select Work Year:</label>
      <select
        className="bg-white rounded-md p-1 px-2 text-center"
        onChange={(e) => {
          setWorkYear(parseInt(e.target.value));
          localStorage.setItem("work_year", parseInt(e.target.value));
        }}
        value={workYear}
      >
        <option value="-1">--Select Work Year--</option>
        {kpiDurations?.map((year, index) => {
          return (
            <option key={index} value={year.kpi_year_duration_id}>
              {`${format(new Date(year.from_date), "MMM d, yyyy")} - 
              ${format(new Date(year.to_date), "MMM d, yyyy")}`}
            </option>
          );
        })}
      </select>
    </div>
  );
}
