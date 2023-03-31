import React from "react";
import logo1 from "../assets/unmg_logo1.png";
export default function Login() {
    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center drop-shadow-lg">
                <div className="bg-offwhite w-[25%] h-[60%] rounded-l-lg flex justify-center items-center">
                    <img src={logo1} alt="logo1" className="h-[40%] w-auto" />
                </div>
                <div className="bg-un-blue w-[25%] h-[60%] rounded-r-lg flex flex-col justify-center items-center p-8 gap-6">
                    <span className="text-white text-[30px] pb-3">
                        Sign In
                    </span>
                    <input
                    className="bg-transparent placeholder:text-white  text-white outline-0 p-2 border-b-2 border-b-white w-[100%]"
                        type="text"
                        placeholder="Username"
                    />
                    <input
                    className="bg-transparent placeholder:text-white  text-white outline-0 p-2 border-b-2 border-b-white w-[100%]"
                        type="password"
                        placeholder="Password"
                    />
                    <button type="submit" className="bg-un-red text-white p-2 w-[80%] rounded">
Sign In
                    </button>
                </div>
            </div>
        </>
    )
}