"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import DaysNavbar from "./habits/DaysNavbar";
import HabitTrack from "./habits/HabitTrack";
import Loading from "./Loading/Loading";
import ChooseModal from "./components/ChooseModal";
import { useUser } from "./context/userContext";
import { useHabits } from "./context/allHabitsContext";
import habitIcon from "../icons/habit.svg";
import Image from "next/image";
const Home = () => {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const { habits, loading: habitsLoading } = useHabits();
  const [dayOffset, setDayOffset] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!userLoading) {
      if (!user) {
        router.replace("/auth/login");
      } else if (!user.emailVerified) {
        router.replace("/auth/login");
      }
    }
  }, [user, userLoading, router]);

  if (userLoading) return <Loading />;
  if (!user || habitsLoading) return null; // Prevents flashing

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const nextPeriod = () => dayOffset < 0 && setDayOffset((prev) => prev + 1);
  const prevPeriod = () => setDayOffset((prev) => prev - 1);

  return (
    <main className="min-h-screen bg-dark2">
      <Header />
      {habits?.length > 0 ? (
        <>
          <DaysNavbar
            dayOffset={dayOffset}
            nextPeriod={nextPeriod}
            prevPeriod={prevPeriod}
          />
          {habits.map((habit, index) => (
            <HabitTrack
              key={habit?.id || index}
              habitData={habit}
              dayOffset={dayOffset}
            />
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen text-center gap-2 text-gray-600">
          {/* Restored SVG Illustration */}

          <p className="text-lg font-semibold mb-4">
            You have no habits yet. Start tracking your habits!
          </p>
          <Image src={habitIcon} alt="habit icon" />
          <button
            className={`px-6 py-2 text-white bg-main rounded-lg ${
              habitsLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
            onClick={toggleModal}
            disabled={habitsLoading}
          >
            Add Habit
          </button>

          <ChooseModal isOpen={isModalOpen} closeModal={toggleModal} />
        </div>
      )}
    </main>
  );
};

export default Home;
