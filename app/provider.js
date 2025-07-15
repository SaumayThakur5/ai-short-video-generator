
"use client";
import React, { useState, useEffect, useContext } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import { AuthContext } from "./_context/AuthContext";
import { ConvexProvider, ConvexReactClient, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function Provider({ children }) {
  const [user, setUser] = useState(null);
  const createUser = useMutation(api.users.CreateNewUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Send data to Convex (fire and forget)
        await createUser({
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          pictureURL: firebaseUser.photoURL,
        });

        // Save Firebase user for frontend usage (includes photoURL)
        setUser(firebaseUser);
      } else {
        setUser(null); // Clear on logout
      }
    });

    return () => unsubscribe();
  }, [createUser]);

  return (
    <AuthContext.Provider value={{ user }}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export default Provider;
