import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFunction } from "../../context/FunctionContext";
import classNames from "classnames";
import GoalTable from "./GoalTableHeader";
import { useAuth } from "../../context/authContext";

export default function EditGoals({ pillars = [], workYear }) {
  const [goalData, setGoalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPillar, setPillar] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const { removeSubText } = useFunction();
  const { currentUser, fetchUsers } = useAuth();

  const updateData = (part, index, event) => {
    const tempData = [...tableData];
    let currentGoal;
    switch (part) {
      case "objective":
        currentGoal = tempData.filter((goal) => goal.pillar_id === index);
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
    }
    setTableData(tempData);
  };

  const saveData = async () => {
    try {
      const formdata = new FormData();
      formdata.append("goalData", JSON.stringify(tableData));

      let url = "http://localhost/unmg_pms/api/updateGoals.php";
      //let url = "../api/updateGoals.php";

      const response = await axios.post(url, formdata);

      if (response.data === 1) {
        let url = "http://localhost/unmg_pms/api/sendmail.php";
        //let url = "../api/sendmail.php";
        const notificationData = new FormData();
        notificationData.append("sendNotification", true);

        const receipients = [];
        const loggedUser = JSON.parse(currentUser);
        const goalOwner = tableData[0].users_id;
        const editor = loggedUser.users_id;
        const supervisor = users.find(
          (user) => user.employee_id == loggedUser.primary_evaluator
        );
        const supervisorName = `${supervisor.salutation} ${supervisor.first_name} ${supervisor.last_name}`;
        const employee = `${loggedUser.salutation} ${loggedUser.first_name} ${loggedUser.last_name}`;
        if (goalOwner === editor) {
          receipients.push({
            user_type: "superior",
            name: supervisorName,
            email: supervisor.email_address,
            message:
              "One of your employees has made some changes to their goals. Please take a moment to review the edited goals and provide your feedback or remarks.",
            subject: employee + " Updated Their Goals",
          });
          receipients.push({
            user_type: "employee",
            name: employee,
            email: loggedUser.email_address,
            message: "You have successfully updated your goals!",
            subject: "Successfully Updated Goals",
          });
          notificationData.append("employeeName", employee);
        } else {
          //email si employee lang
        }

        console.log(receipients);
        notificationData.append("receipients", JSON.stringify(receipients));
        notificationData.append("link", "");
        notificationData.append("linkMessage", "View updates");

        const response = await axios.post(url, notificationData);
        if (response.data === 1) {
          if(alert("You have successfully updated your goals")){
            navigate("/main_goals")
          }
        }
      } else {
        alert("An error has occured. Please Contact the IT Department");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("goal_user")) {
      navigate("/main_goals");
    }

    const retrieveUser = async () => {
      const response = await fetchUsers();
      setUsers(response);
      const url = "http://localhost/unmg_pms/api/fetchAllGoals.php";
      //const url = "../api/fetchGoals.php";

      const formData = new FormData();
      const goal_owner = parseInt(localStorage.getItem("goal_user"));
      const work_year = parseInt(localStorage.getItem("work_year"));

      formData.append("user_id", goal_owner);
      formData.append("work_year", work_year);
      try {
        const response = await axios.post(url, formData);
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
  return !loading && pillars ? (
    <>
      <div className="flex flex-row flex-wrap gap-2">
        {pillars.map((pillar, index) => {
          return (
            <button
              onClick={() => setPillar(pillar.pillar_id)}
              key={index}
              className={classNames(
                "p-2 rounded-t-lg",
                currentPillar === pillar.pillar_id && "bg-default font-semibold"
              )}
            >
              {removeSubText(pillar.pillar_name)}
            </button>
          );
        })}
      </div>
      <div className="overflow-hidden w-full p-2 bg-default">
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
        <GoalTable
          data={goalData}
          setData={setGoalData}
          current={currentPillar}
          edit={true}
          updateData={updateData}
          saveData={saveData}
          tableData={tableData}
        />
      </div>
    </>
  ) : (
    <>Loading...</>
  );
}
