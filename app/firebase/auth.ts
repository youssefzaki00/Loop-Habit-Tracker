import { toast } from "react-toastify";
import { auth } from "./firebase";
import {
  signInAnonymously, // Import anonymous sign-in
  UserCredential,
} from "firebase/auth";
import { initializeUserData } from "../utils/InitializeHabits";

/**
 * Sign in anonymously.
 *
 * @returns A promise that resolves with the user credentials or rejects with an error.
 */
export const signInAnonymouslyUser =
  async (): Promise<UserCredential | void> => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      console.log("User is already signed in:", currentUser.uid);
      await initializeUserData(currentUser.uid); // Check if user data is initialized
      return { user: currentUser } as UserCredential; // Simulate returning UserCredential for an already logged-in user
    } else {
      try {
        const userCredential: UserCredential = await signInAnonymously(auth);
        console.log("User signed in anonymously:", userCredential.user);
        toast.success("Signed in anonymously");

        // Initialize Firestore data
        const userUid = userCredential.user.uid;
        await initializeUserData(userUid);

        return userCredential; // Return the user credentials after signing in
      } catch (error) {
        console.error("Error during anonymous sign-in:", error);
        toast.error("Something went wrong, try again.");
        return undefined;
      }
    }
  };
