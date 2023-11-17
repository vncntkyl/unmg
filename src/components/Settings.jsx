import React from "react";
import { CiLock, CiUnlock } from "react-icons/ci";

export default function Settings() {
    return (
        <>
            <span className="ml-2">In this section, you'll find options and controls to modify and customize the system settings according to your preferences or requirements.</span>
            <span className="block mt-6 text-[1.2rem]">Pillar Settings</span>
            <div className="flex justify-between border-b-[1px] border-gray-400/50">
                <div className="flex flex-col gap-2 my-2">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <label For="minimum_pillar_percentage" className="text-[1rem]">Min</label>
                            <input type="number" id="minimum_pillar_percentage" className="outline-none bg-default overflow-hidden rounded-md p-1 w-[3ch]" />
                        </div>
                        <div className="flex items-center gap-2">
                            <label For="maximum_pillar_percentage" className="text-[1rem]">Max</label>
                            <input type="number" id="maximum_pillar_percentage" className="outline-none bg-default overflow-hidden rounded-md p-1 w-[3ch]" />
                        </div>
                    </div>
                    <label For="pillar_percentage" className="text-[0.8rem]">This is where you would set the minimum and maximum pillar percentage of the pillars.</label>
                </div>
            </div>
            <span className="block mt-6 text-[1.2rem]">Required Objectives</span>
            <div className="flex justify-between border-b-[1px] border-gray-400/50">
                <div className="flex flex-col gap-2 my-2">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <label For="minimum_required_objectives" className="text-[1rem]">Min</label>
                            <input type="number" id="minimum_required_objectives" className="outline-none bg-default overflow-hidden rounded-md p-1 w-[3ch]" />
                        </div>
                        <div className="flex items-center gap-2">
                            <label For="maximum_required_objectives" className="text-[1rem]">Max</label>
                            <input type="number" id="maximum_required_objectives" className="outline-none bg-default overflow-hidden rounded-md p-1 w-[3ch]" />
                        </div>
                    </div>
                    <label For="required_objectives" className="text-[0.8rem]">This is the section where you can specify the number of required objectives for each pillar.</label>
                </div>
            </div>
            <span className="block mt-6 text-[1.2rem]">Overall Adaptive Percentage</span>
            <div className="flex justify-between border-b-[1px] border-gray-400/50">
                <div className="flex flex-col gap-2 my-2">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <label For="minimum_required_objectives" className="text-[1rem]">Overall Percentage</label>
                            <input type="number" id="minimum_required_objectives" className="outline-none bg-default overflow-hidden rounded-md p-1 w-[4ch]" />
                            <label className="text-[1rem]">%</label>
                        </div>
                    </div>
                    <label For="required_objectives" className="text-[0.8rem]">This is where you will set the no, of overall percentage across the pillars.</label>
                </div>
            </div>
            <span className="block mt-6 text-[1.2rem]">Lock and Unlock Form</span>
            <div className="flex justify-between border-b-[1px] border-gray-400/50">
                <div className="flex flex-col gap-2 my-2">
                    <div className="flex items-center">
                        <CiUnlock className="text-[1.5rem]" />
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" class="sr-only peer" />
                            <div class="border-[1px] peer-checked:bg-un-blue w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            <CiLock className="text-[1.5rem]" />
                        </label>
                    </div>
                    <label For="required_objectives" className="text-[0.8rem]">This is where you will set the no, of overall percentage across the pillars.</label>
                </div>
            </div>
        </>);
}