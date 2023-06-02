import React from "react";
import classNames from "classnames";
import { CiCircleMore } from "react-icons/ci";
import { useFunction } from "../context/FunctionContext";
import { useNavigate } from "react-router-dom";

export default function Action({
  emp,
  toggleActions,
  idx,
  actionsVisibility,
  setEmployeeID,
  toggleModal,
}) {
  const { formatName } = useFunction();
  const navigate = useNavigate();
  const viewUser = () => {
    sessionStorage.setItem("user", JSON.stringify(emp));
    navigate("/employees/profile/" + formatName(emp.first_name));
  };
  const editUser = () => {
    sessionStorage.setItem("user", JSON.stringify(emp));
    navigate("/employees/profile/" + formatName(emp.first_name) + "/edit");
  };
  return (
    <td className="relative flex items-center justify-center py-1">
      <button
        type="button"
        onClick={() => toggleActions(idx)}
        className=" outline-none cursor-pointer text-un-blue text-[1.5rem] hover:text-un-blue-light transition-all"
      >
        <CiCircleMore />
      </button>
      <div
        className={classNames(
          actionsVisibility[idx]
            ? "max-h-[500px] opacity-1 pointer-events-auto scale-100"
            : "max-h-[0px] opacity-0 pointer-events-none scale-0",
          "absolute top-1/4 right-1/2 text-[.9rem] origin-top-right min-w-max bg-white shadow-md rounded flex flex-col transition-all z-10 p-2 items-start"
        )}
      >
        <button
          className="p-1 hover:bg-gray w-full text-left rounded"
          onClick={() => viewUser()}
        >
          View Employee
        </button>
        <button
          className="p-1 hover:bg-gray w-full text-left rounded"
          onClick={() => editUser()}
        >
          Edit Employee
        </button>
        {emp.inactive > 0 ? (
          <button
            className="p-1 hover:bg-gray w-full text-left rounded"
            onClick={() => {
              setEmployeeID(emp.users_id);
              toggleModal("activate");
            }}
          >
            Re-activate Employee
          </button>
        ) : (
          <button
            className="p-1 hover:bg-gray w-full text-left rounded"
            onClick={() => {
              setEmployeeID(emp.users_id);
              toggleModal("deactivate");
            }}
          >
            Deactivate Employee
          </button>
        )}
        <button
          className="p-1 hover:bg-gray w-full text-left rounded text-un-red"
          onClick={() => {
            setEmployeeID(emp.users_id);
            toggleModal("delete");
          }}
        >
          Delete Employee
        </button>
      </div>
    </td>
  );
}

export function CompanyAction({
  toggleActions,
  actionsVisibility,
  idx,
  toggleModal,
  setDepartmentID,
  deptID,
}) {
  return (
    <>
      <td className="relative flex items-center justify-center py-1">
        <button
          type="button"
          onClick={() => toggleActions(idx)}
          className=" outline-none cursor-pointer text-un-blue text-[1.5rem] hover:text-un-blue-light transition-all"
        >
          <CiCircleMore />
        </button>
        <div
          className={classNames(
            actionsVisibility[idx]
              ? "max-h-[500px] opacity-1 pointer-events-auto scale-100"
              : "max-h-[0px] opacity-0 pointer-events-none scale-0",
            "absolute top-1/4 right-1/2 text-[.9rem] origin-top-right min-w-max bg-white shadow-md rounded flex flex-col transition-all z-10 p-2 items-start"
          )}
        >
          <button
            className="p-1 hover:bg-gray w-full text-left rounded text-un-red"
            onClick={() => {
              setDepartmentID(deptID);
              toggleModal("delete");
            }}
          >
            Dissolve Department
          </button>
        </div>
      </td>
    </>
  );
}

export function RoleActions({ modal, toggleModal, emp, setEmployee }) {
  const navigate = useNavigate();
  const { formatName, getPath } = useFunction();
  return (
    <>
      <button
        type="button"
        onClick={() => {
          toggleModal((prev) => {
            if (prev !== "open") {
              return "open";
            } else {
              return "standby";
            }
          });
        }}
        className=" outline-none cursor-pointer text-un-blue text-[1.5rem] hover:text-un-blue-light transition-all"
      >
        <CiCircleMore />
      </button>
      <div
        className={classNames(
          modal === "open"
            ? "max-h-[500px] opacity-1 pointer-events-auto scale-100"
            : "max-h-[0px] opacity-0 pointer-events-none scale-0",
          "absolute top-1/4 right-full text-[.9rem] origin-top-right min-w-max bg-white shadow-md rounded flex flex-col transition-all z-10 p-2 items-start"
        )}
      >
        <button
          className="p-1 hover:bg-gray w-full text-left rounded text-black"
          onClick={() => {
            sessionStorage.setItem("user", JSON.stringify(emp));
            sessionStorage.setItem("redirect_back_to", getPath());
            navigate("/employees/profile/" + formatName(emp.first_name));
          }}
        >
          View Employee
        </button>
        <button
          className="p-1 hover:bg-gray w-full text-left rounded text-black"
          onClick={() => {
            toggleModal("re-assign role");
            setEmployee(emp);
          }}
        >
          Re-assign Role
        </button>
      </div>
    </>
  );
}
