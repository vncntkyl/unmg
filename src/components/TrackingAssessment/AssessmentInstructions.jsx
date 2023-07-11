import classNames from "classnames";
import React, { useState } from "react";
import { KPIInstructions, KPILegend } from "../../misc/HelpData";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export default function AssessmentInstructions() {
  const [instructionsOpen, toggleInstructions] = useState(false);
  return (
    <div className="bg-default p-2 rounded-md overflow-hidden">
      <button
        type="button"
        onClick={() => toggleInstructions((old) => !old)}
        className="font-bold text-un-blue p-2 flex flex-row items-center gap-1 w-full"
      >
        Instructions
        {instructionsOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </button>
      <div
        className={classNames(
          instructionsOpen
            ? "max-h-[1000px] opacity-100"
            : "max-h-[0px] opacity-0",
          "transition-all duration-200 grid  md:grid-cols-[2fr_1fr] gap-4"
        )}
      >
        <div>
          {KPIInstructions.map((instruction, instruct) => {
            return (
              <div className="flex flex-row gap-1 text-[.8rem] pl-3">
                <span>{instruct + 1}.</span>
                {instruction}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col justify-between gap-2">
          <div>
            <span className="font-bold text-un-blue">Rating Description</span>
            <div>
              {KPILegend.map((legend) => {
                return (
                  <div className="flex flex-row gap-1 text-[.9rem] pl-3">
                    <span className="font-semibold">{legend.point}</span>-{" "}
                    {legend.description}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-default-dark p-2 rounded-md">
            <span className="font-semibold text-dark-gray">Note: </span>
            <span className="text-[.9rem]">
              Each pillar must have a total of twelve (12) Key Performance
              Indicators (KPI) ONLY.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}