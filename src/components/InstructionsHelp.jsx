import React from "react";
import { instructions } from "../misc/HelpData";

export default function InstructionsHelp() {
  return (
    <>
      <div className="p-2">
        <span className="font-semibold text-[1.2rem]">Instructions</span>
        <div className="flex flex-col gap-2">
          {instructions.map((instruction, index) => {
            return (
              <div className=" bg-white p-2 rounded-md">
                <span className="font-bold text-dark-gray">
                  {index + 1 + ". " + instruction.title}
                </span>
                <p>{instruction.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
