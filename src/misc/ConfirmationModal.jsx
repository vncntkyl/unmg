import React from "react";
import { GrClose } from "react-icons/gr";

export default function ConfirmationModal({
  closeModal,
  title,
  message,
  continuebutton,
  handleContinue,
}) {
  return (
    <>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[90%] max-w-[90%] z-[25] md:min-w-[70%] lg:min-w-[0%]">
        <div className="bg-white rounded-md p-2 transition-all animate-slide-down">
          {/* TITLE */}
          <div className="flex flex-row items-center justify-between border-b border-gray py-1">
            <span className="font-semibold text-[1.1rem]">{title}</span>
            <button
              onClick={() => {
                closeModal("standby");
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
            <button
              className="text-dark-gray border border-dark-gray p-1 px-2 rounded-md text-[.9rem] hover:text-gray hover:border-gray"
              onClick={() => closeModal("standby")}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleContinue();
              }}
              className="text-white bg-un-blue-light border border-un-blue-light p-1 px-2 rounded-md text-[.9rem] hover:bg-un-blue"
            >
              {continuebutton}
            </button>
          </div>
        </div>
      </div>
      <div
        className="bg-[#00000035] fixed h-full w-full z-[21] top-0 left-0 animate-fade pointer-events-auto"
        onClick={() => closeModal("standby")}
      />
    </>
  );
}
