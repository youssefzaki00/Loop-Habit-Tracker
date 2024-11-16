const calculateHabitScore = (checkMarks: { [date: string]: boolean }) => {
  const currentDate = new Date();
  const checkDates = Object.keys(checkMarks);

  const firstCheckDate = new Date(
    Math.min(
      ...checkDates.map((date) => {
        const [day, month, year] = date.split("-").map(Number);
        return new Date(year, month - 1, day).getTime();
      })
    )
  );

  const totalDays = Math.ceil(
    (currentDate.getTime() - firstCheckDate.getTime()) / (1000 * 3600 * 24)
  );

  const habitScores: { [date: string]: number } = {};
  let completedDays = 0;

  for (let dayOffset = 0; dayOffset < totalDays; dayOffset++) {
    const currentDay = new Date(firstCheckDate);
    currentDay.setDate(firstCheckDate.getDate() + dayOffset);

    // Format date as dd-mm-yyyy
    const formattedDate = `${currentDay
      .getDate()
      .toString()
      .padStart(2, "0")}-${(currentDay.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${currentDay.getFullYear()}`;

    // Check if the habit was marked on this date
    const isChecked = checkMarks[formattedDate] || false;

    // Update completedDays if the habit was checked
    if (isChecked) {
      completedDays += 1;
    }
    // Calculate the score for the day based on completed days and total days
    const score = completedDays / (dayOffset + 1); // Score is based on all days up to current day
    habitScores[formattedDate] = score;
  }

  return habitScores;
};

export default calculateHabitScore;
