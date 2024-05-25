// src/contexts/UserContext.jsx
import { createContext, useState, useEffect } from "react";
import { auth, db } from "../utils/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUser({ ...user, ...userDoc.data() });
        } else {
          await setDoc(userDocRef, { email: user.email, name: "" });
          setUser({ ...user, email: user.email, name: "" });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }

    localStorage.setItem("theme", theme);

    return unsubscribe;
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  const updateUser = async (updatedUser) => {
    const userDocRef = doc(db, "users", updatedUser.uid);
    const userData = {
      uid: updatedUser.uid,
      email: updatedUser.email,
      name: updatedUser.name,
    };
    await setDoc(userDocRef, userData);
    setUser(updatedUser);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, theme, toggleTheme, logout, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
