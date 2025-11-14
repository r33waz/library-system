import GenericSelect from "@/components/common/GenericSelect";
import PaginationComp from "@/components/common/pagination";
import SearchInput from "@/components/common/searchInput";
import ThemeSwitch from "@/components/common/themeSwitch";
import LibraryBookModal from "@/components/Library/LibraryBookModal";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { IBooks } from "@/interface/book.interface";
import { getBooksByLibrary } from "@/rtk/thunk/book.thunk";
import { getAllCategories } from "@/rtk/thunk/category.thunk";
import { GetAllGenre } from "@/rtk/thunk/genre.thunk";
import { useMentTags } from "@/utils/metaTags";
import formatPrice from "@/utils/priceFormater";
import {
  Book,
  BookOpen,
  EyeIcon,
  Grid2X2,
  Grid3X3,
  Library,
} from "lucide-react";
import { useEffect, useState } from "react";

function LibraryBooks() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [viewMode, setViewMode] = useState("grid-4");
  const [selectedBook, setSelectedBook] = useState("");
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();
  const { userDeatails } = useAppSelector((state) => state.auth);
  console.log("🚀 ~ LibraryBooks ~ userDeatails:", userDeatails);
  const { books, totalPages } = useAppSelector((state) => state.book);
  console.log("🚀 ~ LibraryBooks ~ books:", books);
  const { genre } = useAppSelector((state) => state.genre);
  const { categories } = useAppSelector((state) => state.category);

  const genreOptions = genre?.map((item) => ({
    label: item.name,
    value: item.name,
  }));
  const categoryOptions = categories?.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  useMentTags("Library-Books - Library Management System");

  useEffect(() => {
    dispatch(GetAllGenre());
    dispatch(getAllCategories());
    if (userDeatails) {
      dispatch(
        getBooksByLibrary({
          id: userDeatails?.library?.id ?? userDeatails?.libraryEmp.library?.id,
          page,
          search,
          genre: selectedGenre,
          category: selectedCategory,
        })
      );
    }
  }, [dispatch, userDeatails, page, search, selectedGenre, selectedCategory]);

  const clearFilters = () => {
    setSelectedGenre("");
    setSelectedCategory("");
    setSearch("");
  };

  const hasActiveFilters = search || selectedGenre || selectedCategory;

  return (
    <div className="min-h-screen p-6">
      <ThemeSwitch />
      <div>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <Library className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent">
                Library Dashboard
              </h1>
              <p className="dark:text-white text-black mt-1">
                Welcome to
                <span className="font-medium text-2xl  text-green-primary px-2">
                  {userDeatails?.library?.name ??
                    userDeatails?.libraryEmp?.library?.name}
                </span>
                library dashboard
              </p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-sm rounded-2xl p-6 shadow-lg border mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 w-full lg:w-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 w-full">
                  <SearchInput
                    onChange={setSearch}
                    value={search}
                    className="h-10"
                  />
                </div>
                <div className="flex md:flex-row flex-col gap-3 w-full md:w-auto">
                  <GenericSelect
                    className="w-full h-60 bg-white dark:bg-dark-primary rounded-xl shadow-sm"
                    title={selectedGenre || "All Genres"}
                    options={genreOptions ?? []}
                    selectedOption={selectedGenre}
                    setSelectedOption={setSelectedGenre}
                  />
                  <GenericSelect
                    className="w-full h-60 bg-white dark:bg-dark-primary rounded-xl shadow-sm"
                    title={selectedCategory || "All Categories"}
                    options={categoryOptions ?? []}
                    selectedOption={selectedCategory}
                    setSelectedOption={setSelectedCategory}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                >
                  Clear Filters
                </button>
              )}
              <div className="flex items-center rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid-4")}
                  className={`p-2 rounded-md ${
                    viewMode === "grid-4"
                      ? "dark:bg-dark-secondary text-green-primary shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  title="Grid 4"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid-2")}
                  className={`p-2 rounded-md ${
                    viewMode === "grid-2"
                      ? "dark:bg-dark-secondary text-green-primary shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  title="Grid 2"
                >
                  <Grid2X2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {books?.length > 0 ? (
          <>
            <div
              className={`grid gap-6 ${
                viewMode === "grid-4"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                  : "grid-cols-1 sm:grid-cols-2"
              }`}
            >
              {books.map((item: IBooks) => (
                <div
                  key={item?.id}
                  className="group relative bg-white/80 dark:bg-dark-secondary backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col"
                >
                  <Button
                    onClick={() => {
                      setSelectedBook(item?.id);
                      setShowModal(true);
                    }}
                    className="absolute top-4 right-4 z-50 bg-secondary-primary text-white  rounded-full hover:bg-green-secondary"
                  >
                    <EyeIcon />
                  </Button>
                  <div className="relative w-full h-64 p-4">
                    {item.coverImage?.path ? (
                      <img
                        src={item.coverImage.path ?? ""}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                        <Book className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-black dark:text-white mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-white text-sm mb-2">
                      by {item.author}
                    </p>
                    <p className="text-gray-600 dark:text-white text-sm line-clamp-2 mb-4">
                      {item.description}
                    </p>
                    <div>
                      <span className="text-xs text-gray-500 dark:text-white uppercase">
                        Price per day
                      </span>
                      <div className="text-lg font-bold text-green-primary">
                        {formatPrice(item.price)} / day
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30">
                <PaginationComp
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center shadow-lg border border-white/30">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Books Found
            </h3>
            <p className="text-gray-600 mb-6">
              {hasActiveFilters
                ? "Try adjusting your search criteria or clear the filters."
                : "Start building your library collection by adding some books."}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>
      {selectedBook && showModal && (
        <LibraryBookModal
          book={selectedBook}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default LibraryBooks;
