import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";

export default function SignOff() {
    const [pillarPercentage, setpillarPercentage] = useState([]);
    const [finalUserPerformance, setfinalUserPerformance] = useState([]);
    const [selectedPillar, setSelectedPillar] = useState(0);
    const [signOff, setSignOff] = useState([]);
    const {headList} = useAuth();
    useEffect(() => {
        const getpillarPercentage = async () => {
            try {
                const response = await axios.get("http://localhost/unmg_pms/api/retrieveSignOff.php", {
                    params: {
                        userpillarpercentage: true
                    }
                });
                setpillarPercentage(response.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        const getfinalUserPerformance = async () => {
            try {
                const response = await axios.get("http://localhost/unmg_pms/api/retrieveSignOff.php", {
                    params: {
                        userPerformance: true
                    }
                });
                setfinalUserPerformance(response.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        const getSignForm = async() => {
            try{
                const response = await axios.get("http://localhost/unmg_pms/api/retrieveSignOff.php", {
                    params: {
                        userSignOff: true
                    }
                });
                setSignOff(response.data);
            } catch(error){
                console.log(error.message)
            }
        }
        getfinalUserPerformance();
        getpillarPercentage();
        getSignForm();
    }, []);
    const selectedPillarName = pillarPercentage[selectedPillar]?.pillar_name || '';
    const selectedPillarNamePercentage = selectedPillar !== null && selectedPillar < pillarPercentage.length &&
        selectedPillar >= 0 ? `${selectedPillarName} - ${pillarPercentage[selectedPillar].pillar_percentage}` : '';

const ratedby = headList.filter((rtb) => rtb.user_type == 5 && rtb.users_id == signOff[0].supervisor_id);
console.log(ratedby[0].full_name)

    let previousObjective = null;

    const Results = finalUserPerformance
        .filter((performance1) => performance1.pillar_name === selectedPillarName)
        .reduce((total, performance1) => total + Number(performance1.results), 0);
    const Agreed = finalUserPerformance
        .filter((performance2) => performance2.pillar_name === selectedPillarName)
        .reduce((total, performance2) => total + Number(performance2.agreed_rating), 0);
    const Weighted = finalUserPerformance
        .filter((performance3) => performance3.pillar_name === selectedPillarName)
        .reduce((total, performance3) => total + Number(performance3.wtd_rating), 0);
    const Percentage = finalUserPerformance
        .filter((performance4) => performance4.pillar_name === selectedPillarName)
        .reduce((total, performance4) => total + Number(performance4.kpi_weight), 0);





    const totalResults = finalUserPerformance
        .reduce((total, performance1) => total + Number(performance1.results), 0);
    const totalAgreed = finalUserPerformance
        .reduce((total, performance2) => total + Number(performance2.agreed_rating), 0);
    const totalWeighted = finalUserPerformance
        .reduce((total, performance3) => total + Number(performance3.wtd_rating), 0);
    const totalPercentage = finalUserPerformance
        .reduce((total, performance4) => total + Number(performance4.kpi_weight), 0);
    return (
        <>
            <div className="md:text-[.8rem]">
                {
                    pillarPercentage.map((pillar, index) => (
                        <button key={index}
                            className={`px-2 
                                ${index > 0 ? 'border-1' : ''} 
                                ${index < pillarPercentage.length - 1 ? 'border-r' : ''}
                                ${selectedPillar !== index ? 'hover:border-b-2 border-b-un-red-light' : ''}
                                ${selectedPillar === index ? 'border-b-4 border-b-un-red-light' : ''}
                                `}
                            onClick={() => setSelectedPillar(index)}
                        >
                            {pillar.pillar_name.split("(")[0]}
                        </button>
                    ))
                }
            </div>
            <div className="bg-default px-2 pb-4 pt-2">
                <span className="text-black ml-2 md:text-[1rem] font-bold block">
                    {selectedPillarNamePercentage}%
                </span>

{ratedby.mapfull_name}

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
                    {
                        finalUserPerformance
                            .filter((performance) => performance.pillar_name === selectedPillarName)
                            .map((performance) => {
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
                            })
                    }

                    {/* Footer */}
                    <div className="flex flex-row">
                        <div className="w-[20%] px-2 pt-4">
                        </div>
                        <div className="bg-white w-[60%] px-2 pt-4 pb-2 mx-2 rounded-b-lg flex border-t-[1px] bt-black">
                            <span className="flex-1 px-4 text-center font-semibold">Total:</span>
                            <span className="flex-1 px-4 text-center font-semibold">{Percentage}%</span>
                            <span className="flex-1 px-4 text-center font-semibold">{Results}</span>
                            <span className="flex-1 px-4 text-center"></span>
                            <span className="flex-1 px-4 text-center"></span>
                        </div>
                        <div className="bg-white w-[20%] px-2 pt-4 pb-2 mx-2 rounded-b-lg flex border-t-[1px] bt-black">
                            <span className="flex-1 px-4 text-center font-semibold">{Agreed}</span>
                            <span className="flex-1 px-4 text-center font-semibold">{Weighted}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white py-4 mt-4 flex rounded">

                    <div className="w-[15%] px-2">
                        <span className="block font-semibold">Overall Summary</span>
                        <span className="block pl-4">Weight: {totalPercentage}%</span>
                        <span className="block pl-4"> Results: {totalResults}</span>
                        <span className="block pl-4">Agreed: {totalAgreed}</span>
                        <span className="block pl-4">Weighted: {totalWeighted}</span>
                    </div>

                    <div className="w-[20%] px-2">
                        <span className="block font-semibold">Rated By:</span>
                        <span className="block pl-4">Aspan, John Vincent V.</span>
                        <span className="block pl-4">Senior Backend Developer</span>
                        <span className="block pl-4">06/08/2023</span>
                    </div>
                    <div className="w-[20%] px-2">
                        <span className="block font-semibold">Noted By:</span>
                        <span className="block pl-4">Tubigan, Edd Russel N.</span>
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
                    </div>
                </div>

            </div>
        </>
    )
}
