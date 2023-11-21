import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import classNames from "classnames";
import ShowConversations from "../components/Conversations/ShowConversations";
import ConversationSideBar from "../components/Conversations/ConversationSideBar";
export default function Conversations() {
    const [loading, toggleLoading] = useState(true);
    const [employeeID, setEmployeeID] = useState(-1);
    const { currentUser } = useAuth();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser")).employee_id;
        if (currentUser) {
            toggleLoading(false);
        }
        setEmployeeID(currentUser);
    }, []);

    const userType = JSON.parse(currentUser).user_type;
    return employeeID !== -1 && (loading ? (
        "Loading..."
    ) : (
        <>
            <section className="relative">
                <div className={classNames("w-full min-h-[175px]", userType <= 2 ? "bg-un-blue" : userType >= 3 && userType <= 5 ? "bg-un-red-dark-1" : "bg-dark-gray")} />
                <div className="absolute top-0 left-0 w-full px-4 lg:pl-[18rem] xl:pl-[18.5rem] xl:pr-[1.5rem]">
                    <div className="bg-white p-2 rounded-md flex flex-col shadow-md justify-between">
                        {/* HEADER */}
                        <div className="flex flex-col items-center justify-between md:flex-row">
                            <span className="text-un-blue text-[1.2rem] font-semibold text-start w-full flex flex-row items-center gap-2">
                                Conversations
                            </span>
                        </div>
                        <div className="h-[85vh] grid grid-cols-[3fr_15fr]">
                            <ConversationSideBar />
                            <ShowConversations />
                        </div>
                    </div>
                </div>
            </section>
        </>
    ));
}