import React, { useEffect, useState } from "react";
import AssessmentInstructions from "./AssessmentInstructions";
import axios from "axios";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export default function EmployeeAssessmentGradeEdit() {
  const [grades, setGrades] = useState([]);
  const [checkForm, setcheckForm] = useState();
  const [pillars, setPillars] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [currentObjective, setObjectiveTabStatus] = useState([]);
  const [quarter, setQuarter] = useState(
    sessionStorage.getItem("assessment_quarter") || 0
  );
  const [name, setName] = useState([]);
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState([]);
  let pCounter,
    oCounter,
    kCounter = 1;
  //Form
  const [selectedValues, setSelectedValues] = useState([]);
  const [remarks, setRemarks] = useState([]);
  //Submit form
  // Usage
  const tbl_name = getTableName(quarter);

  useEffect(() => {
    //Whole Grades
    const getGrades = async () => {
      const url = "http://localhost/unmg_pms/api/retrieveTracking.php";
      try {
        const response = await axios.get(url, {
          params: {
            userGrading: true,
            quarter: quarter,
            empID: sessionStorage.getItem("assessment_id"),
          },
        });
        setGrades(response.data);
        //set weight
        // const kpi_weight = response.data.map((item) => item.kpi_weight)
        // setWeight(kpi_weight);

        //if pillar id is not found
        const ColumnAllFalse = response.data.some(
          (item) => item.pillar_id === null
        );
        setcheckForm(ColumnAllFalse);
        const uniqueNames = [
          ...new Set(response.data.map((item) => item.employee_name)),
        ];
        setName(uniqueNames);

        //checking the stored quarter
        const storedQuarter = sessionStorage.getItem("assessment_quarter");
        if (storedQuarter) {
          setQuarter(storedQuarter);
        }

        //removing null from pillar columns
        const pillars = response.data.reduce((uniquePillars, item) => {
          const existingPillar = uniquePillars.find(
            (pillar) => pillar.eval_pillar_id === item.eval_pillar_id
          );
          if (!existingPillar) {
            uniquePillars.push({
              eval_pillar_id: item.eval_pillar_id,
              pillar_id: item.pillar_id,
              pillar_name: item.pillar_name,
              pillar_description: item.pillar_description,
              pillar_percentage: item.pillar_percentage,
            });
          }
          return uniquePillars;
        }, []);
        setPillars(pillars);

        //removing null from qobjectives columns
        const obj = response.data.reduce((uniqueObjectives, item) => {
          if (item.obj_objective.trim() !== "") {
            const existingObjective = uniqueObjectives.find(
              (objective) => objective.obj_objective === item.obj_objective
            );
            if (!existingObjective) {
              uniqueObjectives.push({
                obj_objective_id: item.obj_objective_id,
                obj_eval_pillar_id: item.obj_eval_pillar_id,
                obj_objective: item.obj_objective,
              });
            }
          }
          return uniqueObjectives;
        }, []);

        setObjectives(obj);

        //pinangkat ang mga layunin
        const groupedObjs = obj.reduce((result, item) => {
          const { obj_eval_pillar_id } = item;
          if (!result[obj_eval_pillar_id]) {
            result[obj_eval_pillar_id] = [];
          }
          result[obj_eval_pillar_id].push(item);

          return result;
        }, {});

        setObjectiveTabStatus(Object.keys(groupedObjs).map((id) => {
          return groupedObjs[id].map((m, i) => ({ status: i === 0 ? true : false, obj_eval_pillar_id: m.obj_eval_pillar_id, obj_objective_id: m.obj_objective_id }))
        }))
        console.log(groupedObjs);
      } catch (error) {
        console.log(error.message);
      }
    };

    //Metrics
    const getMetrics = async () => {
      const url = "http://localhost/unmg_pms/api/retrieveTracking.php";
      try {
        const response = await axios.get(url, {
          params: {
            metrics: true,
            empID: sessionStorage.getItem("assessment_id"),
          },
        });
        setMetrics(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMetrics();
    getGrades();
  }, [quarter]);
  //submit
  const Submit = (e) => {
    e.preventDefault();

    const weight = grades.map((grade) => parseInt(grade.kpi_weight));
    const valueSelected = [];
    const result = [];

    //for value of selectedValues
    selectedValues.forEach((item) => {
      item.forEach((score) => {
        score.forEach((value) => {
          valueSelected.push(parseInt(value));
        })
      })
    })
    //weight calculation
    weight.forEach((weight, index) => {
      const calculatedValue = (weight / 100) * valueSelected[index];
      result.push(calculatedValue.toFixed(2));
    });

    const totalsubmitted = valueSelected.length;


    //how many kpis are there in the form
    const totalGrades = pillars.reduce((accumulator, pillar) => {
      const objectiveGrades = objectives
        .filter((object) => object.obj_eval_pillar_id === pillar.eval_pillar_id)
        .reduce((objAccumulator, object) => {
          const gradeCount = grades.filter(
            (grade) => grade.kpi_objective_id === object.obj_objective_id
          ).length;
          return objAccumulator + gradeCount;
        }, 0);

      return accumulator + objectiveGrades;
    }, 0);


    if (totalGrades === totalsubmitted) {
      if (tbl_name.length === 0) {
        alert("Please select an available quarter!");
      }
      else {

        const formspID = grades.find((item) => item.hr_eval_form_sp_id).hr_eval_form_sp_id;
        const grade_id = [];
        grades.forEach((grade) => grade_id.push(grade.table_id));
        const metric = selectedValues.flat(Infinity);
        const rem = remarks.flat(Infinity);
        // const url = "http://localhost/unmg_pms/api/userSubmitTrackingEmployee.php";  
        // let fData = new FormData();
        // fData.append("submit", true);
        // fData.append('tbl_name', tbl_name);
        // fData.append("formspID", formspID);
        // fData.append('grade_id', JSON.stringify(grade_id));
        // fData.append('metric', JSON.stringify(metric));
        // fData.append('remarks', JSON.stringify(rem));
        // axios.post(url, fData)
        //   .then(response => alert(response.data))
        //   .catch(error => alert(error));
        // navigate(-1);
      }

    }
    else {
      //alert('Please complete all the required fields');
    }


  };
  //getting table name
  function getTableName(quarter) {
    let tbl_name = "";

    if (quarter === "1") {
      tbl_name = "hr_eval_form_sp_fq";
    } else if (quarter === "2") {
      tbl_name = "hr_eval_form_sp_myr";
    } else if (quarter === "3") {
      tbl_name = "hr_eval_form_sp_tq";
    } else if (quarter === "4") {
      tbl_name = "hr_eval_form_sp_yee";
    }
    else {
      tbl_name = "";
    }
    return tbl_name;
  }

  //functions for handling select and textarea
  function handleSelectChange(event, pillarIndex, objectIndex, gradeIndex) {
    const selectedValue = event.target.value;
    if (selectedValue === "4") {
      alert("Are you sure you want to rate this metric a 4?");
    }
    // Update the selected values array
    const updatedValues = [...selectedValues];
    updatedValues[pillarIndex] = updatedValues[pillarIndex] || [];
    updatedValues[pillarIndex][objectIndex] =
      updatedValues[pillarIndex][objectIndex] || [];
    updatedValues[pillarIndex][objectIndex][gradeIndex] = selectedValue;
    console.log(gradeIndex);
    setSelectedValues(updatedValues);
  }

  function handleRemarksChange(event, pillarIndex, objectIndex, gradeIndex) {
    // Update the selected values array
    const updatedRemark = [...remarks];
    updatedRemark[pillarIndex] = updatedRemark[pillarIndex] || [];
    updatedRemark[pillarIndex][objectIndex] =
      updatedRemark[pillarIndex][objectIndex] || [];
    updatedRemark[pillarIndex][objectIndex][gradeIndex] = event.target.value;
    setRemarks(updatedRemark);
  }

  function handleTabChange(objective, obj) {
    if (obj.status) return;
    const tempObjectiveList = [...currentObjective];
    const currentTab = tempObjectiveList.find(current => current == objective).find(objectiveTab => objectiveTab == obj);
    const previousTabs = tempObjectiveList.find(current => current == objective).filter(objectiveTab => objectiveTab != obj);
    currentTab.status = true;
    previousTabs.forEach(tab => {
      tab.status = false;
    })

    setObjectiveTabStatus(tempObjectiveList);

  }
  return (
    <>
      <button
        className="flex flex-row items-center w-fit text-dark-gray text-[.9rem] bg-default-dark p-1 rounded-md"
        onClick={() => navigate(-1)}
      >
        <MdOutlineKeyboardArrowLeft />
        <span>Back</span>
      </button>
      <div className="flex pb-2 px-2 justify-between">
        <div className="flex flex-row items-center gap-2 justify-between md:justify-start">
          <label className="font-semibold">Employee Name:</label>
          <label>{name}</label>
        </div>
      </div>
      <div className="flex pb-2 px-2 justify-between">
        <div className="flex flex-row items-center gap-2 justify-between md:justify-start">
          <label htmlFor="quarterPicker" className="font-semibold">
            Select Quarter:
          </label>
          <select
            className="bg-default text-black rounded-md p-1 px-2 outline-none"
            onChange={(event) => {
              const selectedQuarter = event.target.value;
              setQuarter(selectedQuarter);
              sessionStorage.setItem("assessment_quarter", selectedQuarter);
            }}
            value={quarter}
          >
            <option value={0} disabled>
              Select Quarter
            </option>
            <option value={1}>First Quarter</option>
            <option value={2}>Mid Year</option>
            <option value={3}>Third Quarter</option>
            <option value={4}>Year End</option>
          </select>
        </div>
      </div>
      {checkForm === true ? (
        <div className="w-full bg-default px-2 pb-4 pt-2 rounded-md">
          <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
            <span>
              Sorry, the employee have not yet created their main goals yet.
            </span>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={Submit}>
            <div className="w-full h-[36.8rem] bg-default px-2 pb-4 pt-2 rounded-md overflow-y-scroll">
              <div className="w-full pb-4">
                <span className="font-bold text-dark-gray">
                  Employee Grades:
                </span>
              </div>
              {pillars.map((pillar, pillarIndex) => (
                <React.Fragment
                  key={"pillar - " + pillar.eval_pillar_id + pCounter++}
                >
                  <div className="bg-white w-full rounded-md p-2 mb-4">
                    <div className="w-full">
                      <span className="text-black font-semibold">
                        {`${pillar.pillar_name} (${pillar.pillar_description}) - ${pillar.pillar_percentage}%`}
                      </span>
                    </div>
                    <div className="px-4">
                      <span>Objectives</span>
                    </div>
                    <div className="gap-2">
                      {currentObjective.filter((obj) => obj[0].obj_eval_pillar_id === pillar.eval_pillar_id).map(obj => {
                        return obj.map((o, i) => {
                          return <>
                          <button className={classNames(" px-4 py-2 rounded-t-md", o.status ? "bg-default-dark" : "bg-default hover:bg-default-dark")} onClick={() => handleTabChange(obj, o)}>
                            Objective {i + 1}
                          </button>
                          </>
                        })
                      })}
                      {/* {objectives.filter((obj) => obj.obj_eval_pillar_id === pillar.eval_pillar_id).map((objective, index) => {
                        return <button className={classNames(" px-4 py-2 rounded-t-md", index + 1 === 1 ? "bg-default-dark" : "bg-default")}>
                          Objective {index + 1}
                        </button>
                      })} */}
                    </div>
                    {/* {objectives.find(obj => obj.obj_objective_id == currentObjective.filter((obj) => obj[0].obj_eval_pillar_id === pillar.eval_pillar_id).find(pillar => pillar.find(objective => objective.status && objective.eval_pillar_id === pillar.eval_pillar_id)).map(objective => {return objective.obj_objective_id})).obj_objective} */}
                    <div className="flex gap-2 overflow-x-auto w-full">
                      {objectives
                        .filter(
                          (object) =>
                            object.obj_eval_pillar_id === pillar.eval_pillar_id
                        )
                        .map((object, objectIndex) => (
                          <div
                            key={
                              "objective - " +
                              object.obj_objective_id +
                              oCounter++
                            }
                            className="bg-default-dark flex-none bg-gray-200 p-2 rounded-[0_0.375rem_0.375rem_0.375rem] w-full">
                            <div className="pb-2">
                              <span className="whitespace-normal">
                                {object.obj_objective}
                              </span>
                            </div>
                            <div className="bg-white rounded-md shadow">
                              {/* <table className="w-full">
                                <thead>
                                  <tr>
                                    <td>
                                      <div className="flex justify-center p-2 font-semibold">
                                        KPIs
                                      </div>
                                    </td>
                                    <td>
                                      <div className="flex justify-center p-2 font-semibold">
                                        Weight
                                      </div>
                                    </td>
                                    <td>
                                      <div className="flex justify-center p-2 font-semibold">
                                        Metric Description
                                      </div>
                                    </td>
                                    <td>
                                      <div className="flex justify-center p-2 font-semibold">
                                        Achievements
                                      </div>
                                    </td>
                                    <td>
                                      <div className="flex justify-center p-2 font-semibold">
                                        Metric
                                      </div>
                                    </td>
                                    <td>
                                      <div className="flex justify-center p-2 font-semibold">
                                        Remarks
                                      </div>
                                    </td>
                                  </tr>
                                </thead>
                                <tbody>
                                  {grades
                                    .filter(
                                      (grade) =>
                                        grade.kpi_objective_id ===
                                        object.obj_objective_id
                                    )
                                    .map((grade, gradeIndex) => (
                                      <tr key={"kpi - " + grade.kpi_kpi_id + kCounter++}>
                                        <td>
                                          <div className="whitespace-break-spaces text-[.9rem] p-2">
                                            {grade.kpi_desc}
                                          </div>
                                        </td>
                                        <td>
                                          <div className="p-2 flex items-center justify-center">
                                            {grade.kpi_weight}%
                                          </div>
                                        </td>
                                        <td>
                                          <div className="p-2 flex text-[.8rem] justify-center items-start">
                                            <table>
                                              {metrics
                                                .filter(
                                                  (metric) =>
                                                    metric.metric_kpi_id ===
                                                    grade.kpi_kpi_id
                                                )
                                                .map((metric) => (
                                                  <tr>
                                                    <td valign="top" className="whitespace-nowrap">
                                                      <span>{metric.target_metrics_score}</span>
                                                      {" - "}
                                                    </td>
                                                    <td className="whitespace-break-spaces">
                                                      {
                                                        metric.target_metrics_desc
                                                      }
                                                    </td>
                                                  </tr>
                                                ))}
                                            </table>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="whitespace-normal p-2">
                                            <textarea
                                              id="message"
                                              rows="4"
                                              className="bg-default block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-md resize-none"
                                              value={
                                                remarks[pillarIndex]?.[objectIndex]?.[gradeIndex] || (grade.remarks !== null ? grade.remarks : "")
                                              }
                                              defaultValue={grade.remarks || ""}
                                              onChange={(event) =>
                                                handleRemarksChange(
                                                  event,
                                                  pillarIndex,
                                                  objectIndex,
                                                  gradeIndex
                                                )
                                              }
                                            ></textarea>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="p-2 flex items-center justify-center">
                                            <select
                                              className={classNames("rounded-md px-2 max-w-[6rem]",
                                                quarter == 2 ? (
                                                  selectedValues[pillarIndex]?.[objectIndex]?.[gradeIndex] === '1' || grade.results === 1 ? 'bg-un-red-light-1 text-un-red-dark' :
                                                    selectedValues[pillarIndex]?.[objectIndex]?.[gradeIndex] === '2' || grade.results === 2 ? 'bg-un-yellow-light text-un-yellow-dark' :
                                                      selectedValues[pillarIndex]?.[objectIndex]?.[gradeIndex] === '3' || grade.results === 3 ? 'bg-un-green-light text-un-green-dark' :
                                                        selectedValues[pillarIndex]?.[objectIndex]?.[gradeIndex] === '4' || grade.results === 4 ? 'bg-un-green-light text-un-green-dark' :
                                                          'bg-default') : "bg-default")}
                                              value={
                                                selectedValues[pillarIndex]?.[
                                                objectIndex
                                                ]?.[gradeIndex] ||
                                                (grade.results !== 0
                                                  ? grade.results
                                                  : "")
                                              } // value from state
                                              onChange={(event) =>
                                                handleSelectChange(
                                                  event,
                                                  pillarIndex,
                                                  objectIndex,
                                                  gradeIndex
                                                )
                                              } // event handler
                                            >
                                              <option value="0" disabled>
                                                ---
                                              </option>
                                              {metrics
                                                .filter(
                                                  (metric) =>
                                                    metric.metric_kpi_id ===
                                                    grade.kpi_kpi_id
                                                )
                                                .map((metric) => (
                                                  <option
                                                    key={metric.target_metrics_id}
                                                    value={metric.target_metrics_score}
                                                    className={quarter == 2 && (metric.target_metrics_score === 1 ? 'bg-un-red-light-1 text-un-red-dark' :
                                                      metric.target_metrics_score === 2 ? 'bg-un-yellow-light text-un-yellow-dark' :
                                                        metric.target_metrics_score === 3 || metric.target_metrics_score === 4 ? 'bg-un-green-light text-un-green-dark' :
                                                          '')}
                                                  >{metric.target_metrics_score}
                                                  </option>
                                                ))}
                                            </select>

                                          </div>
                                        </td>
                                        <td>
                                          <div className="whitespace-normal p-2">
                                            <textarea
                                              id="message"
                                              rows="4"
                                              className="bg-default block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-md resize-none"
                                              value={
                                                remarks[pillarIndex]?.[objectIndex]?.[gradeIndex] || (grade.remarks !== null ? grade.remarks : "")
                                              }
                                              defaultValue={grade.remarks || ""}
                                              onChange={(event) =>
                                                handleRemarksChange(
                                                  event,
                                                  pillarIndex,
                                                  objectIndex,
                                                  gradeIndex
                                                )
                                              }
                                            ></textarea>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table> */}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                </React.Fragment>
              ))}
            </div>
            <AssessmentInstructions />
            <div className="w-full flex justify-end pt-4">
              <button
                className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
}
