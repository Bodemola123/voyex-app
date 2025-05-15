'use client'
import React from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import '@/app/galactimart/Aidescription/CardsSection.css'
import Reviewed from '@/app/galactimart/[slug]/Reviewed';

const ReviewSecond = ({rating, userReviews}) => {


  return (
    <div className="relative bg-[#131314] rounded-3xl p-6 grid grid-row-2 gap-[22.46px] border border-[#D0D5DD1A]">
        <div className='flex flex-row items-center justify-between'>
            <p className='font-bold text-2xl text-[#F4F4F4]'>Reviews</p>
            <button className='flex flex-row items-center gap-[5.62px] px-3.5 pt-3.5  '>
                <p className='text-xl font-bold text-[#F4F4F4]'>See All reviews</p>
                <MdOutlineKeyboardArrowRight className='w-[22.46px] h-[22.46px] text-[#F4F4F4]'/>
            </button>
        </div>
        <div className='grid grid-cols-3 gap-20'>
            <div className='flex flex-row gap-4'>
                <div className='flex flex-col justify-center items-center'>
                    <p className='font-bold text-6xl text-[#F4F4F4]'>{rating}</p>
                    <div className='flex flex-row gap-[5.62px]'>
                    <FaStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                    <FaStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                    <FaStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                    <FaStarHalfAlt className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                    <FaRegStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p className='font-bold text-6xl text-[#F4F4F4]'>10.0k</p>
                    <p className='font-medium text-xl text-[#F4F4F4]'>Total Reviews</p>
                </div>
            </div>
            <div className='col-span-2 flex flex-col gap-[11.23px]'>
                <div className='flex flex-row gap-3'>
                    <div className='w-full rounded-[14.04px] h-[12.64px] bg-[#F5E6FA]'>
                        <div className='w-3/4 h-3 rounded-[14.04px] bg-[#c088fb]'></div>
                    </div>
                    <div className='flex flex-row gap-[5.62px]'>
                        <FaStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                    </div>
                </div>
                <div className='flex flex-row gap-3'>
                    <div className='w-full rounded-[14.04px] h-[12.64px] bg-[#F5E6FA]'>
                        <div className='w-[88%] h-3 rounded-[14.04px] bg-[#c088fb]'></div>
                    </div>
                    <div className='flex flex-row gap-[5.62px]'>
                        <FaStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaRegStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                    </div>
                </div>
                <div className='flex flex-row gap-3'>
                    <div className='w-full rounded-[14.04px] h-[12.64px] bg-[#F5E6FA]'>
                        <div className='w-[62%] h-3 rounded-[14.04px] bg-[#c088fb]'></div>
                    </div>
                    <div className='flex flex-row gap-[5.62px]'>
                        <FaStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaRegStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaRegStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                    </div>
                </div>
                <div className='flex flex-row gap-3'>
                    <div className='w-full rounded-[14.04px] h-[12.64px] bg-[#F5E6FA]'>
                        <div className='w-[4%] h-3 rounded-[14.04px] bg-[#c088fb]'></div>
                    </div>
                    <div className='flex flex-row gap-[5.62px]'>
                        <FaStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaRegStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaRegStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaRegStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                    </div>
                </div>
                <div className='flex flex-row gap-3'>
                    <div className='w-full rounded-[14.04px] h-[12.64px] bg-[#F5E6FA]'>
                        <div className='w-[4%] h-3 rounded-[14.04px] bg-[#c088fb]'></div>
                    </div>
                    <div className='flex flex-row gap-[5.62px]'>
                        <FaStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaRegStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaRegStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaRegStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                        <FaRegStar className='text-[#FCD53F] w-[16.85] h-[16.85]'/>
                    </div>
                </div>
            </div>
        </div>
        <div className='scroll-container'>
            <Reviewed userReviews={userReviews}/>
        </div>
    </div>
    
  )
}

export default ReviewSecond