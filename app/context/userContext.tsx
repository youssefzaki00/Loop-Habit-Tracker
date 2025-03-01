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
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loading from "@/app/Loading/Loading";

// Define the shape of the context value
export const UserContext = createContext(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [habits, setHabits] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user: FirebaseUser | null) => {
        if (user) {
          if (user.emailVerified) {
            setUser(user);
          } else {
            router.push("/auth/verify-email");
          }
        } else {
          router.push("/auth/login");
        }
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const addUserDataToDB = async (userId, userData) => {
    if (!userId) {
      toast.error("User ID is required.");
      return;
    }

    try {
      // Convert userData to a plain object
      const plainUserData = JSON.parse(JSON.stringify(userData));

      // Firestore requires an even number of segments for document paths
      const userDocRef = doc(db, `users/${userId}`); // Valid document path

      // Set the entire userData as a document
      await setDoc(userDocRef, plainUserData, { merge: true });

      setHabits((prevHabits) => [
        ...prevHabits,
        { id: userId, ...plainUserData },
      ]);

      toast.success("User data added successfully!");
    } catch (error) {
      console.error("Error adding user data:", error);
      toast.error(`Error adding user data: ${error.message}`);
    }
  };

  if (loading) return <Loading />;

  return (
    <UserContext.Provider value={{ user, loading, habits, addUserDataToDB }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
