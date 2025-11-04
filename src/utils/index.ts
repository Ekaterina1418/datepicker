export type DayCell = {
  date: Date | null;
  day: number | null;
};

export const buildMonthGrid = (
  viewDate: Date,
  firstDayOfWeek = 1
): DayCell[] => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);

  const rawFirstWeekDay = first.getDay();
  const firstWeekDay = (rawFirstWeekDay + 7 - firstDayOfWeek) % 7;

  const totalCells = firstWeekDay + last.getDate();
  const rows = Math.ceil(totalCells / 7) * 7;
  const cells: DayCell[] = [];
  for (let i = 0; i < rows; i++) {
    const dayNumber = i - firstWeekDay + 1;
    if (dayNumber >= 1 && dayNumber <= last.getDate()) {
      const date = new Date(year, month, dayNumber);
      cells.push({ date, day: dayNumber });
    } else {
      cells.push({ date: null, day: null });
    }
  }
  return cells;
};

export const getWeekDays = (locale: string, firstDayOfWeek = 1): string[] => {
  const baseDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(1970, 0, 4 + i); 
    return d.toLocaleDateString(locale, { weekday: "short" });
  });
  return [...baseDays.slice(firstDayOfWeek), ...baseDays.slice(0, firstDayOfWeek)];
};

