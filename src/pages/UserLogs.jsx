import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useFunction } from "../context/FunctionContext";
import { useAuth } from "../context/authContext";
import Logs from "../components/Logs";
export default function UserLogs() {
    const [loading, toggleLoading] = useState(true);
    const [employeeID, setEmployeeID] = useState();
    const [isEvaluator, setIsEvaluator] = useState(false);
    const { getPath } = useFunction();
    const { currentUser } = useAuth();
    const userType = JSON.parse(currentUser).user_type;

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        setEmployeeID(currentUser.employee_id);
        toggleLoading(false);
    }, []);

    return employeeID !== -1 && (loading ? (
        "Loading..."
    ) : (
        <>
            <section className="relative">
                <div className={classNames("w-full min-h-[175px]", userType <= 2 ? "bg-un-blue" : userType >= 3 && userType <= 5 ? "bg-un-red-dark-1" : "bg-dark-gray")}>
                    <div className="absolute top-0 left-0 w-full px-4 lg:pl-[18rem] xl:pl-[18.5rem] xl:pr-[1.5rem]">
                        <div className="bg-white p-2 rounded-md flex flex-col shadow-md justify-between gap-2">
                            {/* HEADER */}
                            <div className="flex flex-col items-center justify-between md:flex-row">
                                <span className="text-un-blue text-[1.2rem] font-semibold text-start w-full flex flex-row items-center gap-2">
                                    Users Logs
                                </span>
                            </div>
                            {/* Content */}
                            <div className="w-full">
                                <Logs/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    ));
}