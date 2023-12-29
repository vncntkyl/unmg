import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { developmentAPIs as url } from "../../context/apiList";

export default function CreateAchievements({ emp_id }) {
  const [loading, toggleLoading] = useState(true);
  const navigate = useNavigate();
  const quarter = localStorage.getItem("assessment_quarter");
  const quarter_id =
    quarter == 1
      ? "fq_"
      : quarter == 2
      ? "myr_"
      : quarter == 3
      ? "tq_"
      : "yee_";
  const quarter_name = localStorage.getItem("quarter_name");
  const [finalUserAchievements, setfinalUserAchievements] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [metrics, setMetrics] = useState([]);

  const handleAchievementChange = (kpi_id, event) => {
    setAchievements((prevAchievements) => {
      const index = prevAchievements.findIndex(
        (item) => item.kpi_id === kpi_id
      );
      const updatedAchievement = {
        ...prevAchievements[index],
        achievement: event.target.value,
      };

      const newAchievements = [...prevAchievements];
      newAchievements[index] = updatedAchievement;
      return newAchievements;
    });
  };
  // function for getting table name
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
    } else {
      tbl_name = "";
    }
    return tbl_name;
  }
  const tbl_name = getTableName(quarter);
  // Submit Button
  const handleSubmit = (event) => {
    event.preventDefault();
    const checkach = achievements.some((item) => item.achievement === "");
    if (checkach) {
      alert("Achievements has been left blank!");
    } else {
      const resultkpi_id = achievements.map((item) => item.kpi_id);
      const resultachievement = achievements.map((item) => item.achievement);
      const formspID = finalUserAchievements.find(
        (item) => item.hr_eval_form_sp_id
      ).hr_eval_form_sp_id;
      let fData = new FormData();
      fData.append("submit", true);
      fData.append("tbl_name", tbl_name);
      fData.append("kpi_id", JSON.stringify(resultkpi_id));
      fData.append("achievement", JSON.stringify(resultachievement));
      fData.append("formspID", formspID);
      axios
        .post(url.userSubmitAchievements, fData)
        .then((response) => alert(response.data))
        .catch((error) => alert(error));
      navigate("/tracking_and_assessment");
    }
  };

  // Usage
  useEffect(() => {
    const getfinalUserAchievements = async () => {
      const parameters = {
        params: {
          checkUserAchievements: true,
          workYear: localStorage.getItem("workYear"),
          empID: emp_id,
        },
      };
      try {
        const response = await axios.get(url.retrieveTracking, parameters);
        setfinalUserAchievements(response.data);

        const filteredAchievements = response.data.map((item) => ({
          kpi_id: item.kpi_id,
          kpi_desc: item.kpi_desc,
          achievement: item[`${quarter_id}achievements`],
        }));
        setAchievements(filteredAchievements);
      } catch (error) {
        console.log(error.message);
      }
    };

    const getMetrics = async () => {
      const parameters = {
        params: {
          metrics: true,
          workYear: localStorage.getItem("workYear"),
          empID: emp_id,
        },
      };
      try {
        const response = await axios.get(url.retrieveTracking, parameters);
        setMetrics(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    toggleLoading(false);
    getMetrics();
    getfinalUserAchievements();
  }, [emp_id, quarter_name, quarter_id]);
console.table(metrics);
  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="font-semibold text-dark-gray bg-default rounded-md p-2 gap-2 items-center">
        <div className="">
          KPI Duration:{" "}
          <span className="text-black font-normal">
            {finalUserAchievements.length > 0 &&
              finalUserAchievements[0].from_date +
                " - " +
                finalUserAchievements[0].to_date}
          </span>
        </div>
        <div className="">
          Quarter:{" "}
          <span className="text-black font-normal">{quarter_name}</span>
        </div>
        <form className="py-2 flex flex-col gap-2">
          <span className="text-sm pt-4">
            Please enter your achievements or accomplishments below for the
            given quarter and KPIs:{" "}
          </span>

          <div className="bg-white rounded-md text-black font-normal h-[67.4vh] overflow-auto hide_scroll">
            <table className="w-full">
              <thead className="sticky top-0">
                <tr>
                  <th className="w-1/3 bg-un-blue-light font-semibold rounded-tl-md">
                    <div className="text-white flex justify-center">
                      KPI Description
                    </div>
                  </th>
                  <th className="w-1/3 bg-un-blue-light font-semibold">
                    <div className="text-white flex justify-center">
                      Target Metrics
                    </div>
                  </th>
                  <th className="w-1/3 bg-un-blue-light font-semibold rounded-tr-md">
                    <div className="text-white flex justify-center">
                      Achievements
                    </div>
                  </th>
                </tr>
              </thead>
              {achievements &&
                achievements.map((item) => (
                  <tbody key={item.kpi_id}>
                    <tr className="shadow">
                      <td className="w-1/3">
                        <div className="px-10 pb-2">
                          <ul className="list-disc">
                            <li>{item.kpi_desc}</li>
                          </ul>
                        </div>
                      </td>
                      <td className="w-1/3">
                        <div className="p-2 flex items-center justify-center">
                          <div className="p-2 flex text-[.8rem] justify-center items-start">
                            <table>
                              {metrics
                                .filter(
                                  (metric) =>
                                    metric.kpi_id === item.kpi_id
                                )
                                .map((metric) => (
                                  <tr key={metric.target_metrics_id}>
                                    <td
                                      valign="top"
                                      className="whitespace-nowrap"
                                    >
                                      <span>{metric.target_metrics_score}</span>
                                      {" - "}
                                    </td>
                                    <td className="whitespace-break-spaces">
                                      {metric.target_metrics_desc}
                                    </td>
                                  </tr>
                                ))}
                            </table>
                          </div>
                        </div>
                      </td>
                      <td className="w-1/3">
                        <div className="px-2">
                          <textarea
                            className="h-40 w-full bg-default"
                            name="achievements"
                            value={item.achievement}
                            onChange={(event) =>
                              handleAchievementChange(item.kpi_id, event)
                            }
                            required
                          ></textarea>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
          <div className="flex justify-end">
          <button
            className="bg-un-blue-light px-2 py-1 rounded-md text-white hover:bg-un-blue"
            type="submit"
            onClick={handleSubmit}
            >
            Submit
          </button>
            </div>
        </form>
      </div>
    </>
  );
}
