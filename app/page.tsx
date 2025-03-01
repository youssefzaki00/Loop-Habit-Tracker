"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import DaysNavbar from "./habits/DaysNavbar";
import HabitTrack from "./habits/HabitTrack";
import Loading from "./Loading/Loading";
import { useHabits } from "./hooks/useHabits";
import ChooseModal from "./components/ChooseModal";
import { auth } from "@/app/firebase/firebase";
import { useUser } from "./context/userContext";

const Home = () => {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const { habits, loading: habitsLoading } = useHabits();
  const [dayOffset, setDayOffset] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user && !userLoading) {
      router.replace("/auth/signup");
    } else if (user && !auth.currentUser?.emailVerified) {
      router.replace("/auth/login");
    }
  }, [user, userLoading]);

  if (userLoading || habitsLoading) return <Loading />;

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const nextPeriod = () => dayOffset < 0 && setDayOffset((prev) => prev + 1);
  const prevPeriod = () => setDayOffset((prev) => prev - 1);

  return (
    <main className="min-h-screen bg-dark2">
      {habits?.length > 0 ? (
        <>
          <Header />
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
          <svg
            width="80px"
            height="80px"
            viewBox="-4.8 -4.8 57.60 57.60"
            id="b"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fafafa"
            transform="matrix(1, 0, 0, 1, 0, 0)"
            stroke="#1876d2"
            strokeWidth="0.9600000000000002"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0">
              <rect
                x="-4.8"
                y="-4.8"
                width="57.60"
                height="57.60"
                rx="28.8"
                fill="#fafafa"
                strokeWidth="0"
              />
            </g>
            <g id="SVGRepo_iconCarrier">
              <circle
                cx="24"
                cy="24"
                r="21.5"
                stroke="#1876d2"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="m24.3718,29.8584c-1.1903,1.1903-3.05,1.1159-4.1659,0l-5.4306-5.4306c-.6695-.6695-1.711-.6695-2.3805,0l-.8927.8927c-.6695.6695-.6695,1.711,0,2.3805l5.505,5.505c1.1159,1.1159,2.9012,1.1159,4.0172,0l15.4736-15.4736c.6695-.6695.6695-1.711,0-2.3805l-.8927-.8927c-.6695-.6695-1.711-.6695-2.3805,0l-14.209,14.209"
                stroke="#1876d2"
                strokeWidth="2"
                fill="none"
              />
            </g>
          </svg>

          <p className="text-lg font-semibold mb-4">
            You have no habits yet. Start tracking your habits!
          </p>

          <button
            className="px-6 py-2 text-white bg-main rounded-lg hover:bg-blue-600"
            onClick={toggleModal}
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
