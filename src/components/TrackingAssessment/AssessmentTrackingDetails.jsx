import React from "react";
import axios from "axios";
import { Route, Router, Routes } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

export default function AssessmentTrackingDetails(quarter) {
    return (
        <>
            <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2 items-center text-center">
                <span>
                    Sorry, you still haven’t created your evaluation for this quarter.
                </span>
                <a
                    href="/tracking_and_assement/create"
                    className="text-white p-2 flex flex-row items-center gap-2 bg-un-blue-light hover:bg-un-blue rounded-full text-[.9rem]"
                >
                    <AiOutlinePlus />
                    Add Quarter Evaluation
                </a>
            </div>
        </>
    )
}