import React, { useState, useEffect } from "react";
import format from "date-fns/format";
import { useAuth } from "../../context/authContext";
import { Table, Pagination } from "flowbite-react";
import LogsAction from "./LogsAction";
export default function ApprovalHistory() {
  const rawData = [
    {
      id: 1,
      name: "John Doe",
      company: "ABC Corp",
      department: "Engineering",
      approvalDate: "2022-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      company: "XYZ Ltd",
      department: "Marketing",
      approvalDate: "2022-02-20",
    },
    {
      id: 3,
      name: "Mike Johnson",
      company: "123 Inc",
      department: "Finance",
      approvalDate: "2022-03-10",
    },
    {
      id: 4,
      name: "Sarah Williams",
      company: "Tech Solutions",
      department: "IT",
      approvalDate: "2022-04-05",
    },
    {
      id: 5,
      name: "Chris Brown",
      company: "Data Innovations",
      department: "Research",
      approvalDate: "2022-05-12",
    },
    {
      id: 6,
      name: "Emily Davis",
      company: "Global Services",
      department: "Customer Support",
      approvalDate: "2022-06-08",
    },
    {
      id: 7,
      name: "Alex Turner",
      company: "Future Trends",
      department: "Design",
      approvalDate: "2022-07-22",
    },
    {
      id: 8,
      name: "Megan Taylor",
      company: "Innovate Solutions",
      department: "Product Management",
      approvalDate: "2022-08-18",
    },
    {
      id: 9,
      name: "Ryan Miller",
      company: "Tech Dynamics",
      department: "Quality Assurance",
      approvalDate: "2022-09-30",
    },
    {
      id: 10,
      name: "Ella Anderson",
      company: "Green Energy",
      department: "Environmental Affairs",
      approvalDate: "2022-10-14",
    },
    {
      id: 11,
      name: "Tom Wilson",
      company: "Tech Innovations",
      department: "Research and Development",
      approvalDate: "2022-11-08",
    },
    {
      id: 12,
      name: "Olivia Garcia",
      company: "Digital Solutions",
      department: "Marketing",
      approvalDate: "2022-12-15",
    },
    {
      id: 13,
      name: "Daniel Clark",
      company: "Inventive Labs",
      department: "Engineering",
      approvalDate: "2023-01-20",
    },
    {
      id: 14,
      name: "Sophia Turner",
      company: "Global Networks",
      department: "IT",
      approvalDate: "2023-02-12",
    },
    {
      id: 15,
      name: "Logan Adams",
      company: "Future Tech",
      department: "Product Management",
      approvalDate: "2023-03-05",
    },
    {
      id: 16,
      name: "Ava Murphy",
      company: "Bright Ideas",
      department: "Customer Support",
      approvalDate: "2023-04-18",
    },
    {
      id: 17,
      name: "Ethan White",
      company: "Tech Solutions",
      department: "Quality Assurance",
      approvalDate: "2023-05-22",
    },
    {
      id: 18,
      name: "Isabella Hall",
      company: "Dynamic Designs",
      department: "Design",
      approvalDate: "2023-06-10",
    },
    {
      id: 19,
      name: "Jackson Scott",
      company: "Innovate Systems",
      department: "Finance",
      approvalDate: "2023-07-14",
    },
    {
      id: 20,
      name: "Emma Carter",
      company: "Eco Innovations",
      department: "Environmental Affairs",
      approvalDate: "2023-08-30",
    },
  ];
  const [loading, toggleLoading] = useState(true);
  const [workYear, setWorkYear] = useState([]);
  const [department, setDepartment] = useState([]);
  const [company, setCompany] = useState(-1);
  console.log(company);
  const { kpiDurations, companies, departments } = useAuth();
  console.log(departments)  

  return (
    <>
      <div className="text-[0.8rem]">
        <div className="flex flex-row pb-2 px-2 gap-2 items-center">
          <label htmlFor="workyear" className="font-semibold">
            Select Work Year:
          </label>
          <select
            id="workyear"
            className="bg-default rounded-md p-1 px-2 text-[0.9rem]"
            onChange={(e) => {
              setKpiDuration(parseInt(e.target.value));
            }}
          >
            <option value="-1" selected={kpiDurations === -1}>
              All
            </option>
            {kpiDurations.length > 0 &&
              kpiDurations.map((year) => {
                return (
                  <option value={year.kpi_year_duration_id}>
                    {format(new Date(year.from_date), "MMM d, yyyy") +
                      " - " +
                      format(new Date(year.to_date), "MMM d, yyyy")}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="flex items-center">
          <div className="flex flex-row pb-2 px-2 gap-2 items-center">
            <label htmlFor="company" className="font-semibold">
              Company:
            </label>
            <select
              id="company"
              className="bg-default rounded-md p-1 px-2 text-[0.9rem]"
              onChange={(e) => {
                setCompany(parseInt(e.target.value));
              }}
            >
              <option value="-1">All</option>
              {companies.length > 0 &&
                companies.map((comp) => {
                  return (
                    <option value={comp.company_id}>{comp.company_name}</option>
                  );
                })}
            </select>
          </div>
          {console.log(company)}
          {company &&
            company >
              -1 ? (
                <>
                  <div className="flex flex-row pb-2 px-2 gap-2 items-center">
                    <label htmlFor="department" className="font-semibold">
                      Department:
                    </label>
                    <select
                      id="department"
                      className="bg-default rounded-md p-1 px-2 text-[0.9rem]"
                      defaultValue={department}
                      // onChange={(e) => {
                      //   setDepartment(parseInt(e.target.value));
                      // }}
                    >
                      <option
                        value="-1"
                        className="text-center"
                        disabled
                      >
                        --Select Department--
                      </option>
                      {departments.length > 0 &&
                        departments.filter((dep) => dep.company_id === company)
                        .map((dept) => {
                          return (
                            <option key={dept.department_id} value={dept.department_id}>
                              {dept.department_name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </>
              ) : ""}
        </div>
      </div>
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
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Approval Date</Table.HeadCell>
          <Table.HeadCell>Approved By</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        {/* <Table.Body>
              {rawData.map((log, index) => {
                return (
                  <Table.Row className="text-[0.9rem]">
                    <Table.Cell>
                      {index+1}
                    </Table.Cell>
                    <Table.Cell className="w-full flex justify-center">
                      {format(new Date(log.approvalDate), "MM/dd/yyyy")}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {log.name}
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>{log.logs_description}</Table.Cell>
                    <Table.Cell>
                      <LogsAction
                        toggleActionVisibility={toggleActionVisibility}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body> */}
      </Table>
    </>
  );
}
