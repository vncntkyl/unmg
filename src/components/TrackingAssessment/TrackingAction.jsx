import React, { useState, useEffect, useRef } from "react";
import { CiCircleMore } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useFunction } from "../../context/FunctionContext";

export default function TrackingAction({ 
  employee_id,
  first_name,
  toggleActionVisibility, }) {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
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
    navigate("/tracking_and_assement/employee_assessment/" + formatName(first_name));
  };

  const gradeUserAssessment = () => {
    sessionStorage.setItem("assessment", employee_id);
    navigate("/tracking_and_assement/employee_assessment/" + employee_id + "/grade_edit");
  };

  const approveUserAssessment = () => {
    sessionStorage.setItem("assessment", employee_id);
    navigate("/tracking_and_assement/employee_assessment/" + employee_id + "/approve");
  };



  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);
  return (
    <div className="relative flex items-center justify-center py-1">
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
          <button className="p-1 hover:bg-gray w-full text-left rounded before:absolute"
          onClick={() => viewUserAssessment()}
          >
            View Submission
          </button>
          <button className="p-1 hover:bg-gray w-full text-left rounded">
            Grade/Edit Assessment
          </button>
          <button className="p-1 hover:bg-gray w-full text-left rounded">
            Approve Assessment
          </button>
          <button className="p-1 hover:bg-gray w-full text-left rounded text-un-red">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}