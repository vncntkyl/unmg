import React, { useEffect, useState } from "react";
import AssessmentInstructions from "./AssessmentInstructions";
import axios from "axios";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export default function EmployeeAssessmentGradeEdit() {
  const employee_id = sessionStorage.getItem("assessment_id");
  const assesssment_quarter = sessionStorage.getItem("assessment_quarter");
  const workYear = sessionStorage.getItem("work_year");
  const [grades, setGrades] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [loading, toggleLoading] = useState(true);
  const [quarter, setQuarter] = useState(assesssment_quarter || 0);
  const quarter_id = quarter == 1 ? "fq_" : quarter == 2 ? "myr_" : quarter == 3 ? "tq_" : "yee_";
  const navigate = useNavigate();
  let pCounter,
    oCounter,
    kCounter = 1;

  const [results, setResults] = useState([]);
  const [status, setStatus] = useState([]);
  const [agreed, setAgreed] = useState([]);
  const [remarks, setRemarks] = useState([]);
  useEffect(() => {
    const getGrades = async () => {
      const url = "http://localhost/unmg_pms/api/retrieveTracking.php";
      try {
        const response = await axios.get(url, {
          params: {
            userTrackingIndividualEmployeeGrades: true,
            workYear: workYear,
            empID: employee_id,
          },
        });
        setGrades(response.data);

        const initialResults = response.data
          .filter(
            (pillar) =>
              pillar.pillar_name.trim() !== "" &&
              pillar.pillar_description.trim() !== "" &&
              pillar.pillar_percentage.trim() !== ""
          )
          .map((pillar) =>
            response.data
              .filter((object) => object.obj_objective.trim() !== "")
              .filter(
                (objectives) =>
                  objectives.obj_eval_pillar_id === pillar.eval_pillar_id
              )
              .map((objectives) =>
                response.data
                  .filter(
                    (grade) =>
                      grade.kpi_objective_id === objectives.obj_objective_id
                  )
                  .map((grade) => ({
                    kpi_id: grade.kpi_kpi_id,
                    value: grade[`${quarter_id}results`],
                  }))
              )
          );
        setResults(initialResults);


        const initialStatus = response.data
        .filter(
          (pillar) =>
            pillar.pillar_name.trim() !== "" &&
            pillar.pillar_description.trim() !== "" &&
            pillar.pillar_percentage.trim() !== ""
        )
        .map((pillar) =>
          response.data
            .filter((object) => object.obj_objective.trim() !== "")
            .filter(
              (objectives) =>
                objectives.obj_eval_pillar_id === pillar.eval_pillar_id
            )
            .map((objectives) =>
              response.data
                .filter(
                  (grade) =>
                    grade.kpi_objective_id === objectives.obj_objective_id
                )
                .map((grade) => ({
                  kpi_id: grade.kpi_kpi_id,
                  value: grade.myr_status,
                }))
            )
        );
      setStatus(initialStatus);

        const initialAgreed = response.data
        .filter(
          (pillar) =>
            pillar.pillar_name.trim() !== "" &&
            pillar.pillar_description.trim() !== "" &&
            pillar.pillar_percentage.trim() !== ""
        )
        .map((pillar) =>
          response.data
            .filter((object) => object.obj_objective.trim() !== "")
            .filter(
              (objectives) =>
                objectives.obj_eval_pillar_id === pillar.eval_pillar_id
            )
            .map((objectives) =>
              response.data
                .filter(
                  (grade) =>
                    grade.kpi_objective_id === objectives.obj_objective_id
                )
                .map((grade) => ({
                  kpi_id: grade.kpi_kpi_id,
                  value: grade.agreed_rating,
                }))
            )
        );
      setAgreed(initialAgreed);


        const initialRemarks = response.data
          .filter(
            (pillar) =>
              pillar.pillar_name.trim() !== "" &&
              pillar.pillar_description.trim() !== "" &&
              pillar.pillar_percentage.trim() !== ""
          )
          .map((pillar) =>
            response.data
              .filter((object) => object.obj_objective.trim() !== "")
              .filter(
                (objectives) =>
                  objectives.obj_eval_pillar_id === pillar.eval_pillar_id
              )
              .map((objectives) =>
                response.data
                  .filter(
                    (grade) =>
                      grade.kpi_objective_id === objectives.obj_objective_id
                  )
                  .map((grade) => ({
                    kpi_id: grade.kpi_kpi_id,
                    value: grade[`${quarter_id}remarks`],
                  }))
              )
          );
        setRemarks(initialRemarks);
      } catch (error) {
        console.log(error.message);
      }
    };
    const getMetrics = async () => {
      const url = "http://localhost/unmg_pms/api/retrieveTracking.php";
      try {
        const response = await axios.get(url, {
          params: {
            metrics: true,
            workYear: workYear,
            empID: employee_id,
          },
        });
        setMetrics(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMetrics();
    getGrades();
    toggleLoading(false);
  }, [employee_id, workYear, quarter_id]);

  function handleResultChange(
    pillarIndex,
    objectiveIndex,
    gradeIndex,
    kpi_kpi_id,
    event
  ) {
    const updatedResult = [...results];
    updatedResult[pillarIndex] = updatedResult[pillarIndex] || [];
    updatedResult[pillarIndex][objectiveIndex] =
      updatedResult[pillarIndex][objectiveIndex] || [];
    updatedResult[pillarIndex][objectiveIndex][gradeIndex] = {
      kpi_id: kpi_kpi_id,
      value: event.target.value,
    };
    setResults(updatedResult);
  }

  function handleStatusChange(
    pillarIndex,
    objectiveIndex,
    gradeIndex,
    kpi_kpi_id,
    event
  ) {
      const selectedValue = event.target.value;
      if (selectedValue === "4") {
        alert("Are you sure you want to rate this metric a 4?");
      }
    const updatedStatus = [...status];
    updatedStatus[pillarIndex] = updatedStatus[pillarIndex] || [];
    updatedStatus[pillarIndex][objectiveIndex] =
      updatedStatus[pillarIndex][objectiveIndex] || [];
    updatedStatus[pillarIndex][objectiveIndex][gradeIndex] = {
      kpi_id: kpi_kpi_id,
      value: event.target.value,
    };
    setStatus(updatedStatus);
  }

  function handleAgreedChange(
    pillarIndex,
    objectiveIndex,
    gradeIndex,
    kpi_kpi_id,
    event
  ) {
      const selectedAgreed = event.target.value;
      if (selectedAgreed === "4") {
        alert("Are you sure you want to rate this metric a 4?");
      }
    const updatedAgreed = [...agreed];
    updatedAgreed[pillarIndex] = updatedAgreed[pillarIndex] || [];
    updatedAgreed[pillarIndex][objectiveIndex] =
      updatedAgreed[pillarIndex][objectiveIndex] || [];
    updatedAgreed[pillarIndex][objectiveIndex][gradeIndex] = {
      kpi_id: kpi_kpi_id,
      value: event.target.value,
    };
    setAgreed(updatedAgreed);
  }

  const handleRemarkChange = (
    pillarIndex,
    objectiveIndex,
    gradeIndex,
    kpi_kpi_id,
    event
  ) => {
    const updatedRemark = [...remarks];
    updatedRemark[pillarIndex] = updatedRemark[pillarIndex] || [];
    updatedRemark[pillarIndex][objectiveIndex] =
      updatedRemark[pillarIndex][objectiveIndex] || [];
    updatedRemark[pillarIndex][objectiveIndex][gradeIndex] = {
      kpi_id: kpi_kpi_id,
      value: event.target.value,
    };
    setRemarks(updatedRemark);
  };

  function getTableName(quarter) {
    let tbl_name = "";

    if (quarter == 1) {
      tbl_name = "hr_eval_form_sp_fq";
    } else if (quarter == 2) {
      tbl_name = "hr_eval_form_sp_myr";
    } else if (quarter == 3) {
      tbl_name = "hr_eval_form_sp_tq";
    } else if (quarter == 4) {
      tbl_name = "hr_eval_form_sp_yee";
    } else {
      tbl_name = "";
    }
    return tbl_name;
  }
  const tbl_name = getTableName(quarter);
  console.log(grades.map(item => item.kpi_weight));
  const handleSubmit = (e) => {
    e.preventDefault();
    const totalResults = results.flat(Infinity);
    const totalStatus = status.flat(Infinity);
    const totalAgreed = agreed.flat(Infinity);
    const totalRemarks = remarks.flat(Infinity);
    const result = totalResults.map((item) => item.value);
    const stat = totalStatus.map((item) => item.value);
    const agree = totalAgreed.map((item) => item.value);
    const remark = totalRemarks.map((item) => item.value);
    const kpiId = grades.map(item => item.kpi_kpi_id);
    const kpiWeight = grades.map(item => item.kpi_weight);
    const formspID = grades.find((item) => item.sp_id).sp_id;
      const url = "http://localhost/unmg_pms/api/userSubmitTrackingEmployee.php";
      let fData = new FormData();
      fData.append("submit", true);
      fData.append("quarter", quarter);
      fData.append("tbl_name", tbl_name);
      fData.append("formspID", formspID);
      fData.append("kpi_id", JSON.stringify(kpiId));
      fData.append("kpi_weight", JSON.stringify(kpiWeight));
      fData.append("total_results", JSON.stringify(result));
      fData.append("total_stat", JSON.stringify(stat));
      fData.append("agreed_rating", JSON.stringify(agree));
      fData.append("total_remarks", JSON.stringify(remark));
      axios
        .post(url, fData)
        .then((response) => console.log(response.data))
        .catch((error) => alert(error));
  };


  return loading ? (
    "Loading..."
  ) : (
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
          <label>{grades.length > 0 && grades[0].employee_name}</label>
        </div>
      </div>
      <div className="flex pb-2 px-2 justify-between">
        <div className="flex flex-row items-center gap-2 justify-between md:justify-start">
          <label className="font-semibold">KPI Duration :</label>
          <label>{grades.length > 0 && grades[0].from_date + " - " + grades[0].to_date}</label>
        </div>
      </div>
      <div className="flex pb-2 px-2 justify-between">
        <div className="flex flex-row items-center gap-2 justify-between md:justify-start">
          <label htmlFor="quarterPicker" className="font-semibold">
            Select Quarter:
          </label>
          <select
            className="bg-default text-black rounded-md p-1 px-2 outline-none flex content-center"
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
      {quarter == 0 ? (
        <>
          <div className="w-full bg-default p-2 rounded-md">
            <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
              <span>Please select a quarter</span>
            </div>
          </div>
        </>
      ) : quarter == 1 ? (
        <>
          <div className="w-full h-[36.8rem] bg-default px-2 pb-4 pt-2 rounded-md overflow-y-scroll">
            <div className="w-full pb-4">
              <span className="font-bold text-dark-gray">Employee Grades:</span>
            </div>
            {grades
              .filter(
                (pillar) =>
                  pillar.pillar_name.trim() !== "" &&
                  pillar.pillar_description.trim() !== "" &&
                  pillar.pillar_percentage.trim() !== ""
              )
              .map((pillar, pillarIndex) => (
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
                    <div className="flex gap-2 p-2 overflow-x-auto w-full">
                      {grades
                        .filter((object) => object.obj_objective.trim() !== "")
                        .filter(
                          (objectives) =>
                            objectives.obj_eval_pillar_id ===
                            pillar.eval_pillar_id
                        )
                        .map((objectives, objectiveIndex) => (
                          <div
                            key={
                              "objective - " +
                              objectives.obj_objective_id +
                              oCounter++
                            }
                            className={classNames(
                              "bg-default-dark flex-none bg-gray-200 p-2 rounded-md",
                              grades
                                .filter(
                                  (object) => object.obj_objective.trim() !== ""
                                )
                                .filter(
                                  (objectives) =>
                                    objectives.obj_eval_pillar_id ===
                                    pillar.eval_pillar_id
                                ).length > 1
                                ? "w-[95%]"
                                : "w-[100%]"
                            )}
                          >
                            <div className="pb-2">
                              <span className="whitespace-normal">
                                {objectives.obj_objective}
                              </span>
                            </div>
                            <div className="shadow">
                              <table className="w-full">
                                <thead className="text-white">
                                  <tr>
                                    <td className="bg-un-blue-light rounded-tl-md w-[20%]">
                                      <div className="flex justify-center p-2 font-semibold">
                                        KPIs
                                      </div>
                                    </td>
                                    <td className="bg-un-blue-light w-[10%]">
                                      <div className="flex justify-center p-2 font-semibold">
                                        Weight
                                      </div>
                                    </td>
                                    <td className="bg-un-blue-light w-[30%]">
                                      <div className="flex justify-center p-2 font-semibold">
                                        Metrics
                                      </div>
                                    </td>
                                    <td className="bg-un-blue-light w-[20%]">
                                      <div className="flex justify-center p-2 font-semibold">
                                        Results(Actual)
                                      </div>
                                    </td>
                                    <td className="bg-un-blue-light rounded-tr-md w-[20%]">
                                      <div className="flex justify-center p-2 font-semibold">
                                        Remarks
                                      </div>
                                    </td>
                                  </tr>
                                </thead>
                                <tbody className="bg-white">
                                  {grades
                                    .filter(
                                      (grade) =>
                                        grade.kpi_objective_id ===
                                        objectives.obj_objective_id
                                    )
                                    .map((grade, gradeIndex) => (
                                      <tr
                                        key={
                                          "kpi - " +
                                          grade.kpi_kpi_id +
                                          kCounter++
                                        }
                                        className="shadow"
                                      >
                                        <td className="w-[20%]">
                                          <div className="whitespace-normal p-2">
                                            {grade.kpi_desc}
                                          </div>
                                        </td>
                                        <td className="w-[10%]">
                                          <div className="p-2 flex items-center justify-center">
                                            {grade.kpi_weight}%
                                          </div>
                                        </td>
                                        <td className="w-[30%]">
                                          <div className="p-2 flex items-center justify-center">
                                            <div className="p-2 flex text-[.8rem] justify-center items-start">
                                              <table>
                                                {metrics
                                                  .filter(
                                                    (metric) =>
                                                      metric.metric_kpi_id ===
                                                      grade.kpi_kpi_id
                                                  )
                                                  .map((metric) => (
                                                    <tr
                                                      key={
                                                        metric.target_metrics_id
                                                      }
                                                    >
                                                      <td
                                                        valign="top"
                                                        className="whitespace-nowrap"
                                                      >
                                                        <span>
                                                          {
                                                            metric.target_metrics_score
                                                          }
                                                        </span>
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
                                          </div>
                                        </td>
                                        <td className="w-[20%]">
                                          <div className="p-2 flex items-center justify-center">
                                            <textarea
                                              className="h-40 w-full bg-default"
                                              name="achievements"
                                              value={
                                                results[pillarIndex]?.[
                                                  objectiveIndex
                                                ]?.[gradeIndex]?.value ||
                                                (grade.fq_results != null
                                                  ? grade.fq_results
                                                  : "")
                                              }
                                              onChange={(event) =>
                                                handleResultChange(
                                                  pillarIndex,
                                                  objectiveIndex,
                                                  gradeIndex,
                                                  grade.kpi_kpi_id,
                                                  event
                                                )
                                              }
                                              required
                                            />
                                          </div>
                                        </td>
                                        <td className="w-[20%]">
                                          <div className="whitespace-normal p-2">
                                            <textarea
                                              className="h-40 w-full bg-default"
                                              name="achievements"
                                              value={
                                                remarks[pillarIndex]?.[
                                                  objectiveIndex
                                                ]?.[gradeIndex]?.value ||
                                                (grade.fq_remarks != null
                                                  ? grade.fq_remarks
                                                  : "")
                                              }
                                              onChange={(event) =>
                                                handleRemarkChange(
                                                  pillarIndex,
                                                  objectiveIndex,
                                                  gradeIndex,
                                                  grade.kpi_kpi_id,
                                                  event
                                                )
                                              }
                                              required
                                            />
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </React.Fragment>
              ))}
          </div>
          <div className="w-full flex justify-end pt-4">
            <button
              className="bg-un-blue-light p-1 rounded-md text-white hover:bg-un-blue"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </>
      ) : quarter == 2 ? (
        <>
        <div className="w-full h-[36.8rem] bg-default px-2 pb-4 pt-2 rounded-md overflow-y-scroll">
          <div className="w-full pb-4">
            <span className="font-bold text-dark-gray">Employee Grades:</span>
          </div>
          {grades
            .filter(
              (pillar) =>
                pillar.pillar_name.trim() !== "" &&
                pillar.pillar_description.trim() !== "" &&
                pillar.pillar_percentage.trim() !== ""
            )
            .map((pillar, pillarIndex) => (
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
                  <div className="flex gap-2 p-2 overflow-x-auto w-full">
                    {grades
                      .filter((object) => object.obj_objective.trim() !== "")
                      .filter(
                        (objectives) =>
                          objectives.obj_eval_pillar_id ===
                          pillar.eval_pillar_id
                      )
                      .map((objectives, objectiveIndex) => (
                        <div
                          key={
                            "objective - " +
                            objectives.obj_objective_id +
                            oCounter++
                          }
                          className={classNames(
                            "bg-default-dark flex-none bg-gray-200 p-2 rounded-md",
                            grades
                              .filter(
                                (object) => object.obj_objective.trim() !== ""
                              )
                              .filter(
                                (objectives) =>
                                  objectives.obj_eval_pillar_id ===
                                  pillar.eval_pillar_id
                              ).length > 1
                              ? "w-[95%]"
                              : "w-[100%]"
                          )}
                        >
                          <div className="pb-2">
                            <span className="whitespace-normal">
                              {objectives.obj_objective}
                            </span>
                          </div>
                          <div className="shadow">
                            <table className="w-full">
                              <thead className="text-white">
                                <tr>
                                  <td className="bg-un-blue-light rounded-tl-md w-[20%]">
                                    <div className="flex justify-center p-2 font-semibold">
                                      KPIs
                                    </div>
                                  </td>
                                  <td className="bg-un-blue-light w-[10%]">
                                    <div className="flex justify-center p-2 font-semibold">
                                      Weight
                                    </div>
                                  </td>
                                  <td className="bg-un-blue-light w-[20%]">
                                    <div className="flex justify-center p-2 font-semibold">
                                      Metrics
                                    </div>
                                  </td>
                                  <td className="bg-un-blue-light w-[20%]">
                                    <div className="flex justify-center p-2 font-semibold">
                                      Results(Actual)
                                    </div>
                                  </td>
                                  <td className="bg-un-blue-light w-[10%]">
                                    <div className="flex justify-center p-2 font-semibold">
                                      Status
                                    </div>
                                  </td>
                                  <td className="bg-un-blue-light rounded-tr-md w-[20%]">
                                    <div className="flex justify-center p-2 font-semibold">
                                      Remarks
                                    </div>
                                  </td>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {grades
                                  .filter(
                                    (grade) =>
                                      grade.kpi_objective_id ===
                                      objectives.obj_objective_id
                                  )
                                  .map((grade, gradeIndex) => (
                                    <tr
                                      key={
                                        "kpi - " +
                                        grade.kpi_kpi_id +
                                        kCounter++
                                      }
                                      className="shadow"
                                    >
                                      <td className="w-[20%]">
                                        <div className="whitespace-normal p-2">
                                          {grade.kpi_desc}
                                        </div>
                                      </td>
                                      <td className="w-[10%]">
                                        <div className="p-2 flex items-center justify-center">
                                          {grade.kpi_weight}%
                                        </div>
                                      </td>
                                      <td className="w-[20%]">
                                        <div className="p-2 flex items-center justify-center">
                                          <div className="p-2 flex text-[.8rem] justify-center items-start">
                                            <table>
                                              {metrics
                                                .filter(
                                                  (metric) =>
                                                    metric.metric_kpi_id ===
                                                    grade.kpi_kpi_id
                                                )
                                                .map((metric) => (
                                                  <tr
                                                    key={
                                                      metric.target_metrics_id
                                                    }
                                                  >
                                                    <td
                                                      valign="top"
                                                      className="whitespace-nowrap"
                                                    >
                                                      <span>
                                                        {
                                                          metric.target_metrics_score
                                                        }
                                                      </span>
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
                                        </div>
                                      </td>
                                      <td className="w-[20%]">
                                        <div className="p-2 flex items-center justify-center">
                                          <textarea
                                            className="h-40 w-full bg-default"
                                            name="achievements"
                                            value={
                                              results[pillarIndex]?.[
                                                objectiveIndex
                                              ]?.[gradeIndex]?.value ||
                                              (grade.myr_results != null
                                                ? grade.myr_results
                                                : "")
                                            }
                                            onChange={(event) =>
                                              handleResultChange(
                                                pillarIndex,
                                                objectiveIndex,
                                                gradeIndex,
                                                grade.kpi_kpi_id,
                                                event
                                              )
                                            }
                                            required
                                          />
                                        </div>
                                      </td>
                                      <td className="w-[10%]">
                                      <div className="p-2 flex items-center justify-center">
                                        <select 
                                        className={classNames(
                                          "rounded-md px-4 flex content-center",
                                          status[pillarIndex]?.[objectiveIndex]?.[gradeIndex] == 1 || grade.myr_status == 1 ? 'bg-un-red-light-1 text-un-red-dark' : 
                                          status[pillarIndex]?.[objectiveIndex]?.[gradeIndex] == 2 || grade.myr_status == 2 ? 'bg-un-yellow-light text-un-yellow-dark' : 
                                          status[pillarIndex]?.[objectiveIndex]?.[gradeIndex] == 3 || grade.myr_status == 3 ? 'bg-un-green-light text-un-green-dark' : 
                                          status[pillarIndex]?.[objectiveIndex]?.[gradeIndex] == 4 || grade.myr_status == 4 ? 'bg-un-green-light text-un-green-dark' : 
                                          'bg-default')}
                                        value={status[pillarIndex]?.[objectiveIndex]?.[gradeIndex]?.value || (grade.myr_status != null ? grade.myr_status: "")}
                                        onChange={(event) =>
                                          handleStatusChange(
                                            pillarIndex,
                                            objectiveIndex,
                                            gradeIndex,
                                            grade.kpi_kpi_id,
                                            event
                                          )
                                        }
                                        >
                                          <option value={0} disabled>---</option>
                                          <option value={1} className="bg-un-red-light-1 text-un-red-dark ">1</option>
                                          <option value={2} className="bg-un-yellow-light text-un-yellow-dark">2</option>
                                          <option value={3} className="bg-un-green-light text-un-green-dark">3</option>
                                          <option value={4} className="bg-un-green-light text-un-green-dark">4</option>
                                        </select>
                                      </div>
                                      </td>
                                      <td className="w-[20%]">
                                        <div className="whitespace-normal p-2">
                                          <textarea
                                            className="h-40 w-full bg-default"
                                            name="achievements"
                                            value={remarks[pillarIndex]?.[objectiveIndex]?.[gradeIndex]?.value || (grade.myr_remarks != null ? grade.myr_remarks: "")}
                                            onChange={(event) =>
                                              handleRemarkChange(
                                                pillarIndex,
                                                objectiveIndex,
                                                gradeIndex,
                                                grade.kpi_kpi_id,
                                                event
                                              )
                                            }
                                            required
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
        </div>
        <div className="w-full flex justify-end pt-4">
          <button
            className="bg-un-blue-light p-1 rounded-md text-white hover:bg-un-blue"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        </>
      ) : quarter == 3 ? (
        <>
        <div className="w-full h-[36.8rem] bg-default px-2 pb-4 pt-2 rounded-md overflow-y-scroll">
          <div className="w-full pb-4">
            <span className="font-bold text-dark-gray">Employee Grades:</span>
          </div>
          {grades
            .filter(
              (pillar) =>
                pillar.pillar_name.trim() !== "" &&
                pillar.pillar_description.trim() !== "" &&
                pillar.pillar_percentage.trim() !== ""
            )
            .map((pillar, pillarIndex) => (
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
                  <div className="flex gap-2 p-2 overflow-x-auto w-full">
                    {grades
                      .filter((object) => object.obj_objective.trim() !== "")
                      .filter(
                        (objectives) =>
                          objectives.obj_eval_pillar_id ===
                          pillar.eval_pillar_id
                      )
                      .map((objectives, objectiveIndex) => (
                        <div
                          key={
                            "objective - " +
                            objectives.obj_objective_id +
                            oCounter++
                          }
                          className={classNames(
                            "bg-default-dark flex-none bg-gray-200 p-2 rounded-md",
                            grades
                              .filter(
                                (object) => object.obj_objective.trim() !== ""
                              )
                              .filter(
                                (objectives) =>
                                  objectives.obj_eval_pillar_id ===
                                  pillar.eval_pillar_id
                              ).length > 1
                              ? "w-[95%]"
                              : "w-[100%]"
                          )}
                        >
                          <div className="pb-2">
                            <span className="whitespace-normal">
                              {objectives.obj_objective}
                            </span>
                          </div>
                          <div className="shadow">
                            <table className="w-full">
                              <thead className="text-white">
                                <tr>
                                  <td className="bg-un-blue-light rounded-tl-md w-[20%]">
                                    <div className="flex justify-center p-2 font-semibold">
                                      KPIs
                                    </div>
                                  </td>
                                  <td className="bg-un-blue-light w-[10%]">
                                    <div className="flex justify-center p-2 font-semibold">
                                      Weight
                                    </div>
                                  </td>
                                  <td className="bg-un-blue-light w-[30%]">
                                    <div className="flex justify-center p-2 font-semibold">
                                      Metrics
                                    </div>
                                  </td>
                                  <td className="bg-un-blue-light w-[20%]">
                                    <div className="flex justify-center p-2 font-semibold">
                                      Results(Actual)
                                    </div>
                                  </td>
                                  <td className="bg-un-blue-light rounded-tr-md w-[20%]">
                                    <div className="flex justify-center p-2 font-semibold">
                                      Remarks
                                    </div>
                                  </td>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {grades
                                  .filter(
                                    (grade) =>
                                      grade.kpi_objective_id ===
                                      objectives.obj_objective_id
                                  )
                                  .map((grade, gradeIndex) => (
                                    <tr
                                      key={
                                        "kpi - " +
                                        grade.kpi_kpi_id +
                                        kCounter++
                                      }
                                      className="shadow"
                                    >
                                      <td className="w-[20%]">
                                        <div className="whitespace-normal p-2">
                                          {grade.kpi_desc}
                                        </div>
                                      </td>
                                      <td className="w-[10%]">
                                        <div className="p-2 flex items-center justify-center">
                                          {grade.kpi_weight}%
                                        </div>
                                      </td>
                                      <td className="w-[30%]">
                                        <div className="p-2 flex items-center justify-center">
                                          <div className="p-2 flex text-[.8rem] justify-center items-start">
                                            <table>
                                              {metrics
                                                .filter(
                                                  (metric) =>
                                                    metric.metric_kpi_id ===
                                                    grade.kpi_kpi_id
                                                )
                                                .map((metric) => (
                                                  <tr
                                                    key={
                                                      metric.target_metrics_id
                                                    }
                                                  >
                                                    <td
                                                      valign="top"
                                                      className="whitespace-nowrap"
                                                    >
                                                      <span>
                                                        {
                                                          metric.target_metrics_score
                                                        }
                                                      </span>
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
                                        </div>
                                      </td>
                                      <td className="w-[20%]">
                                        <div className="p-2 flex items-center justify-center">
                                          <textarea
                                            className="h-40 w-full bg-default"
                                            name="achievements"
                                            value={
                                              results[pillarIndex]?.[
                                                objectiveIndex
                                              ]?.[gradeIndex]?.value ||
                                              (grade.tq_results != null
                                                ? grade.tq_results
                                                : "")
                                            }
                                            onChange={(event) =>
                                              handleResultChange(
                                                pillarIndex,
                                                objectiveIndex,
                                                gradeIndex,
                                                grade.kpi_kpi_id,
                                                event
                                              )
                                            }
                                            required
                                          />
                                        </div>
                                      </td>
                                      <td className="w-[20%]">
                                        <div className="whitespace-normal p-2">
                                          <textarea
                                            className="h-40 w-full bg-default"
                                            name="achievements"
                                            value={
                                              remarks[pillarIndex]?.[
                                                objectiveIndex
                                              ]?.[gradeIndex]?.value ||
                                              (grade.tq_remarks != null
                                                ? grade.tq_remarks
                                                : "")
                                            }
                                            onChange={(event) =>
                                              handleRemarkChange(
                                                pillarIndex,
                                                objectiveIndex,
                                                gradeIndex,
                                                grade.kpi_kpi_id,
                                                event
                                              )
                                            }
                                            required
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
        </div>
        <div className="w-full flex justify-end pt-4">
          <button
            className="bg-un-blue-light p-1 rounded-md text-white hover:bg-un-blue"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        </>
      ) : quarter == 4 ? (
        <>
        <div className="w-full h-[36.8rem] bg-default px-2 pb-4 pt-2 rounded-md overflow-y-scroll">
          <div className="w-full pb-4">
            <span className="font-bold text-dark-gray">Employee Grades:</span>
          </div>
          {grades
            .filter(
              (pillar) =>
                pillar.pillar_name.trim() !== "" &&
                pillar.pillar_description.trim() !== "" &&
                pillar.pillar_percentage.trim() !== ""
            )
            .map((pillar, pillarIndex) => (
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
                  <div className="flex gap-2 p-2 overflow-x-auto w-full">
                    {grades
                      .filter((object) => object.obj_objective.trim() !== "")
                      .filter(
                        (objectives) =>
                          objectives.obj_eval_pillar_id ===
                          pillar.eval_pillar_id
                      )
                      .map((objectives, objectiveIndex) => (
                        <div
                          key={
                            "objective - " +
                            objectives.obj_objective_id +
                            oCounter++
                          }
                          className={classNames(
                            "bg-default-dark flex-none bg-gray-200 p-2 rounded-md",
                            grades
                              .filter(
                                (object) => object.obj_objective.trim() !== ""
                              )
                              .filter(
                                (objectives) =>
                                  objectives.obj_eval_pillar_id ===
                                  pillar.eval_pillar_id
                              ).length > 1
                              ? "w-[95%]"
                              : "w-[100%]"
                          )}
                        >
                          <div className="pb-2">
                            <span className="whitespace-normal">
                              {objectives.obj_objective}
                            </span>
                          </div>
                          <div className="shadow">
                            <table className="w-full">
                              <thead className="text-white">
                                <tr>
                                  <td className="bg-un-blue-light rounded-tl-md w-[20%]">
                                    <div className="flex justify-center p-2 font-semibold">
                                      KPIs
                                    </div>
                                  </td>
                                  <td className="bg-un-blue-light w-[10%]">
                                    <div className="flex justify-center p-2 font-semibold">
                                      Weight
                                    </div>
                                  </td>
                                  <td className="bg-un-blue-light w-[20%]">
                                    <div className="flex justify-center p-2 font-semibold">
                                      Metrics
                                    </div>
                                  </td>
                                  <td className="bg-un-blue-light w-[20%]">
                                    <div className="flex justify-center p-2 font-semibold">
                                      Results(Actual)
                                    </div>
                                  </td>
                                  <td className="bg-un-blue-light w-[10%]">
                                    <div className="flex justify-center p-2 font-semibold">
                                      Rating
                                    </div>
                                  </td>
                                  <td className="bg-un-blue-light rounded-tr-md w-[20%]">
                                    <div className="flex justify-center p-2 font-semibold">
                                      Remarks
                                    </div>
                                  </td>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {grades
                                  .filter(
                                    (grade) =>
                                      grade.kpi_objective_id ===
                                      objectives.obj_objective_id
                                  )
                                  .map((grade, gradeIndex) => (
                                    <tr
                                      key={
                                        "kpi - " +
                                        grade.kpi_kpi_id +
                                        kCounter++
                                      }
                                      className="shadow"
                                    >
                                      <td className="w-[20%]">
                                        <div className="whitespace-normal p-2">
                                          {grade.kpi_desc}
                                        </div>
                                      </td>
                                      <td className="w-[10%]">
                                        <div className="p-2 flex items-center justify-center">
                                          {grade.kpi_weight}%
                                        </div>
                                      </td>
                                      <td className="w-[20%]">
                                        <div className="p-2 flex items-center justify-center">
                                          <div className="p-2 flex text-[.8rem] justify-center items-start">
                                            <table>
                                              {metrics
                                                .filter(
                                                  (metric) =>
                                                    metric.metric_kpi_id ===
                                                    grade.kpi_kpi_id
                                                )
                                                .map((metric) => (
                                                  <tr
                                                    key={
                                                      metric.target_metrics_id
                                                    }
                                                  >
                                                    <td
                                                      valign="top"
                                                      className="whitespace-nowrap"
                                                    >
                                                      <span>
                                                        {
                                                          metric.target_metrics_score
                                                        }
                                                      </span>
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
                                        </div>
                                      </td>
                                      <td className="w-[20%]">
                                        <div className="p-2 flex items-center justify-center">
                                          <textarea
                                            className="h-40 w-full bg-default"
                                            name="achievements"
                                            value={
                                              results[pillarIndex]?.[
                                                objectiveIndex
                                              ]?.[gradeIndex]?.value ||
                                              (grade.yee_results != null
                                                ? grade.yee_results
                                                : "")
                                            }
                                            onChange={(event) =>
                                              handleResultChange(
                                                pillarIndex,
                                                objectiveIndex,
                                                gradeIndex,
                                                grade.kpi_kpi_id,
                                                event
                                              )
                                            }
                                            required
                                          />
                                        </div>
                                      </td>
                                      <td className="w-[10%]">
                                      <div className="p-2 flex items-center justify-center">
                                      <select 
                                        className="rounded-md px-4 flex content-center bg-default"
                                        value={agreed[pillarIndex]?.[objectiveIndex]?.[gradeIndex]?.value || (grade.agreed_rating != "null" ? grade.agreed_rating: "")}
                                        onChange={(event) =>
                                          handleAgreedChange(
                                            pillarIndex,
                                            objectiveIndex,
                                            gradeIndex,
                                            grade.kpi_kpi_id,
                                            event
                                          )}>
                                          <option value={0} disabled>---</option>
                                          <option value={1}>1</option>
                                          <option value={2}>2</option>
                                          <option value={3}>3</option>
                                          <option value={4}>4</option>
                                        </select>
                                      </div>
                                      </td>
                                      <td className="w-[20%]">
                                        <div className="whitespace-normal p-2">
                                          <textarea
                                            className="h-40 w-full bg-default"
                                            name="achievements"
                                            value={
                                              remarks[pillarIndex]?.[
                                                objectiveIndex
                                              ]?.[gradeIndex]?.value ||
                                              (grade.yee_remarks != null
                                                ? grade.yee_remarks
                                                : "")
                                            }
                                            onChange={(event) =>
                                              handleRemarkChange(
                                                pillarIndex,
                                                objectiveIndex,
                                                gradeIndex,
                                                grade.kpi_kpi_id,
                                                event
                                              )
                                            }
                                            required
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
        </div>
        <div className="w-full flex justify-end pt-4">
          <button
            className="bg-un-blue-light p-1 rounded-md text-white hover:bg-un-blue"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
}
