import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

async function getHabit(userUid: string, habitId: string) {
  // Reference to the specific habit document
  const habitRef = doc(db, "users", userUid, "habits", habitId);
  const habitSnap = await getDoc(habitRef);

  if (habitSnap.exists()) {
    console.log("Habit data:", habitSnap.data());
    return habitSnap.data(); // Return habit data if needed
  } else {
    console.log("No such habit found!");
    return null;
  }
}

export default getHabit;
