import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";

export default function Goals() {
  const { id } = useParams();
  const [hasSet, toggleSet] = useState(false);
  return (
    <>
      {id ? id : "WALA"}
      {!hasSet ? (
        <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2 items-center text-center">
          <span>
            Sorry, you haven&lsquo;t set your KPIs Objectives yet. Please click
            the button to get started.
          </span>
          <a
            href="/main_goals/create"
            className="text-white p-2 flex flex-row items-center gap-2 bg-un-blue-light hover:bg-un-blue rounded-full text-[.9rem]"
          >
            <AiOutlinePlus />
            Create Goals
          </a>
        </div>
      ) : (
        <div>

        </div>
      )}
    </>
  );
}
