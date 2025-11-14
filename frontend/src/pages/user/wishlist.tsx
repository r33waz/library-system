import BreadCrumb from "@/components/common/breadCrumb";
import { BookCardSkeleton } from "@/components/common/skeletonLoading";
import WishListCard from "@/components/user/wishlistBook/wishlistCard";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getWishListById } from "@/rtk/thunk/wishList.thunk";
import { useEffect } from "react";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { userDeatails } = useAppSelector((state) => state.auth);
  const { wishList, isLoading } = useAppSelector((state) => state.wishList);

  const userId = userDeatails?.user?.id;

  useEffect(() => {
    if (userId) {
      dispatch(getWishListById({ id: userId }));
    }
  }, [userId, dispatch]);

  return (
    <section className=" ">
      <BreadCrumb
        items={[{ label: "Home", href: "/e-book/home" }, { label: "Wishlist" }]}
      />

      <div className="mt-6">
        {isLoading ? (
          <BookCardSkeleton count={wishList?.length ?? 0} />
        ) : wishList && wishList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishList.map((item) => (
              <WishListCard wishlist={item} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[100dvh]">
            <h1 className="text-2xl font-semibold text-center mt-6">
              No books in your wishlist.
            </h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
