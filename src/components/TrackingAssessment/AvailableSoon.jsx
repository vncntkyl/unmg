import React from "react";
import { FaGear } from "react-icons/fa6";

export default function AvailableSoon() {
  return (
    <div className="h-[84vh] flex flex-col items-center justify-center">
      <span className="flex">
        <FaGear className="text-[10rem] text-mid-gray animate-spin-slow" />
        <FaGear className="text-[5rem] animate-reverse-spin" />
      </span>
      <span className="text-[2rem] font-semibold text-mid-gray">Coming Soon</span>
    </div>
  );
}
