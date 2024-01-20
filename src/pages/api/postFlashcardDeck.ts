import type { NextApiRequest, NextApiResponse } from "next";
import { postToSanity } from "@/utils/postToSanity";
import { FlashcardDeckCreate } from "@/model/sanityCreateTypings";

type Data = {};

type CreateFlashcardProp = {
  create: FlashcardDeckCreate;
};

/**
 * Creates a new FlashcardDeck
 * @param req Request body contains flashcardIds, categoryId and flashcardDeckInfo to be made
 * @returns id of the flashcardDeck created
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const flashcardIds: string[] = req.body.flashcardIds;
  const categoryId: string = req.body.categoryId;
  const flashcardDeckInfo = req.body.flashcardDeckInfo;

  console.log("flashcardIds:", flashcardIds);
  console.log("categoryId:", categoryId);
  console.log("flashcardDeckInfo:", flashcardDeckInfo);

  const mutations: CreateFlashcardProp[] = [
    {
      create: {
        _type: "flashcardDeck",
        name: flashcardDeckInfo.name,
        description: flashcardDeckInfo.description,
        flashcard: flashcardIds.map((id) => ({
          _type: "reference",
          _ref: id,
          _key: id,
        })),
        category: {
          _type: "reference",
          _ref: categoryId,
          _key: categoryId,
        },
      },
    },
  ];

  let id: string = "";

  await postToSanity(mutations)
    .then((response) => response.json())
    .then((data) => {
      id = data.results[0].id;
      console.log("Create flashcard Deck data:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return res.status(200).json({ id });
}
