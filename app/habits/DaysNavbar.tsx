// DaysNavbar.tsx
"use client";
import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import getCurrentWeekDays from "../utils/getCurrentWeekDays";

function DaysNavbar({ dayOffset, nextPeriod, prevPeriod }) {
  const [days, setDays] = useState([]);

  useEffect(() => {
    setDays(getCurrentWeekDays(dayOffset)); // Re-calculate days on offset change
  }, [dayOffset]);

  return (
    <nav className="bg-dark2 p-3 lg:px-40 text-textGray grid grid-cols-12">
      <div className="col-span-5 lg:col-span-4"></div>
      <div className="col-span-7 lg:col-span-8 grid grid-cols-5 lg:grid-cols-10 relative">
        <div className="absolute -left-10 top-2.5 " onClick={nextPeriod}>
          <BackButton days={true} />
        </div>
        {days?.map((dayObj, index) => (
          <div
            key={index}
            className="text-center col-span-1 text-xs lg:text-base font-semibold flex flex-col items-center"
          >
            <p>{dayObj?.day}</p>
            <p>{dayObj?.date}</p>
            <p>{dayObj?.month}</p>
          </div>
        ))}
        <div
          className="absolute rotate-180 -right-10 mt-2 top-2.5"
          onClick={prevPeriod}
        >
          <BackButton days={true} />
        </div>
      </div>
    </nav>
  );
}

export default DaysNavbar;
