import { toast } from "react-toastify";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword, GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword, signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useSignupWithEmail() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter(); // For redirecting after successful signup

  const submitUserData = async (
    username: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    setError(null); // Reset error on new submission

    try {
      // Create a user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = userCredential.user;

      // Set the user profile with the username (display name)
      await updateProfile(userData, { displayName: username });

      // Send email verification
      await sendEmailVerification(userData);

      // Set user state
      setUser(userData);

      // Show info toast to emphasize email verification
      toast.info(
        "Sign up successful! Please verify your email to complete registration.",
      );

      // Optionally, redirect to another page after signup
      router.push("/auth/verify-email"); // Or wherever you want the user to go after sign up
    } catch (err) {
      console.error("Error during signup:", err);
      setError(err.message); // Set error message if any

      // Show error toast
      toast.error("Sign up failed. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return { user, error, isLoading, submitUserData };
}

export function useLoginWithEmail() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter(); // Optionally, use for redirection after login

  const loginUser = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null); // Reset error on new login attempt
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const loggedInUser = userCredential.user;

      setUser(loggedInUser);
      toast.success("Logged in successfully!");

      router.push("/");
    } catch (err) {
      console.error("Error during login:", err);
      setError(err.message);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return { user, error, isLoading, loginUser };
}
export function useSignout() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter(); // Optionally, use for redirection after login
  const signOutUser = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      router.push("/auth/login");
      toast.success("The signout was successful");
    } catch (err) {
      setError(err.message);
      toast.error("Something went wrong! Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return { error, isLoading, signOutUser };
}
export const useGoogleAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const provider = new GoogleAuthProvider();

  const googleSignIn = async () => {
    setIsLoading(true); // Set loading to true when the sign-in process starts
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      toast.success("Logged in with Google successfully!");
    } catch (error: any) {
      const errorMessage = error.message;
      setError(errorMessage);
      toast.error(`Google Auth error: ${errorMessage}`);
      console.error("Google Auth Error", error);
    } finally {
      setIsLoading(false); // Reset loading state after the sign-in process completes
    }
  };

  return { user, error, isLoading, googleSignIn };
};