'use client';
import React, { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { PiAirplaneBold } from 'react-icons/pi';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip } from '@radix-ui/react-tooltip';

const StepsProductCard = ({ tool, onSeeDetails }) => {
  const [hovered, setHovered] = useState(false);
  const imageOverrides = {
  2132: "/chatgptforchat.svg",
  1173: "/invideo.png",
  1455: "/typpo.svg",
  2123: "/applepie.jpg",
  1228: "/zipwp.png",
};

const customImage = imageOverrides[tool.tool_id] || tool.logo_url;

  return (
    <div
      className=" relative w-[421px] rounded-3xl flex flex-col gap-4 p-4 bg-[#131314] border border-[#D0D5DD1A]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
            {/* Sponsored Banner */}
      {tool.sponsored_type && (
        <div className="absolute top-[54px] -right-[12px] transform rotate-45 bg-[#c088fb] text-[#032400] text-xs font-semibold px-12 py-1 shadow-lg z-10 rounded-md">
          Sponsored
        </div>
      )}

      <div className="flex justify-between flex-row">
        <div className="flex flex-col gap-2.5">
          {/* {product.image ? (
            <Image src={product.image} alt={product.title} width={52} height={52} />
          ) : (
            <div className="w-[52px] h-[52px] bg-white rounded-full" />
          )} */}
          {customImage ? (
  <Image src={customImage} alt={tool.tool_name} width={52} height={52} className='rounded-full'/>
) : (
  <div className="w-[52px] h-[52px] bg-white rounded-full" />
)}
          <h1 className="text-base font-bold">{tool.tool_name}</h1>
        </div>
      </div>

      <div className="gap-4 flex flex-row">
        <div className="gap-2 flex flex-row items-center">
          <FaStar className="text-yellow-400" />
          <p className="text-xs font-normal">Rating:</p>
          <span className="text-xs font-medium">{tool.rating}/5</span>
        </div>
      </div>

      <div className="text-sm font-normal line-clamp-2 h-[40px]">
        <p>{tool.short_description}</p>
      </div>

      {!hovered && (
        <div className="flex flex-wrap items-center overflow-x-auto scrollbar-hide gap-2 w-full h-[35px]">
          {tool.use_case_tags?.length > 0 ? (
            tool.use_case_tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm capitalize px-2 py-1 rounded-[21px] border border-card"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-sm px-2 py-1 text-white italic rounded-[21px] border border-card">
              No tags
            </span>
          )}
        </div>
      )}

      {hovered && (
        <div className="h-[35px]">
            <button className="w-full bg-[#c088fb] py-2 px-4 gap-2.5 rounded-3xl flex items-center justify-center" onClick={onSeeDetails}>
              <p className="text-base font-medium text-[#032400]">See Details</p>
            </button>
        </div>
      )}
    </div>
  );
};

export default StepsProductCard;
