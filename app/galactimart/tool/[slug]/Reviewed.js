'use client'
import React from 'react'
import './CardsSection.css'
import ReviewCard from './ReviewCard'

const Reviewed = ({ userReviews }) => {
  const reviews = userReviews?.reviews || [];

  return (
    <div className='flex-row cards-wrapper'>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))
      ) : (
        <p className="text-white text-lg">No reviews available for this tool.</p>
      )}
    </div>
  );
};

export default Reviewed;
