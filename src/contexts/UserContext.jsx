// src/contexts/UserContext.jsx
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { auth } from "../firebaseConfig";

export const UserContext = createContext();

export const UserProvider = ({ children, value }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Update theme class on document element
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }

    // Save theme to local storage
    localStorage.setItem("theme", theme);

    return unsubscribe;
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <UserContext.Provider
      value={{ user, setUser, theme, toggleTheme, ...value }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.object,
};
