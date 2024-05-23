import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(UserContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-4"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
    </button>
  );
};

export default ThemeToggle;
