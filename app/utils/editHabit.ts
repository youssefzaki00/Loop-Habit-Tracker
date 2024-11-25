import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

async function editHabit(
  editedHabit: any,
  userId: string,
  habitId: string | string[],
  habits: any[],
  setHabits: any
) {
  try {
    const habitRef = doc(db, `users/${userId}/habits/${habitId}`);

    await setDoc(habitRef, editedHabit);

    const updatedHabits = habits.map((habit) =>
      habit.id === habitId ? { id: habitId, ...editedHabit } : habit
    );
    setHabits(updatedHabits);
    toast.success("Habit successfully edited!");
  } catch (error) {
    toast.error(`Error editing habit: ${error.message}`);
  }
}

export default editHabit;
