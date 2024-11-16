import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

async function getAllHabits(userUid: string) {
  const docRef = doc(db, "users", userUid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());

    // New code to get habits
    const habitsCollectionRef = collection(db, "users", userUid, "habits");
    const habitsSnap = await getDocs(habitsCollectionRef);

    // Extract habit data from the snapshot
    const habits = habitsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return habits; // Return the array of habits
  } else {
    console.log("No such document or habits found!");
    return []; // Return an empty array if no habits are found
  }
}

export default getAllHabits;
