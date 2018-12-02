import { ListDatesFromToday, IsSameDay } from "./date-management";

export type Historical = {
  date: Date;
  rank: number;
  points: number;
  time: number;
};

export type HistoricalList = ReadonlyArray<Historical>;

export type dbHistoricalList = ReadonlyArray<
  Historical & { date: string; time: undefined }
>;

/*
 * Will convert a DbHistorical in a Historical Array from today downto (today - nDays),
 *  filling all the empty days.
 */
export const createFilledHistorical = (
  dbHistorical: dbHistoricalList,
  days = 5
): Array<Historical> => {
  // Transforms the received Object from Database to an Array of Historical
  let fullHistorical: HistoricalList = DbHistoricalToHistoricalArray(dbHistorical);

  // Ordering by date
  fullHistorical = [...fullHistorical].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // @ts-ignore
  let _first;

  // Keeping just the most recent historicals, with the minimum needed length to perform all the fills.
  // TODO: Try to find a way to keep just the really needed historical
  while (fullHistorical.length > days) {
    [_first, ...fullHistorical] = fullHistorical;
  }

  const historical = [];
  if (fullHistorical.length >= 1) {
    // Will get an array from now to (now - days) of Date
    const neededDates = ListDatesFromToday(days);
    for (const d of neededDates) {
      // Find historical by date, if doesn't exists, will get the nearest rank for the date.
      historical.push(GetHistoricalByDate(d, fullHistorical));
    }
  }
  return historical;
};

/*
  * Will convert the received Historical from database to an Array of Historical
  * Will try to find the dates on the "date" property inside the object's VALUE,
  *  and if it is empty, will get the date from the object's KEY.
  ! It will filter out all the objects with empty keys.
*/
const DbHistoricalToHistoricalArray = (
  dbHistorical: dbHistoricalList
): HistoricalList => {
  return dbHistorical.map(value => {
    const date: Date = new Date(Number(value.date));
    date.setHours(0, 0, 0, 0);
    return {
      date: date,
      rank: value.rank,
      points: Number(Number(value.points).toFixed(0)),
      time: date.getTime(),
    };
  });
};

/*
  * This method will try to find the rank of the specified date, on the specified array of Historical,
  *  if none of same date, will first try to find the nearest with lesser date
  *  if none of lesser date, will try to find the nearest with bigger date
  *  and if not found in any of these conditions, must return a default value for rank
  TODO: Find a better way to do this... Maybe there's no need to have a default value, maybe a
  TODO:  simple check on the historical length will be enough to determinate the most part of conditions
*/
const GetHistoricalByDate = (dt: Date, historical: HistoricalList): Historical => {
  // Search for the same date on historical
  let hist = historical.find(h => IsSameDay(h.date, dt));
  if (hist) return hist;

  // If there's none historical of the same date,
  //  will search for the rank of the historical right before the date
  const lesserDates = historical.filter(h => h.date.getTime() < dt.getTime());
  if (lesserDates.length > 0) {
    const last = lesserDates[lesserDates.length - 1];
    return {
      date: dt,
      points: 0,
      rank: last.rank,
      time: dt.getTime(),
    } as Historical;
  }

  // If none historical of the same date, neither from lesser date,
  //  will search for the rank of the historical right after the date
  const biggerDates = historical.filter(h => h.date.getTime() > dt.getTime());
  if (biggerDates.length > 0) {
    const first = biggerDates[0];
    return {
      date: dt,
      points: 0,
      rank: first.rank,
      time: dt.getTime(),
    } as Historical;
  }

  // If not found yet, return a default value
  return {
    date: dt,
    points: 0,
    rank: -1, // ? What should be the default rank if there's no historical on list?
    time: dt.getTime(),
  } as Historical;
};
