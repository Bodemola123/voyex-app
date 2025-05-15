import { FaChevronRight } from "react-icons/fa";
import ReviewsNumber from "./ReviewsNumber";
import ReviewsRating from "./ReviewsRating";
import ReviewsCarousel from "./ReviewsCarousel";
import Reviewed from "@/app/galactimart/tool/[slug]/Reviewed";
import '@/app/galactimart/Aidescription/CardsSection.css'

function Reviews() {
  return (
    <section className="text-fontlight bg-[#131314] w-auto rounded-3xl p-6">
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
      <div className="scroll-container mt-8">
        <Reviewed/>
      </div>
    </section>
  );
}

export default Reviews;
