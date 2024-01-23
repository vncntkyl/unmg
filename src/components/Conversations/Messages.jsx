import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { format, set } from "date-fns";
import { developmentAPIs as url } from "../../context/apiList";
import { Tooltip } from "flowbite-react";
import { IoMdDownload } from "react-icons/io";
import { MdInsertDriveFile, MdOutlineReply } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Messages({ convoID, employee_id, replyDetails }) {
  const messageRef = useRef(null);
  const prevConvoLength = useRef(0);
  const [loading, toggleLoading] = useState(true);
  const [convo, setConvo] = useState([]);
  const [isPulsing, setIsPulsing] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  //Data Fetching
  useEffect(() => {
    const getConvo = async () => {
      const parameters = {
        params: {
          convo: "true",
          convo_id: convoID,
          page: currentPage,
          itemsPerPage: 10,
        },
      };
      try {
        const response = await axios.get(url.retrieveConvo, parameters);
        setConvo(response.data);
        // setCurrentPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.log(error);
      }
    };
    if (!convoID) return;
    getConvo();
    toggleLoading(false);
  }, [employee_id, convoID]);
  //Scroll when new message appear
  useEffect(() => {
    if (convo.length !== prevConvoLength.current) {
      // Conversation length has changed, scroll to the bottom
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
      // Update the previous length
      prevConvoLength.current = convo.length;
    }
  }, [convo]);

  //Reply
  const handleReply = (
    reply_message_id,
    reply_convo_message,
    reply_message_type
  ) => {
    replyDetails({
      reply_message_id: reply_message_id,
      reply_convo_message: reply_convo_message,
      reply_message_type: reply_message_type,
    });
  };

  //Go to Message
  const handleGoToMessage = (messageId) => {
    setIsPulsing(messageId);
    setTimeout(() => {
      setIsPulsing(null);
    }, 2000);
    const targetElement = document.getElementById(messageId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return loading ? (
    "Loading"
  ) : (
    <>
      {convo &&
        convo.length > 0 &&
        convo.map((item_convo) => (
          <div
            className={classNames(
              "group w-fit max-w-lg flex items-center whitespace-normal",
              parseInt(item_convo.employee_id) === parseInt(employee_id)
                ? "justify-end ml-auto"
                : "justify-start flex-row-reverse"
            )}
            key={`messages_${item_convo.ID}`}
          >
            <Tooltip
              content="Reply"
              placement={
                parseInt(item_convo.employee_id) === parseInt(employee_id)
                  ? "left"
                  : "right"
              }
              style={"light"}
            >
              <button
                className="mx-2 opacity-0 group-hover:opacity-100"
                type="button"
                onClick={() =>
                  handleReply(
                    item_convo.ID,
                    item_convo.message,
                    item_convo.message_type
                  )
                }
              >
                <MdOutlineReply />
              </button>
            </Tooltip>
            <div className="my-2 w-full max-w-lg">
              <span
                className={classNames(
                  "opacity-0 group-hover:opacity-100 text-[0.75rem] flex gap-2",
                  parseInt(item_convo.employee_id) === parseInt(employee_id)
                    ? "justify-end"
                    : "justify-start"
                )}
              >
                <span>
                  {format(new Date(item_convo.creation_date), "MMM d, yyyy")}
                </span>
                <span>
                  {format(new Date(item_convo.creation_date), "hh:mm a")}
                </span>
              </span>
              <div
                className={classNames(
                  "px-4 pb-4 pt-2 rounded-md w-full",
                  parseInt(item_convo.employee_id) === parseInt(employee_id)
                    ? "bg-un-blue-light-1 bg-opacity-60"
                    : "bg-default",
                  isPulsing === `message_${item_convo.ID}`
                    ? "animate-pulse outline outline-1"
                    : ""
                )}
                id={`message_${item_convo.ID}`}
              >
                <div className="w-full whitespace-nowrap overflow-hidden">
                  {convo
                    .filter(
                      (reply) =>
                        parseInt(item_convo.reply_id) !== 0 &&
                        parseInt(reply.ID) === parseInt(item_convo.reply_id)
                    )
                    .map((con) => (
                      <div
                        key={`replys_${con.ID}`}
                        className={classNames(
                          "w-full px-2 py-1 flex items-center gap-2 text-gray-600 text-[.75rem]",
                          parseInt(item_convo.employee_id) ===
                            parseInt(employee_id)
                            ? "bg-gradient-to-r from-blue-300 from-[2%]"
                            : "bg-gradient-to-r from-gray-400 from-[2%]"
                        )}
                        id={`reply_${con.ID}`}
                      >
                        {/* <ImForward /> */}
                        <button
                          onClick={() => handleGoToMessage(`message_${con.ID}`)}
                        >
                          {con.message.length > 20
                            ? `${con.message.substring(0, 20)}...`
                            : con.message}
                        </button>
                      </div>
                    ))}
                </div>

                <span className="font-semibold">
                  {item_convo.employee_name}
                </span>
                <div className="indent-4 text-justify whitespace-break-spaces">
                  {item_convo.message_type &&
                    parseInt(item_convo.message_type) === 1 ? (
                    item_convo.message
                  ) : parseInt(item_convo.message_type) === 2 ? (
                    <img
                      src={`../../media/image/` + item_convo.message}
                      alt="image"
                      className="rounded-md"
                    />
                  ) : parseInt(item_convo.message_type) === 3 ? (
                    <video
                      src={`../../media/video/` + item_convo.message}
                      alt="video"
                      className="rounded-md"
                      controls
                    />
                  ) : parseInt(item_convo.message_type) === 4 ? (
                    <audio
                      src={`../../media/audio/` + item_convo.message}
                      alt="audio"
                      controls
                    />
                  ) : (
                    <div className="w-full flex items-center">
                      <MdInsertDriveFile className="text-[2.6rem] text-dark-gray" />
                      <span className="w-full flex flex-col">
                        <span>{item_convo.message}</span>
                        <span className="flex items-center justify-end">
                          <a
                            className="text-[1.4rem] hover:text-un-red text-dark-gray"
                            href={`../../media/file/${item_convo.message}`}
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
            </div>
          </div>
        ))}
      <div ref={messageRef}></div>
    </>
  );
}
