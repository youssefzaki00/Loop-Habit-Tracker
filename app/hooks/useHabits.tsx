import { useContext } from "react";
import { AllHabitsContext } from "../context/allHabitsContext";

export const useHabits = () => {
  const context = useContext(AllHabitsContext);
  if (context === undefined) {
    throw new Error("useHabits must be used within a AllHabitsProvider");
  }
  return context;
};
