"use client"
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { IoShareOutline } from 'react-icons/io5';
import ToolUsecard from './ToolUseCard';


// ✅ Slugify function to convert title to URL-friendly slug
const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
const ToolDetailsModal = ({tool, onClose}) => {

    const slug = `${tool.tool_id}-${slugify(tool.tool_name)}`; // e.g. "2132-ai-writer-pro"
  return (
    <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)] flex items-center justify-center z-50">
      <div className="bg-[#1C1D1F] rounded-3xl p-[33px] max-w-[1002px] gap-[29px] flex flex-col justify-between items-center text-[#f4f4f4]">
        <div className='flex justify-between'>
            <p className='text-[36px] font-bold'>{tool.tool_name}</p>
            <div className='flex flex-row justify-center items-center gap-4'>
                <Link href={`/galactimart/tool/${slug}`} passHref className='px-4 py-2 flex flex-row gap-[11px] text-[#0a0a0b] items-center justify-center'>
                <IoShareOutline className='text-[24px]'/>
                <p className='text-base font-medium'>Explore on Galactimart</p>
                </Link>
                <button onClick={onClose} className="flex items-center justify-center">
                <Image src="/close-square.svg" alt="Close" width={58} height={58} />
                </button>
            </div>
        </div>
        <p>{tool.large_description}</p>
        <div className="flex flex-col gap-4">
            <div className='flex gap-4 justify-center items-center'>
                <p>Pricing</p>
                <p className='text-base font-bold'>{tool.pricing_model}</p>
            </div>
        </div>
        <div className='flex flex-col gap-4 justify-center'>
            <p className="font-medium">Use Cases</p>
            <div className="grid grid-rows-1 gap-5 w-auto overflow-x-scroll scrollbar-hide">
          {tool.usecases.map((usecase, index) => (
            <ToolUsecard
              key={index}
              usecase={{
                id: index,
                name: usecase.usecase_name,
                rating: usecase.usecase_rating,
                description: usecase.description
              }}
            />
          ))}
        </div>
        </div>
        <p className="text-[#D0D5DD]">For more information about {tool.tool_name}, explore our Galactimart, your interstellar hub for all things AI.</p>
      </div>
    </div>
  )
}

export default ToolDetailsModal
