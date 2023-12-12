import React, { useEffect, useState } from "react";
import axios from "axios";
import { developmentAPIs as url } from "../../context/apiList";
import ConversationsActions from "./ConversationsActions";
import { useNavigate } from "react-router-dom";
export default function Evaluations({ employee_id, convo_type }) {
  const navigate = useNavigate();
  const [loading, toggleLoading] = useState(true);
  const [evaluations, setEvaluations] = useState([]);
  const [quart, setQuart] = useState("1");
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
    const interval = setInterval(getEvaluations, 5000);
    return () => clearInterval(interval);
  }, [employee_id, convo_type]);
  
  const handleClick = (convoID) => {
    localStorage.setItem("convoID", convoID);
    navigate("/conversations/evaluations/messages");
  }
  const quarters = [
    "First Quarter",
    "Mid Year",
    "Third Quarter",
    "Year End",
  ];
  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="w-full mt-4">
        <div className="h-[2.5rem] border-t border-x bg-default border-default-dark rounded-t-md flex px-2">
          <div className="flex items-center gap-2 text-[0.9rem]">
            {quarters.map((quarter, index) => (
              <div key={index} className="" name="quarter">
                <input
                  type="radio"
                  name="quarter"
                  className="peer hidden w-4 h-4"
                  id={quarter}
                  value={index + 1}
                  onClick={(e) => {
                    setQuart(e.target.value);
                  }}
                  checked={index + 1 == quart}
                />
                <label
                  for={quarter}
                  className="ml-2 rounded-md px-2 py-1 peer-checked:bg-un-red peer-checked:text-white transition-all cursor-pointer">{quarter}</label>
              </div>
            ))}

          </div>
        </div>

        <div className="w-full h-[95%] border-x border-b border-default-dark rounded-b-md overflow-scroll">
          {evaluations.length == 0 ? (
            <div className="w-full flex items-center justify-center text-[1.5rem] font-bold">
              No Conversations Found
            </div>
          ) : (
            <>
              {evaluations && evaluations.filter(item => parseInt(quart) === item.evaluation_quarter).length > 0 ? (
                evaluations.map((item, index) => parseInt(quart) === item.evaluation_quarter ? (
                  <div key={index}>
                    <div className="relative group/item w-full">
                      <div
                        className="flex border-b border-default-dark hover:bg-default py-2 cursor-pointer select-none"
                        onClick={() => handleClick(item.ID)}>
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
                          employee_id={item.converse_id}
                          employee_name={item.converse_name}
                        />
                      </div>
                    </div>
                  </div>
                ) : null)
              ) : (
                <div className="w-full flex items-center justify-center text-[1.5rem] font-bold">
                  No Conversations Found
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
