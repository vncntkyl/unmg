import React from "react";

export default function ToolTip({ children, tooltip }) {
  return (
    <>
      <div className="peer/tooltip relative">{children}</div>
      {/* TOOLTIP CONTAINER */}
      <div className="absolute top-0 left-1/2 hidden peer-hover/tooltip:block">{tooltip}</div>
    </>
  );
}
