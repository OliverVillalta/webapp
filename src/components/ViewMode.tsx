import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export const DarkModeToggle = ({ className = "" }) => {
  const getInitialTheme = () => {
    if (localStorage.theme === "dark") return "dark";
    if (localStorage.theme === "light") return "light";

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };

  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
  const root = document.documentElement;
  theme === "dark" ? root.classList.add("dark") : root.classList.remove("dark");
  localStorage.theme = theme;
  }, [theme]);


  const toggleTheme = () =>
    setTheme(prev => (prev === "dark" ? "light" : "dark"));

  return (
    <button
      onClick={toggleTheme}
      className={`rounded-full transition hover:cursor-pointer ${className}`}
    >
      {theme === "dark" ? (
        <Sun size={22} className="text-white hover:text-yellow-200 transition" />
      ) : (
        <Moon size={22} className="text-black hover:text-emerald-500 transition" />
      )}
    </button>
  );
};

