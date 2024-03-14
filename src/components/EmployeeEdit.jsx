import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { useFunction } from "../context/FunctionContext";
import Input from "./Input";
import classNames from "classnames";
import { useAuth } from "../context/authContext";
import AlertModal from "../misc/AlertModal";
export default function EmployeeEdit({ admin }) {
  const { id } = useParams();
  const {
    getBusinessUnits,
    getDepartments,
    headList,
    usertypeList,
    updateUser,
    navigate,
    uploadProfilePicture,
    currentUser,
  } = useAuth();
  const {
    splitKey,
    reformatName,
    compareObjectArrays,
    capitalizeSentence,
    userInformationChecker,
    areValuesFilled,
    caps,
  } = useFunction();
  const path = window.location.pathname.split("/")[1];
  const [loading, toggleLoading] = useState(true);
  const [personalInfo, setPersonalInfo] = useState([]);
  const [jobInfo, setJobInfo] = useState([]);
  const [evaluators, setEvaluators] = useState([]);
  const [businessUnits, setBusinessUnits] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [infoChecker, setInfoChecker] = useState([]);
  const [modal, setModal] = useState("standby");
  const [modalMessage, setModalMessage] = useState("");
  const employment_type = ["LOCAL", "EXPAT"];
  const salutationList = ["Mr.", "Miss."];
  const contractList = ["Regular", "Probationary"];
  useEffect(() => {
    setInfoChecker(userInformationChecker(personalInfo, jobInfo, evaluators));
  }, [personalInfo, jobInfo]);

  const handleConfirmation = () => {
    setModal("confirmation");
  };
  const handleSubmit = () => {
    const contributor = JSON.parse(
      localStorage.getItem("currentUser")
    ).employee_id;
    let user = [];
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
    } else {
      user = JSON.parse(currentUser);
    }
    const data = caps(personalInfo);
    const userdata = { ...data, ...jobInfo, ...evaluators };
    if (updateUser(userdata, contributor, user.users_id)) {
      const changes = compareObjectArrays(user, {
        users_id: user.users_id,
        username: user.username,
        first_name: userdata.first_name,
        middle_name: userdata.middle_name,
        last_name: userdata.last_name,
        suffix: userdata.suffix,
        nickname: userdata.nickname,
        salutation: userdata.salutation,
        email: userdata.email_address,
        contact_no: userdata.contact_no,
        address: userdata.address,
        nationality: userdata.nationality,
        username: userdata.username,
        employee_id: user.employee_id,
        company: userdata.company,
        department: userdata.department,
        team: userdata.team,
        job_description: userdata.job_description,
        job_level: userdata.user_type,
        employment_type: userdata.employment_category,
        contract_type: userdata.contract_type,
        primary_evaluator: userdata.primary_evaluator,
        secondary_evaluator: userdata.secondary_evaluator,
        tertiary_evaluator: userdata.tertiary_evaluator,
        hire_date: userdata.hire_date,
      });

      if (changes.length > 0) {
        changes.forEach((change) => {
          user[change.key] = change.newValue;
        });
        if (localStorage.getItem("user")) {
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          localStorage.setItem("currentUser", JSON.stringify(user));
        }
      }
      setModal("success");
      setModalMessage("Employee profile has been updated successfully!");
    }else{
      setModal("success");
      setModalMessage("Failed to update employee profile!");
    }
  };

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
    };
    setup();

    setPersonalInfo({
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      suffix: user.suffix,
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
      primary_evaluator: user.primary_evaluator || "N/A",
      secondary_evaluator: user.secondary_evaluator || "N/A",
      tertiary_evaluator: user.tertiary_evaluator || "N/A",
    });
    toggleLoading(false);
  }, []);
  return loading ? (
    <>Loading...</>
  ) : (
    <>
      <div className="flex flex-col gap-2">
        <a
          href={path === "employees" ? "/employees" : `/${path}/${id}`}
          className="flex flex-row items-center gap-2 bg-un-blue w-fit text-white text-[.8rem] p-1 pr-2 rounded-md hover:bg-un-blue-light"
        >
          <IoChevronBack />
          <span>Back</span>
        </a>
        <span className="text-dark-gray text-[1.2rem] font-semibold">
          {reformatName(id)}
        </span>
      </div>
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
                <RiPencilFill
                  className={classNames(
                    "absolute top-0 right-1/4 translate-x-[1/4] opacity-0 group-hover/label:opacity-100 text-[3rem] text-dark-gray bg-white p-1 rounded-full border-4 border-white transition-all"
                  )}
                />
              </>
            ) : (
              <>
                <FaUserCircle />
                <RiPencilFill
                  className={classNames(
                    "absolute top-0 right-0 opacity-0 group-hover/label:opacity-100 text-[3rem] text-dark-gray bg-white p-1 rounded-full border-4 border-white transition-all"
                  )}
                />
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
          <section className="w-full lg:w-1/2 bg-default p-2 rounded-md">
            <span className="font-semibold text-[1.05rem]">
              Personal Information
            </span>
            <div className="flex flex-col gap-2 pt-2">
              {Object.keys(personalInfo)?.map((object_key, index) => (
                <Input
                  key={index}
                  withLabel={true}
                  label={
                    <p>
                      {splitKey(object_key)}{" "}
                      {![
                        "middle_name",
                        "nickname",
                        "contact_no",
                        "suffix",
                        "address",
                        "nationality",
                      ].includes(object_key) && (
                        <span className="text-un-red">*</span>
                      )}
                    </p>
                  }
                  id={object_key}
                  val={personalInfo[object_key]}
                  set={setPersonalInfo}
                  required={
                    ![
                      "middle_name",
                      "nickname",
                      "contact_no",
                      "suffix",
                      "address",
                      "nationality",
                    ].includes(object_key)
                  }
                  editable={true}
                  type={object_key === "salutation" ? "dropdown" : "text"}
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
              {Object.keys(jobInfo)?.map((object_key, index) => (
                <Input
                  key={index}
                  withLabel={true}
                  label={
                    <p>
                      {splitKey(object_key)}{" "}
                      {![
                        "primary_evaluator",
                        "secondary_evaluator",
                        "tertiary_evaluator",
                      ].includes(object_key) && (
                        <span className="text-un-red">*</span>
                      )}
                    </p>
                  }
                  id={object_key}
                  required={!object_key}
                  val={jobInfo[object_key]}
                  set={setJobInfo}
                  editable={true}
                  type={
                    [
                      "company",
                      "department",
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
                      : object_key === "department"
                      ? departments.filter(
                          (dept) => dept.company_id == jobInfo.company
                        )
                      : object_key === "job_level"
                      ? usertypeList &&
                        usertypeList.map((type) => {
                          return {
                            ...type,
                            job_level_name: capitalizeSentence(
                              type.job_level_name
                            ),
                          };
                        })
                      : object_key === "employment_type"
                      ? employment_type
                      : object_key === "contract_type"
                      ? contractList
                      : undefined
                  }
                />
              ))}
            </div>
            {/* evaluators */}
            {evaluators?.primary_evaluator && (
              <>
                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex flex-col gap-1 justify-between md:flex-row lg:flex-col xl:flex-row">
                    <label className="md:w-1/2">Primary Evaluator</label>
                    <select
                      className="outline-none bg-white overflow-hidden rounded-md p-1 w-full xl:w-1/2"
                      onChange={(e) => {
                        setEvaluators({
                          ...evaluators,
                          primary_evaluator: e.target.value,
                        });
                      }}
                    >
                      <option value="" selected={-1} disabled>
                        --Select Primary Evaluator--
                      </option>
                      <option
                        value="N/A"
                        selected={evaluators.primary_evaluator === "N/A"}
                      >
                        None
                      </option>
                      {headList?.map((head, index) => {
                        return (
                          <option
                            key={index}
                            value={head.employee_id}
                            selected={
                              evaluators.primary_evaluator === head.employee_id
                                ? true
                                : false
                            }
                          >
                            {head.full_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {evaluators?.primary_evaluator !== "N/A" &&
                  evaluators?.primary_evaluator ? (
                    <>
                      <div className="flex flex-col gap-1 justify-between md:flex-row lg:flex-col xl:flex-row">
                        <label className="md:w-1/2">Secondary Evaluator</label>
                        <select
                          className="outline-none bg-white overflow-hidden rounded-md p-1 w-full xl:w-1/2"
                          onChange={(e) => {
                            setEvaluators({
                              ...evaluators,
                              secondary_evaluator: e.target.value,
                            });
                          }}
                        >
                          <option value="" selected={-1} disabled>
                            --Select Secondary Evaluator--
                          </option>
                          <option
                            value="N/A"
                            selected={evaluators.secondary_evaluator === "N/A"}
                          >
                            None
                          </option>
                          {headList?.filter(
                              (item) =>
                                parseInt(item.employee_id) !==
                                parseInt(evaluators.primary_evaluator)
                            ).map((head, index) => {
                              return (
                                <option
                                  key={index}
                                  value={head.employee_id}
                                  selected={
                                    evaluators.secondary_evaluator ===
                                    head.employee_id
                                      ? true
                                      : false
                                  }
                                >
                                  {head.full_name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      {evaluators?.secondary_evaluator !== "N/A" &&
                      evaluators?.secondary_evaluator ? (
                        <>
                          <div className="flex flex-col gap-1 justify-between md:flex-row lg:flex-col xl:flex-row">
                            <label className="md:w-1/2">
                              Tertiary Evaluator
                            </label>
                            <select
                              className="outline-none bg-white overflow-hidden rounded-md p-1 w-full xl:w-1/2"
                              onChange={(e) => {
                                setEvaluators({
                                  ...evaluators,
                                  tertiary_evaluator: e.target.value,
                                });
                              }}
                            >
                              <option value="" selected={-1} disabled>
                                --Select Tertiary Evaluator--
                              </option>
                              <option value="">None</option>
                              {headList?.filter(
                                  (item) =>
                                    parseInt(item.employee_id) !==
                                      parseInt(evaluators.primary_evaluator) &&
                                    parseInt(item.employee_id) !==
                                      parseInt(evaluators.secondary_evaluator)
                                ).map((head, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={head.employee_id}
                                      selected={
                                        evaluators.tertiary_evaluator ===
                                        head.employee_id
                                          ? true
                                          : false
                                      }
                                    >
                                      {head.full_name}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </>
            )}
          </section>
        </div>
        {areValuesFilled(personalInfo) && areValuesFilled(jobInfo) ? (
          ""
        ) : (
          <span className="text-un-red text-[0.8rem]">
            Please fill out the required fields that have a *
          </span>
        )}
        {infoChecker && (
          <>
            {infoChecker.email ||
            infoChecker.contact_no ||
            infoChecker.employee_id ? (
              <div className="text-un-red text-[0.8rem]">
                <span>Other fields to be checked:</span>
                <ul>
                  <li>{infoChecker.email && infoChecker.email}</li>
                  <li>{infoChecker.contact_no && infoChecker.contact_no}</li>
                  <li>{infoChecker.employee_id && infoChecker.employee_id}</li>
                </ul>
              </div>
            ) : (
              ""
            )}
          </>
        )}
        <div className="flex flex-row py-1 items-center gap-2">
          <a
            href={`../${id}`}
            className="text-dark-gray border border-dark-gray p-1 px-2 rounded text-[.9rem] hover:text-gray hover:border-gray"
          >
            Cancel
          </a>
          <input
            type="button"
            value="Save Changes"
            onClick={handleConfirmation}
            className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
            disabled={
              areValuesFilled(personalInfo) && areValuesFilled(jobInfo)
                ? infoChecker.email === "" &&
                  infoChecker.contact_no === "" &&
                  infoChecker.employee_id === ""
                  ? false
                  : true
                : true
            }
          />
        </div>
      </div>
      {modal === "confirmation" && (
        <>
          <AlertModal
            closeModal={setModal}
            modalType={"confirmation"}
            title={"Edit Employee"}
            message={"Are you sure the account details are correct?"}
            handleContinue={() => {
              handleSubmit();
            }}
          />
        </>
      )}
      {modal === "success" && (
        <AlertModal
          closeModal={setModal}
          modalType={"status"}
          modalStatus={modalMessage === "Employee profile has been updated successfully!" ? "success" : "error"}
          message={modalMessage}
          continuebutton={"Confirm"}
          handleContinue={() => {
            handleSuccess();
            setModal("standby");
          }}
        />
      )}
    </>
  );
}
