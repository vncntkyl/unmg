import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiRightArrowAlt } from "react-icons/bi";

export default function AssessmentTracking({ users_id }) {
    const [finalUserPerformance, setfinalUserPerformance] = useState([]);
    const [pillarName, setPillarName] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPillar, setSelectedPillar] = useState(0);
    const [tabTitle, setTabTitle] = useState([]);
    let previousObjective = null;

    useEffect(() => {
        const getfinalUserPerformance = async () => {
            try {
                const response = await axios.get("http://localhost/unmg_pms/api/retrieveSignOff.php", {
                    params: {
                        userPerformance: true,
                        userID: users_id
                    }
                });
                if (!response.data) return
                setfinalUserPerformance(response.data);

                const pillarMap = new Map();
                response.data.forEach(pillar => {
                    const { pillar_name, pillar_description, pillar_percentage } = pillar;
                    if (!pillarMap.has(pillar_name)) {
                        pillarMap.set(pillar_name, {
                            name: pillar_name,
                            description: pillar_description,
                            percentage: pillar_percentage
                        });
                    }
                });
                const pillarData = Array.from(pillarMap.values());
                setPillarName(pillarData);
                setTabTitle(pillarData[selectedPillar]);
                setLoading(false);
            } catch (error) {
                console.log(error.message)
            }
        }
        if (!users_id) return;
        getfinalUserPerformance();
    }, [users_id, selectedPillar]);

    return !loading ? (
        <>


            <div className="md:text-[.8rem]">
                {
                    pillarName.map((pillar, index) => (
                        <button
                            key={index}
                            className={`px-2 text-[1rem]
                                    ${index > 0 ? 'border-1' : ''}
                                    ${index < pillarName.length - 1 ? 'border-r' : ''}
                                    ${selectedPillar !== index ? 'hover:border-b-2 border-b-un-red-light' : ''} 
                                    ${selectedPillar === index ? 'border-b-4 border-b-un-red-light' : ''
                                }`}
                            onClick={() => setSelectedPillar(index)}
                        >

                            {pillar.name}
                        </button>
                    ))
                }
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
                            <span className="flex-1 px-4 text-white text-center">KPI</span>
                            <span className="flex-1 px-2 text-white text-center">Weight</span>
                            <span className="flex-1 px-2 text-white text-center">Results</span>
                            <span className="flex-1 px-4 text-white text-center">Description</span>
                            <span className="flex-1 px-4 text-white text-center">Remarks</span>
                        </div>
                    </div>
                    {/* Body */}

                    {finalUserPerformance.map((performance) => {

                        if (performance.pillar_name === tabTitle.name) {
                            const objective = performance.objective === previousObjective ? <span className="flex-1 px-4 text-center flex items-center justify-center"></span> : performance.objective;
                            previousObjective = performance.objective;
                            return (
                                <div className="flex flex-row">
                                    <div className="w-[20%] px-2 flex">
                                        <span className="px-4 flex items-center justify-center">{objective}</span>
                                    </div>
                                    <div className="bg-white w-[80%] p-2 mx-2 flex">
                                        <span className="flex-1 px-4 flex items-center justify-center">{performance.kpi_desc}</span>
                                        <span className="flex-1 px-2 text-center flex items-center justify-center">{performance.kpi_weight}%</span>
                                        <span className="flex-1 px-2 text-center flex items-center justify-center">{performance.results}</span>
                                        <span className="flex-1 px-4 flex items-center justify-center">Lorem, ipsum dolor</span>
                                        <span className="flex-1 px-4 flex items-center justify-center">{performance.remarks}</span>
                                    </div>
                                </div>
                            );
                        }
                    }
                    )}

                </div>
            </div>
        </>
    ) : <>Loading...</>
}
