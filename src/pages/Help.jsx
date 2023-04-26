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
      <section className="relative">
        <div className="w-full min-h-[175px] bg-un-blue" />
        <div className="absolute top-0 left-0 w-full px-4 lg:pl-[18rem] xl:pl-[24.5rem] xl:pr-32">
          <div className="bg-white p-2 rounded-md flex flex-col shadow-md justify-between">
            <div>
              <span className="text-un-blue text-[1.2rem] font-semibold">
                Help
              </span>
            </div>
            <div className="relative overflow-hidden">
              <button
                type="button"
                className="lg:hidden"
                onClick={() => toggleLinks((prev) => !prev)}
              >
                <RxHamburgerMenu />
              </button>
              <div
                className={classNames(
                  "flex flex-col transition-all duration-200 lg:hidden",
                  links
                    ? "pointer-events-auto max-h-[500px] translate-y-[0%] opacity-100"
                    : "pointer-events-none max-h-[0px] translate-y-[-100%] opacity-0"
                )}
              >
                <Link link={"/help/purpose"} title={"Purpose"} />
                <Link link={"/help/instructions"} title={"Instructions"} />
                <Link
                  link={"/help/FAQs"}
                  title={"Frequently Asked Questions (FAQs)"}
                />
              </div>
              <div className="hidden lg:flex flex-row">
                <Link link={"/help/purpose"} title={"Purpose"} />
                <Link link={"/help/instructions"} title={"Instructions"} />
                <Link
                  link={"/help/FAQs"}
                  title={"Frequently Asked Questions (FAQs)"}
                />
              </div>
            </div>
            <div
              className={classNames(
                "bg-default p-2  rounded-md",
                (getPath() === "/help" || getPath() === "/help/purpose") &&
                  "lg:rounded-tl-none"
              )}
            >
              <Routes>
                <Route path="/*" element={<InstructionsHelp />} />
                <Route path="/purpose" element={<PurposeHelp />} />
                <Route path="/FAQs" element={<FAQsHelp />} />
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
