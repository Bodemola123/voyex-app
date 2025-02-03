import Image from 'next/image';
import React from 'react';

// List of regions with corresponding flag images and names
const regions = [
  { flag: '/brazilflag.svg', name: 'Brazil' },
  { flag: '/nigeriaflag.svg', name: 'Nigeria' },
  { flag: '/norwayflag.svg', name: 'Norway' },
  { flag: '/southafricaflag.svg', name: 'South Africa' },
  { flag: '/ukraineflag.svg', name: 'Ukraine' },
  { flag: '/ukflag.svg', name: 'United Kingdom' }
];

const TopRegions = () => (
  <div className='flex flex-col gap-[80px] p-5 rounded-3xl w-full h-full bg-[#131314]'>
    {/* Title Section */}
    <div className='flex flex-col items-start gap-2'>
      <p className='text-2xl font-bold text-[#F4f4f4]'>Top Regions</p>
      <p className='text-base text-[#f4f4f4]'>Top Regions where your Product has been engaged from</p>
    </div>
    
    {/* Map and Region List Section */}
    <div className='flex flex-row items-center justify-center gap-2'>
      {/* World Map Image */}
      <Image src='/WorldMap.svg' alt='World Map' width={334} height={220} />
      
      {/* List of Top Regions */}
      <div className='flex flex-col items-start justify-center gap-4 text-[#f4f4f4] text-[11px] font-medium'>
        {regions.map(({ flag, name }) => (
          <div key={name} className='flex gap-3'>
            {/* Country Flag and Name */}
            <div className='flex gap-2'>
              <Image src={flag} alt={name} width={16} height={16} />
              <p>{name}</p>
            </div>
            {/* Engagement Count */}
            <p>100,234</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TopRegions;
