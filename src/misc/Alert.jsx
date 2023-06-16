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
    <div className="absolute rounded-md shadow-sm w-[90vw] overflow-hidden z-[22] animate-slide-down">
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
        <span className="font-semibold uppercase text-[.9rem] tracking-wider mr-auto">
          {title}
        </span>
        <span className="font-semibold text-tooltip" onClick={onClose}>&#10005;</span>
      </div>
      <div className="p-2 text-center bg-white text-[.9rem]">{message}</div>
    </div>
  );
}
