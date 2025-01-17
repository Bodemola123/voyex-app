'use client'
import React, { useEffect, useRef, useState } from 'react'
import { CiPlay1 } from "react-icons/ci";
import Usecard from '../../../components/galatimart-page/Usecard';
import Tabs from '../../../components/galatimart-page/Tabs';
import Card2 from './Card2';
import './CardsSection.css';

const Body = () => {

  return (
    <div className='flex flex-col gap-8 w-[100%]'>
        <div className='border w-full rounded-[18px] border-card h-[410px] bg-cover bg-center bg-no-repeat flex justify-center items-center' style={{ backgroundImage: "url('/Logged-in.svg')" }}>
                <button className=' p-[23.86px] gap-[23.86px] border rounded-3xl flex  items-center justify-center bg-custom-gradient backdrop-blur-custom'>
                    <CiPlay1 className='text-white w-10 h-10'/>
                </button>
        </div>
        <Tabs/>
        <div className='flex flex-col gap-4'>
            <span className='text-[#F4F4F4] text-2xl font-bold'>Other Apps like CHATGPT</span>
            <div  className='scroll-container'>
                <Card2/>
            </div>
        </div>
     
    </div>
  )
}

export default Body