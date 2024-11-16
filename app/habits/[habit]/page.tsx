"use client";
import CalendarChart from "@/app/Charts/CalendarChart";
import HabitHeader from "@/app/components/HabitHeader";
import HabitNavbar from "@/app/components/HabitNavbar";
import HistoryChart from "@/app/Charts/HistoryChart";
import Overview from "@/app/Charts/Overview";
import ScoreChart from "@/app/Charts/ScoreChart";
import TargetChart from "@/app/Charts/TargetChart";
import { useHabits } from "@/app/hooks/useHabits";
import { booleanHabit, measurableHabit } from "@/app/interfaces";
import Loading from "@/app/Loading/Loading";
import { useEffect, useState } from "react";
import StreaksChart from "../../Charts/StreaksChart";

interface PageProps {
  params: { habit: string };
}

const Page = ({ params }: PageProps) => {
  const { habits, loading } = useHabits();
  const [habitData, setHabitData] = useState<
    booleanHabit | measurableHabit | null
  >(null);

  useEffect(() => {
    if (!loading) {
      const temp = habits.find((e: any) => e.id === params.habit);
      setHabitData(temp || null);
    }
  }, [habits, loading, params.habit]);

  if (loading || !habitData) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-dark3">
      <HabitHeader habitData={habitData} />
      <HabitNavbar habitData={habitData} />
      {habitData?.notes?.length > 0 ? (
        <p
          dir="auto"
          className="text-center capitalize text-lg font-semibold border-b-2 border-[#282828] py-4 lg:px-40"
          style={{ color: habitData?.color }}
        >
          {habitData?.notes}
        </p>
      ) : (
        ""
      )}
      <Overview habitData={habitData} />
      {habitData.type === "measurable" && <TargetChart habitData={habitData} />}
      <ScoreChart habitData={habitData} />
      <HistoryChart habitData={habitData} />
      <CalendarChart habitData={habitData} />
      <StreaksChart habitData={habitData} />
    </div>
  );
};

export default Page;
