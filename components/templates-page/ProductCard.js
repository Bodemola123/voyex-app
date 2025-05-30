"use client";
import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { PiAirplaneBold } from "react-icons/pi";
import Image from "next/image";

const ProductCard = ({ product, onClick }) => {

  return (
    <div className="w-auto rounded-3xl flex flex-col gap-4 p-4 bg-[#131314] border border-[#FFFFFF26]">
      <div className="flex justify-between flex-row">
        <div className="flex flex-col gap-2.5">
          {product.logo_url ? (
            <Image
              src={product.logo_url}
              alt="image"
              width={52}
              height={52}
              className="rounded-xl object-cover"
            />
          ) : (
            <div className="w-[52px] h-[52px] bg-gray-500 rounded-xl" />
          )}
          <h1 className="text-base font-bold text-white">{product.name}</h1>
        </div>
        <FaRegStar />
      </div>

      <div className="text-sm text-white font-normal line-clamp-2 h-[40px]">
        {product.short_description}
      </div>

      <div className="h-[35px]">
        <button
          onClick={onClick}
          className="w-full bg-[#c088fb] py-2 px-4 gap-2.5 rounded-3xl flex items-center flex-row justify-center hover:bg-purple/70"
        >
          <PiAirplaneBold className="text-[#032400]" />
          <p className="text-base font-medium text-[#032400]">
            See Template
          </p>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
