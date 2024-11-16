import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

async function addHabit(
  habitData: any,
  userId: string,
  habits: any[],
  setHabits: any
) {
  try {
    const habitCollection = collection(db, `users/${userId}/habits/`);
    const docRef = await addDoc(habitCollection, habitData);

    const newHabit = { ...habitData, id: docRef.id };

    setHabits([...habits, newHabit]);
    toast.success("Habit added successfully!");
  } catch (error) {
    toast.error(`Error editing habit: ${error.message}`);
  }
}

export default addHabit;
