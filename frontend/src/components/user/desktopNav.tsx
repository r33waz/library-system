"use client";

import { SIGNUPSTATUS } from "@/data/enum";
import { useAppDispatch } from "@/hooks/hooks";
import { IUserDetails } from "@/interface/auth.interface";
import { logout } from "@/rtk/thunk/auth.thunk";
import fullName from "@/utils/fullName";
import { Avatar } from "@radix-ui/react-avatar";
import { BookMarked, HelpingHand, LogOut, User, Verified } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CustomeToolTip from "../common/customeTooltip";
import ThemeSwitch from "../common/themeSwitch";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface MenuItem {
  name: string;
  path?: string;
  subMenu?: { name: string; path: string }[];
}

interface DesktopNavProps {
  menuItems: MenuItem[];
  userDetails?: IUserDetails;
}

const DesktopNav = ({ menuItems, userDetails }: DesktopNavProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);


  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate("/auth/login");
      });
  };

  // Click outside to close logic
  useEffect(() => {
    const handleScroll = () => {
      setOpenMenu(null);
      setProfileOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="hidden md:flex items-center gap-10 relative">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="relative"
          ref={openMenu === index ? menuRef : null}
        >
          {item.subMenu ? (
            <>
              <div
                onClick={() => setOpenMenu(openMenu === index ? null : index)}
                className={`flex gap-1 items-center cursor-pointer hover:text-green-secondary ${
                  pathname === item?.path ? "text-green-secondary" : ""
                }`}
              >
                <span className="font-light">{item.name}</span>
              </div>
              {openMenu === index && (
                <div className="absolute top-12.5 border h-80 custome-scroll overflow-y-auto mt-2 bg-white dark:bg-dark-bg shadow-md rounded p-2 z-50 w-52">
                  {item.subMenu.map((sub, idx) => (
                    <NavLink
                      key={idx}
                      to={`${sub?.path}`}
                      className={`block px-3 py-2 text-xs rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        pathname === sub.path ? "text-green-secondary" : ""
                      }`}
                      onClick={() => setOpenMenu(null)} // Close menu when clicking submenu link
                    >
                      {sub.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </>
          ) : (
            <NavLink
              to={item.path ?? ""}
              className={`flex gap-1 items-center hover:text-green-secondary ${
                pathname === item?.path ? "text-green-secondary" : ""
              }`}
            >
              <span className="font-light">{item.name}</span>
            </NavLink>
          )}
        </div>
      ))}

      <ThemeSwitch />

      {userDetails ? (
        <div
          className="relative flex items-center gap-2 border rounded-full py-2 px-4"
          ref={profileOpen ? profileRef : null}
        >
          <div
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex gap-2 items-center cursor-pointer "
          >
            <div className="flex flex-col ">
              <span className="text-xs">
                {fullName({
                  firstName: userDetails?.user?.firstname,
                  middleName: userDetails?.user?.middlename,
                  lastName: userDetails?.user?.lastname,
                })}{" "}
              </span>
              <span className="text-[12px]">{userDetails?.email}</span>
            </div>
            <Avatar className="h-10 w-10 relative  border rounded-full">
              <AvatarImage
                src={"no image"}
                alt="user avatar"
              />
              <AvatarFallback className="flex items-center bg-green-100 justify-center h-full w-full text-sm font-medium text-green-900">
                {userDetails?.user?.universityId?.[0] ??
                  `${userDetails?.user?.firstname?.[0] ?? ""}${
                    userDetails?.user?.lastname?.[0] ?? ""
                  }`}
              </AvatarFallback>
              {userDetails?.user?.status === SIGNUPSTATUS?.PENDING ? (
                <CustomeToolTip title={"Not Verified"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 absolute top-7 text-white bg-secondary-primary rounded-full right-0"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width="1.5"
                      d="M12 16h.008M12 8v5m10-1c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10"
                    />
                  </svg>
                </CustomeToolTip>
              ) : (
                <CustomeToolTip title={"Verified"}>
                  <Verified className="h-4 w-4 absolute top-7 text-white bg-blue-500 rounded-full right-0" />
                </CustomeToolTip>
              )}
            </Avatar>
          </div>

          {profileOpen && (
            <div className="absolute top-16 right-0 border mt-2 bg-white dark:bg-dark-bg shadow-md rounded-md p-2 z-50 w-52">
              <NavLink
                to={`/e-book/profile`}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isActive
                      ? "text-green-secondary font-medium"
                      : "text-gray-700 dark:text-gray-300"
                  }`
                }
                onClick={() => setProfileOpen(false)}
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </NavLink>
              <NavLink
                to={`/e-book/user/wishlist`}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isActive
                      ? "text-green-secondary font-medium"
                      : "text-gray-700 dark:text-gray-300"
                  }`
                }
                onClick={() => setProfileOpen(false)}
              >
                <BookMarked className="h-4 w-4 mr-2" />
                Wishlist
              </NavLink>
              <NavLink
                to={`/e-book/user/borrow-history`}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isActive
                      ? "text-green-secondary font-medium"
                      : "text-gray-700 dark:text-gray-300"
                  }`
                }
                onClick={() => setProfileOpen(false)}
              >
                <HelpingHand className="h-4 w-4 mr-2" />
                Borrow History
              </NavLink>
              <Button
                onClick={handleLogout}
                className="flex items-center w-full justify-start shadow-none px-3 py-2 text-sm rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-error-red"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate("/auth/login")}
            className={`flex gap-1 items-center bg-green-primary text-white ${
              pathname === "/auth/login" ? "text-green-secondary" : ""
            }`}
          >
            <span className="font-light">Sign In</span>
          </Button>
          <Button
            onClick={() => navigate("/auth/register")}
            className={`flex gap-1 items-center bg-white text-green-primary border border-green-primary ${
              pathname === "/auth/signup" ? "text-green-secondary" : ""
            }`}
          >
            <span className="font-light">Sign Up</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default DesktopNav;
