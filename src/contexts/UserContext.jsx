// src/contexts/UserContext.jsx
import { createContext, useState, useEffect } from "react";
import { auth, db, storage } from "../utils/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateUserPosts } from "../utils/firestoreUtils";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userDocRef = doc(db, "users", authUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUser({ ...authUser, ...userDoc.data() });
        } else {
          await setDoc(userDocRef, {
            email: authUser.email,
            name: "",
            bio: "",
            photoURL: "",
          });
          setUser({
            ...authUser,
            email: authUser.email,
            name: "",
            bio: "",
            photoURL: "",
          });
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

  const handleImageChange = async (file) => {
    if (file) {
      const storageRef = ref(storage, `profile_pictures/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await updateUserProfile({ photoURL: url });
    }
  };

  const updateUserProfile = async (updates) => {
    try {
      const currentUser = auth.currentUser;
      const userDocRef = doc(db, "users", currentUser.uid);

      await updateDoc(userDocRef, updates);

      if (updates.photoURL) {
        await updateUserPosts(currentUser.uid, {
          authorPhotoURL: updates.photoURL,
        });
      }

      setUser((prevUser) => ({ ...prevUser, ...updates }));
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        theme,
        toggleTheme,
        logout,
        handleImageChange,
        updateUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
