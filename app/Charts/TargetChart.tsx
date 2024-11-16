import * as echarts from "echarts";
import { useEffect, useRef } from "react";

function TargetChart({ habitData }) {
  const chartRef = useRef(null);

  const currentDay = new Date();
  const formattedDate = `${currentDay.getDate().toString().padStart(2, "0")}-${(
    currentDay.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${currentDay.getFullYear()}`;

  const habitLogs = habitData.habitLogs; // Assuming habitLogs is an object
  const todayValue = Number(habitLogs[formattedDate]); // Get the value for today's date

  // percents for target chart
  const todayPercent = (todayValue / habitData.target) * 100;
  const weekPercent = (0 / habitData.target) * 100;
  const monthPercent = (0 / habitData.target) * 100;
  const quarterPercent = (0 / habitData.target) * 100;
  const yearPercent = (0 / habitData.target) * 100;
  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const chartColor = habitData?.color || "#3498db"; // Ensure there's a fallback color

      myChart.setOption({
        title: {
          text: "Target",
          left: "left",
          textStyle: {
            color: chartColor,
            fontSize: 24,
            fontWeight: 700,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            const percent = Math.round(params.value);
            const value = Math.round((params.value / 100) * habitData.target);
            const remaining =
              habitData.target <= value
                ? 0
                : Math.round(habitData.target - value);
            return `${params.name}: ${percent}%<br/>Target: ${habitData.target}<br/>Achievd: ${value}<br/>Remaining: ${remaining}
             `;
          },
        },
        grid: {
          top: "15%",
          bottom: "10%",
          left: "10%",
          right: "10%",
        },
        xAxis: {
          type: "value",
          max: 100, // Setting target to 100 for percentages
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
        yAxis: {
          type: "category",
          data: ["Year", "Quarter", "Month", "Week", "Today"],
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: "#c0c0c0",
            fontSize: 14,
          },
        },
        series: [
          {
            type: "bar",
            data: [
              yearPercent,
              quarterPercent,
              monthPercent,
              weekPercent,
              todayPercent,
            ], // Progress percentages for each category
            barWidth: 25, // Adjust bar width for a cleaner look
            itemStyle: {
              margin: [10, 0, 10, 0],
              borderRadius: [5, 5, 5, 5], // Smooth round corners
              color: chartColor, // Pink progress bar
            },
            showBackground: true,
            backgroundStyle: {
              color: "rgba(255, 255, 255, 0.2)", // Subtle gray background
              borderRadius: [5, 5, 5, 5],
            },
          },
        ],
      });

      // Cleanup chart on unmount
      return () => {
        myChart.dispose();
      };
    }
  }, [habitData.color]);

  return (
    <div
      ref={chartRef}
      className="p-4 lg:px-40 min-h-[24rem] w-full h-[24rem] flex items-center border-b-2 border-borderColor"
    ></div>
  );
}

export default TargetChart;
