import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiRightArrowAlt } from "react-icons/bi";
import SignOffModal from "../../misc/SignOffModal";

export default function SignOff({ users_id }) {
    const [finalUserPerformance, setfinalUserPerformance] = useState([]);
    const [pillarName, setPillarName] = useState([]);
    // const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPillar, setSelectedPillar] = useState(0);
    const [tabTitle, setTabTitle] = useState([]);
    const [signModal, setsignModal] = useState(false);
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
                // setResults({
                //     Results: response.data
                //         .filter((performance1) => performance1.pillar_name === tabTitle.name)
                //         .reduce((total, performance1) => total + parseInt(performance1.results), 0),
                //     Agreed: response.data
                //         .filter((performance2) => performance2.pillar_name === tabTitle.name)
                //         .reduce((total, performance2) => total + parseInt(performance2.agreed_rating), 0),
                //     Weighted: response.data
                //         .filter((performance3) => performance3.pillar_name === tabTitle.name)
                //         .reduce((total, performance3) => total + parseInt(performance3.wtd_rating), 0),
                //     totalResults: response.data
                //         .reduce((total, performance1) => total + parseInt(performance1.results), 0),
                //     totalAgreed: response.data
                //         .reduce((total, performance2) => total + parseInt(performance2.agreed_rating), 0),
                //     totalWeighted: response.data
                //         .reduce((total, performance3) => total + parseInt(performance3.wtd_rating), 0)
                // });
                setLoading(false);
            } catch (error) {
                console.log(error.message)
            }
        }
        if (!users_id) return;
        getfinalUserPerformance();
    }, [users_id, selectedPillar]);
    useEffect(() => {
        const getResults = async () => {

        }
    })

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

            <div className="bg-default px-2 pb-4 pt-2">
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
                        <div className="bg-un-blue-light w-[60%] px-2 mx-2 rounded-t-lg flex">
                            <span className="flex-1 px-4 text-white text-center">KPI</span>
                            <span className="flex-1 px-2 text-white text-center">Weight</span>
                            <span className="flex-1 px-2 text-white text-center">Results</span>
                            <span className="flex-1 px-4 text-white text-center">Description</span>
                            <span className="flex-1 px-4 text-white text-center">Remarks</span>
                        </div>
                        <div className="bg-un-blue-light w-[20%] px-2 mx-2 rounded-t-lg flex">
                            <span className="flex-1 px-4 text-white text-center">Agreed</span>
                            <span className="flex-1 px-4 text-white text-center">Weighted</span>
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
                                    <div className="bg-white w-[60%] p-2 mx-2 flex">
                                        <span className="flex-1 px-4 flex items-center justify-center">{performance.kpi_desc}</span>
                                        <span className="flex-1 px-2 text-center flex items-center justify-center">{performance.kpi_weight}%</span>
                                        <span className="flex-1 px-2 text-center flex items-center justify-center">{performance.results}</span>
                                        <span className="flex-1 px-4 flex items-center justify-center">Lorem, ipsum dolor</span>
                                        <span className="flex-1 px-4 flex items-center justify-center">{performance.remarks}</span>
                                    </div>
                                    <div className="bg-white w-[20%] p-2 mx-2 flex">
                                        <span className="flex-1 px-4 text-center flex items-center justify-center">{performance.agreed_rating}</span>
                                        <span className="flex-1 px-4 text-center flex items-center justify-center">{performance.wtd_rating}</span>
                                    </div>
                                </div>
                            );
                        }
                    }
                    )}

                    {/* Footer */}
                    {

                    }
                    <div className="flex flex-row">
                        <div className="w-[20%] px-2 pt-4">
                        </div>
                        <div className="bg-white w-[60%] px-2 pt-4 pb-2 mx-2 rounded-b-lg flex border-t-[1px] bt-black">
                            <span className="flex-1 px-4 text-center flex items-center justify-center font-semibold">Total:</span>
                            <span className="flex-1 px-2 text-center flex items-center justify-center font-semibold">{tabTitle.percentage}%</span>
                            <span className="flex-1 px-2 text-center flex items-center justify-center font-semibold">
                                {
                                    finalUserPerformance.filter((num) => num.pillar_name === tabTitle.name)
                                        .reduce((total, num) => total + parseInt(num.results), 0)
                                }
                            </span>
                            <span className="flex-1 px-4 text-center"></span>
                            <span className="flex-1 px-4 text-center"></span>
                        </div>
                        <div className="bg-white w-[20%] px-2 pt-4 pb-2 mx-2 rounded-b-lg flex border-t-[1px] bt-black">
                            <span className="flex-1 px-4 text-center flex items-center justify-center font-semibold">
                                {
                                    finalUserPerformance.filter((num) => num.pillar_name === tabTitle.name)
                                        .reduce((total, num) => total + parseInt(num.agreed_rating), 0)
                                }
                            </span>
                            <span className="flex-1 px-4 text-center flex items-center justify-center font-semibold">
                                {
                                    finalUserPerformance.filter((num) => num.pillar_name === tabTitle.name)
                                        .reduce((total, num) => total + parseInt(num.wtd_rating), 0)
                                }
                            </span>
                        </div>
                    </div>



                    <div className="bg-white py-4 mt-4 flex rounded">
                        {/* Summary without approvals */}
                        <div className="w-[15%] px-2">
                            <span className="block font-semibold">Overall Summary</span>
                            <span className="block pl-4">Weight: {finalUserPerformance
                        .reduce((total, totalnum) => total + parseInt(totalnum.kpi_weight), 0)}%</span>
                        <span className="block pl-4"> Results: {finalUserPerformance
                        .reduce((total, totalnum) => total + parseInt(totalnum.results), 0)}</span>
                        <span className="block pl-4">Agreed: {finalUserPerformance
                        .reduce((total, totalnum) => total + parseInt(totalnum.agreed_rating), 0)}</span>
                        <span className="block pl-4">Weighted: {finalUserPerformance
                        .reduce((total, totalnum) => total + parseInt(totalnum.wtd_rating), 0)}</span>
                        </div>

                        <div className="w-[20%] px-2">
                            <span className="block font-semibold">Rated By:</span>
                        </div>
                        <div className="w-[20%] px-2">
                            <span className="block font-semibold">Noted By:</span>
                        </div>
                        <div className="w-[45%] px-2 flex justify-end">
                            <button type="button" className="px-2 flex items-center text-un-red text-right  group hover:font-semibold ease-in-out duration-200 hover:underline hover:underline-offset-1"
                                onClick={() => {
                                    setsignModal(true);
                                }}>
                                Proceed to Sign Evaluation
                                <span className="opacity-0 group-hover:opacity-100 group-hover:mx-2 transition-opacity ease-in-out duration-200">
                                    <BiRightArrowAlt className="text-[1.4rem]" />
                                </span>
                            </button>
                            {signModal && <SignOffModal closeModal={setsignModal} />}
                        </div>

                    </div>

                    {/* Pop up need to be replaced by Modal */}







                    {/* template for finished kpi
                    <div className="w-[20%] px-2">
                        <span className="block font-semibold">Rated By:</span>
                        <span className="block pl-4">Perez, Norvin Kyle B.</span>
                        <span className="block pl-4">Senior Backend Developer</span>
                        <span className="block pl-4">06/08/2023</span>
                    </div>
                    <div className="w-[20%] px-2">
                        <span className="block font-semibold">Noted By:</span>
                        <span className="block pl-4">Perez, Norvin Kyle B.</span>
                        <span className="block pl-4">Network Engineer</span>
                        <span className="block pl-4">06/08/2023</span>
                    </div>
                    <div className="w-[20%] px-2">
                        <span className="block font-semibold">Ratee:</span>
                        <span className="block pl-4">Perez, Norvin Kyle B.</span>
                        <span className="block pl-4">Web Developer</span>
                        <span className="block pl-4">06/08/2023</span>
                    </div>

                    <div className="w-[25%] px-2">
                        <span className="block font-semibold">Ratee's comment on evaluation:</span>
                        <span className="block pl-4">Thank you for rating me fairly.</span>
                    </div> */}

                </div>
            </div>
        </>
    ) : <>Loading...</>
}
