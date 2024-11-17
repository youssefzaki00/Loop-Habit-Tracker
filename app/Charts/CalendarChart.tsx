import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
import { eachDayOfInterval, format, subMonths, addMonths } from "date-fns";
import BackButton from "../components/BackButton"; // Import your BackButton

function CalendarChart({ habitData }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [startMonth, setStartMonth] = useState(subMonths(new Date(), 1)); // Start 1 month ago for display

  function isColorDark(hexColor) {
    // Convert hex color to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Calculate the luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Return true if the color is dark
    return luminance < 128; // A value below 128 is considered dark
  }

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const updateChart = () => {
      const endMonth = new Date(); // Today's date
      const allDates = eachDayOfInterval({
        start: startMonth,
        end: endMonth,
      }).map((date) => format(date, "yyyy-MM-dd"));

      const calendarData = allDates.map((date) => {
        const [year, month, day] = date.split("-");
        const formattedDate = `${day}-${month}-${year}`; // Convert to dd-mm-yyyy for matching
        const isCompleted = habitData.checkMarks[formattedDate] ? 1 : 0;

        return [date, isCompleted];
      });

      myChart.setOption({
        title: {
          text: "Calendar",
          left: "left",
          textStyle: {
            color: habitData.color,
            fontSize: 24,
            fontWeight: 700,
          },
        },
        tooltip: {
          formatter: (params) => {
            const date = params.value[0]; // Get the date
            const isCompleted = params.value[1] ? "Completed" : "Not Completed";
            return `${date}: ${isCompleted}`;
          },
          position: "top",
        },
        visualMap: {
          min: 0,
          max: 1,
          show: false,
          inRange: {
            color: ["#404040", habitData.color], // Gray for incomplete, custom color for complete
          },
        },
        calendar: {
          range: [
            format(startMonth, "yyyy-MM-dd"),
            format(new Date(), "yyyy-MM-dd"), // Ensure the end range is today
          ],
          cellSize: [38, 38],
          itemStyle: {
            borderWidth: 0, // Set to 0, will be applied in series
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#777",
              width: 0,
            },
          },
          monthLabel: {
            nameMap: "en",
            color: "#c0c0c0",
          },
          dayLabel: {
            firstDay: 6, // Start week on Saturday
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
              borderRadius: 8, // Add border radius to each day cell
              borderColor: "#303030",
              borderWidth: 6, // Set border width for spacing
            },
            label: {
              show: true,
              formatter: (params) => params.value[0].split("-")[2], // Show day number only
              rich: {
                completed: {
                  color: isColorDark(habitData.color) ? "#ffffff" : "#303030",
                },
                notCompleted: {
                  color: "#c0c0c0",
                },
              },
              fontWeight: "600",
              fontSize: "14",
            },
          },
        ],
      });
    };

    updateChart();

    return () => {
      myChart.dispose();
    };
  }, [habitData, startMonth]);

  const handlePrevMonth = () => {
    setStartMonth((prev) => {
      const newStartMonth = subMonths(prev, 1);
      return newStartMonth <= new Date() ? newStartMonth : prev; // Ensure it doesn't exceed today
    });
  };

  const handleNextMonth = () => {
    setStartMonth((prev) => {
      const newMonth = addMonths(prev, 1);
      return newMonth <= new Date() ? newMonth : prev; // Prevent moving to future dates beyond today
    });
  };

  const handleToday = () => {
    setStartMonth(new Date());
  };
  // Handle empty state
  if (!habitData.checkMarks || Object.keys(habitData.checkMarks).length === 0) {
    return <div>No habits tracked yet.</div>;
  }
  return (
    <div className="relative border-b-2 border-borderColor pb-8">
      <nav className="p-4 lg:px-40 pb-0 text-textGray relative ">
        <div className="absolute left-32 top-1/2 flex justify-center items-center">
          <div onClick={handlePrevMonth} className="cursor-pointer ">
            <BackButton days={true} />
          </div>
        </div>

        <div ref={chartRef} className=" min-h-[22rem] flex justify-left"></div>

        <div className=" flex justify-center items-center absolute right-24 mt-1 top-1/2">
          <div onClick={handleNextMonth} className="cursor-pointer rotate-180">
            <BackButton days={true} />
          </div>
        </div>
      </nav>{" "}
      <div className=" text-textGray flex justify-center items-center gap-4">
        <h3 className="w-fit  px-4 py-2 rounded text-center text-lg font-semibold bg-dark2 ">
          {format(startMonth, "MMMM yyyy")}
          {/* Display the current month and year */}
        </h3>
        <button
          // style={{ backgroundColor: habitData.color }}
          onClick={handleToday}
          className="customShadow bg-main hover:bg-[#1a81e9] active:bg-[#1a81e9]  text-white px-4 py-2 rounded  block"
        >
          Today
        </button>
      </div>
    </div>
  );
}

export default CalendarChart;
