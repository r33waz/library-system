import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IWishList } from "@/interface/wishList.interface";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BoorowButton from "../BorrowBook/borrowButton";
import WishListButton from "./wishListButton";

function WishListCard({
  wishlist,
}: {
  clasName?: string;
  wishlist: IWishList;
}) {
  const navigate = useNavigate();
  return (
    <Card className="w-full  overflow-hidden transition-all hover:shadow-lg relative">
      <div className="aspect-[7/8] relative ">
        <img
          loading="lazy"
          src={`${
            wishlist?.book?.coverImage?.path ||
            "/public/svg/book-fallback-image.svg"
          }`}
          alt="Book cover"
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
      </div>
      <div className="absolute top-10 right-4">
        <WishListButton bookId={wishlist?.book?.id} />
      </div>
      <CardHeader className="">
        <CardTitle className="md:text-lg text-base w-full line-clamp-3">
          {wishlist.book.title?.length > 20
            ? wishlist.book?.title?.slice(0, 30) + "..."
            : wishlist?.book?.title}
        </CardTitle>
        <CardDescription className="text-sm">
          by {wishlist?.book?.author}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
          ))}
          <Star className="w-4 h-4 text-amber-500" />
          <span className="text-xs ml-2 text-muted-foreground">
            (42 reviews)
          </span>
        </div>
        <div
          className="text-sm text-muted-foreground line-clamp-3"
          dangerouslySetInnerHTML={{
            __html:
              wishlist?.book?.description.length > 100
                ? `${wishlist?.book?.description.slice(0, 100)}...`
                : wishlist?.book?.description,
          }}
        />
      </CardContent>

      <CardFooter className="flex  justify-between gap-2 w-full">
        <div className="flex items-center gap-2">
          <BoorowButton
            mode="borrow"
            bookId={wishlist?.book?.id}
            libraryId={wishlist?.library?.id}
            avilabelCopies={wishlist?.book?.availableCopies}
          />
          <Button
            aria-label="view details"
            onClick={() => navigate(`/e-book/${wishlist?.book?.id}`)}
            className=" bg-secondary-primary text-white text-xs h-8"
          >
            Viev Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default WishListCard;
