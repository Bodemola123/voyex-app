'use client'
import React, { useState } from 'react'

import { FaRegStar, FaStar } from "react-icons/fa";
import { PiAirplaneBold } from "react-icons/pi";
import Image from "next/image";
import Link from 'next/link';

const ProductCard = ( {product} ) => {

    const [hovered, setHovered] = useState(false);

  return (
    <div className='w-auto rounded-3xl flex flex-col gap-4 p-6 bg-custom-gradient backdrop-blur-custom'
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
        <div className='flex justify-between flex-row'>
            <div className='flex flex-col gap-2.5'>
            <Image src={'/chatgpt.svg'} alt='chatgpt' width={52} height={52}/>
            <h1 className="text-base font-bold">{product.title}</h1>
            </div>
            <FaRegStar/>
        </div>
        <div className='gap-4 flex flex-row'>
            <div className='gap-2 flex flex-row'>
            <FaStar className="text-yellow-400" />
            <p className='text-xs font-normal'>Rating:</p>
            <span className='text-xs font-medium'>{product.rating}/10</span>
            </div>
            <div className='flex flex-row gap-2'>
                <p className='text-xs font-normal'>Users:</p>
                <p className='text-xs font-medium'>{product.users}</p>
            </div>
        </div>
        <div className='text-sm font-normal '>
            <p>Supports GPT-4 and GPT-3.5. OpenAI&apos;s</p>
            <p className='truncate'>next-generation conversational AI, using intelligent Q&A capabilities to solve your tough questions.</p>
        </div>
        {!hovered && (
        <div className='flex flex-row items-center justify-center gap-2 mt-4'>
         <span className="text-xs capitalize px-2 py-1 rounded-[21px] border border-card">
          chatbot
        </span>
        <span className="text-xs capitalize px-2 py-1 rounded-[21px] border border-card">
          writing
        </span>
        <span className="text-xs capitalize px-2 py-1 rounded-[21px] border border-card">
          sales
        </span>
        <span className="text-xs capitalize px-2 py-1 rounded-[21px] border border-card">
          models
        </span>
        <span className="text-xs capitalize px-2 py-1 rounded-[21px] border border-card">
          Research
        </span>
        </div>
        )
        }
        {hovered && (
            <div>
                <Link href='/galactimart/Aidescription' passHref>
                <button className="w-[286px] bg-[#46BA3C] py-2 px-4 gap-2.5 rounded-3xl flex items-center flex-row justify-center">
                        <PiAirplaneBold className='text-[#032400]'/>
                        <p className=' text-base font-medium text-[#032400]'>{product.buttonText}</p>
                </button>
                </Link>
            </div>
        )
        }
    </div>
  )
}

export default ProductCard