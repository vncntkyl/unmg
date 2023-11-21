import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { FaRegLightbulb, FaPeopleArrows, FaHeadset } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { BsClipboard2Check, BsCalendar2Week } from "react-icons/bs";
import { SlDirections } from "react-icons/sl";
import { IoIosArrowForward } from "react-icons/io";
import { MdArrowBackIos } from "react-icons/md";




export default function ConversationSideBar() {
    return (
        <>
        <div className="flex flex-col mt-5 mr-4">
        <div className="flex justify-end"><button className="p-2 pl-4 bg-default-dark flex items-center justify-center text-center rounded-lg"><MdArrowBackIos className="w-4 h-4"/></button></div>
            <span className="p-2 hover:bg-default rounded-r-full flex items-center gap-2"><FaRegLightbulb className="h-4 w-4"/>Planning</span>
            <span className="p-2 hover:bg-default rounded-r-full flex items-center gap-2"><BsClipboard2Check className="h-4 w-4"/>Evaluation</span>
            <span className="p-2 hover:bg-default rounded-r-full flex items-center gap-2"><FaPeopleArrows className="h-4 w-4"/>1 on 1</span>
            <span className="p-2 hover:bg-default rounded-r-full flex items-center gap-2"><SlDirections className="h-4 w-4"/>Directional/Redirectional</span>
            <span className="p-2 hover:bg-default rounded-r-full flex items-center gap-2"><FaHeadset className="h-4 w-4"/>Coaching</span>
            <span className="p-2 hover:bg-default rounded-r-full flex items-center gap-2"><BsCalendar2Week className="h-4 w-4"/>PIP</span>
        </div>
        </>
    );
}