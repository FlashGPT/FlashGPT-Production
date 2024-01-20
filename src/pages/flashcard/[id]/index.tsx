import React, { useState } from "react";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import { useRouter } from "next/router";
import { getAuthSession } from "@/utils/authUtils/getAuthSession";
import { fetchAuthUsernameAll } from "@/utils/fetchUtils/fetchAuthUsernameAll";
import {
  CategoryFetch,
  FlashcardDeckFetch,
  FlashcardFetch,
} from "@/model/sanityFetchTypings";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

type Props = {
  flashcardDecks: FlashcardDeckFetch[];
};

export default function FlashcardDetails({ flashcardDecks }: Props) {
  const router = useRouter();
  const deckId = router.query.id;
  // get all the possible flashcards
  const decks: FlashcardDeckFetch[] = flashcardDecks.filter(
    (deck) => deck._id === deckId,
  );
  const flashcards: FlashcardFetch[] = decks.flatMap((deck) => deck.flashcard);
  const categories: CategoryFetch[] = decks.flatMap((deck) => deck.category);
  console.log(flashcards);

  const [idx, setIdx] = useState(0);

  const next = () => {
    setIdx((idx + 1) % flashcards.length);
  };

  const prev = () => {
    setIdx((idx + flashcards.length - 1) % flashcards.length);
  };

  return (
    <div className="h-2/3 w-full m-20">
      <div className="flex items-center justify-between font-bold text-2xl">
        <h1>{decks[0].category.name}</h1>
      </div>
      <div className="flex items-center text-[#003050] text-xl">
        <ArrowRightRoundedIcon></ArrowRightRoundedIcon>
        {decks[0].name}
      </div>
      <Carousel
        animation="slide"
        next={next}
        prev={prev}
        className="h-[500px]"
        interval={10000}
      >
        <FlashCard key={idx} flashCard={flashcards[idx]} />
      </Carousel>
      <div className="flex w-full justify-center items-start h-full gap-2 mt-2">
        {flashcards.map((flashcard, index) => {
          return (
            <button
              key={index}
              onClick={() => setIdx(index)}
              className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all ${
                index === idx ? "bg-black scale-110" : "bg-purple scale-100"
              } duration-200 scale-100 hover:scale-110`}
            />
          );
        })}
      </div>
    </div>
  );
}

type props2 = {
  flashCard: FlashcardFetch;
};

function FlashCard({ flashCard }: props2) {
  const [flip, setFlip] = useState(false);
  const onClick = () => {
    setFlip(!flip);
  };

  return (
    <Paper style={{ height: "100%", border: "none" }}>
      {!flip && (
        <div className="bg-[#003050] mx-20 rounded-xl relative p-16 h-[500px] flex justify-center items-center">
          <h1 className="text-white text-xl">{flashCard.question}</h1>
          <button
            className="absolute color-white right-0 bottom-0 cursor-pointer z-20"
            onClick={onClick}
          >
            <ThreeSixtyIcon
              className="text-white text-4xl hover:rotate-[20deg] border"
              onClick={onClick}
            />
          </button>
        </div>
      )}

      {flip && (
        <div className="bg-[#6EAAFF] mx-20 rounded-xl relative p-16 h-[500px] flex justify-center items-center">
          <h1 className="text-white text-xl">{flashCard.answer}</h1>
          <button
            className="absolute color-white right-0 bottom-0 cursor-pointer z-20"
            onClick={onClick}
          >
            <ThreeSixtyIcon className="text-white text-4xl hover:rotate-[20deg]" />
          </button>
        </div>
      )}
    </Paper>
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
  return {
    props: {
      session,
      flashcardDecks,
    },
  };
}
