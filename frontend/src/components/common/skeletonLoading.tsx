import { Skeleton } from "@/components/ui/skeleton";
import { BookText, Tag } from "lucide-react";

export function SmallCardSkeleton({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <div className="flex items-center space-x-4" key={index}>
          <Skeleton className="w-20 h-20" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function BookCardSkeleton({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="w-full md:max-w-sm overflow-hidden">
          {/* Image Placeholder */}
          <div className="aspect-[4/5] relative overflow-hidden">
            <Skeleton className="w-full h-full absolute inset-0" />
            <Skeleton className="absolute top-2 right-2 h-6 w-20 rounded-full" />
          </div>

          {/* Title and Author */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </div>

          {/* Rating + Description */}
          <div className="mt-2">
            <div className="flex gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-4 rounded-full" />
              ))}
              <Skeleton className="h-4 w-16 ml-2" />
            </div>
            <div className="space-y-2 mt-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/6" />
            </div>
          </div>

          {/* Price + Button */}
          <div className="flex justify-between mt-2">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-8 w-24 rounded" />
          </div>
        </div>
      ))}
    </>
  );
}

export function SingleBookSkeleton() {
  return (
    <section className="pb-16">
      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-r from-green-secondary to-gray-3 text-white">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-10"></div>
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Book Cover Skeleton */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg blur opacity-25"></div>
              <div className="relative">
                <Skeleton className="h-[500px] w-[350px] md:max-w-xl rounded-lg shadow-2xl" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-9 w-9 rounded-full" />
                </div>
              </div>
            </div>

            {/* Book Details Skeleton */}
            <div className="flex flex-col gap-6 max-w-2xl w-full">
              <div className="space-y-4">
                {/* Rating Skeleton */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-24 rounded-full" />
                </div>

                {/* Title Skeleton */}
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-3/4 rounded-lg" />
              </div>

              <div className="space-y-4">
                {/* Author Skeleton */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-6 w-32 rounded-lg" />
                </div>

                {/* Description Skeleton */}
                <Skeleton className="h-20 w-full rounded-lg" />
              </div>

              <div className="flex flex-col gap-6 pt-2">
                {/* Genres Skeleton */}
                <div>
                  <p className="flex gap-2 items-center mb-2">
                    <Tag className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-400">
                      Genres
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-8 w-24 rounded-full" />
                    <Skeleton className="h-8 w-32 rounded-full" />
                    <Skeleton className="h-8 w-28 rounded-full" />
                  </div>
                </div>

                {/* Categories Skeleton */}
                <div>
                  <p className="flex gap-2 items-center mb-2">
                    <BookText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-400">
                      Categories
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-8 w-28 rounded-full" />
                    <Skeleton className="h-8 w-24 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Button Skeleton */}
              <div className="flex gap-4 pt-4">
                <Skeleton className="h-14 w-36 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Summary Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-1 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
            <h2 className="text-2xl font-bold dark:text-white">Book Summary</h2>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-6 w-full rounded-lg" />
            <Skeleton className="h-6 w-full rounded-lg" />
            <Skeleton className="h-6 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="h-6 w-5/6 rounded-lg" />
            <Skeleton className="h-6 w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* Video Section Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-1 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
            <h2 className="text-2xl font-bold dark:text-white">
              Video Summaries
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-xl shadow-lg bg-slate-800/20"
              >
                {/* Video Thumbnail Skeleton */}
                <div className="aspect-video">
                  <Skeleton className="h-full w-full" />
                </div>

                {/* Video Info Skeleton */}
                <div className="p-4 bg-green-primary/30">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-32 rounded-lg" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
