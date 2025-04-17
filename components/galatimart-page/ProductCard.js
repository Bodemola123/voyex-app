'use client';
import React, { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { PiAirplaneBold } from 'react-icons/pi';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-auto rounded-3xl flex flex-col gap-4 p-4 bg-[#131314]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between flex-row">
        <div className="flex flex-col gap-2.5">
          {product.image ? (
            <Image src={product.image} alt={product.title} width={52} height={52} />
          ) : (
            <div className="w-[52px] h-[52px] bg-white rounded-full" />
          )}
          <h1 className="text-base font-bold">{product.title}</h1>
        </div>
        <FaRegStar />
      </div>

      <div className="gap-4 flex flex-row">
        <div className="gap-2 flex flex-row items-center">
          <FaStar className="text-yellow-400" />
          <p className="text-xs font-normal">Rating:</p>
          <span className="text-xs font-medium">{product.rating}/5</span>
        </div>
      </div>

      <div className="text-sm font-normal line-clamp-2 h-[40px]">
        <p className="">{product.description}</p>
      </div>

      {!hovered && (
        <div className="flex flex-wrap items-center gap-2 w-full h-[35px]">
          {product.tags?.length > 0 ? (
            product.tags.map((tag, index) => (
              <span
                key={index}
                className="text-base capitalize px-2 py-1 rounded-[21px] border border-card"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-base px-2 py-1 text-white italic rounded-[21px] border border-card">
              No tags
            </span>
          )}
        </div>
      )}

      {hovered && (
        <div className='h-[35px]'>
          <Link href="/galactimart/Aidescription" passHref>
            <button className="w-full bg-[#c088fb] py-2 px-4 gap-2.5 rounded-3xl flex items-center justify-center">
              <PiAirplaneBold className="text-[#032400]" />
              <p className="text-base font-medium text-[#032400]">
                Takeoff to App
              </p>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
