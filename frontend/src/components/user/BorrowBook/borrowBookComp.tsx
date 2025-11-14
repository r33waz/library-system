import { DateRangeFilter } from "@/components/common/dateFilter";
import PaginationComp from "@/components/common/pagination";
import SearchInput from "@/components/common/searchInput";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getuserBorrow } from "@/rtk/thunk/borrow.thunk";
import { useEffect, useState } from "react";
import BorrowBookCard from "./borrowBookCard";

const BorrowComponent = () => {
  const [search, setSearch] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { borrowBook, totalPages } = useAppSelector(
    (state) => state.borrowBook
  );

  useEffect(() => {
    dispatch(
      getuserBorrow({
        page,
        search,
        startDate,
        endDate,
      })
    );
  }, [dispatch, page, search, startDate, endDate]);

  console.log("🚀 ~ BorrowComponent ~ borrowBook:", borrowBook);
  return (
    <section className="mt-6">
      <div className="flex items-end justify-between">
        <SearchInput onChange={setSearch} className="max-w-[350px]" />
        <DateRangeFilter setStartDate={setStartDate} setEndDate={setEndDate} />
      </div>

      {borrowBook?.length === 0 ? (
        <div className="flex items-center justify-center h-[100dvh]">
          <h1 className="text-2xl font-semibold text-center mt-6">
            No Book Borrowed
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {borrowBook?.map((book, idx) => (
            <BorrowBookCard IBorrowBooks={book} key={idx} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-center mt-8 w-full ">
        <PaginationComp
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </section>
  );
};

export default BorrowComponent;
