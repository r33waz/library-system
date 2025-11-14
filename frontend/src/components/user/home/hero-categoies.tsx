import { BookCardSkeleton } from "@/components/common/skeletonLoading";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";

const HeroSecCategory = () => {
  const navigate = useNavigate();
  const { categories, isLoading } = useAppSelector((state) => state.category);

  return (
    <div className="flex flex-col w-full gap-8">
      <h1 className="font-semibold md:text-5xl text-4xl dark:text-white ">
        Categories
      </h1>

      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        {isLoading ? (
          <BookCardSkeleton count={7} />
        ) : (
          categories?.slice(0, 5)?.map((i, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/e-book/genre/${i.slug}`)}
              className={`flex relative flex-col gap-3 cursor-pointer dark:text-white shadow-sm dark:shadow-none dark:border dark:border-gray-5 
                ${idx === 0 ||idx === 4 ? 'md:col-span-2' : ''} // Make the first and fourth items larger
              `}
            >
              <div className="overflow-hidden">
                <img
                  className="w-full border opacity-50 hover:opacity-100 h-80 object-fill border-none transform transition-transform duration-300 hover:scale-110"
                  src={""}
                  alt={i.name}
                />
              </div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center w-full ">
                <h2 className="md:text-base text-sm font-light">{i.name}</h2>
              </div>
            </div>
          ))
        )}
        <div className="flex justify-center items-center h-80 flex-col gap-3 dark:text-white shadow-sm dark:shadow-none dark:border dark:border-gray-5">
          <Button
            aria-label="View More"
            onClick={() => navigate("/genre")}
            className="md:text-sm  border-secondary-secondary border rounded-none text-secondary-primary font-light hover:scale-105 duration-300"
          >
            View More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSecCategory;
