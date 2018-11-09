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

const getOrdinal = (n: number): string => {
  const numberStr = n.toString();
  const last = numberStr[numberStr.length - 1];
  switch (last) {
    case "1":
      return n + "st";
    case "2":
      return n + "nd";
    case "3":
      return n + "rd";
    default:
      return n + "th";
  }
};

const monthShortNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const PrettyDate = (dt: Date, withYear: boolean = false): string => {
  try {
    return (
      `${monthShortNames[dt.getMonth()]} ${getOrdinal(dt.getDate())}` +
      (withYear ? ` ${dt.getFullYear()}` : "")
    );
  } catch {
    return "";
  }
};

export { DaysBetween, ListDatesFromToday, IsSameDay, PrettyDate };
