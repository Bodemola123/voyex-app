"use client";
import React from "react";
import { FaRegStar } from "react-icons/fa";
import { PiAirplaneBold } from "react-icons/pi";
import Image from "next/image";

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="w-auto rounded-3xl flex flex-col gap-4 p-4 bg-[#131314]">
      <div className="flex justify-between flex-row">
        <div className="flex flex-col gap-2.5">
          <Image src={"/chatgpt.svg"} alt="chatgpt" width={52} height={52} />
          <h1 className="text-base font-bold">{product.title}</h1>
        </div>
        <FaRegStar />
      </div>
      <div className="text-sm font-normal">
        <p>Supports GPT-4 and GPT-3.5. OpenAI&apos;s</p>
        <p className="truncate">
          next-generation conversational AI, using intelligent Q&A capabilities
          to solve your tough questions.
        </p>
      </div>
      <div>
        <button
          onClick={onClick} // Ensure button click opens the modal
          className="w-full bg-[#c088fb] py-2 px-4 gap-2.5 rounded-3xl flex items-center flex-row justify-center hover:bg-purple/70"
        >
          <PiAirplaneBold className="text-[#032400]" />
          <p className="text-base font-medium text-[#032400]">
            {product.buttonText}
          </p>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
