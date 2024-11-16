// getLastNDays.tsx
export function getLastNDays(n: number, dayOffset: number = 0): string[] {
  const dates = [];
  const temp = new Date();
  temp.setDate(temp.getDate() + dayOffset * 10); // Adjust start based on offset

  for (let i = 0; i < n; i++) {
    const date = new Date(temp);
    date.setDate(temp.getDate() - i);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
    dates.push(formattedDate);
  }

  return dates;
}
