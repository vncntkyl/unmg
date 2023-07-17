import React, { useEffect, useState, useRef } from "react";
import Badge from "../../misc/Badge";
import axios from "axios";
import TrackingAction from "./TrackingAction";

export default function EmployeeAssessmentTable(emp_id) {
  const [employeeType, setEmployeeType] = useState("regular");
  const [employeesRecords, setEmployeesRecords] = useState([]);
  const [actionVisibility, setActionVisibility] = useState(false);
  sessionStorage.setItem("assessment_quarter", 0);
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

  useEffect(() => {
    const getemployeesRecords = async () => {
      try {
        const response = await axios.get(
          "http://localhost/unmg_pms/api/retrieveTrackingEmployee.php",
          {
            params: {
              employeeType: employeeType,
              empID: emp_id,
            },
          }
        );

        // setEmployeesRecords(response.data);
        const employeeRecords = response.data.map((item) => {
          return {
            employee_id: item.employee_id,
            first_name: item.first_name,
            employee_name: item.employee_name,
            fq_achievements:
              item.fq_achievements !== "" && item.fq_achievements !== null,
            myr_achievements:
              item.myr_achievements !== "" && item.myr_achievements !== null,
            tq_achievements:
              item.tq_achievements !== "" && item.tq_achievements !== null,
            yee_achievements:
              item.yee_achievements !== "" && item.yee_achievements !== null,

            fq_results: item.fq_results > 0 && item.fq_results !== null,
            myr_results: item.myr_results > 0 && item.myr_results !== null,
            tq_results: item.tq_results > 0 && item.tq_results !== null,
            yee_results: item.yee_results > 0 && item.yee_results !== null,
            agreed_rating:
              item.agreed_rating > 0 && item.agreed_rating !== null,
          };
        });
        setEmployeesRecords(employeeRecords);
      } catch (error) {
        console.log(error.message);
      }
    };

    getemployeesRecords();
  }, [employeeType]);
  return (
    <>
      <div className="bg-default px-2 pb-4 pt-2 rounded-md">
        <div className="flex flex-row p-2 items-center gap-3">
          <span>Job Status:</span>
          <select
            className="text-black rounded-md p-1 px-2 outline-none"
            onChange={(event) => setEmployeeType(event.target.value)}
          >
            <option value="regular">Regular</option>
            <option value="probationary">Probationary</option>
          </select>
        </div>
        <div className="flex flex-row p-2 items-center gap-3">
          <span>Status:</span>
          <select className=" text-black rounded-md p-1 px-2 outline-none">
            <option value="All">All</option>
            <option value="For Verification/Validation">
              For Verification/Validation
            </option>
            <option value="Pending">Pending</option>
            <option value="To Sign">To Sign</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <table className="bg-white w-full">
          <thead>
            <tr className="bg-un-blue-light text-white pb-4">
              <td>
                <div className="flex justify-center px-2">Name</div>
              </td>
              <td>
                <div className="flex justify-center px-2">First Quarter</div>
              </td>
              <td>
                <div className="flex justify-center px-2">Mid Year</div>
              </td>
              <td>
                <div className="flex justify-center px-2">Third Quarter</div>
              </td>
              <td>
                <div className="flex justify-center px-2">Year End</div>
              </td>
              <td>
                <div className="flex justify-center px-2">Final Evaluation</div>
              </td>
              <td>
                <div className="flex justify-center px-2">Action</div>
              </td>
            </tr>
          </thead>
          <tbody>
            {employeesRecords &&
              employeesRecords.map((employee, index) => (
                <tr key={index}>
                  {index === 0 ||
                  employee.employee_id !==
                    employeesRecords[index - 1].employee_id ? (
                    <>
                      <td>
                        <div className="pl-4 pt-2">
                          {employee.employee_name}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center justify-center pt-2">
                          {!fqisColumnAllFalse ? (
                            <>
                              {employee.fq_achievements &&
                              employee.fq_results ? (
                                <Badge
                                  message={"Graded"}
                                  type="success"
                                  className={"px-1"}
                                />
                              ) : !employee.fq_achievements &&
                                employee.fq_results ? (
                                <Badge
                                  message={"Not Submitted/Graded"}
                                  type="success"
                                  className={"px-1"}
                                />
                              ) : (
                                <Badge
                                  message={"Achievements Submitted"}
                                  type="warning"
                                  className={"px-1"}
                                />
                              )}
                            </>
                          ) : (
                            <Badge
                              message={"Awaiting Submission"}
                              className={"px-1"}
                            />
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center justify-center pt-2">
                          {!myrisColumnAllFalse ? (
                            <>
                              {employee.myr_achievements &&
                              employee.myr_results ? (
                                <Badge
                                  message={"Graded"}
                                  type="success"
                                  className={"px-1"}
                                />
                              ) : !employee.myr_achievements &&
                                employee.myr_results ? (
                                <Badge
                                  message={"Not Submitted/Graded"}
                                  type="success"
                                  className={"px-1"}
                                />
                              ) : (
                                <Badge
                                  message={"Achievements Submitted"}
                                  type="warning"
                                  className={"px-1"}
                                />
                              )}
                            </>
                          ) : (
                            <Badge
                              message={"Awaiting Submission"}
                              className={"px-1"}
                            />
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center justify-center pt-2">
                          {!tqisColumnAllFalse ? (
                            <>
                              {employee.tq_achievements &&
                              employee.tq_results ? (
                                <Badge
                                  message={"Graded"}
                                  type="success"
                                  className={"px-1"}
                                />
                              ) : !employee.tq_achievements &&
                                employee.tq_results ? (
                                <Badge
                                  message={"Not Submitted/Graded"}
                                  type="success"
                                  className={"px-1"}
                                />
                              ) : (
                                <Badge
                                  message={"Achievements Submitted"}
                                  type="warning"
                                  className={"px-1"}
                                />
                              )}
                            </>
                          ) : (
                            <Badge
                              message={"Awaiting Submission"}
                              className={"px-1"}
                            />
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center justify-center pt-2">
                          {!yeeisColumnAllFalse ? (
                            <>
                              {employee.yee_achievements &&
                              employee.yee_results ? (
                                <Badge
                                  message={"Graded"}
                                  type="success"
                                  className={"px-1"}
                                />
                              ) : !employee.yee_achievements &&
                                employee.yee_results ? (
                                <Badge
                                  message={"Not Submitted/Graded"}
                                  type="success"
                                  className={"px-1"}
                                />
                              ) : (
                                <Badge
                                  message={"Achievements Submitted"}
                                  type="warning"
                                  className={"px-1"}
                                />
                              )}
                            </>
                          ) : (
                            <Badge
                              message={"Awaiting Submission"}
                              className={"px-1"}
                            />
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center justify-center pt-2">
                          {!yeeagreedisColumnAllFalse ? (
                            <>
                              {employee.yee_results &&
                              employee.agreed_rating ? (
                                <Badge
                                  message={"Graded"}
                                  type="success"
                                  className={"px-1"}
                                />
                              ) : (
                                <Badge
                                  message={"Waiting for Agreement"}
                                  type="warning"
                                  className={"px-1"}
                                />
                              )}
                            </>
                          ) : (
                            <Badge
                              message={"Not Yet Graded"}
                              className={"px-1"}
                            />
                          )}
                        </div>
                      </td>
                      <td>
                        <TrackingAction
                          toggleActionVisibility={toggleActionVisibility}
                          employee_id={employee.employee_id}
                          first_name={employee.first_name}
                          myr={employee.myr_results}
                          yee={employee.yee_results}
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
