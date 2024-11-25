"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { UserContextType } from "../interfaces";
import { useRouter } from "next/navigation";

// Define the shape of the context value

// Create the context with the defined type
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// Create the provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userUid, setUserUid] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user: FirebaseUser | null) => {
        if (user) {
          setUserUid(user.uid);
          setLoading(false);
        } else {
          router.push("/auth/verify-email");

          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ userUid, loading }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
