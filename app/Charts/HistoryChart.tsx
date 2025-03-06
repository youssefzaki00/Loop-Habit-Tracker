import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
import calculateWeeklyHistory from "../utils/calculateWeeklyHistory";

function HistoryChart({ habitData }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [weekHistory, setWeekHistory] = useState({
    weeks: [],
    dataByWeeks: [],
  });

  useEffect(() => {
    const { weeks, dataByWeeks } = calculateWeeklyHistory(habitData);
    setWeekHistory({ weeks, dataByWeeks });
  }, [habitData]);

  useEffect(() => {
    if (!chartRef?.current || weekHistory?.weeks?.length === 0) return;

    const myChart = echarts.init(chartRef?.current);

    myChart?.setOption({
      color: habitData.color,
      title: {
        text: "History",
        left: "left",
        textStyle: {
          color: habitData.color,
          fontSize: 24,
          fontWeight: 700,
        },
      },
      xAxis: {
        type: "category",
        data: weekHistory.weeks,
        axisTick: {
          alignWithLabel: true,
          interval: 0,
        },
        axisLabel: {
          color: "#c0c0c0",
          interval: 0,
          formatter: function (value) {
            return value;
          },
          padding: [0, 0, 10, 0],
        },
        axisLine: {
          lineStyle: { color: "#555" },
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          color: "#c0c0c0",
        },
        splitLine: {
          lineStyle: { color: "#555", width: 0.5 },
        },
      },
      series: [
        {
          data: weekHistory.dataByWeeks,
          type: "bar",
          barWidth: "25px",
          itemStyle: {
            borderRadius: [5, 5, 0, 0],
          },
          label: {
            show: true,
            position: "top",
            formatter: "{c}",
            color: habitData.color,
            fontSize: 14,
          },
        },
      ],
    });

    return () => {
      myChart.dispose();
    };
  }, [weekHistory, habitData.color]);

  return (
    <div className="">
      {weekHistory?.weeks?.length === 0 ? (
        <div className="p-4 lg:px-40 min-h-[24rem] w-full h-[24rem] flex items-center justify-center font-bold text-white text-lg lg:text-4xl border-b-2 border-borderColor">
          No history available. 📜❌
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

export default HistoryChart;
