import React from 'react';
import { GrClose } from "react-icons/gr";

export default function SignOffModal({ closeModal }) {
    return (
        <>
        <div className='bg-[#00000035] fixed h-full w-full z-[21] top-0 left-0 animate-fade pointer-events-auto'>
            <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[90%] max-w-[90%] z-[26] bg-white rounded-md p-2 transition-all md:min-w-[70%] lg:min-w-[20%]">
                {/* TITLE */}
                <div className="flex flex-row items-center justify-between border-b border-gray py-1">
                    <span className="font-semibold text-[1.1rem]">Sign Evaluation Confirmation</span>
                    <button className="text-[.7rem] px-1"
                        onClick={() => closeModal(false)}
                    >
                        <GrClose />
                    </button>
                </div>
                {/* MESSAGE */}
                <div className='flex items-center'>
                    <input type="checkbox" className="mr-4 h-6 w-6 rounded-md" />
                    <div className="py-2"><span>I confirm that the employee's grade reflected in this form is accurate and appropriate based on their performance over the past and their job responsibilities.</span></div>
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
                        value={"Confirm"}
                        className="text-white bg-un-blue-light border border-un-blue-light p-1 px-2 rounded-md text-[.9rem] hover:bg-un-blue disabled:bg-dark-gray"
                    />
                </div>
            </div>
            </div>
        </>
    )
}
