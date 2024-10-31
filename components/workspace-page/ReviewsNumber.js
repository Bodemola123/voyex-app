import React from "react";
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";

function ReviewsNumber() {
  return (
    <div className="flex items-center gap-8">
      <div className="text-fontlight">
        <h3 className="text-6xl font-bold">3.5</h3>
        <div className="flex items-start gap-2 text-yellow-500">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaRegStarHalfStroke />
        </div>
      </div>
      <div className="text-fontlight">
        <h3 className="text-6xl font-bold">10.0k</h3>
        <span className="flex items-start gap-2 text-xl font-medium capitalize">
          total reviews
        </span>
      </div>
    </div>
  );
}

export default ReviewsNumber;
