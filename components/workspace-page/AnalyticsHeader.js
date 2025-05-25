import Link from 'next/link'
import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdKeyboardArrowLeft } from 'react-icons/md'

const AnalyticsHeader = () => {
  return (
    <div className='flex flex-row justify-between items-center h-full w-full'>
      <div className='flex flex-row gap-4'>
      <Link href={'/workspace'} passHref>
        <button className='w-[48px] h-[32px] border border-card gap-2.5 flex items-center justify-center rounded-lg'>
          <MdKeyboardArrowLeft className='text-white text-[24px]'/>
        </button>
      </Link>
      <p className='text-4xl font-bold'>My Tools</p>
      </div>
    {/* <div className='relative w-[198px]'> 
    <FiSearch className="absolute top-2 left-2 text-white w-6 h-6 " />
      <input
        type="text"
        placeholder="Search"
        className="pl-10 pr-4 py-2 bg-transparent rounded-3xl border border-card w-48 text-white placeholder-white outline-none focus:ring-0 focus:border-card"
      />
    </div> */}
    </div>
  )
}

export default AnalyticsHeader