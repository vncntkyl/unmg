import React, { useEffect, useState } from "react";
import axios from "axios";
import SignOffDetails from "./SignOffDetails";

export default function SignOff() {
    const [pillars, setPillars] = useState([]);
    const [selectedPillar, setSelectedPillar] = useState(0);
    useEffect(() => {
        const getPillar = async () => {
            try {
                const response = await axios.get("http://localhost/unmg_pms/api/retrievePillars.php", {
                    params: {
                        pillars: true
                    }
                });
                setPillars(response.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getPillar();
    }, []);
    return (
        <>

            <div className="md:text-[.8rem]">
                {pillars.map((pillar, index) => (
                    <button key={index}
                        className={`px-2 
                        ${index > 0 ? 'border-1' : ''} 
                        ${index < pillars.length - 1 ? 'border-r' : ''}
                        ${selectedPillar !== index ? 'hover:border-b-2 border-b-un-red-light' : ''}
                        ${selectedPillar === index ? 'border-b-4 border-b-un-red-light' : ''}
                        `}
                        onClick={() => setSelectedPillar(index)}
                    >
                        {pillar.pillar_name.split("(")[0]}
                    </button>
                ))}
            </div>
            <div className="bg-default">
                {selectedPillar !== null && selectedPillar < pillars.length && (
                    <span className="text-black ml-2 md:text-[1rem]">
                        {pillars[selectedPillar].pillar_name} 20%
                    </span>
                )}
                <div className="p-4">
                    <span>Objectives</span>
                    <Routes>
                        <Route path="/*" element={<SignOffDetails />} />
                    </Routes>
                </div>
                <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2 items-center text-center">

                    <span>
                        Sorry Your Assessment has not
                        been approved yet. Please wait for the
                        approval of your supervisor.
                    </span>
                </div>
            </div>
        </>
    )
}