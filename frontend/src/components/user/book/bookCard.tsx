import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IBooks } from "@/interface/book.interface";
import formatPrice from "@/utils/priceFormater";
import { BookOpen, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BorrowButton from "../BorrowBook/borrowButton";
import WishListButton from "../wishlistBook/wishListButton";


export default function BookCard({
  className,
  book,
}: {
  className?: string;
  book: IBooks;
}) {
  console.log("🚀 ~ book:", book);
  const navigate = useNavigate();

  // Calculate the actual rating from book data (assuming book has rating property)
  // If not available, we'll use the placeholder
  // const rating = book?.rating || 4.5;
  // const reviewCount = book?.reviewCount || 42;

  return (
    <Card
      className={`w-full overflow-hidden transition-all duration-300 hover:shadow-xl group ${className} dark:bg-dark-secondary`}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          loading="lazy"
          src={`${
            book?.coverImage?.path || "/public/svg/book-fallback-image.svg"
          }`}
          alt={`${book?.title} cover`}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />

        {/* Add a subtle gradient overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3">
          <WishListButton bookId={book?.id} />
        </div>
      </div>

      <CardHeader className="">
        <CardTitle className="text-lg font-semibold line-clamp-2 leading-tight">
          {book?.title.length > 20
            ? book?.title.slice(0, 20) + "..."
            : book?.title}
        </CardTitle>
        <CardDescription className="text-sm font-medium">
          by {book.author}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-amber-500 text-amber-500"
                // className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-amber-500 text-amber-500" : i < rating ? "fill-amber-500 text-amber-500 opacity-80" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-green-primary text-sm">
            {formatPrice(book?.price)} / day
          </span>
        </div>
        <div
          className="text-sm text-muted-foreground line-clamp-3"
          dangerouslySetInnerHTML={{
            __html:
              book?.description?.length > 40
                ? book?.description.slice(0, 40) + "..."
                : book?.description,
          }}
        />
      </CardContent>

      <CardFooter className="flex flex-col gap-2 pt-1 px-4">
        <BorrowButton
          bookId={book?.id}
          libraryId={book?.library?.id}
          avilabelCopies={book?.availableCopies}
          className = "w-full"
          mode="borrow"
        />
        <Button
          aria-label="Details"
          onClick={() => navigate(`/e-book/${book?.id}`)}
          className="bg-green-primary w-full text-white text-sm flex items-center gap-1 h-9"
          variant="default"
        >
          <BookOpen className="w-4 h-4" />
          <span>Details</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
