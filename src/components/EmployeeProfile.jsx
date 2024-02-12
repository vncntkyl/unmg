import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { useFunction } from "../context/FunctionContext";
import Input from "./Input";
import classNames from "classnames";
import { useAuth } from "../context/authContext";
import axios from "axios";
import AlertModal from "../misc/AlertModal";
import { format } from "date-fns";
export default function EmployeeProfile({ admin }) {
  const { id } = useParams();
  const {
    getBusinessUnits,
    getDepartments,
    headList,
    usertypeList,
    uploadProfilePicture,
  } = useAuth();
  const { splitKey, reformatName, capitalizeSentence } = useFunction();
  const navigate = useNavigate();
  const [loading, toggleLoading] = useState(true);
  const redirect_back_link = localStorage.getItem("redirect_back_to");
  const [personalInfo, setPersonalInfo] = useState([]);
  const [businessUnits, setBusinessUnits] = useState([]);
  const [jobInfo, setJobInfo] = useState([]);
  const [evaluators, setEvaluators] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [userType, setUserType] = useState([]);
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [modal, setModal] = useState("standby");
  const [modalMessage, setModalMessage] = useState("");

  const handleSuccess = () => {
    setModal("standby");
    navigate(`/employees/profile/${id}`);
  };

  const handleChange = (evt) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Access image contents from reader result
      const imageContents = e.target.result;
      setImg(imageContents);
      setFile(evt.target.files[0]);
    };
    reader.readAsDataURL(evt.target.files[0]);
  };

  useEffect(() => {
    let user = [];
    if (!admin) {
      if (!localStorage.getItem("user")) {
        window.location.href = "/employees";
        return;
      }
      user = JSON.parse(localStorage.getItem("user"));
    } else {
      if (!localStorage.getItem("currentUser")) {
        window.location.href = "/";
        return;
      }
      user = JSON.parse(localStorage.getItem("currentUser"));
    }
    //get image
    if (user.picture) {
      import("./" + user.picture)
        .then((img) => {
          setImg(img.default);
        })
        .catch((error) => {
          console.error("Failed to load image:", error);
        });
    }
    const setup = async () => {
      const companyList = await getBusinessUnits();
      setBusinessUnits(companyList);
      const departmentList = await getDepartments();
      setDepartments(departmentList);
      const userLevel = usertypeList.map((item) => ({
        job_level_id: item.job_level_id,
        job_level_name: capitalizeSentence(item.job_level_name),
      }));
      setUserType(userLevel);
    };
    setup();

    setPersonalInfo({
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      suffix: user.suffix || "N/A",
      nickname: user.nickname,
      salutation: user.salutation,
      email: user.email_address,
      contact_no: user.contact_no,
      address: user.address,
      nationality: user.nationality,
      username: user.username,
    });
    setJobInfo({
      employee_id: user.employee_id,
      company: user.company,
      department: user.department,
      team: user.team,
      job_description: user.job_description,
      job_level: user.user_type,
      employment_type: user.employment_category,
      contract_type: user.contract_type,
      hire_date: user.hire_date,
    });
    setEvaluators({
      primary_evaluator:
        user.primary_evaluator === null ||
        user.primary_evaluator === "0" ||
        user.primary_evaluator === 0
          ? "N/A"
          : user.primary_evaluator,
      secondary_evaluator:
        user.secondary_evaluator === null ||
        user.secondary_evaluator === "0" ||
        user.secondary_evaluator === 0
          ? "N/A"
          : user.secondary_evaluator,
      tertiary_evaluator:
        user.tertiary_evaluator === null ||
        user.tertiary_evaluator === "0" ||
        user.tertiary_evaluator === 0
          ? "N/A"
          : user.tertiary_evaluator,
    });
    toggleLoading(false);
  }, [usertypeList]);

  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="flex flex-col gap-2">
        {!admin && (
          <a
            href={redirect_back_link ? redirect_back_link : "/employees"}
            onClick={() => {
              if (!redirect_back_link) return;
              localStorage.removeItem("redirect_back_to");
            }}
            className="flex flex-row items-center gap-2 bg-un-blue w-fit text-white text-[.8rem] p-1 pr-2 rounded-md hover:bg-un-blue-light"
          >
            <IoChevronBack />
            <span>Back</span>
          </a>
        )}
        <span className="text-dark-gray text-[1.2rem] font-semibold">
          {reformatName(id)}
        </span>
      </div>
      <div>
        <div className="flex flex-col py-2 gap-2 items-end">
          <div className="flex flex-col items-center justify-center w-full pb-3 gap-3">
            <label
              htmlFor="profile"
              className="relative text-[10rem] text-gray flex items-center justify-center group/label cursor-pointer"
            >
              {img !== null ? (
                <>
                  <img
                    src={img}
                    alt="profile_picture"
                    className="rounded-full aspect-square w-[50%] max-w-[400px] object-cover"
                  />
                  <RiPencilFill className="absolute top-0 right-1/4 translate-x-[1/4] opacity-0 group-hover/label:opacity-100 text-[3rem] text-dark-gray bg-white p-1 rounded-full border-4 border-white transition-all" />
                </>
              ) : (
                <>
                  <FaUserCircle />
                  <RiPencilFill className="absolute top-0 right-0 opacity-0 group-hover/label:opacity-100 text-[3rem] text-dark-gray bg-white p-1 rounded-full border-4 border-white transition-all" />
                </>
              )}
            </label>
            <input
              type="file"
              id="profile"
              accept=".jpg, .jpeg, .png, .webp"
              className="hidden"
              onChange={(e) => handleChange(e)}
            />
            {file && (
              <div>
                <button
                  onClick={() => {
                    if (uploadProfilePicture(file)) {
                      setModal("success");
                      setModalMessage(
                        "Employee profile has been updated successfully!"
                      );
                      setFile(null);
                    }
                  }}
                  type="button"
                  className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed animate-fade"
                >
                  Upload
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <section className="w-full lg:w-1/2">
              <span className="font-semibold text-[1.05rem]">
                Personal Information
              </span>
              <div className="flex flex-col gap-2 pt-2">
                {Object.keys(personalInfo).map((object_key, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-1 justify-between md:flex-row lg:flex-col xl:flex-row"
                  >
                    <label
                      htmlFor={object_key}
                      className="md:w-1/2 font-semibold"
                    >
                      {splitKey(object_key)}
                    </label>
                    <span className="outline-none bg-white overflow-hidden rounded-md p-1 w-full xl:w-1/2">
                      {personalInfo[object_key]}
                    </span>
                  </div>
                ))}
              </div>
            </section>
            <section className="w-full lg:w-1/2">
              <span className="font-semibold text-[1.05rem]">
                Job Information
              </span>
              <div className="flex flex-col gap-2 pt-2">
                {Object.keys(jobInfo).map((object_key, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-1 justify-between md:flex-row lg:flex-col xl:flex-row"
                  >
                    <label
                      htmlFor={object_key}
                      className="md:w-1/2 font-semibold"
                    >
                      {splitKey(object_key)}
                    </label>
                    <span className="outline-none bg-white overflow-hidden rounded-md p-1 w-full xl:w-1/2">
                      {object_key === "company"
                        ? businessUnits.length > 0 &&
                          businessUnits.find(
                            (comp) => comp.company_id === jobInfo[object_key]
                          ).company_name
                        : object_key === "department"
                        ? departments.length > 0 &&
                          departments.find(
                            (dep) => dep.department_id === jobInfo[object_key]
                          ).department_name
                        : object_key === "job_level"
                        ? userType.length > 0 &&
                          userType.find(
                            (user) => user.job_level_id === jobInfo[object_key]
                          ).job_level_name
                        : object_key === "hire_date"
                        ? format(new Date(jobInfo[object_key]), "MMMM d, yyyy")
                        : jobInfo[object_key]}
                    </span>
                  </div>
                ))}
                {evaluators.primary_evaluator && (
                  <div className="flex flex-col gap-1 justify-between md:flex-row lg:flex-col xl:flex-row">
                    <label className="md:w-1/2 font-semibold">
                      Primary Evaluator
                    </label>
                    <span className="outline-none bg-white overflow-hidden rounded-md p-1 w-full xl:w-1/2">
                      {evaluators.primary_evaluator === "N/A"
                        ? "N/A"
                        : headList
                            .filter(
                              (evaluator) =>
                                parseInt(evaluator.employee_id) ===
                                parseInt(evaluators.primary_evaluator)
                            )
                            .map((ev) => ev.full_name)}
                    </span>
                  </div>
                )}
                {evaluators.secondary_evaluator && (
                  <div className="flex flex-col gap-1 justify-between md:flex-row lg:flex-col xl:flex-row">
                    <label className="md:w-1/2 font-semibold">
                      Secondary Evaluator
                    </label>
                    <span className="outline-none bg-white overflow-hidden rounded-md p-1 w-full xl:w-1/2">
                      {evaluators.secondary_evaluator === "N/A"
                        ? "N/A"
                        : headList
                            .filter(
                              (evaluator) =>
                                parseInt(evaluator.employee_id) ===
                                parseInt(evaluators.secondary_evaluator)
                            )
                            .map((ev) => ev.full_name)}
                    </span>
                  </div>
                )}
                {evaluators.tertiary_evaluator && (
                  <div className="flex flex-col gap-1 justify-between md:flex-row lg:flex-col xl:flex-row">
                    <label className="md:w-1/2 font-semibold">
                      Tertiary Evaluator
                    </label>
                    <span className="outline-none bg-white overflow-hidden rounded-md p-1 w-full xl:w-1/2">
                      {evaluators.tertiary_evaluator === "N/A"
                        ? "N/A"
                        : headList
                            .filter(
                              (evaluator) =>
                                parseInt(evaluator.employee_id) ===
                                parseInt(evaluators.tertiary_evaluator)
                            )
                            .map((ev) => ev.full_name)}
                    </span>
                  </div>
                )}
              </div>
            </section>
          </div>
          <div className="flex flex-row py-1 items-center gap-2">
            <a
              href={`./${id}/edit`}
              className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
            >
              Edit User
            </a>
          </div>
        </div>
      </div>
      {modal === "success" && (
        <AlertModal
          closeModal={setModal}
          modalType={modal}
          title={"Edit Employee"}
          message={modalMessage}
          continuebutton={"Confirm"}
          handleContinue={handleSuccess}
        />
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
