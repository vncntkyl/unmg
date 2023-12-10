import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { IoAttach } from "react-icons/io5";

export default function ConversationMessages() {
  const convo_id = localStorage.getItem("convoID");
  const [message, setMessage] = useState("");
  const [containerHeight, setContainerHeight] = useState(50);

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
  return (
    <>
      <div className="w-full mt-4">
        <div className="border-t border-x bg-default border-default-dark rounded-t-md p-2 ">
          <button
            className="px-2 rounded-t-md text-[1rem]"
            onClick={() => handleBack()}
          >
            <FaArrowLeft />
          </button>
        </div>
        <div
          className="w-full border-x border-default-dark p-2 overflow-y-scroll"
          style={{ height: `calc(94% - ${containerHeight}px)` }}
        >
          hehe
        </div>

        <div
          className="border-x border-b border-default-dark rounded-b-md flex justify-between items-center px-4 pb-2"
          style={{ height: `${containerHeight}px`}}
        >
          <div className="w-full flex justify-between">
          <button className="text-[1.5rem] ml-2"><IoAttach/></button>
            <textarea
              className="w-[90%] h-[100%] bg-default rounded-md resize-none border border-dark-gray focus:outline-none px-2 py-1 text-[1rem] overflow-y-scroll"
              rows="1"
              placeholder="Type your message..."
              value={message}
              onChange={handleChange}
            ></textarea>
            <button className="text-un-blue-light text-[1.5rem] mr-4 hover:text-un-blue-light-1"><IoIosSend/></button>
          </div>
        </div>
      </div>
    </>
  );
}
