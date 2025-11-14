import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getWishListById, toggleWishList } from "@/rtk/thunk/wishList.thunk";
import { Heart } from "lucide-react";
import { Button } from "../../ui/button";

const WishListButton = ({ bookId }: { bookId: string }) => {
  const dispatch = useAppDispatch();
  const { userDeatails } = useAppSelector((state) => state.auth);
  console.log("🚀 ~ WishListButton ~ userDeatails:", userDeatails)
  const { wishList } = useAppSelector((state) => state.wishList);

  const isWished = wishList?.some(
    (item) => item.bookId === bookId && item.userId === userDeatails?.user?.id
  );

  const handleClick = () => {
    if (userDeatails?.user?.id && bookId) {
      dispatch(toggleWishList({ bookId, userId: userDeatails.user?.id })).then(
        () => {
          dispatch(getWishListById({ id: userDeatails.user.id }));
        }
      );
    }
  };

  return (
    <Button
      aria-label="Wish List"
      onClick={handleClick}
      className="bg-white w-fit backdrop-blur-sm cursor-pointer  rounded-full transition-colors"
    >
      <Heart
        className="h-7 w-7"
        stroke={isWished ? "" : "black"}
        fill={isWished ? "red" : "none"}
      />
    </Button>
  );
};

export default WishListButton;
