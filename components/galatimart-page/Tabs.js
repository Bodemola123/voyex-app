'use client'
import React, { useState } from 'react';
import { FaTags, FaCode, FaStar } from 'react-icons/fa';
import AboutChatgpt from './AboutChatgpt';
import PlansFeatures from './PlansFeatures';
import { PiBookOpenText } from 'react-icons/pi';
import ReviewSection from '@/components/galatimart-page/ReviewSection';
import ReviewSecond from '@/components/galatimart-page/ReviewSecond';
import '../../app/galactimart/tool/[slug]/CardsSection.css'

const Tabs = ({description,  developerNote, plansBenefits, userReviews, rating, title}) => {
  const [activeTab, setActiveTab] = useState('About ChatGPT');

  const tabs = [
    { name: 'About ChatGPT', icon: <PiBookOpenText /> },
    { name: 'Plans and features', icon: <FaTags /> },
    { name: 'From the Developer', icon: <FaCode /> },
    { name: 'Reviews', icon: <FaStar /> },
  ];

  const content = {
    'About ChatGPT': (
        <AboutChatgpt
        description={description}/>
    ),

    'Plans and features': (
        <PlansFeatures
        plansBenefits={plansBenefits}
        title={title}/>
    ),

    'From the Developer': (
      <div className="p-6 bg-[#131314] rounded-3xl border border-[#D0D5DD1A]">
        <h2 className="text-xl font-semibold">Developers Note</h2>
        <p className="mt-4">
          {developerNote}
        </p>
      </div>
    ),

    'Reviews': (
      <div className='flex flex-col gap-4'>
        <ReviewSection/>
        <ReviewSecond
        userReviews={userReviews}
        rating={rating}/>
      </div>
        
    ),
  };

  return (
    <div className="">
    
      <div className="flex flex-row justify-between max-w-[60%] items-center bg-[#131314] rounded-2xl py-2 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 text-base text-center font-medium${
              activeTab === tab.name ? 'text-[#c088fb]' : 'text-[#F4F4F4]'
            } ${activeTab === tab.name ? 'text-[#c088fb]' : ''} hover:text-[#c088fb] transition-colors`}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>

      <div className="mt-4 ">{content[activeTab]}</div>
    </div>
  );
};

export default Tabs;
