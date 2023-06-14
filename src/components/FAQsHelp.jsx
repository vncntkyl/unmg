import classNames from "classnames";
import React, { useState } from "react";
import { FAQs } from "../misc/HelpData";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export default function FAQsHelp() {
  const [currentItemNumber, setItemNumber] = useState(-1);

  return (
    <>
      <div className="flex flex-col gap-4 p-2">
        <span className="font-semibold text-[1.2rem]">
          Frequently Asked Questions (FAQs)
        </span>
        <section className="flex flex-col gap-2 overflow-hidden">
          {FAQs.map((faq, index) => {
            return (
              <div className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => {
                    if (index === currentItemNumber) {
                      setItemNumber(-1);
                    } else {
                      setItemNumber(index);
                    }
                  }}
                  className={classNames(
                    "w-full flex flex-row justify-between items-center text-start gap-2 bg-white p-4 text-un-blue rounded-md",
                    currentItemNumber === index && "rounded-b-none border-b-2 border-default-dark"
                  )}
                >
                  <span className="font-bold">{faq.title}</span>
                  {currentItemNumber === index ? (
                    <AiOutlineMinus />
                  ) : (
                    <AiOutlinePlus />
                  )}
                </button>
                <p
                  className={classNames(
                    "animate-fade overflow-hidden px-2 bg-white rounded-md rounded-t-none",
                    currentItemNumber === index
                      ? "block p-2"
                      : "hidden"
                  )}
                >
                  {faq.description}
                </p>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
