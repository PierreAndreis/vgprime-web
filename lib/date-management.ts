const TIME_PER_DAY = 1000 * 60 * 60 * 24;

const DaysBetween = (date1: Date, date2: Date) => {
  const timeDifference = date2.getTime() - date1.getTime();
  return Math.round(timeDifference / TIME_PER_DAY);
};

const ListDatesFromToday = (days: number) => {
  const today = new Date();
  const dates = [] as Date[];
  while (dates.length < days) {
    let newDate = new Date(today);
    newDate.setDate(newDate.getDate() - dates.length);
    newDate.setHours(0, 0, 0, 0);
    dates.unshift(newDate);
  }
  return dates;
};

const IsSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export { DaysBetween, ListDatesFromToday, IsSameDay };
