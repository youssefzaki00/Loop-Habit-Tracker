import React from "react";
import { booleanHabit, HabitProps, measurableHabit } from "../interfaces";
import { useUser } from "../hooks/useUser";
import { useHabits } from "../hooks/useHabits";
import checkMark from "../utils/checkMark";
import calculateHabitScore from "../utils/calculateScore";
import generateHabitSummary from "../utils/generateHabitSummary";
import Loading from "@/app/Loading/Loading";

function TrueIcon({
  habitData,
  date,
}: {
  habitData: booleanHabit | measurableHabit;
  date: string;
}) {
  const { user, loading } = useUser();
  const { habits, setHabits } = useHabits();

  const handleClick = () => {
    const newCheckMarks = {
      ...habitData.checkMarks,
      [date]: false, // Mark as completed
    };
    const newScore = calculateHabitScore(newCheckMarks);
    const habitSummary = generateHabitSummary(newCheckMarks);

    const habitChecked = {
      ...habitData,
      habitSummary: habitSummary,
      habitScore: newScore,
      checkMarks: newCheckMarks,
    };
    checkMark(user.uid, habitData.id, habitChecked, habits, setHabits);
  };

  return (
    <li
      className="flex justify-center items-center w-fit mx-auto relative z-20 customShadow"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        fill={habitData.color ? habitData.color : "green"}
        width="24"
        height="24"
        strokeWidth="1"
        stroke={habitData.color ? habitData.color : "green"}
        viewBox="0 0 32 32"
      >
        <path d="M13.071,24.358c-0.497,0-0.962-0.246-1.242-0.658c-2.339-3.45-4.751-5.873-7.373-7.405 c-0.715-0.418-0.956-1.337-0.538-2.052c0.417-0.715,1.336-0.958,2.052-0.538c2.529,1.478,4.856,3.627,7.071,6.539 c4.261-6.008,9.283-10.838,14.952-14.375c0.705-0.438,1.628-0.225,2.066,0.479c0.438,0.703,0.225,1.628-0.479,2.066 c-5.935,3.702-10.925,8.697-15.258,15.27c-0.276,0.419-0.742,0.672-1.243,0.675C13.077,24.358,13.074,24.358,13.071,24.358z"></path>
      </svg>
    </li>
  );
}

export default TrueIcon;
