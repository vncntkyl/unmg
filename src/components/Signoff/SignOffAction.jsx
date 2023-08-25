import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { CiCircleMore } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import TrackingAssessmentModal from "../../misc/TrackingAssessmentModal";
import { useFunction } from "../../context/FunctionContext";
export default function SignOffAction({
  workYear,
  sp_id,
  employee_id,
  first_name,
  toggleActionVisibility
}) {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [signModal, setsignModal] = useState(false);
  const [discussionModal, setDiscussionModal] = useState(false);
  const dropdownRef = useRef(null);
  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
    toggleActionVisibility();
  };

  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };
  const { formatName } = useFunction();
  const viewUserAssessment = () => {
    localStorage.setItem("work_year", workYear);
    localStorage.setItem("assessment_id", employee_id);
    localStorage.setItem("assessment_name", formatName(first_name));
    navigate("/sign_off/employee_sign_off_assessment/" + formatName(first_name));
  };

  const gradeUserAssessment = () => {
    localStorage.setItem("work_year", workYear);
    localStorage.setItem("assessment_id", employee_id);
    localStorage.setItem("assessment_name", formatName(first_name));
    navigate(
      "/tracking_and_assessment/employee_assessment/" +
      formatName(first_name) +
      "/grade_edit"
    );
  };

  const approveUserAssessment = () => {
    localStorage.setItem("work_year", workYear);
    localStorage.setItem("assessment_id", employee_id);
    localStorage.setItem("assessment_name", formatName(first_name));
    navigate(
      "/tracking_and_assessment/employee_assessment/" +
      formatName(first_name) +
      "/approve"
    );
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);
  return (
    <div className="relative flex z-[40] items-center justify-center py-1">
      <button
        type="button"
        className="outline-none cursor-pointer text-un-blue text-[1.5rem] hover:text-un-blue-light transition-all"
        onClick={handleDropdownToggle}
      >
        <CiCircleMore />
      </button>
      {dropdownVisible && (
        <div
          ref={dropdownRef}
          className="absolute top-1/4 right-[3.5rem] text-[.9rem] origin-top-right min-w-max bg-white shadow-md rounded flex flex-col transition-all z-10 p-2 items-start"
        >

          <button
            className="p-1 hover:bg-gray w-full text-left rounded before:absolute"
            onClick={() => viewUserAssessment()}
          >
            View Assessment
          </button>


          <button className="p-1 hover:bg-gray w-full text-left rounded before:absolute">
            Approve
          </button>


          {/* Ask for a 1 on 1 discussion */}
          {discussionModal && (
            <TrackingAssessmentModal
              closeModal={setDiscussionModal}
              type={"discussion"}
              title={"Assessment Discussion"}
              employee_id={employee_id}
              first_name={first_name}
              message={`Ask ${first_name} for a 1 on 1 discussion`}
              continuebutton={"Confirm"}
            />
          )}
          <div
            className={classNames(
              "bg-[#00000035] fixed h-full w-full z-[21] top-0 left-0 animate-fade pointer-events-auto",
              discussionModal === false && "z-[-1] hidden pointer-events-none"
            )}
            onClick={() => {
              setDiscussionModal(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
