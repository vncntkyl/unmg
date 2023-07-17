import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";

export default function AssessmentTrackingDetails({ quarter, emp_id }) {
    const quarterName = quarter == 1 ? "First Quarter" : quarter == 2 ? "Mid Year Quarter" : quarter == 3 ? "Third Quarter" : "Year End Quarter";
    const [achievements, setAchievements] = useState([]);
    const [ifAchievementsExists, setIfAchievementsExists] = useState(false);
    const [ifResultsExists, setIfResultsExists] = useState(false);
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
                
                const achievementsSet = new Set();
                const uniqueAchievements = response.data.filter((item) => {
                    const achievements = {
                        fq_achievements: item.fq_achievements,
                        myr_achievements: item.myr_achievements,
                        tq_achievements: item.tq_achievements,
                        yee_achievements: item.yee_achievements
                    };
                    const achievementsString = JSON.stringify(achievements);

                    if (!achievementsSet.has(achievementsString)) {
                        achievementsSet.add(achievementsString);
                        return true;
                    }

                    return false;
                });
                setAchievements(uniqueAchievements);

                const achievements = uniqueAchievements.map((item) => {
                    return {
                        fq_achievements: item.fq_achievements != '' && item.fq_achievements != null,
                        myr_achievements: item.myr_achievements != '' && item.myr_achievements != null,
                        tq_achievements: item.tq_achievements != '' && item.tq_achievements != null,
                        yee_achievements: item.yee_achievements != '' && item.yee_achievements != null
                    };
                });
                setIfAchievementsExists(achievements);

                const results = [
                    {
                        checkfq: response.data.some((item) => item.fq_results != 0),
                        checkmyr: response.data.some((item) => item.myr_results != 0),
                        checktq: response.data.some((item) => item.tq_results != 0),
                        checkyee: response.data.some((item) => item.yee_results != 0)
                    }
                ];
                setIfResultsExists(results);
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
            <div className="font-semibold text-dark-gray bg-default rounded-md p-2">
                { }
                {quarter == 1 ? (
                    <>
                        {ifResultsExists && ifResultsExists.map((checkresult, resultIndex) => (
                            <div key={resultIndex}>
                                {checkresult.checkfq === true ? "" : (
                                    <>
                                        {
                                            ifAchievementsExists.map((checkAchievement, achievementIndex) => (
                                                <div key={achievementIndex}>
                                                    {checkAchievement.fq_achievements === true ? (
                                                        <>
                                                            <div>
                                                                <span className="w-full flex justify-center">
                                                                    Please wait for your supervisor to grade your KPI.
                                                                </span>
                                                                <span className="w-full block pt-8">
                                                                    Achievements Submitted:
                                                                </span>
                                                                <span className="w-full block pl-4">
                                                                    {achievements.map((achievement) => achievement.fq_achievements)}
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="flex justify-center py-2">
                                                                You have not yet submitted your achievements for the {quarterName}.
                                                            </span>
                                                            <div className="flex justify-center py-2">    
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
                                                    )}
                                                </div>
                                            ))
                                        }
                                    </>
                                )}

                            </div>
                        ))}
                    </>
                ) : quarter == 2 ? (
                    <>
                        {ifResultsExists && ifResultsExists.map((checkresult, resultIndex) => (
                            <div key={resultIndex}>
                                {checkresult.checkmyr === true ? "" : (
                                    <>
                                        {
                                            ifAchievementsExists.map((checkAchievement, achievementIndex) => (
                                                <div key={achievementIndex}>
                                                    {checkAchievement.myr_achievements === true ? (
                                                        <>
                                                            <div>
                                                                <span className="w-full flex justify-center">
                                                                    Please wait for your supervisor to grade your KPI.
                                                                </span>
                                                                <span className="w-full block pt-8">
                                                                    Achievements Submitted:
                                                                </span>
                                                                <span className="w-full block pl-4">
                                                                    {achievements.map((achievement) => achievement.myr_achievements)}
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                           {checkresult.checkfq === false && checkAchievement.fq_achievements === false ? 
                                                           
                                                           (
                                                            <span className="flex justify-center py-2">
                                                                This quarter is still unavailable. Please submit achievements on the First Quarter
                                                            </span>
                                                           ): (
                                                           <>
                                                            <span className="flex justify-center py-2">
                                                                You have not yet submitted your achievements for the {quarterName}.
                                                            </span>
                                                            <div className="flex justify-center py-2">    
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
                                                           )}
                                                        </>
                                                    )}
                                                </div>
                                            ))
                                        }
                                    </>
                                )}

                            </div>
                        ))}
                    </>
                ) : quarter == 3 ? (
                    <>
                        {ifResultsExists && ifResultsExists.map((checkresult, resultIndex) => (
                            <div key={resultIndex}>
                                {checkresult.checktq === true ? "" : (
                                    <>
                                        {
                                            ifAchievementsExists.map((checkAchievement, achievementIndex) => (
                                                <div key={achievementIndex}>
                                                    {checkAchievement.tq_achievements === true ? (
                                                        <>
                                                            <div>
                                                                <span className="w-full flex justify-center">
                                                                    Please wait for your supervisor to grade your KPI.
                                                                </span>
                                                                <span className="w-full block pt-8">
                                                                    Achievements Submitted:
                                                                </span>
                                                                <span className="w-full block pl-4">
                                                                    {achievements.map((achievement) => achievement.tq_achievements)}
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                           {checkresult.checkmyr === false && checkAchievement.myr_achievements === false ? 
                                                           
                                                           (
                                                            <span className="flex justify-center py-2">
                                                                This quarter is still unavailable. Please submit achievements on the Second Quarter
                                                            </span>
                                                           ): (
                                                           <>
                                                            <span className="flex justify-center py-2">
                                                                You have not yet submitted your achievements for the {quarterName}.
                                                            </span>
                                                            <div className="flex justify-center py-2">    
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
                                                           )}
                                                        </>
                                                    )}
                                                </div>
                                            ))
                                        }
                                    </>
                                )}

                            </div>
                        ))}
                    </>
                ) : quarter == 4 ? (
                    <>
                        {ifResultsExists && ifResultsExists.map((checkresult, resultIndex) => (
                            <div key={resultIndex}>
                                {checkresult.checkyee === true ? "" : (
                                    <>
                                        {
                                            ifAchievementsExists.map((checkAchievement, achievementIndex) => (
                                                <div key={achievementIndex}>
                                                    {checkAchievement.yee_achievements === true ? (
                                                        <>
                                                            <div>
                                                                <span className="w-full flex justify-center">
                                                                    Please wait for your supervisor to grade your KPI.
                                                                </span>
                                                                <span className="w-full block pt-8">
                                                                    Achievements Submitted:
                                                                </span>
                                                                <span className="w-full block pl-4">
                                                                    {achievements.map((achievement) => achievement.yee_achievements)}
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                           {checkresult.checktq === false && checkAchievement.tq_achievements === false ? 
                                                           
                                                           (
                                                            <span className="flex justify-center py-2">
                                                                This quarter is still unavailable. Please submit achievements on the Third Quarter
                                                            </span>
                                                           ): (
                                                           <>
                                                            <span className="flex justify-center py-2">
                                                                You have not yet submitted your achievements for the {quarterName}.
                                                            </span>
                                                            <div className="flex justify-center py-2">    
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
                                                           )}
                                                        </>
                                                    )}
                                                </div>
                                            ))
                                        }
                                    </>
                                )}

                            </div>
                        ))}
                    </>
                ) : ""}
            </div>
        </>
    )
}