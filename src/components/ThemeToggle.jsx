import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    false
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight"
    >
      {darkMode ?  <Sun className="h-6 w-6 text-white" /> : <Moon className="h-6 w-6 text-white" />}
    </button>
  );
};

export default ThemeToggle;
