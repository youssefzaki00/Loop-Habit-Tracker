import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signInAnonymouslyUser } from "../firebase/auth"; // Adjust import as needed
import { toast } from "react-toastify";

export const useAnonymousAuth = () => {
  const [userUid, setUserUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid); // Set the UID of the currently signed-in user
        setLoading(false);
      } else {
        signInAnonymouslyUser().then(() => {
          setLoading(false); // End loading state after sign-in
        });
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  return { userUid, loading };
};
