import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useFunction } from "../../context/FunctionContext";
import GoalTable from "./GoalTableHeader";
import classNames from "classnames";
export default function Goals({ user_id, pillars = [] }) {
  const { id } = useParams();
  const [hasSet, toggleSet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [goalData, setGoalData] = useState([]);
  const [currentPillar, setPillar] = useState(1);

  const { removeSubText } = useFunction();

  useEffect(() => {
    if (!user_id) return;

    const retrieveUser = async () => {
      const url = "http://localhost/unmg_pms/api/fetchAllGoals.php";
      //const url = "../api/fetchGoals.php";

      const formData = new FormData();
      formData.append("user_id", user_id);
      try {
        const response = await axios.post(url, formData);
        if (response.data != 0) {
          setGoalData(response.data);
          toggleSet(true);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    retrieveUser();
  }, [user_id]);
  return !loading ? (
    <>
      {!hasSet ? (
        <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2 items-center text-center">
          <span>
            Sorry, you haven&lsquo;t set your KPIs Objectives yet. Please click
            the button to get started.
          </span>
          <a
            href="/main_goals/create"
            className="text-white p-2 flex flex-row items-center gap-2 bg-un-blue-light hover:bg-un-blue rounded-full text-[.9rem]"
          >
            <AiOutlinePlus />
            Create Goals
          </a>
        </div>
      ) : (
        <div className="flex flex-col">
          <a
            className="bg-un-blue-light text-white p-1 w-fit rounded-md cursor-pointer hover:bg-un-blue mb-2"
            href="/main_goals/create"
            onClick={() => {
              sessionStorage.setItem("edit_goal", user_id);
            }}
          >
            Edit Goals
          </a>
          <div className="hidden lg:flex flex-row">
            {pillars.map((pillar) => {
              return (
                <>
                  <button
                    onClick={() => setPillar(pillar.pillar_id)}
                    className={classNames(
                      "p-2 rounded-t-lg",
                      currentPillar === pillar.pillar_id && "bg-default font-semibold"
                    )}
                  >
                    {removeSubText(pillar.pillar_name)}
                    {currentPillar === pillar.pillar_id &&
                      goalData.find((p) => p.pillar_id == currentPillar) &&
                      goalData.find((p) => p.pillar_id == currentPillar)
                        .pillar_percentage + "%"}
                  </button>
                </>
              );
            })}
          </div>
          <div className="overflow-x-scroll xl:overflow-hidden rounded-b-lg rounded-tr-lg bg-default">
            <div className="w-full p-2 flex flex-col gap-2">
              <select
                onChange={(e) => setPillar(e.target.value)}
                className="w-full outline-none lg:hidden"
              >
                {pillars.map((pillar) => {
                  return (
                    <>
                      <option value={pillar.pillar_id}>
                        {removeSubText(pillar.pillar_name)}
                      </option>
                    </>
                  );
                })}
              </select>
              <div className="overflow-hidden w-full">
                <div className="font-semibold flex gap-2 items-center lg:hidden">
                  <p>{pillars[currentPillar - 1].pillar_name}</p>
                  <p>
                    {goalData.find((p) => p.pillar_id == currentPillar)
                      ? goalData.find((p) => p.pillar_id == currentPillar)
                          .pillar_percentage
                      : 0}
                    %
                  </p>
                </div>
                <GoalTable data={goalData} current={currentPillar} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <>Loading...</>
  );
}
