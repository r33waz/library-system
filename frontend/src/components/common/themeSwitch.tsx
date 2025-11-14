import { ThemeContext } from "@/context/themeContext";
import { ThemeContextType } from "@/interface/themeInterface";
import { Computer, Moon, PcCase, Sun } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";

const ThemeSwitch = () => {
  const { theme, setTheme } = useContext(ThemeContext) as ThemeContextType;
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  // Detect system theme on mount
  useEffect(() => {
    if (theme === "system") {
      setTheme(systemPrefersDark ? "dark" : "light");
    }
  }, [theme, setTheme, systemPrefersDark]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        aria-label="theme"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-2 rounded-full border bg-white dark:border-gray-700  dark:bg-gray-800 dark:text-white transition"
      >
        {theme === "light" ? (
          <Sun size={24} />
        ) : theme === "dark" ? (
          <Moon size={24} />
        ) : (
          <Computer size={24} />
        )}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute left-1/2 transform -translate-x-5/6 mt-2 w-36 bg-white dark:bg-gray-800 border rounded-md shadow-md p-1">
          <button
            aria-label="light theme"
            onClick={() => {
              setTheme("light");
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            <Sun size={22} /> Light
          </button>
          <button
            aria-label="dark theme"
            onClick={() => {
              setTheme("dark");
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            <Moon size={22} /> Dark
          </button>
          <button
            aria-label="system theme"
            onClick={() => {
              setTheme("system");
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            <PcCase size={22} /> System
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitch;
