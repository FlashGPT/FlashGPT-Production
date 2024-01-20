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
import { fetchAuthUsernameAll } from "@/utils/fetchUtils/fetchAuthUsernameAll";

type Props = {
  user: AuthFetch;
  flashcardDecks: FlashcardDeckFetch[];
  contents: ContentFetch[];
  categories: CategoryFetch[];
  calendars: CalendarFetch[];
};

export default function Index({
  user,
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
      <div>
        {user.name ?? ""}
      </div>
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

  const session = result.session;

  if (!session || !session.user || !session.user.email) {
    return {
      props: {},
    };
  }

  const auth = await fetchAuthUsernameAll("", session.user.email);
  const user = auth[0];

  return {
    props: {
      calendars,
      user
    },
  };
}
