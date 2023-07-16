import React from "react";
import { GrFormSearch } from "react-icons/gr";

export default function Search({ setQuery }) {
  return (
    <div className="col-[1/3] row-span-2 flex flex-row items-center gap-2 p-1 bg-white rounded-md md:col-[2/3] lg:col-[1/3] xl:col-[2/3] md:row-span-1">
      <GrFormSearch className="text-[1.3rem]" />
      <input
        type="text"
        placeholder="Search employee... (Atleast 3 characters)"
        onChange={(e) => {
          if (e.target.value.length < 3) {
            setQuery("");
          } else {
            setQuery(e.target.value);
          }
        }}
        className="w-full outline-none bg-transparent placeholder:text-[.9rem] placeholder:md:text-[1rem]"
      />
    </div>
  );
}
