import { ChevronLeft, ChevronRight } from "lucide-react";

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <div
      className="absolute z-10 left-2 top-1/2  -translate-y-1/2 cursor-pointer bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
      onClick={onClick}
    >
      <ChevronLeft className="h-5 w-5 text-black" />
    </div>
  );
  
  // Custom Next Arrow
  const NextArrow = ({ onClick }: { onClick?: () => void }) => (
    <div
      className="absolute z-10 right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
      onClick={onClick}
    >
      <ChevronRight className="h-5 w-5 text-black" />
    </div>
  );

  export { NextArrow, PrevArrow };
