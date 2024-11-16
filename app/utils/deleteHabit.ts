import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
const deleteHabit = async (
  userId: string,
  habitId: string,
  habits: any,
  setHabits: any
) => {
  try {
    const habitRef = doc(db, `users/${userId}/habits/${habitId}`);

    await deleteDoc(habitRef);

    // Update the local habits state by filtering out the deleted habit
    const updatedHabits = habits.filter((habit) => habit.id !== habitId);
    setHabits(updatedHabits);
    toast.success("Habit successfully deleted!");
  } catch (error) {
    toast.error(`Error deleting habit: ${error.message}`);
  }
};

export default deleteHabit;
