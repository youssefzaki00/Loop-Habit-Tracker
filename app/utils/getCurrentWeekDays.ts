// getCurrentWeekDays.tsx
const getCurrentWeekDays = (
  dayOffset: number
): { day: string; date: number; month: string }[] => {
  const daysOfWeekAr = [
    "الأحد",
    "الأثنين",
    "الثلاثاء",
    "الاربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  const monthsAr = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  const today = new Date();
  const startOfPeriod = new Date(today);
  startOfPeriod.setDate(today.getDate() + dayOffset * 10);

  const days: { day: string; date: number; month: string }[] = [];

  for (let i = 0; i < 10; i++) {
    const currentDay = new Date(startOfPeriod);
    currentDay.setDate(startOfPeriod.getDate() - i);

    if (currentDay > today) break;

    days.push({
      day: daysOfWeekAr[currentDay.getDay()],
      date: currentDay.getDate(),
      month: monthsAr[currentDay.getMonth()], // Get month in Arabic
    });
  }

  return days;
};

export default getCurrentWeekDays;
