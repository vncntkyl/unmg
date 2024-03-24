import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useFunction } from "../../context/FunctionContext";
import GoalTable, { GoalList } from "./GoalTableHeader";
import classNames from "classnames";
import { useAuth } from "../../context/authContext";
import { developmentAPIs as url } from "../../context/apiList";
import WorkYear from "../../misc/WorkYear";
import ViewLayout from "../../misc/ViewLayout";
import { MdMessage } from "react-icons/md";
import { Popover } from "flowbite-react";
import Badge from "../../misc/Badge";
import { useNavigate } from "react-router-dom";
import { parse } from "date-fns";

export default function Goals({ user_id, pillars, workYear, setWorkYear }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hasSet, toggleSet] = useState(false);
  const [goalOwner, setGoalOwner] = useState(null);
  const [viewLayout, setViewLayout] = useState("tabular");
  const [loading, setLoading] = useState(true);
  const [goalData, setGoalData] = useState([]);
  const [currentPillar, setPillar] = useState("1");
  const [tableData, setTableData] = useState([]);
  const [goalStatus, setGoalStatus] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [approvals, setApprovals] = useState([]);
  // console.table(approvals);
  const { removeSubText } = useFunction();
  const { headList, fetchUsers } = useAuth();

  const handleApproval = async (acceptType) => {
    const getInsert =
      parseInt(approvals.employee_id) === user_id
        ? "employee"
        : parseInt(approvals.primary_id) === user_id
        ? "rater_1"
        : parseInt(approvals.secondary_id) === user_id
        ? "rater_2"
        : "rater_3";
    try {
      const formData = new FormData();
      formData.append("approve", true);
      formData.append("employee_id", id ? id : user_id);
      formData.append("approver", user_id);
      formData.append("accept", acceptType);
      formData.append("column_name", getInsert);
      formData.append("id", goalData[0].hr_eval_form_fp_id);
      const response = await axios.post(url.approveGoals, formData);
      if (response.data == "success") {
        alert("Goals successfully approved.");
        navigate(0);
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
    const getApprovals = async () => {
      const parameters = {
        params: {
          approvals: true,
          user_id: id ? id : user_id,
          work_year: workYear,
        },
      };
      try {
        const response = await axios.get(url.fetchAllGoals, parameters);
        setApprovals(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    getApprovals();
    retrieveUser();
    getGoalApproval();
  }, [user_id, workYear, goalOwner]);
  useEffect(() => {
    if (localStorage.getItem("goal_name")) {
      setEmployeeName(localStorage.getItem("goal_name"));
      localStorage.removeItem("goal_name");
    }
    if (localStorage.getItem("viewLayout")) {
      setViewLayout(localStorage.getItem("viewLayout"));
    }
  }, []);
  const raters = [1, 2, 5];

  const approved =
    parseInt(approvals.fp_employee) === 1 &&
    [
      parseInt(approvals.fp_rater_1),
      parseInt(approvals.fp_rater_2),
      parseInt(approvals.fp_rater_3),
    ].every((rater) => raters.includes(rater));

  const status = ["Pending", "Accepted", "Approved", "Rejected", "Disapprove"];
  return !loading ? (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-center justify-between">
        <div className="flex flex-col gap-2">
          {employeeName && (
            <span className="text-[1.1rem]">{employeeName}</span>
          )}
          <WorkYear workYear={workYear} setWorkYear={setWorkYear} />
        </div>
        <div className="flex items-center gap-2">
          {console.log(approvals, user_id)}
          {workYear && hasSet && user_id != 1 && (
            <>
              <ViewLayout
                viewLayout={viewLayout}
                setViewLayout={setViewLayout}
              />
              {approvals && (
                <>
                  {parseInt(parseInt(approvals.employee_id)) === user_id &&
                  parseInt(approvals.fp_employee) === 0 ? (
                    <>
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
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to approve these goals?"
                            )
                          ) {
                            handleApproval(1);
                          }
                        }}
                        className="bg-un-green text-white p-1 rounded-md cursor-pointer  hover:bg-un-green-dark"
                      >
                        Accept Goals
                      </button>
                    </>
                  ) : parseInt(approvals.primary_id) === user_id &&
                    parseInt(approvals.fp_employee) === 1 &&
                    parseInt(approvals.fp_rater_1) === 0 ? (
                    <>
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
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to approve these goals?"
                            )
                          ) {
                            handleApproval(
                              parseInt(approvals.status) === 2 ? 2 : 1
                            );
                          }
                        }}
                        className="bg-un-green text-white p-1 rounded-md cursor-pointer  hover:bg-un-green-dark"
                      >
                        {parseInt(approvals.status) === 2
                          ? "Approve Goals"
                          : "Accept Goals"}
                      </button>
                    </>
                  ) : parseInt(approvals.secondary_id) === user_id &&
                    parseInt(approvals.fp_employee) === 1 &&
                    parseInt(approvals.fp_rater_1) === 1 &&
                    parseInt(approvals.fp_rater_2) === 0 ? (
                    <>
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
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to approve these goals?"
                            )
                          ) {
                            handleApproval(
                              parseInt(approvals.status) === 3 ? 2 : 1
                            );
                          }
                        }}
                        className="bg-un-green text-white p-1 rounded-md cursor-pointer  hover:bg-un-green-dark"
                      >
                        {parseInt(approvals.status) === 3
                          ? "Approve Goals"
                          : "Accept Goals"}
                      </button>
                    </>
                  ) : parseInt(approvals.tertiary_id) === user_id &&
                    parseInt(approvals.fp_employee) === 1 &&
                    parseInt(approvals.fp_rater_1) === 1 &&
                    parseInt(approvals.fp_rater_2) === 1 &&
                    parseInt(approvals.fp_rater_3) === 0 ? (
                    <>
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
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to approve these goals?"
                            )
                          ) {
                            handleApproval(2);
                          }
                        }}
                        className="bg-un-green text-white p-1 rounded-md cursor-pointer  hover:bg-un-green-dark"
                      >
                        Approve Goals
                      </button>
                    </>
                  ) : (
                    <>
                      {parseInt(approvals.fp_employee) === 0
                        ? `Pending acceptance from ${approvals.full_name}`
                        : parseInt(approvals.fp_employee) === 1 &&
                          parseInt(approvals.fp_rater_1) === 0
                        ? parseInt(approvals.status) === 2
                          ? `Pending approval from ${approvals.primary_evaluator}`
                          : `Pending acceptance from ${approvals.primary_evaluator}`
                        : parseInt(approvals.fp_employee) === 1 &&
                          parseInt(approvals.fp_rater_1) === 1 &&
                          parseInt(approvals.fp_rater_2) === 0
                        ? parseInt(approvals.status) === 3
                          ? `Pending approval from ${approvals.secondary_evaluator}`
                          : `Pending acceptance from ${approvals.secondary_evaluator}`
                        : parseInt(approvals.fp_employee) === 1 &&
                          parseInt(approvals.fp_rater_1) === 1 &&
                          parseInt(approvals.fp_rater_2) === 1 &&
                          parseInt(approvals.fp_rater_3) === 0
                        ? `Pending approval from ${approvals.tertiary_evaluator}`
                        : ""}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {workYear && user_id != 1 && (
        <div className="w-full flex justify-end">
          {approvals ? (
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
                        {approvals.full_name ? approvals.full_name : "N/A"}
                      </div>
                      {approvals.fp_employee != null && (
                        <Badge
                          message={status[approvals.fp_employee]}
                          type={
                            isNaN(parseInt(approvals.fp_employee))
                              ? "default"
                              : parseInt(approvals.fp_employee) === 1 ||
                                parseInt(approvals.fp_employee) === 2
                              ? "success"
                              : parseInt(approvals.fp_employee) === 3 ||
                                parseInt(approvals.fp_employee) === 4
                              ? "failure"
                              : "warning"
                          }
                        />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <span>Primary:</span>
                        {approvals.primary_evaluator
                          ? approvals.primary_evaluator
                          : "N/A"}
                      </div>
                      {approvals.fp_rater_1 != null && (
                        <Badge
                          message={status[approvals.fp_rater_1]}
                          type={
                            parseInt(approvals.fp_rater_1) === 1 ||
                            parseInt(approvals.fp_rater_1) === 2
                              ? "success"
                              : parseInt(approvals.fp_rater_1) === 3 ||
                                parseInt(approvals.fp_rater_1) === 4
                              ? "failure"
                              : "warning"
                          }
                        />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <span>Secondary:</span>
                        {approvals.secondary_evaluator
                          ? approvals.secondary_evaluator
                          : "N/A"}
                      </div>
                      {approvals.fp_rater_2 != null && (
                        <Badge
                          message={status[approvals.fp_rater_2]}
                          type={
                            parseInt(approvals.fp_rater_2) === 1 ||
                            parseInt(approvals.fp_rater_2) === 2
                              ? "success"
                              : parseInt(approvals.fp_rater_2) === 3 ||
                                parseInt(approvals.fp_rater_2) === 4
                              ? "failure"
                              : "warning"
                          }
                        />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <span>Tertiary:</span>
                        {approvals.tertiary_evaluator
                          ? approvals.tertiary_evaluator
                          : "N/A"}
                      </div>
                      {approvals.fp_rater_3 != null && (
                        <Badge
                          message={status[approvals.fp_rater_3]}
                          type={
                            parseInt(approvals.fp_rater_3) === 1 ||
                            parseInt(approvals.fp_rater_3) === 2
                              ? "success"
                              : parseInt(approvals.fp_rater_3) === 3 ||
                                parseInt(approvals.fp_rater_3) === 4
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
          ) : (
            <Badge
              className="px-2"
              message={"Awaiting Submission"}
              type={"default"}
            />
          )}
        </div>
      )}
      {workYear === -1 ? (
        <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2 items-center text-center">
          <span>Please select a work year to show your goals.</span>
        </div>
      ) : !hasSet ? (
        <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2 items-center text-center">
          {user_id != 1 ? (
            <>
              <span>
                Sorry, you haven&lsquo;t set your KPIs Objectives yet. Please
                click the button to get started.
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
            </>
          ) : (
            <span>Sorry, the user has not set their KPIs Objectives yet.</span>
          )}
        </div>
      ) : (
        <>
          {viewLayout === "tabular" ? (
            <div className="flex flex-col">
              <div className="hidden lg:flex flex-row">
                {pillars?.map((pillar, index) => {
                  return (
                    <>
                      <button
                        onClick={() => setPillar(pillar.pillar_id)}
                        className={classNames(
                          "p-2 rounded-t-lg",
                          currentPillar === pillar.pillar_id &&
                            "bg-default font-semibold"
                        )}
                        key={"goals" + index}
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
                    {pillars.map((pillar, index) => {
                      return (
                        <>
                          <option value={pillar.pillar_id} key={index}>
                            {removeSubText(pillar.pillar_name)}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  <div className="overflow-hidden w-full">
                    <GoalTable current={currentPillar} tableData={tableData} />
                  </div>
                </div>
              </div>
            </div>
          ) : viewLayout === "list" ? (
            <>
              <GoalList pillars={pillars} tableData={tableData} />
            </>
          ) : (
            "Loading..."
          )}
        </>
      )}
    </div>
  ) : (
    <>Loading...</>
  );
}
