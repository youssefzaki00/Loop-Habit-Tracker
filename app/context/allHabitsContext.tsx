"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import getAllHabits from "../utils/getAllHabits";
import { useUser } from "./userContext";

interface AllHabitsContextType {
  habits: any[];
  setHabits: React.Dispatch<React.SetStateAction<any[]>>;
  loading: boolean;
}

export const AllHabitsContext = createContext<AllHabitsContextType | undefined>(
  undefined
);

export const AllHabitsProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: userLoading } = useUser();

  useEffect(() => {
    const fetchHabits = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const allHabits = await getAllHabits(user.uid);
        setHabits(allHabits);
      } catch (error) {
        console.error("Error fetching habits:", error);
        setHabits([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchHabits();
    }
  }, [user]);

  return (
    <AllHabitsContext.Provider value={{ habits, setHabits, loading }}>
      {children}
    </AllHabitsContext.Provider>
  );
};
export const useHabits = () => {
  const context = useContext(AllHabitsContext);
  if (context === undefined) {
    throw new Error("useHabits must be used within a AllHabitsProvider");
  }
  return context;
};
