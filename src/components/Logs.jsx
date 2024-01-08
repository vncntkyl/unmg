import React from "react";

export default function Logs() {
    data = [
        {"ID": 1, "employee_id": 1001, "user_type": "Regular", "module_type": 3, "logs_description": "Updated user profile information", "deleted": 0, "creation_date": "2023-11-02 08:15:00"},
        {"ID": 2, "employee_id": 1005, "user_type": "Admin", "module_type": 2, "logs_description": "Created new project", "deleted": 0, "creation_date": "2023-11-03 10:30:22"},
        {"ID": 3, "employee_id": 1002, "user_type": "Regular", "module_type": 4, "logs_description": "Error encountered in payment processing", "deleted": 0, "creation_date": "2023-11-05 15:45:11"},
        {"ID": 4, "employee_id": 1004, "user_type": "Admin", "module_type": 1, "logs_description": "Logged in to the system", "deleted": 0, "creation_date": "2023-11-07 12:00:30"},
        {"ID": 5, "employee_id": 1003, "user_type": "Regular", "module_type": 5, "logs_description": "Deleted obsolete records", "deleted": 0, "creation_date": "2023-11-08 14:20:05"},
        {"ID": 6, "employee_id": 1006, "user_type": "Regular", "module_type": 3, "logs_description": "Modified access permissions", "deleted": 0, "creation_date": "2023-11-10 09:05:12"},
        {"ID": 7, "employee_id": 1007, "user_type": "Admin", "module_type": 2, "logs_description": "Reviewed quarterly reports", "deleted": 0, "creation_date": "2023-11-12 11:30:44"},
        {"ID": 8, "employee_id": 1008, "user_type": "Regular", "module_type": 4, "logs_description": "System update installed", "deleted": 0, "creation_date": "2023-11-14 13:40:19"},
        {"ID": 9, "employee_id": 1009, "user_type": "Admin", "module_type": 1, "logs_description": "Conducted training session", "deleted": 0, "creation_date": "2023-11-16 16:55:58"},
        {"ID": 10, "employee_id": 1010, "user_type": "Regular", "module_type": 5, "logs_description": "Performance optimization completed", "deleted": 0, "creation_date": "2023-11-18 08:00:37"},
        {"ID": 11, "employee_id": 1011, "user_type": "Regular", "module_type": 3, "logs_description": "Debugged backend issues", "deleted": 0, "creation_date": "2023-11-20 10:10:15"},
        {"ID": 12, "employee_id": 1012, "user_type": "Admin", "module_type": 2, "logs_description": "Project status meeting", "deleted": 0, "creation_date": "2023-11-22 12:25:49"},
        {"ID": 13, "employee_id": 1013, "user_type": "Regular", "module_type": 4, "logs_description": "Database backup initiated", "deleted": 0, "creation_date": "2023-11-24 14:40:28"},
        {"ID": 14, "employee_id": 1014, "user_type": "Admin", "module_type": 1, "logs_description": "System maintenance", "deleted": 0, "creation_date": "2023-11-26 16:55:01"},
        {"ID": 15, "employee_id": 1015, "user_type": "Regular", "module_type": 5, "logs_description": "Data migration completed", "deleted": 0, "creation_date": "2023-11-28 09:30:20"},
        {"ID": 16, "employee_id": 1016, "user_type": "Regular", "module_type": 3, "logs_description": "Security protocol updated", "deleted": 0, "creation_date": "2023-11-30 11:45:42"},
        {"ID": 17, "employee_id": 1017, "user_type": "Admin", "module_type": 2, "logs_description": "Implemented new feature", "deleted": 0, "creation_date": "2023-12-02 13:50:18"},
        {"ID": 18, "employee_id": 1018, "user_type": "Regular", "module_type": 4, "logs_description": "Configuration changes applied", "deleted": 0, "creation_date": "2023-12-04 15:20:57"},
        {"ID": 19, "employee_id": 1019, "user_type": "Admin", "module_type": 1, "logs_description": "Conducted system audit", "deleted": 0, "creation_date": "2023-12-06 17:40:34"},
        {"ID": 20, "employee_id": 1020, "user_type": "Regular", "module_type": 5, "logs_description": "Application deployment completed", "deleted": 0, "creation_date": "2023-12-08 09:15:05"},
    ];
    return (
        <div>
            <h1>Logs</h1>
            {data.map((item) => {
                return (
                    <div key={item.ID}>
                        <p>{item.employee_id}</p>
                        <p>{item.user_type}</p>
                        <p>{item.module_type}</p>
                        <p>{item.logs_description}</p>
                        <p>{item.deleted}</p>
                        <p>{item.creation_date}</p>
                    </div>
                )
            })}
        </div>
    )
}