import { SIGNUPSTATUS } from "@/data/enum";
import { useAppDispatch } from "@/hooks/hooks";
import { IUserDetails } from "@/interface/auth.interface";
import { logout } from "@/rtk/thunk/auth.thunk";
import fullName from "@/utils/fullName";
import { Avatar } from "@radix-ui/react-avatar";
import { BookMarked, HelpingHand, User, Verified } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomeToolTip from "../common/customeTooltip";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface MenuItem {
  name: string;
  path?: string;
  subMenu?: { name: string; path: string }[];
}

interface MobileNavProps {
  menuItems: MenuItem[];
  userDetails?: IUserDetails;
  closeMenu: () => void;
  isOpen: boolean; // Added to track menu open state from parent
}

const MobileNav = ({
  menuItems,
  userDetails,
  closeMenu,
  isOpen,
}: MobileNavProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  // Handle scroll to close menu
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        closeMenu();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, closeMenu]);

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        closeMenu();
        navigate("/auth/login");
      });
  };

  return (
    <div
      ref={menuRef}
      className={`bg-white dark:bg-dark-secondary shadow-lg  p-4 z-50 max-h-[80vh] overflow-y-auto transition-all duration-300 ${
        isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-100 dark:border-gray-800 last:border-0 py-1"
          >
            {item.subMenu ? (
              <>
                <div
                  onClick={() => setOpenMenu(openMenu === index ? null : index)}
                  className="flex justify-between items-center cursor-pointer p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <span className="text-base">{item.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {openMenu === index ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                {openMenu === index && (
                  <div className="pl-4 py-1 mt-1 bg-gray-50 dark:bg-gray-800 rounded-md h-60 overflow-y-auto">
                    {item.subMenu.map((sub, idx) => (
                      <NavLink
                        key={idx}
                        to={sub.path}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `block px-3 py-2 text-sm rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            isActive
                              ? "text-green-secondary font-medium"
                              : "text-gray-700 dark:text-gray-300"
                          }`
                        }
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
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-3 py-2 text-base rounded-md transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    isActive
                      ? "text-green-secondary font-medium"
                      : "text-gray-700 dark:text-gray-300"
                  }`
                }
              >
                {item.name}
              </NavLink>
            )}
          </div>
        ))}
      </div>

      {/* Profile Section */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        {userDetails ? (
          <div className="space-y-2">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex gap-2 justify-between items-center cursor-pointer p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-sm">
                    {fullName({
                      firstName: userDetails?.user?.firstname,
                      middleName: userDetails?.user?.middlename,
                      lastName: userDetails?.user?.lastname,
                    })}{" "}
                  </span>
                  <span className="text-xs">{userDetails?.email}</span>
                </div>
                <Avatar className="h-10 w-10 bg-green-100 border rounded-full relative">
                  <AvatarImage src={"no image"} alt="user avatar" />
                  <AvatarFallback className="flex items-center  justify-center h-full w-full text-sm font-medium text-green-900">
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
              <span className="text-gray-500 dark:text-gray-400">
                {profileOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </span>
            </div>
            {profileOpen && (
              <div className="pl-4 py-1 mt-1 bg-gray-50 dark:bg-gray-800 rounded-md">
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
                  to={`/user/wishlist`}
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
                  to={`/user/borrow-history`}
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
                  className="flex  items-center w-full justify-start px-3 py-2 text-sm rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500 dark:text-red-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3 mt-4">
            <Button
              onClick={() => {
                closeMenu();
                navigate("/auth/login");
              }}
              className="w-full bg-green-primary hover:bg-green-600 text-white transition-colors duration-200 py-2 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Sign In
            </Button>
            <Button
              onClick={() => {
                closeMenu();
                navigate("/auth/register");
              }}
              className="w-full bg-white hover:bg-gray-50 text-green-primary border border-green-primary transition-colors duration-200 py-2 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
