import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../../sanity";
import { CalendarFetch } from "../../model/sanityFetchTypings";

const query = groq`
  *[_type == "calendar" && dateTime(_createdAt) > dateTime("${getSevenDaysAgo()}")] {
    ...,
    flashcardDeck -> {
      ...,
      category ->,
    } ,
  }
`;

type Data = {
  calendars: CalendarFetch;
};

function getSevenDaysAgo(): string {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString();
}

/**
 * Fetch Calendars from now and 7 days back
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const calendars: CalendarFetch = await sanityClient.fetch(query);

  res.status(200).json({ calendars });
}
