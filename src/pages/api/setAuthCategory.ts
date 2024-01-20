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
 * Adds a category to the category array in auth
 * @param req Request body contains authId and categoryId
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const categoryId = req.body.categoryId;
  const authId = req.body.authId;

  const mutations: ModifyCategoryProp[] = [
    {
      patch: {
        id: authId,
        insert: {
          after: "category[-1]",
          items: [
            {
              _type: "reference",
              _ref: categoryId,
              _key: categoryId,
            },
          ],
        },
      },
    },
  ];
  await postToSanity(mutations)
    .then((response) => response.json())
    .then((data) => {
      console.log("Patch auth category data:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return res.status(200).json({});
}
