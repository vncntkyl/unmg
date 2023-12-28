import React, { useEffect, useState, useRef } from "react";
import Badge from "../../misc/Badge";
import axios from "axios";
import SignOffAction from "./SignOffAction";
import { useAuth } from "../../context/authContext";
import { format } from "date-fns";
import { releaseAPIs as url } from "../../context/apiList";
import { AiFillCheckCircle } from "react-icons/ai";
import classNames from "classnames";

export default function EmployeeSignOffTable({ emp_id }) {
    const [employeeType, setEmployeeType] = useState(0);
    const [employeesRecords, setEmployeesRecords] = useState([]);
    const [loading, toggleLoading] = useState(true);
    const [actionVisibility, setActionVisibility] = useState(false);
    const { currentUser, kpiDurations } = useAuth();
    const [workYear, setWorkYear] = useState(-1);
    const toggleActionVisibility = () => {
        setActionVisibility((prev) => !prev);
    };
    //check columns
    const fqisColumnAllFalse =
        employeesRecords.length > 0 &&
        employeesRecords.every(
            (employee) => !employee.fq_achievements && !employee.fq_results
        );
    const myrisColumnAllFalse =
        employeesRecords.length > 0 &&
        employeesRecords.every(
            (employee) => !employee.myr_achievements && !employee.myr_results
        );
    const tqisColumnAllFalse =
        employeesRecords.length > 0 &&
        employeesRecords.every(
            (employee) => !employee.tq_achievements && !employee.tq_results
        );
    const yeeisColumnAllFalse =
        employeesRecords.length > 0 &&
        employeesRecords.every(
            (employee) => !employee.yee_achievements && !employee.yee_results
        );
    const yeeagreedisColumnAllFalse =
        employeesRecords.length > 0 &&
        employeesRecords.every(
            (employee) => !employee.agreed_rating && !employee.yee_results
        );
    const creation_dateColumnAllFalse =
        employeesRecords.length > 0 &&
        employeesRecords.every(
            (employee) => !employee.creation_date && !employee.creation_date
        );

    useEffect(() => {
        const getemployeesRecords = async () => {
            const parameters = {
                params: {
                    employeeType: employeeType,
                    empID: JSON.parse(currentUser).user_type === "1" ? 1 : emp_id,
                    workYear: workYear,
                }
            }
            try {
                const response = await axios.get(url.retrieveSignOffEmployee, parameters);
                const employeeRecords = response.data.map((item) => {
                    return {
                        employee_id: item.employee_id,
                        first_name: item.first_name,
                        employee_name: item.employee_name,
                        primary_eval_name: item.primary_eval_name,
                        secondary_eval_name: item.secondary_eval_name,
                        tertiary_eval_name: item.tertiary_eval_name,
                        sp_id: item.sp_id,
                        creation_date: item.creation_date > 0 && item.creation_date !== null,
                        check_ratee_sign: item.ratee !== null && item.ratee !== 0,
                        check_primary_sign: item.rater_1 !== null && item.rater_1 !== 0,
                        check_secondary_sign: item.rater_2 !== null && item.rater_2 !== 0,
                        check_tertiary_sign: item.rater_3 !== null && item.rater_3 !== 0
                    };
                });
                setEmployeesRecords(employeeRecords);
            } catch (error) {
                console.log(error.message);
            }
        };
        getemployeesRecords();
        toggleLoading(false);
    }, [employeeType, workYear]);
    return loading ? (
        "Loading..."
    ) : (
        <>
            <div className="bg-default px-2 pb-4 pt-2 rounded-md">
                <div className="flex flex-row justify-between p-2 items-center gap-3">
                    <div className="flex items-center gap-3">
                        <span>Job Status:</span>
                        <select
                            className="text-black rounded-md p-1 px-2 outline-none"
                            onChange={(event) => setEmployeeType(event.target.value)}
                        >
                            <option value={0}>All</option>
                            <option value={1}>Regular</option>
                            <option value={2}>Probationary</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-3">
                        <span>Select Work Year:</span>
                        <select
                            className="text-black rounded-md p-1 px-2 outline-none"
                            onChange={(event) => setWorkYear(event.target.value)}
                        >
                            {" "}
                            <option value="-1" disabled selected={workYear === -1}>
                                --Select Year--
                            </option>
                            {kpiDurations.length > 0 &&
                                kpiDurations.map((year) => {
                                    return (
                                        <option
                                            value={year.kpi_year_duration_id}
                                            selected={year.kpi_year_duration_id === workYear}
                                        >
                                            {format(new Date(year.from_date), "MMM d, yyyy") +
                                                " - " +
                                                format(new Date(year.to_date), "MMM d, yyyy")}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                </div>

                {workYear != -1 ? (
                    <>
                        <table className="bg-white w-full">
                            <thead>
                                <tr className="bg-un-blue-light text-white pb-4">
                                    <td>
                                        <div className="flex justify-center px-2">Name</div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center px-2">
                                            Status
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center px-2">
                                            Primary Evaluator
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center px-2">
                                            Secondary Evaluator
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center px-2">
                                            Tertiary Evaluator
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center px-2">
                                            Action
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {employeesRecords.map((employee, index) => (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td>
                                                <div className="w-auto grid grid-cols-[1fr_6fr] gap-2">
                                                    <span className="flex items-center justify-end"><AiFillCheckCircle className={classNames(employee.check_ratee_sign ? "text-un-green" : "text-white")} /></span>
                                                    <span>{employee.employee_name != null ? employee.employee_name : "-"}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center justify-center pt-2">
                                                    {!employee.creation_date ? (
                                                        <Badge
                                                            message={"No goals yet"}
                                                            className={"text-[.8rem] px-2"}
                                                        />
                                                    ) : (
                                                        <Badge
                                                            message={"Ongoing"}
                                                            type="success"
                                                            className={"text-[.8rem] px-1"}
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="w-auto grid grid-cols-[3fr_6fr] gap-2">
                                                    <span className="flex items-center justify-end"><AiFillCheckCircle className={classNames(employee.check_primary_sign ? "text-un-green" : "text-white")} /></span>
                                                    <span>{employee.primary_eval_name != null ? employee.primary_eval_name : "-"}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="w-auto grid grid-cols-[3fr_6fr] gap-2">
                                                    <span className="flex items-center justify-end"><AiFillCheckCircle className={classNames(employee.check_secondary_sign ? "text-un-green" : "text-white")} /></span>
                                                    <span>{employee.secondary_eval_name != null ? employee.secondary_eval_name : "-"}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="w-auto grid grid-cols-[3fr_6fr] gap-2">
                                                    <span className="flex items-center justify-end"><AiFillCheckCircle className={classNames(employee.check_tertiary_sign ? "text-un-green" : "text-white")} /></span>
                                                    <span>{employee.tertiary_eval_name != null ? employee.tertiary_eval_name : "-"}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <SignOffAction
                                                    toggleActionVisibility={
                                                        toggleActionVisibility
                                                    }
                                                    workYear={workYear}
                                                    sp_id={employee.sp_id}
                                                    employee_id={employee.employee_id}
                                                    first_name={employee.first_name}
                                                />
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <div className="font-semibold text-dark-gray bg-white rounded-md p-2 flex flex-col gap-2 items-center text-center">
                        <span>
                            Please select a work year to show Tracking and Assessment.
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}
