"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

const ChatProductCard = ({product}) => {

const [hovered, setHovered] = useState(false);
  return (
    <div className='flex flex-row justify-around items-center p-6 gap-6 rounded-3xl w-full h-full bg-[#131314]'
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
        <Image src={'/BigChatGPT.svg'} alt='image' width={78} height={78}/>
        <div className='flex flex-col gap-3.5 items-start'>
            <p className='text-base font-bold'>ChatGPT</p>
            <div className='flex flex-row items-center gap-4'>
                <div className='flex flex-row gap-2'>
            <FaStar className="text-yellow-400" />
            <p className='text-xs font-normal'>Rating:</p>
            <span className='text-xs font-medium'>9/10</span>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                <p className='text-xs font-normal'>Users:</p>
                <p className='text-xs font-medium'>5M+</p>
            </div>
            <p className='text-base font-bold'>{product.price}</p>
            </div>
            <p className="line-clamp-2 text-sm font-normal">Supports GPT-4 and GPT-3.5. OpenAI&apos;s next-generation conversational AI, using intelligent Q&A capabilities to solve your tough questions.</p>
            {!hovered && (
            <div className='flex flex-row items-center justify-start gap-2 w-fit overflow-x-auto scrollbar-hide'>
         <span className="text-[11px] capitalize px-2 py-1.5 rounded-[21px] border border-card">
          chatbot
        </span>
        <span className="text-[11px] capitalize px-2 py-1.5 rounded-[21px] border border-card">
          writing
        </span>
        <span className="text-[11px] capitalize px-2 py-1.5 rounded-[21px] border border-card">
          sales
        </span>
        <span className="text-[11px] capitalize px-2 py-1.5 rounded-[21px] border border-card">
          models
        </span>
        <span className="text-[11px] capitalize px-2 py-1.5 rounded-[21px] border border-card">
          Research
        </span>
        </div>
        )
        }
        {hovered && (
            <div className='flex flex-row gap-4'>
                <button className='border border-[#FFFFFF26] rounded-3xl px-5 py-[5px] bg-transparent text-sm font-medium'>
                    Give Feedback to Tool
                </button>
                <button className='border border-[#ffffff26] rounded-3xl px-5 py-[5px] bg-[#c088fb] text-sm font-medium text-[#0a0a0b]'>
                    Use Tool
                </button>
            </div>
        )
        }
        </div>
    </div>
  )
}

export default ChatProductCard
