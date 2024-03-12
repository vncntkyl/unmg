import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import GoalsInstructions from "./GoalsInstructions";
import { useAuth } from "../../context/authContext";
import { format } from "date-fns";
import { useFunction } from "../../context/FunctionContext";
import { developmentAPIs as url } from "../../context/apiList";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { Tooltip } from "flowbite-react";
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function CreateGoals({
  pillars = [],
  user_id,
  kpi_work_year = null,
}) {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [user, setUser] = useState("");
  const [duration, setDuration] = useState();
  const [users, setUsers] = useState([]);
  const [toolTip, setToolTip] = useState(true);
  const [checkToolTip, setCheckToolTip] = useState("");
  const [saveStatus, setSaveStatus] = useState("Changes are not yet saved");
  const { kpiDurations, fetchUsers, globalSettings } = useAuth();
  const { capitalizeSentence } = useFunction();
  const [newConvoModal, setNewConvoModal] = useState(false);

  const addObjective = (i) => {
    const objectiveTemplate = {
      objective_description: "",
      kpi: [
        {
          kpi_description: "",
          kpi_weight: 0,
          target_metrics: [
            {
              point: 1,
              metric_description: "",
            },
            {
              point: 2,
              metric_description: "",
            },
            {
              point: 3,
              metric_description: "",
            },
            {
              point: 4,
              metric_description: "",
            },
          ],
        },
      ],
    };

    const currentGoals = [...goals];
    const pillar = { ...goals[i] };
    pillar.objectives.push(objectiveTemplate);
    currentGoals[i] = { ...pillar };
    setGoals(currentGoals);
  };
  const addKPI = (goalIndex, objIndex) => {
    const KPITemplate = {
      kpi_description: "",
      kpi_weight: 0,
      target_metrics: [
        {
          point: 1,
          metric_description: "",
        },
        {
          point: 2,
          metric_description: "",
        },
        {
          point: 3,
          metric_description: "",
        },
        {
          point: 4,
          metric_description: "",
        },
      ],
    };
    const currentGoals = [...goals];
    const pillar = { ...goals[goalIndex] };
    const objective = pillar.objectives[objIndex];
    objective.kpi.push(KPITemplate);
    currentGoals[goalIndex] = { ...pillar };
    setGoals(currentGoals);
  };
  const removeObjective = (goalIndex, objIndex) => {
    const currentGoals = [...goals];
    const pillar = currentGoals[goalIndex];
    pillar.objectives.splice(objIndex, 1);
    setGoals(currentGoals);
  };
  const removeKPI = (goalIndex, objIndex, kpiIndex) => {
    const currentGoals = [...goals];
    const objectives = currentGoals[goalIndex].objectives[objIndex];
    objectives.kpi.splice(kpiIndex, 1);
    setGoals(currentGoals);
  };
  const getTotalKpiCount = (arr = []) => {
    let count = 0;
    if (!arr) return;
    arr.forEach((pillar) => {
      pillar.objectives.forEach((obj) => {
        count = count + obj.kpi.length;
      });
    });
    return count;
  };
  const getPillarKPICount = (pillar = []) => {
    let kpiCount = 0;

    // Loop through all the objectives in the pillar
    for (let i = 0; i < pillar.objectives.length; i++) {
      const objective = pillar.objectives[i];

      // Loop through all the KPIs in the objective
      for (let j = 0; j < objective.kpi.length; j++) {
        const kpi = objective.kpi[j];

        // Add to the KPI count
        kpiCount++;
      }
    }

    // Check if the KPI count is equal to 3
    return kpiCount === 3;
  };
  const checkPillarPercentage = (goals) => {
    const totalPercentage = goals.reduce(
      (sum, pillar) => sum + pillar.pillar_percentage,
      0
    );
    return totalPercentage;
  };
  const validateGoals = (goals) => {
    for (const pillar of goals) {
      let kpiWeightSum = 0;
      for (const objective of pillar.objectives) {
        for (const kpi of objective.kpi) {
          kpiWeightSum += kpi.kpi_weight;
        }
      }
      if (kpiWeightSum !== pillar.pillar_percentage) {
        return pillar.pillar_percentage - kpiWeightSum;
      }
    }
    return 1;
  };
  const showGoalsOwner = () => {
    if (users.length > 0) {
      const owner = users.find(
        (u) => u.users_id == (user.length != 0 ? user : user_id)
      );
      const owner_name =
        owner.last_name +
        ", " +
        owner.first_name +
        " " +
        (owner.middle_name ? owner.middle_name.substring(0, 1) + "." : "");
      return owner_name;
    } else {
      return "Loading...";
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const pillarPercentage = checkPillarPercentage(goals);
    if (pillarPercentage < globalSettings.overall_percentage) {
      alert(
        "Total pillar percentage is lacking " +
          (globalSettings.overall_percentage - pillarPercentage) +
          "%"
      );
      return;
    }
    if (pillarPercentage > globalSettings.overall_percentage) {
      alert(
        "Total pillar percentage have exceeded the limit " +
          (pillarPercentage - globalSettings.overall_percentage) +
          "%"
      );
      return;
    }
    const kpiValidate = validateGoals(goals);
    if (kpiValidate !== 1) {
      alert(
        "Some of your KPI Weight is not equal to its pillar percentage. Please review your goals. " +
          kpiValidate +
          " missing."
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("submit", true);
      formData.append("userID", user.length != 0 ? user : user_id);
      formData.append("current_user_id", user_id);
      formData.append("goals", JSON.stringify(goals));
      formData.append("work_year", user.length != 0 ? duration : kpi_work_year);
      const response = await axios.post(url.formCreation, formData);
      alert(response.data);
      localStorage.setItem("finished_new_goals", duration);
      localStorage.removeItem("progress_goals");
      navigate("/main_goals");
    } catch (e) {
      console.log(e.message);
    }
  };

  const checkKPIWeight = (pillar) => {
    const limit = pillar.pillar_percentage;
    let cumulativeWeights = 0;
    pillar.objectives.forEach((obj) => {
      cumulativeWeights += obj.kpi[0].kpi_weight;
    });
    if (cumulativeWeights > limit) {
      return 0;
    } else {
      return limit - cumulativeWeights;
    }
  };

  const saveProgress = () => {
    const progress = JSON.stringify(goals);
    localStorage.setItem("progress_goals", progress);
    alert("Current progress is saved.");
  };

  function areObjectsEqual(obj1, obj2) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }

    for (const key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        const value1 = obj1[key];
        const value2 = obj2[key];

        if (typeof value1 === "object" && typeof value2 === "object") {
          if (!areObjectsEqual(value1, value2)) {
            return false;
          }
        } else if (value1 !== value2) {
          return false;
        }
      } else {
        return false;
      }
    }

    return true;
  }
  useEffect(() => {
    if (localStorage.getItem("progress_goals")) {
      setGoals(JSON.parse(localStorage.getItem("progress_goals")));
    } else {
      const initialGoals = pillars.map((pillar) => {
        const initialObjectives = Array.from(
          { length: globalSettings.required_min },
          () => ({
            objective_description: "",
            kpi: [
              {
                kpi_description: "",
                kpi_weight: 0,
                target_metrics: Array.from({ length: 4 }, (_, index) => ({
                  point: index + 1,
                  metric_description: "",
                })),
              },
            ],
          })
        );

        return {
          pillar_name: pillar.pillar_name,
          pillar_percentage: 0,
          objectives: initialObjectives,
        };
      });

      setGoals(initialGoals);
    }
  }, [pillars]);

  useEffect(() => {
    const setup = async () => {
      setUsers(await fetchUsers());
    };
    if (localStorage.getItem("create_goal")) {
      setUser(localStorage.getItem("create_goal"));
      //localStorage.removeItem("create_goal");
    }
    if (localStorage.getItem("work_year")) {
      setDuration(localStorage.getItem("work_year"));
    }
    setup();

    const checkProgress = () => {
      if (localStorage.getItem("progress_goals")) {
        if (goals.length > 0) {
          if (
            !areObjectsEqual(
              JSON.parse(localStorage.getItem("progress_goals")),
              goals
            )
          ) {
            setSaveStatus("Changes are not yet saved");
          } else {
            setSaveStatus("Progress saved");
          }
        }
        console.log("reading");
      }
    };
    checkProgress();

    const realtimeData = setInterval(checkProgress, 1000);

    return () => {
      clearInterval(realtimeData);
    };
  }, [goals]);

  useEffect(() => {
    // Execute the save function after 5 seconds when changes are not yet saved
    if (goals.length > 0) {
      if (
        saveStatus === "Changes are not yet saved" ||
        saveStatus === "Saving changes..."
      ) {
        const saveTimer = setTimeout(() => {
          // Call your save function here
          setSaveStatus("Saving changes...");
          localStorage.setItem("progress_goals", JSON.stringify(goals));
        }, 2000); // 5 seconds in milliseconds

        return () => clearTimeout(saveTimer);
      }
    }
  }, [saveStatus]);
  return (
    <>
      <div className="h-[calc(91vh-64px)] flex flex-col gap-2 overflow-y-scroll">
        <GoalsInstructions />
        <div className="flex flex-row justify-between">
          <span>Create goals for: {showGoalsOwner()}</span>
          <span>Status: {saveStatus}</span>
        </div>
        {globalSettings.goal_status === 1 &&
          "The creation of the performance plan has been disabled by the admin."}
        {user !== "" && (
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2 items-center">
              <label htmlFor="workyear"> Select Work Year:</label>
              <select
                id="workyear"
                className="bg-default rounded-md p-1 px-2"
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="" disabled>
                  --Select Year--
                </option>
                {kpiDurations.length > 0 &&
                  kpiDurations.map((year) => {
                    return (
                      <option
                        value={year.kpi_year_duration_id}
                        selected={year.kpi_year_duration_id == duration}
                      >
                        {format(new Date(year.from_date), "MMM d, yyyy") +
                          " - " +
                          format(new Date(year.to_date), "MMM d, yyyy")}
                      </option>
                    );
                  })}
              </select>
            </div>
            <button
              className="w-fit outline-none bg-un-red rounded-md text-white hover:bg-un-red-light flex items-center justify-center text-[0.8rem] lg:text-[1rem] transition-all overflow-hidden px-2 py-1"
              onClick={() => {
                setNewConvoModal(true);
              }}
            >
              <FaPencilAlt className="text-[0.8rem] lg:text-[1rem]" />
              <span>Compose</span>
            </button>
          </div>
        )}
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          {goals.length > 0
            ? goals.map((goal, index) => {
                return (
                  <>
                    <div
                      className={classNames(
                        "bg-default p-2 rounded-md",
                        globalSettings.goal_status === 1
                          ? "pointer-events-none text-default-dark"
                          : ""
                      )}
                    >
                      <div className="flex flex-row items-center justify-between gap-1 p-1 lg:w-1/6">
                        <label
                          htmlFor="pillar_name"
                          className="font-bold whitespace-nowrap flex items-center gap-2"
                        >
                          {goal.pillar_name}
                          <Tooltip
                            content="This is the KPI pillar settings."
                            style="light"
                          >
                            <IoIosInformationCircleOutline />
                          </Tooltip>
                        </label>
                        <Tooltip
                          content=" You will put the pillar weight here."
                          style="light"
                          trigger="click"
                        >
                          <input
                            type="number"
                            min={globalSettings.pillar_min}
                            max={globalSettings.pillar_max}
                            required
                            value={goal.pillar_percentage}
                            className="outline-none rounded-md p-1 text-center ml-auto"
                            onChange={(e) => {
                              const point = e.target.valueAsNumber;
                              const updatedGoals = [...goals];
                              updatedGoals[index] = {
                                ...updatedGoals[index],
                                pillar_percentage: point,
                              };
                              setGoals(updatedGoals);
                            }}
                          />
                        </Tooltip>
                        <span className="font-bold">%</span>
                      </div>
                      <div className="overflow-x-scroll py-2">
                        {goal.objectives.map((obj, objIndex) => {
                          return (
                            <>
                              <div className="flex flex-row justify-between gap-2">
                                <div className="flex flex-col gap-2">
                                  <span>Objective</span>
                                  <div className="flex flex-row gap-2 items-center">
                                    <span>{objIndex + 1}</span>
                                    <textarea
                                      required
                                      className="p-1 rounded-md w-[350px]"
                                      value={obj.objective_description}
                                      onChange={(e) => {
                                        const text = e.target.value;
                                        const updatedGoals = [...goals];
                                        const currentPillar =
                                          updatedGoals[index];
                                        currentPillar.objectives[objIndex] = {
                                          ...currentPillar.objectives[objIndex],
                                          objective_description: text,
                                        };

                                        setGoals(updatedGoals);
                                      }}
                                    ></textarea>
                                    {goal.objectives.length !==
                                      globalSettings.required_min && (
                                      <Tooltip
                                        content="Remove Objective"
                                        style="light"
                                      >
                                        <button
                                          type="button"
                                          onClick={() =>
                                            removeObjective(index, objIndex)
                                          }
                                        >
                                          <AiOutlineMinus />
                                        </button>
                                      </Tooltip>
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                  {obj.kpi.map((kpi, kpiIndex) => {
                                    return (
                                      <>
                                        <div className="flex flex-row gap-20 justify-between">
                                          <div className="flex flex-col gap-2">
                                            <span>KPI</span>
                                            <div className="flex flex-row items-center gap-2 justify-start">
                                              <textarea
                                                required
                                                className="p-1 rounded-md w-[300px]"
                                                value={kpi.kpi_description}
                                                onChange={(e) => {
                                                  const text = e.target.value;
                                                  const updatedGoals = [
                                                    ...goals,
                                                  ];
                                                  const currentObjective =
                                                    updatedGoals[index]
                                                      .objectives[objIndex];
                                                  currentObjective.kpi[
                                                    kpiIndex
                                                  ] = {
                                                    ...currentObjective.kpi[
                                                      kpiIndex
                                                    ],
                                                    kpi_description: text,
                                                  };
                                                  setGoals(updatedGoals);
                                                }}
                                              ></textarea>
                                              <div className="flex flex-row items-center gap-1 p-1">
                                                <input
                                                  required
                                                  type="number"
                                                  min={0}
                                                  max={goal.pillar_percentage}
                                                  className="outline-none rounded-md p-1 text-center"
                                                  value={kpi.kpi_weight}
                                                  onChange={(e) => {
                                                    const point =
                                                      e.target.valueAsNumber;
                                                    const updatedGoals = [
                                                      ...goals,
                                                    ];
                                                    const currentObjective =
                                                      updatedGoals[index]
                                                        .objectives[objIndex];
                                                    currentObjective.kpi[
                                                      kpiIndex
                                                    ] = {
                                                      ...currentObjective.kpi[
                                                        kpiIndex
                                                      ],
                                                      kpi_weight: point,
                                                    };
                                                    setGoals(updatedGoals);
                                                  }}
                                                />
                                                <span className="font-bold">
                                                  %
                                                </span>
                                              </div>
                                              {getTotalKpiCount(goals) <
                                                globalSettings.required_max && (
                                                <>
                                                  <Tooltip
                                                    content="Add another KPI"
                                                    style="light"
                                                  >
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        addKPI(index, objIndex)
                                                      }
                                                    >
                                                      <AiOutlinePlus />
                                                    </button>
                                                  </Tooltip>
                                                </>
                                              )}
                                              {obj.kpi.length > 1 && (
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    removeKPI(
                                                      index,
                                                      objIndex,
                                                      kpiIndex
                                                    )
                                                  }
                                                >
                                                  <AiOutlineMinus />
                                                </button>
                                              )}
                                            </div>
                                          </div>
                                          <div className="flex flex-col gap-2">
                                            <span>Target Metrics</span>
                                            {kpi.target_metrics.map(
                                              (metrics, metricIndex) => {
                                                const reversedPoint =
                                                  4 - metrics.point + 1;
                                                return (
                                                  <>
                                                    <div className="flex flex-row items-center gap-1">
                                                      <span>
                                                        {reversedPoint}
                                                      </span>
                                                      <textarea
                                                        required
                                                        className="p-1 rounded-md w-[300px]"
                                                        value={
                                                          metrics.metric_description
                                                        }
                                                        onChange={(e) => {
                                                          const text =
                                                            e.target.value;
                                                          const updatedGoals = [
                                                            ...goals,
                                                          ];
                                                          const currentKPI =
                                                            updatedGoals[index]
                                                              .objectives[
                                                              objIndex
                                                            ].kpi[kpiIndex];
                                                          currentKPI.target_metrics[
                                                            metricIndex
                                                          ] = {
                                                            ...currentKPI
                                                              .target_metrics[
                                                              metricIndex
                                                            ],
                                                            metric_description:
                                                              text,
                                                          };

                                                          setGoals(
                                                            updatedGoals
                                                          );
                                                        }}
                                                      ></textarea>
                                                    </div>
                                                  </>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              </div>
                            </>
                          );
                        })}
                        {getTotalKpiCount(goals) <
                          globalSettings.required_max && (
                          <Tooltip content="Add Objective" style="light">
                            <button
                              type="button"
                              className="sticky left-0 bg-un-blue-light text-white p-1 px-2 rounded"
                              onClick={() => addObjective(index)}
                            >
                              Add Objective
                            </button>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </>
                );
              })
            : "Loading..."}
          <div className="flex flex-row gap-2 justify-end">
            <span>Current Percentage: {checkPillarPercentage(goals)}</span>
            <button
              type="button"
              formNoValidate
              onClick={() => saveProgress()}
              className="bg-mid-gray p-1 rounded-md text-white hover:bg-dark-gray"
            >
              Save Progress
            </button>
            <button className="bg-un-blue-light p-1 rounded-md text-white hover:bg-un-blue">
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* <div
        className={classNames(
          "bg-[#00000035] fixed h-full w-full z-[21] top-0 left-0 animate-fade pointer-events-auto",
          !toolTip && "z-[-1] hidden pointer-events-none"
        )}
      /> */}
    </>
  );
}
