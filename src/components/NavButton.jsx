import React, { useEffect } from "react";
import classNames from "classnames";
import { BiDownArrow } from "react-icons/bi";

export default function NavButton({
  code,
  isDropdown,
  dropdown,
  icon,
  textLabel,
  className,
  onClick,
  slug,
}) {
  return isDropdown ? (
    dropdown && (
      <>
        <button
          onClick={() => {
            onClick((prev) => {
              if (code === "forms") {
                return {
                  ...prev,
                  forms: !prev.forms,
                };
              } else {
                return {
                  ...prev,
                  administrator: !prev.administrator,
                };
              }
            });
          }}
          className={classNames(
            "bg-transparent outline-none border-none flex items-center justify-between gap-2 w-full p-2",
            className
          )}
        >
          {icon}
          <span className="mr-auto">{textLabel}</span>
          <BiDownArrow
            className={classNames(
              "transition-all",
              code == "forms"
                ? dropdown.forms && "rotate-180"
                : code == "admin"
                ? dropdown.administrator && "rotate-180"
                : ""
            )}
          />
        </button>
      </>
    )
  ) : (
    <>
      <a
        href={`/${slug}`}
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
