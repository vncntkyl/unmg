import React, { useEffect, useState } from "react";
import { BsBuildingAdd } from "react-icons/bs";
import { MdRefresh } from "react-icons/md";
import CompanyTable from "../components/Company/CompanyTable";
import { BiImport } from "react-icons/bi";
import CompanyModal from "../misc/CompanyModal";
import classNames from "classnames";
import { useAuth } from "../context/authContext";
import Alert from "../misc/Alert";
import { useNavigate } from "react-router-dom";

export default function CompanyList() {
  document.title =
    "Companies | United Neon Media Group Performance Management System";
  const { currentUser, departmentList } = useAuth();
  const [modal, toggleModal] = useState("standby");
  const [companyData, setCompanyData] = useState(0);
  const [departmentID, setDepartmentID] = useState(null);
  const [successModal, showSuccessModal] = useState("");
  const navigate = useNavigate();
  const userType = JSON.parse(currentUser).user_type;
  return (
    <>
      <section className="relative">
      <div className={classNames("w-full min-h-[175px]", userType <= 2 ? "bg-un-blue" : userType >= 3 && userType <= 5 ? "bg-un-red-dark-1" : "bg-dark-gray")} />
        <div className="absolute top-0 left-0 w-full px-4 lg:pl-[18rem] xl:pl-[18.5rem] xl:pr-[1.5rem]">
          <div className="bg-white p-2 rounded-md flex flex-col shadow-md justify-between">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <span className="text-un-blue text-[1.2rem] font-semibold">
                Companies
              </span>
              <div className="flex flex-row gap-2 items-center justify-evenly md:w-2/3 xl:w-1/2">
                <button
                  type="button"
                  className=" w-1/3 flex justify-center items-center gap-2 bg-default hover:bg-default-dark rounded-md p-1 md:w-full"
                >
                  <MdRefresh />
                  <span className="text-[.8rem] md:text-[.9rem] lg:whitespace-nowrap">
                    Refresh
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleModal("add company")}
                  className="w-1/3 flex items-center justify-center gap-2 border bg-un-blue-light hover:bg-un-blue rounded-md p-1 text-white md:w-full"
                >
                  <BsBuildingAdd className="hidden md:block" />
                  <span className="text-[.8rem] md:text-[.9rem] whitespace-nowrap">
                    Add Company
                  </span>
                </button>
                <button
                  type="button"
                  className="w-1/3 flex items-center justify-center gap-2 border bg-un-blue-light hover:bg-un-blue rounded-md p-1 px-2 text-white md:w-full"
                >
                  <BiImport className="hidden md:block" />
                  <span className="text-[.8rem] md:text-[.9rem] whitespace-nowrap">
                    Import Company
                  </span>
                </button>
              </div>
            </div>
            <div>
              <CompanyTable
                toggleModal={toggleModal}
                setCompanyData={setCompanyData}
                setDepartmentID={setDepartmentID}
                success={successModal}
              />
            </div>
          </div>
        </div>
        {modal !== "standby" && (
          <>
            <CompanyModal
              title={modal === "delete" ? "Department Deletion" : modal}
              action={modal === "delete" ? "Delete" : "Save"}
              closeModal={toggleModal}
              departmentID={departmentID}
              alert={modal === "delete"}
              companyData={
                modal === "add department" || modal === "delete"
                  ? companyData
                  : null
              }
              departmentList={
                modal === "add department" || modal === "delete"
                  ? departmentList
                  : null
              }
              toggleSuccessModal={showSuccessModal}
            />
            <div
              className={classNames(
                "bg-[#00000035] fixed h-full w-full z-[21] top-0 left-0 animate-fade pointer-events-auto"
              )}
              onClick={() => toggleModal("standby")}
            />
          </>
        )}
        {successModal !== "" && (
          <>
            <Alert
              type="success"
              onClose={() => {
                navigate(0);
              }}
              title={"Congratulations!"}
              message={successModal}
            />
          </>
        )}
      </section>
    </>
  );
}
