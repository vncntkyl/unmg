import classNames from "classnames";
import React from "react";
import {
  BsExclamationOctagonFill,
  BsCheckCircleFill,
  BsQuestionCircleFill,
  BsInfoCircleFill,
} from "react-icons/bs";

export default function Alert({ type = "info", title, message, onClose }) {
  return (
    <div className="fixed top-0 w-screen h-screen flex items-center justify-center bg-[#00000035] z-30" onClick={onClose}>
      <div
        className={classNames(
          "rounded-md shadow-sm w-fit overflow-hidden z-[22] animate-slide-down"
        )}
      >
        <div
          className={classNames(
            "p-2 flex items-center gap-2",
            type === "question"
              ? "bg-un-blue-light-1 text-un-blue-light"
              : type === "warning"
              ? "bg-un-red-light text-un-red-dark-1"
              : type === "success"
              ? "bg-un-green-light text-un-green-dark"
              : "bg-un-yellow-light text-un-yellow-dark"
          )}
        >
          {type === "question" ? (
            <BsQuestionCircleFill />
          ) : type === "warning" ? (
            <BsExclamationOctagonFill />
          ) : type === "success" ? (
            <BsCheckCircleFill />
          ) : (
            <BsInfoCircleFill />
          )}
          <span className="font-semibold uppercase text-[.9rem] xl:text-[1rem] tracking-wider mr-auto">
            {title}
          </span>
          <button
            className="font-semibold text-tooltip cursor-pointer"
            onClick={onClose}
          >
            &#10005;
          </button>
        </div>
        <div className="p-2 px-5 text-center bg-white text-[.9rem] xl:text-[1rem]">
          {message}
        </div>
      </div>
    </div>
  );
}
