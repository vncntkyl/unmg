import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import PurposeHelp from "../components/PurposeHelp";
import InstructionsHelp from "../components/InstructionsHelp";
import FAQsHelp from "../components/FAQsHelp";
import classNames from "classnames";
import { useFunction } from "../context/FunctionContext";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Help({}) {
  const { getPath } = useFunction();
  const [links, toggleLinks] = useState(false);

  const Link = ({ link, title }) => {
    return (
      <a
        href={link}
        className={classNames(
          getPath() === link ||
            (getPath() === "/help" && link === "/help/purpose")
            ? "bg-default underline"
            : "bg-white",
          "p-2 rounded-md lg:rounded-b-none"
        )}
      >
        {title}
      </a>
    );
  };
  return (
    <>
    <div className="relative bg-lightgray w-full h-[1080px] text-left text-base text-black font-montserrat">
      <img
        className="absolute top-[0px] left-[0px] w-[1920px] h-[372px]"
        alt=""
        src="/rectangle-9.svg"
      />
      <div className="absolute top-[142px] left-[420px] rounded-[30px] bg-white w-[1480px] h-[918px]" />
      <div className="absolute top-[221px] left-[440px] rounded-3xs bg-white box-border w-[1440px] h-[769px] border-[1px] border-solid border-black" />
      <div className="absolute top-[604px] left-[786px]">
        Submitted his first quarter KPI.
      </div>
      <div className="absolute top-[604px] left-[1712px]">
        04/18/2023 3:25PM
      </div>
      <div className="absolute top-[666px] left-[1712px]">
        04/18/2023 1:25PM
      </div>
      <div className="absolute top-[604px] left-[460px]">Jessica Delfin</div>
      <img
        className="absolute top-[643.5px] left-[441px] w-[1438px] h-px"
        alt=""
        src="/line-51.svg"
      />
      <div className="absolute top-[667px] left-[787px]">
        Changed his name frome Judeaus Ramos to Jude Ramos
      </div>
      <div className="absolute top-[667px] left-[461px]">Jude Ramos</div>
      <img
        className="absolute top-[706.5px] left-[442px] w-[1438px] h-px"
        alt=""
        src="/line-51.svg"
      />
      <div className="absolute top-[355px] left-[786px]">
        Deactivated the account of Antonio Serverus
      </div>
      <div className="absolute top-[355px] left-[1712px]">
        04/18/2023 3:25PM
      </div>
      <div className="absolute top-[417px] left-[1712px]">
        04/18/2023 1:25PM
      </div>
      <div className="absolute top-[355px] left-[460px]">Fredelito Suarez</div>
      <img
        className="absolute top-[241px] left-[1590px] w-[270px] h-10"
        alt=""
        src="/group-86.svg"
      />
      <div className="absolute top-[301px] left-[786px] text-xl text-center">
        Logs
      </div>
      <div className="absolute top-[301px] left-[1762px] text-xl text-center">
        Time
      </div>
      <div className="absolute top-[301px] left-[460px] text-xl">Name</div>
      <img
        className="absolute top-[334.5px] left-[440px] w-[1438px] h-px"
        alt=""
        src="/line-51.svg"
      />
      <img
        className="absolute top-[394.5px] left-[441px] w-[1438px] h-px"
        alt=""
        src="/line-51.svg"
      />
      <div className="absolute top-[418px] left-[787px]">
        Changed the role of Antonio Serverus from member to admin role
      </div>
      <div className="absolute top-[418px] left-[461px]">Fredelito Suarez</div>
      <img
        className="absolute top-[457.5px] left-[442px] w-[1438px] h-px"
        alt=""
        src="/line-51.svg"
      />
      <div className="absolute top-[481px] left-[786px]">
        Changed his profile picture.
      </div>
      <div className="absolute top-[481px] left-[1712px]">
        04/18/2023 3:25PM
      </div>
      <div className="absolute top-[543px] left-[1712px]">
        04/18/2023 1:25PM
      </div>
      <div className="absolute top-[481px] left-[460px]">Fredelito Suarez</div>
      <img
        className="absolute top-[520.5px] left-[441px] w-[1438px] h-px"
        alt=""
        src="/line-51.svg"
      />
      <div className="absolute top-[544px] left-[787px]">
        Changed the set the role admin for Jeffrey Bagando.
      </div>
      <div className="absolute top-[544px] left-[461px]">Fredelito Suarez</div>
      <img
        className="absolute top-[583.5px] left-[442px] w-[1438px] h-px"
        alt=""
        src="/line-51.svg"
      />
      <div className="absolute top-[162px] left-[440px] text-[32px] font-semibold">
        Logs
      </div>
      <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[1000px] left-[1840px] w-10 h-10">
        <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-3xs bg-dimgray box-border border-[1px] border-solid border-black" />
        <img
          className="absolute h-3/6 w-6/12 top-[25%] right-[25%] bottom-[25%] left-[25%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/-icon-delete.svg"
        />
      </button>
    </div>
    </>
  );
}
