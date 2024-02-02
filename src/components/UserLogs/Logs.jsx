import React, { useEffect, useState } from "react";
import {
  endOfMonth,
  format,
  isSameDay,
  isToday,
  isYesterday,
  startOfMonth,
  subDays,
} from "date-fns";
import Datepicker from "react-tailwindcss-datepicker";
import { Accordion, Timeline, Badge, Table } from "flowbite-react";
import { IoIosTime } from "react-icons/io";
import { GrFormSearch } from "react-icons/gr";
import LogsAction from "./LogsAction";
import { Pagination } from "flowbite-react";

export default function Logs() {
  const rawData = [
    {
      ID: 1,
      employee_id: 1001,
      name: "John Doe",
      user_type: 2,
      action: 1,
      module_type: 3,
      logs_description: "Updated user profile information",
      deleted: 0,
      creation_date: "2024-01-09 08:15:00",
    },
    {
      ID: 2,
      employee_id: 1005,
      name: "Alice Johnson",
      user_type: 4,
      action: 2,
      module_type: 2,
      logs_description: "Created new project",
      deleted: 0,
      creation_date: "2024-01-03 10:30:22",
    },
    {
      ID: 3,
      employee_id: 1002,
      name: "Bob Smith",
      user_type: 4,
      action: 3,
      module_type: 4,
      logs_description: "Error encountered in payment processing",
      deleted: 0,
      creation_date: "2024-01-05 15:45:11",
    },
    {
      ID: 4,
      employee_id: 1004,
      name: "Emma Brown",
      user_type: 4,
      action: 1,
      module_type: 1,
      logs_description: "Logged in to the system",
      deleted: 0,
      creation_date: "2024-01-07 12:00:30",
    },
    {
      ID: 5,
      employee_id: 1003,
      name: "Michael Wilson",
      user_type: 4,
      action: 2,
      module_type: 5,
      logs_description: "Deleted obsolete records",
      deleted: 0,
      creation_date: "2024-01-08 14:20:05",
    },
    {
      ID: 6,
      employee_id: 1006,
      name: "Sophia Martinez",
      user_type: 6,
      action: 2,
      module_type: 3,
      logs_description: "Modified access permissions",
      deleted: 0,
      creation_date: "2024-01-10 09:05:12",
    },
    {
      ID: 7,
      employee_id: 1007,
      name: "William Taylor",
      user_type: 4,
      action: 3,
      module_type: 2,
      logs_description: "Reviewed quarterly reports",
      deleted: 0,
      creation_date: "2024-01-09 11:30:44",
    },
    {
      ID: 8,
      employee_id: 1008,
      name: "Olivia Anderson",
      user_type: 5,
      action: 1,
      module_type: 4,
      logs_description: "System update installed",
      deleted: 0,
      creation_date: "2024-01-09 13:40:19",
    },
    {
      ID: 9,
      employee_id: 1009,
      name: "James Clark",
      user_type: 6,
      action: 2,
      module_type: 1,
      logs_description: "Conducted training session",
      deleted: 0,
      creation_date: "2024-01-07 16:55:58",
    },
    {
      ID: 10,
      employee_id: 1010,
      name: "Emily Moore",
      user_type: 5,
      action: 1,
      module_type: 5,
      logs_description: "Performance optimization completed",
      deleted: 0,
      creation_date: "2024-01-03 08:00:37",
    },
    {
      ID: 11,
      employee_id: 1011,
      name: "Daniel Garcia",
      user_type: 5,
      action: 1,
      module_type: 3,
      logs_description: "Debugged backend issues",
      deleted: 0,
      creation_date: "2024-01-02 10:10:15",
    },
    {
      ID: 12,
      employee_id: 1012,
      name: "Chloe Rodriguez",
      user_type: 6,
      action: 3,
      module_type: 2,
      logs_description: "Project status meeting",
      deleted: 0,
      creation_date: "2024-01-02 12:25:49",
    },
    {
      ID: 13,
      employee_id: 1013,
      name: "David Hernandez",
      user_type: 5,
      action: 2,
      module_type: 4,
      logs_description: "Database backup initiated",
      deleted: 0,
      creation_date: "2024-01-09 14:40:28",
    },
    {
      ID: 14,
      employee_id: 1014,
      name: "Ella Perez",
      user_type: 6,
      action: 1,
      module_type: 1,
      logs_description: "System maintenance",
      deleted: 0,
      creation_date: "2024-01-06 16:55:01",
    },
    {
      ID: 15,
      employee_id: 1015,
      name: "Matthew Ramirez",
      user_type: 5,
      action: 1,
      module_type: 5,
      logs_description: "rawData migration completed",
      deleted: 0,
      creation_date: "2024-01-08 09:30:20",
    },
    {
      ID: 16,
      employee_id: 1016,
      name: "Lily Torres",
      user_type: 5,
      action: 2,
      module_type: 3,
      logs_description: "Security protocol updated",
      deleted: 0,
      creation_date: "2024-01-04 11:45:42",
    },
    {
      ID: 17,
      employee_id: 1017,
      name: "William Wright",
      user_type: 6,
      action: 3,
      module_type: 2,
      logs_description: "Implemented new feature",
      deleted: 0,
      creation_date: "2024-01-02 13:50:18",
    },
    {
      ID: 18,
      employee_id: 1018,
      name: "Grace Lopez",
      user_type: 5,
      action: 2,
      module_type: 4,
      logs_description: "Configuration changes applied",
      deleted: 0,
      creation_date: "2024-01-04 15:20:57",
    },
    {
      ID: 19,
      employee_id: 1019,
      name: "Lucas King",
      user_type: 6,
      action: 1,
      module_type: 1,
      logs_description: "Conducted system audit",
      deleted: 0,
      creation_date: "2024-01-09 17:40:34",
    },
    {
      ID: 20,
      employee_id: 1020,
      name: "Mia Adams",
      user_type: 5,
      action: 1,
      module_type: 5,
      logs_description: "Application deployment completed",
      deleted: 0,
      creation_date: "2024-01-09 09:15:05",
    },
    {
      ID: 21,
      employee_id: 1021,
      name: "Jane Smith",
      user_type: 6,
      action: 2,
      module_type: 4,
      logs_description: "Created new task",
      deleted: 0,
      creation_date: "2024-01-01 10:30:22",
    },
    {
      ID: 22,
      employee_id: 1022,
      name: "Bob Johnson",
      user_type: 2,
      action: 1,
      module_type: 2,
      logs_description: "Logged in to admin panel",
      deleted: 0,
      creation_date: "2024-01-02 15:45:11",
    },
    {
      ID: 23,
      employee_id: 1023,
      name: "Emily Davis",
      user_type: 6,
      action: 3,
      module_type: 1,
      logs_description: "Error fixing in payment processing",
      deleted: 0,
      creation_date: "2024-01-03 12:00:30",
    },
    {
      ID: 24,
      employee_id: 1024,
      name: "Mike Wilson",
      user_type: 6,
      action: 2,
      module_type: 5,
      logs_description: "Deleted obsolete records",
      deleted: 0,
      creation_date: "2024-01-04 14:20:05",
    },
    {
      ID: 25,
      employee_id: 1025,
      name: "Sophia Martinez",
      user_type: 6,
      action: 1,
      module_type: 3,
      logs_description: "Modified access permissions",
      deleted: 0,
      creation_date: "2024-01-05 09:05:12",
    },
    {
      ID: 26,
      employee_id: 1026,
      name: "William Taylor",
      user_type: 6,
      action: 3,
      module_type: 2,
      logs_description: "Reviewed quarterly reports",
      deleted: 0,
      creation_date: "2024-01-06 11:30:44",
    },
    {
      ID: 27,
      employee_id: 1027,
      name: "Olivia Anderson",
      user_type: 6,
      action: 2,
      module_type: 4,
      logs_description: "System update installed",
      deleted: 0,
      creation_date: "2024-01-07 13:40:19",
    },
    {
      ID: 28,
      employee_id: 1028,
      name: "James Clark",
      user_type: 6,
      action: 1,
      module_type: 1,
      logs_description: "Conducted training session",
      deleted: 0,
      creation_date: "2024-01-08 16:55:58",
    },
    {
      ID: 29,
      employee_id: 1029,
      name: "Emma Brown",
      user_type: 6,
      action: 2,
      module_type: 5,
      logs_description: "Performance optimization completed",
      deleted: 0,
      creation_date: "2024-01-09 08:00:37",
    },
    {
      ID: 30,
      employee_id: 1030,
      name: "Daniel Garcia",
      user_type: 6,
      action: 1,
      module_type: 3,
      logs_description: "Debugged backend issues",
      deleted: 0,
      creation_date: "2024-01-09 10:10:15",
    },
  ];
  const [dates, setDates] = useState([]);
  const [actionVisibility, setActionVisibility] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);

  const toggleActionVisibility = () => {
    setActionVisibility((prev) => !prev);
  };
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  useEffect(() => {
    const uniqueDates = [
      ...new Set(
        rawData.map((rawData) =>
          format(new Date(rawData.creation_date), "yyyy-MM-dd")
        )
      ),
    ];
    setDates(uniqueDates);
  }, []);
  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  return (
    <div>
      <div className="flex justify-between items-center mx-2">
        <div className="w-full max-w-[20rem] flex mb-4">
          <Datepicker
            inputClassName="relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 rounded-lg tracking-wide font-light text-sm focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500 focus:ring-blue-500/20"
            value={date}
            onChange={handleDateChange}
            primaryColor={"blue"}
            showShortcuts={true}
          />
        </div>
        <div className="w-full max-w-[20rem] flex flex-row items-center gap-2 p-1 bg-white rounded-md border ">
          <GrFormSearch className="text-[1.3rem]" />
          <input
            type="text"
            placeholder="Search employee..."
            className="w-full outline-none bg-transparent placeholder:text-[.9rem] placeholder:md:text-[1rem] border-none"
          />
        </div>
      </div>
      <span className="text-[1.1rem] ml-4">
        {date.startDate && date.endDate ? (
          <>
            {isToday(new Date(date.startDate)) &&
            isToday(new Date(date.endDate)) ? (
              `Today - ${format(new Date(date.startDate), "MM/dd/yyyy")}`
            ) : isYesterday(new Date(date.startDate)) &&
              isYesterday(new Date(date.endDate)) ? (
              `Yesterday - ${format(new Date(date.startDate), "MM/dd/yyyy")}`
            ) : isToday(new Date(date.endDate)) &&
              subDays(new Date(date.endDate), 30) >=
                new Date(date.startDate) ? (
              "Last 30 Days"
            ) : isToday(new Date(date.endDate)) &&
              subDays(new Date(date.endDate), 7) >= new Date(date.startDate) ? (
              "Last Week"
            ) : isSameDay(new Date(date.startDate), startOfMonth(new Date())) &&
              isSameDay(new Date(date.endDate), endOfMonth(new Date())) ? (
              `This Month (${format(new Date(date.startDate), "MMMM")})`
            ) : isSameDay(new Date(date.startDate), new Date(date.endDate)) ? (
              `Selected Date - ${format(
                new Date(date.startDate),
                "MM/dd/yyyy"
              )}`
            ) : (
              <span>{`${format(
                new Date(date.startDate),
                "MM/dd/yyyy"
              )} to ${format(new Date(date.endDate), "MM/dd/yyyy")}`}</span>
            )}
          </>
        ) : (
          "All"
        )}
      </span>
      {dates && dates.length > 0 ? (
        <div className="h-[52vh] overflow-y-auto m-4">
          <Table
            theme={{
              head: {
                base: "text-center text-white",
                cell: { base: "bg-un-blue-light" },
              },
            }}
            hoverable
            className="overflow-hidden rounded-md border border-gray-300"
          >
            <Table.Head>
              <Table.HeadCell>No</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Company</Table.HeadCell>
              <Table.HeadCell>Position</Table.HeadCell>
              <Table.HeadCell>Event</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {rawData.map((log, index) => {
                return (
                  <Table.Row className="text-[0.9rem]">
                    <Table.Cell>
                      {index+1}
                    </Table.Cell>
                    <Table.Cell className="w-full flex justify-center">
                      {format(new Date(log.creation_date), "MM/dd/yyyy")}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {log.name}
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell className="w-full flex justify-center whitespace-nowrap">
                      <Badge
                        className="w-fit"
                        color={
                          parseInt(log.user_type) <= 2
                            ? "success"
                            : parseInt(log.user_type) === 3
                            ? "warning"
                            : parseInt(log.user_type) === 4
                            ? "indigo"
                            : parseInt(log.user_type) === 5
                            ? "info"
                            : parseInt(log.user_type) === 6
                            ? "gray"
                            : "failure"
                        }
                      >
                        {parseInt(log.user_type) <= 2
                          ? "Admin"
                          : parseInt(log.user_type) === 3
                          ? "Executive"
                          : parseInt(log.user_type) === 4
                          ? "Manager"
                          : parseInt(log.user_type) === 5
                          ? "Supervisor"
                          : parseInt(log.user_type) === 6
                          ? "Rank and File"
                          : "Loading..."}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>{log.logs_description}</Table.Cell>
                    <Table.Cell>
                      <LogsAction
                        toggleActionVisibility={toggleActionVisibility}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
          {/* <Accordion flush className="rounded-none shadow" collapseAll>
            {dates
              .sort()
              .reverse()
              .map((headerDate, index) => (
                <Accordion.Panel key={headerDate}>
                  <Accordion.Title className="focus:ring-0 focus:rounded-none first:rounded-none bg-white hover:bg-default focus:bg-default">
                    {format(new Date(headerDate), "MMMM dd, yyyy")}
                  </Accordion.Title>
                  <Accordion.Content>
                    <Timeline>
                      {rawData
                        .sort(
                          (a, b) =>
                            new Date(b.creation_date) -
                            new Date(a.creation_date)
                        )
                        .filter((contentDate) =>
                          isSameDay(
                            new Date(contentDate.creation_date),
                            new Date(headerDate)
                          )
                        )
                        .map((log) => (
                          <Timeline.Item key={log.ID}>
                            <Timeline.Point
                              icon={IoIosTime}
                              theme={{
                                marker: {
                                  icon: {
                                    base: "h-5 w-5 text-mid-gray",
                                    wrapper:
                                      "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white",
                                  },
                                },
                              }}
                            />
                            <Timeline.Content>
                              <Timeline.Time
                                theme={{
                                  base: "mb-1 text-sm font-normal leading-none text-un-blue-light",
                                }}
                              >
                                {format(new Date(log.creation_date), "hh:mm a")}
                              </Timeline.Time>
                              <Timeline.Title>
                                {log.name}
                                <Badge
                                  className="w-fit"
                                  color={
                                    parseInt(log.user_type) <= 2
                                      ? "success"
                                      : parseInt(log.user_type) === 3
                                      ? "warning"
                                      : parseInt(log.user_type) === 4
                                      ? "indigo"
                                      : parseInt(log.user_type) === 5
                                      ? "info"
                                      : parseInt(log.user_type) === 6
                                      ? "gray"
                                      : "failure"
                                  }
                                >
                                  {parseInt(log.user_type) <= 2
                                    ? "Admin"
                                    : parseInt(log.user_type) === 3
                                    ? "Executive"
                                    : parseInt(log.user_type) === 4
                                    ? "Manager"
                                    : parseInt(log.user_type) === 5
                                    ? "Supervisor"
                                    : parseInt(log.user_type) === 6
                                    ? "Rank and File"
                                    : "Loading..."}
                                </Badge>
                              </Timeline.Title>
                              <Timeline.Body className="ml-4">
                                {log.logs_description}
                              </Timeline.Body>
                            </Timeline.Content>
                          </Timeline.Item>
                        ))}
                    </Timeline>
                  </Accordion.Content>
                </Accordion.Panel>
              ))}
          </Accordion> */}
        </div>
      ) : (
        "Loading..."
      )}
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={100}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  );
}
