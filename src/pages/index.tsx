import React from "react";
import {
  AuthFetch,
  CalendarFetch,
  CategoryFetch,
  ContentFetch,
  FlashcardDeckFetch,
} from "../model/sanityFetchTypings";
import { getAuthSession } from "@/utils/authUtils/getAuthSession";
import { fetchCalendar } from "@/utils/fetchUtils/fetchCalendar";

type Props = {
  auth: AuthFetch[];
  flashcardDecks: FlashcardDeckFetch[];
  contents: ContentFetch[];
  categories: CategoryFetch[];
  calendars: CalendarFetch[];
};

export default function Index({
  auth,
  flashcardDecks,
  contents,
  categories,
  calendars,
}: Props) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      Welcome to the home page
      {
        calendars.map((calendar, key) => {
          return (
            <div key={key}>
              <h1>{calendar._id}</h1>
              <p>{calendar._rev}</p>
            </div>
          )
        })
      }
    </div>
  );
}

/**
 * Require authentication to access this page
 */
export async function getServerSideProps(context: any) {
  const result = await getAuthSession(context);
  const calendars = await fetchCalendar()

  if (!result.isSession) {
    return {
      redirect: {
        destination: result.redirect.destination,
        permanent: result.redirect.permanent,
      },
    };
  }

  if (!result.session) {
    return {
      props: {},
    };
  }

  return {
    props: {
      calendars,
    },
  };
}
