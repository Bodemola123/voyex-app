"use client";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa6";
import { IoShareOutline } from "react-icons/io5";
import Link from "next/link";

const Modal = ({ product, onClose }) => {
  const {
    template_id,
    name,
    logo_url,
    usecases = [],
    rating = 0,
    large_description,
    pricing,
    global_use,
    ease_of_use,
  } = product;

  // Star display logic
  const getStarCount = (rating) => {
    if (rating >= 5.0) return 5;
    if (rating >= 4.0) return 4;
    if (rating >= 3.0) return 3;
    if (rating >= 2.0) return 2;
    return 1;
  };

  const filledStars = getStarCount(rating);
  const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');


  // Build URL path
  const steps = `${template_id}-${slugify(name)}`;

  return (
    <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)] flex items-center justify-center z-50">
      <div className="bg-[#1C1D1F] rounded-3xl p-[33px] max-w-[1002px] gap-[29px] flex flex-col justify-between items-center text-[#f4f4f4]">
        {/* Header */}
        <div className="flex flex-row justify-between items-center w-full">
          <h2 className="text-3xl font-bold text-[#f4f4f4]">{name?.toUpperCase()}</h2>
          <div className="flex flex-row gap-4 items-center justify-center">
            <button className="flex flex-row gap-2.5">
              <IoShareOutline className="w-6 h-6 text-white" />
              <p className="font-medium">Share</p>
            </button>
            <button onClick={onClose} className="flex items-center justify-center">
              <Image src="/close-square.svg" alt="Close" width={58} height={58} />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="font-normal text-base text-[#FFFFFF]">
          {large_description}
        </p>

        <div className="flex gap-4 w-full">
          {/* Use Cases */}
          <div className="bg-[#131314] p-6 rounded-2xl gap-6 justify-start flex flex-col flex-1">
            <h3 className="text-2xl font-semibold">Use Cases</h3>
            {usecases.length > 0 ? (
              <ol className="text-[#f4f4f4] font-normal text-base list-decimal ml-6 space-y-0.5">
                {usecases.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-gray-400">No use cases listed.</p>
            )}
          </div>

          {/* Template Info */}
          <div className="bg-[#131314] p-6 rounded-2xl gap-4 justify-start flex flex-col flex-1">
            <h3 className="text-2xl font-semibold">OUR TEMPLATE</h3>
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < filledStars ? "text-[#FCD53F]" : "text-[#3b3b3b]"}
                />
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-base">
                <p className="font-normal">Pricing</p>
                <p className="font-bold">{pricing || "Not provided"}</p>
              </div>

              <div className="flex justify-between items-center text-base">
                <p className="font-normal">Global Use</p>
                <p className="font-bold">{global_use || "Unknown"}</p>
              </div>

              <div className="flex justify-between items-center text-base">
                <p className="font-normal">Ease of Use</p>
                <p className="font-bold">{ease_of_use || "Not specified"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-row justify-between items-center w-full">
          <span className="p-4 text-base font-bold underline underline-offset-1">What are templates?</span>
            <Link href={`/templates/${steps}`}>
            <button className="bg-[#c088fb] max-w-[327px] p-4 rounded-[30px] text-[#0a0a0b] font-medium hover:scale-110 hover:bg-purple/70">
                Continue to Use Template
            </button>
            </Link>

        </div>
      </div>
    </div>
  );
};

export default Modal;
