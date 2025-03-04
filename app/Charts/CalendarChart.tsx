import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
import { eachDayOfInterval, format, subMonths, addMonths } from "date-fns";
import BackButton from "../components/BackButton";

function CalendarChart({ habitData }) {
  const chartRef = useRef(null);
  const [startMonth, setStartMonth] = useState(subMonths(new Date(), 1));
  const [isChartReady, setIsChartReady] = useState(false);

  function isColorDark(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b < 128;
  }

  useEffect(() => {
    if (chartRef.current) {
      setIsChartReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isChartReady || !chartRef.current) return;

    setTimeout(() => {
      if (!chartRef.current) return;
      const myChart = echarts.init(chartRef.current);
      updateChart(myChart);
      return () => myChart.dispose();
    }, 100);
  }, [habitData, startMonth, isChartReady]);

  function updateChart(myChart) {
    const endMonth = new Date();
    const allDates = eachDayOfInterval({
      start: startMonth,
      end: endMonth,
    }).map((date) => format(date, "yyyy-MM-dd"));

    const calendarData = allDates.map((date) => {
      const isCompleted = habitData.checkMarks?.[date] ? 1 : 0;
      return [date, isCompleted];
    });

    myChart.setOption({
      title: {
        text: "Calendar",
        left: "left",
        textStyle: { color: habitData.color, fontSize: 24, fontWeight: 700 },
      },
      tooltip: {
        formatter: (params) =>
          `${params.value[0]}: ${
            params.value[1] ? "Completed" : "Not Completed"
          }`,
        position: "top",
      },
      visualMap: {
        min: 0,
        max: 1,
        show: false,
        inRange: { color: ["#404040", habitData.color] },
      },
      calendar: {
        range: [
          format(startMonth, "yyyy-MM-dd"),
          format(new Date(), "yyyy-MM-dd"),
        ],
        cellSize: [38, 38],
        itemStyle: { borderWidth: 0 },
        splitLine: { show: false },
        monthLabel: { nameMap: "en", color: "#c0c0c0" },
        dayLabel: {
          firstDay: 6,
          color: "#c0c0c0",
          fontSize: "14",
          fontWeight: 500,
        },
        yearLabel: { show: false },
      },
      series: [
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          data: calendarData,
          itemStyle: {
            borderRadius: 8,
            borderColor: "#303030",
            borderWidth: 6,
          },
          label: {
            show: true,
            formatter: (params) => params.value[0].split("-")[2],
            color: (params) =>
              params.value[1]
                ? isColorDark(habitData.color)
                  ? "#ffffff"
                  : "#303030"
                : "#c0c0c0",
            fontWeight: "600",
            fontSize: "14",
          },
        },
      ],
    });
  }

  const handlePrevMonth = () => setStartMonth((prev) => subMonths(prev, 1));
  const handleNextMonth = () =>
    setStartMonth((prev) =>
      addMonths(prev, 1) <= new Date() ? addMonths(prev, 1) : prev
    );
  const handleToday = () => setStartMonth(new Date());

  return (
    <div className="relative border-b-2 border-borderColor pb-8">
      {habitData.checkMarks && Object.keys(habitData.checkMarks).length > 0 ? (
        <>
          <nav className="p-4 lg:px-40 pb-0 text-textGray relative flex justify-between items-center">
            <div onClick={handlePrevMonth} className="cursor-pointer">
              <BackButton days={true} />
            </div>
            <div
              ref={chartRef}
              className="min-h-[22rem] w-full flex justify-center"
            ></div>
            <div
              onClick={handleNextMonth}
              className="cursor-pointer rotate-180"
            >
              <BackButton days={true} />
            </div>
          </nav>
          <div className="text-textGray flex justify-center items-center gap-4 mt-4">
            <h3 className="w-fit px-4 py-2 rounded text-center text-lg font-semibold bg-dark2">
              {format(startMonth, "MMMM yyyy")}
            </h3>
            <button
              onClick={handleToday}
              className="customShadow bg-main hover:bg-[#1a81e9] active:bg-[#1a81e9] text-white px-4 py-2 rounded"
            >
              Today
            </button>
          </div>
        </>
      ) : (
        <div className="p-4 lg:px-40 min-h-[24rem] w-full h-[24rem] flex items-center justify-center font-bold text-white text-lg lg:text-4xl">
          No habit tracking data found. 📊❌
        </div>
      )}
    </div>
  );
}

export default CalendarChart;
