import { ThemeContextType } from "@/interface/themeInterface";
import { createContext, ReactNode, useEffect, useState } from "react";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {

  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState<string>(storedTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
