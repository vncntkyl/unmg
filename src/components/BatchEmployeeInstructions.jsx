import classNames from "classnames";
import React, { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export default function BatchEmployeeInstructions() {
  const [instructionsOpen, toggleInstructions] = useState(false);
  const headers = [
    "Employee ID",
    "First Name",
    "Middle Name",
    "Last Name",
    "Suffix",
    "Nickname",
    "Salutation",
    "Email",
    "Contact No.",
    "Address",
    "Nationality",
    "Company",
    "Department",
    "Team",
    "Job Description",
    "Job Level",
    "Employment Type",
    "Contract Type",
    "Primary Evaluator",
    "Secondary Evaluator",
    "Tertiary Evaluator",
    "Hire Date",
  ];
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
        <div className="px-4">
          <p className="font-semibold">
            To import employees, you need to submit an excel file which contains
            the information of employees. <br />
            The header of the excel file, or the first column, should be the
            following:
          </p>
          <ol className="list-decimal pl-8 flex flex-row gap-12">
            <div>
              {headers.slice(0, headers.length / 2).map((h, index) => {
                return <li key={index}>{h}</li>;
              })}
            </div>
            <div>
              {headers
                .slice(headers.length / 2, headers.length)
                .map((h, index) => {
                  return <li key={index}>{h}</li>;
                })}
            </div>
          </ol>
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
