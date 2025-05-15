'use client'
import React, { useEffect, useRef, useState } from 'react'
import { CiPlay1 } from "react-icons/ci";
import Usecard from '../../../../components/galatimart-page/Usecard';
import Tabs from '../../../../components/galatimart-page/Tabs';
import Card2 from './Card2';
import './CardsSection.css';

const Body = ({description,  relatedTools,  developerNote, plansBenefits, userReviews, title, rating}) => {

  return (
    <div className='flex flex-col gap-8 w-full'>
        <Tabs
        description={description}
        developerNote={developerNote}
        plansBenefits={plansBenefits}
        userReviews={userReviews}
        rating={rating}
        title={title} />
        <div className='flex flex-col gap-4'>
            <span className='text-[#F4F4F4] text-2xl font-bold'>Other Apps like {title}</span>
            <div  className='scroll-container'>
                <Card2   
                relatedTools={relatedTools}
                />
            </div>
        </div>
     
    </div>
  )
}

export default Body