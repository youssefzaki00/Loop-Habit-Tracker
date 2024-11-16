const calculateWeeklyHistory = (habitData) => {
  const checkMarks = habitData?.checkMarks ?? {};
  const weeks = [];
  const dataByWeeks = [];

  // Collect dates from habitData.checkMarks
  const dates = Object.keys(checkMarks).map((dateString) => {
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  });

  // Ensure there are valid dates
  if (dates.length === 0) {
    console.log("No dates available in habitData");
    return { weeks, dataByWeeks };
  }

  // Find the earliest date
  const earliestDate = new Date(
    Math.min(...dates.map((date) => date.getTime()))
  );

  // Find the most recent Saturday
  const today = new Date();
  const offsetToLastSaturday = today.getDay() === 6 ? 0 : today.getDay() + 1;
  let currentSaturday = new Date(today);
  currentSaturday.setDate(today.getDate() - offsetToLastSaturday);

  // Calculate the first Saturday on or before the earliest date
  const firstSaturday = new Date(earliestDate);
  firstSaturday.setDate(
    firstSaturday.getDate() - ((firstSaturday.getDay() + 1) % 7)
  );

  // Create an array of all Saturdays from the first Saturday to the current Saturday
  while (currentSaturday >= firstSaturday) {
    const weekStart = new Date(currentSaturday);
    weeks.unshift(`${weekStart.getDate()}-${weekStart.getMonth() + 1}`); // Format week label

    const padZero = (num) => (num < 10 ? `0${num}` : num);

    // Calculate total completed days for the week
    let weekTotal = 0;
    for (let j = 0; j < 7; j++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + j);
      const formattedDate = `${padZero(date.getDate())}-${padZero(
        date.getMonth() + 1
      )}-${date.getFullYear()}`;

      weekTotal += habitData?.checkMarks[formattedDate] ? 1 : 0; // Increment for each completed day
    }
    dataByWeeks.unshift(weekTotal); // Store the total completed days for the week

    // Move to the previous Saturday
    currentSaturday.setDate(currentSaturday.getDate() - 7);
  }

  return { weeks, dataByWeeks };
};

export default calculateWeeklyHistory;
