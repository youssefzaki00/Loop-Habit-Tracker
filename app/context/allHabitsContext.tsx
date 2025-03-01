"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import getAllHabits from "../utils/getAllHabits";
import Loading from "@/app/Loading/Loading";
import { useUser } from "./userContext";

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
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading: userLoading } = useUser();

  useEffect(() => {
    const fetchHabits = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const allHabits = await getAllHabits(user.uid);
          setHabits(allHabits);
        } catch (error) {
          console.error("Error fetching habits:", error);
          setHabits([]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (user) {
      fetchHabits();
    }
  }, [user]);

  if (isLoading || userLoading) return <Loading />;

  return (
    <AllHabitsContext.Provider
      value={{ habits, setHabits, loading: isLoading }}
    >
      {children}
    </AllHabitsContext.Provider>
  );
};
