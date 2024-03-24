import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoChevronBack } from "react-icons/io5";
import * as xlsx from "xlsx";
import BatchEmployeeInstructions from "./BatchEmployeeInstructions";
import { useFunction } from "../context/FunctionContext";
import { useAuth } from "../context/authContext";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function BulkEmployeeAdd() {
  const [file, setFile] = useState([]);
  const [fileHeaders, setFileHeaders] = useState([]);

  const [fileName, setFileName] = useState([]);
  const { capitalizeSentence } = useFunction();
  const { usertypeList, uploadUsers } = useAuth();
  const navigate = useNavigate();

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (e.target.files) {
      setFileName(e.target.files[0]["name"]);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const employees = xlsx.utils.sheet_to_json(worksheet);

        setFile(
          employees.map((item) => {
            const newItem = {};
            for (let key in item) {
              try {
                newItem[key.toLowerCase()] = capitalizeSentence(item[key]);
              } catch (e) {
                newItem[key.toLowerCase()] = item[key];
              }
            }

            return newItem;
          })
        );
        setFileHeaders(
          Object.keys(employees[0]).map((key) => {
            return key.toLowerCase();
          })
        );
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const DropdownOptions = ({ header, employee }) => {
    switch (header) {
      case "job level":
        return (
          <>
            {usertypeList.map((type) => {
              return (
                <option
                  value={type.job_level_name}
                  selected={
                    employee["job level"].toLowerCase() === type.job_level_name
                  }
                >
                  {capitalizeSentence(type.job_level_name)}
                </option>
              );
            })}
          </>
        );

      case "first approver":
      case "second approver":
      case "third approver":
        const heads = file.filter(
          (emp) => emp["job level"].toLowerCase() !== "rank and file"
        );
        const approver = heads.find(
          (emp) => getFullName(emp) == employee[header]
        );
        let approverName = "";
        if (approver) {
          approverName = getFullName(approver);
        }

        return (
          <>
            <option value="" disabled selected={!approverName}>
              ---
            </option>
            {heads.map((head) => {
              return (
                <>
                  <option
                    value={getFullName(head)}
                    selected={getFullName(head) === approverName}
                  >
                    {getFullName(head)}
                  </option>
                </>
              );
            })}
          </>
        );
      case "status":
        return (
          <>
            {["active", "resigned", "terminated"].map((stat) => {
              return (
                <option
                  value={stat}
                  selected={employee["status"].toLowerCase() === stat}
                >
                  {capitalizeSentence(stat)}
                </option>
              );
            })}
          </>
        );
    }
  };

  const getFullName = (user) => {
    const middle_name = user["middle name"];
    if (!middle_name) {
      return user["last name"] + ", " + user["first name"];
    } else {
      return (
        user["last name"] +
        ", " +
        user["first name"] +
        " " +
        user["middle name"].substring(0, 1) +
        "."
      );
    }
  };

  const handleInputChange = (e, emp, header) => {
    const tempEmployees = [...file];
    const currentEmployee = tempEmployees.find((employee) => employee === emp);
    currentEmployee[header] = e.target.value;
    setFile(tempEmployees);
  };
  const handleDropdownChange = (e, emp, header) => {
    const tempEmployees = [...file];
    const currentEmployee = tempEmployees.find((employee) => employee === emp);
    currentEmployee[header] = e.target.value;
    setFile(tempEmployees);
  };
  const handleDateChange = (e, emp, header) => {
    const tempEmployees = [...file];
    const currentEmployee = tempEmployees.find((employee) => employee === emp);
    currentEmployee[header] = format(new Date(e.target.value), "MM/dd/yyyy");
    setFile(tempEmployees);
  };
  const handleImportUsers = async () => {
    const employees = [...file];
    const registeredEmployees = [];
    const modifiedHeaders = fileHeaders.map((header) => {
      return header.split(" ").join("_");
    });
    employees.forEach((e, i) => {
      const registeredEmployee = {}; // Create an empty object for each user

      fileHeaders.forEach((header, idx) => {
        switch (header) {
          case "first approver":
            try {
              registeredEmployee["primary_evaluator"] =
                e[header] !== undefined
                  ? employees.find((emp) => getFullName(emp) === e[header])[
                      "employee id"
                    ]
                  : e[header];
            } catch (error) {
              console.log(e)
            }
            break;
          case "second approver":
            try {
              registeredEmployee["secondary_evaluator"] =
                e[header] !== undefined
                  ? employees.find((emp) => getFullName(emp) === e[header])[
                      "employee id"
                    ]
                  : e[header];
            } catch (error) {
              console.log(e)
            }
            break;
          case "third approver":
            try {
              registeredEmployee["tertiary_evaluator"] =
                e[header] !== undefined
                  ? employees.find((emp) => getFullName(emp) === e[header])[
                      "employee id"
                    ]
                  : e[header];
            } catch (error) {
              console.log(e)
            }
            break;
          case "business unit":
            registeredEmployee["company"] = e[header];
            break;
          default:
            registeredEmployee[modifiedHeaders[idx]] = e[header];
            break;
        }
      });

      registeredEmployees.push(registeredEmployee);
    });

    const data = JSON.stringify(registeredEmployees);
    const response = await uploadUsers(data);
    if (response === 1) {
      if (alert("You have successfully imported users.")) {
        navigate("/employees");
      }
    }else{
      console.log("error");
    }
  };
  return (
    <>
      <div className="flex flex-col gap-2 pt-1">
        <a
          href="/employees"
          className="flex flex-row items-center pr-2 bg-un-blue w-fit text-white rounded-md hover:bg-un-blue-light"
        >
          <IoChevronBack />
          <span>Back</span>
        </a>
        <div className=" text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2">
          <BatchEmployeeInstructions />

          <form encType="multipart/form-data" className="flex flex-col gap-2">
            <label
              htmlFor="batch"
              className="m-auto cursor-pointer w-fit text-white p-2 flex flex-row items-center gap-2 bg-un-blue-light hover:bg-un-blue rounded-full text-[.9rem]"
            >
              <AiOutlinePlus />
              Import Employees
            </label>
            <input
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              type="file"
              id="batch"
              className="hidden"
              onChange={handleFileSubmit}
            />
            <p>{fileName}</p>
            <div className="overflow-auto max-h-[60vh]">
              {file && (
                <table className="bg-white">
                  <thead>
                    <tr className="bg-un-blue-light sticky top-0">
                      {fileHeaders.map((header, h) => {
                        return (
                          <th
                            key={h}
                            className="whitespace-nowrap px-2 text-white"
                          >
                            {capitalizeSentence(header)}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {file.map((emp, h) => {
                      return (
                        <tr
                          key={h}
                          className="whitespace-nowrap px-2 hover:bg-default"
                        >
                          {fileHeaders.map((header, h) => {
                            return (
                              <td key={h} className="whitespace-nowrap px-2">
                                {header !== "no." ? (
                                  [
                                    "job level",
                                    "first approver",
                                    "second approver",
                                    "third approver",
                                    "status",
                                  ].includes(header) ? (
                                    <select
                                      className="bg-transparent focus:bg-white"
                                      onChange={(e) =>
                                        handleDropdownChange(e, emp, header)
                                      }
                                    >
                                      <DropdownOptions
                                        header={header}
                                        employee={emp}
                                      />
                                    </select>
                                  ) : header === "hire date" ? (
                                    <input
                                      type="date"
                                      className="bg-transparent focus:bg-white"
                                      value={format(
                                        new Date(emp[header]),
                                        "yyyy-MM-dd"
                                      )}
                                      onChange={(e) =>
                                        handleDateChange(e, emp, header)
                                      }
                                    />
                                  ) : (
                                    <input
                                      className="bg-transparent focus:bg-white"
                                      type="text"
                                      value={emp[header]}
                                      onChange={(e) =>
                                        handleInputChange(e, emp, header)
                                      }
                                    />
                                  )
                                ) : (
                                  emp[header]
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
            {file && (
              <button
                type="button"
                onClick={() => handleImportUsers()}
                className="bg-un-blue-light text-white w-fit p-1 px-2 ml-auto rounded-md"
              >
                Register Employees
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
