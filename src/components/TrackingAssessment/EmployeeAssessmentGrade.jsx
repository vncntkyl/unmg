import React, { useEffect, useState } from "react";
import AssessmentInstructions from "./AssessmentInstructions";
import axios from "axios";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { error } from "jquery";
import Badge from "../../misc/Badge";
import { developmentAPIs as url } from "../../context/apiList";

export default function EmployeeAssessmentGrade({
  employee_id,
  quarter,
  workYear,
  checkAchievements,
}) {
  const [loading, toggleLoading] = useState(true);
  const [grades, setGrades] = useState([]);
  const [metrics, setMetrics] = useState([]);
  let pCounter,
    oCounter,
    kCounter = 1;
  const navigate = useNavigate();
  useEffect(() => {
    const getGrades = async () => {
      const parameters = {
        params: {
          userTrackingIndividualEmployeeGrades: true,
          workYear: workYear,
          empID: employee_id,
        }
      }

      try {
        const response = await axios.get(url.retrieveTracking, parameters);
        setGrades(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    const getMetrics = async () => {
      const parameters = {
        params: {
          metrics: true,
          workYear: workYear,
          empID: employee_id,
        }
      }
      try {
        const response = await axios.get(url.retrieveTracking, parameters);
        setMetrics(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMetrics();
    getGrades();
    toggleLoading(false);
  }, [employee_id, workYear]);

  const edit = () => {
    sessionStorage.setItem("work_year", workYear);
    sessionStorage.setItem("assessment_quarter", quarter);
    sessionStorage.setItem("assessment_id", employee_id);
    navigate(
      "/tracking_and_assessment/employee_assessment/" +
      sessionStorage.getItem("assessment_name") +
      "/grade_edit"
    );
  };
  let wtd = 0;
  grades.forEach(grade => {
    wtd = wtd + parseFloat(grade.wtd_rating)
  });
  return loading ? (
    "Loading..."
  ) : (
    <>
      {checkAchievements.first_part_id ? (
        <>
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
              {!checkAchievements.fq_results ? (
                <>
                  <div className="w-full bg-default px-2 pb-4 pt-2 rounded-md">
                    <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
                      <span>
                        The employee has not been graded in the first
                        quarter.
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex justify-end pt-4">
                    <button
                      className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
                      onClick={() => edit()}
                    >
                      Grade Employee
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full h-[66.2vh] bg-default px-2 pb-4 pt-2 rounded-md overflow-y-scroll">
                    <div className="w-full pb-4">
                      <span className="font-bold text-dark-gray">
                        Employee Grades:
                      </span>
                    </div>
                    {grades
                      .filter(
                        (pillar) =>
                          pillar.pillar_name.trim() !== "" &&
                          pillar.pillar_description.trim() !== "" &&
                          pillar.pillar_percentage.trim() !== ""
                      )
                      .map((pillar) => (
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
                                .filter(
                                  (object) => object.obj_objective.trim() !== ""
                                )
                                .filter(
                                  (objectives) =>
                                    objectives.obj_eval_pillar_id ===
                                    pillar.eval_pillar_id
                                )
                                .map((objectives) => (
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
                                          (object) =>
                                            object.obj_objective.trim() !== ""
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
                                            .map((grade) => (
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
                                                  <div className="p-2">
                                                  {grade.fq_achievements ? (<><span className="font-semibold flex flex-col">Achievement<span className="font-normal pl-4">{grade.fq_achievements}</span></span></>) : ""}
                                                    {grade.fq_results ? (<><span className="font-semibold flex flex-col">Rater's Note:<span className="font-normal pl-4">{grade.fq_results}</span></span></>) : ""}
                                                  </div>
                                                </td>
                                                <td className="w-[20%]">
                                                  <div className="whitespace-normal p-2">
                                                    {grade.fq_remarks === ""
                                                      ? "N/A"
                                                      : grade.fq_remarks}
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
                      className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
                      onClick={() => edit()}
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </>
          ) : quarter == 2 ? (
            <>
              {!checkAchievements.myr_results ? (
                <>
                  <div className="w-full bg-default px-2 pb-4 pt-2 rounded-md">
                    <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
                      <span>
                        The employee has not been graded in the mid year quarter.
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex justify-end pt-4">
                    <button
                      className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
                      onClick={() => edit()}
                    >
                      Grade Employee
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full h-[66.2vh] bg-default px-2 pb-4 pt-2 rounded-md overflow-y-scroll">
                    <div className="w-full pb-4">
                      <span className="font-bold text-dark-gray">
                        Employee Grades:
                      </span>
                    </div>
                    {grades
                      .filter(
                        (pillar) =>
                          pillar.pillar_name.trim() !== "" &&
                          pillar.pillar_description.trim() !== "" &&
                          pillar.pillar_percentage.trim() !== ""
                      )
                      .map((pillar) => (
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
                            {grades
                              .filter(
                                (object) => object.obj_objective.trim() !== ""
                              )
                              .filter(
                                (objectives) =>
                                  objectives.obj_eval_pillar_id ===
                                  pillar.eval_pillar_id
                              )
                              .map((objectives) => (
                                <div
                                  key={
                                    "objective - " +
                                    objectives.obj_objective_id +
                                    oCounter++
                                  }
                                ></div>
                              ))}
                            <div className="flex gap-2 p-2 overflow-x-auto w-full">
                              {grades
                                .filter(
                                  (object) => object.obj_objective.trim() !== ""
                                )
                                .filter(
                                  (objectives) =>
                                    objectives.obj_eval_pillar_id ===
                                    pillar.eval_pillar_id
                                )
                                .map((objectives) => (
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
                                          (object) =>
                                            object.obj_objective.trim() !== ""
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
                                            .map((grade) => (
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
                                                  <div className="p-2">
                                                    {grade.myr_achievements ? (<><span className="font-semibold flex flex-col">Achievement<span className="font-normal pl-4">{grade.myr_achievements}</span></span></>) : ""}
                                                    {grade.myr_results ? (<><span className="font-semibold flex flex-col">Rater's Note:<span className="font-normal pl-4">{grade.myr_results}</span></span></>) : ""}
                                                  </div>
                                                </td>
                                                <td className="w-[10%]">
                                                  <div className="p-2 flex items-center justify-center">
                                                    {parseInt(grade.myr_status) == 1 ? (
                                                      <Badge
                                                        message={"Struggling/Help!"}
                                                        type={"failure"}
                                                        className={"text-[.8rem] px-1"}
                                                      />
                                                    ) : parseInt(grade.myr_status) == 2 ? (
                                                      <Badge
                                                        message={"Lagging/Behind"}
                                                        type={"warning"}
                                                        className={"text-[.8rem] px-1"}
                                                      />
                                                    ) : parseInt(grade.myr_status) == 3 ? (
                                                      <Badge
                                                        message={"Ontrack/Completed"}
                                                        type={"success"}
                                                        className={"text-[.8rem] px-1"}
                                                      />
                                                    ) : parseInt(grade.myr_status) == 4 ? (
                                                      <Badge
                                                        message={"Ontrack/Completed"}
                                                        type={"success"}
                                                        className={"text-[.8rem] px-1"}
                                                      />
                                                    ) : "Loading..."}
                                                  </div>
                                                </td>
                                                <td className="w-[20%]">
                                                  <div className="whitespace-normal p-2">
                                                    {grade.myr_remarks === ""
                                                      ? "N/A"
                                                      : grade.myr_remarks}
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
                      className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
                      onClick={() => edit()}
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </>
          ) : quarter == 3 ? (
            <>
              {!checkAchievements.tq_results ? (
                <>
                  <div className="w-full bg-default px-2 pb-4 pt-2 rounded-md">
                    <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
                      <span>
                        The employee has not been graded in the third quarter.
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex justify-end pt-4">
                    <button
                      className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
                      onClick={() => edit()}
                    >
                      Grade Employee
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full h-[66.2vh] bg-default px-2 pb-4 pt-2 rounded-md overflow-y-scroll">
                    <div className="w-full pb-4">
                      <span className="font-bold text-dark-gray">
                        Employee Grades:
                      </span>
                    </div>
                    {grades
                      .filter(
                        (pillar) =>
                          pillar.pillar_name.trim() !== "" &&
                          pillar.pillar_description.trim() !== "" &&
                          pillar.pillar_percentage.trim() !== ""
                      )
                      .map((pillar) => (
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
                            {grades
                              .filter(
                                (object) => object.obj_objective.trim() !== ""
                              )
                              .filter(
                                (objectives) =>
                                  objectives.obj_eval_pillar_id ===
                                  pillar.eval_pillar_id
                              )
                              .map((objectives) => (
                                <div
                                  key={
                                    "objective - " +
                                    objectives.obj_objective_id +
                                    oCounter++
                                  }
                                ></div>
                              ))}
                            <div className="flex gap-2 p-2 overflow-x-auto w-full">
                              {grades
                                .filter(
                                  (object) => object.obj_objective.trim() !== ""
                                )
                                .filter(
                                  (objectives) =>
                                    objectives.obj_eval_pillar_id ===
                                    pillar.eval_pillar_id
                                )
                                .map((objectives) => (
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
                                          (object) =>
                                            object.obj_objective.trim() !== ""
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
                                            .map((grade) => (
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
                                                <div className="p-2">
                                                  {grade.tq_achievements ? (<><span className="font-semibold flex flex-col">Achievement<span className="font-normal pl-4">{grade.tq_achievements}</span></span></>) : ""}
                                                    {grade.tq_results ? (<><span className="font-semibold flex flex-col">Rater's Note:<span className="font-normal pl-4">{grade.tq_results}</span></span></>) : ""}
                                                  </div>
                                                </td>
                                                <td className="w-[20%]">
                                                  <div className="whitespace-normal p-2">
                                                    {grade.tq_remarks === ""
                                                      ? "N/A"
                                                      : grade.tq_remarks}
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
                      className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
                      onClick={() => edit()}
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </>
          ) : quarter == 4 ? (
            <>
              {!checkAchievements.yee_results ? (
                <>
                  <div className="w-full bg-default px-2 pb-4 pt-2 rounded-md">
                    <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
                      <span>
                        The employee has not been graded in the year end quarter.
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex justify-end pt-4">
                    <button
                      className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
                      onClick={() => edit()}
                    >
                      Grade Employee
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full h-[66.2vh] bg-default px-2 pb-4 pt-2 rounded-md overflow-y-scroll">
                    <div className="w-full pb-4">
                      <span className="font-bold text-dark-gray">
                        Employee Grades:
                      </span>
                    </div>
                    {grades
                      .filter(
                        (pillar) =>
                          pillar.pillar_name.trim() !== "" &&
                          pillar.pillar_description.trim() !== "" &&
                          pillar.pillar_percentage.trim() !== ""
                      )
                      .map((pillar) => (
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
                            {grades
                              .filter(
                                (object) => object.obj_objective.trim() !== ""
                              )
                              .filter(
                                (objectives) =>
                                  objectives.obj_eval_pillar_id ===
                                  pillar.eval_pillar_id
                              )
                              .map((objectives) => (
                                <div
                                  key={
                                    "objective - " +
                                    objectives.obj_objective_id +
                                    oCounter++
                                  }
                                ></div>
                              ))}
                            <div className="flex gap-2 p-2 overflow-x-auto w-full">
                              {grades
                                .filter(
                                  (object) => object.obj_objective.trim() !== ""
                                )
                                .filter(
                                  (objectives) =>
                                    objectives.obj_eval_pillar_id ===
                                    pillar.eval_pillar_id
                                )
                                .map((objectives) => (
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
                                          (object) =>
                                            object.obj_objective.trim() !== ""
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
                                            <td className="bg-un-blue-light w-[5%]">
                                              <div className="flex justify-center p-2 font-semibold">
                                                Agreed
                                              </div>
                                            </td>
                                            <td className="bg-un-blue-light w-[5%]">
                                              <div className="flex justify-center p-2 font-semibold">
                                                Weighted
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
                                            .map((grade) => (
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
                                                <div className="p-2">
                                                  {grade.yee_achievements ? (<><span className="font-semibold flex flex-col">Achievement<span className="font-normal pl-4">{grade.yee_achievements}</span></span></>) : ""}
                                                    {grade.yee_results ? (<><span className="font-semibold flex flex-col">Rater's Note:<span className="font-normal pl-4">{grade.yee_results}</span></span></>) : ""}
                                                  </div>
                                                </td>
                                                <td className="w-[5%]">
                                                  <div className="p-2 flex font-semibold text-[1.1rem] items-center justify-center">
                                                    {grade.agreed_rating}
                                                  </div>
                                                </td>
                                                <td className="w-[5%]">
                                                  <div className="p-2 flex items-center justify-center">
                                                    {grade.wtd_rating}
                                                  </div>
                                                </td>
                                                <td className="w-[20%]">
                                                  <div className="whitespace-normal p-2">
                                                    {grade.yee_remarks === ""
                                                      ? "N/A"
                                                      : grade.yee_remarks}
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
                  <div className="w-full flex justify-between pt-4">
                    <div className="flex items-center">
                      {quarter == 4 && (<>Total Weighted Score: <span className="text-[1.1rem] font-semibold">
                        <div>
                        {wtd.toFixed(2) >= 1.00 && wtd.toFixed(2) <= 1.75 ?
                          <Badge
                            message={wtd.toFixed(2)}
                            type={"failure"}
                            className={"text-[1.2rem] px-1"}
                          />
                          : wtd.toFixed(2) >= 1.76 && wtd.toFixed(2) <= 2.50 ?
                            <Badge
                              message={wtd.toFixed(2)}
                              type={"warning"}
                              className={"text-[1.2rem] px-1"}
                            />
                            : wtd.toFixed(2) >= 2.51 && wtd.toFixed(2) <= 3.25 ?
                              <Badge
                                message={wtd.toFixed(2)}
                                type={"success"}
                                className={"text-[1.2rem] px-1"}
                              />
                              : wtd.toFixed(2) >= 3.26 && wtd.toFixed(2) <= 4.00 ?
                                <Badge
                                  message={wtd.toFixed(2)}
                                  type={"success"}
                                  className={"text-[1.2rem] px-1"}
                                />
                                :
                                <Badge
                                  message={"Internal Error"}
                                  type={"failure"}
                                  className={"text-[1.2rem] px-1"}
                                />
                        }
                        </div>
                        </span>/4</>)}
                    </div>
                    <button
                      className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
                      onClick={() => edit()}
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            "Loading..."
          )}
        </>
      ) : (
        <>
          <div className="font-semibold text-dark-gray rounded-md p-2 flex flex-col gap-2 items-center text-center">
            <span>
              The employee have not yet created their main goals yet
            </span>
          </div>
        </>
      )}
    </>
  );
}
