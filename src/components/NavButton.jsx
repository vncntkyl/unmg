import React from "react";
import classNames from "classnames";
import { BiDownArrow } from "react-icons/bi";

export default function NavButton({ isDropdown, icon, textLabel, className }) {
  return isDropdown ? (
    <>
      <button
        className={classNames(
          "bg-transparent outline-none border-none flex items-center justify-between gap-2 w-full p-2",
          className
        )}
      >
        {icon}
        <span className="mr-auto">{textLabel}</span>
        <BiDownArrow />
      </button>
    </>
  ) : (
    <>
      <a
        href={`/${textLabel}`}
        className={classNames(
          "bg-transparent outline-none border-none flex items-center justify-between gap-2 w-full p-2",
          className
        )}
      >
        {icon}
        <span className="mr-auto">{textLabel}</span>
      </a>
    </>
  );
}
