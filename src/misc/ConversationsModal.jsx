import React from "react";
import { GrClose } from "react-icons/gr";


export default function ConversationsModal({
    closeModal,
}) {

    return (
        <>
            <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[90%] max-w-[90%] z-[26] bg-white rounded-md p-2 transition-all md:min-w-[70%] lg:min-w-[20%]">
                <form>
                    <div className="flex flex-row items-center justify-between border-b border-gray py-1">
                        <span className="font-semibold text-[1.1rem]">New Message</span>
                        <button className="text-[.7rem] px-1"
                            onClick={() => closeModal(false)}
                        ><GrClose />
                        </button>
                    </div>
                    {/* MESSAGE */}
                    <div className="flex flex-col items-center">
                        <div className="w-full my-2">
                        </div>
                        <div className="py-2">
                            <span>
                                Type of conversation
                            </span>
                            <select
                                className="text-black rounded-md p-1 px-2 outline-none"
                            >
                                <option value="1">Planning</option>
                                <option value="2">Evaluations</option>
                                <option value="3">1 on 1</option>
                                <option value="4">Directional/Redirectional</option>
                                <option value="5">Coaching</option>
                                <option value="6">PIP</option>
                            </select>
                        </div>
                    </div>
                    {/* FOOTER */}
                    <div className="flex flex-row items-center justify-end gap-4 p-2">
                        <button
                            className="text-dark-gray border border-dark-gray p-1 px-2 rounded-md text-[.9rem] hover:text-gray hover:border-gray"
                            onClick={() => closeModal(false)}
                        >
                            Cancel
                        </button>
                        <input
                            type="submit"
                            className="text-white bg-un-blue-light border border-un-blue-light p-1 px-2 rounded-md text-[.9rem] hover:bg-un-blue disabled:bg-dark-gray"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}