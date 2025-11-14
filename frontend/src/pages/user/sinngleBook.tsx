"use client";

import ProfessionalBreadcrumb from "@/components/common/breadCrumb";
import ShareBox from "@/components/common/shareBox";
import { SingleBookSkeleton } from "@/components/common/skeletonLoading";
import { Badge } from "@/components/ui/badge";
import BorrowOrUpdateButton from "@/components/user/BorrowBook/borrowButton";
import WishListButton from "@/components/user/wishlistBook/wishListButton";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getSingleBook } from "@/rtk/thunk/book.thunk";
import {
  BookText,
  BookType,
  Globe,
  Star,
  Store,
  Tag,
  Video,
} from "lucide-react";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

// Utility function to extract YouTube Video ID from URL
const getYouTubeVideoId = (url: string) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/watch\?v=)([^\s&]+)/
  );
  return match?.[1] || null;
};

function SingleBook() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { singleBook, isSingleBookLoading } = useAppSelector(
    (state) => state.book
  );

  useEffect(() => {
    if (id) {
      dispatch(getSingleBook(id));
    }
  }, [id, dispatch]);

  const videoUrls = [
    { url: singleBook?.videoUrlHindi, language: "Hindi" },
    { url: singleBook?.videoUrlNeplai, language: "Nepali" },
    { url: singleBook?.videoUrlEnglish, language: "English" },
  ].filter((video) => video.url);

  if (isSingleBookLoading) {
    return <SingleBookSkeleton />;
  }

  return (
    <section className="pb-16">
      <ProfessionalBreadcrumb
        items={[
          { label: "Home", href: "/e-book/home" },
          { label: singleBook?.title as string },
        ]}
      />
      {/* Hero Section */}
      <div className=" inset-0 opacity-10"></div>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Book Cover with Animation */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-secondary-primary rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative md:w-[576px] w-96">
              <img
                loading="lazy"
                src={
                  singleBook?.coverImage?.path ||
                  "/public/svg/book-fallback-image.svg"
                }
                alt={singleBook?.title}
                className="object-cover h-[500px] md:max-w-xl w-full rounded-lg shadow-2xl transform transition duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <WishListButton bookId={singleBook?.id || ""} />
                <ShareBox />
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-400">
                  <Star className="fill-amber-400 h-4 w-4" />
                  <Star className="fill-amber-400 h-4 w-4" />
                  <Star className="fill-amber-400 h-4 w-4" />
                  <Star className="fill-amber-400 h-4 w-4" />
                  <Star className="h-4 w-4" />
                  <span className="ml-2 text-sm text-slate-300">(4.0)</span>
                </div>
              </div>
              <h1 className="font-bold text-4xl md:text-5xl dark:text-white leading-tight">
                {singleBook?.title}
              </h1>
            </div>

            <div className="flex gap-5 items-center md:flex-nowrap flex-wrap">
              <div className="flex items-center gap-2 ">
                <BookType className="h-5 w-5 " />
                <span className="font-medium">Author:</span>
                <span className="">{singleBook?.author}</span>
              </div>
              <NavLink
                to={`/e-book/library/${singleBook?.library?.id}`}
                className="flex items-center gap-2 animate-pulse hover:animate-none"
              >
                <Store className="h-5 w-5 " />
                <span className="font-medium">Library:</span>
                <span className="">{singleBook?.library?.name}</span>
              </NavLink>
            </div>

            <div className="flex flex-col gap-6 pt-2 dark:text-white">
              <div>
                <p className="flex gap-2 items-center mb-2">
                  <Tag className="h-4 w-4" />
                  <span className="text-sm font-medium">Genres</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {singleBook?.genre?.map((genre, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-gray-3  text-white border-0 rounded-full py-1 px-3"
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="flex gap-2 items-center  mb-2">
                  <BookText className="h-4 w-4" />
                  <span className="text-sm font-medium">Categories</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {singleBook?.category?.map((category, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-gray-3  text-white border-0 rounded-full py-1 px-3"
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <BorrowOrUpdateButton
                mode="borrow"
                bookId={singleBook?.id as string}
                libraryId={singleBook?.library?.id as string}
                className="max-w-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Book Summary */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-1 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
            <h2 className="text-2xl font-bold dark:text-white">Book Summary</h2>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div
              className="dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: singleBook?.summary ?? "" }}
            />
          </div>
        </div>
      </div>

      {/* Video Section */}
      {videoUrls.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-1 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
              <h2 className="text-2xl font-bold dark:text-white">
                Video Summaries
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {videoUrls.map((video, idx) => {
                const videoId = getYouTubeVideoId(video?.url ?? "");
                const thumbnailUrl = videoId
                  ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                  : null;

                return (
                  videoId &&
                  thumbnailUrl && (
                    <div
                      key={idx}
                      className="group relative overflow-hidden rounded-xl shadow-lg bg-slate-900"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={thumbnailUrl || "/placeholder.svg"}
                          alt={`${singleBook?.title} - ${video.language} video`}
                          className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                        />
                      </div>

                      {/* Play Button */}
                      <div
                        className="absolute inset-0 flex justify-center items-center cursor-pointer"
                        onClick={() => window.open(video.url, "_blank")}
                      >
                        <div className="bg-black/30 w-full h-full absolute"></div>
                        <div className="relative z-10 bg-white/20 backdrop-blur-sm rounded-full p-4 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30 border border-white/30">
                          <Video className="h-8 w-8 text-white fill-white" />
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="absolute bottom-0 left-0 right-0 bg-green-primary p-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-white font-medium truncate">
                            {singleBook?.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-slate-300" />
                            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                              {video.language}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Fallback message if no video */}
      {videoUrls.length === 0 && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 text-center">
              <Video className="h-12 w-12 mx-auto text-slate-400 mb-4" />
              <p className="text-slate-500 dark:text-slate-400 italic">
                No video summaries are available for this book yet.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SingleBook;
