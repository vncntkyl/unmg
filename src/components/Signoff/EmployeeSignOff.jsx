import React, { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { CiCircleMore } from "react-icons/ci";
import axios from "axios";

export default function EmployeeSignOff() {
    const [status, setStatus] = useState("All");

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getuser = async () => {

            try {
                const response = await axios.get("http://localhost/unmg_pms/api/retrieveUsers.php", {
                    params: {
                        users: "regular",
                    },
                });
                setUsers(response.data)
            } 
            catch (error) {
                console.log(error.message)
            }
        }
        getuser();
    }, []);

    return (
        <>
            <div className="flex flex-row p-2 items-center gap-3">
                <span>Status:</span>
                <select className=" text-black rounded-md p-1 px-2 outline-none">
                    <option value="All">All</option>
                    <option value="For Verification/Validation">For Verification/Validation</option>
                    <option value="Pending">Pending</option>
                    <option value="To Sign">To Sign</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>








            <div className="flex flex-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-un-blue-light text-white">
                            <td>
                                Name
                            </td>
                            <td>
                                Job Title
                            </td>
                            <td>
                                Immediate Supervisor
                            </td>
                            <td>
                                Next Immediate Supervisor
                            </td>
                            <td>
                                Action
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr>
                                <td className="flex flex-row justify-start items-center gap-2"><AiFillCheckCircle className="text-[#3D8F36]"/>{user.first_name}</td>
                                <td>{user.job_description}</td>
                                <td><div className="flex flex-row justify-start items-center gap-2"><AiFillCheckCircle className="text-[#3D8F36]"/>{user.supervisor_id}</div></td>
                                <td><div className="flex flex-row justify-start items-center gap-2"><AiFillCheckCircle className="text-[#3D8F36]"/>{user.immediate_supervisor_id}</div></td>
                                <td><div className="text-[1.2 rem] flex flex-row justify-center items-center"><CiCircleMore/></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}