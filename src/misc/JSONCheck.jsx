import React from "react";

export default function JSONCheck({ data }) {
  return (
    <pre
      style={{
        whiteSpace: "pre-wrap",
        fontFamily: "Courier New",
        fontSize: "14px",
        backgroundColor: "#f4f4f4",
        padding: "10px",
        border: "1px solid #ccc",
      }}
    >
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
