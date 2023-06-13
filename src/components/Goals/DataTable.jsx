import React, { useEffect, useState } from "react";
import { useFunction } from "../../context/FunctionContext";
import { CiCircleMore } from "react-icons/ci";
import OutsideTrigger from "../OutsideTrigger";

export default function DataTable({ data, pillars }) {
  const { removeSubText } = useFunction();
  const [actionsVisibility, setActionsVisibility] = useState(
    Array(data.length).fill(false)
  );
  const [mergedDataArray, setDataArray] = useState([]);
  useEffect(() => {
    const mergedData = data.reduce((acc, item) => {
      const userKey = item.users_id;
      if (!acc[userKey]) {
        acc[userKey] = {
          users_id: item.users_id,
          full_name: item.full_name,
          [`p-1`]:
            item.pillar_id === 1 && item.has_eval
              ? item.pillar_percentage
              : "-",
          [`p-2`]:
            item.pillar_id === 2 && item.has_eval
              ? item.pillar_percentage
              : "-",
          [`p-3`]:
            item.pillar_id === 3 && item.has_eval
              ? item.pillar_percentage
              : "-",
          [`p-4`]:
            item.pillar_id === 4 && item.has_eval
              ? item.pillar_percentage
              : "-",
        };
      } else {
        const currUser = acc[userKey];
        currUser[`p-1`] =
          currUser[`p-1`] === "-" && item.pillar_id === 1 && item.has_eval
            ? item.pillar_percentage
            : currUser[`p-1`];
        currUser[`p-2`] =
          currUser[`p-2`] === "-" && item.pillar_id === 2 && item.has_eval
            ? item.pillar_percentage
            : currUser[`p-2`];
        currUser[`p-3`] =
          currUser[`p-3`] === "-" && item.pillar_id === 3 && item.has_eval
            ? item.pillar_percentage
            : currUser[`p-3`];
        currUser[`p-4`] =
          currUser[`p-4`] === "-" && item.pillar_id === 4 && item.has_eval
            ? item.pillar_percentage
            : currUser[`p-4`];
      }
      return acc;
    }, {});

    setDataArray(Object.values(mergedData));
  }, []);

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
          <td align="center" className="p-2 text-white">
            Actions
          </td>
        </tr>
      </thead>
      <tbody>
        {mergedDataArray.map((item, index) => (
          <tr key={item.users_id} className="hover:bg-default">
            <td align="center" className="whitespace-nowrap p-2">
              {item.full_name}
            </td>
            {[1, 2, 3, 4].map((i) => (
              <td key={i} align="center" className="p-2">
                {item[`p-${i}`] !== "-" ? `${item[`p-${i}`]}%` : item[`p-${i}`]}
              </td>
            ))}
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
                      <button className="hover:bg-default w-full px-2 text-start">Delete</button>
                    </div>
                    {/* <button
                      onClick={() =>
                        setActionsVisibility((prevVisibility) => {
                          const updatedVisibility = [...prevVisibility];
                          updatedVisibility[index] = false;
                          return updatedVisibility;
                        })
                      }
                    >
                      Close
                    </button> */}
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
