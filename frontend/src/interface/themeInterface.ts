export interface ThemeContextType {
    theme: string;          // theme can either be "light" or "dark"
    setTheme: (theme: "light" | "dark" | "system") => void; // setTheme is a function that takes a string (either "light" or "dark")
  }
  