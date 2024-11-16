import { useUser } from "../context/userContext";
import checkMark from "../utils/checkMark";
import { booleanHabit, measurableHabit } from "../interfaces";
import { useHabits } from "../hooks/useHabits";
import calculateHabitScore from "../utils/calculateScore";
import React from "react";
import generateHabitSummary from "../utils/generateHabitSummary";

interface FalseIconProps {
  habitData: booleanHabit | measurableHabit;
  date: string;
}

function FalseIcon({ habitData, date }: FalseIconProps) {
  const { userUid } = useUser();
  const { habits, setHabits } = useHabits();

  const handleClick = async () => {
    const newCheckMarks = {
      ...habitData.checkMarks,
      [date]: true,
    };

    // Sort dates before calculating score
    const sortedCheckMarks = Object.entries(newCheckMarks).sort((a, b) => {
      const [dayA, monthA, yearA] = a[0].split("-").map(Number);
      const [dayB, monthB, yearB] = b[0].split("-").map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return dateA.getTime() - dateB.getTime();
    });

    const sortedNewCheckMarks = Object.fromEntries(sortedCheckMarks);
    const score = calculateHabitScore(sortedNewCheckMarks);
    const habitSummary = generateHabitSummary(sortedNewCheckMarks);

    const habitChecked = {
      ...habitData,
      habitSummary: habitSummary,
      habitScore: { ...habitData.habitScore, ...score },
      checkMarks: sortedNewCheckMarks,
    };

    try {
      await checkMark(userUid, habitData.id, habitChecked, habits, setHabits);
    } catch (error) {
      console.error("Error updating habit:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <li
      className="flex justify-center items-center w-fit mx-auto relative z-20 customShadow"
      onClick={handleClick}
      title="Mark as completed"
      role="button"
      aria-label="Mark habit as completed"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#777777"
        stroke="#777777"
        strokeWidth="1"
        width="24"
        height="24"
        viewBox="0 0 32 32"
      >
        <path d="M25.372,23.279c-2.507-1.79-4.909-3.792-7.238-6.001c2.602-2.673,5.117-5.613,7.566-8.878c0.497-0.663,0.362-1.604-0.3-2.101c-0.664-0.495-1.603-0.362-2.101,0.3c-2.366,3.155-4.792,5.993-7.3,8.57c-2.507-2.577-4.934-5.415-7.3-8.57C8.203,5.938,7.264,5.805,6.6,6.3C5.938,6.797,5.803,7.737,6.3,8.4c2.449,3.265,4.964,6.205,7.567,8.878c-2.329,2.209-4.731,4.211-7.238,6.001c-0.674,0.481-0.83,1.418-0.349,2.093C6.572,25.782,7.033,26,7.501,26c0.302,0,0.606-0.091,0.871-0.279c2.646-1.89,5.177-4.003,7.628-6.333c2.451,2.331,4.982,4.443,7.628,6.333C23.893,25.909,24.197,26,24.499,26c0.468,0,0.929-0.219,1.222-0.628C26.202,24.697,26.046,23.761,25.372,23.279z"></path>
      </svg>
    </li>
  );
}

export default FalseIcon;
