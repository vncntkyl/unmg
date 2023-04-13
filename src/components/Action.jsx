import React from "react";
import classNames from "classnames";
import { CiCircleMore } from "react-icons/ci";
import { useFunction } from "../context/FunctionContext";

export default function Action({
  emp,
  toggleActions,
  idx,
  actionsVisibility,
  setEmployeeID,
  toggleModal,
}) {
  const { formatName } = useFunction();
  const viewUser = () => {
    sessionStorage.setItem("user", JSON.stringify(emp));
    window.location.href = "/employees/profile/" + formatName(emp.name);
  };
  const editUser = () => {
    sessionStorage.setItem("user", JSON.stringify(emp));
    window.location.href =
      "/employees/profile/" + formatName(emp.name) + "/edit";
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
        <button
          className="p-1 hover:bg-gray w-full text-left rounded"
          onClick={() => {
            setEmployeeID(emp.id);
            toggleModal("deactivate");
          }}
        >
          Deactivate Employee
        </button>
        <button
          className="p-1 hover:bg-gray w-full text-left rounded text-un-red"
          onClick={() => {
            setEmployeeID(emp.id);
            toggleModal("delete");
          }}
        >
          Delete Employee
        </button>
      </div>
    </td>
  );
}
