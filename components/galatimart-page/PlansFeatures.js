'use client'
import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import {FaRegCheckCircle } from 'react-icons/fa';
import Image from 'next/image';

const PlansFeatures = ({title, plansBenefits}) => {
  return (
    <div className=" text-[#F4F4F4] p-6 gap-6 flex flex-col bg-[#131314] rounded-3xl border border-[#D0D5DD1A]">
    <div className='flex justify-start items-center'>
        <p className='font-bold text-[22.46px] leading-[33.7px]'>Deal Terms and Conditions</p>
    </div>
    {/* <div className='grid grid-cols-3 gap-4'>
    <span className='flex flex-row gap-2 items-center text-base leading-[26px] font-medium'><Image src={'/Icon.svg'} alt='recycle' width={20} height={20}/>Lifetime Access to {title}</span>
    <span className='flex flex-row gap-2 col-span-2 items-center text-base leading-[26px] font-medium'><Image src={'/Icon.svg'} alt='recycle' width={20} height={20}/>You must redeem your code(s) within 60 days of purchase</span>
    <span className='flex flex-row gap-2 text-base leading-[26px] font-medium'><Image src={'/Icon.svg'} alt='recycle' width={20} height={20}/> All future plan updates</span>
    <span className='flex flex-row gap-2 col-span-2 text-base leading-[26px] font-medium'><Image src={'/Icon.svg'} alt='recycle' width={20} height={20}/>Please note: This deal is not stackable</span>
    </div> */}
    {/* <span className='text-[19.8px] leading-[28px] font-bold'>60 day money-back guarantee. Try it out for 2 months to make sure it is right for you!</span> */}
    <div className='mt-8 grid grid-cols-2 gap-6'>
        {/* Individual Plan */}
        <div className='rounded-3xl flex flex-col gap-16 border border-card p-9 bg-custom-gradient backdrop-blur-custom'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <span className='text-4xl font-medium text-[#377CFD]'>Individual</span>
              <span className='text-[#AFAFAF]'>Create an account for your Organization and start using.</span>
            </div>
            <ul className='flex flex-col gap-2'>
              {plansBenefits?.individual?.length > 0 ? (
                plansBenefits.individual.map((benefit, i) => (
                  <li key={i} className='flex flex-row gap-6 items-center'>
                    <FaRegCheckCircle className='text-[#377CFD] w-8 h-8' />
                    <span className='flex flex-row gap-2 items-center'>{benefit} <CiCircleInfo /></span>
                  </li>
                ))
              ) : (
                <li className='text-[#AFAFAF] italic'>None for this plan</li>
              )}
            </ul>
          </div>
        </div>

        {/* Organization Plan */}
        <div className='rounded-3xl flex flex-col gap-16 border border-card p-9 bg-custom-gradient backdrop-blur-custom'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <span className='text-4xl font-medium text-[#46ba3c]'>Organization</span>
              <span className='text-[#AFAFAF]'>Create an account for your Organization and start using.</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-[#46ba3c]'>Let&apos;s talk</span>
              <span className='text-[#f4f4f4]'>Price is based on Number of seats</span>
            </div>
            <ul className='flex flex-col gap-2'>
              {plansBenefits?.enterprise?.length > 0 ? (
                plansBenefits.enterprise.map((benefit, i) => (
                  <li key={i} className='flex flex-row gap-6 items-center'>
                    <FaRegCheckCircle className='text-[#46ba3c] w-8 h-8' />
                    <span className='flex flex-row gap-2 items-center'>{benefit} <CiCircleInfo /></span>
                  </li>
                ))
              ) : (
                <li className='text-[#AFAFAF] italic'>None for this plan</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansFeatures;