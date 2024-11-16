const generateHabitSummary = (checkMarks: { [date: string]: boolean }) => {
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

  let totalChecked = 0;
  let totalCheckedFalse = 0;
  let totalUnchecked = 0;

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

    if (checkMarks[formattedDate] === true) {
      totalChecked += 1;
    } else if (checkMarks[formattedDate] === false) {
      totalCheckedFalse += 1;
    } else {
      totalUnchecked += 1;
    }
  }

  totalUnchecked += totalCheckedFalse; // Combine totalCheckedFalse and days not checked at all for totalUnchecked

  return {
    totalChecked,
    totalUnchecked,
    totalCheckedFalse,
    totalDays,
  };
};

export default generateHabitSummary;
