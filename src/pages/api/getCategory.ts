import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../../sanity";
import { CategoryFetch } from "../../model/sanityFetchTypings";

const query = groq`
  *[_type == "category"] {
    ...,
    flashcardDeck[] ->,
    content[] ->,
  }
`;

type Data = {
  categories: CategoryFetch;
};

/**
 * Fetch all categories from sanity
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const categories: CategoryFetch = await sanityClient.fetch(query);

  res.status(200).json({ categories });
}
