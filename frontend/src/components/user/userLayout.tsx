import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getWishListById } from "@/rtk/thunk/wishList.thunk";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../common/footer";
import NavBar from "./navBar";

const UserLayout = () => {
  const disptatch = useAppDispatch();
  const { userDeatails } = useAppSelector((state) => state.auth);
  useEffect(() => {
    disptatch(getWishListById({ id: userDeatails?.user?.id as string }));
  }, [disptatch, userDeatails?.user?.id]);

  return (
    <div className="">
      <NavBar />
      <main className="w-full md:px-6 px-4 mt-4 flex-1 min-h-[100dvh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
