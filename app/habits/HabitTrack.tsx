"use client";
import React from "react";
import FalseIcon from "../components/FalseIcon";
import TrueIcon from "../components/TrueIcon";
import Link from "next/link";
import { HabitProps } from "../interfaces";
import { getLastNDays } from "../utils/getLastDays";
import OverviewMini from "../Charts/OverviewMini";
import MeasurableButton from "../components/MeasurableButton";

function HabitTrack({
  habitData,
  dayOffset,
}: HabitProps & { dayOffset: number }) {
  const last10Days = getLastNDays(10, dayOffset); // Adjust days based on offset

  return (
    <div
      className="
    bg-dark3 grid grid-cols-12 lg:px-40 border-[1.5px]
     border-dark2 cursor-pointer items-center select-none "
    >
      <Link
        href={`/habits/${habitData?.id}`}
        className="
        col-span-5 lg:col-span-4 font-medium text-lg capitalize 
        bg-blue- h-full w-full py-3 pr-10
        items-center grid grid-cols-5"
      >
        <OverviewMini habitData={habitData} />
        <h2
          style={{ color: habitData?.color }}
          dir="auto"
          className="col-span-4"
        >
          {habitData?.name}
        </h2>
      </Link>
      <ul className="col-span-7 lg:col-span-8 grid grid-cols-4 lg:grid-cols-10">
        {last10Days.map((date) =>
          habitData.type == "boolean" ? (
            habitData.checkMarks[date] !== undefined ? (
              habitData.checkMarks[date] ? (
                <TrueIcon key={date} habitData={habitData} date={date} />
              ) : (
                <FalseIcon key={date} date={date} habitData={habitData} />
              )
            ) : (
              <FalseIcon key={date} date={date} habitData={habitData} />
            )
          ) : (
            <MeasurableButton key={date} date={date} habitData={habitData} />
          )
        )}
      </ul>
    </div>
  );
}

export default HabitTrack;
