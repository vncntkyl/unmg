import React from "react";
import classNames from "classnames";

export default function GoalTableHeader({ title, classes }) {
  return (
    <th className="whitespace-nowrap p-2">
      <div className="flex flex-col items-center">
        <span>{title[0]}</span>
        <span>{title[1]}</span>
      </div>
    </th>
  );
}
