import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Input } from "./";
import { useAuth } from "../context/authContext";
import { useFunction } from "../context/FunctionContext";
import Modal from "../misc/Modal";
import classNames from "classnames";
export default function EmployeeAdd() {
  const {
    companyList,
    departmentList,
    registerUser,
    navigate,
    headList,
    usertypeList,
  } = useAuth();
  const { splitKey, areValuesFilled } = useFunction();
  const [modal, setModal] = useState("standby");
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
    job_description: "",
    job_status: "",
    user_type: "",
  });
  const salutationList = ["Mr.", "Miss", "Mrs."];
  const jobStatusList = ["Regular", "Probation", "Resigned"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const userdata = { ...userInformation, ...jobInformation };
    setTimeout(() => {
      if (registerUser(userdata)) {
        Object.keys(userInformation).forEach((key) => {
          userInformation[key] = "";
        });
        Object.keys(jobInformation).forEach((key) => {
          jobInformation[key] = "";
        });
        setModal("success");
      }
    }, 1000);
  };
  const handleSuccess = () => {
    navigate("/employees");
  };

  return (
    headList.length > 0 &&
    usertypeList.length > 0 && (
      <>
        <div>
          <a
            href="/employees"
            className="flex flex-row items-center pr-2 bg-un-blue w-fit text-white rounded-md hover:bg-un-blue-light"
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
            <div className="flex flex-col lg:flex-row gap-4 w-full">
              <section className="w-full lg:w-1/2 bg-default p-2 rounded-md">
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
                      val={userInformation[object_key]}
                      set={setUserInformation}
                      clear={modal === "success"}
                      editable={true}
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
              <section className="w-full lg:w-1/2 bg-default p-2 rounded-md">
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
                      clear={modal === "success"}
                      set={setJobInformation}
                      editable={true}
                      type={
                        [
                          "company",
                          "department",
                          "supervisor",
                          "immediate_supervisor",
                          "job_status",
                          "user_type",
                        ].includes(object_key)
                          ? "dropdown"
                          : "text"
                      }
                      dropdownOptions={
                        object_key === "company"
                          ? companyList
                          : object_key === "department"
                          ? departmentList
                          : object_key === "supervisor"
                          ? headList.filter((head) => head.user_type === "5")
                          : object_key === "immediate_supervisor"
                          ? headList.filter((head) => head.user_type === "6")
                          : object_key === "job_status"
                          ? jobStatusList
                          : object_key === "user_type"
                          ? usertypeList
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
              className="w-full lg:w-1/4 cursor-pointer transition-all bg-un-blue text-white rounded p-1 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
            />
          </form>
        </div>
        {modal === "success" && (
          <>
            <Modal
              title={"Account Registration"}
              message={`Registration Successful!`}
              closeModal={setModal}
              action={"Dismiss"}
              handleContinue={handleSuccess}
            />
          </>
        )}
        <div
          className={classNames(
            "bg-[#00000035] fixed h-full w-full z-[21] top-0 left-0 animate-fade pointer-events-auto",
            modal === "standby" && "z-[-1] hidden pointer-events-none"
          )}
          onClick={() => {
            setModal("standby");
          }}
        />
      </>
    )
  );
}
