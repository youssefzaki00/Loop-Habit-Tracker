"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import Loading from "../Loading/Loading";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleErrors = (error) => {
    console.error(error);
    if (!error.message.includes("auth/")) return;
    setError(error.message);
    toast.error(error.message);
  };

  const addUserDataToDB = async (userId, userData) => {
    if (!userId) {
      toast.error("User ID is required.");
      return;
    }
    try {
      const userCollectionRef = collection(db, `users/${userId}/userData`);
      await addDoc(userCollectionRef, userData);
      toast.success("User data added successfully!");
    } catch (error) {
      console.error("Error adding user data:", error);
      toast.error(`Error adding user data: ${error.message}`);
    }
  };

  const signup = async (username, email, password) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = userCredential.user;
      await updateProfile(userData, { displayName: username });
      await addUserDataToDB(userData.uid, { username, email });
      await sendEmailVerification(userData);
      setUser(userData);
      router.push("/auth/verify-email");
      toast.info(
        "Sign up successful! Please verify your email to complete registration."
      );
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      router.push("/");
      setUser(userCredential.user);
    } catch (error) {
      handleErrors(error);
    } finally {
      toast.success("Logged in successfully!");
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      toast.success("Logged in with Google successfully!");
      router.push("/");
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
      router.replace("/auth/login");
      toast.success("The signout was successful");
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signup,
        login,
        googleLogin,
        logout,
        addUserDataToDB,
      }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

const SkeletonLoader = () => (
  <div className="animate-pulse flex flex-col gap-4 p-4">
    <div className="h-6 w-48 bg-gray-300 rounded-md" />
    <div className="h-6 w-32 bg-gray-300 rounded-md" />
  </div>
);
