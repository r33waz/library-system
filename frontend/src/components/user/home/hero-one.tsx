import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getBookList } from "@/rtk/thunk/book.thunk";
import { NextArrow, PrevArrow } from "@/utils/slickNavigation";
import { BookText, Tag } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import fallbackBookImage from "/svg/book-fallback-image.svg";

const HeroSecOne = () => {
  const dispatch = useAppDispatch();
  const { books } = useAppSelector((state) => state.book);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    vertical: true, // Add this
    verticalSwiping: true,
  };

  useEffect(() => {
    dispatch(getBookList({}));
  }, [dispatch]);

  const featuredBooks = useMemo(() => books?.slice(0, 6) ?? [], [books]);

  if (!books?.length) {
    return (
      <div
        className="flex flex-col items-center justify-center h-[500px] bg-gradient-to-tr from-teal-100 via-white to-teal-200 animate-pulse text-center px-4"
        role="status"
        aria-live="polite"
      >
        <img
          src="/svg/book-fallback-image.svg"
          alt="No books available"
          className="w-24 h-24 mb-6 opacity-80"
        />
        <p className="text-teal-700 text-lg font-semibold">
          No books available at the moment
        </p>
        <p className="text-teal-500 text-sm mt-2">
          Check back later for newly added books to explore and read.
        </p>
      </div>
    );
  }

  return (
    <Slider
      {...settings}
      className="bg-gradient-to-tl from-gray-50 to-teal-300 h-[600px]"
    >
      {featuredBooks.map((book) => (
        <div className="md:p-10 p-4 text-black" key={book?.id}>
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-16 gap-6">
            {/* Text and Button Section */}
            <div className="flex flex-col md:gap-14 gap-7 order-2 md:order-1">
              <h1 className="font-semibold md:text-5xl text-4xl">
                {book?.title}
              </h1>
              <p className="md:text-lg text-justify text-base">
                {book?.description}
              </p>

              <div className="flex flex-col gap-6 pt-2 ">
                {/* Genres */}
                <div>
                  <p className="flex gap-2 items-center mb-2">
                    <Tag className="h-4 w-4" />
                    <span className="text-sm font-medium">Genres</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {book?.genre?.map((genre, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className=" bg-white text-green-primary border-0 rounded-full py-1 px-3"
                      >
                        {genre?.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <p className="flex gap-2 items-center mb-2">
                    <BookText className="h-4 w-4" />
                    <span className="text-sm font-medium">Categories</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {book?.category?.map((category, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className=" bg-white text-green-primary border-0 rounded-full py-1 px-3"
                      >
                        {category?.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                aria-label="details"
                onClick={() => navigate(`/e-book/${book?.id}`)}
                className="bg-secondary-secondary hover:bg-secondary-primary text-white max-w-40 md:mt-16 mt-8"
              >
                Details
              </Button>
            </div>

            {/* Image Section */}
            <div className="order-1 md:order-2">
              <img
                loading="lazy"
                src={book?.coverImage?.path ?? fallbackBookImage}
                className="h-[500px] w-full object-cover"
                alt={book?.title ?? "Book cover"}
              />
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default HeroSecOne;
