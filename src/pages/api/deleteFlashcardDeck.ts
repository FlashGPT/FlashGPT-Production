import type { NextApiRequest, NextApiResponse } from "next";
import { postToSanity } from "@/utils/postToSanity";

type Data = {};

/**
 * Handles the deletion of flashcardDecks based on Id
 * @req constains flashcardDeckId
 * @returns empty response params
 * TOOO: Testing not complete
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const flashcardDeckId = req.body.flashcardDeckId;
  const categoryId = req.body.categoryId;
  let flashcardDeckArray = req.body.flashcardDeckArray;
  flashcardDeckArray = flashcardDeckArray.filter(
    (item: string) => item !== flashcardDeckId,
  );
  console.log("flashcardDeckArray", flashcardDeckArray);

  const mutations1 = [
    {
      patch: {
        id: categoryId,
        set: {
          flashcardDeck: flashcardDeckArray,
        },
      },
    },
  ];
  const mutations2 = [
    {
      patch: {
        id: flashcardDeckId,
        set: {
          category: null,
        },
      },
    },
  ];
  const mutations3 = [
    {
      delete: {
        query: `*[_type == 'flashcardDeck' && _id == '${flashcardDeckId}']`,
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

  await postToSanity(mutations3)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  return res.status(200).json({});
}
