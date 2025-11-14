import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface PaginationCompProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComp = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationCompProps) => {
  const pages = [];

  // Calculate the range to display
  const pageRange = 2; // Pages before and after the current page
  const startPage = Math.max(1, currentPage - pageRange);
  const endPage = Math.min(totalPages, currentPage + pageRange);

  // Add pages to show around the current page
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Add "..." if there's a gap before the first page
  if (pages[0] > 1) {
    pages.unshift("..."); // Show "..." before the first page
  }

  // Add "..." if there's a gap after the last page, but don't add it after the last page
  // Add "..." if there's a gap before the first page
  if (typeof pages[0] === "number" && pages[0] > 1) {
    pages.unshift("...");
  }

  // Add "..." if there's a gap after the last page
  const lastPage = pages[pages.length - 1];
  if (typeof lastPage === "number" && lastPage < totalPages) {
    pages.push("...");
  }

  return (
    <Pagination className=" dark:text-white text-black">
      <PaginationContent>
        {/* Previous Page Button */}
        <PaginationItem>
          <Button
            aria-label="Go to previous page"
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
            className={`${
              currentPage === 1 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <ChevronLeft className="h-4 w-4 dark:text-white text-black" />
          </Button>
        </PaginationItem>

        {/* Page Number Links */}
        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationLink href="#" className="cursor-default">
                ...
              </PaginationLink>
            ) : (
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page as number);
                }}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next Page Button */}
        <PaginationItem>
          <Button
            aria-label="Go to next page"
            onClick={() => {
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
            className={`${
              currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <ChevronRight className="h-4 w-4 dark:text-white text-black" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComp;
