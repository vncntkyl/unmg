import React from "react";
import classNames from "classnames";
import { GrClose } from "react-icons/gr";
import { BsExclamationOctagonFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";
import { useNavigate } from "react-router-dom";
export default function AlertModal({
  closeModal,
  modalStatus,
  modalType,
  //modalType == "confirmation" or "status"
  title,
  message,
  handleContinue,
}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[90%] max-w-[90%] z-[25] md:min-w-[70%] lg:min-w-[0%]">
        <div
          className={classNames(
            "bg-white rounded-md transition-all animate-slide-down",
            modalType === "confirmation" ? "p-2" : ""
          )}
        >
          <form>
            {/* TITLE */}
            <div
              className={classNames(
                "flex flex-row items-center border-b border-gray py-2 rounded-t-md justify-between",
                modalType === "confirmation"
                  ? "px-2"
                  : modalType === "status"
                  ? modalStatus === "success"
                    ? "bg-un-green-light text-un-green px-4"
                    : modalStatus === "error"
                    ? "bg-un-red-light text-un-red-dark-1 px-4"
                    : modalStatus === "warning"
                    ? "bg-un-yellow text-un-yellow-dark px-4"
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
              ) : modalType === "status" ? (
                <>
                  {modalStatus === "error" ? (
                    <span className="flex items-center gap-2">
                      <RiErrorWarningFill />
                      Error!
                    </span>
                  ) : modalStatus === "success" ? (
                    <span className="flex items-center gap-2">
                      <FaCheckCircle />
                      Success!
                    </span>
                  ) : modalStatus === "warning" ? (
                    <span className="flex items-center gap-2">
                      <CgDanger />
                      Warning!
                    </span>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
              <button
                className="text-[.7rem] px-1"
                onClick={() => {
                  if (modalType === "status") {
                    if (modalStatus === "error") {
                      closeModal("standby");
                    } else {
                      navigate(0);
                    }
                  } else {
                    closeModal("standby");
                  }
                }}
              >
                <GrClose />
              </button>
            </div>
            {/* MESSAGE */}
            <div className="flex flex-col items-center">
              <div className="w-full my-2 p-2">{message}</div>
            </div>
            {/* FOOTER */}
            {modalType === "confirmation" && (
              <div className="flex flex-row items-center justify-end gap-4 p-2">
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
              </div>
            )}
          </form>
        </div>
      </div>
      <div
        className="bg-[#00000035] fixed h-full w-full z-[21] top-0 left-0 animate-fade pointer-events-auto"
        onClick={() => {
          if (modalType === "status") {
            if (modalStatus === "error") {
              closeModal("standby");
            } else {
              navigate(0);
            }
          } else {
            closeModal("standby");
          }
        }}
      />
    </>
  );
}
