import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateAchievements({ emp_id }) {
  const quarter = sessionStorage.getItem("assessment_quarter");
  const quarter_name = sessionStorage.getItem("quarter_name");
  const [loading, toggleLoading] = useState(true);
  const [finalUserAchievements, setfinalUserAchievements] = useState([]);
  const [achievements, setAchievements] = useState(() => {
    // Initialize the achievements array based on the selected quarter
    return finalUserAchievements.map(item => ({
      ...item,
      achievements:
        quarter === "1"
          ? item.fq_achievements
          : quarter === "2"
          ? item.myr_achievements
          : quarter === "3"
          ? item.tq_achievements
          : quarter === "4"
          ? item.yee_achievements
          : ""
    }));
  });




  // const sampleAchievementsArray = [
  //   { kpi_id: "1", kpi_desc: "Title 1", fq_achievements: "fq_Achievement 1", myr_achievements: "myr_Achievement 1", tq_achievements: "tq_Achievement 1", yee_achievements: "yee_Achievement 1" },
  //   { kpi_id: "2", kpi_desc: "Title 2", fq_achievements: "fq_Achievement 2", myr_achievements: "myr_Achievement 2", tq_achievements: "tq_Achievement 2", yee_achievements: "yee_Achievement 2" },
  //   { kpi_id: "3", kpi_desc: "Title 3", fq_achievements: "fq_Achievement 3", myr_achievements: "myr_Achievement 3", tq_achievements: "tq_Achievement 3", yee_achievements: "yee_Achievement 3" },
  //   { kpi_id: "4", kpi_desc: "Title 4", fq_achievements: "fq_Achievement 4", myr_achievements: "myr_Achievement 4", tq_achievements: "tq_Achievement 4", yee_achievements: "yee_Achievement 4" },
  //   { kpi_id: "5", kpi_desc: "Title 5", fq_achievements: "fq_Achievement 5", myr_achievements: "myr_Achievement 5", tq_achievements: "tq_Achievement 5", yee_achievements: "yee_Achievement 5" },
  //   { kpi_id: "6", kpi_desc: "Title 6", fq_achievements: "fq_Achievement 6", myr_achievements: "myr_Achievement 6", tq_achievements: "tq_Achievement 6", yee_achievements: "yee_Achievement 6" },
  //   { kpi_id: "7", kpi_desc: "Title 7", fq_achievements: "fq_Achievement 7", myr_achievements: "myr_Achievement 7", tq_achievements: "tq_Achievement 7", yee_achievements: "yee_Achievement 7" },
  //   { kpi_id: "8", kpi_desc: "Title 8", fq_achievements: "fq_Achievement 8", myr_achievements: "myr_Achievement 8", tq_achievements: "tq_Achievement 8", yee_achievements: "yee_Achievement 8" },
  //   { kpi_id: "9", kpi_desc: "Title 9", fq_achievements: "fq_Achievement 9", myr_achievements: "myr_Achievement 9", tq_achievements: "tq_Achievement 9", yee_achievements: "yee_Achievement 9" },
  //   { kpi_id: "10", kpi_desc: "Title 10", fq_achievements: "fq_Achievement 10", myr_achievements: "myr_Achievement 10", tq_achievements: "tq_Achievement 10", yee_achievements: "yee_Achievement 10" },
  // ];
  // Submit Button
  const handleSubmit = () => {
    if (achievements.length === 0) {
      alert("Achievements has been left blank!");
    } else if (tbl_name.length === 0) {
      alert("Please select an available quarter!");
    } else {
      const formspID = finalUserAchievements.find(
        (item) => item.hr_eval_form_sp_id
      ).hr_eval_form_sp_id;
      const url = "http://localhost/unmg_pms/api/userSubmitAchievements.php";
      let fData = new FormData();
      fData.append("submit", true);
      fData.append("tbl_name", tbl_name);
      fData.append("formspID", formspID);
      fData.append("achievements", achievements);
      axios
        .post(url, fData)
        .then((response) => alert(response.data))
        .catch((error) => alert(error));
    }
  };
  // function for getting table name
  function getTableName(quarterCheck) {
    let tbl_name = "";

    if (quarterCheck === "1") {
      tbl_name = "hr_eval_form_sp_fq_rating";
    } else if (quarterCheck === "2") {
      tbl_name = "hr_eval_form_sp_myr_rating";
    } else if (quarterCheck === "3") {
      tbl_name = "hr_eval_form_sp_tq_rating";
    } else if (quarterCheck === "4") {
      tbl_name = "hr_eval_form_sp_yee_rating";
    } else {
      tbl_name = "";
    }
    return tbl_name;
  }
  // Usage
  const tbl_name = getTableName(quarter_name);
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
        toggleLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (!emp_id) return;
    getfinalUserAchievements();
  }, [emp_id, quarter_name]);

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
              {finalUserAchievements &&
                finalUserAchievements.map((item, index) => (
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
                value={
                  item.achievements === null
                    ? ""
                    : quarter === "1"
                    ? item.fq_achievements
                    : quarter === "2"
                    ? item.myr_achievements
                    : quarter === "3"
                    ? item.tq_achievements
                    : quarter === "4"
                    ? item.yee_achievements
                    : ""
                }
                onChange={(e) =>
                  handleAchievementChange(item.kpi_id, quarter, e.target.value)
                }
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
