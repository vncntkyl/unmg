import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { IoAttach } from "react-icons/io5";
import { developmentAPIs as url } from "../../context/apiList";
import { PiWarningCircleDuotone } from "react-icons/pi";


export default function ConversationMessages({ employee_id }) {
  const [loading, toggleLoading] = useState(true);
  const convo_id = parseInt(localStorage.getItem("convoID"));
  const [message, setMessage] = useState("");
  const [containerHeight, setContainerHeight] = useState(50);
  const [convoSettings, setConvoSettings] = useState([]);
  const [convo, setConvo] = useState([]);
  const handleChange = (event) => {
    setMessage(event.target.value);
    const textArea = event.target;
    textArea.style.height = "auto";
    const newHeight = textArea.scrollHeight;
    textArea.style.height = `${newHeight}px`;
    const maxHeight = 160;
    const padding = 20;

    if (newHeight > maxHeight) {
      textArea.style.height = `${maxHeight}px`;
      textArea.style.overflowY = 'auto';
    } else {
      textArea.style.height = `${newHeight}px`;
      textArea.style.overflowY = 'hidden';
    }
    // Adjust container height
    setContainerHeight(newHeight > maxHeight ? maxHeight : newHeight + padding);
  };

  const handleBack = () => {
    localStorage.removeItem("convoID");
    window.history.back();
  };
  useEffect(() => {
    const getConvoSettings = async () => {
      const parameters = {
        params: {
          settings: "true",
          convo_id: convo_id,
          employee_id: employee_id,
        }
      };
      try {
        const response = await axios.get(url.retrieveConvo, parameters);

        setConvoSettings(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getConvo = async () => {
      const parameters = {
        params: {
          convo: "true",
          convo_id: convo_id,
        }
      };
      try {
        const response = await axios.get(url.retrieveConvo, parameters);
        setConvo(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getConvoSettings();
    getConvo()
    toggleLoading(false);
  }, [convo_id, employee_id])
  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="w-full mt-4">
        <div className="border-t border-x bg-default border-default-dark rounded-t-md p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              className="px-2 rounded-t-md text-[1rem]"
              onClick={() => handleBack()}
            >
              <FaArrowLeft />
            </button>
            <span>
              {convoSettings && convoSettings.converse_name}
            </span>
          </div>
          {convoSettings && (convoSettings.admin_access == "2" ? (
            <div className="relative">
              <span className="text-[1.5rem] text-un-red cursor-pointer peer"><PiWarningCircleDuotone /></span>
              <span className="hidden absolute right-0 bg-white p-2 rounded-md shadow peer-hover:block animate-fade"><span className="text-[0.8rem] whitespace-nowrap">Please note that the contents of this conversation may be accessed by the administrator for monitoring purposes.</span></span>
            </div>
          ) : "")}
        </div>
        <div
          className="w-full border-x border-default-dark p-2 overflow-y-scroll"
          style={{ height: `calc(94% - ${containerHeight}px)` }}
        >
          <div>
            <div className="flex justify-between text-[1rem] border-b mb-2 pb-2">
              <div className="flex flex-col">
                <span>Type: {convoSettings && (convoSettings.convo_type == "1" ? "Planning" : convoSettings.convo_type == "2" ? "Evaluations" : convoSettings.convo_type == "3" ? "Directional/Redirectional" : convoSettings.convo_type == "4" ? "Coaching" : convoSettings.convo_type == "5" ? "Performance Improvement Plan" : "Loading...")}</span>
                {convoSettings && (convoSettings.convo_type == "2" ? (<span>Quarter: {convoSettings.evaluation_quarter == "1" ? "First Quarter" : convoSettings.evaluation_quarter == "2" ? "Mid Year" : convoSettings.evaluation_quarter == "3" ? "Third Quarter" : "Year End"}</span>) : "")}
                {convoSettings && (convoSettings.convo_type == "4" ? (<span>Coaching Type: {convoSettings.coaching_type == "1" ? "Corrective" : convoSettings.coaching_type == "2" ? "Developmental" : "Loading..."}</span>) : "")}
                <span className="mt-4">Agenda: {convoSettings && convoSettings.agenda}</span>
              </div>
              <div className="flex gap-2">
                <span>
                  {(() => {
                    const date = new Date(convoSettings.creation_date);
                    const formattedDate = `${(date.getMonth() + 1)
                      .toString()
                      .padStart(2, "0")}/
                              ${date.getDate().toString().padStart(2, "0")}/
                              ${date.getFullYear().toString()}`;
                    return formattedDate;
                  })()}
                </span>
                <span>
                  {(() => {
                    const date = new Date(convoSettings.creation_date);
                    const hours = date.getHours();
                    const minutes = date.getMinutes();
                    const amOrPm = hours >= 12 ? "PM" : "AM";
                    const formattedTime = `${(hours % 12 || 12)
                      .toString()
                      .padStart(2, "0")}:${minutes
                        .toString()
                        .padStart(2, "0")} ${amOrPm}`;
                    return formattedTime;
                  })()}
                </span>
              </div>
            </div>
            <span>Summary: </span>
            <p className="w-full indent-4 text-justify whitespace-break-spaces">{convo && convo.map(convo => convo.message)}</p>
          </div>
        </div>

        <div
          className="border-x border-b border-default-dark rounded-b-md flex justify-between items-center px-4 pb-2"
          style={{ height: `${containerHeight}px` }}
        >
          <div className="w-full flex justify-between">
            <button className="text-[1.5rem] ml-2"><IoAttach /></button>
            <textarea
              className="w-[90%] h-[100%] bg-default rounded-md resize-none border border-dark-gray focus:outline-none px-2 py-1 text-[1rem] overflow-y-scroll"
              rows="1"
              placeholder="Type your message..."
              value={message}
              onChange={handleChange}
            ></textarea>
            <button className="text-un-blue-light text-[1.5rem] mr-4 hover:text-un-blue-light-1"><IoIosSend /></button>
          </div>
        </div>
      </div>
    </>
  );
}
