import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";

function ReviewsRating() {
  return (
    <div className="flex flex-col w-full gap-2">
      {/*////////// RATING 1  ////////*/}
      <div className="flex items-center gap-3 w-full">
        <div className="relative block rounded-full w-full h-3 bg-[#F5E6FA]">
          <span className="absolute top-0 left-0 bg-btnlime w-[80%] h-3 rounded-full"></span>
        </div>
        <div className="flex items-start gap-2 text-yellow-500">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
      </div>
      {/*////////// RATING 2  ////////*/}
      <div className="flex items-center gap-3 w-full">
        <div className="relative block rounded-full w-full h-3 bg-[#F5E6FA]">
          <span className="absolute top-0 left-0 bg-btnlime w-[90%] h-3 rounded-full"></span>
        </div>
        <div className="flex items-start gap-2 text-yellow-500">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaRegStar />
        </div>
      </div>
      {/*////////// RATING 3  ////////*/}
      <div className="flex items-center gap-3 w-full">
        <div className="relative block rounded-full w-full h-3 bg-[#F5E6FA]">
          <span className="absolute top-0 left-0 bg-btnlime w-[70%] h-3 rounded-full"></span>
        </div>
        <div className="flex items-start gap-2 text-yellow-500">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaRegStar />
          <FaRegStar />
        </div>
      </div>
      {/*////////// RATING 4  ////////*/}
      <div className="flex items-center gap-3 w-full">
        <div className="relative block rounded-full w-full h-3 bg-[#F5E6FA]">
          <span className="absolute top-0 left-0 bg-btnlime w-[5%] h-3 rounded-full"></span>
        </div>
        <div className="flex items-start gap-2 text-yellow-500">
          <FaStar />
          <FaStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
        </div>
      </div>
      {/*////////// RATING 5  ////////*/}
      <div className="flex items-center gap-3 w-full">
        <div className="relative block rounded-full w-full h-3 bg-[#F5E6FA]">
          <span className="absolute top-0 left-0 bg-btnlime w-[5%] h-3 rounded-full"></span>
        </div>
        <div className="flex items-start gap-2 text-yellow-500">
          <FaStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
        </div>
      </div>
    </div>
  );
}

export default ReviewsRating;
