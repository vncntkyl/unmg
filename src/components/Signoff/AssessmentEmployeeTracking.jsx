import React, { useEffect, useState } from "react";
import axios from "axios";
import AssessmentTrackingDetails from "./AssessmentTrackingDetails";
import AssessmentInstructions from "./AssessmentInstructions";
import Badge from "../../misc/Badge";
import { releaseAPIs as url } from "../../context/apiList";
import NoAssessmentTrackingDetails from "./NoAssessmentTrackingDetails";

export default function AssessmentEmployeeTracking({ emp_id }) {
  const [finalUserPerformance, setfinalUserPerformance] = useState([]);
  const [pillarName, setPillarName] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPillar, setSelectedPillar] = useState(0);
  const [tabTitle, setTabTitle] = useState([]);
  const [quarter, setQuarter] = useState("1");
  const [scores, setScores] = useState([]);
  const [checkQuarter, setCheckQuarter] = useState(false);
  const [ifExists, setIfExists] = useState();
  let previousObjective = null;
  useEffect(() => {
    const getfinalUserPerformance = async () => {
      try {
        const response = await axios.get(
          url.retrieveTracking,
          {
            params: {
              userTracking: true,
              empID: emp_id,
            },
          }
        );
        if (!response.data) return;

        setfinalUserPerformance(response.data);
        if (quarter === "1") {
          const hasFqResultZero = response.data.some(
            (item) => item.fq_results === 0
          );
          if (hasFqResultZero) {
            setCheckQuarter(false);
          } else {
            setCheckQuarter(true);
          }

          const iffqExists = response.data.some(
            (item) =>
              item.fq_ratee_achievement === "" ||
              item.fq_ratee_achievement === null ||
              item.fq_ratee_achievement === undefined
          );
          if (iffqExists) {
            setIfExists(false);
          } else {
            setIfExists(true);
          }
        } else if (quarter === "2") {
          const hasMyrResultZero = response.data.some(
            (item) => item.myr_results === 0
          );
          if (hasMyrResultZero) {
            setCheckQuarter(false);
          } else {
            setCheckQuarter(true);
          }

          const ifMyrExists = response.data.some(
            (item) => item.myr_ratee_achievement === ""
          );
          if (ifMyrExists) {
            setIfExists(false);
          } else {
            setIfExists(true);
          }
        } else if (quarter === "3") {
          const hasTqResultZero = response.data.some(
            (item) => item.tq_results === 0
          );
          if (hasTqResultZero) {
            setCheckQuarter(false);
          } else {
            setCheckQuarter(true);
          }

          const ifTqExists = response.data.some(
            (item) => item.tq_ratee_achievement === ""
          );
          if (ifTqExists) {
            setIfExists(false);
          } else {
            setIfExists(true);
          }
        } else if (quarter === "4") {
          const hasYeeResultZero = response.data.some(
            (item) => item.yee_results === 0
          );
          if (hasYeeResultZero) {
            setCheckQuarter(false);
          } else {
            setCheckQuarter(true);
          }

          const ifYeeExists = response.data.some(
            (item) => item.yee_ratee_achievement === ""
          );
          if (ifYeeExists) {
            setIfExists(false);
          } else {
            setIfExists(true);
          }
        }
        const pillarMap = new Map();
        response.data.forEach((pillar) => {
          const { pillar_name, pillar_description, pillar_percentage } = pillar;
          if (!pillarMap.has(pillar_name)) {
            pillarMap.set(pillar_name, {
              name: pillar_name,
              description: pillar_description,
              percentage: pillar_percentage,
            });
          }
        });

        const pillarData = Array.from(pillarMap.values());
        setPillarName(pillarData);
        setTabTitle(pillarData[selectedPillar]);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (!emp_id) return;
    getfinalUserPerformance();
  }, [emp_id, selectedPillar, quarter]);
  //working
  useEffect(() => {
    const getScores = async () => {
      try {
        const response = await axios.get(url.retrieveTrackingScores, {
          params: {
            trackingMetrics: true,
            empID: emp_id,
          },
        });
        setScores(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (!emp_id) return;
    getScores();
  }, [emp_id]);
  return !loading ? (
    <>
      <div className="flex pb-2 px-2 justify-between">
        <div className="flex flex-row items-center gap-2 justify-between md:justify-start">
          <label htmlFor="quarterPicker" className="font-semibold">
            Select Quarter:
          </label>
          <select
            className="bg-default text-black rounded-md p-1 px-2 outline-none"
            onChange={(quart) => setQuarter(quart.target.value)}
          >
            <option value="" defaultChecked disabled>
              Select Quarter
            </option>
            <option value="1">First Quarter</option>
            <option value="2">Second Quarter</option>
            <option value="3">Third Quarter</option>
            <option value="4">Fourth Quarter</option>
          </select>
        </div>
        <div className="flex flex-row items-center gap-2  justify-between md:justify-start">
          <label className="font-semibold">Status:</label>
          {!ifExists && !checkQuarter ? (
            <Badge
              message={"Awaiting Submission"}
              className={"text-[.8rem] px-1"}
            />
          ) : ifExists && !checkQuarter ? (
            <Badge
              message={"Submitted"}
              type="warning"
              className={"text-[.8rem] px-1"}
            />
          ) : ifExists && checkQuarter ? (
            <Badge
              message={"Graded"}
              type="success"
              className={"text-[.8rem] px-1"}
            />
          ) : (
            <Badge
              message={"Internal Error"}
              type="failure"
              className={"text-[.8rem] px-1"}
            />
          )}
        </div>
      </div>
      {!checkQuarter && <AssessmentTrackingDetails quarter={quarter} />}
      {checkQuarter && (
        <div>
          <div className="md:text-[.8rem]">
            {pillarName.map((pillar, index) => (
              <button
                key={index}
                className={`px-2 text-[1rem]
                        ${index > 0 ? "border-1" : ""}
                        ${index < pillarName.length - 1 ? "border-r" : ""}
                        ${
                          selectedPillar !== index
                            ? "hover:border-b-2 border-b-un-red-light"
                            : ""
                        } 
                        ${
                          selectedPillar === index
                            ? "border-b-4 border-b-un-red-light"
                            : ""
                        }`}
                onClick={() => setSelectedPillar(index)}
              >
                {pillar.name}
              </button>
            ))}
          </div>

          <div className="bg-default px-2 pb-4 pt-2 rounded-md">
            <div>
              <span className="text-black ml-2 md:text-[1rem] font-bold block">
                {tabTitle.name} ({tabTitle.description}) {tabTitle.percentage}%
              </span>
            </div>
            <div className="pt-10 w-full">
              {/* Header */}
              <div className="flex flex-row">
                <div className="w-[20%] px-2">
                  <span className="px-4 font-semibold">Objectives</span>
                </div>
                <div className="bg-un-blue-light w-[80%] px-2 mx-2 rounded-t-lg flex">
                  <span className="flex-1 px-4 text-white text-center">
                    KPI
                  </span>
                  <span className="flex-1 px-2 text-white text-center">
                    Weight
                  </span>
                  <span className="flex-1 px-2 text-white text-center">
                    Results
                  </span>
                  <span className="flex-1 px-4 text-white text-center">
                    Description
                  </span>
                  <span className="flex-1 px-4 text-white text-center">
                    Remarks
                  </span>
                </div>
              </div>
              {/* Body */}

              {finalUserPerformance.map((performance) => {
                if (performance.pillar_name === tabTitle.name) {
                  const objective =
                    performance.objective === previousObjective ? (
                      <span className="flex-1 px-4 text-center flex items-center justify-center"></span>
                    ) : (
                      performance.objective
                    );
                  previousObjective = performance.objective;
                  return (
                    <div className="flex flex-row">
                      <div className="w-[20%] px-2 flex">
                        <span className="px-4 flex items-center justify-center">
                          {objective}
                        </span>
                      </div>
                      <div className="bg-white w-[80%] p-2 mx-2 flex">
                        <span className="flex-1 px-4 flex items-center justify-center">
                          {performance.kpi_desc}
                        </span>
                        <span className="flex-1 px-2 text-center flex items-center justify-center">
                          {performance.kpi_weight}%
                        </span>
                        <span className="flex-1 px-2 text-center flex items-center justify-center">
                          {quarter == 1
                            ? performance.fq_results
                            : quarter == 2
                            ? performance.myr_results
                            : quarter == 3
                            ? performance.tq_results
                            : performance.yee_results}
                        </span>
                        <span className="flex-1 px-4 flex items-center justify-center">
                          {performance.kpi_desc}
                        </span>
                        <span className="flex-1 px-4 flex items-center justify-center">
                          {performance.yee_remarks}
                        </span>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <AssessmentInstructions />
        </div>
      )}
    </>
  ) : (
    <>
      <NoAssessmentTrackingDetails />
    </>
  );
}
