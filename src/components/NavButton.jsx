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
              switch (code) {
                case "reg":
                  return {
                    ...prev,
                    regular: !prev.regular,
                  };
                case "prob":
                  return {
                    ...prev,
                    probation: !prev.probation,
                  };
                case "adm":
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
              code == "reg"
                ? dropdown.regular && "rotate-180"
                : code == "prob"
                ? dropdown.probation && "rotate-180"
                : code == "adm"
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
