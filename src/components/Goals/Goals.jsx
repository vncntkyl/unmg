import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useFunction } from "../../context/FunctionContext";
import GoalTable from "./GoalTableHeader";
import classNames from "classnames";
import { format } from "date-fns";
import { useAuth } from "../../context/authContext";
import { developmentAPIs as url } from "../../context/apiList";
export default function Goals({
  user_id,
  pillars = [],
  kpiYears = [],
  workYear,
  setKpiDuration,
}) {
  const { id } = useParams();
  const [hasSet, toggleSet] = useState(false);
  const [goalOwner, setGoalOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [goalData, setGoalData] = useState([]);
  const [currentPillar, setPillar] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [goalStatus, setGoalStatus] = useState(false);

  const { removeSubText } = useFunction();
  const { headList, fetchUsers } = useAuth();

  const handleApproval = async () => {
    let approver, creator;
    approver = user_id;
    if (id) {
      creator = id;
    } else {
      creator = user_id;
    }
    if (creator === approver) return;

    try {
      const formData = new FormData();
      formData.append("approve", true);
      formData.append("approver", approver);
      formData.append("id", goalData[0].hr_eval_form_fp_id);
      const response = await axios.post(url.approveGoals, formData);
      if (response.data == 1) {
        alert("Goals successfully approved.");
      } else {
        alert(response.data);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (!user_id) return;

    const retrieveUser = async () => {

      const formData = new FormData();
      formData.append("user_id", id ? id : user_id);
      formData.append("work_year", workYear);
      try {
        const response = await axios.post(url.fetchAllGoals, formData);
        if (response.data) {
          setGoalData(response.data);
          let previousObjective = "";
          let previousKpi = "";

          const updatedTableData = response.data.map((item) => {
            const isFirstObjective = item.objective !== previousObjective;
            const isFirstKpi = item.kpi_desc !== previousKpi;

            previousObjective = item.objective;
            previousKpi = item.kpi_desc;

            return {
              ...item,
              isFirstObjective,
              isFirstKpi,
            };
          });
          setTableData(updatedTableData);
          toggleSet(true);
          setLoading(false);
        } else {
          toggleSet(false);
          setLoading(false);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    const getGoalApproval = async () => {
      if (headList.length < 1) return;

      const response = await fetchUsers();
      if (!response) return;

      const goalCreator = response.find((user) =>
        goalOwner ? user.users_id == goalOwner : user.users_id == user_id
      );
      const approver = headList.find(
        (head) => head.employee_id == goalCreator.primary_evaluator
      );
      try {
        const formData = new FormData();
        formData.append("checkApproval", true);
        formData.append("workYear", workYear);
        formData.append("creator", goalOwner ? goalOwner : user_id);
        formData.append("approver", approver.users_id);
        const response = await axios.post(url.fetchAllGoals, formData);
        setGoalStatus(response.data == 1);
      } catch (e) {
        console.log(e.message);
      }
    };
    if (id) {
      setGoalOwner(id);
    }
    retrieveUser();
    getGoalApproval();
  }, [user_id, workYear, goalOwner]);
  return !loading ? (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="workyear"> Select Work Year:</label>
          <select
            id="workyear"
            className="bg-default rounded-md p-1 px-2"
            onChange={(e) => {
              localStorage.setItem("work_year", parseInt(e.target.value));
              setKpiDuration(parseInt(e.target.value));
            }}
          >
            <option value="-1" disabled selected={workYear === -1}>
              --Select Year--
            </option>
            {kpiYears.length > 0 &&
              kpiYears.map((year) => {
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
        {workYear && hasSet && (
          <div className="flex flex-row gap-2">
            <a
              className="bg-un-blue-light text-white p-1 w-fit rounded-md cursor-pointer hover:bg-un-blue"
              href="/main_goals/edit"
              onClick={() => {
                if (goalOwner) {
                  localStorage.setItem("goal_user", goalOwner);
                } else {
                  localStorage.setItem("goal_user", user_id);
                }
              }}
            >
              Edit Goals
            </a>
            {!goalStatus && id && user_id !== id && (
              <button
                type="button"
                onClick={() => {
                  if (
                    confirm("Are you sure you want to approve these goals?")
                  ) {
                    handleApproval();
                  }
                }}
                className="bg-un-green text-white p-1 rounded-md cursor-pointer  hover:bg-un-green-dark"
              >
                Approve Goals
              </button>
            )}
          </div>
        )}
      </div>
      {workYear === -1 ? (
        <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2 items-center text-center">
          <span>Please select a work year to show your goals.</span>
        </div>
      ) : !hasSet ? (
        <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2 items-center text-center">
          <span>
            Sorry, you haven&lsquo;t set your KPIs Objectives yet. Please click
            the button to get started.
          </span>
          <a
            href="/main_goals/create"
            className="text-white p-2 flex flex-row items-center gap-2 bg-un-blue-light hover:bg-un-blue rounded-full text-[.9rem]"
            onClick={() => {
              localStorage.setItem("create_goal", user_id);
              localStorage.setItem("work_year", workYear);
            }}
          >
            <AiOutlinePlus />
            Create Goals
          </a>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="hidden lg:flex flex-row">
            {pillars.map((pillar) => {
              return (
                <>
                  <button
                    onClick={() => setPillar(pillar.pillar_id)}
                    className={classNames(
                      "p-2 rounded-t-lg",
                      currentPillar === pillar.pillar_id &&
                        "bg-default font-semibold"
                    )}
                  >
                    {removeSubText(pillar.pillar_name)}
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
                <GoalTable current={currentPillar} tableData={tableData} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <>Loading...</>
  );
}
