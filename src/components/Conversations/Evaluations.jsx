import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPencilAlt, FaInbox, FaRegTrashAlt } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { developmentAPIs as url } from "../../context/apiList";
export default function Evaluations({ employee_id, convo_type }) {
  const [loading, toggleLoading] = useState(true);
  const [evaluations, setEvaluations] = useState([]);

  let cnt = 1;
  useEffect(() => {
    const getEvaluations = async () => {
      const parameters = {
        params: {
          user_id: employee_id,
          convo_type: convo_type,
        },
      };
      try {
        const response = await axios.get(url.retrieveConversations, parameters);
        setEvaluations(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getEvaluations();
    toggleLoading(false);
  }, [employee_id, convo_type]);
  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="w-full mt-4">
        <div className="flex">
          <span className="ml-2 flex items-center justify-center gap-2 bg-default px-2 rounded-t-md">
            <FaInbox />
            Inbox
          </span>
          <span className="flex items-center justify-center gap-2 px-2">
            <IoMdSend />
            Sent
          </span>
        </div>
        <div className="w-full h-[90%] border border-default-dark rounded-md p-2 overflow-scroll">
          {evaluations.length == 0 ? (
            <div className="w-full flex items-center justify-center text-[1.5rem] font-bold">
              No Conversations Found
            </div>
          ) : (
            <>
              {evaluations &&
                evaluations.map((item, index) => (
                  <div key={index}>
                    <div className="relative group/item w-full flex border-b border-default-dark hover:bg-default py-2">
                      <span className="lg:mx-2 hidden md:block text-[0.9rem]">
                        {cnt++}
                      </span>
                      <span className="hidden md:block mx-2 font-semibold lg:whitespace-nowrap min-w-[150px] text-[.8rem]">
                        {item.converse_name}
                      </span>
                      <div className="flex flex-col">
                        <span className="lg:mx-2 font-semibold lg:whitespace-nowrap overflow-x-hidden text-left text-[.8rem]">
                          {item.agenda}
                        </span>
                        <span className="lg:mx-2 w-[8rem] sm:w-[15rem] lg:w-[10rem] xl:w-[30rem] whitespace-nowrap overflow-x-hidden text-[0.6rem] text-mid-gray lg:text-[0.8rem]">
                          {employee_id == item.last_sent_user_id ? "You: " : ""}
                          {item.last_sent_message}...
                        </span>
                      </div>
                      <div className="w-full flex justify-end items-center">
                        <span className="hidden group-hover/item:block px-2">
                          <FaRegTrashAlt />
                        </span>
                        <span className="flex flex-col lg:flex-row lg:gap-2 group-hover/item:hidden px-2 text-[0.8rem] whitespace-nowrap">
                          <span>
                            {(() => {
                              const date = new Date(item.last_modified);
                              const formattedDate = `${(date.getMonth() + 1)
                                .toString()
                                .padStart(2, "0")}/
                            ${date.getDate().toString().padStart(2, "0")}/
                            ${date.getFullYear().toString()}`;
                              return formattedDate;
                            })()}
                          </span>
                          <span className="text-[0.6rem] lg:text-[0.8rem] text-right">
                            {(() => {
                              const date = new Date(item.last_modified);
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
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
