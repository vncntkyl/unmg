import React, { useEffect, useState } from "react";
import classNames from "classnames";

export default function Overview({ overview_type }) {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Employees",
      count: 175,
    },
    {
      id: 2,
      title: "Not Evaluated",
      count: 130,
    },
    {
      id: 3,
      title: "1 on 1 Discussion",
      count: 62,
    },
    {
      id: 4,
      title: "Finalized Sign Off",
      count: 20,
    },
  ]);
  const [loader, toggleLoader] = useState(false);
  useEffect(() => {
    if (overview_type === "regular") {
      setCards([
        {
          id: 1,
          title: "Employees",
          count: 175,
        },
        {
          id: 2,
          title: "Not Evaluated",
          count: 130,
        },
        {
          id: 3,
          title: "1 on 1 Discussion",
          count: 62,
        },
        {
          id: 4,
          title: "Finalized Sign Off",
          count: 20,
        },
      ]);
    } else {
      setCards([
        {
          id: 1,
          title: "Employee Under Probation",
          count: 10,
        },
        {
          id: 2,
          title: "Not Evaluated",
          count: 7,
        },
        {
          id: 3,
          title: "1 on 1 Discussion",
          count: 2,
        },
        {
          id: 4,
          title: "Finalized Sign Off",
          count: 1,
        },
      ]);
    }
    toggleLoader(true);
  }, [overview_type]);
  return loader ? (
    <>
      {/* top overview */}
      <div className="w-full bg-un-blue min-h-[100px] p-4 lg:pl-[18rem] lg:pr-6 xl:pl-[24.5rem] xl:pr-32">
        <div className="overview_container w-full overflow-hidden overflow-x-scroll snap-x snap-mandatory scroll-smooth flex flex-row gap-1">
          {cards.map((card) => {
            return (
              <div key={card.id} className="bg-white min-w-full flex flex-col text-center items-center justify-between rounded-md snap-start p-4 md:min-w-[49.5%] lg:min-w-[24.5%]">
                <span className="text-[1rem] font-semibold">{card.title}</span>
                <span className="text-[3rem]">{card.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  ) : (
    <>Loading...</>
  );
}
