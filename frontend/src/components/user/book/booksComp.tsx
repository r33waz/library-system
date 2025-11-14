import BreadCrumb from "@/components/common/breadCrumb";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { IBooks } from "@/interface/book.interface";
import { getBookList } from "@/rtk/thunk/book.thunk";
import { useMentTags } from "@/utils/metaTags";
import formatPrice from "@/utils/priceFormater";
import { Book, BookOpen, Filter, Grid2X2, Grid3X3, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericSelect from "../../common/GenericSelect";
import PaginationComp from "../../common/pagination";
import SearchInput from "../../common/searchInput";
import { BookCardSkeleton } from "../../common/skeletonLoading";
import { Button } from "../../ui/button";
import BorrowOrUpdateButton from "../BorrowBook/borrowButton";

function BooksComp() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid4" | "grid2">("grid4");

  const dispatch = useAppDispatch();
  const { books, isBooksLoading, totalPages } = useAppSelector(
    (state) => state.book
  );
  console.log("🚀 ~ BooksComp ~ books:", books)
  useMentTags("Books");
  const navigate = useNavigate();
  const { genre } = useAppSelector((state) => state.genre);
  const { categories } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(
      getBookList({
        search: search,
        page: page,
        genre: selectedGenre,
        category: selectedCategory,
        limit: 20,
      })
    );
  }, [search, selectedGenre, selectedCategory, page]);

  const genreOptions = genre?.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  const categoryOptions = categories?.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  // Get grid classes based on view mode
  const getGridClasses = () => {
    if (viewMode === "grid4") {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4";
    } else {
      return "grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4";
    }
  };

  // Get card classes based on view mode
  const getCardClasses = () => {
    const baseClasses =
      "group bg-white/80 dark:bg-dark-secondary dark:text-white backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300";

    if (viewMode === "grid2") {
      return `${baseClasses} flex flex-col sm:flex-row`;
    } else {
      return `${baseClasses} flex flex-col`;
    }
  };

  return (
    <>
      <div className=" mb-12">
        <BreadCrumb
          items={[{ label: "Home", href: "/" }, { label: "Books" }]}
        />
        <div className="mt-5">
          <h1 className="text-3xl font-bold  text-gray-900 dark:text-white sm:text-4xl">
            Find Your Perfect Content
          </h1>
          <p className="mt-3 max-w-2xl  text-xl text-gray-500 sm:mt-4">
            Browse our extensive collection using the filters below
          </p>
        </div>
      </div>
      <div className="flex  justify-between items-center md:flex-nowrap flex-wrap gap-2 ">
        <SearchInput
          onChange={setSearch}
          value={search}
          className="md:w-1/3 w-full  h-12 dark:text-white text-base"
        />
        <div className="flex itms-center justify-baseline gap-4 md:w-fit w-full">
          <GenericSelect
            className="md:w-80 w-full h-96 text-base "
            title={selectedGenre ? selectedGenre : "Select Genre"}
            options={genreOptions ?? []}
            selectedOption={selectedGenre}
            setSelectedOption={setSelectedGenre}
          />
          <GenericSelect
            className="md:w-80 w-full h-96 text-base"
            title={selectedCategory ? selectedCategory : "Select Category"}
            options={categoryOptions ?? []}
            selectedOption={selectedCategory}
            setSelectedOption={setSelectedCategory}
          />
          <div className="flex items-center  dark:bg-dark-secondary rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid4")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid4"
                  ? " text-green-primary shadow-sm dark:bg-dark-bg"
                  : "text-green-primary hover:text-green-secondary"
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("grid2")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid2"
                  ? " text-green-primary shadow-sm dark:bg-dark-bg"
                  : "text-green-primary hover:text-green-secondary"
              }`}
            >
              <Grid2X2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center mt-4">
        {selectedGenre && (
          <div className="px-4  text-sm rounded-full flex items-center gap-2 bg-gray-4 dark:bg-gray-400 h-6">
            {selectedGenre}
            <X
              className="w-4 h-4 cursor-pointer text-error-red"
              onClick={() => {
                setSelectedGenre("");
              }}
            />
          </div>
        )}
        {selectedCategory && (
          <div className="px-4  text-sm rounded-full flex items-center gap-2 bg-gray-4 dark:bg-gray-400 h-6">
            {selectedCategory}
            <X
              className="w-4 h-4 cursor-pointer text-error-red"
              onClick={() => {
                setSelectedCategory("");
              }}
            />
          </div>
        )}
        {(selectedGenre || selectedCategory) && (
          <Button
            aria-label="Clear All"
            onClick={() => {
              setSelectedGenre("");
              setSelectedCategory("");
            }}
            className="px-4  text-error-red border border-error-red  text-sm rounded-full h-6 font-light flex items-center gap-2 "
          >
            Clear All <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div className="md:hidden">
        <button
          type="button"
          className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-secondary-primary text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all duration-200"
        >
          <Filter className="h-5 w-5 mr-2 text-white" />
          <span>Filters</span>
        </button>
      </div>
      <div className={getGridClasses()}>
        {isBooksLoading ? (
          <BookCardSkeleton count={8} />
        ) : books && books.length > 0 ? (
          books?.map((item: IBooks) => (
            <div key={item.id} className={getCardClasses()}>
              {/* Book Cover */}
              <div
                className={`relative ${
                  viewMode === "grid2"
                    ? "w-full sm:w-48 h-48 sm:h-full flex-shrink-0"
                    : "w-full h-64 p-4"
                }`}
              >
                {item?.coverImage?.path ? (
                  <img
                    src={item.coverImage.path}
                    alt={item?.title}
                    className={`${
                      viewMode === "grid2"
                        ? "w-full h-full object-cover"
                        : "w-full h-full object-cover rounded-xl mx-auto shadow-lg group-hover:shadow-xl transition-shadow"
                    }`}
                  />
                ) : (
                  <div
                    className={`${
                      viewMode === "grid2"
                        ? "w-full h-full"
                        : "w-full h-full mx-auto"
                    } bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-inner`}
                  >
                    <Book className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <Badge className= {`${viewMode === "grid2"? "absolute bottom-0 right-0":"absolute top-4 right-4"}`} >
                  {item?.availableCopies > 0
                    ? `${item?.availableCopies} Copies Available`
                    : "Out of Stock"}
                  <span className="ml-1">
                    {item?.availableCopies > 0 ? "📚" : "❌"}
                  </span>
                </Badge>
              </div>

              {/* Book Details */}
              <div
                className={`${
                  viewMode === "grid2" ? "flex-1 p-6" : "p-6 pt-2"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3
                    className={`font-bold  group-hover:text-green-primary transition-colors ${
                      viewMode === "grid2" ? "text-xl" : "text-lg line-clamp-2"
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>

                <p className=" font-medium mb-3">by {item.author}</p>

                {item?.description && (
                  <p
                    className={` text-sm mb-4 ${
                      viewMode === "grid2" ? "line-clamp-3" : "line-clamp-2"
                    }`}
                  >
                    {item.description}
                  </p>
                )}

                <div className="flex flex-col gap-1">
                  <span className="text-xs">Categories</span>
                  <div>
                    {item?.category?.map((cat, idx) => {
                      return (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-gray-3  text-white border-0 rounded-full py-1 px-4 space-x-2 mr-2 mb-2"
                        >
                          {cat.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs">Genre</span>
                  <div>
                    {item?.genre?.map((gen, idx) => {
                      return (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-gray-3  text-white border-0 rounded-full py-1 px-4 space-x-2 mr-2 mb-2"
                        >
                          {gen.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 mt-4">
                  <div className="flex flex-col">
                    <span className="text-xs  uppercase tracking-wide font-medium">
                      Price per day
                    </span>
                    <span className="text-xl font-bold  text-green-primary">
                      {formatPrice(item.price)} / day
                    </span>
                  </div>
                </div>

                <div
                  className={`flex gap-2 ${
                    viewMode === "grid2"
                      ? "flex-col sm:flex-row sm:items-center"
                      : "flex-col"
                  }`}
                >
                  <BorrowOrUpdateButton
                    bookId={item?.id}
                    libraryId={item?.library?.id}
                    avilabelCopies={item?.availableCopies}
                    className={`${
                      viewMode === "grid2" ? "sm:flex-1" : "w-full"
                    }`}
                    mode="borrow"
                  />
                  <Button
                    aria-label="Details"
                    onClick={() => navigate(`/e-book/${item?.id}`)}
                    className={`bg-green-primary text-white text-sm flex items-center gap-1 h-9 ${
                      viewMode === "grid2" ? "sm:flex-1" : "w-full"
                    }`}
                    variant="default"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Details</span>
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground h-screen place-content-center-safe text-2xl">
            No Book found {search}.
          </div>
        )}
      </div>
      <div className="flex items-center justify-center mt-8 w-full ">
        <PaginationComp
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </>
  );
}

export default BooksComp;
