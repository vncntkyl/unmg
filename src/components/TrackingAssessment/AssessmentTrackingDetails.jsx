import React from "react";
import axios from "axios";
import { Route, Router, Routes } from "react-router-dom";

export default function AssessmentTrackingDetails() {

    return (
        <>
                <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2 items-center text-center">

<span>
    Sorry Your Assessment has not
    been approved yet. Please wait for the
    approval of your supervisor.
</span>

</div>
        </>
    )
}