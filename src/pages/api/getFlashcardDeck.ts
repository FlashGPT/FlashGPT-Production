import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../../sanity";
import { FlashcardDeckFetch } from "../../model/sanityFetchTypings";

const query = groq`
  *[_type == "flashcardDeck"] {
    ...,
    flashcard[] ->,
    category ->,
  }
`;

type Data = {
  flashcardDecks: FlashcardDeckFetch;
};

/**
 * Fetch all flashcardDecks from sanity
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const flashcardDecks: FlashcardDeckFetch = await sanityClient.fetch(query);

  res.status(200).json({ flashcardDecks });
}
