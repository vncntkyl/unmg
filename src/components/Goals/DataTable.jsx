import React, { useEffect, useState } from "react";
import { useFunction } from "../../context/FunctionContext";
import { CiCircleMore } from "react-icons/ci";
import OutsideTrigger from "../OutsideTrigger";
import Badge from "../../misc/Badge";

export default function DataTable({ data, pillars, statusIdx, statusList }) {
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
  }, [statusIdx]);

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
        {sortedEmployees.map((item, index) => (
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
              <td align="center">
                <Badge
                  message={statusList[item.status - 1]}
                  type={
                    item.status == 1
                      ? "success"
                      : item.status == 2
                      ? "warning"
                      : "default"
                  }
                />
              </td>
            )}
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
                      <a
                        href={`/main_goals/${item.users_id}`}
                        className="hover:bg-default w-full px-2 text-start"
                      >
                        View Goals
                      </a>
                      <a
                        href={`/main_goals/create/${item.users_id}`}
                        className="hover:bg-default w-full px-2 text-start"
                        onClick={() => {
                          sessionStorage.setItem("edit_goal", item.user_id);
                        }}
                      >
                        Edit Goals
                      </a>
                      <a
                        href={`/main_goals/create/${item.users_id}`}
                        className="hover:bg-default w-full px-2 text-start"
                      >
                        Create Goals
                      </a>
                      <button className="hover:bg-default w-full px-2 text-start">
                        Approve Goals
                      </button>
                      <button className="hover:bg-default w-full px-2 text-start">
                        Delete
                      </button>
                    </div>
                  </OutsideTrigger>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}