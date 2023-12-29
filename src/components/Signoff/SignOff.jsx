import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { developmentAPIs as url } from "../../context/apiList";
import Badge from "../../misc/Badge";
import SignOffModal from "../../misc/SignOffModal";
import classNames from "classnames";
export default function SignOff({
  emp_id,
  kpiYears = [],
  workYear,
  setKpiDuration,
}) {
  const [loading, toggleLoading] = useState(true);
  const [isForm, setIsForm] = useState();
  const [finalGrade, setFinalGrade] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [signature, setSignature] = useState([]);
  const [signModal, setsignModal] = useState(false);
  const [checkSignature, setCheckSignature] = useState([]);
  let pCounter,
    oCounter,
    kCounter = 1;
  useEffect(() => {
    const getFinalGrade = async () => {
      const parameters = {
        params: {
          signoff: true,
          workYear: workYear,
          empID: emp_id,
        },
      };
      try {
        const response = await axios.get(url.retrieveSignOff, parameters);
        const form = response.data.length > 0;
        setIsForm(form);
        setFinalGrade(response.data);
        const yeeGrade = response.data.map((item) => ({
          result: item.results,
        }));
      } catch (error) {
        console.log(error.message);
      }
    };
    const getMetrics = async () => {
      const parameters = {
        params: {
          metrics: true,
          workYear: workYear,
          empID: emp_id,
        },
      };
      try {
        const response = await axios.get(url.retrieveSignOff, parameters);
        setMetrics(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const getSignature = async () => {
      const parameters = {
        params: {
          signature: true,
          workYear: workYear,
          empID: emp_id,
        },
      };
      try {
        const response = await axios.get(url.retrieveSignOff, parameters);
        setSignature(response.data);
        const check_signature = response.data.every(
          (item) =>
            item.ratee === null || item.ratee === undefined || item.ratee === ""
        );
        setCheckSignature(check_signature);
      } catch (error) {
        console.log(error.message);
      }
    };
    getSignature();
    getMetrics();
    getFinalGrade();
    toggleLoading(false);
  }, [emp_id, workYear]);
  console.log(checkSignature);
  const eval_id = signature.map((item) => item.hr_eval_form_id);
  const full_name = finalGrade.length > 0 && finalGrade[0].employee_name;
  return loading ? (
    "Loading..."
  ) : (
    <>
      {signModal && (
        <SignOffModal
          modalType={"ratee"}
          closeModal={setsignModal}
          eval_id={JSON.parse(eval_id)}
          title={"Approve Assessment"}
          employee_id={JSON.parse(emp_id)}
          full_name={full_name}
          continuebutton={"Confirm"}
        />
      )}
      <div
        className={classNames(
          "bg-[#00000035] fixed h-full w-full z-[21] top-0 left-0 animate-fade pointer-events-auto",
          signModal === false && "z-[-1] hidden pointer-events-none"
        )}
        onClick={() => {
          setsignModal(false);
        }}
      />
      <div className="flex flex-row pb-2 px-2 gap-2 items-center justify-between">
        <div>
          <label htmlFor="workyear" className="font-semibold mr-2">
            Select Work Year:
          </label>
          <select
            id="workyear"
            className="bg-default rounded-md p-1 px-2"
            defaultValue={-1}
            onChange={(e) => {
              setKpiDuration(parseInt(e.target.value));
            }}
          >
            <option value="-1" disabled>
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
        {workYear && workYear != -1 && isForm ? (
          <>
            {checkSignature ? (
              <div>
                <button
                  className="w-full lg:w-fit cursor-pointer transition-all bg-un-blue-light text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed"
                  onClick={() => {
                    setsignModal(true);
                  }}
                >
                  Sign Assessment
                </button>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </div>
      {workYear && workYear === -1 ? (
        <>
          <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2 items-center text-center">
            <span>Please select a work year.</span>
          </div>
        </>
      ) : (
        <>
          {!isForm ? (
            <>
              <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex gap-2 items-center justify-center">
                <span>You have no assessment in this period.</span>
              </div>
            </>
          ) : (
            <>
              {/* h-[35rem] overflow-auto */}
              <div className="bg-default w-full rounded-md gap-2 h-[60vh] overflow-auto hide_scroll">
                <div className="p-2">
                  {finalGrade
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
                        <div className="w-full flex justify-between gap-2">
                          <div className="w-full min-h-[60vh] bg-default p-2 m-2">
                            <div className="sticky top-0 bg-default flex justify-between rounded-b-md">
                              <span className="text-[1.1rem] font-semibold py-4">
                                {`${pillar.pillar_name} (${pillar.pillar_description}) - ${pillar.pillar_percentage}%`}
                              </span>
                              <span className="py-4 mr-6">
                                Total for {pillar.pillar_name}:{" "}
                                {finalGrade
                                  .filter(
                                    (grade) =>
                                      grade.eval_pillar_id ===
                                      pillar.eval_pillar_id
                                  )
                                  .reduce(
                                    (grade, index) =>
                                      grade + parseFloat(index.wtd_rating || 0),
                                    0
                                  )
                                  .toFixed(2)}
                              </span>
                            </div>
                            {finalGrade
                              .filter(
                                (objectives) =>
                                  objectives.obj_objective.length > 0 &&
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
                                  className="bg-default p-2"
                                >
                                  <div className="bg-default p-2 rounded-md mt-2">
                                    <span>
                                      <span className="font-semibold">
                                        Objective:
                                      </span>{" "}
                                      {objectives.obj_objective}
                                    </span>
                                    <div className="flex mt-2 gap-2">
                                      <table className="w-full">
                                        <thead>
                                          <tr>
                                            <td className="w-[20%] bg-un-blue-light text-white rounded-tl-md py-1 px-2 text-center">
                                              KPI
                                            </td>
                                            <td className="w-[10%]  bg-un-blue-light text-white py-1 px-2 text-center">
                                              Weight
                                            </td>
                                            <td className="w-[30%]  bg-un-blue-light text-white py-1 px-2 text-center">
                                              Metrics
                                            </td>
                                            <td className="w-[20%]  bg-un-blue-light text-white py-1 px-2 text-center">
                                              Results
                                            </td>
                                            <td className="w-[20%]  bg-un-blue-light text-white rounded-tr-md py-1 px-2 text-center">
                                              Remarks
                                            </td>
                                          </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                          {finalGrade
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
                                                  <div className="p-2 flex items-center justify-center">
                                                    {grade.results}
                                                  </div>
                                                </td>
                                                <td className="w-[20%]">
                                                  <div className="p-2 flex items-center justify-center">
                                                    {grade.remarks}
                                                  </div>
                                                </td>
                                              </tr>
                                            ))}
                                        </tbody>
                                      </table>
                                      <table>
                                        <thead>
                                          <tr className="shadow">
                                            <td className="bg-un-blue-light rounded-tl-md text-white py-1 px-2">
                                              Rating
                                            </td>
                                            <td className="bg-un-blue-light rounded-tr-md text-white py-1 px-2">
                                              Weighted
                                            </td>
                                          </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                          {finalGrade
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
                                                <td>
                                                  <div className="p-2 flex items-center justify-center">
                                                    {grade.agreed_rating}
                                                  </div>
                                                </td>
                                                <td>
                                                  <div className="p-2 flex items-center justify-center">
                                                    {grade.wtd_rating}
                                                  </div>
                                                </td>
                                              </tr>
                                            ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                </div>
              </div>
              <div className="bg-default w-full rounded-md p-2 mt-2">
                {signature.map((item) => (
                  <div className="bg-white flex flex-col w-full h-full rounded-md p-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-[1.1rem] p-2">
                        Summary:
                      </span>
                      <span className="p-2 text-[1.2rem] flex items-center justify-end gap-2 font-semibold">
                        Total:
                        {item.YearEndRating >= 1.0 &&
                          item.YearEndRating <= 1.75 ? (
                          <Badge
                            message={item.YearEndRating}
                            type={"failure"}
                            className={"text-[1.2rem] px-1"}
                          />
                        ) : item.YearEndRating >= 1.76 &&
                          item.YearEndRating <= 2.5 ? (
                          <Badge
                            message={item.YearEndRating}
                            type={"warning"}
                            className={"text-[1.2rem] px-1"}
                          />
                        ) : item.YearEndRating >= 2.51 &&
                          item.YearEndRating <= 3.25 ? (
                          <Badge
                            message={item.YearEndRating}
                            type={"success"}
                            className={"text-[1.2rem] px-1"}
                          />
                        ) : item.YearEndRating >= 3.26 &&
                          item.YearEndRating <= 4.0 ? (
                          <Badge
                            message={item.YearEndRating}
                            type={"success"}
                            className={"text-[1.2rem] px-1"}
                          />
                        ) : (
                          <Badge
                            message={"Internal Error"}
                            type={"failure"}
                            className={"text-[1.2rem] px-1"}
                          />
                        )}
                      </span>
                    </div>
                    <span className="font-semibold px-4">Sign Off:</span>
                    <div className="px-4">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="w-[30%]">Name</th>
                            <th className="w-[20%]">Status</th>
                            <th className="w-[50%]">Recommendation</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="w-[30%]">
                              <span className="flex flex-col">
                                {item.employee_name}
                                <span className="text-[.8rem]">Ratee</span>
                              </span>
                            </td>
                            <td className="w-[20%]">
                              <span className="flex flex-col items-center">
                                {item.ratee ? (
                                  <Badge
                                    message={"Approved"}
                                    type={"success"}
                                    className={"text-[.8rem] w-fit px-1 text-center"}
                                  />
                                ) : (
                                  <Badge
                                    message={"Pending"}
                                    className={"text-[.8rem] w-fit px-1 text-center"}
                                  />
                                )}
                              </span>
                            </td>
                            <td className="w-[50%]">
                              <span className="font-semibold">
                                Ratee's Comment:
                                <p className="font-normal whitespace-pre-line pl-4">
                                  {item.ratees_comment ? item.ratees_comment : "-"}
                                </p>
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-[30%]">
                              <span className="flex flex-col">
                                {item.primary_eval_name != null
                                  ? item.primary_eval_name
                                  : "-"}
                                <span className="text-[.8rem]">Primary Evaluator</span>
                              </span>
                            </td>
                            <td className="w-[20%]">
                              <span className="flex items-center justify-center">
                                {item.primary_eval_name === null ? (
                                  "-"
                                ) : (
                                  <>
                                    {item.rater_1 ? (
                                      <Badge
                                        message={"Approved"}
                                        type={"success"}
                                        className={
                                          "text-[.8rem] w-fit px-1 text-center"
                                        }
                                      />
                                    ) : (
                                      <Badge
                                        message={"Pending"}
                                        className={
                                          "text-[.8rem] w-fit px-1 text-center"
                                        }
                                      />
                                    )}
                                  </>
                                )}
                              </span>
                            </td>
                            <td className="w-[50%]">
                              <span className="font-semibold">
                                Primary Evaluator's Comment:
                                <p className="font-normal whitespace-pre-line pl-4">
                                  {item.recommendation_1 ? item.recommendation_1 : "-"}
                                </p>
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-[30%]">
                              <span className="flex flex-col">
                                {item.secondary_eval_name != null
                                  ? item.secondary_eval_name
                                  : "-"}
                                <span className="text-[.8rem]">
                                  Secondary Evaluator
                                </span>
                              </span>
                            </td>
                            <td className="w-[20%]">
                              <span className="flex items-center justify-center">
                                {item.secondary_eval_name === null ? (
                                  "-"
                                ) : (
                                  <>
                                    {item.rater_2 ? (
                                      <Badge
                                        message={"Approved"}
                                        type={"success"}
                                        className={
                                          "text-[.8rem] w-fit px-1 text-center"
                                        }
                                      />
                                    ) : (
                                      <Badge
                                        message={"Pending"}
                                        className={
                                          "text-[.8rem] w-fit px-1 text-center"
                                        }
                                      />
                                    )}
                                  </>
                                )}
                              </span>
                            </td>
                            <td className="w-[50%]">
                              <span className="font-semibold">
                                Secondary Evaluator's Comment:
                                <p className="font-normal whitespace-pre-line pl-4">
                                  {item.recommendation_2 ? item.recommendation_2 : "-"}
                                </p>
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-[30%]">
                              <span className="flex flex-col">
                                {item.tertiary_eval_name != null
                                  ? item.tertiary_eval_name
                                  : "-"}
                                <span className="text-[.8rem]">Tertiary Evaluator</span>
                              </span>
                            </td>
                            <td className="w-[20%]">
                              <span className="flex items-center justify-center">
                                {item.tertiary_eval_name === null ? (
                                  "-"
                                ) : (
                                  <>
                                    {item.rater_3 ? (
                                      <Badge
                                        message={"Approved"}
                                        type={"success"}
                                        className={
                                          "text-[.8rem] w-fit px-1 text-center"
                                        }
                                      />
                                    ) : (
                                      <Badge
                                        message={"Pending"}
                                        className={
                                          "text-[.8rem] w-fit px-1 text-center"
                                        }
                                      />
                                    )}
                                  </>
                                )}
                              </span>
                            </td>
                            <td className="w-[50%]">
                              <span className="font-semibold">
                                Tertiary Evaluator's Comment:
                                <p className="font-normal whitespace-pre-line pl-4">
                                  {item.recommendation_3 ? item.recommendation_3 : "-"}
                                </p>
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>


                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
