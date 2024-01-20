import type { NextApiRequest, NextApiResponse } from "next";
import { postToSanity } from "@/utils/postToSanity";

type ModifyCategoryProp = {
  patch: {
    id: string;
    insert: any;
  };
};

type Data = {};

/**
 * Updates the category with the given categoryId to include the flashcardDeck with the given flashcardDeckId
 * @param req Request body contains flashcardDeckId and categoryId
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const flashcardDeckId = req.body.flashcardDeckId;
  const categoryId = req.body.categoryId;

  const mutations: ModifyCategoryProp[] = [
    {
      patch: {
        id: categoryId,
        insert: {
          after: "flashcardDeck[-1]",
          items: [
            {
              _type: "reference",
              _ref: flashcardDeckId,
              _key: flashcardDeckId,
            },
          ],
        },
      },
    },
  ];
  await postToSanity(mutations)
    .then((response) => response.json())
    .then((data) => {
      console.log("Patch category data:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return res.status(200).json({});
}
