import { CalendarFetch } from "../../model/sanityFetchTypings";

/**
 * Async function to fetch calendar data from 7 days till now from sanity
 * @returns calendar data fetched
 */
export async function fetchCalendar(): Promise<CalendarFetch[]> {
  const res = await fetch(
    `${process.env.SANITY_STUDIO_BASE_URL}/api/getCalendar`,
  );
  const { calendars } = await res.json();

  return calendars;
}
