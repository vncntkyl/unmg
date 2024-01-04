import React, { useState, useEffect } from "react";
import axios from "axios";
import { developmentAPIs as url } from "../../context/apiList";
import ConversationsActions from "./ConversationsActions";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { format } from "date-fns";

export default function Planning({ employee_id, convo_type }) {
  const navigate = useNavigate();
  const [loading, toggleLoading] = useState(true);
  const [planning, setPlanning] = useState([]);
  const [viewtype, setViewType] = useState("1");
  const [employeeID, setEmployeeID] = useState();
  const { currentUser, verifyIfEvaluator } = useAuth();
  const viewType = ["My Conversations", "Employee Conversations"];
  let cnt = 1;
  
  //getting current user data
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setEmployeeID(currentUser.employee_id);
    if (currentUser.user_type == 3 || currentUser.users_id == 1) {
      setViewType("2");
    }
    toggleLoading(false);
  }, []);
  useEffect(() => {
    const getPlanning = async () => {
      const parameters = {
        params: {
          view_type: JSON.parse(currentUser).users_id == 1 ? "3" : viewtype,
          user_id: employee_id,
          convo_type: convo_type,
        },
      };
      try {
        const response = await axios.get(url.retrieveConversations, parameters);
        setPlanning(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPlanning();
    toggleLoading(false);
    const interval = setInterval(getPlanning, 2000);
    return () => clearInterval(interval);
  }, [employee_id, convo_type, viewtype]);
  const handleClick = (convoID) => {
    localStorage.setItem("convoID", convoID);
    navigate("/conversations/planning/messages");
  };
  //View Employees Conversations
  const handleViewEmployeeClick = (convoID) => {
    localStorage.setItem("convoID", convoID);
    navigate("/conversations/planning/view_employee_messages");
  };
  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="w-full mt-4">
        <div className="h-[2.5rem] border-t border-x bg-default border-default-dark rounded-t-md p-2 flex items-center justify-end">
          <div className="bg-white rounded-full flex py-1">
            {JSON.parse(currentUser).user_type != 3 && (
              <>
                {verifyIfEvaluator && (
                  <>
                    {viewType.map((view, index) => (
                      <div key={index} className="" name="view">
                        <input
                          type="radio"
                          name="view"
                          className="peer hidden"
                          id={view}
                          value={index + 1}
                          onClick={(e) => {
                            setViewType(e.target.value);
                          }}
                          checked={index + 1 == viewtype}
                        />
                        <label
                          for={view}
                          className="ml-2 text-[0.8rem] rounded-full px-2 py-1 peer-checked:bg-un-red peer-checked:text-white transition-all cursor-pointer"
                        >
                          {view}
                        </label>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="w-full h-[95%] border-x border-b border-default-dark rounded-b-md overflow-scroll">
          {viewtype && viewtype == "1" ? (
            <>
              {planning.length == 0 ? (
                <div className="w-full flex items-center justify-center text-[1.5rem] font-bold text-dark-gray">
                  No Conversations Found
                </div>
              ) : (
                <>
                  {planning &&
                    planning.map((item, index) => (
                      <div key={index}>
                        <div className="relative group/item w-full">
                          <div
                            className="flex border-b border-default-dark hover:bg-default py-2 cursor-pointer select-none"
                            onClick={() => handleClick(item.ID)}
                          >
                            <span className="lg:mx-2 hidden md:block text-[0.9rem]">
                              {cnt++}
                            </span>
                            <span className="hidden md:block mx-2 font-semibold lg:whitespace-nowrap min-w-[150px] text-[.8rem]">
                              {item.converse_name}
                            </span>
                            <div className="max-w-[70vw] md:max-w-[60vw] lg:max-w-[20vw] xl:max-w-[35vw] 2xl:max-w-[50vw] flex flex-col overflow-hidden">
                              <span className="lg:mx-2 font-semibold lg:whitespace-nowrap text-left text-[.8rem]">
                                {item.agenda}
                              </span>
                              <span className="lg:mx-2 whitespace-nowrap text-[0.6rem] text-mid-gray lg:text-[0.8rem]">
                                {employee_id == item.last_sent_user_id
                                  ? "You: "
                                  : ""}
                                {item.last_sent_message}
                              </span>
                            </div>
                          </div>
                          <div className="absolute w-[6rem] md:w-[10rem] h-[3.1rem] lg:h-[3.4rem] group-hover/item:w-[3.2rem] hover:w-[3.2rem] top-0 right-0 bg-white group-hover/item:bg-default" />
                          <div className="absolute flex flex-col md:flex-row md:gap-2 text-[0.8rem] whitespace-nowrap px-2 top-2 md:top-4 lg:top-5 right-0 group-hover/item:hidden">
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
                            <span className="text-[0.6rem] md:text-[0.8rem] text-right">
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
                          </div>
                          <div className="absolute w-0 overflow-hidden top-5 right-0 group-hover/item:right-4 flex justify-end group-hover/item:w-[2rem] transition-all">
                            <ConversationsActions
                              convo_id={item.ID}
                              employee_id={item.converse_id}
                              employee_name={item.converse_name}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </>
          ) : (
            <>
              {planning.length == 0 ? (
                <div className="w-full flex items-center justify-center text-[1.5rem] font-bold">
                  No Conversations Found
                </div>
              ) : (
                <>
                  {planning &&
                    planning.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border-b border-default-dark hover:bg-default w-full"
                        onClick={() => handleViewEmployeeClick(item.ID)}
                      >
                        <div className="flex items-center py-2 cursor-pointer select-none">
                          <span className="lg:mx-2 hidden md:block text-[0.9rem]">
                            {cnt++}
                          </span>
                          <div className="hidden md:flex md:flex-col mx-2 font-semibold lg:whitespace-nowrap min-w-[150px] text-[.8rem]">
                            <span>{item.converse_name_1},</span>
                            <span>{item.converse_name_2}</span>
                          </div>
                          <div className="max-w-[70vw] md:max-w-[60vw] lg:max-w-[20vw] xl:max-w-[35vw] 2xl:max-w-[50vw] flex flex-col overflow-hidden">
                            <span className="lg:mx-2 font-semibold lg:whitespace-nowrap text-left text-[.8rem]">
                              {item.agenda}
                            </span>
                            <span className="lg:mx-2 whitespace-nowrap text-[0.6rem] text-mid-gray lg:text-[0.8rem]">
                              {item.user_1 === item.last_sent_user_id
                                ? `${item.converse_name_1}: `
                                : item.user_2 === item.last_sent_user_id
                                  ? `${item.converse_name_2}: `
                                  : ""}
                              {item.last_sent_message}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row text-[0.6rem] md:text-[0.8rem] mr-2 md:gap-2">
                          <span>
                            {format(new Date(item.last_modified), "dd/MM/yyyy")}
                          </span>
                          <span>
                            {format(new Date(item.last_modified), "hh:mm a")}
                          </span>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
