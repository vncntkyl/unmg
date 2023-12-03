import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrClose } from "react-icons/gr";
import { IoAttach } from "react-icons/io5";
import { developmentAPIs as url } from "../context/apiList";



export default function ConversationsModal({
    employee_id,
    closeModal,
}) {
    const [type, setType] = useState(0);
    const [quarter, setQuarter] = useState(0);
    const [coaching, setCoaching] = useState(0);
    const [file, setFile] = useState("");
    const [receivers, setReceivers] = useState([]);
    useEffect(() => {
        const getReceivers = async () => {
            const parameters = {
                params: {
                    empID: employee_id
                },
            };
            try {
                const response = await axios.get(url.retrieveReceivers, parameters);
                setReceivers(response.data);
            }
            catch (error) {
                console.log(error.message);
            }
            };
            getReceivers();
    }, [employee_id]);

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
                        <div className="py-2">
                            <div className="flex items-center gap-2 justify-between mb-2">
                                <span>
                                    Type of conversation
                                </span>
                                <select
                                    className="text-black rounded-md p-1 px-2 outline-none border border-mid-gray"
                                    onChange={(e) => setType(parseInt(e.target.value))}
                                >
                                    <option value={0} selected disabled>Select A Type of Conversation</option>
                                    <option value={1}>Planning</option>
                                    <option value={2}>Evaluations</option>
                                    <option value={3}>Directional/Redirectional</option>
                                    <option value={4}>Coaching</option>
                                    <option value={5}>PIP</option>
                                </select>
                            </div>
                            {type === 2 && (
                                <div className="flex items-center gap-2 justify-between mb-2">
                                    <span>
                                        Quarter
                                    </span>
                                    <select
                                        className="text-black rounded-md p-1 px-2 outline-none border border-mid-gray"
                                        onChange={(e) => setQuarter(parseInt(e.target.value))}
                                    >
                                        <option value={0} selected disabled>Select Quarter</option>
                                        <option value={1}>First Quarter</option>
                                        <option value={2}>Mid Year</option>
                                        <option value={3}>Third Quarter</option>
                                        <option value={4}>Year End</option>
                                    </select>
                                </div>
                            )}
                            {type === 4 && (
                                <div className="flex items-center gap-2 justify-between mb-2">
                                    <span>
                                        Coaching Type
                                    </span>
                                    <select
                                        className="text-black rounded-md p-1 px-2 outline-none border border-mid-gray"
                                        onChange={(e) => setCoaching(parseInt(e.target.value))}
                                    >
                                        <option value={0} selected disabled>Coaching Type</option>
                                        <option value={1}>Directive</option>
                                        <option value={2}>Developmental</option>
                                    </select>
                                </div>
                            )}
                            <div>
                                {type === 0 ? (<span className="flex justify-center">No type selected</span>)
                                    : (
                                        <>
                                        {console.log(receivers.map(receiver => receiver.receiver_id))}
                                            <div className="flex items-center gap-2 justify-between">
                                                <span>
                                                    Recipient
                                                </span>
                                                <select className="text-black rounded-md p-1 px-2 outline-none border border-mid-gray">
                                                    <option value="" disabled selected>Select A Recipient</option>
                                                    {receivers &&
                                                    receivers.map((receiver) => receiver.receiver_id && (
                                                        <option key={receiver.receiver_id} value={receiver.receiver_id}>
                                                        {receiver.receivers}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <input type="text" className="text-black rounded-t-md p-1 px-2 outline-none w-full bg-default mt-2 border-b-[.1rem]" placeholder="Agenda" />
                                            <div className="w-full bg-default rounded-b-md">
                                            <textarea name="" id="" cols="30" rows="10" className="w-full bg-default rounded-b-md resize-none outline-none px-2 pt-2 pb-5" placeholder="Message"></textarea>
                                                <div className="w-fit pb-2 px-2 flex items-center">
                                                    <label htmlFor="fileUpload" className="w-fit cursor-pointer text-[1.5rem] text-dark-gray hover:text-gray"><IoAttach /></label>
                                                    <input type="file" className="hidden" id="fileUpload" 
                                                    onChange={(e) => setFile(e.target.files[0])}/>
                                                    <p className="text-[0.8rem]">{file && file.name}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center my-4">
                                                <label class="relative inline-flex items-center cursor-pointer gap-2">
                                                    <input
                                                        type="checkbox"
                                                        //checked={settings.goal_status === "1" || settings.goal_status === 1}
                                                        className="sr-only peer"
                                                    //onChange={(event) => handleSettings("goal_status", event.target.checked ? 1 : 0)}
                                                    />
                                                    <div class="border-[1px] peer-checked:bg-un-blue w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                    <label className="text-[.8rem]">Would you like to include the administrator (Cc) in this communication?</label>
                                                </label>
                                            </div>
                                        </>
                                    )}
                            </div>
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