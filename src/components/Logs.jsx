import React, { useState } from "react";
import Badge from "../misc/Badge";
import { format, isSameMonth, isToday, isYesterday, subDays } from "date-fns";
import Datepicker from "react-tailwindcss-datepicker";

export default function Logs() {
    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(11)
    });

    const handleDateChange = (newValue) => {
        setDate(newValue);
    }

    const data = [
        { "ID": 1, "employee_id": 1001, "name": "John Doe", "user_type": "Regular", "action": 1, "module_type": 3, "logs_description": "Updated user profile information", "deleted": 0, "creation_date": "2024-01-09 08:15:00" },
        { "ID": 2, "employee_id": 1005, "name": "Alice Johnson", "user_type": "Admin", "action": 2, "module_type": 2, "logs_description": "Created new project", "deleted": 0, "creation_date": "2023-11-03 10:30:22" },
        { "ID": 3, "employee_id": 1002, "name": "Bob Smith", "user_type": "Regular", "action": 3, "module_type": 4, "logs_description": "Error encountered in payment processing", "deleted": 0, "creation_date": "2023-11-05 15:45:11" },
        { "ID": 4, "employee_id": 1004, "name": "Emma Brown", "user_type": "Admin", "action": 1, "module_type": 1, "logs_description": "Logged in to the system", "deleted": 0, "creation_date": "2023-11-07 12:00:30" },
        { "ID": 5, "employee_id": 1003, "name": "Michael Wilson", "user_type": "Regular", "action": 2, "module_type": 5, "logs_description": "Deleted obsolete records", "deleted": 0, "creation_date": "2023-11-08 14:20:05" },
        { "ID": 6, "employee_id": 1006, "name": "Sophia Martinez", "user_type": "Regular", "action": 2, "module_type": 3, "logs_description": "Modified access permissions", "deleted": 0, "creation_date": "2023-11-10 09:05:12" },
        { "ID": 7, "employee_id": 1007, "name": "William Taylor", "user_type": "Admin", "action": 3, "module_type": 2, "logs_description": "Reviewed quarterly reports", "deleted": 0, "creation_date": "2023-11-12 11:30:44" },
        { "ID": 8, "employee_id": 1008, "name": "Olivia Anderson", "user_type": "Regular", "action": 1, "module_type": 4, "logs_description": "System update installed", "deleted": 0, "creation_date": "2023-11-14 13:40:19" },
        { "ID": 9, "employee_id": 1009, "name": "James Clark", "user_type": "Admin", "action": 2, "module_type": 1, "logs_description": "Conducted training session", "deleted": 0, "creation_date": "2023-11-16 16:55:58" },
        { "ID": 10, "employee_id": 1010, "name": "Emily Moore", "user_type": "Regular", "action": 1, "module_type": 5, "logs_description": "Performance optimization completed", "deleted": 0, "creation_date": "2023-11-18 08:00:37" },
        { "ID": 11, "employee_id": 1011, "name": "Daniel Garcia", "user_type": "Regular", "action": 1, "module_type": 3, "logs_description": "Debugged backend issues", "deleted": 0, "creation_date": "2023-11-20 10:10:15" },
        { "ID": 12, "employee_id": 1012, "name": "Chloe Rodriguez", "user_type": "Admin", "action": 3, "module_type": 2, "logs_description": "Project status meeting", "deleted": 0, "creation_date": "2023-11-22 12:25:49" },
        { "ID": 13, "employee_id": 1013, "name": "David Hernandez", "user_type": "Regular", "action": 2, "module_type": 4, "logs_description": "Database backup initiated", "deleted": 0, "creation_date": "2024-01-09 14:40:28" },
        { "ID": 14, "employee_id": 1014, "name": "Ella Perez", "user_type": "Admin", "action": 1, "module_type": 1, "logs_description": "System maintenance", "deleted": 0, "creation_date": "2023-11-26 16:55:01" },
        { "ID": 15, "employee_id": 1015, "name": "Matthew Ramirez", "user_type": "Regular", "action": 1, "module_type": 5, "logs_description": "Data migration completed", "deleted": 0, "creation_date": "2023-11-28 09:30:20" },
        { "ID": 16, "employee_id": 1016, "name": "Lily Torres", "user_type": "Regular", "action": 2, "module_type": 3, "logs_description": "Security protocol updated", "deleted": 0, "creation_date": "2023-11-30 11:45:42" },
        { "ID": 17, "employee_id": 1017, "name": "William Wright", "user_type": "Admin", "action": 3, "module_type": 2, "logs_description": "Implemented new feature", "deleted": 0, "creation_date": "2023-12-02 13:50:18" },
        { "ID": 18, "employee_id": 1018, "name": "Grace Lopez", "user_type": "Regular", "action": 2, "module_type": 4, "logs_description": "Configuration changes applied", "deleted": 0, "creation_date": "2023-12-04 15:20:57" },
        { "ID": 19, "employee_id": 1019, "name": "Lucas King", "user_type": "Admin", "action": 1, "module_type": 1, "logs_description": "Conducted system audit", "deleted": 0, "creation_date": "2024-01-09 17:40:34" },
        { "ID": 20, "employee_id": 1020, "name": "Mia Adams", "user_type": "Regular", "action": 1, "module_type": 5, "logs_description": "Application deployment completed", "deleted": 0, "creation_date": "2024-01-09 09:15:05" },
    ];

    return (
        <div>
            <div className="max-w-[20rem] flex">
                <Datepicker
                    inputClassName="relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 bg-default rounded-lg tracking-wide font-light text-sm placeholder-gray-400 focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500 focus:ring-blue-500/20"
                    value={date}
                    onChange={handleDateChange}
                    primaryColor={"blue"}
                    showShortcuts={true}

                />
            </div>
            <span className="text-[1.3rem]">
                {isToday(new Date(date.startDate)) && isToday(new Date(date.endDate)) ? "Today" :
                    isYesterday(new Date(date.startDate)) && isYesterday(new Date(date.endDate)) ? "Yesterday" :
                    isToday(new Date(date.endDate)) && subDays(new Date(date.endDate), 30) >= new Date(date.startDate) ? "Last 30 Days" :
                        isToday(new Date(date.endDate)) && subDays(new Date(date.endDate), 7) >= new Date(date.startDate) ? "Last Week" :
                        isSameMonth(new Date(date.startDate), new Date(date.endDate)) ? `This Month (${format(new Date(date.startDate), "MMMM")})` :
                        islast
                                (<span>{`${format(new Date(date.startDate), "MM/dd/yyyy")} to ${format(new Date(date.endDate), "MM/dd/yyyy")}`}</span>)
                }</span>
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
                <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400">February 2022</time>
                    <h3 className="text-lg font-semibold text-gray-900">Application UI code in Tailwind CSS</h3>
                    <p className="mb-4 text-base font-normal text-gray-500">Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.</p>
                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700">Learn more <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg></a>
                </li>
                <li className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400">March 2022</time>
                    <h3 className="text-lg font-semibold text-gray-900">Marketing UI design in Figma</h3>
                    <p className="text-base font-normal text-gray-500">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</p>
                </li>
                <li className="ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400">April 2022</time>
                    <h3 className="text-lg font-semibold text-gray-900">E-Commerce UI code in Tailwind CSS</h3>
                    <p className="text-base font-normal text-gray-500">Get started with dozens of web components and interactive elements built on top of Tailwind CSS.</p>
                </li>
            </ol>


            {/* <table className="table-auto w-full">
                <span className="text-[1.5rem]">Today</span>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Module Type</th>
                        <th>Action</th>
                        <th>Logs Description</th>
                        <th>Creation Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.filter((date) => isToday(new Date(date.creation_date)))
                        .map((item) => (
                            <tr key={item.ID} >
                                <td>{item.employee_id}</td>
                                <td className="flex flex-col">
                                    <span>
                                        {item.name}
                                    </span>
                                    <span>
                                        {item.user_type}
                                    </span>
                                </td>
                                <td className="text-center">{item.module_type}</td>
                                <td className="text-center">
                                    <Badge
                                        type={item.action === 1 ? "success" : item.action === 2 ? "warning" : "failure"}
                                        message={item.action === 1 ? "Insert" : item.action === 2 ? "Update" : "Delete"}
                                    />
                                </td>
                                <td>{item.logs_description}</td>
                                <td>{item.creation_date}</td>
                            </tr>
                        ))}
                </tbody>
            </table> */}
        </div >
    )
}