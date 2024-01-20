import type { NextApiRequest, NextApiResponse } from "next";
import { postToSanity } from "@/utils/postToSanity";
import { CategoryCreate, CategoryInfo } from "@/model/sanityCreateTypings";

type Data = {};

type CreateCategoryProp = {
  create: CategoryCreate;
};

/**
 * Creates a new category entry in sanity
 * @param req Request body contains categoryInfo to be added
 * @return id of the created category
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const categoryInfo: CategoryInfo = req.body.categoryInfo;
  const mutations: CreateCategoryProp[] = [
    {
      create: {
        _type: "category",
        name: categoryInfo.name,
        description: categoryInfo.description,
        flashcardDeck: [],
        content: [],
      },
    },
  ];

  let id: string = "";

  await postToSanity(mutations)
    .then((response) => response.json())
    .then((data) => {
      id = data.results[0].id;
      console.log("Create category data:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return res.status(200).json({ id });
}
