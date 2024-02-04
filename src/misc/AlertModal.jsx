import React from "react";
import classNames from "classnames";
import { GrClose } from "react-icons/gr";
import { BsExclamationOctagonFill } from "react-icons/bs";

export default function AlertModal({
  closeModal,
  modalType,
  title,
  message,
  continuebutton,
  handleContinue,
}) {
  return (
    <>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[90%] max-w-[90%] z-[26] bg-white rounded-md transition-all md:min-w-[70%] lg:min-w-[20%]">
        <form>
          {/* TITLE */}
          <div
            className={classNames(
              "flex flex-row items-center justify-between border-b border-gray p-2 rounded-t-md",
              modalType === "success"
                ? "bg-un-green"
                : modalType === "error"
                ? "bg-un-red-light"
                : "bg-un-yellow"
            )}
          >
            <span
              className={classNames(
                "font-semibold text-[1.1rem] flex items-center gap-2",
                modalType === "success"
                  ? "text-un-green-light"
                  : modalType === "error"
                  ? "text-un-red-dark-1"
                  : "text-un-yellow-dark"
              )}
            >
              <BsExclamationOctagonFill />
              {title}
            </span>
            <button
              className="text-[.7rem] px-1"
              onClick={() => closeModal("standby")}
            >
              <GrClose />
            </button>
          </div>
          {/* MESSAGE */}
          <div className="flex flex-col items-center">
            <div className="w-full my-2 px-2">{message}</div>
          </div>
          {/* FOOTER */}
          <div className="flex flex-row items-center justify-end gap-4 p-2">
            <button
              type="button"
              onClick={() => {modalType === "error" ? closeModal("standby") : handleContinue()}}
              className="text-white bg-un-blue-light border border-un-blue-light p-1 px-2 rounded-md text-[.9rem] hover:bg-un-blue disabled:bg-dark-gray"
            >
              {continuebutton}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
