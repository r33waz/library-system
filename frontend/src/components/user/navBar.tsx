"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { IUserDetails } from "@/interface/auth.interface";
import { getAllCategories } from "@/rtk/thunk/category.thunk";
import { GetAllGenre } from "@/rtk/thunk/genre.thunk";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeSwitch from "../common/themeSwitch";
import DesktopNav from "./desktopNav";
import MobileNav from "./mobileNav";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  // const { categories } = useAppSelector((state) => state.category);
  // const { genre } = useAppSelector((state) => state.genre);
  const { userDeatails } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(GetAllGenre());
  }, [dispatch]);

  // Close mobile menu on location change
  const { pathname } = useLocation();
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const menuItems = [
    {
      name: "Home",
      path: "/e-book/home",
    },
    {
      name: "About",
      path: "/e-book/about",
    },
    {
      name: "Books",
      path: "/e-book/books",
    },
    {
      name: "Contact",
      path: "/e-book/contact",
    }
  ];

  return (
    <div className="flex items-center justify-between w-full px-4 md:px-10 py-4 sticky top-0 z-50 shadow-sm dark:shadow-gray-5 bg-white dark:bg-gray-6 dark:text-white">
      {/* Logo */}
      <Link to="/e-book/home" className="flex-shrink-0">
        <img
          loading="lazy"
          src="/images/Light mode logo.png"
          alt="Logo"
          className="h-12 md:h-16 object-contain dark:hidden block"
        />
        <img
          loading="lazy"
          src="/images/darkmode.png"
          alt="Logo"
          className="h-12 md:h-16 object-contain dark:block hidden"
        />
      </Link>

      {/* Desktop Navigation */}
      <DesktopNav
        menuItems={menuItems}
        userDetails={userDeatails as IUserDetails}
      />

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-4">
        <ThemeSwitch />
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-700 dark:text-gray-300 focus:outline-none relative z-50"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="dark:text-white" />
          ) : (
            <Menu className="dark:text-white" />
          )}
        </button>

        {/* Mobile Menu Container */}
        <div className={`fixed z-40 ${mobileMenuOpen ? "block" : "hidden"}`}>
          {/* Backdrop */}
          <div
            className="fixed  transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Menu Panel */}
          <div className="fixed top-20 right-0 w-full">
            <MobileNav
              menuItems={menuItems}
              userDetails={userDeatails as IUserDetails}
              closeMenu={() => setMobileMenuOpen(false)}
              isOpen={mobileMenuOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
