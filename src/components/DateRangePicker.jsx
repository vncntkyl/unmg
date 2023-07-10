import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleSave = async () => {
    const confirmSave = window.confirm(
      "Are you sure you want to save the selected dates?"
    );
    if (confirmSave) {
      try {
        const url = "http://localhost/unmg_pms/api/saveDate.php";
        //const url = "../api/formCreation.php";
        const formData = new FormData();
        const formattedStartDate = startDate
          ? startDate.toISOString().split("T")[0]
          : null;
        const formattedEndDate = endDate
          ? endDate.toISOString().split("T")[0]
          : null;
        formData.append("startDate", formattedStartDate);
        formData.append("endDate", formattedEndDate);
        const response = await axios.post(url, formData);

        alert("succesfully saved");
        window.location.reload();
      } catch (e) {
        console.log(e.message);
      }
    } else {
      setShowPicker(!showPicker);
    }
  };
  return (
    <div>
      <input
        type="text"
        onClick={togglePicker}
        value={
          startDate && endDate
            ? `${startDate.toDateString()} - ${endDate.toDateString()}`
            : ""
        }
        readOnly
      />
      {showPicker && (
        <div>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            dateFormat={"MM-DD-YYYY"}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;