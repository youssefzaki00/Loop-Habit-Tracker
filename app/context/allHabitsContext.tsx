"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import getAllHabits from "../utils/getAllHabits";
import { useUser } from "../hooks/useUser";
import Loading from "@/app/Loading/Loading";

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
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: userLoading } = useUser();

  useEffect(() => {
    const fetchHabits = async () => {
      if (user) {
        setIsLoading(true); // Start loading when fetching habits
        try {
          const allHabits = await getAllHabits(user.uid); // Fetch user habits
          setHabits(allHabits); // Set habits when successfully fetched
        } catch (error) {
          console.error("Error fetching habits:", error); // Log any errors
          setHabits([]); // Set habits to an empty array on error, could be customized
        } finally {
          setIsLoading(false); // Stop loading once the request finishes
        }
      }
    };

    // Only fetch habits if the user is available (user is not null)
    if (user) {
      fetchHabits();
    }

  }, [user]); // Fetch habits whenever the user changes

  // Show loading screen if either user or habits are loading
  if (isLoading || userLoading) return <Loading />;

  return (
      <AllHabitsContext.Provider value={{ habits, setHabits, loading: isLoading }}>
        {children}
      </AllHabitsContext.Provider>
  );
};
