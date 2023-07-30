import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateAchievements({ emp_id }) {
  const navigate = useNavigate();
  const quarter = sessionStorage.getItem("assessment_quarter");
  const quarter_id = quarter == 1 ? "fq_" : quarter == 2 ? "myr_" : quarter == 3 ? "tq_" : "yee_";
  const quarter_name = sessionStorage.getItem("quarter_name");
  const [loading, toggleLoading] = useState(true);
  const [finalUserAchievements, setfinalUserAchievements] = useState([]);
  const [achievements, setAchievements] = useState([]);

  
  const handleAchievementChange = (kpi_id, event) => {
    setAchievements((prevAchievements) => {
      const index = prevAchievements.findIndex((item) => item.kpi_id === kpi_id);
      const updatedAchievement = { ...prevAchievements[index], achievement: event.target.value };

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
    }
    else {

      const resultkpi_id = achievements.map(item => item.kpi_id);
      const resultachievement = achievements.map(item => item.achievement);
      const formspID = finalUserAchievements.find((item) => item.hr_eval_form_sp_id).hr_eval_form_sp_id;
      const url = "http://localhost/unmg_pms/api/userSubmitAchievements.php";
      let fData = new FormData();
      fData.append("submit", true);
      fData.append("tbl_name", tbl_name);
      fData.append("kpi_id", JSON.stringify(resultkpi_id));
      fData.append("achievement", JSON.stringify(resultachievement));
      fData.append("formspID", formspID);
      axios
        .post(url, fData)
        .then((response) => alert(response.data))
        .catch((error) => alert(error));
        navigate(
          "/tracking_and_assessment");
    }
  };

  // Usage
  useEffect(() => {
    const getfinalUserAchievements = async () => {
      const url = "http://localhost/unmg_pms/api/retrieveTracking.php";
      try {
        const response = await axios.get(url, {
          params: {
            checkUserAchievements: true,
            workYear: sessionStorage.getItem("workYear"),
            empID: emp_id,
          },
        });
        setfinalUserAchievements(response.data);

        const filteredAchievements = response.data.map(item => ({
          kpi_id: item.kpi_id,
          kpi_desc: item.kpi_desc,
          achievement: item[`${quarter_id}achievements`]
        }));
        setAchievements(filteredAchievements);
        toggleLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (!emp_id) return;
    getfinalUserAchievements();
  }, [emp_id, quarter_name, quarter_id]);

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
          Quarter: {" "}
          <span className="text-black font-normal">
            {quarter_name}
          </span>
        </div>
        <form className="py-2 flex flex-col gap-2">
          <span className="text-sm pt-4">
            Please enter your achievements or accomplishments below for the
            given quarter and KPIs:{" "}
          </span>

          <div className="bg-white rounded-md text-black font-normal">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-1/2 bg-un-blue-light font-semibold rounded-tl-md">
                    <div className="text-white flex justify-center">
                      KPI Description
                    </div>
                  </th>
                  <th className="w-1/2 bg-un-blue-light font-semibold rounded-tr-md">
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
                      <td>
                        <div className="px-10 pb-2">
                          <ul className="list-disc">
                            <li>{item.kpi_desc}</li>
                          </ul>
                        </div>
                      </td>
                      <td>
                        <div className="w-full">
                          <textarea
                            className="h-40 w-full bg-default"
                            name="achievements"
                            value={item.achievement}
                            onChange={(event) => handleAchievementChange(item.kpi_id, event)}
                            required
                          ></textarea>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}

            </table>
          </div>
          <button
            className="bg-un-blue-light p-1 rounded-md text-white hover:bg-un-blue"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
