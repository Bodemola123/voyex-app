import React from 'react'
import { FaRegStar } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { HiOutlineBolt, HiOutlineSquares2X2 } from 'react-icons/hi2'
import { TbFilter } from 'react-icons/tb'
import Advert1 from './Advert1'

const Header = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-4xl">Templates</h1>
            <div className='relative w-[198px] h-10 flex'> 
            <FiSearch className="absolute top-2 left-2 text-white w-6 h-6 " />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 bg-transparent rounded-3xl border border-card w-48 text-white placeholder-white outline-none focus:ring-0 focus:border-card"
              />
            </div>
      </div>
      <Advert1/>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row gap-4'>
          <button className='w-28 h-8 rounded-3xl  gap-3 text-sm flex justify-center items-center bg-[#131314] border border-[#FFFFFF26]'> <FaRegStar/> Featured</button>
          <button className='h-8 w-20 rounded-3xl  gap-3 text-sm flex justify-center items-center bg-[#131314] border border-[#FFFFFF26]'>  <HiOutlineBolt/> New</button>
          </div>
          <div className='flex flex-row gap-2'>
          <button className='w-24 h-8 gap-3  text-sm rounded-3xl flex justify-center items-center bg-[#131314] border border-[#FFFFFF26]'> <TbFilter/> Filter</button>
          <button className='w-24 h-8 gap-3  text-sm rounded-3xl flex justify-center items-center bg-[#131314] border border-[#FFFFFF26]'> <HiOutlineSquares2X2/> View</button>
          </div>
          </div>
    </div>
  )
}

export default Header
