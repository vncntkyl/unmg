import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { json, useParams } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { useFunction } from "../context/FunctionContext";
import Input from "./Input";
import classNames from "classnames";
import { useAuth } from "../context/authContext";
export default function EmployeeProfile() {
  const { id } = useParams();
  const { companyList } = useAuth();
  const { splitKey, reformatName } = useFunction();

  const [personalInfo, setPersonalInfo] = useState([]);
  const [jobInfo, setJobInfo] = useState([]);
  const [img, setImg] = useState(null);
  const [editable, setEditable] = useState(false);
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
    alert(sessionStorage.getItem("user"));
  };
  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      window.location.href = "/employees";
      return;
    }
    if (window.location.pathname.includes("/edit")) {
      setEditable(true);
    }
    const user = JSON.parse(sessionStorage.getItem("user"));

    //get image
    import(`../assets/profile/profile_${user["id"]}.png`)
      .then((img) => {
        setImg(img.default);
      })
      .catch((error) => {
        console.error("Failed to load image:", error);
      });

    setPersonalInfo({
      name: user["name"],
      salutation: user["salutation"],
      email: user["email"],
      contact_no: user["contact_no"],
      address: user["address"],
      username: user["username"],
    });
    setJobInfo({
      company: user["company"],
      department: user["department"],
      supervisor: "Analyn",
      immediate_supervisor: "Ligaya",
      position: user["position"],
      status: user["status"],
    });
  }, []);
  return (
    sessionStorage.getItem("user") && (
      <>
        <div className="flex flex-col gap-2">
          <a
            href="/employees"
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
            <div className="flex items-center justify-center w-full">
              {/* PICTURE URL = ../assets/profile/profile_{id} (id is the ID of the user) */}
              <label
                htmlFor="profile"
                className="relative text-[10rem] text-gray flex items-center justify-center group/label cursor-pointer"
              >
                {img !== null ? (
                  <>
                    <img
                      src={img}
                      alt="profile_picture"
                      className="rounded-full aspect-square w-[50%]"
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
              />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 w-full">
              <section className="w-full lg:w-1/2">
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
              <section className="w-full lg:w-1/2">
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
                      set={setJobInfo}
                      val={jobInfo[object_key]}
                      editable={editable}
                      type={
                        [
                          "company",
                          "supervisor",
                          "immediate_supervisor",
                          "job_status",
                        ].includes(object_key)
                          ? editable
                            ? "dropdown"
                            : "text"
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
      </>
    )
  );
}
