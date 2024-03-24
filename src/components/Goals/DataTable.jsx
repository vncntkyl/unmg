import React, { useEffect, useState } from "react";
import { useFunction } from "../../context/FunctionContext";
import { CiCircleMore } from "react-icons/ci";
import OutsideTrigger from "../OutsideTrigger";
import Badge from "../../misc/Badge";
import { useAuth } from "../../context/authContext";
import { Popover } from "flowbite-react";

export default function DataTable({
  user_id,
  data,
  pillars,
  statusIdx,
  statusList,
  usertype,
}) {
  const { removeSubText } = useFunction();
  const [sortedEmployees, sortEmployees] = useState([]);
  const [actionsVisibility, setActionsVisibility] = useState(
    Array(data.length).fill(false)
  );

  useEffect(() => {
    switch (statusIdx) {
      case 0:
      default:
        sortEmployees(data);
        break;
      case 1:
        sortEmployees(data.filter((user) => user.status == 1));
        break;
      case 2:
        sortEmployees(data.filter((user) => user.status == 2));
        break;
      case 3:
        sortEmployees(data.filter((user) => user.status == 3));
        break;
    }
  }, [statusIdx, data]);

  const filterEmployees = (employees) => {
    if (usertype === "all") return employees;

    return employees.filter((emp) => emp.contract_type === usertype);
  };
  return (
    <table className="w-full rounded-md bg-white">
      <thead className="bg-un-blue-light">
        <tr>
          <td align="center" className="p-2 text-white">
            Name
          </td>
          {pillars.map((pillar) => (
            <td
              key={pillar.pillar_id}
              align="center"
              className="whitespace-nowrap p-2 text-white"
            >
              {removeSubText(pillar.pillar_name)}
            </td>
          ))}
          {statusIdx === 0 && (
            <td align="center" className="p-2 text-white">
              Status
            </td>
          )}
          <td align="center" className="p-2 text-white">
            Actions
          </td>
        </tr>
      </thead>
      <tbody>
        {filterEmployees(sortedEmployees).map((item, index) => {
          const raters = [1, 2, 5];

          const approved =
            parseInt(item.fp_employee) === 1 && [ parseInt(item.fp_rater_1), parseInt(item.fp_rater_2), parseInt(item.fp_rater_3),].every((rater) => raters.includes(rater));
          const status = [
            "Pending",
            "Accepted",
            "Approved",
            "Rejected",
            "Disapprove",
          ];
          return (
            <tr key={item.users_id} className="hover:bg-default">
              <td className="whitespace-nowrap p-2">{item.full_name}</td>
              {[1, 2, 3, 4].map((i) => (
                <td key={i} align="center" className="p-2">
                  {item[`pillar_${i}`] !== "-"
                    ? `${item[`pillar_${i}`]}%`
                    : item[`pillar_${i}`]}
                </td>
              ))}
              <td align="center" className="whitespace-nowrap p-2">
                {item.fp_employee === null &&
                item.fp_rater_1 === null &&
                item.fp_rater_2 === null &&
                item.fp_rater_3 === null ? (
                  <Badge message={"Awaiting Submission"} type={"default"} />
                ) : (
                  <>
                    <Popover
                      aria-labelledby="default-popover"
                      content={
                        <div className="w-[25rem] text-sm">
                          <div className="border-b border-gray-200 bg-default px-3 py-2 ">
                            <h3 id="default-popover" className="font-semibold">
                              Status
                            </h3>
                          </div>
                          <div className="w-full p-2">
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                <span>Employee:</span>
                                {item.full_name ? item.full_name : "N/A"}
                              </div>
                              {item.fp_employee != null && (
                                <Badge
                                  className="px-2"
                                  message={status[item.fp_employee]}
                                  type={
                                    isNaN(parseInt(item.fp_employee))
                                      ? "default"
                                      : parseInt(item.fp_employee) === 1 ||
                                        parseInt(item.fp_employee) === 2
                                      ? "success"
                                      : parseInt(item.fp_employee) === 3 ||
                                        parseInt(item.fp_employee) === 4
                                      ? "failure"
                                      : "warning"
                                  }
                                />
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                <span>Primary:</span>
                                {item.primary_evaluator
                                  ? item.primary_evaluator
                                  : "N/A"}
                              </div>
                              {item.fp_rater_1 != null && (
                                <Badge
                                  className="px-2"
                                  message={status[item.fp_rater_1]}
                                  type={
                                    parseInt(item.fp_rater_1) === 1 ||
                                    parseInt(item.fp_rater_1) === 2
                                      ? "success"
                                      : parseInt(item.fp_rater_1) === 3 ||
                                        parseInt(item.fp_rater_1) === 4
                                      ? "failure"
                                      : "warning"
                                  }
                                />
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                <span>Secondary:</span>
                                {item.secondary_evaluator
                                  ? item.secondary_evaluator
                                  : "N/A"}
                              </div>
                              {item.fp_rater_2 != null && (
                                <Badge
                                  className="px-2"
                                  message={status[item.fp_rater_2]}
                                  type={
                                    parseInt(item.fp_rater_2) === 1 ||
                                    parseInt(item.fp_rater_2) === 2
                                      ? "success"
                                      : parseInt(item.fp_rater_2) === 3 ||
                                        parseInt(item.fp_rater_2) === 4
                                      ? "failure"
                                      : "warning"
                                  }
                                />
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                <span>Tertiary:</span>
                                {item.tertiary_evaluator
                                  ? item.tertiary_evaluator
                                  : "N/A"}
                              </div>
                              {item.fp_rater_3 != null && (
                                <Badge
                                  className="px-2"
                                  message={status[item.fp_rater_3]}
                                  type={
                                    parseInt(item.fp_rater_3) === 1 ||
                                    parseInt(item.fp_rater_3) === 2
                                      ? "success"
                                      : parseInt(item.fp_rater_3) === 3 ||
                                        parseInt(item.fp_rater_3) === 4
                                      ? "failure"
                                      : "warning"
                                  }
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <button>
                        <Badge
                          className={"px-2"}
                          message={approved ? "Approved" : "Ongoing Approvals"}
                          type={approved ? "success" : "warning"}
                        />
                      </button>
                    </Popover>
                  </>
                )}
              </td>
              <td align="center" className="text-[1.1rem] relative">
                <button
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (actionsVisibility[index] === true) {
                      setActionsVisibility((prevVisibility) => {
                        const updatedVisibility = Array(
                          prevVisibility.length
                        ).fill(false);
                        return updatedVisibility;
                      });
                    } else {
                      setActionsVisibility((prevVisibility) => {
                        const updatedVisibility = Array(
                          prevVisibility.length
                        ).fill(false);
                        updatedVisibility[index] = true;
                        return updatedVisibility;
                      });
                    }
                  }}
                >
                  <CiCircleMore />
                </button>
                {actionsVisibility[index] && (
                  <>
                    <OutsideTrigger
                      onOutsideClick={() =>
                        setActionsVisibility((prevVisibility) => {
                          const updatedVisibility = [...prevVisibility];
                          updatedVisibility[index] = false;
                          return updatedVisibility;
                        })
                      }
                    >
                      <div className="flex flex-col gap-2 p-2 absolute top-[10%] right-[75%] whitespace-nowrap items-start text-[.9rem] bg-white z-[1] shadow-lg rounded animate-fade">
                        {item.fp_employee != null &&
                        item.fp_rater_1 != null &&
                        item.fp_rater_2 != null &&
                        item.fp_rater_3 != null ? (
                          <>
                            <a
                              href={`/main_goals/${item.users_id}`}
                              className="hover:bg-default w-full px-2 text-start"
                              onClick={() => {
                                localStorage.setItem(
                                  "goal_user",
                                  item.users_id
                                );
                                localStorage.setItem(
                                  "goal_name",
                                  item.full_name
                                );
                              }}
                            >
                              View Goals
                            </a>
                            {user_id !== 1 && (
                              <>
                                <a
                                  href={`/main_goals/edit`}
                                  className="hover:bg-default w-full px-2 text-start"
                                  onClick={() => {
                                    localStorage.setItem(
                                      "goal_user",
                                      item.users_id
                                    );
                                    localStorage.setItem(
                                      "goal_name",
                                      item.full_name
                                    );
                                  }}
                                >
                                  Edit Goals
                                </a>
                                {item.status === 2 && (
                                  <button className="hover:bg-default w-full px-2 text-start">
                                    Approve Goals
                                  </button>
                                )}
                                <button className="hover:bg-default w-full px-2 text-start">
                                  Delete
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {user_id !== 1 ? (
                              <a
                                href={`/main_goals/create`}
                                className="hover:bg-default w-full px-2 text-start"
                                onClick={() => {
                                  localStorage.setItem(
                                    "create_goal",
                                    item.users_id
                                  );
                                }}
                              >
                                Create Goals
                              </a>
                            ) : (
                              "No Actions..."
                            )}
                          </>
                        )}
                      </div>
                    </OutsideTrigger>
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
