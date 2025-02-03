import { usageCards } from "@/constants/workspace-page";
import { BiSolidDownArrow } from "react-icons/bi";
import React from "react";

function StatsCard() {
  return (
    <div className="grid grid-cols-3 gap-6 w-full mt-7">
      {usageCards.map((card, i) => (
        <div
          key={i}
          className={`flex flex-col gap-3 text-fontlight bg-[#131314] border border-card w-auto rounded-3xl px-6 py-3`}
        >
          <h1 className="text-base font-medium">{card.name}</h1>
          <h3 className="text-4xl font-bold">{card.count}</h3>
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1 text-red-500 font-normal">
              <BiSolidDownArrow />
              {card.percentage}%
            </span>
            <span className="">{card.period}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCard;
