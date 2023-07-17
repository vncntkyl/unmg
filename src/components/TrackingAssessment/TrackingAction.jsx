import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { CiCircleMore } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useFunction } from "../../context/FunctionContext";
import TrackingAssessmentModal from "../../misc/TrackingAssessmentModal";
export default function TrackingAction({
  employee_id,
  first_name,
  toggleActionVisibility,
  myr,
  yee
}) {
  console.log(employee_id);
  console.log(myr);
  console.log(yee);
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
    sessionStorage.setItem("assessment_id", employee_id);
    sessionStorage.setItem("assessment_name", formatName(first_name));
    navigate(
      "/tracking_and_assessment/employee_assessment/" + formatName(first_name)
    );
  };

  const gradeUserAssessment = () => {
    sessionStorage.setItem("assessment_id", employee_id);
    sessionStorage.setItem("assessment_name", formatName(first_name));
    navigate(
      "/tracking_and_assessment/employee_assessment/" +
        formatName(first_name) +
        "/grade_edit"
    );
  };

  const approveUserAssessment = () => {
    sessionStorage.setItem("assessment_id", employee_id);
    sessionStorage.setItem("assessment_name", formatName(first_name));
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
            View Submission
          </button>

          <button
            className="p-1 hover:bg-gray w-full text-left rounded"
            onClick={() => gradeUserAssessment()}
          >
            Grade/Edit Assessment
          </button>

          <button
            className="p-1 hover:bg-gray w-full text-left rounded"
            onClick={() => {
              setDiscussionModal(true);
            }}
          >
            Ask for a 1 on 1 discussion
          </button>

          <button
            className="p-1 hover:bg-gray w-full text-left rounded"
            onClick={() => {
              setsignModal(true);
            }}
          >
            Approve Assessment
          </button>
          <button className="p-1 hover:bg-gray w-full text-left rounded text-un-red">
            Delete
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


{/* Approve assessment */}
          {signModal && (
            <TrackingAssessmentModal
              closeModal={setsignModal}
              type={"approval"}
              title={"Approve Assessment"}
              employee_id={employee_id}
              first_name={first_name}
              message={`I confirm that the employee's grade reflected in this form is accurate and appropriate based on their performance over the past and their job responsibilities.`}
              continuebutton={"Confirm"}
            />
          )}
          <div
            className={classNames(
              "bg-[#00000035] fixed h-full w-full z-[21] top-0 left-0 animate-fade pointer-events-auto",
              signModal === false && "z-[-1] hidden pointer-events-none"
            )}
            onClick={() => {
              setsignModal(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
