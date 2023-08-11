import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function EmployeeSignOffAssessment() {
    const [loading, toggleLoading] = useState(true);
    const navigate = useNavigate();
    const employee_id = sessionStorage.getItem("assessment_id");
    const workYear = sessionStorage.getItem("work_year");

    useEffect(() => {

        toggleLoading(false);
    }, []);
    return  loading ? (
        "Loading..."
    ) : (
        <>
            <button
                className="flex flex-row items-center w-fit text-dark-gray text-[.9rem] bg-default-dark p-1 rounded-md mb-4"
                onClick={() => navigate(-1)}
            >
                <MdOutlineKeyboardArrowLeft />
                <span>Back</span>
            </button>

        </>
    );
}