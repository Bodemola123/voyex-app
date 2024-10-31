'use client'
import React, { useState } from 'react'
import './CardsSection.css'
import ReviewCard from './ReviewCard'


const Reviewed = () => {

    const [reviews] = useState([
        {id:1, name: 'Jane Cooper', description: 'Amazing product'},
        {id:2, name: 'Jane Cooper', description: 'Amazing product'},
        {id:3, name: 'Jane Cooper', description: 'Amazing product'},
        {id:4, name: 'Jane Cooper', description: 'Amazing product'},

    ])

  return (
    <div className='flex-row cards-wrapper'>
         {reviews.map((review) => (
        <ReviewCard key={review.id} review={review}/>
      ))}       
    </div>
  )
}

export default Reviewed