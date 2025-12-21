import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  Archive,
  Book,
  Inbox,
  LayoutDashboardIcon,
  LogOutIcon,
  Menu,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "../ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLES } from "@/data/enum";
import { logout } from "@/rtk/thunk/auth.thunk";
import { Button } from "../ui/button";

function LibrarySideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userDeatails } = useAppSelector((state) => state.auth);
  console.log("🚀 ~ LibrarySideBar ~ userDeatails:", userDeatails);
  const dispatch = useAppDispatch();

  const sideBarRef = useRef<HTMLDivElement>(null);

  // when clicked outside of sidebar close it
  const handleOutsideClick = (e: MouseEvent) => {
    if (sideBarRef.current && !sideBarRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const menuItems = [
    {
      icon: <LayoutDashboardIcon size={20} />,
      label: "Dashboard",
      link: "/library/dashboard",
    },
    {
      icon: <Users size={20} />,
      label: "Employees",
      link: "/library/employees",
      role: ROLES?.LIBRARY_ADMIN,
    },
    {
      icon: <Archive size={20} />,
      label: "Borrow",
      link: "/library/borrow",
    },
    {
      icon: <Inbox size={20} />,
      label: "Borrow Request",
      link: "/library/borrow-requests",
    },
    {
      icon: <Book size={20} />,
      label: "Books",
      link: "/library/books",
    },
  ];

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate("/auth/login");
      });
  };

  const renderDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex gap-1 items-center dark:text-white ${
          isOpen ? "hover:bg-gray-1 dark:hover:bg-dark-primary" : ""
        } text-black w-full   rounded-sm cursor-pointer`}
      >
        <Avatar className="border pl-2 pt-1">
          {userDeatails?.library?.name?.[0] ??
            userDeatails?.libraryEmp?.firstname?.[0] ??
            "H"}
        </Avatar>
        {isOpen && (
          <div className="flex flex-col items-start gap-1 ">
            <span className="text-xs">{userDeatails?.library?.name}</span>
            <span className="text-xs">{userDeatails?.email}</span>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 p-2">
        <DropdownMenuLabel className="flex gap-2 items-center">
          <Avatar className="border pl-2 pt-1">
            {userDeatails?.library?.name?.[0] ??
              userDeatails?.libraryEmp?.firstname?.[0] ??
              "H"}
          </Avatar>
          <div className="flex flex-col items-start gap-1 ">
            <span className="text-xs">
              {userDeatails?.libraryEmp?.firstname}{" "}
              {userDeatails?.libraryEmp?.lastname}
            </span>
            <span className="text-xs">{userDeatails?.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-3 items-center px-4 hover:bg-gray-1 dark:hover:bg-dark-primary">
          <User size={20} className="dark:text-white" />
          <Link
            className="text-sm w-full"
            to={`/library/profile/${userDeatails?.library?.id ?? userDeatails?.libraryEmp?.id}`}
          >
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-1 items-center hover:bg-gray-1 dark:hover:bg-dark-primary">
          <Button
            aria-label="Logout"
            onClick={handleLogout}
            className="text-sm font-normal justify-start w-full flex gap-2 items-center shadow-none dark:text-white text-black"
          >
            <LogOutIcon size={20} />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div
      ref={sideBarRef}
      className={`fixed top-0 left-0 h-screen bg-gray-2 dark:bg-gray-800 dark:text-white z-50 flex flex-col  ${
        isOpen ? "w-72" : "w-14"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-end p-4">
        <Button
          aria-label="Toggle Sidebar"
          onClick={() => setIsOpen(!isOpen)}
          className={`dark:text-white flex ${
            isOpen ? "justify-end" : "justify-center"
          }  w-full`}
        >
          {isOpen ? (
            <X size={30} className="text-black dark:text-white" />
          ) : (
            <Menu size={30} className="text-black dark:text-white" />
          )}
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-2 p-2 grow">
        {menuItems
          .filter(
            (item) => !item.role || item.role === userDeatails?.library?.role
          )
          .map((item, index) => (
            <Link
              to={item.link}
              key={index}
              onClick={() => setIsOpen(true)}
              className={`flex text-sm items-center gap-4 p-2 rounded-md cursor-pointer transition-colors ${
                pathname === item.link
                  ? "bg-gray-1 dark:bg-gray-3 font-medium"
                  : "hover:bg-gray-1 dark:hover:bg-gray-3"
              } ${isOpen ? "w-full" : "w-fit"}`}
            >
              <span>{item.icon}</span>
              {isOpen && <span>{item.label}</span>}
            </Link>
          ))}
      </nav>

      {/* User Dropdown */}
      <div className="p-4 border-t border-gray-700">{renderDropdown()}</div>
    </div>
  );
}

export default LibrarySideBar;
