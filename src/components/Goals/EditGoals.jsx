import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JSONCheck from "../../misc/JSONCheck";
import axios from "axios";
import { useFunction } from "../../context/FunctionContext";
import classNames from "classnames";
import GoalTable from "./GoalTableHeader";

export default function EditGoals({ pillars = [] }) {
  const [goalData, setGoalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPillar, setPillar] = useState(1);
  const [tableData, setTableData] = useState([]);

  const navigate = useNavigate();
  const { removeSubText } = useFunction();

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
    }
    setTableData(tempData);
  };

  const saveData = async () => {
    try {
        console.log(tableData)
      const formdata = new FormData();
      formdata.append("goalData", JSON.stringify(tableData));

      let url = "http://localhost/unmg_pms/api/updateGoals.php";
      //let url = "../api/updateGoals.php";

      const response = await axios.post(url, formdata);

      console.log(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem("goal_user")) {
      navigate("/main_goals");
    }

    const retrieveUser = async () => {
      const url = "http://localhost/unmg_pms/api/fetchAllGoals.php";
      //const url = "../api/fetchGoals.php";

      const formData = new FormData();
      formData.append("user_id", sessionStorage.getItem("goal_user"));
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
  }, []);
  return !loading ? (
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
