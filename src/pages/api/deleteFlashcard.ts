import type { NextApiRequest, NextApiResponse } from "next";
import { postToSanity } from "@/utils/postToSanity";

type Data = {};

/**
 * Handles the deletion of flashcards
 * @req Contains flashcardId
 * @returns empty response params
 * TODO: Testing not complete
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const flashcardId = req.body.flashcardId;
  const flashcardDeckId = req.body.flashcardDeckId;
  const flashcardArray = req.body.flashcardArray;
  flashcardArray.filter((item: string) => item !== flashcardId);
  const mutations1 = [
    {
      patch: {
        id: flashcardDeckId,
        set: {
          flashcard: flashcardArray,
        },
      },
    },
  ];

  const mutations2 = [
    {
      delete: {
        query: `*[_type == 'flashcard' && _id == '${flashcardId}']`,
        params: {
          flashcardId: flashcardId,
        },
      },
    },
  ];

  await postToSanity(mutations1)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  await postToSanity(mutations2)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  return res.status(200).json({});
}
