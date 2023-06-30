import React, { useState, useEffect } from 'react';
import axios from "axios";
import { error } from 'jquery';

export default function CreateEmployeeAssessment({ emp_id }) {
    const [finalUserPerformance, setfinalUserPerformance] = useState([]);
    const [quarterCheck, setQuarterCheck] = useState("");
    const [ifExists, setIfExists] = useState();
    const [tableName, setTableName] = useState();
    const handleQuarterChange = (event) => {
        setQuarterCheck(event.target.value);
    };
    const [achievements, setAchievments] = useState("");

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
                        userTracking: true,
                        empID: emp_id
                    },
                });
                setfinalUserPerformance(response.data);
                const results = response.data.map(item => ({
                    fq_result: item.fq_results !== 0,
                    myr_result: item.myr_results !== 0,
                    tq_result: item.tq_results !== 0,
                    yee_result: item.yee_results !== 0
                }));
                setIfExists(results);
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
                            onChange={handleQuarterChange}
                        >
                            <option value="" disabled={ifExists}>Select Quarter</option>
                            <option value="1" disabled={ifExists && ifExists.some(item => item.fq_result)}>First Quarter</option>
                            <option value="2" disabled={ifExists && ifExists.some(item => item.myr_result)}>Second Quarter</option>
                            <option value="3" disabled={ifExists && ifExists.some(item => item.tq_result)}>Third Quarter</option>
                            <option value="4" disabled={ifExists && ifExists.some(item => item.yee_result)}>Fourth Quarter</option>
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

