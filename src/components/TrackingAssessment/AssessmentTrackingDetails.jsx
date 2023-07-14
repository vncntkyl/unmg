import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";

export default function AssessmentTrackingDetails({ quarter, emp_id }) {
    const quarterName = quarter == 1 ? "First Quarter" : quarter == 2 ? "Mid Year Quarter" : quarter == 3 ? "Third Quarter" : "Year End Quarter";
    const [achievements, setAchievements] = useState([]);
    const [ifExists, setIfExists] = useState(false);
    
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
                setAchievements(response.data);
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
    }, [emp_id]);

    return (
        <>
            <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2 items-center text-center">
                {ifExists.fq_achievements === true ? "hello":"goodbye"}
                {quarter == 2 ? (
                <>
                    {/* {ifExists &&ifExists.map((item) => (<>{item.myr_achievements}</>))} */}
                </>
                ):"asdasd"}
                <span>
                    Sorry, your supervisor has not yet graded your KPI for the {quarterName}.
                </span>
                <a
                    href="/tracking_and_assessment/create"
                    className="text-white p-2 flex flex-row items-center gap-2 bg-un-blue-light hover:bg-un-blue rounded-full text-[.9rem]"
                onClick={() => {
                    sessionStorage.setItem("assessment_quarter", quarter);
                }}
                >
                    <AiOutlinePlus />
                    Add Quarter Evaluation
                </a>
            </div>
        </>
    )
}