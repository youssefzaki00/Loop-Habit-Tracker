import * as echarts from "echarts";
import { useEffect, useRef } from "react";

function StreaksChart({ habitData }) {
  const chartRef = useRef<HTMLDivElement>(null);

  // Create a list of all days from the first check mark to today
  const getAllDays = (checkMarks: Record<string, number>) => {
    const dates = Object.keys(checkMarks).map(
      (dateStr) => new Date(dateStr?.split("-").reverse().join("-"))
    );
    if (dates.length === 0) return []; // Handle case where no check marks exist

    const startDate = new Date(
      Math.min(...dates.map((date) => date.getTime()))
    );
    const today = new Date();
    const allDays = [];

    for (let d = startDate; d <= today; d.setDate(d.getDate() + 1)) {
      allDays.push(
        d.toISOString().split("T")[0].split("-").reverse().join("-")
      ); // Store in d-m-yyyy format
    }

    return allDays;
  };

  // Process check marks into a structured format
  const allDays = getAllDays(habitData?.checkMarks);
  const checkEntries = allDays.map((dateStr) => ({
    date: new Date(dateStr.split("-").reverse().join("-")),
    check: habitData?.checkMarks[dateStr]
      ? Boolean(habitData?.checkMarks[dateStr])
      : false,
  }));

  // Calculate streaks based on check entries
  const calculateEachStreak = () => {
    let streakCount = 0;
    const streaks = [];

    for (let i = 0; i < checkEntries.length; i++) {
      const currentEntry = checkEntries[i];

      if (currentEntry.check) {
        streakCount++;
      } else {
        if (streakCount > 0) {
          streaks?.push({
            length: streakCount,
            start: checkEntries[i - streakCount].date,
            end: checkEntries[i - 1].date,
          });
        }
        streakCount = 0; // Reset streak count
      }
    }

    // Handle the case where streak ends at the last entry
    if (streakCount > 0) {
      streaks?.push({
        length: streakCount,
        start: checkEntries[checkEntries.length - streakCount].date,
        end: checkEntries[checkEntries.length - 1].date,
      });
    }

    return streaks.map((streak) => ({
      start: `${streak.start.getDate().toString().padStart(2, "0")}/${(
        streak.start.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${streak.start.getFullYear()}`,
      end: `${streak.end.getDate().toString().padStart(2, "0")}/${(
        streak.end.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${streak.end.getFullYear()}`,
      value: streak.length,
      display: `Streak: ${streak.length} days`, // Added display property
    }));
  };

  const streaksData = calculateEachStreak();

  // Chart configuration options
  const getChartOptions = (
    streaksData: Array<{
      start: string;
      end: string;
      value: number;
      display: string;
    }>
  ) => ({
    title: {
      text: "Streaks",
      left: "left",
      textStyle: {
        color: habitData.color,
        fontSize: 24,
        fontWeight: 700,
      },
    },
    color: habitData.color,
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        const streak = streaksData[params?.dataIndex];
        return `${streak?.display}<br>Start: ${streak?.start}<br>End: ${streak?.end}`;
      },
    },
    grid: {
      left: "5%",
      right: "20%",
      bottom: "5%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      axisLabel: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: "category",
      data: streaksData.map((streak) => streak.start),
      axisLabel: { color: "#fff" },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: "bar",
        data: streaksData.map((streak) => streak.value),
        barWidth: "30px",
        itemStyle: {
          color: habitData.color,
          borderRadius: [4, 4, 4, 4],
        },
        label: {
          show: true,
          position: "right",
          color: "#fff",
          formatter: (params) => {
            const streak = streaksData[params.dataIndex];
            return `${streak.display} (${streak.end})`;
          },
        },
      },
    ],
  });

  useEffect(() => {
    if (!chartRef.current || streaksData.length === 0) return; // Prevent errors if ref is null or no data

    const myChart = echarts.init(chartRef.current);
    myChart.setOption(getChartOptions(streaksData.slice(-7))); // Use slice instead of splice

    return () => {
      myChart.dispose();
    };
  }, [habitData.color, streaksData]);

  return (
    <div className="">
      {streaksData?.length === 0 ? (
        <div className="p-4 lg:px-40 min-h-[24rem] w-full h-[24rem] flex items-center justify-center font-bold text-white text-lg lg:text-4xl border-b-2 border-borderColor">
          No streaks recorded yet. 🔥🚫
        </div>
      ) : (
        <div
          ref={chartRef}
          className="p-4 lg:px-40 min-h-[24rem] w-full h-[24rem] flex items-center border-b-2 border-borderColor"
        ></div>
      )}
    </div>
  );
}

export default StreaksChart;
