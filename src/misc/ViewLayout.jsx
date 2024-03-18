import React from "react";
import { MdViewColumn } from "react-icons/md";
import { MdTableRows } from "react-icons/md";
import { Tooltip } from "flowbite-react";
import classNames from "classnames";

export default function ViewLayout({ viewLayout, setViewLayout }) {
  return (
    <>
      <div className="flex items-center">
        <Tooltip content="Tabular Layout" style="light">
          <div className="flex items-center">
            <input
              type="radio"
              name="viewLayout"
              id="tabular"
              className="peer hidden"
              onClick={() => {
                setViewLayout("tabular");
                localStorage.setItem("viewLayout", "tabular");
              }}
              checked={viewLayout === "tabular"}
            />
            <label
              htmlFor="tabular"
              className="bg-white hover:bg-default-dark peer-checked:bg-default-dark py-1 px-2 rounded-l-md outline outline-1 transition-all cursor-pointer"
            >
              <MdViewColumn className="text-[1.5rem]" />
            </label>
          </div>
        </Tooltip>
        <Tooltip content="List Layout" style="light">
          <div className="flex items-center">
            <input
              type="radio"
              name="viewLayout"
              id="list"
              className="peer hidden"
              onClick={() => {
                setViewLayout("list");
                localStorage.setItem("viewLayout", "list");
              }}
              checked={viewLayout === "list"}
            />
            <label
              htmlFor="list"
              className="bg-white hover:bg-default-dark peer-checked:bg-default-dark py-1 px-2 rounded-r-md outline outline-1 transition-all cursor-pointer"
            >
              <MdTableRows className="text-[1.5rem]" />
            </label>
          </div>
        </Tooltip>
      </div>
    </>
  );
}
