import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getSingleBook } from "@/rtk/thunk/book.thunk";
import formatPrice from "@/utils/priceFormater";
import { BookOpen, X } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../ui/button";

const LibraryBookModal = ({
  book,
  showModal,
  setShowModal,
}: {
  book: string;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const { singleBook, isSingleBookLoading } = useAppSelector(
    (state) => state.book
  );

  useEffect(() => {
    if (book) {
      dispatch(getSingleBook(book));
    }
  }, [book]);

  console.log("🚀 ~ singleBook:", singleBook);

  return (
    <div>
      <Button
        onClick={() => setShowModal(!showModal)}
        className="bg-secondary-primary text-white backdrop-blur-sm p-2 cursor-pointer rounded-full hover:bg-green-secondary hover:text-white transition-colors"
      >
        <BookOpen className="" size={24} />
      </Button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4">
          {/* Close button positioned relative to the backdrop, not the modal content */}
          <div className="absolute top-4 right-4 z-60">
            <button
              onClick={() => setShowModal(false)}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          <div className="relative bg-white dark:bg-dark-secondary rounded-2xl shadow-2xl w-full max-w-6xl h-[95vh] md:overflow-hidden overflow-y-scroll flex flex-col overflow-hidden border border-gray-100">
            {isSingleBookLoading ? (
              <div className="flex items-center justify-center dark:bg-dark-secondary ">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">
                    Loading book details...
                  </p>
                </div>
              </div>
            ) : singleBook ? (
              <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto">
                {/* Book Cover Section */}
                <div className="dark:bg-dark-secondary bg-white p-6 lg:p-8 flex justify-center lg:justify-start items-start lg:w-80 shrink-0">
                  <div className="text-center lg:text-left">
                    <div
                      className="w-96 h-96 lg:w-72 lg:h-[600px] rounded-xl shadow-2xl mx-auto lg:mx-0 flex items-center justify-center text-white font-bold overflow-hidden transform hover:scale-105 transition-transform duration-300"
                      style={{
                        backgroundColor: singleBook.coverColor || "#6B7280",
                      }}
                    >
                      {singleBook.coverImage?.path ? (
                        <img
                          src={singleBook.coverImage.path}
                          alt={singleBook.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <BookOpen size={64} className="opacity-80" />
                      )}
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                        <div className=" font-bold text-emerald-600">
                         {formatPrice(singleBook.price)}
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          PRICE
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                        <div className=" font-bold text-blue-600">
                          {singleBook.availableCopies}
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          AVAILABLE
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Book Details Section */}
                <div className="flex-1 p-6 lg:p-8 flex flex-col dark:bg-dark-secondary bg-white ">
                  {/* Title and Author */}
                  <div className="mb-6">
                    <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                      {singleBook.title}
                    </h1>
                    <p className="text-lg lg:text-xl text-gray-600 dark:text-white font-medium">
                      by{" "}
                      <span className="text-gray-800 dark:text-green-primary">{singleBook.author}</span>
                    </p>
                  </div>

                  {/* Content Grid */}
                  <div className="gap-6 mb-6">
                    {/* Left Column */}
                    <div className="space-y-5">
                      {/* Genres */}
                      {singleBook.genre && singleBook.genre.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">
                            Genres
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {singleBook.genre.map((g) => (
                              <span
                                key={g.id}
                                className="px-3 py-1.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                              >
                                {g.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Categories */}
                      {singleBook.category &&
                        singleBook.category.length > 0 && (
                          <div>
                            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">
                              Categories
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {singleBook.category.map((c) => (
                                <span
                                  key={c.id}
                                  className="px-3 py-1.5 bg-linear-to-r from-purple-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                                >
                                  {c.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Library Info */}
                      {singleBook.library && (
                        <div className="bg-linear-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3 flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            Library Information
                          </h3>
                          <div className="space-y-2">
                            <p className="text-gray-700 font-medium">
                              {singleBook.library.name}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {singleBook.library.email}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {singleBook.library.phoneNumber}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="mt-4">
                      {/* Description */}
                      {singleBook.description && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-800 dark:text-white uppercase tracking-wide mb-3">
                            Description
                          </h3>
                          <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                            <p className="text-sm text-gray-700 leading-relaxed line-clamp-6">
                              {singleBook.description}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Summary */}
                      {singleBook.summary && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-800 dark:text-white mt-4 uppercase tracking-wide mb-3">
                            Summary
                          </h3>
                          <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                            <p className="text-sm text-gray-700 leading-relaxed line-clamp-6">
                              <div dangerouslySetInnerHTML={
                                { __html: singleBook.summary }
                              } />
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Video Links Footer */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-secondary-primary uppercase tracking-wide mb-4">
                      Watch Options
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {singleBook.videoUrlNeplai && (
                        <Button
                          onClick={() =>
                            window.open(singleBook.videoUrlNeplai, "_blank")
                          }
                          className="bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                          🇳🇵 Nepali
                        </Button>
                      )}
                      {singleBook.videoUrlEnglish && (
                        <Button
                          onClick={() =>
                            window.open(singleBook.videoUrlEnglish, "_blank")
                          }
                          className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                          🇺🇸 English
                        </Button>
                      )}
                      {singleBook.videoUrlHindi && (
                        <Button
                          onClick={() =>
                            window.open(singleBook.videoUrlHindi, "_blank")
                          }
                          className="bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                          🇮🇳 Hindi
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-linear-to-r from-gray-50 to-gray-100">
                <div className="text-center">
                  <BookOpen size={64} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">
                    No book details available
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryBookModal;