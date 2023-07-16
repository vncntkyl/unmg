import classNames from "classnames";
import React from "react";
import { GrFormNext } from "react-icons/gr";

export default function CompanyMenu({
  businessUnits,
  company,
  setCompany,
  setCompanyData,
  setCurrentCompany,
}) {
  return (
    <div className="flex flex-col gap-2 lg:w-1/2 xl:w-[40%]">
      <div
        className={classNames(
          company === 0 && "show",
          "company_container flex flex-col rounded-md overflow-hidden bg-default transition-all"
        )}
      >
        <div className="bg-un-red-light  px-2 text-white py-1 flex flex-row items-center justify-between">
          <span>United Neon Media Group</span>
        </div>
        {businessUnits.map((comp, index) => {
          return (
            <button
              key={index}
              type="button"
              className={classNames(
                company === comp.company_id && "bg-default-dark",
                "flex flex-row items-center justify-between p-1 m-1 rounded text-start hover:bg-default-dark transition-all"
              )}
              onClick={() => {
                setCompany && setCompany(comp.company_id);
                setCurrentCompany && setCurrentCompany(comp.company_name);
                setCompanyData && setCompanyData(comp);
              }}
            >
              <span>{comp.company_name}</span>
              <GrFormNext />
            </button>
          );
        })}
      </div>
    </div>
  );
}
