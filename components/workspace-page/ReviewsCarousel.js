import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { reveiwCarouselCards } from "@/constants/workspace-page";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

function ReviewsCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full pt-8"
    >
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="xl:basis-1/2 2xl:basis-1/3">
            {reveiwCarouselCards.map((card, i) => (
              <Card
                key={i}
                className="text-fontlight border-none rounded-[14px] bg-gradient-to-r from-[#00a766]/10 to-[#999999]/10 backdrop-blur-[9.3px] overflow-hidden p-6 w-full"
              >
                <CardContent className="flex flex-col aspect-[5/2] items-center justify-center -p-6">
                  <div className="flex items-end justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Image
                        src={card.photo}
                        alt="altr"
                        width={48}
                        height={48}
                      />
                      <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-medium capitalize">
                          {card.username}
                        </h2>
                        <div className="flex items-start gap-2 text-yellow-500">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaRegStar />
                        </div>
                      </div>
                    </div>
                    <div className="text-base font-normal">{card.date}</div>
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <h1 className="text-xl font-bold capitalize">
                      {card.head}
                    </h1>
                    <p className="text-base font-normal">{card.description}</p>
                  </div>
                  {/* <span className="text-3xl font-semibold">{index + 1}</span> */}
                </CardContent>
              </Card>
            ))}
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious className="left-0 text-black bg-secondary w-16 h-16" />
      <CarouselNext className="right-0 text-black bg-secondary w-16 h-16" /> */}
    </Carousel>
  );
}

export default ReviewsCarousel;
