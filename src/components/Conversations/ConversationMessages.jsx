import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { developmentAPIs as url } from "../../context/apiList";
import Messages from "./Messages";
// Icons
import { FaArrowLeft } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { IoAttach, IoCloseOutline } from "react-icons/io5";
import { PiWarningCircleDuotone } from "react-icons/pi";
import { FaFileImage } from "react-icons/fa6";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import {
  MdAudioFile,
  MdVideoFile,
  MdInsertDriveFile,
  MdOutlineReply,
} from "react-icons/md";

export default function ConversationMessages({ employee_id }) {
  const messageRef = useRef();
  const [loading, toggleLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [containerHeight, setContainerHeight] = useState(50);
  const [convoSettings, setConvoSettings] = useState([]);
  const [file, setFile] = useState([]);
  const [reply, setReply] = useState([]);
  const [convoID, setConvoID] = useState();
  useEffect(() => {
    const convoID = parseInt(localStorage.getItem("convoID"));
    setConvoID(convoID);
  }, []);
  //fetch convo settings
  useEffect(() => {
    //fetch stored conversation id
    const getConvoSettings = async () => {
      const parameters = {
        params: {
          settings: "true",
          convo_type: "user",
          convo_id: convoID,
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
    if (!convoID) return;
    const fetchData = async () => {
      if (!convoID) return;

      await Promise.all([getConvoSettings()]);
      toggleLoading(false);
    };
    fetchData();
  }, [employee_id, convoID]);

  
  // adjustments to container when media upload
  const fileName = Object.keys(file).map((item) => {
    const str = file[item].name;
    const type = file[item].type;
    return {
      name: str.replace(/,/g, ""),
      type: type.split("/")[0],
    };
  });
  const fileContainerHeight = file.length === 0 ? 0 : 100;
  const replyContainerHeight = !reply ? 0 : 16;
  // height changes
  const handleChange = (event) => {
    setMessage(event.target.value);
    const textArea = event.target;
    textArea.style.height = "auto";
    const newHeight = textArea.scrollHeight;
    textArea.style.height = `${newHeight}px`;
    const maxHeight = 100;

    if (newHeight > maxHeight) {
      textArea.style.height = `${maxHeight}px`;
      textArea.style.overflowY = "auto";
    } else {
      textArea.style.height = `${newHeight}px`;
      textArea.style.overflowY = "hidden";
    }
    // Adjust container height
    setContainerHeight(newHeight > maxHeight ? maxHeight : newHeight + 20);
  };

  // goes back to messages
  const handleBack = () => {
    localStorage.removeItem("convoID");
    window.history.back();
  };

  //press enter to submit
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  //submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    const allFile = Object.keys(file).map((item) => {
      return file[item];
    });
    const userid = parseInt(employee_id);
    const convoID = parseInt(localStorage.getItem("convoID"));
    const newMessage = message;
    const file_name = fileName.map((name) => name.name);
    const file_type = fileName.map((name) => name.type);
    const reply_id = reply.reply_message_id ? reply.reply_message_id : 0;
    if (!newMessage && file.length === 0) {
      return;
    }
    let fData = new FormData();
    fData.append("submit", true);
    fData.append("employee_id", userid);
    fData.append("convo_id", convoID);
    fData.append("reply_id", reply_id);
    fData.append("newMessage", newMessage);
    fData.append("file_name", file_name);
    fData.append("file_type", file_type);
    allFile.forEach((file, index) => {
      fData.append(`file[${index}]`, file);
    });
    axios
      .post(url.userSubmitNewMessage, fData)
      .then(() => {
        setMessage("");
        setFile([]);
        setReply([]);
      })
      .catch((error) => alert(error));
  };

  //file change
  const handleFileChange = (e) => {
    // Convert FileList to an array
    const newFiles = Array.from(e.target.files);
    // Check for existing files with the same name
    const existingFileNames = file.map((file) => file.name);
    const uniqueNewFiles = newFiles.filter(
      (newFile) => !existingFileNames.includes(newFile.name)
    );
    // Ensure that file state is always an array of File objects
    setFile((currentFiles) => [...currentFiles, ...uniqueNewFiles]);
  };

  //remove file
  const handleRemoveFile = (remFile) => {
    //const updatedFiles = file.filter(item => item.name !== remFile);
    //setFile(updatedFiles);
    const fileArray = Array.from(file);
    const updatedFiles = fileArray.filter((item) => item.name !== remFile);
    setFile(updatedFiles);
  };

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
            <span>{convoSettings && convoSettings.converse_name}</span>
          </div>
          {convoSettings &&
            (convoSettings.admin_access == "2" ? (
              <div className="relative">
                <span className="text-[1.5rem] text-un-red cursor-pointer peer">
                  <PiWarningCircleDuotone />
                </span>
                <span className="hidden absolute right-0 bg-white p-2 rounded-md shadow peer-hover:block animate-fade">
                  <span className="text-[0.8rem] whitespace-nowrap">
                    Please note that the contents of this conversation may be
                    accessed by the administrator for monitoring purposes.
                  </span>
                </span>
              </div>
            ) : (
              ""
            ))}
        </div>
        <div className="border-x border-default-dark flex justify-between text-[1rem] border-b p-2 bg-white">
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
              <span>Summary: </span>
            </div>
            <div className="flex gap-2">
              <span>
                {format(new Date(convoSettings.creation_date), "PP")}
                {/* {(() => {
                    const date = new Date(convoSettings.creation_date);
                    const formattedDate = `${(date.getMonth() + 1)
                      .toString()
                      .padStart(2, "0")}/
                              ${date.getDate().toString().padStart(2, "0")}/
                              ${date.getFullYear().toString()}`;
                    return formattedDate;
                  })()} */}
              </span>
              <span>
                {format(new Date(convoSettings.creation_date), "p")}
                {/* {(() => {
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
                  })()} */}
              </span>
            </div>
          </div>
        <div
          className="w-full border-x border-default-dark overflow-y-scroll p-2"
          style={{
            height:
              fileContainerHeight > 0
                ? `calc(80% - ${containerHeight}px - ${fileContainerHeight}px`
                : replyContainerHeight > 0
                ? `calc(80% - ${containerHeight}px - ${replyContainerHeight}px`
                : `calc(80% - ${containerHeight}px)`,
          }}
        >
              <Messages
                convoID={convoID}
                employee_id={employee_id}
                containerHeight={containerHeight}
                replyDetails={setReply}
              />
        </div>
        {reply.reply_message_id > 0 ? (
          <div className="h-[2rem] w-full bg-default border-x border-default-dark px-4 py-2 flex items-center justify-between">
            <div className="flex gap-2 items-center justify-start">
              <MdOutlineSubdirectoryArrowRight />
              <div className="h-[1.8rem] flex items-center overflow-y-hidden">
                {reply.reply_message_type === 1 ? (
                  <span>
                    {`${reply.reply_convo_message.substring(0, 70)}${
                      reply.reply_convo_message.length > 70 ? "..." : ""
                    }`}
                  </span>
                ) : reply.reply_message_type === 2 ? (
                  <span className="flex items-center gap-2">
                    <FaFileImage />
                    <p>Photo</p>
                  </span>
                ) : reply.reply_message_type === 3 ? (
                  <span className="flex items-center gap-2">
                    <MdVideoFile />
                    <p>Video</p>
                  </span>
                ) : reply.reply_message_type === 4 ? (
                  <span className="flex items-center gap-2">
                    <MdAudioFile />
                    <p>Audio</p>
                  </span>
                ) : reply.reply_message_type === 5 ? (
                  <span className="flex items-center gap-2">
                    <MdInsertDriveFile />
                    <p>File</p>
                  </span>
                ) : (
                  <span>{reply.reply_convo_message}</span>
                )}
              </div>
            </div>
            <button
              className="text-[1.6rem] hover:text-un-red"
              onClick={() => setReply([])}
            >
              <IoCloseOutline />
            </button>
          </div>
        ) : ("")}
        {fileName && fileName.length > 0 ? (
          <div className="h-[7rem] w-full bg-white grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8 gap-2 overflow-y-scroll border-x border-default-dark px-4 py-2">
            {fileName &&
              fileName.map((item, index) => (
                <div
                  key={index}
                  className="w-[8rem] h-[6rem] bg-default p-1 flex flex-col items-center rounded-md mb-4 mx-auto"
                >
                  <button
                    className="text-[1.3rem] hover:text-un-red ml-auto"
                    onClick={() => handleRemoveFile(item.name)}
                  >
                    <IoCloseOutline />
                  </button>
                  <span className="h-[3rem] w-[5rem] text-[3rem] flex justify-center">
                    {item.type && item.type === "audio" ? (
                      <MdAudioFile />
                    ) : item.type === "image" ? (
                      <FaFileImage className="text-[2.6rem]" />
                    ) : item.type === "video" ? (
                      <MdVideoFile />
                    ) : (
                      <MdInsertDriveFile />
                    )}
                  </span>
                  <span className="w-[8rem] text-[.8rem] overflow-hidden text-center">
                    {item.name.length > 15
                      ? `${item.name.substring(0, 12)}...`
                      : item.name}
                  </span>
                </div>
              ))}
          </div>
        ) : ("")}
        <div
          className="border-x border-b border-default-dark rounded-b-md flex justify-between items-center px-4 py-2"
          style={{ height: `${containerHeight}px` }}
        >
          <div className="w-full">
            <form
              className="w-full flex justify-between items-center"
              encType="multipart/form-data"
            >
              <div className="text-[1.5rem] ml-2">
                <label
                  htmlFor="fileUpload"
                  className="w-fit cursor-pointer text-[1.5rem] text-dark-gray hover:text-gray"
                >
                  <IoAttach />
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="fileUpload"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
              <textarea
                id="messagetextbox"
                className="w-[90%] h-[100%] bg-default rounded-md resize-none border border-dark-gray focus:outline-none px-2 py-1 text-[1rem] overflow-y-auto"
                cols="30"
                rows="1"
                placeholder="Type your message..."
                ref={messageRef}
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
              ></textarea>
              <button
                className="text-un-blue-light text-[1.5rem] mr-4 hover:text-un-blue-light-1"
                onClick={handleSubmit}
              >
                <IoIosSend />
              </button>
              {/* <button className="text-[1.5rem]">
                <CiShare1 />
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}