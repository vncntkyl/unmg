import React, { useState, useEffect } from 'react';
import axios from "axios";
import { error } from 'jquery';
import Badge from '../../misc/Badge';
import Toggle from '../Toggle';

export default function EmployeeAssessment() {
    const employee_id = sessionStorage.getItem("assessment_id");
    const [panel, setPanel] = useState("My Assessment");



    return (
        <>
            <div className="flex pb-2 px-2 justify-between">
                <div className="flex flex-row items-center gap-2 justify-between md:justify-start">
                    <label className="font-semibold">
                        Employee Name:
                    </label>
                    <label className="font-semibold">
                        Norvin Perez
                    </label>
                </div>
                <Toggle
                paths={["/employee_assessment/", "/employee_assessment"]}
                panel={panel}
                panel_1={"Achievements"}
                setPanel={setPanel}
                panel_2={"Grades"}
              />
            </div>
            <div className="flex pb-2 px-2 justify-between">
                <div className="flex flex-row items-center gap-2 justify-between md:justify-start">
                    <label htmlFor="quarterPicker" className="font-semibold">
                        Select Quarter:
                    </label>
                    <select
                        className="bg-default text-black rounded-md p-1 px-2 outline-none"

                    >
                        <option value="" defaultChecked disabled>Select Quarter</option>
                        <option value="1">First Quarter</option>
                        <option value="2">Second Quarter</option>
                        <option value="3">Third Quarter</option>
                        <option value="4">Fourth Quarter</option>
                    </select>
                </div>
                <div className="flex flex-row items-center gap-2  justify-between md:justify-start">
                    <label className="font-semibold">
                        Status:
                    </label>
                    <Badge message={"Ready for Grading"} className={"text-[.8rem] px-1"} />
                </div>
            </div>

            <div className='w-full bg-default px-2 pb-4 pt-2 rounded-md'>
                <div className='w-full'>
                    <span className='font-semibold text-dark-gray'>
                        Employee Achievements:
                    </span>
                </div>
                <div className='w-full pt-4 pl-4'>
                    <span className=' text-black'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a facilisis eros. Morbi gravida sit amet ligula accumsan ullamcorper. Proin nec felis ac tellus gravida tristique ut vitae ex. Proin pretium, orci vel vestibulum gravida, turpis lacus congue nibh, dignissim fermentum nunc leo eu ante. Duis vitae auctor felis. Maecenas nisl sapien, posuere at finibus sed, finibus eget augue. Vivamus eu venenatis nisl. Nunc vel leo nisi. Suspendisse ac pharetra ipsum, facilisis porttitor justo. In tristique, nunc in mattis iaculis, nibh nisl malesuada odio, id iaculis arcu risus consequat magna. Nunc massa ipsum, hendrerit nec erat a, euismod blandit quam. Pellentesque sed elit in lectus laoreet molestie. Pellentesque id purus quam. Donec cursus erat fringilla sapien mattis, quis fringilla ex scelerisque. Aliquam eu semper odio. Aenean justo justo, ultrices quis ex quis, faucibus vehicula est.
                    </span>
                </div>










                {/* <div className="font-semibold text-dark-gray bg-default rounded-md p-2 flex flex-col gap-2 items-center text-center">
                    <span>
                        Sorry, the employee have not yet created their main goals yet
                    </span>
                    <a
                        href="/main_goals/create"
                        className="text-white p-2 flex flex-row items-center gap-2 bg-un-blue-light hover:bg-un-blue rounded-full text-[.9rem]"
                    >
                        Create Goals
                    </a>
                </div> */}
            </div>
            <div className='w-full flex justify-end pt-4'>
                <a className='w-full lg:w-fit cursor-pointer transition-all bg-un-blue text-white rounded p-1 px-2 hover:bg-un-blue-light disabled:bg-dark-gray disabled:cursor-not-allowed'>
                    Grade Assessment
                </a>
            </div>
        </>
    )
}

