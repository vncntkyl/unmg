import classNames from "classnames";
import React, { useState } from "react";
import batchUploadTemplate from "../assets/batchUploadTemplate.xlsx";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export default function BatchEmployeeInstructions() {
  const [instructionsOpen, toggleInstructions] = useState(false);

  return (
    <div className="bg-default-dark p-2 rounded-md overflow-hidden">
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
        <div className="px-4 flex flex-col gap-2">
          <p className="font-semibold">
            To import employees, you need to submit an excel file which contains
            the information of employees. Attached below is the template you may
            use for inserting users.
          </p>
          <a
          className="p-2 bg-un-blue-light text-white rounded-md w-fit hover:bg-un-blue-light-1 hover:text-un-blue transition-all"
            href={batchUploadTemplate}
            download="Employee Information Template"
            target="_blank"
            rel="noreferrer"
          >Download Template</a>
          <p>
            
          </p>
        </div>
        <div className="flex flex-col justify-between gap-2">
          <div className="bg-default-dark p-2 rounded-md">
            <span className="font-semibold text-dark-gray">Note: </span>
            <span className="text-[.9rem]">
              Please leave the cell blank if an employee's information is not
              available for a specific column. For instance, if an employee does
              not have a suffix, please leave that cell empty.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
