import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Input } from "./";
import { useAuth } from "../context/authContext";
import { useFunction } from "../context/FunctionContext";
export default function EmployeeAdd() {
  const { companyList } = useAuth();
  const { splitKey, areValuesFilled } = useFunction();
  const [userInformation, setUserInformation] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    salutation: "",
    email: "",
    contact_no: "",
    address: "",
    username: "",
    password: "",
  });
  const [jobInformation, setJobInformation] = useState({
    company: "",
    department: "",
    supervisor: "",
    immediate_supervisor: "",
    job_title: "",
    job_status: "",
  });
  const salutationList = ["Mr.", "Ms.", "Mrs.", "Mx.", "Atty.", "Dr."];
  const supervisorList = ["Jose", "Pedro", "Analyn", "Juan", "Jane", "Wanda"];
  const immediateSupervisorList = [
    "Jenny",
    "Clarita",
    "Anthony",
    "Gab",
    "Joy",
    "Ligaya",
  ];
  const jobStatusList = ["Regular", "Probation", "On Leave", "Resigned"];
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(userInformation, jobInformation);
  };

  useEffect(()=> {
    document.title = "Add Employee | United Neon Media Group Performance Management System";
  },[])
  return (
    <>
      <div>
        <a
          href="/employees"
          className="flex flex-row items-center gap-2 bg-un-blue w-fit text-white p-1 py-2 pr-2 rounded-md hover:bg-un-blue-light"
        >
          <IoChevronBack />
          <span>Back</span>
        </a>
        <form
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col py-2 gap-2 items-end"
          encType="multipart/form-data"
        >
          {/* <div className="flex items-center justify-center w-full">
            <label htmlFor="profile" className="">
              <FaUserCircle />
            </label>
            <input type="file" id="profile" accept=".jpg, .jpeg, .png, .webp"  className="hidden"/>
          </div> */}
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <section className="w-full lg:w-1/2">
              <span className="font-semibold text-[1.05rem]">
                Personal Information
              </span>
              <div className="flex flex-col gap-2 pt-2">
                {Object.keys(userInformation).map((object_key, index) => (
                  <Input
                    key={index}
                    withLabel={true}
                    label={splitKey(object_key)}
                    id={object_key}
                    set={setUserInformation}
                    type={
                      object_key === "salutation"
                        ? "dropdown"
                        : object_key === "password"
                        ? "password"
                        : "text"
                    }
                    dropdownOptions={
                      object_key === "salutation" ? salutationList : undefined
                    }
                  />
                ))}
              </div>
            </section>
            <section className="w-full lg:w-1/2">
              <span className="font-semibold text-[1.05rem]">
                Job Information
              </span>
              <div className="flex flex-col gap-2 pt-2">
                {Object.keys(jobInformation).map((object_key, index) => (
                  <Input
                    key={index}
                    withLabel={true}
                    label={splitKey(object_key)}
                    id={object_key}
                    set={setJobInformation}
                    type={
                      [
                        "company",
                        "supervisor",
                        "immediate_supervisor",
                        "job_status",
                      ].includes(object_key)
                        ? "dropdown"
                        : "text"
                    }
                    dropdownOptions={
                      object_key === "company"
                        ? companyList
                        : object_key === "supervisor"
                        ? supervisorList
                        : object_key === "immediate_supervisor"
                        ? immediateSupervisorList
                        : object_key === "job_status"
                        ? jobStatusList
                        : undefined
                    }
                  />
                ))}
              </div>
            </section>
          </div>
          <input
            type="submit"
            disabled={
              areValuesFilled(userInformation) &&
              areValuesFilled(jobInformation)
                ? false
                : true
            }
            className="w-full lg:w-1/2 cursor-pointer transition-all bg-un-blue text-white rounded p-1 hover:bg-un-blue-light disabled:bg-dark-gray"
          />
        </form>
      </div>
    </>
  );
}
