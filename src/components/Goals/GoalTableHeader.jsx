import React from "react";

export default function GoalTableHeader({ title }) {
  return (
    <div className="font-normal whitespace-nowrap flex flex-col items-center">
      <span>{title[0]}</span>
      <span>{title[1]}</span>
    </div>
  );
}
