import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function ScoreChart({ habitData }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  useEffect(() => {
    if (habitData && habitData?.habitScore) {
      const scoreEntries = Object.entries(habitData.habitScore).map(
        ([dateStr, score]: [string, number]) => {
          const [day, month, year] = dateStr.split("-").map(Number);
          return {
            date: new Date(year, month - 1, day),
            day,
            month,
            year,
            score: score * 100,
          };
        }
      );
      scoreEntries?.sort((a, b) => a.date.getTime() - b.date.getTime());

      const dayLabels = scoreEntries.map(({ day, month, year }) => {
        return day === 1 ? `${monthNames[month - 1]}\n${year}` : `${day}`;
      });

      const newScores = scoreEntries.map(({ score }) => score);

      if (chartRef?.current) {
        const myChart = echarts.init(chartRef.current);

        myChart.setOption({
          color: habitData.color,
          title: {
            text: "Score",
            left: "left",
            textStyle: {
              color: habitData.color,
              fontSize: 24,
              fontWeight: 700,
            },
          },
          tooltip: {
            trigger: "axis",
            axisPointer: { type: "cross" },
            formatter: (params) => {
              const dataIndex = params[0].dataIndex;
              const dateEntry = scoreEntries[dataIndex];
              const formattedDate = `${dateEntry.day}-${dateEntry.month}-${dateEntry.year}`;
              const value = Math.round(params[0].value);
              return `${habitData?.name?.toUpperCase()}<br/>${formattedDate}<br/>${value}%`;
            },
          },
          xAxis: {
            type: "category",
            data: dayLabels,
            axisLabel: {
              color: "#c0c0c0",
              fontSize: 12,
              formatter: (value) => {
                return value; // This will correctly render the line breaks
              },
            },
            axisLine: {
              lineStyle: { color: "#555" },
            },
          },
          yAxis: {
            type: "value",
            min: 0,
            max: 100,
            axisLabel: {
              formatter: "{value}%",
              color: "#c0c0c0",
              fontSize: 12,
            },
            splitLine: {
              lineStyle: { color: "#555", width: 0.5 },
            },
          },
          dataZoom: [
            {
              type: "inside",
              xAxisIndex: 0,
              start: Math.max(100 - (14 / scoreEntries.length) * 100, 0), // Show last 7 entries by default
              end: 100,
            },
          ],
          series: [
            {
              name: habitData.name,
              type: "line",
              data: newScores,
              symbol: "circle",
              symbolSize: 12, // Adjust size for effect
              itemStyle: {
                borderColor: "#303030", // Use your habit color
                borderWidth: 4, // Create the appearance of space
              },
              lineStyle: { width: 3 },
            },
          ],
        });

        // window.addEventListener("resize", myChart.resize);
        return () => {
          // window.removeEventListener("resize", myChart.resize);
          myChart.dispose();
        };
      }
    }
  }, [habitData]);
  return (
    <div className="">
      {!habitData?.habitScore ||
      Object.keys(habitData.habitScore).length === 0 ? (
        <div className="p-4 lg:px-40 min-h-[24rem] w-full h-[24rem] flex items-center justify-center font-bold text-white text-lg lg:text-4xl border-b-2 border-borderColor">
          No habit tracking data found. 📊❌
        </div>
      ) : (
        <div
          ref={chartRef}
          className="p-4 lg:px-40 min-h-[24rem] w-full h-[24rem] flex items-center justify-center border-b-2 border-borderColor"
        ></div>
      )}
    </div>
  );
}
export default ScoreChart;
