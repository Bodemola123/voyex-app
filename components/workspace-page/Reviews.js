import { FaChevronRight } from "react-icons/fa";
import ReviewsNumber from "./ReviewsNumber";
import ReviewsRating from "./ReviewsRating";
import ReviewsCarousel from "./ReviewsCarousel";

function Reviews() {
  return (
    <section className="text-fontlight bg-gradient-to-r from-[#00a766]/10 to-[#999999]/10 backdrop-blur-[9.3px] w-auto rounded-3xl p-6">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-xl font-bold">Reviews</h1>
        <button className="text-lg font-bold flex items-center gap-2">
          see all reviews{" "}
          <span>
            <FaChevronRight />
          </span>
        </button>
      </div>

      <div className="flex items-center justify-between gap-8 mt-8">
        <ReviewsNumber />
        <ReviewsRating />
      </div>
      <div className="">
        <ReviewsCarousel />
      </div>
    </section>
  );
}

export default Reviews;
