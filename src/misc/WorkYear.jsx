import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import format from "date-fns/format";

export default function WorkYear({ kpiDuration, setKpiDuration }) {
  const { kpiDurations } = useAuth();
  return (
    <div className="flex flex-row items-center gap-2">
      <label htmlFor="workyear"> Select Work Year:</label>
      <select
        className="bg-default rounded-md p-1 px-2 text-center"
        onChange={(e) => {
          setKpiDuration(parseInt(e.target.value));
          localStorage.setItem("work_year", parseInt(e.target.value));
        }}
        value={kpiDuration}
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
