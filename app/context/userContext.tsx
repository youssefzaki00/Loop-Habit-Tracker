"use client";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Define the context type
interface UserContextType {
  user: FirebaseUser | null;
  loading: boolean;
  addUserDataToDB: (userId: string, userData: any) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        if (firebaseUser.emailVerified) {
          setUser(firebaseUser);
        } else {
          if (!redirecting) {
            setRedirecting(true);
            router.replace("/auth/verify-email");
          }
        }
      } else {
        if (!redirecting) {
          setRedirecting(true);
          router.replace("/auth/login");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, redirecting]);

  const addUserDataToDB = async (userId: string, userData: any) => {
    if (!userId) {
      toast.error("User ID is required.");
      return;
    }

    try {
      const userDocRef = doc(db, `users/${userId}`);
      await setDoc(userDocRef, JSON.parse(JSON.stringify(userData)), {
        merge: true,
      });

      toast.success("User data added successfully!");
    } catch (error: any) {
      console.error("Error adding user data:", error);
      toast.error(`Error adding user data: ${error.message}`);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, addUserDataToDB }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
