import React from "react";
import { GrClose } from "react-icons/gr";
import { useFunction } from "../context/FunctionContext";

export default function Modal({
  title,
  message,
  action,
  closeModal,
  closeAction,
  setEmployeeID,
  handleContinue,
}) {
  const { capitalize } = useFunction();
  return (
    <>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[90%] max-w-[90%] z-[25] bg-white rounded-md p-2 transition-all md:min-w-[70%] lg:min-w-[0%]">
        {/* TITLE */}
        <div className="flex flex-row items-center justify-between border-b border-gray py-1">
          <span className="font-semibold text-[1.1rem]">{title}</span>
          <button
            onClick={() => {
              closeModal("standby");
              if (setEmployeeID) setEmployeeID(null);
            }}
            className="text-[.7rem] px-1"
          >
            <GrClose />
          </button>
        </div>
        {/* MESSAGE */}
        <div className="p-2">{message}</div>
        {/* FOOTER */}
        <div className="flex flex-row items-center justify-end gap-4 p-2">
          {!closeAction ? (
            <button
              onClick={() => {
                closeModal("standby");
                if (setEmployeeID) setEmployeeID(null);
              }}
              className="text-dark-gray border border-dark-gray p-1 px-2 rounded-md text-[.9rem] hover:text-gray hover:border-gray"
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={() => {
                closeModal("standby");
                if (setEmployeeID) setEmployeeID(null);
              }}
              className="text-dark-gray border border-dark-gray p-1 px-2 rounded-md text-[.9rem] hover:text-un-blue hover:border-un-blue"
            >
              Dismiss
            </button>
          )}
          {action && (
            <button
              onClick={() => {
                handleContinue();
              }}
              className="text-white bg-un-blue-light border border-un-blue-light p-1 px-2 rounded-md text-[.9rem] hover:bg-un-blue"
            >
              {capitalize(action)}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
