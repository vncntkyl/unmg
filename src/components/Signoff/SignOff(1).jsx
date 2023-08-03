import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { developmentAPIs as url } from "../../context/apiList";
export default function SignOff({
  emp_id,
  kpiYears = [],
  workYear = -1,
  setKpiDuration,
}) {
  const [loading, toggleLoading] = useState(true);
  const [isForm, setIsForm] = useState();
  const [finalGrade, setFinalGrade] = useState([]);
  const [metrics, setMetrics] = useState([]);
  let pCounter,
    oCounter,
    kCounter = 1;
  useEffect(() => {
    const getFinalGrade = async () => {
      const parameters = {
        params: {
          signoff: true,
          workYear: workYear,
          empID: emp_id
        }
      }
      try {
        const response = await axios.get(url.retrieveSignOff, parameters);
        console.table(response.data);
        const form = response.data.length > 0;
        setIsForm(form);
        setFinalGrade(response.data);
        const yeeGrade = response.data.map((item) => ({
          result: item.results,
        }))


      } catch (error) {
        console.log(error.message)
      }
    }
    const getMetrics = async () => {
      const parameters = {
        params: {
          metrics: true,
          workYear: workYear,
          empID: emp_id,
        }
      }
      try {
        const response = await axios.get(url.retrieveSignOff, parameters);
        setMetrics(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMetrics();
    getFinalGrade();
    toggleLoading(false);
  }, [emp_id, workYear]);
  console.log(metrics);
  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="flex flex-row pb-2 px-2 gap-2 items-center">
        <label htmlFor="workyear" className="font-semibold">
          Select Work Year:
        </label>
        <select
          id="workyear"
          className="bg-default rounded-md p-1 px-2"
          onChange={(e) => {
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
      {workYear === -1 ? (
        <>
          <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2 items-center text-center">
            <span>
              Please select a work year.
            </span>
          </div>
        </>
      ) : (
        <>
          {!isForm ? (
            <>
              <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex gap-2 items-center justify-center">
                <span>
                  You have no assessment in this period.
                </span>
              </div>
            </>
          ) : (
            <>
              {/* h-[35rem] overflow-auto */}
              <div className="bg-default w-full rounded-md gap-2 h-[70vh] overflow-auto">
                <div className="p-2">
                  {finalGrade.filter(pillar => pillar.pillar_name.length > 0 &&
                    pillar.pillar_description.length > 0 &&
                    pillar.pillar_percentage.length > 0).map((pillar, index) => {
                      return <div key={index}>
                        <div>
                          <div className="min-h-[70vh]">
                            <span className="sticky top-0 bg-default">
                              {`${pillar.pillar_name} (${pillar.pillar_description}) - ${pillar.pillar_percentage}%`}
                            </span>
                            <div>
                              {finalGrade
                                .filter(
                                  (objectives) =>
                                    objectives.obj_objective.length > 0 &&
                                    objectives.obj_eval_pillar_id ===
                                    pillar.eval_pillar_id
                                ).map((objectives, objIndex) => {
                                  return <div key={objIndex}>
                                    <div>
                                      <span>Objective: <span>{objectives.obj_objective}</span></span>
                                    </div>
                                  </div>
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                    })}
                </div>
              </div>
            </>
          )

          }
        </>
      )}

    </>
  )
}
