import React from 'react';
import { GrClose } from "react-icons/gr";

export default function TrackingAssessmentModal({ 
    closeModal, 
    type,
    title,
    first_name,
    message,
    continuebutton}) {
        const notifyEmployee = () =>{
            if(type === "discussion")
            {
                closeModal(false);
                alert("A 1 on 1 disscussion with "+first_name+" has been sent!");
            }
            else if(type === "approval")
            {
                closeModal(false);
                alert("The assessment of "+first_name+" has been approved successfully!");
            }
        }
    return (
        <>
            <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[90%] max-w-[90%] z-[26] bg-white rounded-md p-2 transition-all md:min-w-[70%] lg:min-w-[20%]">
                {/* TITLE */}
                <div className="flex flex-row items-center justify-between border-b border-gray py-1">
                    <span className="font-semibold text-[1.1rem]">{title}</span>
                    <button className="text-[.7rem] px-1"
                        onClick={() => closeModal(false)}
                    >
                        <GrClose />
                    </button>
                </div>
                {/* MESSAGE */}
                <div className='flex items-center'>
                    <div className="py-2"><span>{message}</span></div>
                </div>
                {/* FOOTER */}
                <div className="flex flex-row items-center justify-end gap-4 p-2">
                    <button className="text-dark-gray border border-dark-gray p-1 px-2 rounded-md text-[.9rem] hover:text-gray hover:border-gray"
                        onClick={() => closeModal(false)}
                    >
                        Cancel
                    </button>
                    <input
                        type="button"
                        value={continuebutton}
                        onClick={() => notifyEmployee()}
                        className="text-white bg-un-blue-light border border-un-blue-light p-1 px-2 rounded-md text-[.9rem] hover:bg-un-blue disabled:bg-dark-gray"
                    />
                </div>
            </div>
        </>
    )
}