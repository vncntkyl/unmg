import React from "react";

export default function Overview({ title, score }) {
  return (
    <>
      <div className="overview group">
        <span>{title}</span>
        <span>{score}</span>
      </div>
    </>
  );
}
