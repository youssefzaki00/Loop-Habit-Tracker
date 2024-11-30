"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { UserContextType } from "../interfaces"; // Ensure your interfaces reflect the full user data
import { useRouter } from "next/navigation";
import Loading from "@/app/Loading/Loading";

// Define the shape of the context value
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
      if (user) {
        if (user.emailVerified) {
          setUser(user); // Set the entire user object
        } else {
          router.push("/auth/verify-email");
        }
        setLoading(false);
      } else {
        router.push("/auth/login");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading/>; // Optionally, you can replace this with a loading spinner
  }

  return (
      <UserContext.Provider value={{ user, loading }}>
        {children}
      </UserContext.Provider>
  );
};
