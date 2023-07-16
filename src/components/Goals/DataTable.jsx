import React, { useEffect, useState } from "react";
import { useFunction } from "../../context/FunctionContext";
import { CiCircleMore } from "react-icons/ci";
import OutsideTrigger from "../OutsideTrigger";
import Badge from "../../misc/Badge";
import { useAuth } from "../../context/authContext";

export default function DataTable({
  data,
  pillars,
  statusIdx,
  statusList,
  usertype,
  workYear,
}) {
  const { removeSubText } = useFunction();
  const [sortedEmployees, sortEmployees] = useState([]);
  const [kpiYear, setKPIYear] = useState(-1);
  const [actionsVisibility, setActionsVisibility] = useState(
    Array(data.length).fill(false)
  );
  const { currentUser } = useAuth();

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
  }, [statusIdx,data]);

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
          {JSON.parse(currentUser).users_id != 1 && (
            <td align="center" className="p-2 text-white">
              Actions
            </td>
          )}
        </tr>
      </thead>
      <tbody>
        {filterEmployees(sortedEmployees).map((item, index) => (
          <tr key={item.users_id} className="hover:bg-default">
            <td align="center" className="whitespace-nowrap p-2">
              {item.full_name}
            </td>
            {[1, 2, 3, 4].map((i) => (
              <td key={i} align="center" className="p-2">
                {item[`pillar_${i}`] !== "-"
                  ? `${item[`pillar_${i}`]}%`
                  : item[`pillar_${i}`]}
              </td>
            ))}
            {statusIdx === 0 && (
              <td align="center" className="p-2">
                <Badge
                    message={statusList[item.status - 1]}
                    type={
                      parseInt(item.status) === 1
                        ? "success"
                        : parseInt(item.status) === 2
                        ? "warning"
                        : "default"
                    }
                  />
              </td>
            )}
            {JSON.parse(currentUser).users_id != 1 && (
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
                        {item.status == 1 || item.status == 2 ? (
                          <>
                            <a
                              href={`/main_goals/${item.users_id}`}
                              className="hover:bg-default w-full px-2 text-start"
                            >
                              View Goals
                            </a>
                            <a
                              href={`/main_goals/edit`}
                              className="hover:bg-default w-full px-2 text-start"
                              onClick={() => {
                                localStorage.setItem(
                                  "goal_user",
                                  item.users_id
                                );
                                localStorage.setItem("work_year", workYear);
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
                        ) : (
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
                        )}
                      </div>
                    </OutsideTrigger>
                  </>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
