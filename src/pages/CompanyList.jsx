import React, { useEffect, useState } from "react";
import { BsBuildingAdd } from "react-icons/bs";
import { MdRefresh } from "react-icons/md";
import CompanyTable from "../components/Company/CompanyTable";
import CompanyModal from "../misc/CompanyModal";
import AlertModal from "../misc/AlertModal";
import classNames from "classnames";
import { useAuth } from "../context/authContext";
import Alert from "../misc/Alert";
import { useNavigate } from "react-router-dom";

export default function CompanyList() {
  document.title =
    "Companies | United Neon Media Group Performance Management System";
  const { currentUser, departmentList, deleteCompany, deleteDepartment } =
    useAuth();
  const [modal, toggleModal] = useState("standby");
  const [deleteModal, setDeleteModal] = useState("standby");
  const [deleteDetails, setDeleteDetails] = useState({
    ID: null,
    name: "",
    company: "",
  });
  const [deleteModalSuccess, setDeleteModalSuccess] = useState("standby");
  const [deleteModalSuccessMessage, setDeleteModalSuccessMessage] =
    useState("");

  const [companyData, setCompanyData] = useState(0);
  const [departmentID, setDepartmentID] = useState(null);
  const [successModal, showSuccessModal] = useState("");
  const navigate = useNavigate();
  const userType = JSON.parse(currentUser).user_type;
  const contributor = JSON.parse(currentUser).employee_id;
  const handleDelete = () => {
    if (deleteModal === "Company") {
      deleteCompany(contributor, deleteDetails.ID, deleteDetails.name)
        .then((response) => {
          setDeleteModalSuccess("success");
          setDeleteModalSuccessMessage(response);
        })
        .catch((error) => {
          setDeleteModalSuccess("success");
          setDeleteModalSuccessMessage(error);
          console.log(error);
        });
      setDeleteModal("standby");
    } else if (deleteModal === "Department") {
      deleteDepartment(
        contributor,
        deleteDetails.ID,
        deleteDetails.name,
        deleteDetails.company
      )
        .then((response) => {
          setDeleteModalSuccess("success");
          setDeleteModalSuccessMessage(response);
        })
        .catch((error) => {
          setDeleteModalSuccess("error");
          console.log(error);
        });
      setDeleteModal("standby");
    } else {
      setDeleteModal("standby");
    }
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
                  onClick={() => window.location.reload()}
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
                setDeleteModal={setDeleteModal}
                setDeleteDetails={setDeleteDetails}
              />
            </div>
          </div>
        </div>
        {deleteModal !== "standby" && (
          <>
            <AlertModal
              closeModal={setDeleteModal}
              modalType={"confirmation"}
              title={
                deleteModal === "Company"
                  ? `Delete Company ${deleteDetails.name}`
                  : deleteModal === "Department"
                  ? `Delete Department ${deleteDetails.name}`
                  : null
              }
              message={
                deleteModal === "Company"
                  ? `Are you sure you want to delete ${deleteDetails.name} company?`
                  : deleteModal === "Department"
                  ? `Are you sure you want to delete ${deleteDetails.name} department?`
                  : ""
              }
              handleContinue={() => {
                handleDelete();
                setDeleteModal("standby");
              }}
            />
          </>
        )}
        {deleteModalSuccess !== "standby" && (
          <>
            <AlertModal
              closeModal={setDeleteModalSuccess}
              modalType={"status"}
              modalStatus={
                deleteModalSuccessMessage.includes("deleted")
                  ? "success"
                  : "error"
              }
              message={deleteModalSuccessMessage}
              handleContinue={() => {
                setDeleteModal("standby");
                handleDelete();
              }}
              handleSuccess={() => {
                navigate(0);
              }}
            />
          </>
        )}
        {modal !== "standby" && (
          <>
            <CompanyModal
              title={modal}
              action={"Save"}
              closeModal={toggleModal}
              departmentID={departmentID}
              companyData={modal === "add department" ? companyData : null}
              departmentList={
                modal === "add department" ? departmentList : null
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
