"use client";
import CalendarChart from "@/app/Charts/CalendarChart";
import HabitHeader from "@/app/components/HabitHeader";
import HabitNavbar from "@/app/components/HabitNavbar";
import HistoryChart from "@/app/Charts/HistoryChart";
import Overview from "@/app/Charts/Overview";
import ScoreChart from "@/app/Charts/ScoreChart";
import TargetChart from "@/app/Charts/TargetChart";
import { useHabits } from "@/app/context/allHabitsContext";
import { booleanHabit, measurableHabit } from "@/app/interfaces";
import Loading from "@/app/Loading/Loading";
import { useEffect, useState } from "react";
import StreaksChart from "../../Charts/StreaksChart";

interface PageProps {
  params: Promise<{ habit: string }>;
}

const Page = ({ params }: PageProps) => {
  const [habitParam, setHabitParam] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => setHabitParam(resolvedParams.habit));
  }, [params]);

  const { habits, loading } = useHabits();
  const [habitData, setHabitData] = useState<
    booleanHabit | measurableHabit | null
  >(null);

  useEffect(() => {
    if (!loading && habitParam) {
      const temp = habits.find((e: any) => e.id === habitParam);
      setHabitData(temp || null);
    }
  }, [habits, loading, habitParam]);

  if (loading || !habitData || !habitParam) {
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
