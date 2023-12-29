import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Modal from "react-modal";
import { developmentAPIs as url } from "../context/apiList";

Modal.setAppElement("#root"); // Set the app root element for accessibility

const DateRangePicker = ({ showModalOnLoad }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showModal, setShowModal] = useState(showModalOnLoad);
  const [showTextBox, setShowTextBox] = useState(true);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const handleSave = async () => {
    const confirmSave = window.confirm(
      "Are you sure you want to save the selected dates?"
    );
    if (confirmSave) {
      try {
        const formData = new FormData();
        const formattedStartDate = startDate
          ? startDate.toISOString().split("T")[0]
          : null;
        const formattedEndDate = endDate
          ? endDate.toISOString().split("T")[0]
          : null;
        formData.append("startDate", formattedStartDate);
        formData.append("endDate", formattedEndDate);
        const response = await axios.post(url.saveDate, formData);

        alert("Successfully saved");
        window.location.reload();
      } catch (e) {
        console.log(e.message);
      }
    } else {
      setShowModal(false);
    }

  };

  useEffect(() => {
    // Apply CSS class to body to prevent text selection when the modal is open
    if (showModal) {
      document.body.classList.add("no-select");
    } else {
      document.body.classList.remove("no-select");
    }

    return () => {
      document.body.classList.remove("no-select");
    };
  }, [showModal]);

  return (
    <>
      {showTextBox && (<input
        type="text"
        onClick={toggleModal}
        className="max-w-[200px]"
        value={
          startDate && endDate
            ? `${startDate.toDateString()} - ${endDate.toDateString()}`
            : ""
        }
        readOnly
      />)}
      {/* Button to open the modal */}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        onClick={() => setShowModal(true)}
      >
        Open Modal
      </button>
      {/* Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={handleCancel}
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[100]"
      >
        <div className="bg-white rounded-lg p-4 max-w-md mx-auto relative">

          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            dateFormat="MM-DD-YYYY"
            calendarClassName="react-datepicker-ignore-onclickoutside"
          />
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DateRangePicker;