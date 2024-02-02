import React, { useState, useEffect, useRef } from "react";
import { CiCircleMore } from "react-icons/ci";
export default function LogsAction({ id, toggleActionVisibility }) {
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);
  return (
    <>
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
              className="p-1 hover:bg-default w-full text-left rounded before:absolute"
            >
              View Submission
            </button>

            <button
              className="p-1 hover:bg-default w-full text-left rounded"
            >
              Revert Back to previous status
            </button>

            <button className="p-1 hover:bg-default w-full text-left rounded text-un-red">
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
}
