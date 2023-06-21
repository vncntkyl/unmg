import classNames from "classnames";
import React from "react";
import { ResponsiveContainer } from "recharts";

export default function Graph({
  containerWidth = "w-full",
  className,
  title,
  chartWidth = "100%",
  chartHeight,
  chart,
  table = false,
}) {
  return (
    <div
      className={classNames(
        "bg-white p-2 shadow-md rounded-md",
        containerWidth,
        className
      )}
    >
      <div className="flex items-center pb-2">
        <p className="font-semibold text-black">{title}</p>
      </div>
      {!table ? (
        <ResponsiveContainer width={chartWidth} height={chartHeight}>
          {chart}
        </ResponsiveContainer>
      ) : (
        chart
      )}
    </div>
  );
}
