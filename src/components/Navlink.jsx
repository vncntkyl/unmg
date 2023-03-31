import React, {useState} from "react";
import { BiDownArrow } from "react-icons/bi";


export default function Navlink({ icon, label,navlink, togglenavlink, panel, isDropdown}) {
    if(navlink){
        for(let key in navlink){
            if(navlink[key] === true)
            {
                console.log(key)
            }
        }
    }
    return  (
        <>
        <button className="flex text-black p-3 items-center justify-between w-[100%]" onClick={() => {
            togglenavlink((prev) => {
                if(panel == 'forms'){
                    return {
                        ...prev,
                        forms: !prev.forms,
                    }
                }
                else if(panel == 'administrator'){
                    return {
                        ...prev,
                        administrator: !prev.administrator,
                    }
                }
            });
        }}>
        {icon}<span className="mr-auto ml-3">{label}</span>{isDropdown? <><BiDownArrow/></> : <></>}
        </button>
        </>
    )
}