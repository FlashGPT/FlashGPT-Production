import type { NextApiRequest, NextApiResponse } from "next";
import { postToSanity } from "@/utils/postToSanity";
import { FlashcardCreate } from "@/model/sanityCreateTypings";

type Data = {};

type CreateFlashcardProp = {
  create: FlashcardCreate;
};

/**
 * Sends flashcards to sanity
 * @param req Request body contains flashcards to be added
 * @returns ids of the flashcards created
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const flashcards: FlashcardCreate[] = req.body.flashcards;

  const mutations: CreateFlashcardProp[] = [];

  flashcards.map((flashcard) => {
    mutations.push({
      create: {
        _type: "flashcard",
        name: flashcard.name,
        question: flashcard.question,
        answer: flashcard.answer,
      },
    });
  });

  const ids: string[] = [];

  await postToSanity(mutations)
    .then((response) => response.json())
    .then((data) => {
      data.results.map((result: any) => {
        ids.push(result.id);
      });
      console.log("create flashcard data:", ids);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return res.status(200).json({ ids });
}
