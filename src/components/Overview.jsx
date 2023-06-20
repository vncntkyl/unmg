import React, { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";
import Counter from "../misc/Counter";
import { format, startOfToday } from "date-fns";

export default function Overview() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const retrieveOverviewContent = async () => {
      const url = "http://localhost/unmg_pms/api/fetchOverview.php";
      //const url = "../api/fetchOverview.php";
      const formData = new FormData();

      formData.append("getCount", "all");
      try {
        const response = await axios.post(url, formData);
        setCards(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    retrieveOverviewContent();
  }, []);

  return (
    <>
      {/* top overview */}
      <div className="w-full bg-un-blue min-h-[100px] px-4 pb-4 lg:pl-[18rem] lg:pr-6 xl:pl-[24.5rem] xl:pr-32">
        <div className="pb-2 flex flex-col xs:flex-row xs:items-end xs:justify-between">
          <p className="text-white font-semibold text-[1.1rem] ">
            Admin Overview
          </p>
          <span className="text-[.8rem] text-white">
            As of {format(startOfToday(), "EEEE, MMMM d, yyyy")}
          </span>
        </div>
        <div className="overview_container w-full overflow-hidden overflow-x-scroll snap-x snap-mandatory scroll-smooth flex flex-row gap-1">
          {cards.map((card, index) => {
            return (
              <div
                key={index}
                className="group/overview relative bg-white min-w-full flex flex-col text-center items-center justify-between rounded-md snap-start p-4 md:min-w-[49.5%] lg:min-w-[32.75%] xl:min-w-[19.7%] cursor-pointer hover:bg-default"
              >
                <span className="text-[1rem] font-semibold text-black">
                  {card.title}
                </span>
                <span className="text-[3rem] text-un-blue-light">
                  <Counter max={card.value} />
                </span>
                <span className="text-right w-full hidden group-hover/overview:block absolute bottom-2 right-4 animate-fade">View</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
