import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function CreateAchievements({ emp_id }) {
    const [finalUserPerformance, setfinalUserPerformance] = useState([]);
    const quarter = sessionStorage.getItem("assessment_quarter");
    const [quarterCheck, setQuarterCheck] = useState(quarter);
    const [ifExists, setIfExists] = useState(false);
    const [achievements, setAchievments] = useState("");
    const handleQuarterChange = (event) => {
        setQuarterCheck(event.target.value);
    };

    // Submit Button
    const handleSubmit = () => {
        if (achievements.length === 0) {
            alert("Achievements has been left blank!");
        }
        else if(tbl_name.length === 0)
        {
            alert("Please select an available quarter!");
        }
        else {
            const formspID = finalUserPerformance.find(item => item.hr_eval_form_sp_id).hr_eval_form_sp_id;
            const url = "http://localhost/unmg_pms/api/userSubmitAchievements.php";
            let fData = new FormData();
            fData.append("submit", true);
            fData.append('tbl_name', tbl_name);
            fData.append("formspID", formspID);
            fData.append('achievements', achievements);
            axios.post(url, fData)
                 .then(response => alert(response.data))
                 .catch(error => alert(error));
        }
    }
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
        }
        else{
          tbl_name = "";
        }
        return tbl_name;
      }
      // Usage
      const tbl_name = getTableName(quarterCheck);

    useEffect(() => {
        const getfinalUserPerformance = async () => {
            const url = "http://localhost/unmg_pms/api/retrieveTracking.php";
            try {
                const response = await axios.get(url, {
                    params: {
                        checkUserAchievements: true,
                        empID: emp_id
                    },
                });
                console.table(response.data);
                setfinalUserPerformance(response.data);
                const achievements = response.data.map(item => ({
                    fq_achievements: item.fq_achievements !== '',
                    myr_achievements: item.myr_achievements !== '',
                    tq_achievements: item.tq_achievements !== '',
                    yee_achievements: item.yee_achievements !== ''
                }));
                setIfExists(achievements);
            }
            catch (error) {
                console.log(error.message);
            }
        }
        if (!emp_id) return;
        getfinalUserPerformance();
    }, [emp_id, quarterCheck]);




    return (
        <>
            <div className="font-semibold text-dark-gray bg-default rounded-md p-2 gap-2 items-center">
                <form className="py-2 flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-2 justify-between md:justify-start">
                        <label htmlFor="quarterPicker" className="font-semibold">
                            Select Quarter:
                        </label>
                        <select
                            className="bg-white text-black rounded-md p-1 px-2 outline-none"
                            name="quarter"
                            value={quarterCheck}
                            onChange={handleQuarterChange}
                        >
                            <option value="" disabled>Select Quarter</option>
                            <option value={1} disabled={ifExists && ifExists.some(item => item.fq_achievements)}>First Quarter</option>
                            <option value={2} disabled={ifExists && ifExists.some(item => item.myr_achievements)}>Second Quarter</option>
                            <option value={3} disabled={ifExists && ifExists.some(item => item.tq_achievements)}>Third Quarter</option>
                            <option value={4} disabled={ifExists && ifExists.some(item => item.yee_achievements)}>Fourth Quarter</option>
                        </select>
                    </div>
                    <span className='text-sm pt-4'>Please enter your achievements or accomplishments below for the given quarter: </span>
                    <textarea className='h-40 rounded-md' name='achievements' value={achievements} onChange={(e) => setAchievments(e.target.value)}>
                    </textarea>
                    <button className="bg-un-blue-light p-1 rounded-md text-white hover:bg-un-blue" type='submit' onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

