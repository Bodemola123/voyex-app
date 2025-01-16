'use client'
import React, { useEffect } from 'react'
import Header from './Header'
import Body from './Body'
import '../../../app/globals.css'
import BenNavbar from '@/components/common/BenNavbar'
import BenFooter from '@/components/common/BenFooter'
import AiVisible from '@/components/galatimart-page/AiVisible'
import { useState } from 'react'

const Aidescription = () => {
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  // On component mount, retrieve state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('isHistoryVisible');
    if (savedState !== null) {
      setIsHistoryVisible(JSON.parse(savedState)); // Parse boolean value from localStorage
    }
  }, []);

  // Update localStorage whenever the state changes
  const toggleHistoryVisibility = () => {
    setIsHistoryVisible((prev) => {
      const newState = !prev;
      localStorage.setItem('isHistoryVisible', JSON.stringify(newState));
      return newState;
    });
  };
    
  return (
    <div className='flex flex-row items-center w-full h-screen'>
      <BenNavbar
        toggleHistoryVisibility={toggleHistoryVisibility}
        isHistoryVisible={isHistoryVisible}
      />
        <div
        className={`transition-all duration-300 ${
          isHistoryVisible ? 'w-[320px]' : 'w-0'
        } bg-[#131314] overflow-hidden`}
      >
        {isHistoryVisible && <AiVisible />}
        </div>
      <div className='text-white relative flex flex-grow flex-col gap-10 p-6 justify-between w-full h-full overflow-y-scroll scrollbar-hide scroll-container'>
      <Header/>
      <Body/>
      <BenFooter/>
      </div>

        
    </div>

  )
}

export default Aidescription
