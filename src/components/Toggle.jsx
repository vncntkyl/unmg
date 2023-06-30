import classNames from "classnames";
import React from "react";
import { useFunction } from "../context/FunctionContext";

export default function Toggle({
  paths = [],
  panel,
  panel_1,
  panel_2,
  setPanel,
}) {
  const { getPath } = useFunction();
  return (
    // ["/main_goals/", "/main_goals"]
    <>
      {paths.includes(getPath()) && (
        <div
          className={classNames(
            "toggle flex flex-row gap-2 bg-default w-full p-1 rounded-full relative overflow-hidden z-[4] md:w-[400px]",
            panel !== panel_1 && "on"
          )}
        >
          <button
            type="button"
            className={classNames(
              "toggle_text py-1 px-2 rounded-full text-[.8rem] z-[6] text-center w-1/2 md:text-[.8rem]",
              panel === panel_1 ? "text-white" : "text-black"
            )}
            onClick={() => {
              sessionStorage.setItem("panel", panel_1);
              setPanel(panel_1);
            }}
          >
            {panel_1}
          </button>
          <button
            type="button"
            className={classNames(
              "toggle_text py-1 px-2 rounded-full text-[.8rem] z-[6] w-1/2 text-center whitespace-nowrap md:text-[.8rem]",
              panel === panel_2 ? "text-white" : "text-black"
            )}
            onClick={() => {
              sessionStorage.setItem("panel", panel_2);
              setPanel(panel_2);
            }}
          >
            {panel_2}
          </button>
        </div>
      )}
    </>
  );
}
