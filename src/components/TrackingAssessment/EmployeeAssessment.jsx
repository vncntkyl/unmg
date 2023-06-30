import React, { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { CiCircleMore } from "react-icons/ci";
import axios from "axios";

export default function EmployeeAssessment(emp_id) {
    const [employeeType, setEmployeeType] = useState("0");
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        const getuser = async () => {
            try {
                const response = await axios.get("http://localhost/unmg_pms/api/retrieveTrackingEmployee.php", {
                    params: {
                        employeeType: employeeType,
                        empID: emp_id
                    },
                });
                setEmployees(response.data)
            }
            catch (error) {
                console.log(error.message)
            }
        }
        getuser();
    }, [employeeType]);
    return (
        <>
            <div className="bg-default px-2 pb-4 pt-2 rounded-md">
                <div className="flex flex-row p-2 items-center gap-3">
                    <span>Job Status:</span>
                    <select className="text-black rounded-md p-1 px-2 outline-none" onChange={(event) => setEmployeeType(event.target.value)}>
                        <option value="0">Regular</option>
                        <option value="1">Probationary</option>
                    </select>
                </div>
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

                <table className="bg-white w-full">
                    <thead>
                        <tr className="bg-un-blue-light text-white">
                            <td className="px-10">
                                Name
                            </td>
                            <td className="px-10">
                                Job Title
                            </td>
                            <td className="px-10">
                                Supervisor
                            </td>
                            <td className="px-10">
                                Immediate Supervisor
                            </td>
                            <td className="px-10">
                                Next Immediate Supervisor
                            </td>
                            <td className="px-10">
                                Action
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr>
                                <td>
                                    <div className="flex flex-row justify-start items-center gap-2">
                                        <AiFillCheckCircle className="text-[#3D8F36]" />{employee.employee_name}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-row justify-start items-center gap-2">{employee.job_description}</div></td>
                                <td><div className="flex flex-row justify-start items-center gap-2">
                                    <AiFillCheckCircle className="text-[#3D8F36]" />{employee.primary_eval_name}
                                </div>
                                </td>
                                <td><div className="flex flex-row justify-start items-center gap-2">
                                    <AiFillCheckCircle className="text-[#3D8F36]" />{employee.secondary_eval_name}
                                </div>
                                </td>
                                <td><div className="flex flex-row justify-start items-center gap-2">
                                    <AiFillCheckCircle className="text-[#3D8F36]" />{employee.tertiary_eval_name}
                                </div>
                                </td>
                                <td><div className="text-[1.2 rem] flex flex-row justify-center items-center">
                                    <CiCircleMore />
                                </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}