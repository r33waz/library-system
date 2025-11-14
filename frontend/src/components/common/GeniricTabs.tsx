"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

type TabItem = {
  id: string;
  name: string;
  slug: string;
};

const SCROLL_AMOUNT = 150;

const GenericTab = ({
  genres,
  className,
  button,
}: {
  genres: TabItem[];
  className?: string;
  button?: boolean;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col w-full gap-8">
      <Tabs defaultValue={genres[0]?.name} className="w-full">
        {/* Scrollable tab header with arrows */}
        <div className="relative w-full">
          {/* Left arrow */}
          {button && (
            <button
              aria-label="scroll left"
              onClick={scrollLeft}
              className="absolute md:left-0 right-10 md:top-4 -top-6 z-10 h-8 w-8 flex items-center justify-center dark:bg-white bg-gray-3 text-white dark:text-black rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className={` w-full overflow-x-auto scrollbar-custom ${className}`}
          >
            <TabsList className="flex-nowrap h-14   gap-1  w-max min-w-full bg-gray-1/50">
              {genres?.map(({ slug, name }) => (
                <TabsTrigger
                  key={slug}
                  value={slug}
                  className=" px-3 font-light flex-shrink-0 dark:text-white h-10 dark:data-[state=active]:bg-inherit data-[state=active]:border-b-green-primary dark:data-[state=active]:border-b-green-primary border-2 dark:data-[state=active]:text-foreground"
                >
                  {name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Right arrow */}
          {button && (
            <button
              aria-label="scroll right"
              onClick={scrollRight}
              className="absolute right-0 md:top-4 -top-6 z-10 h-8 w-8 flex items-center justify-center dark:bg-white bg-gray-3 text-white dark:text-black rounded-full"
            >
              <ChevronRight className="w-5 h-5 " />
            </button>
          )}
        </div>

        {/* Tab content */}
        <div className="mt-6">
          {genres?.map(({ slug }) => (
            <TabsContent
              key={slug}
              value={slug}
              className="p-4 border rounded-lg"
            ></TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default GenericTab;
