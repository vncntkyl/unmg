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
export default function EmployeeProfile({ admin }) {
  const { id } = useParams();
  const {
    companyList,
    departmentList,
    headList,
    usertypeList,
    updateUser,
    navigate,
  } = useAuth();
  const { splitKey, reformatName, compareObjectArrays } = useFunction();

  const redirect_back_link = sessionStorage.getItem("redirect_back_to");

  const [personalInfo, setPersonalInfo] = useState([]);
  const [jobInfo, setJobInfo] = useState([]);
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [editable, setEditable] = useState(false);
  const [modal, setModal] = useState("standby");
  const salutationList = ["Mr.", "Miss", "Mrs."];
  const jobStatusList = ["Regular", "Probation", "Resigned"];

  const handleSubmit = (e) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    e.preventDefault();
    const userdata = { ...personalInfo, ...jobInfo };
    setTimeout(() => {
      if (updateUser(userdata, user.users_id)) {
        setEditable(false);
        const changes = compareObjectArrays(user, {
          address: userdata.address,
          company_id: userdata.company,
          contact_no: userdata.contact_no,
          deleted: user.deleted,
          department_id: userdata.department,
          email: userdata.email,
          first_name: userdata.first_name,
          immediate_supervisor_id: userdata.immediate_supervisor,
          inactive: user.inactive,
          job_description: userdata.job_description,
          last_name: userdata.last_name,
          middle_name: userdata.middle_name,
          password: user.password,
          picture: user.picture,
          salutation: userdata.salutation,
          supervisor_id: userdata.supervisor,
          user_status: userdata.status,
          user_type: userdata.user_type,
          username: userdata.username,
          users_id: user.users_id,
        });

        if (changes.length > 0) {
          changes.forEach((change) => {
            user[change.key] = change.newValue;
          });
          sessionStorage.setItem("user", JSON.stringify(user));
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

  const handleUpload = async () => {
    let url = "http://localhost/unmg_pms/api/uploadImage.php";
    //let url = "../api/uploadImage.php";
    const imageURL = `../images/profile_${
      JSON.parse(sessionStorage.getItem("user")).users_id
    }.${file.name.split(".")[file.name.split(".").length - 1]}`;

    const formdata = new FormData();
    formdata.append("imageFile", file);
    formdata.append(
      "user_id",
      JSON.parse(sessionStorage.getItem("user")).users_id
    );
    formdata.append("imageURL", imageURL);
    try {
      const response = await axios.post(url, formdata);
      if (response.data === "success") {
        const tempUser = JSON.parse(sessionStorage.getItem("user"));
        tempUser.picture = imageURL;
        sessionStorage.setItem("user", JSON.stringify(tempUser));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (window.location.pathname.includes("/edit")) {
      setEditable(true);
    }

    let user = [];
    if (!admin) {
      if (!sessionStorage.getItem("user")) {
        window.location.href = "/employees";
        return;
      }
      user = JSON.parse(sessionStorage.getItem("user"));
    } else {
      if (!sessionStorage.getItem("currentUser")) {
        window.location.href = "/";
        return;
      }
      user = JSON.parse(sessionStorage.getItem("currentUser"));
    }
    //get image
    if (user.picture) {
      import("../" + user.picture)
        .then((img) => {
          setImg(img.default);
        })
        .catch((error) => {
          console.error("Failed to load image:", error);
        });
    }

    setPersonalInfo({
      first_name: user["first_name"],
      middle_name: user["middle_name"],
      last_name: user["last_name"],
      salutation: user["salutation"],
      email: user["email"],
      contact_no: user["contact_no"],
      address: user["address"],
      username: user["username"],
    });
    setJobInfo({
      company: user["company_id"],
      department: user["department_id"],
      supervisor: user["supervisor_id"],
      immediate_supervisor: user["immediate_supervisor_id"],
      job_description: user["job_description"],
      status: user["user_status"],
      user_type: user["user_type"],
    });
  }, []);
  return personalInfo ? (
    <>
      <div className="flex flex-col gap-2">
        <a
          href={redirect_back_link ? redirect_back_link : "/employees"}
          onClick={() => {
            if (!redirect_back_link) return;
            sessionStorage.removeItem("redirect_back_to");
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
                  onClick={() => handleUpload()}
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
                    val={jobInfo[object_key]}
                    set={setJobInfo}
                    editable={editable}
                    type={
                      [
                        "company",
                        "department",
                        "supervisor",
                        "immediate_supervisor",
                        "status",
                        "user_type",
                      ].includes(object_key)
                        ? editable
                          ? "dropdown"
                          : "text"
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
                        : object_key === "status"
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
