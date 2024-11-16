import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { title } from "process";

function Overview({ habitData }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const totalChecks = habitData?.checkMarks
    ? Object.values(habitData.checkMarks).filter((check) => check === true)
        .length
    : 0;

  // Get the last day and score only if habitScore exists
  const lastDay = habitData?.habitScore
    ? (Object.keys(habitData.habitScore) as string[]).sort((a, b) => {
        const [dayA, monthA, yearA] = a
          .split("-")
          .map((part) => parseInt(part, 10));
        const [dayB, monthB, yearB] = b
          .split("-")
          .map((part) => parseInt(part, 10));
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);
        return dateB.getTime() - dateA.getTime();
      })[0]
    : null;

  const lastScore = lastDay
    ? Math.round(habitData.habitScore[lastDay] * 100) || 0
    : 0;

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const option = {
        color: habitData.color,

        tooltip: {
          trigger: "item",
          formatter: "{b}: {d}%",
        },
        series: [
          {
            name: "Score",
            type: "pie",
            radius: ["50%", "75%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: lastScore, name: "Score" },
              { value: 100 - lastScore, name: "Remaining" },
            ],
            color: [habitData?.color || "#fafafa", "#424242"],
          },
        ],
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [habitData.color, lastScore]);

  return (
    <div className="p-4 lg:px-40 flex gap-12 pt-12 text-lg font-medium text-textGray items-center justify-center relative border-b-2 border-borderColor">
      <p
        className="absolute left-40 top-4 text-2xl font-bold"
        style={{ color: habitData.color }}
      >
        Overview
      </p>
      <div ref={chartRef} className="w-16 h-16 col-span-1" />
      <div className="flex flex-col  col-span-1">
        <p style={{ color: habitData.color }}>{lastScore}%</p>
        <p>Score</p>
      </div>
      {/* <div className="flex flex-col gap-1 col-span-1">
        <p style={{ color: habitData.color }}>23%</p>
        <p>Month</p>
      </div>
      <div className="flex flex-col gap-1 col-span-1">
        <p style={{ color: habitData.color }}>61%</p>
        <p>Year</p>
      </div> */}
      <div className="flex flex-col  col-span-1">
        <p style={{ color: habitData.color }}>{totalChecks}</p>
        <p>Total</p>
      </div>
    </div>
  );
}

export default Overview;
