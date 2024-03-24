import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFunction } from "../../context/FunctionContext";
import classNames from "classnames";
import GoalTable, { GoalList } from "./GoalTableHeader";
import { useAuth } from "../../context/authContext";
import { developmentAPIs as url } from "../../context/apiList";
import ViewLayout from "../../misc/ViewLayout";
import AlertModal from "../../misc/AlertModal";

export default function EditGoals({ user_id, pillars, workYear }) {
  const [goalData, setGoalData] = useState([]);
  const [viewLayout, setViewLayout] = useState("tabular");
  const [loading, setLoading] = useState(true);
  const [currentPillar, setPillar] = useState("1");
  const [tableData, setTableData] = useState([]);
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState("standby");
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const { removeSubText } = useFunction();
  const { currentUser, fetchUsers } = useAuth();
  const updateData = (part, index, event) => {
    const tempData = [...tableData];
    let currentGoal;
    switch (part) {
      case "objective":
        currentGoal = tempData.filter((goal) => goal.objective_id === index);
        currentGoal.forEach((goal) => {
          goal.objective = event.target.value;
        });
        break;
      case "KPI":
        currentGoal = tempData.filter((goal) => goal.kpi_id === index);
        currentGoal.forEach((goal) => {
          goal.kpi_desc = event.target.value;
        });

        break;
      case "KPI Weight":
        currentGoal = tempData.filter((goal) => goal.kpi_id === index);
        currentGoal.forEach((goal) => {
          goal.kpi_weight = event.target.value;
        });

        break;
      case "target metrics":
        currentGoal = tempData.find((goal) => goal.target_metrics_id === index);
        currentGoal.target_metrics_desc = event.target.value;
        break;
      case "pillar percentage":
        currentGoal = tempData.filter((goal) => goal.pillar_id === index);
        currentGoal.forEach((goal) => {
          goal.pillar_percentage = event.target.value;
        });
        break;
      case "comment":
        currentGoal = tempData.filter((goal) => goal.pillar_id === index);
        currentGoal.forEach((goal) => {
          goal.comment = event.target.value;
        });
    }
    setTableData(tempData);
  };

  useEffect(() => {
    if (!localStorage.getItem("goal_user")) {
      navigate("/main_goals");
    }
    if (localStorage.getItem("viewLayout")) {
      setViewLayout(localStorage.getItem("viewLayout"));
    }

    const retrieveUser = async () => {
      const response = await fetchUsers();
      setUsers(response);

      const formData = new FormData();
      const goal_owner = parseInt(localStorage.getItem("goal_user"));
      const work_year = parseInt(localStorage.getItem("work_year"));

      formData.append("user_id", goal_owner);
      formData.append("work_year", work_year);
      try {
        const response = await axios.post(url.fetchAllGoals, formData);
        if (response.data != 0) {
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
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    retrieveUser();
  }, [workYear]);
const handleContinue = () => {
  setModal("confirmation");
}
const handleSubmit = async (fp_id) => {
  try {
    const formdata = new FormData();
    formdata.append("goalData", JSON.stringify(tableData));
    formdata.append("goal_editor", parseInt(JSON.parse(currentUser).users_id))
    formdata.append("fp_id", fp_id)
    formdata.append("workYear", workYear)
    formdata.append("user_id", parseInt(localStorage.getItem("goal_user")))
    const response = await axios.post(url.updateGoals, formdata);
    if (response.data === 1) {
      setModal("success");
      setModalMessage("Goals successfully updated.");
    } else {
      setModal("error");
      setModalMessage(response.data);
    }
    // if (response.data === 1) {
    //   const notificationData = new FormData();
    //   notificationData.append("sendNotification", true);

    //   const receipients = [];
    //   const loggedUser = JSON.parse(currentUser);
    //   const goalOwner = tableData[0].users_id;
    //   const editor = loggedUser.users_id;
    //   const supervisor = users.find(
    //     (user) => user.employee_id == loggedUser.primary_evaluator
    //   );
    //   const supervisorName = `${supervisor.salutation} ${supervisor.first_name} ${supervisor.last_name}`;
    //   const employee = `${loggedUser.salutation} ${loggedUser.first_name} ${loggedUser.last_name}`;
    //   if (goalOwner === editor) {
    //     receipients.push({
    //       user_type: "superior",
    //       name: supervisorName,
    //       email: supervisor.email_address,
    //       message:
    //         "One of your employees has made some changes to their goals. Please take a moment to review the edited goals and provide your feedback or remarks.",
    //       subject: employee + " Updated Their Goals",
    //     });
    //     receipients.push({
    //       user_type: "employee",
    //       name: employee,
    //       email: loggedUser.email_address,
    //       message: "You have successfully updated your goals!",
    //       subject: "Successfully Updated Goals",
    //     });
    //     notificationData.append("employeeName", employee);
    //   } else {
    //     //email si employee lang
    //   }
    //   notificationData.append("receipients", JSON.stringify(receipients));
    //   notificationData.append("link", "");
    //   notificationData.append("linkMessage", "View updates");

    //   const response = await axios.post(url.sendMail, notificationData);
    //   if (response.data === 1) {
    //     if (alert("You have successfully updated your goals")) {
    //       navigate("/main_goals");
    //     }
    //   }
    // } else {
    //   alert("An error has occured. Please Contact the IT Department");
    // }
  } catch (e) {
    setModal("error");
    setModalMessage(e.message);
    console.log(e.message);
  }
};

const handleSuccess = () => {
  navigate("/main_goals");
}
  return !loading && pillars ? (
    <>
      <div className="w-full flex justify-end my-2">
        <ViewLayout viewLayout={viewLayout} setViewLayout={setViewLayout} />
      </div>
      {viewLayout === "tabular" ? (
        <>
          <div className="flex flex-row flex-wrap gap-2">
            {pillars.map((pillar, index) => {
              return (
                <button
                  onClick={() => setPillar(pillar.pillar_id)}
                  key={index}
                  className={classNames(
                    "p-2 rounded-t-lg",
                    currentPillar === pillar.pillar_id &&
                      "bg-default font-semibold"
                  )}
                >
                  {removeSubText(pillar.pillar_name)}
                </button>
              );
            })}
          </div>
          <div className="max-h-[70vh] overflow-y-scroll overflow-hidden w-full p-2 bg-default">
            <GoalTable
              data={goalData}
              setData={setGoalData}
              current={currentPillar}
              edit={true}
              updateData={updateData}
              tableData={tableData}
              isApprover={
                parseInt(JSON.parse(currentUser).users_id) !==
                parseInt(localStorage.getItem("goal_user"))
                  ? true
                  : false
              }
              handleContinue={handleContinue}
            />
          </div>
        </>
      ) : viewLayout === "list" ? (
        <>
          <GoalList
            pillars={pillars}
            edit={true}
            updateData={updateData}
            tableData={tableData}
            isApprover={
              parseInt(JSON.parse(currentUser).users_id) !==
              parseInt(localStorage.getItem("goal_user"))
                ? true
                : false
            }
            handleContinue={handleContinue}
          />
        </>
      ) : (
        "Loading..."
      )}
      {modal === "confirmation" && (
        <>
          <AlertModal
            closeModal={setModal}
            modalType={"confirmation"}
            title={"Edit Goals"}
            message={
              "Can you please confirm whether the provided goal details are accurate?"
            }
            handleContinue={() => {
              handleSubmit(tableData[0].hr_eval_form_fp_id);
            }}
          />
        </>
      )}
      {modal === "error" && (
          <>
            <AlertModal
              closeModal={setModal}
              modalType={"status"}
              modalStatus={modal}
              message={modalMessage}
              handleContinue={() => {
                handleSuccess();
              }}
              handleSuccess={() => {
                handleSuccess();
              }}
            />
          </>
        )}
      {modal === "success" && (
          <>
            <AlertModal
              closeModal={setModal}
              modalType={"status"}
              modalStatus={modal}
              message={modalMessage}
              handleContinue={() => {
                handleSuccess();
              }}
              handleSuccess={() => {
                handleSuccess();
              }}
            />
          </>
        )}
    </>
  ) : (
    <>Loading...</>
  );
}
