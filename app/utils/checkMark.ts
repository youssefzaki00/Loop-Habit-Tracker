import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

async function checkMark(
  userUid: string,
  habitId: string | string[],
  habitChecked: any,
  habits: any[],
  setHabits: any
) {
  try {
    const habitRef = doc(db, `users/${userUid}/habits/${habitId}`);
    await setDoc(habitRef, habitChecked);
    const updatedHabits = habits.map((habit) =>
      habit.id === habitId ? habitChecked : habit
    );
    console.log(updatedHabits);

    setHabits(updatedHabits);
  } catch (error) {
    toast.error(`Error checking habit: ${error.message}`);
  }
}
export default checkMark;
