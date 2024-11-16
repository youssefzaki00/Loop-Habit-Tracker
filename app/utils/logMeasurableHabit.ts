import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

async function logMeasurableHabit(
  userUid: string,
  habitId: string | string[],
  habitLogged: any,
  habits: any[],
  setHabits: any
) {
  try {
    const habitRef = doc(db, `users/${userUid}/habits/${habitId}`);
    await setDoc(habitRef, habitLogged);
    const updatedHabits = habits.map((habit) =>
      habit.id === habitId ? habitLogged : habit
    );

    setHabits(updatedHabits);
  } catch (error) {
    toast.error(`Error checking habit: ${error.message}`);
  }
}
export default logMeasurableHabit;
