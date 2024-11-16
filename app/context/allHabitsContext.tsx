"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import getAllHabits from "../utils/getAllHabits";
import { useUser } from "./userContext";
import { booleanHabit, measurableHabit } from "../interfaces";

type Habit = measurableHabit | booleanHabit;

interface AllHabitsContextType {
  habits: any;
  setHabits: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
}

export const AllHabitsContext = createContext<AllHabitsContextType | undefined>(
  undefined
);

export const AllHabitsProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userUid } = useUser(); // Call the hook to get the userUid

  useEffect(() => {
    const fetchHabits = async () => {
      if (userUid) {
        setLoading(true);
        const allHabits = await getAllHabits(userUid);
        setHabits(allHabits);
        setLoading(false);
      }
    };
    fetchHabits();
  }, [userUid]); // Add userUid as a dependency

  return (
    <AllHabitsContext.Provider value={{ habits, setHabits, loading }}>
      {children}
    </AllHabitsContext.Provider>
  );
};
