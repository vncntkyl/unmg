import React from "react";
import { useFunction } from "../context/FunctionContext";
import classNames from "classnames";
import { useAuth } from "../context/authContext";

export default function Input({
  id,
  set,
  label = "",
  type = "text",
  withLabel = false,
  dropdownOptions = [],
  val,
  editable,
}) {
  const { companyList } = useAuth();
  let inputField = <></>;
  const { splitKey } = useFunction();

  switch (type) {
    case "text":
      inputField = (
        <>
          <input
            type="text"
            id={id}
            className={classNames(
              "outline-none border border-gray overflow-hidden rounded p-1 w-full xl:w-1/2",
              !editable && "border-none disabled:bg-transparent"
            )}
            defaultValue={
              val
                ? id === "company"
                  ? companyList.find((comp) => comp.id === val).name
                  : val
                : ""
            }
            disabled={!editable}
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
            className={classNames(
              "outline-none border border-gray overflow-hidden rounded p-1 w-full xl:w-1/2",
              !editable && "border-none"
            )}
            onChange={(e) => {
              set((prev) => {
                return {
                  ...prev,
                  [`${id}`]: e.target.value,
                };
              });
            }}
          >
            <option value="" disabled>
              --Select {splitKey(id)}--
            </option>
            {dropdownOptions.map((opt, idx) => {
              if (val) {
                return opt === val ? (
                  <option key={idx} value={val} selected={true}>
                    {val}
                  </option>
                ) : (
                  <option key={idx} value={opt.id ? opt.id : opt}>
                    {opt.name ? opt.name : opt}
                  </option>
                );
              } else {
                return (
                  <option key={idx} value={opt.id ? opt.id : opt}>
                    {opt.name ? opt.name : opt}
                  </option>
                );
              }
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
        <label htmlFor={id} className={classNames("md:w-1/2", !editable && "font-semibold")}>
          {label}
        </label>
      )}
      {inputField}
    </div>
  );
}
