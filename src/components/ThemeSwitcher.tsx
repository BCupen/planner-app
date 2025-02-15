import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      console.log("here");
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [darkMode]);

  return (
    <button
      className="absolute bottom-0 right-0 p-5"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? (
        <SunIcon className="text-primary w-7 h-7" />
      ) : (
        <MoonIcon className="text-primary w-7 h-7" />
      )}
    </button>
  );
};
