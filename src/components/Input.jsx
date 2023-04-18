import React, { useState, useEffect } from "react";
import { useFunction } from "../context/FunctionContext";
import classNames from "classnames";
import { useAuth } from "../context/authContext";
import axios from "axios";

export default function Input({
  id,
  set,
  label = "",
  type = "text",
  withLabel = false,
  dropdownOptions = [],
  val = null,
  editable,
}) {
  const { companyList, departmentList, headList, usertypeList } = useAuth();
  const { splitKey } = useFunction();

  const salutationList = ["Mr.", "Miss", "Mrs."];
  const jobStatusList = ["Regular", "Probation", "Resigned"];

  return (
    <div className="flex flex-col gap-1 justify-between md:flex-row lg:flex-col xl:flex-row">
      {withLabel && (
        <label
          htmlFor={id}
          className={classNames("md:w-1/2", !editable && "font-semibold")}
        >
          {label}
        </label>
      )}
      {type === "text" ? (
        <input
          type="text"
          id={id}
          className={classNames(
            "outline-none bg-white overflow-hidden rounded-md p-1 w-full xl:w-1/2",
            !editable && "disabled:bg-transparent"
          )}
          defaultValue={
            val
              ? id === "company"
                ? companyList.length > 0 &&
                  companyList.find((comp) => comp.company_id === val)
                    .company_name
                : id === "department"
                ? departmentList.length > 0 &&
                  departmentList.find((dept) => dept.department_id === val)
                    .department_name
                : id === "supervisor" || id === "immediate_supervisor"
                ? headList.length > 0 &&
                  headList.find((head) => head.users_id === val)
                  ? headList.find((head) => head.users_id === val).full_name
                  : "N/A"
                : id === "status"
                ? jobStatusList[val]
                : id === "user_type"
                ? usertypeList.length > 0 &&
                  usertypeList.find((type) => type.user_type === val)
                    .user_type_description
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
      ) : type === "dropdown" ? (
        <select
          id={id}
          className={classNames(
            "outline-none bg-white overflow-hidden rounded-md p-1 w-full xl:w-1/2",
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
          <option value="" selected={!val} disabled>
            --Select {splitKey(id)}--
          </option>

          {dropdownOptions.map((opt, idx) => {
            if (val) {
              return opt.company_id === val ||
                opt.department_id === val ||
                opt.users_id === val ||
                opt.user_type === val ||
                opt === val ? (
                <option key={idx} value={val} selected>
                  {opt.company_name ||
                    opt.department_name ||
                    opt.full_name ||
                    opt.user_type_description ||
                    opt}
                </option>
              ) : (
                <option
                  key={idx}
                  value={
                    opt.company_id ||
                    opt.department_id ||
                    opt.users_id ||
                    opt.user_type ||
                    dropdownOptions.indexOf(opt)
                  }
                >
                  {opt.company_name ||
                    opt.department_name ||
                    opt.full_name ||
                    opt.user_type_description ||
                    opt}
                </option>
              );
            } else {
              return (
                <option
                  key={idx}
                  value={
                    opt.company_id ||
                    opt.department_id ||
                    opt.users_id ||
                    opt.user_type ||
                    dropdownOptions.indexOf(opt)
                  }
                >
                  {opt.company_name ||
                    opt.department_name ||
                    opt.full_name ||
                    opt.user_type_description ||
                    opt}
                </option>
              );
            }
          })}
        </select>
      ) : (
        <input
          type="password"
          id={id}
          value={val}
          className="outline-none bg-white overflow-hidden rounded-md p-1 w-full xl:w-1/2"
          onChange={(e) => {
            set((prev) => {
              return {
                ...prev,
                [`${id}`]: e.target.value,
              };
            });
          }}
        />
      )}
    </div>
  );
}
