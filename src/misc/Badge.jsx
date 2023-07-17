import classNames from "classnames";
import React from "react";

export default function Badge({ type = "default", message, className }) {
  return (
    <div
      className={classNames(
        "text-[.7rem] font-semibold uppercase border rounded",
        type === "default" && "border-gray bg-gray text-dark-gray",
        type === "warning" &&
          "border-un-yellow-light bg-un-yellow-light text-un-yellow-dark",
        type === "success" &&
          "border-un-green-light bg-un-green-light text-un-green-dark",
        type === "failure" &&
          "border-un-red-light-1 bg-un-red-light-1 text-un-red-dark",
        className
      )}
    >
      {message}
    </div>
  );
}
