import type { NextApiRequest, NextApiResponse } from "next";
import { postToSanity } from "@/utils/postToSanity";

type Data = {};

/**
 * Handles the deletion category by Id
 * @req Contains categoryId
 * @returns empty response params
 * TODO: Testing not complete
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const categoryId = req.body.categoryId;
  const authId = req.body.authId;
  const categoryArray = req.body.categoryArray;
  categoryArray.filter((item: string) => item !== categoryId);

  const mutations1 = [
    {
      patch: {
        id: authId,
        set: {
          category: categoryArray,
        },
      },
    },
  ];
  const mutations2 = [
    {
      delete: {
        query: "*[_type == 'category' && _id == '$categoryId']",
        params: {
          categoryId: categoryId,
        },
      },
    },
  ];

  postToSanity(mutations1)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  postToSanity(mutations2)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  return res.status(200).json({});
}
