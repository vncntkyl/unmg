import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { useFunction } from "../context/FunctionContext";
import Input from "./Input";
import classNames from "classnames";
import { useAuth } from "../context/authContext";
import axios from "axios";
import Modal from "../misc/Modal";
import { format } from "date-fns";
export default function EmployeeProfile({ admin }) {
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
  const { splitKey, reformatName, compareObjectArrays, capitalizeSentence } =
    useFunction();

  const redirect_back_link = localStorage.getItem("redirect_back_to");

  const [personalInfo, setPersonalInfo] = useState([]);
  const [jobInfo, setJobInfo] = useState([]);
  const [businessUnits, setBusinessUnits] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [editable, setEditable] = useState(false);
  const [modal, setModal] = useState("standby");

  const employment_type = ["LOCAL", "EXPAT"];
  const salutationList = ["Mr.", "Miss", "Mrs."];
  const contractList = ["regular", "probation", "project based", "consultant"];

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = [];
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
    } else {
      user = JSON.parse(currentUser);
    }
    const userdata = { ...personalInfo, ...jobInfo };
    setTimeout(() => {
      if (updateUser(userdata, user.users_id)) {
        setEditable(false);
        const changes = compareObjectArrays(user, {
          users_id: user.users_id,
          username: user.username,
          first_name: userdata.first_name,
          middle_name: userdata.middle_name,
          last_name: userdata.last_name,
          suffix: userdata.suffix || "N/A",
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
          primary_evaluator: userdata.primary_evaluator || "N/A",
          secondary_evaluator: userdata.secondary_evaluator || "N/A",
          tertiary_evaluator: userdata.tertiary_evaluator || "N/A",
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
        navigate(`/employees/profile/${id}`);
        setModal("success");
      }
    }, 1000);
  };

  const handleDismissal = () => {
    setModal("standby");
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
    if (window.location.pathname.includes("/edit")) {
      setEditable(true);
    }

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
      primary_evaluator: user.primary_evaluator,
      secondary_evaluator: user.secondary_evaluator || "N/A",
      tertiary_evaluator: user.tertiary_evaluator || "N/A",
      hire_date: user.hire_date,
    });
  }, []);
  return personalInfo ? (
    <>
      <div className="flex flex-col gap-2">
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
        <span className="text-dark-gray text-[1.2rem] font-semibold">
          {reformatName(id)}
        </span>
      </div>
      <div>
        <form
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col py-2 gap-2 items-end"
          encType="multipart/form-data"
        >
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
                      setModal("success upload");
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
            <section
              className={classNames(
                "w-full lg:w-1/2",
                editable && "bg-default p-2 rounded-md"
              )}
            >
              <span className="font-semibold text-[1.05rem]">
                Personal Information
              </span>
              <div className="flex flex-col gap-2 pt-2">
                {Object.keys(personalInfo).map((object_key, index) => (
                  <Input
                    key={index}
                    withLabel={true}
                    label={splitKey(object_key)}
                    id={object_key}
                    set={setPersonalInfo}
                    val={personalInfo[object_key]}
                    editable={editable}
                    type={
                      object_key === "salutation"
                        ? editable
                          ? "dropdown"
                          : "text"
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
            <section
              className={classNames(
                "w-full lg:w-1/2",
                editable && "bg-default p-2 rounded-md"
              )}
            >
              <span className="font-semibold text-[1.05rem]">
                Job Information
              </span>
              <div className="flex flex-col gap-2 pt-2">
                {Object.keys(jobInfo).map((object_key, index) => (
                  <Input
                    key={index}
                    withLabel={true}
                    label={splitKey(object_key)}
                    id={object_key}
                    val={
                      object_key === "job_level"
                        ? usertypeList.find(
                            (usertype) =>
                              usertype.job_level_id === jobInfo.job_level
                          ).job_level_name
                        : jobInfo[object_key]
                    }
                    set={setJobInfo}
                    editable={editable}
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
                        ? editable
                          ? "dropdown"
                          : "text"
                        : object_key === "hire_date"
                        ? editable
                          ? "date"
                          : "text"
                        : "text"
                    }
                    dropdownOptions={
                      object_key === "company"
                        ? businessUnits
                        : object_key === "department"
                        ? departments.filter(
                            (dept) => dept.company_id == jobInfo.company
                          )
                        : object_key.includes("evaluator")
                        ? headList
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
                        : object_key === "contract_type"
                        ? contractList.map((contract) => {
                            return capitalizeSentence(contract);
                          })
                        : object_key === "employment_type"
                        ? employment_type
                        : undefined
                    }
                  />
                ))}
              </div>
            </section>
          </div>
          <div className="flex flex-row py-1 items-center gap-2">
            {editable ? (
              <>
                <a
                  href={`../${id}`}
                  className="text-dark-gray border border-dark-gray p-1 px-2 rounded text-[.9rem] hover:text-gray hover:border-gray"
                >
                  Cancel
                </a>
                <input
                  type="submit"
                  value="Save Changes"
                  className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
                />
              </>
            ) : (
              <a
                href={`./${id}/edit`}
                className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
              >
                Edit User
              </a>
            )}
          </div>
        </form>
      </div>
      {modal === "success" && (
        <>
          <Modal
            title={"Update Account"}
            message={`Account has been updated!`}
            closeModal={setModal}
            action={"Dismiss"}
            handleContinue={handleDismissal}
          />
        </>
      )}
      {modal === "success upload" && (
        <>
          <Modal
            title={"Update Profile Picture"}
            message={`Profile picture has been updated!`}
            closeModal={setModal}
            action={"Dismiss"}
            handleContinue={handleDismissal}
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
  ) : (
    <>Loading...</>
  );
}
