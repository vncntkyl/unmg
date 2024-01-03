import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import classNames from "classnames";
import { format } from "date-fns";
import { MdInsertDriveFile } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { developmentAPIs as url} from "../../context/apiList";

export default function ConversationViewMessages({ employee_id }) {
  const [loading, toggleLoading] = useState(true);
  const convo_id = parseInt(localStorage.getItem("convoID"));
  const [convoSettings, setConvoSettings] = useState([]);
  const [convo, setConvo] = useState([]);


// goes back to messages
  const handleBack = () => {
    localStorage.removeItem("convoID");
    window.history.back();
  };

  useEffect(() => {
    const getConvoSettings = async () => {
      const parameters = {
        params: {
          settings: "true",
          convo_type: "manager",
          convo_id: convo_id,
          employee_id: employee_id,
        },
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
        },
      };
      try {
        const response = await axios.get(url.retrieveConvo, parameters);
        setConvo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConvoSettings();
    getConvo();
    toggleLoading(false);

    //interval for fetching data from database
    const interval = setInterval(getConvo, 3000);
    return () => clearInterval(interval);
  }, [convo_id, employee_id]);
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
            <span>{convoSettings && convoSettings.converse_name_1}, {convoSettings && convoSettings.converse_name_2}</span>
          </div>
        </div>
        <div className="h-[79vh] w-full border-x border-b rounded-b-md border-default-dark p-2 overflow-y-scroll">
          <div>
            <div className="flex justify-between text-[1rem] border-b mb-2 pb-2">
              <div className="flex flex-col">
                <span>
                  Type:{" "}
                  {convoSettings &&
                    (convoSettings.convo_type == "1"
                      ? "Planning"
                      : convoSettings.convo_type == "2"
                      ? "Evaluations"
                      : convoSettings.convo_type == "3"
                      ? "Directional/Redirectional"
                      : convoSettings.convo_type == "4"
                      ? "Coaching"
                      : convoSettings.convo_type == "5"
                      ? "Performance Improvement Plan"
                      : "Loading...")}
                </span>
                {convoSettings &&
                  (convoSettings.convo_type == "2" ? (
                    <span>
                      Quarter:{" "}
                      {convoSettings.evaluation_quarter == "1"
                        ? "First Quarter"
                        : convoSettings.evaluation_quarter == "2"
                        ? "Mid Year"
                        : convoSettings.evaluation_quarter == "3"
                        ? "Third Quarter"
                        : "Year End"}
                    </span>
                  ) : (
                    ""
                  ))}
                {convoSettings &&
                  (convoSettings.convo_type == "4" ? (
                    <span>
                      Coaching Type:{" "}
                      {convoSettings.coaching_type == "1"
                        ? "Corrective"
                        : convoSettings.coaching_type == "2"
                        ? "Developmental"
                        : "Loading..."}
                    </span>
                  ) : (
                    ""
                  ))}
                <span className="mt-4">
                  Agenda: {convoSettings && convoSettings.agenda}
                </span>
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
            <div className="p-2">
              <span>Summary: </span>

              <div>
                {convo &&
                  convo.map((convo) => (
                    <div
                      key={convo.id}
                      className={classNames(
                        "p-4 rounded-md my-2 w-full max-w-lg",
                        convo.employee_id == employee_id
                          ? "bg-un-blue-light-1 bg-opacity-60 ml-auto"
                          : "bg-default"
                      )}
                    >
                      <div className="flex justify-between">
                        <span className="font-semibold">
                          {convo.employee_name}
                        </span>
                        <span className="text-[0.8rem] flex gap-2">
                          <span>
                            {format(
                              new Date(convo.creation_date),
                              "MMM d, yyyy"
                            )}
                          </span>
                          <span>
                            {format(new Date(convo.creation_date), "hh:mm a")}
                          </span>
                        </span>
                      </div>
                      <div className="indent-4 text-justify whitespace-break-spaces">
                        {convo.message_type &&
                        parseInt(convo.message_type) === 1 ? (
                          convo.message
                        ) : parseInt(convo.message_type) === 2 ? (
                          <img
                            src={`../../assets/messages/image/` + convo.message}
                            alt="image"
                            className="rounded-md"
                          />
                        ) : parseInt(convo.message_type) === 3 ? (
                          <video
                            src={`../../assets/messages/video/` + convo.message}
                            alt="video"
                            className="rounded-md"
                            controls
                          />
                        ) : parseInt(convo.message_type) === 4 ? (
                          <audio
                            src={`../../assets/messages/audio/` + convo.message}
                            alt="audio"
                            controls
                          />
                        ) : (
                          <div className="w-full flex items-center">
                            <MdInsertDriveFile className="text-[2.6rem] text-dark-gray" />
                            <span className="w-full flex flex-col">
                              <span>{convo.message}</span>
                              <span className="flex items-center justify-end">
                                <a className="text-[1.4rem] hover:text-un-red text-dark-gray"
                                  href={`../../assets/messages/file/${convo.message}`}
                                  download
                                >
                                  <IoMdDownload />
                                </a>
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
