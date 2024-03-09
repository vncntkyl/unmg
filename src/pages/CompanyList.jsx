import React, { useEffect, useState } from "react";
import { BsBuildingAdd } from "react-icons/bs";
import { MdRefresh } from "react-icons/md";
import CompanyTable from "../components/Company/CompanyTable";
import { BiImport } from "react-icons/bi";
import CompanyModal from "../misc/CompanyModal";
import AlertModal from "../misc/AlertModal";
import classNames from "classnames";
import { useAuth } from "../context/authContext";
import Alert from "../misc/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { developmentAPIs as url } from "../context/apiList";

export default function CompanyList() {
  document.title =
    "Companies | United Neon Media Group Performance Management System";
  const { currentUser, departmentList } = useAuth();
  const [modal, toggleModal] = useState("standby");

  const [deleteCompanyModal, setDeleteCompanyModal] = useState("standby");
  const [deleteCompanyModalSuccess, setDeleteCompanyModalSuccess] =
    useState("standby");
  const [deleteCompanyModalData, setDeleteCompanyModalData] = useState();
  const [companyDetails, setCompanyDetails] = useState({
    ID: null,
    name: "",
  });

  const [deleteDepartmentModal, setDeleteDepartmentModal] = useState("standby");
  const [deleteDepartmentSuccess, setDeleteDepartmentSuccess] =
    useState("standby");
  const [deleteDepartmentModalData, setDeleteDepartmentModalData] = useState();
  const [departmentDetails, setDepartmentDetails] = useState({
    ID: null,
    department: "",
  });

  const [companyData, setCompanyData] = useState(0);
  const [departmentID, setDepartmentID] = useState(null);
  const [successModal, showSuccessModal] = useState("");
  const navigate = useNavigate();
  const userType = JSON.parse(currentUser).user_type;

  const handleCompanyDeleteContinue = () => {
    let fData = new FormData();
    fData.append("submit", true);
    fData.append("companyID", companyDetails.ID);
    fData.append("companyName", companyDetails.name);
    axios
      .post(url.userDeleteCompany, fData)
      .then((response) => {
        setDeleteCompanyModalSuccess("success");
        setDeleteCompanyModalData(response.data);
      })
      .catch((error) => {
        setDeleteCompanyModalSuccess("error");
        console.log(error);
      });
    setDeleteCompanyModal("standby");
  };
  const handleDepartmentDeleteContinue = () => {
    let fdata = new FormData();
    fdata.append("submit", true);
    fdata.append("departmentID", departmentDetails.ID);
    fdata.append("departmentName", departmentDetails.department);
    axios
      .post(url.userDeleteDepartment, fdata)
      .then((response) => {
        setDeleteDepartmentSuccess("success");
        setDeleteDepartmentModalData(response.data);
      })
      .catch((error) => {
        setDeleteDepartmentSuccess("error");
        console.log(error);
      });
  };
  return (
    <>
      <section className="relative">
        <div
          className={classNames(
            "w-full min-h-[175px]",
            userType <= 2
              ? "bg-un-blue"
              : userType >= 3 && userType <= 5
              ? "bg-un-red-dark-1"
              : "bg-dark-gray"
          )}
        />
        <div className="absolute top-0 left-0 w-full px-4 lg:pl-[18rem] xl:pl-[18.5rem] xl:pr-[1.5rem]">
          <div className="bg-white p-2 rounded-md flex flex-col shadow-md justify-between">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <span className="text-un-blue text-[1.2rem] font-semibold">
                Companies
              </span>
              <div className="flex flex-row gap-2 items-center justify-evenly md:w-2/3 xl:w-1/2">
                <button
                  type="button"
                  className=" w-1/2 flex justify-center items-center gap-2 bg-default hover:bg-default-dark rounded-md p-1 md:w-full"
                >
                  <MdRefresh />
                  <span className="text-[.8rem] md:text-[.9rem] lg:whitespace-nowrap">
                    Refresh
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleModal("add company")}
                  className="w-1/2 flex items-center justify-center gap-2 border bg-un-blue-light hover:bg-un-blue rounded-md p-1 text-white md:w-full"
                >
                  <BsBuildingAdd className="hidden md:block" />
                  <span className="text-[.8rem] md:text-[.9rem] whitespace-nowrap">
                    Add Company
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
                setDeleteCompanyModal={setDeleteCompanyModal}
                setCompanyDetails={setCompanyDetails}
                setDeleteDepartmentModal={setDeleteDepartmentModal}
                setDepartmentDetails={setDepartmentDetails}
                // handleDelete={handleDelete}
              />
            </div>
          </div>
        </div>
        {deleteCompanyModal !== "standby" && (
          <>
            <AlertModal
              closeModal={setDeleteCompanyModal}
              modalType={"confirmation"}
              title={`Delete ${companyDetails.name}`}
              message={`Are you sure you want to delete ${companyDetails.name}?`}
              handleContinue={() => {
                handleCompanyDeleteContinue();
                setDeleteCompanyModal("standby");
              }}
            />
          </>
        )}
        {deleteCompanyModalSuccess !== "standby" && (
          <>
            <AlertModal
              closeModal={setDeleteCompanyModalSuccess}
              modalType={"status"}
              modalStatus={
                deleteCompanyModalData.includes("has been deleted!")
                  ? "success"
                  : "error"
              }
              message={deleteCompanyModalData}
              handleContinue={() => {
                handleCompanyDeleteContinue();
                setDeleteCompanyModal("standby");
              }}
            />
          </>
        )}
        {deleteDepartmentModal !== "standby" && (
          <>
            <AlertModal
              closeModal={setDeleteDepartmentModal}
              modalType={"confirmation"}
              title={`Delete ${departmentDetails.department} department?`}
              message={`Are you sure you want to delete ${departmentDetails.department} department?`}
              handleContinue={() => {
                handleDepartmentDeleteContinue();
                setDeleteDepartmentModal("standby");
              }}
            />
          </>
        )}
        {deleteDepartmentSuccess !== "standby" && (
          <>
            <AlertModal
              closeModal={deleteDepartmentModalData}
              modalType={"status"}
              modalStatus={
                deleteDepartmentModalData.includes("has been deleted!")
                  ? "success"
                  : "error"
              }
              message={deleteDepartmentModalData}
              handleContinue={() => {
                handleDepartmentDeleteContinue();
                setDeleteDepartmentModal("standby");
              }}
            />
          </>
        )}
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
