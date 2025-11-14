import { SmallCardSkeleton } from "@/components/common/skeletonLoading";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getLatestBook } from "@/rtk/thunk/book.thunk";
import { MoveRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const HeroSecFourth = () => {
  const dispatch = useAppDispatch();
  const { latestBook, isLatestBookLoading } = useAppSelector(
    (state) => state.book
  );

  useEffect(() => {
    dispatch(getLatestBook());
  }, [dispatch]);

  return (
    <div className="md:p-14 bg-gradient-to-tl from-gray-50 to-green-secondary">
      <div className="grid  md:grid-cols-3 grid-cols-1 gap-5 md:p-0  p-4">
        <div className="md:col-span-2 border rounded flex items-center justify-center">
          asdsad
        </div>

        <div className="flex flex-col  gap-4 min-h-[300px] bg-white dark:bg-dark-primary rounded dark:text-white p-6">
          <h1 className="md:text-3xl text-2xl">Latest book</h1>
          {isLatestBookLoading ? (
            <SmallCardSkeleton count={latestBook?.length ?? 5} />
          ) : (
            latestBook?.map((i, idx) => (
              <div
                key={idx}
                className="flex flex-col shadow-xs dark:shadow-gray-3 p-3"
              >
                <div className="flex gap-4">
                  <img
                  loading="lazy"
                    src={i?.coverImage?.path}
                    alt={i?.title}
                    className="w-20 h-20 object-fill"
                  />
                  <div className="flex flex-col gap-1 w-full">
                    <h1 className="font-medium">{i?.title}</h1>
                    <span className="text-xs">
                      {i?.description.length > 70
                        ? i?.description.slice(0, 70) + "..."
                        : i?.description}
                    </span>
                    <div className="flex justify-end items-center gap-1.5 text-green-secondary">
                      <Link
                        className="text-xs text-right w-fit"
                        to={`/e-book/${i?.id}`}
                      >
                        Read Now
                      </Link>
                      <MoveRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSecFourth;
