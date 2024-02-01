import React, { useState, useEffect } from "react";
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
  val = null,
  editable,
}) {
  const { companyList, departmentList, usertypeList } = useAuth();
  const { splitKey, capitalizeSentence } = useFunction();

  const jobStatusList = ["Regular", "Probation", "Resigned"];
  const placeholders = {
    first_name: 'Enter First Name',
    middle_name: 'Enter Middle Name',
    last_name: 'Enter Last Name',
    suffix: 'Enter Suffix',
    nickname: 'Enter Nickname',
    salutation: 'Enter Salutation',
    email: 'Enter Email',
    contact_no: 'Enter Contact Number',
    address: 'Enter Address',
    nationality: 'Enter Nationality',
    username: 'Enter Username',
    employee_id: 'Enter Employee ID',
    team: 'Enter Team',
    job_description: 'Enter Job Description',
  };
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
                : id === "status" 
                ? jobStatusList[val]
                : usertypeList.length > 0 &&
                  usertypeList.find((u) => u.job_level == val)
                ? usertypeList.find((u) => u.job_level == val).job_level_name
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
          placeholder={placeholders[id] || ''}
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
              return (id === "company" && opt.company_id === val) ||
                (id === "department" && opt.department_id === val) ||
                opt.employee_id === val ||
                opt.job_level_id === val ||
                opt === val ? (
                <option key={idx} value={val} selected>
                  {opt.company_name ||
                    opt.department_name ||
                    opt.full_name ||
                    opt.job_level_name ||
                    opt}
                </option>
              ) : (
                <option
                  key={idx}
                  value={
                    (id === "company" && opt.company_id) ||
                    (id === "department" && opt.department_id) ||
                    opt.employee_id ||
                    opt.job_level_id ||
                    dropdownOptions.indexOf(opt)
                  }
                >
                  {opt.company_name ||
                    opt.department_name ||
                    opt.full_name ||
                    opt.job_level_name ||
                    opt}
                </option>
              );
            } else {
              return (
                <option
                  key={idx}
                  value={
                    (id === "company" && opt.company_id) ||
                    (id === "department" && opt.department_id) ||
                    opt.employee_id ||
                    opt.job_level_id ||
                    dropdownOptions.indexOf(opt)
                  }
                >
                  {opt.company_name ||
                    opt.department_name ||
                    opt.full_name ||
                    opt.job_level_name ||
                    opt}
                </option>
              );
            }
          })}
        </select>
      ) : type === "date" ? (
        <input
          type="date"
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
