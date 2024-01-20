import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { weekDateCondition } from "@/utils/createUtils/dateUtils";
import { getCategoryToColorsMap } from "@/utils/createUtils/colorUtils";
import React from "react";
import {
  FlashcardDeckFetch,
  CalendarFetch,
} from "../model/sanityFetchTypings";
import { getAuthSession } from "@/utils/authUtils/getAuthSession";
import { fetchAuthUsernameAll } from "@/utils/fetchUtils/fetchAuthUsernameAll";
import Link from "next/link";

type Props = {
  flashcardDecks: FlashcardDeckFetch[];
  calendars: CalendarFetch[];
};

export default function Space({ calendars, flashcardDecks }: Props) {
  // sieve out flashcards for this month
  const decks: FlashcardDeckFetch[] = flashcardDecks.filter(
    (deck) => new Date(deck._updatedAt).getMonth() === new Date().getMonth(),
  );

  // TODO: Fix this function
  const weekCalendar: CalendarFetch[] = calendars.filter((calendar) =>
    weekDateCondition(new Date(calendar._createdAt)),
  );
  const monDecks: FlashcardDeckFetch[] = weekCalendar
    .filter((calendar) => new Date(calendar._createdAt).getDay() === 1)
    .map((calendar) => calendar.flashcardDeck);
  const tueDecks: FlashcardDeckFetch[] = weekCalendar
    .filter((calendar) => new Date(calendar._createdAt).getDay() === 2)
    .map((calendar) => calendar.flashcardDeck);
  const wedDecks: FlashcardDeckFetch[] = weekCalendar
    .filter((calendar) => new Date(calendar._createdAt).getDay() === 3)
    .map((calendar) => calendar.flashcardDeck);
  const thuDecks: FlashcardDeckFetch[] = weekCalendar
    .filter((calendar) => new Date(calendar._createdAt).getDay() === 4)
    .map((calendar) => calendar.flashcardDeck);
  const friDecks: FlashcardDeckFetch[] = weekCalendar
    .filter((calendar) => new Date(calendar._createdAt).getDay() === 5)
    .map((calendar) => calendar.flashcardDeck);
  const satDecks: FlashcardDeckFetch[] = weekCalendar
    .filter((calendar) => new Date(calendar._createdAt).getDay() === 6)
    .map((calendar) => calendar.flashcardDeck);
  const sunDecks: FlashcardDeckFetch[] = weekCalendar
    .filter((calendar) => new Date(calendar._createdAt).getDay() === 0)
    .map((calendar) => calendar.flashcardDeck);

  const categoryToColors = getCategoryToColorsMap(
    decks.map((deck) => deck.category),
  );

  return (
    <div className="w-full flex items-left justify-left overflow-scroll my-16 mx-8">
      <div className="basis-1/3 h-full">
        <div className="m-5 p-5 rounded-lg bg-whitish">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-semibold">My activity</h1>
              <h6 className="text-teal-900">This month</h6>
            </div>
            <ArrowOutwardRoundedIcon />
          </div>

          <div className="">
            {decks.map((deck, key) => (
              <Link key={key} href={`/flashcard/${deck._id}`}>
                <div
                  className="p-5 my-2 rounded-lg"
                  style={{
                    backgroundColor: categoryToColors.get(deck.category.name),
                  }}
                >
                  <div className="flex justify-start items-center">
                    <ArrowRightRoundedIcon style={{ color: "white" }} />
                    <h1 className="text-white">{deck.category.name}</h1>
                  </div>
                  <div className="flex justify-start items-center">
                    <h1 className="text-white text-xl font-semibold">
                      {deck.name}
                    </h1>
                    <ArrowOutwardRoundedIcon style={{ color: "white" }} />
                  </div>

                  <h6 className="text-white text-sm font-light">
                    {deck.description}
                  </h6>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="basis-2/3 h-full">
        <div className="m-5 p-5 rounded-lg bg-lightblue">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Schedule</h1>
              <h6 className="text-teal-900">This week</h6>
            </div>
            <ArrowOutwardRoundedIcon />
          </div>

          <div className="ml-20 mt-10 h-1 w-auto bg-gray"></div>

          <div className="flex justify-between gap-5 items-center h-12">
            <h1 className="text-gray">Monday</h1>
            <div className="flex grow">
              {monDecks.map((deck, key) => (
                <div
                  key={key}
                  className="p-2 m-2 rounded-lg text-white"
                  style={{
                    backgroundColor: categoryToColors.get(deck.category.name),
                  }}
                >
                  {deck.name}
                </div>
              ))}
            </div>
          </div>

          <div className="ml-20 h-1 w-auto bg-gray"></div>
          <div className="flex justify-between gap-5 items-center h-12">
            <h1 className="text-gray">Tuesday</h1>
            <div className="flex grow">
              {tueDecks.map((deck, key) => (
                <div
                  key={key}
                  className="p-2 m-2 rounded-lg text-white"
                  style={{
                    backgroundColor: categoryToColors.get(deck.category.name),
                  }}
                >
                  {deck.name}
                </div>
              ))}
            </div>
          </div>

          <div className="ml-20 h-1 w-auto bg-gray"></div>
          <div className="flex justify-between gap-5 items-center h-12">
            <h1 className="text-gray">Wednesday</h1>
            <div className="flex grow">
              {wedDecks.map((deck, key) => (
                <div
                  key={key}
                  className="p-2 m-2 rounded-lg text-white"
                  style={{
                    backgroundColor: categoryToColors.get(deck.category.name),
                  }}
                >
                  {deck.name}
                </div>
              ))}
            </div>
          </div>

          <div className="ml-20 h-1 w-auto bg-gray"></div>
          <div className="flex justify-between gap-5 items-center h-12">
            <h1 className="text-gray">Thursday</h1>
            <div className="flex grow">
              {thuDecks.map((deck, key) => (
                <div
                  key={key}
                  className="p-2 m-2 rounded-lg text-white"
                  style={{
                    backgroundColor: categoryToColors.get(deck.category.name),
                  }}
                >
                  {deck.name}
                </div>
              ))}
            </div>
          </div>

          <div className="ml-20 h-1 w-auto bg-gray"></div>
          <div className="flex justify-between gap-5 items-center h-12">
            <h1 className="text-gray">Friday</h1>
            <div className="flex grow">
              {friDecks.map((deck, key) => (
                <div
                  key={key}
                  className="p-2 m-2 rounded-lg text-white"
                  style={{
                    backgroundColor: categoryToColors.get(deck.category.name),
                  }}
                >
                  {deck.name}
                </div>
              ))}
            </div>
          </div>

          <div className="ml-20 h-1 w-auto bg-gray"></div>
          <div className="flex justify-between gap-5 items-center h-12">
            <h1 className="text-gray">Saturday</h1>
            <div className="flex grow">
              {satDecks.map((deck, key) => (
                <div
                  key={key}
                  className="p-2 m-2 rounded-lg text-white"
                  style={{
                    backgroundColor: categoryToColors.get(deck.category.name),
                  }}
                >
                  {deck.name}
                </div>
              ))}
            </div>
          </div>

          <div className="ml-20 h-1 w-auto bg-gray"></div>
          <div className="flex justify-between gap-5 items-center h-12">
            <h1 className="text-gray">Sunday</h1>
            <div className="flex grow">
              {sunDecks.map((deck, key) => (
                <div
                  key={key}
                  className="p-2 m-2 rounded-lg text-white"
                  style={{
                    backgroundColor: categoryToColors.get(deck.category.name),
                  }}
                >
                  {deck.name}
                </div>
              ))}
            </div>
          </div>

          <div className="ml-20 h-1 w-auto bg-gray"></div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const result = await getAuthSession(context);
  if (!result.isSession) {
    return {
      redirect: {
        destination: result.redirect.destination,
        permanent: result.redirect.permanent,
      },
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
  const flashcardDecks = user.category.flatMap(
    (category) => category.flashcardDeck,
  );
  const calendars = user.calendar;

  return {
    props: {
      session,
      calendars,
      flashcardDecks,
    },
  };
}
