import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Input } from "./";
import { useAuth } from "../context/authContext";
import { useFunction } from "../context/FunctionContext";
import Modal from "../misc/Modal";
import classNames from "classnames";
export default function EmployeeAdd() {
  const {
    registerUser,
    navigate,
    headList,
    usertypeList,
    getBusinessUnits,
    getDepartments,
  } = useAuth();
  const { splitKey, areValuesFilled, capitalizeSentence } = useFunction();
  const [businessUnits, setBusinessUnits] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [modal, setModal] = useState("standby");
  const [userInformation, setUserInformation] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix: null,
    nickname: "",
    salutation: "",
    email: "",
    contact_no: "",
    address: "",
    nationality: "",
    username: "",
    password: "",
  });
  const [jobInformation, setJobInformation] = useState({
    employee_id: "",
    company: "",
    department: "",
    team: "",
    job_description: "",
    job_level: "",
    employment_type: "",
    contract_type: "",
    primary_evaluator: null,
    secondary_evaluator: null,
    tertiary_evaluator: null,
    hire_date: "",
  });
  const salutationList = ["Mr.", "Miss"];
  const contractList = ["regular", "probation", "project based", "consultant"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const userdata = { ...userInformation, ...jobInformation };

    if (registerUser(userdata)) {
      setModal("success");
    }
  };
  const handleSuccess = () => {
    navigate("/employees");
  };
  useEffect(() => {
    const setup = async () => {
      const companyList = await getBusinessUnits();
      setBusinessUnits(companyList);
      const departmentList = await getDepartments();
      setDepartments(departmentList);
    };
    setup();
  }, []);
  return (
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
                    label={<p>{splitKey(object_key)} {![
                      "middle_name",
                      "nickname",
                      "contact_no",
                      "suffix",
                      "address",
                      "nationality",
                    ].includes(object_key) && <span className="text-un-red">*</span>}</p>}
                    id={object_key}
                    val={userInformation[object_key]}
                    set={setUserInformation}
                    required={![
                      "middle_name",
                      "nickname",
                      "contact_no",
                      "suffix",
                      "address",
                      "nationality",
                    ].includes(object_key)}
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
                    label={<p>{splitKey(object_key)} {![
                      "primary_evaluator",
                      "secondary_evaluator",
                      "tertiary_evaluator",
                    ].includes(object_key) && <span className="text-un-red">*</span>}</p>}
                    id={object_key}
                    required={![
                      "primary_evaluator",
                      "secondary_evaluator",
                      "tertiary_evaluator",
                    ].includes(object_key)}
                    clear={modal === "success"}
                    set={setJobInformation}
                    editable={true}
                    type={
                      [
                        "company",
                        "department",
                        "primary_evaluator",
                        "secondary_evaluator",
                        "tertiary_evaluator",
                        "contract_type",
                        "employment_type",
                        "job_level",
                      ].includes(object_key)
                        ? "dropdown"
                        : object_key === "hire_date"
                        ? "date"
                        : "text"
                    }
                    dropdownOptions={
                      object_key === "company"
                        ? businessUnits
                        : object_key === "department" &&
                          jobInformation["company"] != ""
                        ? departments.filter(
                            (dept) =>
                              dept.company_id == jobInformation["company"]
                          )
                        : object_key.includes("evaluator")
                        ? headList
                        : object_key === "job_level"
                        ? usertypeList.map((type) => {
                            return {
                              ...type,
                              job_level_name: capitalizeSentence(
                                type.job_level_name
                              ),
                            };
                          })
                        : object_key === "employment_type"
                        ? ["LOCAL", "EXPAT"]
                        : object_key === "contract_type"
                        ? contractList.map((contract) => {
                            return capitalizeSentence(contract);
                          })
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
  );
}
