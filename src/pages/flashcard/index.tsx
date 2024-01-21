import React, { useState } from "react";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import Dropdown from "@/components/Dropdown";
import { getCategoryToColorsMap } from "@/utils/createUtils/colorUtils";
import { getAuthSession } from "@/utils/authUtils/getAuthSession";
import { fetchAuthUsernameAll } from "@/utils/fetchUtils/fetchAuthUsernameAll";
import DeckComponent from "@/components/flashcardComponents/DeckComponent";
import Link from "next/link";


import {
  AuthFetch,
  CalendarFetch,
  ContentFetch,
  CategoryFetch,
  FlashcardDeckFetch,
} from "@/model/sanityFetchTypings";
import { fetchContent } from "@/utils/fetchUtils/fetchContent";
import { fetchCalendar } from "@/utils/fetchUtils/fetchCalendar";

type Props = {
  user: AuthFetch;
  flashcardDecks: FlashcardDeckFetch[];
  contents: ContentFetch[];
  categories: CategoryFetch[];
  calendars: CalendarFetch[];
};
export default function Flashcard({
  user,
  flashcardDecks,
  contents,
  categories,
  calendars,
}: Props) {
  // sieve out the top 3 flashcards
  const decks: FlashcardDeckFetch[] = flashcardDecks
    .sort(
      (a, b) =>
        new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime(),
    )
    .slice(0, 3);

  const categoryToColors = getCategoryToColorsMap(categories);
  const [searchFlashCardDecks, setSearchFlashCardDecks] = useState(
    flashcardDecks.slice(),
  );

  const DECK_COLORS = [
    ["#9AB1D1", "#013B8C", "#00FFFF,"],
    ["#FCF1B0", "#F8DB39", "#FFD700"],
    ["#F7C5C6", "#EC6F70", "#FF0000"],
  ];

  const DECK_IMAGE = [
    "/assets/space_first.png",
    "/assets/space_second.png",
    "/assets/space_third.png",
  ];

  return (
    <div className="h-full w-full flex items-left justify-left my-16 mx-8 flex-col gap-10 overflow-y-scroll">
      <h1 className="text-4xl font-semibold">Recent Cards</h1>
      <div className="w-full flex justify-evenly gap-20">
        {decks.map(
          (
            deck,
            key, // This allows for cases where deck number < 3
          ) => (
            <DeckComponent
              key={key}
              deck={deck}
              colors={DECK_COLORS[key]}
              image={DECK_IMAGE[key]}
            />
          ),
        )}
      </div>
      <Dropdown
        arr={categories.map((x) => x.name)}
        setArr={(substring: string) => {
          if (substring === "all") {
            setSearchFlashCardDecks(flashcardDecks);
            return;
          }
          setSearchFlashCardDecks(
            flashcardDecks.filter((x) => x.category.name === substring),
          );
        }}
      />
      <div className="grid grid-cols-3 gap-2 max-w-5xl mr-10">
        {searchFlashCardDecks.map((deck, key) => (
          <Link key={key} href={`/flashcard/${deck._id}`}>
            <div
              className="p-5 my-2 rounded-lg min-h-28 hover:underline text-white hover:opacity-80 transition-all shadow-lg"
              style={{
                backgroundColor: categoryToColors.get(deck.category.name),
              }}
            >
              <div className="flex justify-start items-center">
                <ArrowRightRoundedIcon style={{ color: "white" }} />
                <h1 className="text-white">{deck.category.name}</h1>
              </div>
              <div className="flex justify-start items-center">
                <h1 className="text-white text-xl font-bold">{deck.name}</h1>
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

  const calendars: CalendarFetch[] = await fetchCalendar();
  const contents: ContentFetch[] = await fetchContent();
  const auth = await fetchAuthUsernameAll("", session.user.email);
  const user = auth[0];
  const categories = user.category;

  let flashcardDecks: FlashcardDeckFetch[] = [];
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].flashcardDeck) {
      flashcardDecks = flashcardDecks.concat(categories[i].flashcardDeck);
    }
  }
  flashcardDecks = flashcardDecks.filter((x) => x != null);

  return {
    props: {
      user,
      flashcardDecks,
      contents,
      categories,
      calendars,
    },
  };
}
