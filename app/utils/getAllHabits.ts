import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

async function getAllHabits(userUid: string) {
  // const docRef = doc(db, "users", userUid);
  // const docSnap = await getDoc(docRef);
  const habitsCollectionRef = collection(db, "users", userUid, "habits");
  const habitsSnap = await getDocs(habitsCollectionRef);
  if (!habitsSnap.empty) {
    const habits = habitsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return habits;
  } else {
    console.log("No such document or habits found!");
    return [];
  }
}

export default getAllHabits;
