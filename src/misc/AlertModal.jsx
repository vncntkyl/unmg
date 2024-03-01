import React from "react";
import classNames from "classnames";
import { GrClose } from "react-icons/gr";
import { BsExclamationOctagonFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";
export default function AlertModal({
  closeModal,
  modalStatus,
  modalType,
  //modalType == "confirmation" or "status"
  title,
  message,
  handleContinue,
}) {
  return (
    <>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[90%] max-w-[90%] z-[25] md:min-w-[70%] lg:min-w-[0%]">
        <div className="bg-white rounded-md p-2 transition-all animate-slide-down">
          <form>
            {/* TITLE */}
            <div
              className={classNames(
                "flex flex-row items-center border-b border-gray p-2 rounded-t-md",
                modalType === "status" ? "justify-end" : "justify-between",
                modalType === "status"
                  ? modalStatus === "success"
                    ? "bg-un-green-light"
                    : modalStatus === "error"
                    ? "bg-un-red-light"
                    : modalStatus === "warning"
                    ? "bg-un-yellow"
                    : ""
                  : ""
              )}
            >
              {modalType === "confirmation" ? (
                <span
                  className={classNames(
                    "text-[1.1rem] flex items-center gap-2"
                  )}
                >
                  <CgDanger />
                  {title}
                </span>
              ) : (
                ""
              )}
              <button
                className="text-[.7rem] px-1"
                onClick={() => closeModal("standby")}
              >
                <GrClose />
              </button>
            </div>
            {/* MESSAGE */}
            <div className="flex flex-col items-center">
              {/* modalStatus === "success"
                      ? "text-un-green"
                      : modalStatus === "error"
                      ? "text-un-red-dark-1"
                      : modalStatus === "warning"
                      ? "text-un-yellow-dark"
                      : "" 
                      
                  {modalStatus === "error" ? (
                    <RiErrorWarningFill />
                  ) : modalStatus === "success" ? (
                    <FaCheckCircle />
                  ) : modalStatus === "warning" ? (
                    <CgDanger />
                  ) : (
                    ""
                  )}
                      
                      
                      */}

              <div className="w-full my-2 px-2">{message}</div>
            </div>
            {/* FOOTER */}
            {modalType === "confirmation" && (<div className="flex flex-row items-center justify-end gap-4 p-2">
              <button
                className="text-dark-gray border border-dark-gray p-1 px-2 rounded-md text-[.9rem] hover:text-gray hover:border-gray"
                onClick={() => closeModal("standby")}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  modalStatus === "error"
                    ? closeModal("standby")
                    : handleContinue();
                }}
                className="text-white bg-un-blue-light border border-un-blue-light p-1 px-2 rounded-md text-[.9rem] hover:bg-un-blue disabled:bg-dark-gray"
              >
                Confirm
              </button>
            </div>)}
          </form>
        </div>
      </div>
      <div
        className="bg-[#00000035] fixed h-full w-full z-[21] top-0 left-0 animate-fade pointer-events-auto"
        onClick={() => closeModal("standby")}
      />
    </>
  );
}
