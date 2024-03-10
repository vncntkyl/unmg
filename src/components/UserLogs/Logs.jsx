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
import { Badge, Table } from "flowbite-react";
import { GrFormSearch } from "react-icons/gr";
import LogsAction from "./LogsAction";
import { Pagination } from "flowbite-react";
import axios from "axios";
import { developmentAPIs as url } from "../../context/apiList";

export default function Logs() {
  const [loading, toggleLoading] = useState(true);
  const [actionVisibility, setActionVisibility] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState([]);
  const onPageChange = (page) => setCurrentPage(page);
  const filteredLogs = logs.filter(log => {
    return search === "" || log.employee_name.toLowerCase().includes(search.toLowerCase());
  });
  const totalPages = Math.ceil(filteredLogs.length / 10);
  //Visibility of action button
  const toggleActionVisibility = () => {
    setActionVisibility((prev) => !prev);
  };
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  const retrieveLogs = async () => {
    try {
      const response = await axios.get(url.retrieveLogs, {
        params: {
          logs: true,
          startDate:
            date.length > 0 || date.startDate == "" || date.startDate == null
              ? ""
              : date.startDate,
          endDate:
            date.length > 0 || date.endDate == "" || date.endDate == null
              ? ""
              : date.endDate,
        },
      });
      setLogs(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      toggleLoading(false);
    }
  };
  useEffect(() => {
    retrieveLogs();
  }, [date]);

  const handleDateChange = (newValue) => {
    setDate(newValue);
    retrieveLogs();
  };
  return loading ? (
    "Loading..."
  ) : (
    <div>
      <div className="flex justify-between items-center mx-2">
        <div className="w-full max-w-[20rem] flex mb-4">
          <Datepicker
            inputClassName="relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 rounded-lg tracking-wide font-light text-sm focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500 focus:ring-blue-500/20 cursor-pointer"
            value={date}
            onChange={handleDateChange}
            primaryColor={"blue"}
            showShortcuts={true}
            readOnly={true}
          />
        </div>
        <div className="w-full max-w-[20rem] flex flex-row items-center gap-2 p-1 bg-white rounded-md border ">
          <GrFormSearch className="text-[1.3rem]" />
          <input
            type="text"
            placeholder="Search employee..."
            className="w-full outline-none bg-transparent placeholder:text-[.9rem] placeholder:md:text-[1rem] border-none"
            onChange={(e) => setSearch(e.target.value)}
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
      <div>
        {logs && logs.length > 0 ? (
          <>
          <div className="h-[37rem] overflow-y-auto m-4">
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
                <Table.HeadCell className="whitespace-nowrap">
                  Date & Time
                </Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Company</Table.HeadCell>
                <Table.HeadCell>Position</Table.HeadCell>
                <Table.HeadCell>Event</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {logs.filter((log) => {
                  if (search === "") {
                    return true;
                  } else {
                    if (log.employee_name.toLowerCase().includes(search)) {
                      return true;
                    }
                    else {
                      return log.employee_name.toLowerCase().includes(search);
                    }
                  }
                }).map((log, index) => {
                  return (
                    <Table.Row className="text-[0.9rem]" key={index}>
                      <Table.Cell className="max-w-[4rem] p-2">
                        <div className="flex justify-center">{index + 1}</div>
                      </Table.Cell>
                      <Table.Cell className="w-full p-2 flex flex-col items-center font-semibold text-black">
                        <span>
                          {format(new Date(log.creation_date), "MM/dd/yyyy")}
                        </span>
                        <span>
                          {format(new Date(log.creation_date), "hh:mm a")}
                        </span>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap p-2">
                        {log.employee_name}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap p-2">
                        {log.company_name ? log.company_name : "-"}
                      </Table.Cell>
                      <Table.Cell className="p-2">
                        <Badge
                          className="whitespace-nowrap flex items-center justify-center"
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
                      <Table.Cell className="whitespace-nowrap p-2">
                        <span className="font-semibold text-black">{log.employee_name}</span> {log.new_value}
                      </Table.Cell>
                      <Table.Cell className="p-2">
                        <LogsAction
                          toggleActionVisibility={toggleActionVisibility}
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
            <div className="flex overflow-x-auto sm:justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                showIcons
              />
            </div>
          </>
        ) : (
          <div className="h-[40.2rem] w-full bg-default flex items-center justify-center text-[1.5rem] font-bold text-dark-gray rounded-md my-2">
            No logs found
          </div>
        )}
      </div>
    </div>
  );
}
