import React, { useState } from "react";
import classNames from "classnames";
import { MainOverview, Overview } from "../components";

export default function DashboardOverview({ panel, setPanel }) {
  return (
    <>
      {/* toggler */}
      <div className="w-full bg-un-blue px-4 lg:pl-[18rem] xl:pl-[24.5rem]">
        <div
          className={classNames(
            "toggle flex flex-row gap-2 bg-white w-[200px] p-1 rounded-full relative overflow-hidden z-[4]",
            panel !== "regular" && "on"
          )}
        >
          <button
            type="button"
            className={classNames(
              "toggle_text py-1 px-2 rounded-full text-[.9rem] z-[6] w-1/2",
              panel === "regular" ? "text-white" : "text-black"
            )}
            onClick={() => {
              setPanel("regular");
            }}
          >
            Regular
          </button>
          <button
            type="button"
            className={classNames(
              "toggle_text py-1 px-2 rounded-full text-[.9rem] z-[6] w-1/2 text-start",
              panel === "probation" ? "text-white" : "text-black"
            )}
            onClick={() => {
              setPanel("probation");
            }}
          >
            Probation
          </button>
        </div>
      </div>
      {/* overview */}
      <Overview overview_type={panel} />
      <MainOverview panel_type={panel} />
    </>
  );
}
