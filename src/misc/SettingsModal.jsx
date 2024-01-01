import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrClose } from "react-icons/gr";
import { IoAttach } from "react-icons/io5";
import { developmentAPIs as url } from "../context/apiList";
import classNames from "classnames";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import format from "date-fns/format";

export default function SettingsModal({ closeModal }) {
  const [dateInputs, setDateInputs] = useState([{ id: 1 }]);
  const [dateValues, setDateValues] = useState({});

  const finalDate = Object.keys(dateValues).reduce((date, key) => {
    const [prefix, id] = key.split("_");
    if (prefix === "start") {
      const pairIndex = date.findIndex((pair) => pair.id === id);
      if (pairIndex === -1) {
        date.push({ id, start: dateValues[key], end: "" });
      } else {
        date[pairIndex].start = dateValues[key];
      }
    } else if (prefix === "end") {
      const pairIndex = date.findIndex((pair) => pair.id === id);
      if (pairIndex !== -1) {
        date[pairIndex].end = dateValues[key];
      }
    }
    return date;
  }, []);

  //handles add date
  const handleAddDate = (id) => {
    const newId = dateInputs.length + 1;
    const updatedDates = dateInputs.map((date) =>
      date.id === id ? { ...date } : date
    );
    updatedDates.push({ id: newId });
    setDateInputs(updatedDates);
  };
  //handles remove date
  const handleRemoveDate = (id) => {
    if (dateInputs.length > 1) {
      const updatedDates = dateInputs.filter((date) => date.id !== id);
      setDateInputs(updatedDates);
    }
  };
  //handles input change
  const handleInputChange = (e, id, field) => {
    const { value } = e.target;
    setDateValues({
      ...dateValues,
      [`${field}_${id}`]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let fData = new FormData();
    fData.append("submit", true);
    finalDate.forEach((date, index) => {
      fData.append(`KPIDate[${index}][start]`, date.start);
      fData.append(`KPIDate[${index}][end]`, date.end);
    });
    axios
      .post(url.userSubmitKPIDuration, fData)
      .then((response) => {
        alert(response.data);
        window.location.reload();
        closeModal(false);
      })
      .catch((error) => alert(error));
  };
  return (
    <>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[90%] max-w-[90%] z-[26] bg-white rounded-md p-2 transition-all md:min-w-[70%] lg:min-w-[20%]">
        <form>
          <div className="flex flex-row items-center justify-between border-b border-gray py-1">
            <span className="font-semibold text-[1.1rem]">
              Add New KPI Year
            </span>
            <button
              className="text-[.7rem] px-1"
              onClick={() => closeModal(false)}
            >
              <GrClose />
            </button>
          </div>
          {/* MESSAGE */}
          <div className="bg-default p-2 rounded-md my-2">
            <div>
              {dateInputs.map((dateInput) => (
                <div
                  key={dateInput.id}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex flex-col">
                    <input
                      type="date"
                      className="p-1 rounded outline-none"
                      placeholder="Enter Start Date"
                      onChange={(e) =>
                        handleInputChange(e, dateInput.id, "start")
                      }
                    />
                    <label className="text-[0.8rem]">Start date</label>
                  </div>
                  <span>to</span>
                  <div className="flex flex-col">
                    <input
                      type="date"
                      className="p-1 rounded outline-none"
                      placeholder="Enter End Date"
                      onChange={(e) =>
                        handleInputChange(e, dateInput.id, "end")
                      }
                    />
                    <label className="text-[0.8rem] text-end">End date</label>
                  </div>
                  <button
                    className="text-[1.3rem]"
                    type="button"
                    onClick={() => handleAddDate(dateInput.id)}
                  >
                    <AiOutlinePlus />
                  </button>
                  <button
                    className="text-[1.3rem]"
                    type="button"
                    onClick={() => handleRemoveDate(dateInput.id)}
                  >
                    <AiOutlineMinus />
                  </button>
                </div>
              ))}
            </div>
            {/* <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <input
                  type="date"
                  className="p-1 rounded outline-none"
                  placeholder="Enter Start Date"
                />
                <label className="text-[0.8rem]">Start date</label>
              </div>
              <span>to</span>
              <div className="flex flex-col">
                <input
                  type="date"
                  className="p-1 rounded outline-none"
                  placeholder="Enter End Date"
                />
                <label className="text-[0.8rem] text-end">End date</label>
              </div>
              <button className="text-[1.3rem]" type="button"><AiOutlinePlus/></button>
              <button className="text-[1.3rem]" type="button"><AiOutlineMinus/></button>
            </div> */}
          </div>
          {/* FOOTER */}
          <div className="flex flex-row items-center justify-end gap-4 p-2">
            <button
              className="text-dark-gray border border-dark-gray p-1 px-2 rounded-md text-[.9rem] hover:text-gray hover:border-gray"
              onClick={() => closeModal(false)}
            >
              Cancel
            </button>
            <input
              type="submit"
              className="text-white bg-un-blue-light border border-un-blue-light p-1 px-2 rounded-md text-[.9rem] hover:bg-un-blue disabled:bg-dark-gray"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </>
  );
}






export function EditSettingsModal({ closeModal, KPI }) {
  const [kpiDurations, setKpiDurations] = useState([]);
  console.log(kpiDurations);
  useEffect(() => {
    setKpiDurations(KPI);
  }, [KPI]);

  const handleInputChange = (e, kpiYearDurationId, type) => {
    const { value } = e.target;

    // Update the KPI state based on changes in the inputs
    setKpiDurations(prevKpiDurations => prevKpiDurations.map((kpi) => {
      if (kpi.kpi_year_duration_id === kpiYearDurationId) {
        return {
          ...kpi,
          from_date: type === 'start' ? value : kpi.from_date,
          to_date: type === 'end' ? value : kpi.to_date,
        };
      }
      return kpi;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let fData = new FormData();
    fData.append("submit", true);
    kpiDurations.forEach((date, index) => {
      fData.append(`KPIDate[${index}][ID]`, date.kpi_year_duration_id);
      fData.append(`KPIDate[${index}][start]`, date.from_date);
      fData.append(`KPIDate[${index}][end]`, date.to_date);
    });
    axios
      .post(url.updateKPIDuration, fData)
      .then((response) => {
        alert(response.data);
        window.location.reload();
        closeModal(false);
      })
      .catch((error) => alert(error));
  };


  return (
    <>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[90%] max-w-[90%] z-[26] bg-white rounded-md p-2 transition-all md:min-w-[70%] lg:min-w-[20%]">
        <form>
          <div className="flex flex-row items-center justify-between border-b border-gray py-1">
            <span className="font-semibold text-[1.1rem]">
              Edit Existing KPIs
            </span>
            <button
              className="text-[.7rem] px-1"
              onClick={() => closeModal(false)}
            >
              <GrClose />
            </button>
          </div>
          {/* MESSAGE */}
          <div className="bg-default p-2 rounded-md my-2">
            {kpiDurations &&
              kpiDurations.map((kpi) => (
                <div key={kpi.kpi_year_duration_id}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="flex flex-col">
                      <input
                        type="date"
                        className="p-1 rounded outline-none"
                        placeholder="Enter Start Date"
                        value={kpi.from_date || ""}
                        onChange={(e) => handleInputChange(e, kpi.kpi_year_duration_id, "start")}
                      />
                      <label className="text-[0.8rem]">Start date</label>
                    </div>
                    <span>to</span>
                    <div className="flex flex-col">
                      <input
                        type="date"
                        className="p-1 rounded outline-none"
                        placeholder="Enter End Date"
                        value={kpi.to_date || ""}
                        onChange={(e) => handleInputChange(e, kpi.kpi_year_duration_id, "end")}
                      />
                      <label className="text-[0.8rem] text-end">End date</label>
                    </div>
                </div>
              ))}
          </div>
          {/* FOOTER */}
          <div className="flex flex-row items-center justify-end gap-4 p-2">
            <button
              type="button"
              className="text-dark-gray border border-dark-gray p-1 px-2 rounded-md text-[.9rem] hover:text-gray hover:border-gray"
              onClick={() => closeModal(false)}
            >
              Cancel
            </button>
            <input
              type="submit"
              className="text-white bg-un-blue-light border border-un-blue-light p-1 px-2 rounded-md text-[.9rem] hover:bg-un-blue disabled:bg-dark-gray"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </>
  );
}
