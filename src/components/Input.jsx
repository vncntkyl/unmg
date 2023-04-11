import React from "react";
import { useFunction } from "../context/FunctionContext";

export default function Input({
  id,
  set,
  label = "",
  type = "text",
  withLabel = false,
  dropdownOptions = [],
}) {
  let inputField = <></>;
  const { splitKey } = useFunction();

  switch (type) {
    case "text":
      inputField = (
        <>
          <input
            type="text"
            id={id}
            className="outline-none border border-gray overflow-hidden rounded p-1 w-full xl:w-1/2"
            onChange={(e) => {
              set((prev) => {
                return {
                  ...prev,
                  [`${id}`]: e.target.value,
                };
              });
            }}
          />
        </>
      );
      break;
    case "dropdown":
      inputField = (
        <>
          <select
            id={id}
            className="outline-none border border-gray overflow-hidden rounded p-1 w-full xl:w-1/2"
            onChange={(e) => {
              set((prev) => {
                return {
                  ...prev,
                  [`${id}`]: e.target.value,
                };
              });
            }}
          >
            <option value="" disabled selected>
              --Select {splitKey(id)}--
            </option>
            {dropdownOptions.map((opt, idx) => {
              return (
                <option key={idx} value={opt.id ? opt.id : opt}>
                  {opt.name ? opt.name : opt}
                </option>
              );
            })}
          </select>
        </>
      );
      break;
    case "password":
      inputField = (
        <>
          <input
            type="password"
            id={id}
            className="outline-none border border-gray overflow-hidden rounded p-1 w-full xl:w-1/2"
            onChange={(e) => {
              set((prev) => {
                return {
                  ...prev,
                  [`${id}`]: e.target.value,
                };
              });
            }}
          />
        </>
      );
      break;
  }

  return (
    <div className="flex flex-col gap-1 justify-between md:flex-row lg:flex-col xl:flex-row">
      {withLabel && (
        <label htmlFor={id} className="md:w-1/2">
          {label}
        </label>
      )}
      {inputField}
    </div>
  );
}
